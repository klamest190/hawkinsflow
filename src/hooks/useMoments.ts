import { useCallback, useState } from 'react'
import { appendMoment, isMoments } from '../lib/moments.ts'
import { clear, load, save } from '../lib/storage.ts'
import type { BelowLevelId, Moments } from '../types.ts'

const KEY = 'hawkinsflow.moments.v1'

/**
 * Die abgeschlossenen Durchgänge durch den Moment-Bogen.
 *
 * Ein eigener Schlüssel neben Antworten, Plänen und Verlauf, aus demselben
 * Grund wie dort: Der Fragebogen und der Moment messen zwei verschiedene Dinge —
 * der eine, wo jemand über Wochen steht, der andere, was an einem Dienstag um
 * Viertel vor drei war. In einer Reihe wären das zwei Größen in einer Spalte.
 */
export function useMoments() {
  const [moments, setMoments] = useState<Moments>(() => load(KEY, isMoments) ?? [])

  const recordMoment = useCallback((level: BelowLevelId) => {
    setMoments((previous) => {
      const next = appendMoment(previous, { taken: new Date().toISOString(), level })
      save(KEY, next)
      return next
    })
  }, [])

  const clearMoments = useCallback(() => {
    clear(KEY)
    setMoments([])
  }, [])

  return { moments, recordMoment, clearMoments }
}
