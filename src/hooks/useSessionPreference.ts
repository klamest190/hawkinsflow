import { useCallback, useState } from 'react'
import { SESSION_DEFAULT, isSessionPreference, type SessionPreference } from '../lib/session.ts'
import { KEYS, load, save } from '../lib/storage.ts'

const KEY = KEYS.session

/**
 * The length of a guided session and whether it reads aloud, remembered
 * across sessions and forms. A preference like Ebb Flow's: not in the
 * backup, and a device without it starts from ten minutes, silent.
 */
export function useSessionPreference() {
  const [preference, setPreference] = useState<SessionPreference>(() => load(KEY, isSessionPreference) ?? SESSION_DEFAULT)

  const choose = useCallback((next: Partial<SessionPreference>) => {
    setPreference((previous) => {
      const merged = { ...previous, ...next }
      save(KEY, merged)
      return merged
    })
  }, [])

  return { preference, choose }
}
