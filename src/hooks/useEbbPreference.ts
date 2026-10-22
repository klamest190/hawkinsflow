import { useCallback, useState } from 'react'
import { EBB_DEFAULT, isEbbPreference, type EbbPreference } from '../lib/ebbflow.ts'
import { KEYS, load, save } from '../lib/storage.ts'

const KEY = KEYS.ebbflow

/**
 * The rhythm and length chosen in Ebb Flow, remembered — whoever breathes
 * four in, six out every evening should not have to pick it every evening.
 *
 * A preference like the language and not a record: it is not in the backup,
 * and a device without it simply starts from the default.
 */
export function useEbbPreference() {
  const [preference, setPreference] = useState<EbbPreference>(() => load(KEY, isEbbPreference) ?? EBB_DEFAULT)

  const choose = useCallback((next: Partial<EbbPreference>) => {
    setPreference((previous) => {
      const merged = { ...previous, ...next }
      save(KEY, merged)
      return merged
    })
  }, [])

  return { preference, choose }
}
