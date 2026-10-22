import { BASE_MINUTES, SESSIONS, SESSION_MINUTES, type GuidedId, type SessionMinutes } from '../data/sessions.ts'
import { itemAt } from './array.ts'

/** The seconds of each step at the chosen length. */
export function stepsFor(id: GuidedId, minutes: SessionMinutes): number[] {
  const factor = minutes / BASE_MINUTES
  return SESSIONS[id].map((seconds) => seconds * factor)
}

/** The whole session in seconds. */
export function totalOf(steps: readonly number[]): number {
  return steps.reduce((sum, seconds) => sum + seconds, 0)
}

/** Where a session stands at one moment. */
export type SessionPoint = {
  /** The current step, from 0; the last one once done. */
  index: number
  /** Seconds left in this step. */
  stepLeft: number
  /** 0 … 1 through this step. */
  stepProgress: number
  done: boolean
}

/**
 * Where a session stands `elapsed` seconds after its start — computed from
 * the time and never stepped along, as `breathAt` is, so the step shown and
 * the step heard come from the same source.
 */
export function sessionAt(steps: readonly number[], elapsed: number): SessionPoint {
  let start = 0
  for (let index = 0; index < steps.length; index++) {
    const length = itemAt(steps, index)
    if (elapsed < start + length) {
      return { index, stepLeft: start + length - elapsed, stepProgress: (elapsed - start) / length, done: false }
    }
    start += length
  }
  return { index: steps.length - 1, stepLeft: 0, stepProgress: 1, done: true }
}

/** Seconds from the start to the beginning of a step — where "next step" jumps to. */
export function startOf(steps: readonly number[], index: number): number {
  return totalOf(steps.slice(0, index))
}

/** What is remembered between sessions: the length, and whether to read aloud. */
export type SessionPreference = {
  minutes: SessionMinutes
  voice: boolean
}

export const SESSION_DEFAULT: SessionPreference = { minutes: 10, voice: false }

/** Checks what comes out of storage, as for every other key. */
export function isSessionPreference(value: unknown): value is SessionPreference {
  if (typeof value !== 'object' || value === null) return false
  const preference = value as Partial<Record<keyof SessionPreference, unknown>>
  return (
    SESSION_MINUTES.some((minutes) => minutes === preference.minutes) && typeof preference.voice === 'boolean'
  )
}
