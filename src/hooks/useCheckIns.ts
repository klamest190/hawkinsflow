import { useCallback, useState } from 'react'
import { appendCheckIn, isCheckIns } from '../lib/checkins.ts'
import { KEYS, clear, load, save } from '../lib/storage.ts'
import type { CheckIns, LevelId } from '../types.ts'

const KEY = KEYS.checkins

/**
 * The daily check-ins: one tap on the start page, one level per day.
 *
 * A key of its own next to history and moments, for the same reason those
 * two are apart: the questionnaire measures weeks, a moment measures an
 * afternoon, and this measures a day — the missing middle. In one series
 * they would be three sizes in one column.
 */
export function useCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIns>(() => load(KEY, isCheckIns) ?? [])

  const checkIn = useCallback((level: LevelId) => {
    setCheckIns((previous) => {
      const next = appendCheckIn(previous, { at: new Date().toISOString(), level })
      save(KEY, next)
      return next
    })
  }, [])

  const clearCheckIns = useCallback(() => {
    clear(KEY)
    setCheckIns([])
  }, [])

  /* For restoring a backup: the whole value at once. Empty removes the key,
     as clearing does, instead of leaving an empty entry behind. */
  const replaceCheckIns = useCallback((next: CheckIns) => {
    if (next.length === 0) clear(KEY)
    else save(KEY, next)
    setCheckIns(next)
  }, [])

  return { checkIns, checkIn, clearCheckIns, replaceCheckIns }
}
