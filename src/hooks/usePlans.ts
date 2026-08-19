import { useCallback, useState } from 'react'
import { isPlans } from '../lib/plans.ts'
import { clear, load, save } from '../lib/storage.ts'
import type { LevelId, Plans } from '../types.ts'

const KEY = 'hawkinsflow.plans.v1'

/**
 * Die Wenn-Dann-Pläne, dauerhaft gesichert.
 *
 * Bewusst ein eigener Schlüssel neben den Antworten: Ein Plan überlebt es, wenn
 * der Bogen noch einmal ausgefüllt wird. Er ist das Einzige in dieser App, das
 * der Mensch selbst geschrieben hat — den beim Neustart mitzulöschen wäre die
 * unangenehmste Überraschung, die sie zu bieten hätte.
 */
export function usePlans() {
  const [plans, setPlans] = useState<Plans>(() => load(KEY, isPlans) ?? {})

  const savePlan = useCallback((level: LevelId, when: string, then: string) => {
    setPlans((previous) => {
      const next: Plans = {
        ...previous,
        [level]: { level, when, then, created: new Date().toISOString() },
      }
      save(KEY, next)
      return next
    })
  }, [])

  const removePlan = useCallback((level: LevelId) => {
    setPlans((previous) => {
      const next = { ...previous }
      delete next[level]

      // Der letzte Plan nimmt den Eintrag ganz mit — ein leeres Objekt im
      // Speicher stehen zu lassen wäre nur Altlast.
      if (Object.keys(next).length === 0) clear(KEY)
      else save(KEY, next)

      return next
    })
  }, [])

  return { plans, savePlan, removePlan }
}
