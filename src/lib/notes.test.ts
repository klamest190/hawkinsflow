import { describe, expect, it } from 'vitest'
import type { Note, Notes } from '../types.ts'
import { KEEP, LONGEST, answersOf, appendNote, isNotes, notesOf } from './notes.ts'

const note: Note = {
  at: '2026-10-05T19:00:00.000Z',
  level: 'courage',
  answers: [{ prompt: 'Was kostet dich Kraft?', text: 'Das Projekt.' }],
}

describe('isNotes', () => {
  it('accepts kept entries', () => {
    expect(isNotes([])).toBe(true)
    expect(isNotes([note])).toBe(true)
  })

  it('refuses entries that would stand as an empty box or on no level', () => {
    expect(isNotes([{ ...note, answers: [] }])).toBe(false)
    expect(isNotes([{ ...note, answers: [{ prompt: 'x', text: '' }] }])).toBe(false)
    expect(isNotes([{ ...note, level: 'bliss' }])).toBe(false)
    expect(isNotes([{ ...note, at: 'sunday' }])).toBe(false)
    expect(isNotes([{ ...note, answers: 'text' }])).toBe(false)
    expect(isNotes({})).toBe(false)
  })
})

describe('answersOf', () => {
  const prompts = ['Eins', 'Zwei', 'Drei']

  it('keeps the answered fields, trimmed, with their questions', () => {
    expect(answersOf(prompts, ['  a ', '', 'c'])).toEqual([
      { prompt: 'Eins', text: 'a' },
      { prompt: 'Drei', text: 'c' },
    ])
  })

  it('keeps nothing when nothing was written', () => {
    expect(answersOf(prompts, ['', '   ', '\n'])).toBeNull()
    expect(answersOf(prompts, [])).toBeNull()
  })

  it('cuts an answer to the longest a field takes', () => {
    expect(answersOf(['Eins'], ['x'.repeat(LONGEST + 10)])?.[0]?.text).toHaveLength(LONGEST)
  })
})

describe('appendNote and notesOf', () => {
  it('cuts the oldest entries off', () => {
    let notes: Notes = []
    for (let index = 0; index < KEEP + 3; index++) {
      notes = appendNote(notes, { ...note, at: new Date(2026, 0, 1, 0, index).toISOString() })
    }
    expect(notes).toHaveLength(KEEP)
    expect(notes[0]?.at).toBe(new Date(2026, 0, 1, 0, 3).toISOString())
  })

  it('picks the entries of one level', () => {
    const notes: Notes = [note, { ...note, level: 'reason' }, { ...note, at: '2026-10-06T19:00:00.000Z' }]
    expect(notesOf(notes, 'courage')).toHaveLength(2)
    expect(notesOf(notes, 'love')).toEqual([])
  })
})
