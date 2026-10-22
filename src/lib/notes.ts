import { isLevelId } from '../data/levels.ts'
import type { LevelId, Note, NoteAnswer, Notes } from '../types.ts'

/**
 * So many kept entries stay, across all levels. A hundred is years of the
 * weekly writing practices; what falls out is the oldest.
 */
export const KEEP = 100

/** The longest answer a field takes — a page, not a diary. */
export const LONGEST = 4000

function isAnswer(value: unknown): value is NoteAnswer {
  if (typeof value !== 'object' || value === null) return false
  const answer = value as Partial<Record<keyof NoteAnswer, unknown>>
  return typeof answer.prompt === 'string' && typeof answer.text === 'string' && answer.text !== ''
}

/**
 * Checks what comes out of storage, as for every other store. An entry
 * without a single answer would stand under its practice as an empty box.
 */
export function isNotes(value: unknown): value is Notes {
  if (!Array.isArray(value)) return false

  return value.every((entry: unknown) => {
    if (typeof entry !== 'object' || entry === null) return false
    const note = entry as Partial<Record<keyof Note, unknown>>
    return (
      typeof note.at === 'string' &&
      !Number.isNaN(Date.parse(note.at)) &&
      isLevelId(note.level) &&
      Array.isArray(note.answers) &&
      note.answers.length > 0 &&
      note.answers.every(isAnswer)
    )
  })
}

/** The new entry at the end. Oldest first, cut to `KEEP`. */
export function appendNote(notes: Notes, entry: Note): Notes {
  return [...notes, entry].slice(-KEEP)
}

/** The kept entries of one level, oldest first. */
export function notesOf(notes: Notes, level: LevelId): Notes {
  return notes.filter((note) => note.level === level)
}

/**
 * What a filled-in form keeps: the answered fields, trimmed, each with its
 * question as it was shown. The question goes along as text, so an entry
 * still says what it answered after the question is reworded. Null when
 * nothing was written.
 */
export function answersOf(prompts: string[], texts: string[]): NoteAnswer[] | null {
  const answers = prompts
    .map((prompt, index) => ({ prompt, text: (texts[index] ?? '').trim().slice(0, LONGEST) }))
    .filter((answer) => answer.text !== '')
  return answers.length > 0 ? answers : null
}
