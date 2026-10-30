import { useCallback, useState } from 'react'
import { appendDecision, isDecisions, reviseDecision, trimmed, withoutDecision } from '../lib/decisions.ts'
import { KEYS, clear, load, save } from '../lib/storage.ts'
import type { DecisionFields, Decisions } from '../types.ts'

const KEY = KEYS.decisions

/**
 * The decision matrix: entries someone wrote by hand and chose to save.
 *
 * Free text, so it lives under a key of its own — clearing it touches nothing
 * else — and an empty list removes the key instead of leaving `[]` behind.
 */
export function useDecisions() {
  const [decisions, setDecisions] = useState<Decisions>(() => load(KEY, isDecisions) ?? [])

  /* Every change goes through here: the new list is stored as it is set. */
  const commit = useCallback((change: (previous: Decisions) => Decisions) => {
    setDecisions((previous) => {
      const next = change(previous)
      if (next.length === 0) clear(KEY)
      else save(KEY, next)
      return next
    })
  }, [])

  const addDecision = useCallback(
    (fields: DecisionFields) => {
      commit((previous) =>
        appendDecision(previous, {
          id: crypto.randomUUID(),
          at: new Date().toISOString(),
          ...trimmed(fields),
        }),
      )
    },
    [commit],
  )

  const editDecision = useCallback(
    (id: string, fields: DecisionFields) => {
      commit((previous) => reviseDecision(previous, id, trimmed(fields), new Date().toISOString()))
    },
    [commit],
  )

  const removeDecision = useCallback(
    (id: string) => {
      commit((previous) => withoutDecision(previous, id))
    },
    [commit],
  )

  const clearDecisions = useCallback(() => {
    clear(KEY)
    setDecisions([])
  }, [])

  /* For restoring a backup: the whole value at once. */
  const replaceDecisions = useCallback((next: Decisions) => {
    if (next.length === 0) clear(KEY)
    else save(KEY, next)
    setDecisions(next)
  }, [])

  return { decisions, addDecision, editDecision, removeDecision, clearDecisions, replaceDecisions }
}
