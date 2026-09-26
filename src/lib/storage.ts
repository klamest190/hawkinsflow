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

/** Every key this app writes starts with this — see the hooks in `src/hooks/`. */
export const KEY_PREFIX = 'hawkinsflow.'

/**
 * Removes every key of this app except those listed in `keep`. The last resort
 * of the crash screen, for a failure that comes back after every reload.
 *
 * The keys are collected first and removed afterwards: removing while walking
 * `localStorage.key(i)` shifts the indices and skips every other entry.
 */
export function clearAppData(keep: readonly string[] = []): void {
  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key !== null && key.startsWith(KEY_PREFIX) && !keep.includes(key)) keys.push(key)
    }
    for (const key of keys) localStorage.removeItem(key)
  } catch {
    /* see above */
  }
}
