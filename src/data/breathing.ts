import type { BreathPattern, BreathPatternId } from '../types.ts'

/* The breathing patterns. Seconds are the same in every language, so they
   live here and not with the texts — like the levels' colors. */
export const BREATH_PATTERNS: Record<BreathPatternId, BreathPattern> = {
  box: { id: 'box', inhale: 4, hold: 4, exhale: 4, rest: 4 },
  longExhale: { id: 'longExhale', inhale: 4, hold: 0, exhale: 6, rest: 0 },
  balance: { id: 'balance', inhale: 5, hold: 0, exhale: 5, rest: 0 },
  clarity: { id: 'clarity', inhale: 6, hold: 0, exhale: 4, rest: 0 },
}
