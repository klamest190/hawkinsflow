import { useCallback, useState } from 'react'
import { appendRun, isHistory } from '../lib/history.ts'
import { clear, load, save } from '../lib/storage.ts'
import type { History, LevelId } from '../types.ts'

const KEY = 'hawkinsflow.history.v1'

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

  return { history, record, clearHistory }
}
