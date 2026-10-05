import type { History, HistoryEntry, Level, LevelId } from '../types.ts'
import { itemAt } from './array.ts'

/**
 * So viele Durchgänge bleiben stehen. Was älter ist, fällt hinten heraus.
 *
 * Nicht aus Platzgründen — vierundzwanzig Einträge sind ein Kilobyte —, sondern
 * weil die Linie sonst irgendwann aus Strichen besteht. Wer den Bogen monatlich
 * ausfüllt, sieht damit zwei Jahre.
 */
export const KEEP = 24

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
      typeof run.answered === 'number' &&
      (run.edition === undefined || (Number.isInteger(run.edition) && run.edition >= 1))
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
    const lower = itemAt(levels, rank)
    const upper = itemAt(levels, rank + 1)
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

/** The edition a run answered; runs from before editions were stored are 1. */
export function editionOf(run: HistoryEntry): number {
  return run.edition ?? 1
}

/**
 * The first run that answered a different edition than the one before it — the
 * point from which the trail is no longer one series. `null` while every run
 * answered the same questions. With several changes, the latest one: that is
 * where the comparable stretch the person is looking at begins.
 */
export function editionBreak(history: History): HistoryEntry | null {
  for (let index = history.length - 1; index > 0; index--) {
    const run = itemAt(history, index)
    if (editionOf(run) !== editionOf(itemAt(history, index - 1))) return run
  }
  return null
}

/**
 * From this many days after the last run on, the start page suggests the next
 * one. The questionnaire asks about "the past three weeks": from here on, it
 * no longer measures the same weeks twice.
 */
export const RETURN_AFTER_DAYS = 21

/**
 * The last run, if it is old enough to suggest a new one — with the whole days
 * since. `null` while there is no run yet, or the last one is recent.
 *
 * The history only turns into a line through repetition, and nothing else in
 * this app reminds anyone: no notifications, only the start page.
 */
export function dueRun(history: History, now: Date): { run: HistoryEntry; days: number } | null {
  const run = history.at(-1)
  if (run === undefined) return null

  const days = Math.floor((now.getTime() - Date.parse(run.taken)) / 86_400_000)
  return days >= RETURN_AFTER_DAYS ? { run, days } : null
}
