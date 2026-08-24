import { createElement } from 'react'
import type { Copy } from '../i18n/copy.ts'
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
 * Umlaute und alles andere Ungerade aus einem Dateinamen nehmen.
 *
 * „Neutralität" wird zu „Neutralitaet" und nicht zu „Neutralitt": erst die
 * deutschen Sonderfälle ausschreiben, dann den Rest über NFKD zerlegen und die
 * übrig gebliebenen Akzente wegwerfen. Ein Dateiname mit Umlaut überlebt zwar
 * die meisten Systeme, aber nicht alle — und ein E-Mail-Anhang schon gar nicht.
 */
function asciiFold(text: string): string {
  return text
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * `2026-08-24_Hawkins-Flow_Mut.pdf`
 *
 * Das Datum steht vorn, damit sich mehrere Auswertungen in jeder Dateiliste von
 * selbst chronologisch ordnen; die Ebene steht dahinter, damit der Verlauf ohne
 * Öffnen zu lesen ist.
 *
 * Der Tag kommt aus den *lokalen* Feldern und nicht aus `toISOString()`: am
 * 1. Januar um 00:30 MEZ ist es in UTC noch der 31. Dezember, und die Datei
 * trüge das falsche Jahr.
 */
export function fileName(levelName: string, when: Date): string {
  const pad = (value: number): string => String(value).padStart(2, '0')
  const day = `${when.getFullYear()}-${pad(when.getMonth() + 1)}-${pad(when.getDate())}`
  const level = asciiFold(levelName)

  return level === '' ? `${day}_${STEM}.pdf` : `${day}_${STEM}_${level}.pdf`
}

/**
 * Die Datei beim Menschen abliefern.
 *
 * Auf dem Telefon führt der `<a download>`-Weg ins Leere — iOS öffnet das PDF
 * in einem neuen Tab, und von dort ist es nur über Umwege zu sichern. Das
 * Teilen-Blatt legt es dagegen wirklich ab. Auf dem Schreibtisch ist es
 * umgekehrt: dort erwartet man einen Download und keinen Dialog.
 */
async function deliver(blob: Blob, name: string): Promise<void> {
  const isTouch = window.matchMedia?.('(pointer: coarse)').matches ?? false

  if (isTouch && typeof navigator.canShare === 'function') {
    const file = new File([blob], name, { type: 'application/pdf' })
    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: name })
        return
      } catch (error) {
        // Blatt weggewischt heißt fertig, nicht fehlgeschlagen.
        if (error instanceof DOMException && error.name === 'AbortError') return
        // Alles andere fällt unten auf den klassischen Download zurück.
      }
    }
  }

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.click()
  // Etwas Luft, bevor die URL ungültig wird — sonst bricht der Download ab.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
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
