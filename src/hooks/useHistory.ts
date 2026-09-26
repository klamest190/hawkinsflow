import { useCallback, useState } from 'react'
import { appendRun, isHistory } from '../lib/history.ts'
import { KEYS, clear, load, save } from '../lib/storage.ts'
import type { History, LevelId } from '../types.ts'

const KEY = KEYS.history

/**
 * Die abgeschlossenen Durchgänge, dauerhaft gesichert.
 *
 * Wie die Pläne ein eigener Schlüssel neben den Antworten: Der Verlauf ist der
 * einzige Teil dieser App, der überhaupt erst dadurch entsteht, dass jemand den
 * Bogen ein zweites Mal ausfüllt. Ihn beim Neustart mitzulöschen hieße, genau
 * das wegzuwerfen, worauf man gewartet hat.
 */
export function useHistory() {
  const [history, setHistory] = useState<History>(() => load(KEY, isHistory) ?? [])

  const record = useCallback((level: LevelId, calibration: number, answered: number) => {
    setHistory((previous) => {
      const next = appendRun(previous, {
        taken: new Date().toISOString(),
        level,
        calibration,
        answered,
      })
      save(KEY, next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    clear(KEY)
    setHistory([])
  }, [])

  /* For restoring a backup: the whole value at once. Empty removes the key,
     as clearing does, instead of leaving an empty entry behind. */
  const replaceHistory = useCallback((next: History) => {
    if (next.length === 0) clear(KEY)
    else save(KEY, next)
    setHistory(next)
  }, [])

  return { history, record, clearHistory, replaceHistory }
}
