import { describe, expect, it } from 'vitest'
import { ebbCopy } from '../i18n/ebbflow.ts'
import {
  EBB_CYCLE,
  EBB_DURATIONS,
  EBB_MODES,
  breathsIn,
  cycleOfMode,
  isEbbPreference,
  pushNextQuote,
  remainingLabel,
} from './ebbflow.ts'

describe('Ebb Flow', () => {
  /* Only the index is kept: a quote on screen switches along with the
     language, so both lists must run line for line. */
  it('has as many quotes in both languages', () => {
    expect(ebbCopy.en.quotes).toHaveLength(ebbCopy.de.quotes.length)
    expect(ebbCopy.de.quotes.length).toBeGreaterThanOrEqual(10)
  })

  /* All three rhythms are ten seconds a breath: only so is every length a
     whole number of breaths, and only so is it six a minute in every mode. */
  it('gives every rhythm the same ten-second breath', () => {
    for (const mode of EBB_MODES) expect(cycleOfMode(mode), mode).toBe(EBB_CYCLE)
  })

  it('makes every length a whole number of breaths', () => {
    for (const seconds of EBB_DURATIONS) {
      expect(seconds % EBB_CYCLE, `${seconds}`).toBe(0)
    }
    expect(breathsIn(20)).toBe(2)
    expect(breathsIn(300)).toBe(30)
  })

  it('shows plain seconds for a short pause and minutes from one on', () => {
    expect(remainingLabel(20, 20)).toBe('20')
    expect(remainingLabel(4.2, 20)).toBe('5')
    expect(remainingLabel(60, 60)).toBe('1:00')
    expect(remainingLabel(59.5, 60)).toBe('1:00')
    expect(remainingLabel(59, 60)).toBe('0:59')
    expect(remainingLabel(-1, 300)).toBe('0:00')
  })

  it('never draws one of the last eight quotes again', () => {
    let recent: number[] = []
    for (let draw = 0; draw < 200; draw++) {
      const next = pushNextQuote(recent, 20)
      const drawn = next.at(-1)
      expect(recent.slice(-8)).not.toContain(drawn)
      expect(next.length).toBeLessThanOrEqual(8)
      recent = next
    }
  })

  it('still draws from a pool too small for the memory', () => {
    // Two candidates always stay open, so three quotes still alternate.
    const next = pushNextQuote([0], 3, () => 0)
    expect(next).toEqual([0, 1])
    expect(pushNextQuote([], 1).at(-1)).toBe(0)
    // With two, nothing is blocked: both stay open even after both were shown.
    expect(pushNextQuote([0, 1], 2, () => 0.99).at(-1)).toBe(1)
  })

  it('accepts only a known rhythm and length from storage', () => {
    expect(isEbbPreference({ mode: 'balance', seconds: 120 })).toBe(true)
    expect(isEbbPreference({ mode: 'energy', seconds: 120 })).toBe(false)
    expect(isEbbPreference({ mode: 'relax', seconds: 45 })).toBe(false)
    expect(isEbbPreference(null)).toBe(false)
  })
})
