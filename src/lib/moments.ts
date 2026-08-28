import { BELOW_THRESHOLD } from '../data/levels.ts'
import type { BelowLevelId, Moment, Moments } from '../types.ts'

/**
 * So viele Momente bleiben stehen.
 *
 * Großzügiger als beim Verlauf (24 Durchgänge): Der Fragebogen wird alle paar
 * Wochen ausgefüllt, ein Moment kann dreimal an einem Dienstag passieren. Vierzig
 * sind ein paar Wochen Alltag und immer noch weniger als zwei Kilobyte.
 */
const KEEP = 40

/** Ob eine Zeichenkette eine der acht Ebenen unter der Schwelle benennt. */
export function isBelowLevelId(value: unknown): value is BelowLevelId {
  return typeof value === 'string' && (BELOW_THRESHOLD as string[]).includes(value)
}

/**
 * Prüft, was aus dem Speicher kommt — wie bei Antworten, Plänen und Verlauf.
 *
 * Die Ebene wird gegen die Skala geprüft und nicht nur auf „ist eine
 * Zeichenkette": Ein Eintrag mit `courage` wäre in diesem Bogen ein Widerspruch
 * in sich, und die Spur auf der Startseite fände dafür keine Farbe.
 */
export function isMoments(value: unknown): value is Moments {
  if (!Array.isArray(value)) return false

  return value.every((entry: unknown) => {
    if (typeof entry !== 'object' || entry === null) return false
    const moment = entry as Partial<Moment>
    return typeof moment.taken === 'string' && isBelowLevelId(moment.level)
  })
}

/** Der neue Moment, hinten angehängt. Ältestes zuerst, gekappt auf `KEEP`. */
export function appendMoment(moments: Moments, entry: Moment): Moments {
  return [...moments, entry].slice(-KEEP)
}
