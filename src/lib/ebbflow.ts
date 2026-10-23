import { BREATH_PATTERNS } from '../data/breathing.ts'
import type { BreathPattern } from '../types.ts'
import { cycleOf } from './breath.ts'

/**
 * Ebb Flow: a pause between impulse and reaction, breathed in and out.
 *
 * Three rhythms, from calming to clear. They differ only in how the ten
 * seconds of a breath are split — and ten seconds is six breaths a minute,
 * the rate at which heartbeat and breath fall into step. That comes from the
 * rate, not the split, so it holds in all three; the split only leans the
 * pause one way or the other.
 *
 * The list is the source and the type comes from it, so a mode can't be
 * offered in one place and missing in another.
 */
export const EBB_MODES = ['relax', 'balance', 'clarity'] as const

export type EbbMode = (typeof EBB_MODES)[number]

/** The breathing pattern behind each mode. Relax is the long exhale the fear practice uses. */
export const EBB_PATTERNS: Record<EbbMode, BreathPattern> = {
  relax: BREATH_PATTERNS.longExhale,
  balance: BREATH_PATTERNS.balance,
  clarity: BREATH_PATTERNS.clarity,
}

/** Seconds of one breath — the same in every mode, which a test checks. */
export const EBB_CYCLE = 10

/**
 * The lengths on offer, in seconds. Each is a whole number of breaths, so a
 * session always ends at the end of an out-breath and never halfway in:
 * twenty seconds is two breaths, five minutes thirty. That divisibility is
 * the only rule for adding one.
 */
export const EBB_DURATIONS = [20, 60, 120, 300] as const

export type EbbDuration = (typeof EBB_DURATIONS)[number]

/** The calmest rhythm and the twenty seconds Ebb Flow is named for. */
export const EBB_DEFAULT: EbbPreference = { mode: 'relax', seconds: 20 }

/** What is remembered between visits: the rhythm and the length. */
export type EbbPreference = {
  mode: EbbMode
  seconds: EbbDuration
}

/** How many breaths a session of this length is. */
export function breathsIn(seconds: number): number {
  return Math.round(seconds / EBB_CYCLE)
}

/** One cycle of a mode's pattern, in seconds. */
export function cycleOfMode(mode: EbbMode): number {
  return cycleOf(EBB_PATTERNS[mode])
}

export function isEbbMode(value: unknown): value is EbbMode {
  return typeof value === 'string' && EBB_MODES.some((mode) => mode === value)
}

export function isEbbDuration(value: unknown): value is EbbDuration {
  return typeof value === 'number' && EBB_DURATIONS.some((seconds) => seconds === value)
}

/** Checks what comes out of storage, as for every other key. */
export function isEbbPreference(value: unknown): value is EbbPreference {
  if (typeof value !== 'object' || value === null) return false
  const preference = value as Partial<Record<keyof EbbPreference, unknown>>
  return isEbbMode(preference.mode) && isEbbDuration(preference.seconds)
}

/**
 * This many recently shown quotes stay blocked. As in the Ebb Flow app: what
 * reads as repetition is the same line coming round twice in quick
 * succession, and a short memory prevents that far better than a longer list.
 */
const RECENT_QUOTES = 8

/**
 * The next quote's index, none of the recently shown ones, with the memory
 * carried forward — the one just drawn at the end. Picked from a list of
 * candidates rather than drawn until one fits, so it always ends; at least
 * two candidates always remain, so it never becomes predictable.
 *
 * `random` is a parameter so a test can pin it.
 */
export function pushNextQuote(recent: readonly number[], total: number, random: () => number = Math.random): number[] {
  const memory = Math.max(0, Math.min(RECENT_QUOTES, total - 2))
  // `slice(-0)` would be the whole list, not none of it.
  const blocked = new Set(memory === 0 ? [] : recent.slice(-memory))
  const candidates: number[] = []
  for (let index = 0; index < total; index++) {
    if (!blocked.has(index)) candidates.push(index)
  }
  const next = candidates[Math.floor(random() * candidates.length)] ?? 0
  return [...recent, next].slice(-RECENT_QUOTES)
}

/**
 * The time left as it stands in the ring: plain seconds for a twenty-second
 * pause, `m:ss` from a minute on. The form follows the session, not what is
 * left of it — a one-minute session shows `0:59`, and never switches from
 * `1:00` to `59` halfway.
 */
export function remainingLabel(remaining: number, seconds: number): string {
  const left = Math.max(0, Math.ceil(remaining))
  if (seconds < 60) return String(left)
  return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`
}
