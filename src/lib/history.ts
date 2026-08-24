import type { History, HistoryEntry, Level, LevelId } from '../types.ts'

/**
 * So viele Durchgänge bleiben stehen. Was älter ist, fällt hinten heraus.
 *
 * Nicht aus Platzgründen — vierundzwanzig Einträge sind ein Kilobyte —, sondern
 * weil die Linie sonst irgendwann aus Strichen besteht. Wer den Bogen monatlich
 * ausfüllt, sieht damit zwei Jahre.
 */
const KEEP = 24

/**
 * Zwei Durchgänge innerhalb dieser Spanne gelten als einer.
 *
 * Der Bogen lässt sich abbrechen und fortsetzen, und wer nach dem Ergebnis noch
 * einmal „Weiter bei Frage 30" antippt und durchklickt, hat nichts Neues
 * beantwortet — nur denselben Nachmittag ein zweites Mal abgeschlossen. Zwei
 * Punkte daraus wären keine Entwicklung, sondern ein Zählfehler.
 */
const SAME_SITTING_MINUTES = 30

/**
 * Prüft, was aus dem Speicher kommt — wie bei Antworten und Plänen. Eine
 * veraltete Zeile darf keine Linie zeichnen, die es nie gab.
 */
export function isHistory(value: unknown): value is History {
  if (!Array.isArray(value)) return false

  return value.every((entry: unknown) => {
    if (typeof entry !== 'object' || entry === null) return false
    const run = entry as Partial<HistoryEntry>
    return (
      typeof run.taken === 'string' &&
      typeof run.level === 'string' &&
      typeof run.calibration === 'number' &&
      Number.isFinite(run.calibration) &&
      typeof run.answered === 'number'
    )
  })
}

/**
 * Der neue Durchgang, hinten angehängt — oder an die Stelle des letzten, wenn
 * der aus derselben Sitzung stammt. Ältestes zuerst, gekappt auf `KEEP`.
 */
export function appendRun(history: History, entry: HistoryEntry): History {
  const previous = history.at(-1)
  const minutesApart =
    previous === undefined
      ? Infinity
      : (Date.parse(entry.taken) - Date.parse(previous.taken)) / 60_000

  const kept = minutesApart < SAME_SITTING_MINUTES ? history.slice(0, -1) : history

  return [...kept, entry].slice(-KEEP)
}

/**
 * Wo ein Kalibrierungswert auf der Skala der *Ränge* liegt — gebrochen, also
 * 8.4 für „im unteren Drittel von Mut".
 *
 * Die Umkehrung von `calibrate()` in `scoring.ts`, und aus demselben Grund:
 * Zwischen 600 und 700 liegen hundert Punkte, zwischen 20 und 30 nur zehn. Eine
 * Linie über die rohen Zahlen klebte deshalb unten am Rand und ließe die halbe
 * Skala als Rauschen erscheinen.
 */
export function rankAt(levels: Level[], calibration: number): number {
  for (let rank = 0; rank < levels.length - 1; rank++) {
    const lower = levels[rank]
    const upper = levels[rank + 1]
    if (calibration < upper.value) {
      const span = upper.value - lower.value
      return rank + Math.max(0, Math.min(1, (calibration - lower.value) / span))
    }
  }

  return levels.length - 1
}

/** Die Ebene eines Eintrags in der gelesenen Sprache; null bei unbekannter ID. */
export function levelOf(levels: Level[], id: LevelId): Level | null {
  return levels.find((level) => level.id === id) ?? null
}
