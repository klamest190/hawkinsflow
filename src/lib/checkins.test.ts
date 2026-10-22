import { describe, expect, it } from 'vitest'
import type { CheckIns } from '../types.ts'
import { KEEP, appendCheckIn, daysBetween, isCheckIns, todayOf } from './checkins.ts'

/* Local times, so "the same day" means the same day wherever the test runs. */
const at = (day: number, hour: number): string => new Date(2026, 9, day, hour).toISOString()

describe('isCheckIns', () => {
  it('accepts check-ins on any level of the scale', () => {
    expect(isCheckIns([])).toBe(true)
    expect(isCheckIns([{ at: at(1, 9), level: 'shame' }, { at: at(2, 9), level: 'joy' }])).toBe(true)
  })

  it('refuses what the trail could not draw', () => {
    expect(isCheckIns({})).toBe(false)
    expect(isCheckIns([{ at: at(1, 9), level: 'bliss' }])).toBe(false)
    expect(isCheckIns([{ at: 'tuesday', level: 'joy' }])).toBe(false)
    expect(isCheckIns([{ level: 'joy' }])).toBe(false)
    expect(isCheckIns([null])).toBe(false)
  })
})

describe('appendCheckIn', () => {
  it('keeps one per day: the later tap replaces the earlier', () => {
    const morning: CheckIns = [{ at: at(5, 8), level: 'fear' }]
    expect(appendCheckIn(morning, { at: at(5, 20), level: 'courage' })).toEqual([
      { at: at(5, 20), level: 'courage' },
    ])
  })

  it('adds a new day at the end', () => {
    const yesterday: CheckIns = [{ at: at(4, 22), level: 'fear' }]
    expect(appendCheckIn(yesterday, { at: at(5, 7), level: 'courage' })).toHaveLength(2)
  })

  it('cuts the oldest days off', () => {
    let checkIns: CheckIns = []
    for (let day = 0; day < KEEP + 5; day++) {
      checkIns = appendCheckIn(checkIns, { at: new Date(2026, 0, day + 1, 9).toISOString(), level: 'reason' })
    }
    expect(checkIns).toHaveLength(KEEP)
    expect(checkIns[0]?.at).toBe(new Date(2026, 0, 6, 9).toISOString())
  })
})

describe('todayOf', () => {
  const checkIns: CheckIns = [
    { at: at(4, 9), level: 'fear' },
    { at: at(5, 9), level: 'courage' },
  ]

  it('finds the check-in made today', () => {
    expect(todayOf(checkIns, new Date(2026, 9, 5, 23))).toEqual({ at: at(5, 9), level: 'courage' })
  })

  it('finds none on a new day', () => {
    expect(todayOf(checkIns, new Date(2026, 9, 6, 0, 1))).toBeNull()
    expect(todayOf([], new Date())).toBeNull()
  })
})

describe('daysBetween', () => {
  it('counts calendar days, not 24-hour spans', () => {
    expect(daysBetween(new Date(2026, 9, 5, 23), new Date(2026, 9, 6, 1))).toBe(1)
    expect(daysBetween(new Date(2026, 9, 5, 1), new Date(2026, 9, 5, 23))).toBe(0)
  })

  it('does not drop a day when the clocks change', () => {
    // Central Europe leaves summer time on the last Sunday of October.
    expect(daysBetween(new Date(2026, 9, 24, 12), new Date(2026, 9, 26, 12))).toBe(2)
    expect(daysBetween(new Date(2026, 2, 28, 12), new Date(2026, 2, 30, 12))).toBe(2)
  })
})
