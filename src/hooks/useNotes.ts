import { useCallback, useState } from 'react'
import { appendNote, isNotes } from '../lib/notes.ts'
import { KEYS, clear, load, save } from '../lib/storage.ts'
import type { LevelId, NoteAnswer, Notes } from '../types.ts'

const KEY = KEYS.notes

/**
 * What someone wrote in a writing practice and chose to keep.
 *
 * The only free text this app stores besides the plans, and only on a tap:
 * the fields themselves forget as soon as the practice closes. A key of its
 * own, so clearing it touches nothing else.
 */
export function useNotes() {
  const [notes, setNotes] = useState<Notes>(() => load(KEY, isNotes) ?? [])

  const keepNote = useCallback((level: LevelId, answers: NoteAnswer[]) => {
    setNotes((previous) => {
      const next = appendNote(previous, { at: new Date().toISOString(), level, answers })
      save(KEY, next)
      return next
    })
  }, [])

  const removeNote = useCallback((at: string) => {
    setNotes((previous) => {
      const next = previous.filter((note) => note.at !== at)
      if (next.length === 0) clear(KEY)
      else save(KEY, next)
      return next
    })
  }, [])

  const clearNotes = useCallback(() => {
    clear(KEY)
    setNotes([])
  }, [])

  /* For restoring a backup: the whole value at once. Empty removes the key,
     as clearing does, instead of leaving an empty entry behind. */
  const replaceNotes = useCallback((next: Notes) => {
    if (next.length === 0) clear(KEY)
    else save(KEY, next)
    setNotes(next)
  }, [])

  return { notes, keepNote, removeNote, clearNotes, replaceNotes }
}
