import { useCallback, useState } from 'react'
import { isPlans, revisedPlan, withCheck } from '../lib/plans.ts'
import { KEYS, clear, load, save } from '../lib/storage.ts'
import type { LevelId, PlanVerdict, Plans } from '../types.ts'

const KEY = KEYS.plans

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
        [level]: revisedPlan(previous[level], { level, when, then }, new Date()),
      }
      save(KEY, next)
      return next
    })
  }, [])

  /* The answer to the start page's "has it been working?". A plan that was
     deleted in another tab meanwhile is left alone rather than brought back. */
  const checkPlan = useCallback((level: LevelId, verdict: PlanVerdict) => {
    setPlans((previous) => {
      const plan = previous[level]
      if (plan === undefined) return previous
      const next: Plans = { ...previous, [level]: withCheck(plan, verdict, new Date()) }
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

  /* For restoring a backup: the whole value at once. Empty removes the key,
     as clearing does, instead of leaving an empty entry behind. */
  const replacePlans = useCallback((next: Plans) => {
    if (Object.keys(next).length === 0) clear(KEY)
    else save(KEY, next)
    setPlans(next)
  }, [])

  return { plans, savePlan, checkPlan, removePlan, replacePlans }
}
