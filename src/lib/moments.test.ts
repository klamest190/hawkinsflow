import { describe, expect, it } from 'vitest'
import { BELOW_THRESHOLD, LEVELS, THRESHOLD } from '../data/levels.ts'
import { momentCopy } from '../i18n/moment.ts'
import type { Language, Moments } from '../types.ts'
import { appendMoment, isBelowLevelId, isMoments } from './moments.ts'

const LANGUAGES: Language[] = ['de', 'en']

/* Die acht Ebenen unter der Schwelle stehen an drei Stellen: als gerechnete
   Liste in `data/levels.ts`, als Typ `BelowLevelId` in `types.ts` und als
   Rückfragen in `i18n/moment.ts`. Der Typ lässt sich nicht rechnen, die Liste
   nicht typisieren — also prüft dieser Test, dass alle drei dasselbe sagen. Ohne
   ihn liefe die Aufzählung beim nächsten Eingriff in die Skala stillschweigend
   auseinander. */
describe('die Ebenen unter der Schwelle', () => {
  it('sind genau die mit einem Wert unter 200', () => {
    expect(BELOW_THRESHOLD).toEqual(
      LEVELS.filter((level) => level.value < THRESHOLD).map((level) => level.id),
    )
    expect(BELOW_THRESHOLD).toHaveLength(8)
  })

  it.each(LANGUAGES)('haben in %s je eine Rückfrage', (language) => {
    const questions = momentCopy[language].questions
    expect(Object.keys(questions).sort()).toEqual([...BELOW_THRESHOLD].sort())

    /* Und jede ist wirklich eine Frage. Ein Merksatz an dieser Stelle wäre der
       Unterschied zwischen „nimm das mal in Dienst" und „sag dir das vor" — und
       genau der ist der Grund, warum hier eine Frage steht. */
    for (const [id, question] of Object.entries(questions)) {
      expect(question, id).toMatch(/\?$/)
      expect(question.length, id).toBeGreaterThan(25)
    }
  })
})

describe('isBelowLevelId', () => {
  it('nimmt die acht an und sonst nichts', () => {
    expect(isBelowLevelId('anger')).toBe(true)
    expect(isBelowLevelId('shame')).toBe(true)
    // Über der Schwelle steckt niemand fest.
    expect(isBelowLevelId('courage')).toBe(false)
    expect(isBelowLevelId('love')).toBe(false)
    expect(isBelowLevelId(null)).toBe(false)
    expect(isBelowLevelId(7)).toBe(false)
  })
})

describe('isMoments', () => {
  it('nimmt an, was die App selbst schreibt', () => {
    expect(isMoments([])).toBe(true)
    expect(isMoments([{ taken: '2026-08-01T00:00:00.000Z', level: 'fear' }])).toBe(true)
  })

  it('weist zurück, was von Hand kaputtgemacht wurde', () => {
    expect(isMoments(null)).toBe(false)
    expect(isMoments({})).toBe(false)
    expect(isMoments([{ taken: '2026-08-01T00:00:00.000Z' }])).toBe(false)
    // Eine Ebene über der Schwelle wäre in diesem Bogen ein Widerspruch.
    expect(isMoments([{ taken: '2026-08-01T00:00:00.000Z', level: 'joy' }])).toBe(false)
  })
})

describe('appendMoment', () => {
  it('hängt hinten an', () => {
    const first: Moments = [{ taken: '2026-08-01T00:00:00.000Z', level: 'fear' }]
    const next = appendMoment(first, { taken: '2026-08-02T00:00:00.000Z', level: 'anger' })
    expect(next).toHaveLength(2)
    expect(next.at(-1)?.level).toBe('anger')
  })

  /* Anders als beim Verlauf wird hier nicht zusammengefasst: Wer denselben
     Nachmittag zweimal unter der Schwelle war, war es zweimal. */
  it('kappt bei vierzig und wirft das Älteste weg', () => {
    const many: Moments = Array.from({ length: 40 }, (_, index) => ({
      taken: new Date(Date.UTC(2026, 0, index + 1)).toISOString(),
      level: 'fear' as const,
    }))
    const next = appendMoment(many, { taken: '2026-09-01T00:00:00.000Z', level: 'anger' })
    expect(next).toHaveLength(40)
    expect(next[0].taken).toBe(many[1].taken)
    expect(next.at(-1)?.level).toBe('anger')
  })
})
