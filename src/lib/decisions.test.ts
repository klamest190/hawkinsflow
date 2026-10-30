import { describe, expect, it } from 'vitest'
import type { Decision, Decisions } from '../types.ts'
import { itemAt } from './array.ts'
import {
  KEEP,
  LONGEST,
  appendDecision,
  byDay,
  isDay,
  isDecisions,
  isFilled,
  reviseDecision,
  trimmed,
  withoutDecision,
} from './decisions.ts'

const base: Decision = {
  id: 'a',
  day: '2026-10-30',
  belief: 'Ich bin nicht gut genug.',
  decision: '',
  evidence: '',
  at: '2026-10-30T08:00:00.000Z',
}

describe('isDecisions', () => {
  it('accepts kept entries', () => {
    expect(isDecisions([])).toBe(true)
    expect(isDecisions([base])).toBe(true)
    expect(isDecisions([{ ...base, revised: '2026-10-31T08:00:00.000Z' }])).toBe(true)
  })

  it('accepts a field at the length limit', () => {
    expect(isDecisions([{ ...base, belief: 'x'.repeat(LONGEST) }])).toBe(true)
  })

  it('refuses malformed entries', () => {
    const { id: _id, ...withoutId } = base
    expect(isDecisions({})).toBe(false)
    expect(isDecisions([{ ...base, day: '30.10.2026' }])).toBe(false)
    expect(isDecisions([{ ...base, day: 5 }])).toBe(false)
    expect(isDecisions([{ ...base, belief: 'x'.repeat(LONGEST + 1) }])).toBe(false)
    expect(isDecisions([{ ...base, belief: '  ', decision: '  ', evidence: '  ' }])).toBe(false)
    expect(isDecisions([{ ...base, at: 'yesterday' }])).toBe(false)
    expect(isDecisions([{ ...base, revised: 'later' }])).toBe(false)
    expect(isDecisions([withoutId])).toBe(false)
  })
})

/* The date field can be cleared; a stored day of '' would make the guard
   drop the whole list on the next load. */
describe('isDay', () => {
  it('takes a local yyyy-MM-dd day and nothing else', () => {
    expect(isDay('2026-10-30')).toBe(true)
    expect(isDay('')).toBe(false)
    expect(isDay('30.10.2026')).toBe(false)
    expect(isDay('+012026-10-30')).toBe(false)
  })
})

describe('isFilled', () => {
  const fields = { day: base.day, belief: ' ', decision: '\n', evidence: '' }

  it('needs at least one text with content', () => {
    expect(isFilled(fields)).toBe(false)
    expect(isFilled({ ...fields, evidence: 'a' })).toBe(true)
  })
})

describe('trimmed', () => {
  it('strips the texts and leaves the day', () => {
    expect(trimmed({ day: base.day, belief: ' a ', decision: '\nb\n', evidence: ' c' })).toEqual({
      day: base.day,
      belief: 'a',
      decision: 'b',
      evidence: 'c',
    })
  })
})

describe('appendDecision', () => {
  it('keeps the newest KEEP entries', () => {
    let list: Decisions = []
    for (let i = 0; i <= KEEP; i++) list = appendDecision(list, { ...base, id: String(i) })
    expect(list).toHaveLength(KEEP)
    expect(itemAt(list, 0).id).toBe('1')
    expect(itemAt(list, KEEP - 1).id).toBe(String(KEEP))
  })
})

describe('reviseDecision', () => {
  const other = { ...base, id: 'b' }
  const fields = { day: '2026-10-29', belief: 'n', decision: 'm', evidence: 'k' }

  it('changes only the entry with that id', () => {
    const next = reviseDecision([base, other], 'a', fields, '2026-11-01T00:00:00.000Z')
    expect(next).toEqual([{ ...base, ...fields, revised: '2026-11-01T00:00:00.000Z' }, other])
    expect(itemAt(next, 0).at).toBe(base.at)
  })

  it('leaves the list alone for an unknown id', () => {
    expect(reviseDecision([base, other], 'zzz', fields, 'x')).toEqual([base, other])
  })
})

describe('withoutDecision', () => {
  it('removes exactly the id', () => {
    expect(withoutDecision([base, { ...base, id: 'b' }], 'a')).toEqual([{ ...base, id: 'b' }])
  })
})

describe('byDay', () => {
  it('groups newest day first, newest entry first within a day', () => {
    const old = { ...base, id: 'o', day: '2026-10-29', at: '2026-10-29T08:00:00.000Z' }
    const early = { ...base, id: 'e' }
    const late = { ...base, id: 'l', at: '2026-10-30T09:00:00.000Z' }
    expect(byDay([old, early, late])).toEqual([
      { day: '2026-10-30', entries: [late, early] },
      { day: '2026-10-29', entries: [old] },
    ])
  })
})
