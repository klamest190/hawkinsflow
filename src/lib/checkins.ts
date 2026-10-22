import { isLevelId } from '../data/levels.ts'
import type { CheckIn, CheckIns } from '../types.ts'
import { localDay } from './download.ts'

/**
 * So many days stay. Two months: long enough to see whether a level keeps
 * coming back, short enough that the trail stays about days and not seasons —
 * seasons are what the questionnaire is for. Sixty entries are under 4 kB.
 */
export const KEEP = 60

/** How many days the trail on the start page spans, ending at the latest. */
export const WINDOW = 30

/**
 * Checks what comes out of storage, as for history and moments. The level is
 * checked against the scale: an entry the trail finds no color for would be
 * a gap that looks like a day off.
 */
export function isCheckIns(value: unknown): value is CheckIns {
  if (!Array.isArray(value)) return false

  return value.every((entry: unknown) => {
    if (typeof entry !== 'object' || entry === null) return false
    const checkIn = entry as Partial<Record<keyof CheckIn, unknown>>
    return (
      typeof checkIn.at === 'string' &&
      !Number.isNaN(Date.parse(checkIn.at)) &&
      isLevelId(checkIn.level)
    )
  })
}

/** Whether two moments fall on the same calendar day where the person is. */
function sameDay(a: string, b: string): boolean {
  return localDay(new Date(a)) === localDay(new Date(b))
}

/**
 * The new check-in at the end — or in place of the last one, if that was
 * today. One per day: a second tap in the evening is a correction of the
 * morning, not a second day. Oldest first, cut to `KEEP`.
 */
export function appendCheckIn(checkIns: CheckIns, entry: CheckIn): CheckIns {
  const previous = checkIns.at(-1)
  const kept = previous !== undefined && sameDay(previous.at, entry.at) ? checkIns.slice(0, -1) : checkIns
  return [...kept, entry].slice(-KEEP)
}

/** Today's check-in, if there is one. */
export function todayOf(checkIns: CheckIns, now: Date): CheckIn | null {
  const latest = checkIns.at(-1)
  return latest !== undefined && sameDay(latest.at, now.toISOString()) ? latest : null
}

/**
 * Whole calendar days from one moment to another, where the person is.
 * Counted from local midnights and rounded, so the hour lost or gained when
 * the clocks change doesn't drop a day.
 */
export function daysBetween(from: Date, to: Date): number {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.round((end.getTime() - start.getTime()) / 86_400_000)
}
