import { describe, expect, it } from 'vitest'
import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { QUESTIONS } from '../data/questions.ts'
import { copy } from '../i18n/copy.ts'
import { levelsIn } from '../i18n/levels.ts'
import { evaluate } from '../lib/scoring.ts'
import type { Answers, AnswerValue, Language, Plan } from '../types.ts'
import { fileName } from './exportResult.ts'
import { ResultDocument } from './ResultDocument.tsx'

/** Die ersten Bytes als Text — jedes PDF beginnt mit `%PDF-`. */
const magic = (pdf: Uint8Array): string => new TextDecoder().decode(pdf.subarray(0, 5))

/* Der Rauchtest, den der Build nicht ersetzen kann.
 *
 * `@react-pdf` prüft nichts zur Übersetzungszeit: eine Stil-Eigenschaft, die es
 * nicht kennt, und eine Farbe, die es nicht lesen kann, fallen erst auf, wenn
 * wirklich ein PDF gesetzt wird. `npx tsc -b` bleibt dabei grün. Also wird hier
 * gesetzt — in beiden Sprachen und in den Fassungen, in denen sich die Struktur
 * unterscheidet. */

const LANGUAGES: Language[] = ['de', 'en']

const full: Answers = {}
QUESTIONS.forEach((question, position) => {
  full[question.id] = ((position * 3) % 5) as AnswerValue
})

/* Alles auf „fast immer": der Schwerpunkt landet ganz oben. Dort fehlt die
   nächste Ebene, und das Band muss sich das Paar darunter suchen. */
const top: Answers = {}
QUESTIONS.forEach((question) => {
  top[question.id] = 4
})

const plan: Plan = {
  level: 'courage',
  when: 'ich merke, dass ich im Meeting nichts sage',
  then: 'sage ich den nächsten Satz trotzdem',
  created: '2026-01-01T00:00:00.000Z',
}

const createdAt = new Date(2026, 7, 24, 13, 0, 0)

async function render(language: Language, answers: Answers, withPlan: boolean): Promise<Uint8Array> {
  const levels = levelsIn(language)
  return renderToBuffer(
    createElement(ResultDocument, {
      result: evaluate(levels, answers),
      language,
      t: copy[language],
      answered: Object.keys(answers).length,
      plan: withPlan ? plan : null,
      createdAt,
    }) as never,
  )
}

describe.each(LANGUAGES)('Das PDF (%s)', (language) => {
  it('setzt einen vollen Bogen mit Plan', async () => {
    const pdf = await render(language, full, true)
    expect(magic(pdf)).toBe('%PDF-')
    expect(pdf.length).toBeGreaterThan(10_000)
  })

  it('setzt einen leeren Bogen ohne Plan', async () => {
    const pdf = await render(language, {}, false)
    expect(magic(pdf)).toBe('%PDF-')
  })

  /* Erleuchtung ist der Sonderfall der ganzen Skala: keine Ebene darüber, also
     kein „Als Nächstes" und ein Band, das nicht bei der dominanten anfängt. */
  it('setzt den obersten Rand der Skala', async () => {
    const pdf = await render(language, top, false)
    expect(magic(pdf)).toBe('%PDF-')
  })

  /* Der Rat steht auch auf dem Blatt — das Blatt ist das, was jemand mitnimmt.
     Nachgewiesen über die Größe und nicht über den Text: `@react-pdf` legt
     Zeichenketten in komprimierten Strömen ab, und `pdfjs-dist` als Abhängigkeit
     nur für diese eine Zusicherung wäre teurer als der Nachweis wert ist.
     Dieselbe Auswertung einmal mit und einmal ohne Rat gesetzt, ist eindeutig
     genug: Fiele die Ausgabe aus dem Dokument, wären beide gleich groß. */
  it('nimmt den Rat mit aufs Blatt', async () => {
    const levels = levelsIn(language)
    const stripped = levels.map((level) => ({ ...level, advice: '' }))
    const document = (list: typeof levels) =>
      renderToBuffer(
        createElement(ResultDocument, {
          result: evaluate(list, full),
          language,
          t: copy[language],
          answered: QUESTIONS.length,
          plan: null,
          createdAt,
        }) as never,
      )
    const [withAdvice, without] = await Promise.all([document(levels), document(stripped)])
    expect(withAdvice.length).toBeGreaterThan(without.length)
  })
})

describe('fileName', () => {
  const day = new Date(2026, 7, 24, 13, 0, 0)

  it('stellt das Datum voran und hängt die Ebene an', () => {
    expect(fileName('Mut', day)).toBe('2026-08-24_Hawkins-Flow_Mut.pdf')
    expect(fileName('Courage', day)).toBe('2026-08-24_Hawkins-Flow_Courage.pdf')
  })

  it('schreibt Umlaute aus, statt sie zu verschlucken', () => {
    expect(fileName('Neutralität', day)).toBe('2026-08-24_Hawkins-Flow_Neutralitaet.pdf')
  })

  it('nimmt den lokalen Tag und nicht den in UTC', () => {
    // 1. Januar, kurz nach Mitternacht — in UTC ist noch das alte Jahr.
    expect(fileName('Mut', new Date(2027, 0, 1, 0, 30))).toContain('2027-01-01')
  })

  it('kommt auch ohne brauchbaren Ebenennamen zu einem Namen', () => {
    expect(fileName('···', day)).toBe('2026-08-24_Hawkins-Flow.pdf')
  })
})
