import { describe, expect, it } from 'vitest'
import { GUIDED, SESSIONS } from '../data/sessions.ts'
import { isSessionPreference, sessionAt, startOf, stepsFor, totalOf } from './session.ts'

describe('guided sessions', () => {
  it('writes every session for ten minutes', () => {
    for (const id of GUIDED) expect(totalOf(SESSIONS[id]), id).toBe(600)
  })

  it('scales every step alike for the other lengths', () => {
    for (const id of GUIDED) {
      expect(totalOf(stepsFor(id, 5)), id).toBe(300)
      expect(totalOf(stepsFor(id, 20)), id).toBe(1200)
      expect(stepsFor(id, 20).length, id).toBe(SESSIONS[id].length)
    }
    expect(stepsFor('bodyScan', 5)[0]).toBe(20)
  })
})

describe('sessionAt', () => {
  const steps = [10, 20, 30]

  it('finds the step and how far into it', () => {
    expect(sessionAt(steps, 0)).toEqual({ index: 0, stepLeft: 10, stepProgress: 0, done: false })
    expect(sessionAt(steps, 15)).toEqual({ index: 1, stepLeft: 15, stepProgress: 0.25, done: false })
    // A step's end is the next one's start.
    expect(sessionAt(steps, 30).index).toBe(2)
  })

  it('is done at the end and stays on the last step', () => {
    expect(sessionAt(steps, 60)).toEqual({ index: 2, stepLeft: 0, stepProgress: 1, done: true })
    expect(sessionAt(steps, 999).done).toBe(true)
  })

  it('knows where each step begins', () => {
    expect(startOf(steps, 0)).toBe(0)
    expect(startOf(steps, 2)).toBe(30)
    expect(sessionAt(steps, startOf(steps, 2)).index).toBe(2)
  })
})

describe('the remembered choice', () => {
  it('accepts a length on offer and a yes or no', () => {
    expect(isSessionPreference({ minutes: 20, voice: true })).toBe(true)
    expect(isSessionPreference({ minutes: 15, voice: true })).toBe(false)
    expect(isSessionPreference({ minutes: 10, voice: 'yes' })).toBe(false)
    expect(isSessionPreference(null)).toBe(false)
  })
})
