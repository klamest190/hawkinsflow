/* Getting a file to the person — shared by the PDF and the data backup.
 *
 * Moved here from `pdf/exportResult.ts` when the backup needed the same way
 * out: one route to a file, so the phone and the desk behave the same for both.
 * The file type comes from the blob, since it is no longer always a PDF.
 */

/**
 * `2026-09-26` — from the *local* date fields, not `toISOString()`: at 00:30
 * on 1 January in Central Europe it is still 31 December in UTC, and the file
 * would carry the wrong year.
 */
export function localDay(when: Date): string {
  const pad = (value: number): string => String(value).padStart(2, '0')
  return `${when.getFullYear()}-${pad(when.getMonth() + 1)}-${pad(when.getDate())}`
}

/**
 * Umlaute und alles andere Ungerade aus einem Dateinamen nehmen.
 *
 * „Neutralität" wird zu „Neutralitaet" und nicht zu „Neutralitt": erst die
 * deutschen Sonderfälle ausschreiben, dann den Rest über NFKD zerlegen und die
 * übrig gebliebenen Akzente wegwerfen. Ein Dateiname mit Umlaut überlebt zwar
 * die meisten Systeme, aber nicht alle — und ein E-Mail-Anhang schon gar nicht.
 */
export function asciiFold(text: string): string {
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
 * Die Datei beim Menschen abliefern.
 *
 * Auf dem Telefon führt der `<a download>`-Weg ins Leere — iOS öffnet das PDF
 * in einem neuen Tab, und von dort ist es nur über Umwege zu sichern. Das
 * Teilen-Blatt legt es dagegen wirklich ab. Auf dem Schreibtisch ist es
 * umgekehrt: dort erwartet man einen Download und keinen Dialog.
 */
export async function deliver(blob: Blob, name: string): Promise<void> {
  const isTouch = window.matchMedia?.('(pointer: coarse)').matches ?? false

  if (isTouch && typeof navigator.canShare === 'function') {
    const file = new File([blob], name, { type: blob.type })
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
