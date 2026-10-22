import { describe, expect, it } from 'vitest'
import { BREATH_PATTERNS } from '../data/breathing.ts'
import { breathAt, cycleOf, fullness, roundsIn } from './breath.ts'

const { box, longExhale } = BREATH_PATTERNS

describe('breathAt', () => {
  it('walks the box through all four phases', () => {
    expect(breathAt(box, 0)).toMatchObject({ phase: 'inhale', left: 4, round: 0 })
    expect(breathAt(box, 5)).toMatchObject({ phase: 'hold', left: 3, round: 0 })
    expect(breathAt(box, 9)).toMatchObject({ phase: 'exhale', left: 3, round: 0 })
    expect(breathAt(box, 15.5)).toMatchObject({ phase: 'rest', left: 1, round: 0 })
    expect(breathAt(box, 16)).toMatchObject({ phase: 'inhale', left: 4, round: 1 })
  })

  it('skips the phases a pattern leaves out', () => {
    // No hold after the in-breath: four seconds in, the out-breath begins.
    expect(breathAt(longExhale, 4)).toMatchObject({ phase: 'exhale', left: 6, round: 0 })
    expect(breathAt(longExhale, 9.9).phase).toBe('exhale')
    expect(breathAt(longExhale, 10)).toMatchObject({ phase: 'inhale', round: 1 })
  })

  it('reports how far through the phase it is', () => {
    expect(breathAt(box, 2).progress).toBeCloseTo(0.5)
    expect(breathAt(longExhale, 7).progress).toBeCloseTo(0.5)
  })
})

describe('fullness', () => {
  it('rises, holds, falls and rests', () => {
    expect(fullness(breathAt(box, 2))).toBeCloseTo(0.5)
    expect(fullness(breathAt(box, 6))).toBe(1)
    expect(fullness(breathAt(box, 10))).toBeCloseTo(0.5)
    expect(fullness(breathAt(box, 14))).toBe(0)
  })
})

describe('roundsIn', () => {
  it('fills the minutes with whole rounds', () => {
    expect(cycleOf(box)).toBe(16)
    expect(roundsIn(box, 1)).toBe(4)
    expect(roundsIn(longExhale, 1)).toBe(6)
    expect(roundsIn(longExhale, 6)).toBe(36)
  })

  it('never gives less than one round', () => {
    expect(roundsIn(box, 0.1)).toBe(1)
  })
})
