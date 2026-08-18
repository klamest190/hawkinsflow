/* localStorage kann werfen: im privaten Modus mancher Browser, bei vollem
   Speicher, in eingebetteten Ansichten ohne Zugriff. Für eine App, deren Kern
   auch ohne Speichern funktioniert, ist das kein Fehlerfall — also fangen beide
   Funktionen ab und tun im Zweifel nichts. */

export function load<T>(key: string, isValid: (value: unknown) => value is T): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* Ohne Speicher läuft die App weiter, nur ohne Gedächtnis. */
  }
}

export function clear(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    /* siehe oben */
  }
}
