import type { BelowLevelId, FirstAidTool } from '../types.ts'

/**
 * What the second step of the moment flow puts in someone's hands, per level.
 *
 * Mostly the minute of feeling: the flow's order — feel first, ask after —
 * holds for most of the eight. Three levels are the exception, each for a
 * reason of its own:
 *
 * - Fear: the body comes before the feeling. With the alarm on, there is no
 *   spot to find; the long out-breath turns it down first. The same pattern
 *   as the level's sitting practice, so it is one thing to learn, not two.
 * - Anger wants to act at once. The holds of the box give it the minute in
 *   between — not to breathe it away, but before saying anything.
 * - Apathy often finds nothing in the body, and searching makes it worse.
 *   Counting what is in the room needs no feeling at all.
 *
 * A `Record` over `BelowLevelId`, so a missing level fails the build.
 */
export const FIRST_AID: Record<BelowLevelId, FirstAidTool> = {
  shame: { kind: 'timer', minutes: 1 },
  guilt: { kind: 'timer', minutes: 1 },
  apathy: { kind: 'grounding' },
  grief: { kind: 'timer', minutes: 1 },
  fear: { kind: 'breath', pattern: 'longExhale', minutes: 1 },
  desire: { kind: 'timer', minutes: 1 },
  anger: { kind: 'breath', pattern: 'box', minutes: 1 },
  pride: { kind: 'timer', minutes: 1 },
}
