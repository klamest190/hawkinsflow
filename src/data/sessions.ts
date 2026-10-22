import type { MeditationId } from './meditations.ts'

/**
 * The forms with a guided session. Slow breathing has none of its own: Ebb
 * Flow is that practice, and its card leads there.
 */
export const GUIDED = ['bodyScan', 'breath', 'lovingKindness', 'mantra', 'openAwareness'] as const satisfies readonly MeditationId[]

export type GuidedId = (typeof GUIDED)[number]

/** The length every session is written for; the others are scaled from it. */
export const BASE_MINUTES = 10

/** The lengths on offer. Each scales every step alike, so the arc stays the same. */
export const SESSION_MINUTES = [5, 10, 20] as const

export type SessionMinutes = (typeof SESSION_MINUTES)[number]

/**
 * Seconds per step at ten minutes — each list adds up to 600, which a test
 * checks. The texts of the steps are in `i18n/sessions.ts`, one per entry.
 *
 * The steps are not even: arriving is short, the middle long, and the body
 * scan gives the back and the whole body more time than the toes — the time
 * follows where attention needs to settle, not a metronome.
 */
export const SESSIONS: Record<GuidedId, readonly number[]> = {
  // Arrive, feet, lower legs, knees and thighs, pelvis, belly, back, chest,
  // hands and arms, shoulders and neck, face, the whole body.
  bodyScan: [40, 45, 45, 45, 50, 50, 55, 50, 50, 50, 50, 70],
  // Arrive, find the breath, the anchor, the first wandering, counting,
  // coming back, widening, close.
  breath: [45, 60, 75, 90, 90, 90, 90, 60],
  // Arrive, yourself, someone close, someone neutral, someone difficult,
  // everyone, close.
  lovingKindness: [60, 120, 90, 90, 90, 90, 60],
  // Arrive, the word, repeating, coming back, softer, letting it fade, close.
  mantra: [45, 45, 120, 120, 120, 90, 60],
  // Arrive, the breath, sounds, the body, thoughts, everything, resting, close.
  openAwareness: [45, 75, 90, 90, 90, 90, 60, 60],
}
