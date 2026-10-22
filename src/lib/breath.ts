import type { BreathPattern } from '../types.ts'

/** The four phases, in the order a breath goes through them. */
export const PHASES = ['inhale', 'hold', 'exhale', 'rest'] as const

export type BreathPhase = (typeof PHASES)[number]

/** Seconds for one full breath. */
export function cycleOf(pattern: BreathPattern): number {
  return PHASES.reduce((sum, phase) => sum + pattern[phase], 0)
}

/**
 * Whole rounds that fill `minutes` — at least one. Rounded, not cut: a minute
 * of box breathing is four rounds (64 s), not three (48 s).
 */
export function roundsIn(pattern: BreathPattern, minutes: number): number {
  return Math.max(1, Math.round((minutes * 60) / cycleOf(pattern)))
}

/** Where a breath stands at one moment. */
export type BreathPoint = {
  phase: BreathPhase
  /** 0 … 1 through the current phase. */
  progress: number
  /** Whole seconds left in the phase, counted down: 4, 3, 2, 1. */
  left: number
  /** Completed rounds before this one, from 0. */
  round: number
}

/**
 * Where a session stands `elapsed` seconds after its start.
 *
 * Computed from the elapsed time and never stepped along: a counter that adds
 * a frame at a time drifts as soon as the browser drops frames, and a breath
 * that drifts is one the person can no longer follow.
 */
export function breathAt(pattern: BreathPattern, elapsed: number): BreathPoint {
  const cycle = cycleOf(pattern)
  const round = Math.floor(elapsed / cycle)
  let into = elapsed - round * cycle

  for (const phase of PHASES) {
    const length = pattern[phase]
    if (into < length) {
      return { phase, progress: into / length, left: Math.ceil(length - into), round }
    }
    into -= length
  }

  // A floating-point remainder at the very end of a cycle: the next begins.
  return { phase: 'inhale', progress: 0, left: pattern.inhale, round: round + 1 }
}

/**
 * How full the lungs are, 0 … 1 — the size of the shape on screen. Rises on
 * the in-breath, stays up through the hold, falls on the out-breath and stays
 * down through the rest.
 */
export function fullness({ phase, progress }: BreathPoint): number {
  switch (phase) {
    case 'inhale':
      return progress
    case 'hold':
      return 1
    case 'exhale':
      return 1 - progress
    case 'rest':
      return 0
  }
}
