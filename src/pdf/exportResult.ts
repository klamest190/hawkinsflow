import { createElement } from 'react'
import type { Copy } from '../i18n/copy.ts'
import { asciiFold, deliver, localDay } from '../lib/download.ts'
import type { Result as Evaluation } from '../lib/scoring.ts'
import type { Language, Plan } from '../types.ts'

/* Der Weg vom Ergebnis zur Datei.
 *
 * Diese Datei ist absichtlich winzig und wird ganz normal mitgeladen — der
 * Knopf im Ergebnis braucht sie ja sofort. Alles Schwere hängt hinter dem
 * `import()` weiter unten: `@react-pdf` wiegt rund ein Megabyte, und das soll
 * erst über die Leitung gehen, wenn jemand den Knopf auch drückt.
 */

/** Der Wortteil des Dateinamens — ohne Datum, ohne Endung. */
const STEM = 'Hawkins-Flow'

/**
 * `2026-08-24_Hawkins-Flow_Mut.pdf`
 *
 * Das Datum steht vorn, damit sich mehrere Auswertungen in jeder Dateiliste von
 * selbst chronologisch ordnen; die Ebene steht dahinter, damit der Verlauf ohne
 * Öffnen zu lesen ist.
 *
 * Der Tag kommt aus den lokalen Feldern — siehe `localDay`.
 */
export function fileName(levelName: string, when: Date): string {
  const day = localDay(when)
  const level = asciiFold(levelName)

  return level === '' ? `${day}_${STEM}.pdf` : `${day}_${STEM}_${level}.pdf`
}

export type ExportOptions = {
  result: Evaluation
  language: Language
  t: Copy
  answered: number
  plan: Plan | null
}

/** Ergebnis rendern, benennen, ausliefern. Wirft, wenn etwas davon scheitert. */
export async function exportResult(options: ExportOptions): Promise<void> {
  const createdAt = new Date()

  const [{ pdf }, { ResultDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./ResultDocument.tsx'),
  ])

  // `as never`: die React-Typen der App und die von `@react-pdf` beißen sich an
  // dieser Stelle, obwohl zur Laufzeit dasselbe Element herauskommt.
  const element = createElement(ResultDocument, { ...options, createdAt })
  const blob = await pdf(element as never).toBlob()

  await deliver(blob, fileName(options.result.dominant.name, createdAt))
}
