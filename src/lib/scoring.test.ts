import { describe, expect, it } from 'vitest'
import { QUESTIONS } from '../data/questions.ts'
import { levelsIn } from '../i18n/levels.ts'
import { calibrate, evaluate, levelAt, scoreLevels } from './scoring.ts'
import type { Answers, AnswerValue, LevelId } from '../types.ts'

/* Die Auswertung bekommt die Ebenen von außen und rechnet mit Rang und Wert,
   nie mit Text — welche Sprache hier steht, ist deshalb gleichgültig. Ein Test
   weiter unten hält genau das fest. */
const LEVELS = levelsIn('de')

/** Ein Bogen, in dem nur die genannten Ebenen voll angekreuzt sind. */
function only(...ids: LevelId[]): Answers {
  const answers: Answers = {}
  for (const question of QUESTIONS) {
    answers[question.id] = (ids.includes(question.level) ? 4 : 0) satisfies AnswerValue
  }
  return answers
}

describe('scoreLevels', () => {
  it('gibt jeder Ebene einen Anteil zwischen 0 und 1', () => {
    const scores = scoreLevels(LEVELS, only('courage'))
    expect(scores).toHaveLength(LEVELS.length)
    expect(scores.every((score) => score.strength >= 0 && score.strength <= 1)).toBe(true)
  })

  it('zählt nur beantwortete Fragen', () => {
    const scores = scoreLevels(LEVELS, { q13: 4 }) // eine von zwei Mut-Fragen
    const courage = scores.find((score) => score.level.id === 'courage')
    expect(courage?.strength).toBe(1)
  })
})

describe('calibrate', () => {
  it('landet bei einer einzigen ausgeprägten Ebene genau auf deren Wert', () => {
    expect(calibrate(LEVELS, scoreLevels(LEVELS, only('courage')))).toBe(200)
    expect(calibrate(LEVELS, scoreLevels(LEVELS, only('shame')))).toBe(20)
  })

  it('mittelt zwischen zwei gleich starken Ebenen', () => {
    const value = calibrate(LEVELS, scoreLevels(LEVELS, only('fear', 'anger')))
    expect(value).toBeGreaterThan(100)
    expect(value).toBeLessThan(150)
  })

  it('fällt ohne jede Zustimmung auf den Anfang der Skala', () => {
    expect(calibrate(LEVELS, scoreLevels(LEVELS, {}))).toBe(20)
  })
})

describe('levelAt', () => {
  it('nimmt die höchste Ebene, die der Wert erreicht', () => {
    expect(levelAt(LEVELS, 220).id).toBe('courage')
    expect(levelAt(LEVELS, 250).id).toBe('neutrality')
    expect(levelAt(LEVELS, 1000).id).toBe('enlightenment')
  })
})

describe('Sprachunabhängigkeit', () => {
  it('kommt in beiden Sprachen auf dasselbe Ergebnis', () => {
    const answers = only('fear', 'pride', 'reason')
    const de = evaluate(levelsIn('de'), answers)
    const en = evaluate(levelsIn('en'), answers)

    expect(en.calibration).toBe(de.calibration)
    expect(en.dominant.id).toBe(de.dominant.id)
    expect(en.drag?.id).toBe(de.drag?.id)
    expect(en.reach.id).toBe(de.reach.id)
    // Und die Namen unterscheiden sich tatsächlich — sonst prüfte der Test nichts.
    expect(en.dominant.name).not.toBe(de.dominant.name)
  })
})

describe('evaluate', () => {
  it('erkennt eine tiefe Ebene, die von unten zieht', () => {
    const result = evaluate(LEVELS, only('acceptance', 'shame'))
    expect(result.drag?.id).toBe('shame')
  })

  it('meldet keinen Zug nach unten, wenn nichts darunter liegt', () => {
    expect(evaluate(LEVELS, only('shame')).drag).toBeNull()
  })

  it('nennt als Spielraum die höchste Ebene, die deutlich erreicht wird', () => {
    const answers = only('shame', 'guilt', 'apathy')
    answers.q05 = 3 // Vernunft ist da, trägt aber nicht den Schwerpunkt
    answers.q21 = 3
    const result = evaluate(LEVELS, answers)
    expect(result.dominant.id).toBe('apathy')
    expect(result.reach.id).toBe('reason')
    expect(result.drag?.id).toBe('shame')
  })

  it('meldet oberhalb der Schwelle keinen Zug nach unten', () => {
    // Mut ist deutlich vorhanden und liegt unter Bereitschaft — aber ab 200
    // zehrt keine Ebene mehr, also ist das kein Ballast.
    const result = evaluate(LEVELS, only('willingness', 'acceptance', 'courage'))
    expect(result.drag).toBeNull()
  })
})

describe('Band', () => {
  /* Die Oberfläche zeigt statt einer Zahl zwei benachbarte Ebenen. Sie muss sich
     darauf verlassen können, dass es immer genau zwei verschiedene sind und dass
     die dominante Ebene eine davon ist — sonst stünde in der Überschrift eine
     Ebene, die im Band darunter gar nicht vorkommt. */
  it('nennt immer zwei verschiedene, benachbarte Ebenen', () => {
    for (const level of LEVELS) {
      const { band, dominant } = evaluate(LEVELS, only(level.id))
      const [lower, upper] = band

      expect(LEVELS.indexOf(upper) - LEVELS.indexOf(lower)).toBe(1)
      expect([lower.id, upper.id]).toContain(dominant.id)
    }
  })

  it('hält an den Enden der Skala', () => {
    // Unten gibt es keine Nachbarin darunter, oben keine darüber.
    expect(evaluate(LEVELS, only('shame')).band.map((level) => level.id)).toEqual([
      'shame',
      'guilt',
    ])
    expect(evaluate(LEVELS, only('enlightenment')).band.map((level) => level.id)).toEqual([
      'peace',
      'enlightenment',
    ])
  })

  it('kippt zu der Nachbarin, zu der das Antwortbild neigt', () => {
    // Mut allein liegt genau auf seinem Wert, das Bild neigt also nach unten.
    expect(evaluate(LEVELS, only('courage')).band[1].id).toBe('courage')
    // Kommt Neutralität dazu, wandert der Schwerpunkt nach oben.
    expect(evaluate(LEVELS, only('courage', 'neutrality')).band[1].id).toBe('neutrality')
  })

  it('ist in beiden Sprachen dasselbe', () => {
    const answers = only('fear', 'pride', 'reason')
    const de = evaluate(levelsIn('de'), answers).band
    const en = evaluate(levelsIn('en'), answers).band
    expect(en.map((level) => level.id)).toEqual(de.map((level) => level.id))
  })
})
