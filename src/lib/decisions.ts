import type { Decision, DecisionFields, Decisions } from '../types.ts'

/**
 * So many kept entries stay. The entries are written by hand, a few a day at
 * most, so two hundred is years of use; what falls out is the oldest.
 */
export const KEEP = 200

/** The longest text a field takes — a page, not a diary. */
export const LONGEST = 4000

/** The three texts of an entry, in the order the form shows them. */
export const DECISION_FIELDS = ['belief', 'decision', 'evidence'] as const

export type DecisionField = (typeof DECISION_FIELDS)[number]

/** At least one of the three texts has content once whitespace is gone. */
export function isFilled(fields: DecisionFields): boolean {
  return DECISION_FIELDS.some((field) => fields[field].trim() !== '')
}

/** The three texts trimmed, the day as it was. */
export function trimmed(fields: DecisionFields): DecisionFields {
  return {
    day: fields.day,
    belief: fields.belief.trim(),
    decision: fields.decision.trim(),
    evidence: fields.evidence.trim(),
  }
}

const DAY = /^\d{4}-\d{2}-\d{2}$/

function isTime(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

/**
 * Checks what comes out of storage, as for every other store. An entry with
 * all three texts empty would stand in the list as an empty card.
 */
export function isDecisions(value: unknown): value is Decisions {
  if (!Array.isArray(value)) return false

  return value.every((entry: unknown) => {
    if (typeof entry !== 'object' || entry === null) return false
    const decision = entry as Partial<Record<keyof Decision, unknown>>
    const { belief, decision: chosen, evidence } = decision
    return (
      typeof decision.id === 'string' &&
      typeof decision.day === 'string' &&
      DAY.test(decision.day) &&
      typeof belief === 'string' &&
      typeof chosen === 'string' &&
      typeof evidence === 'string' &&
      belief.length <= LONGEST &&
      chosen.length <= LONGEST &&
      evidence.length <= LONGEST &&
      isFilled({ day: decision.day, belief, decision: chosen, evidence }) &&
      isTime(decision.at) &&
      (decision.revised === undefined || isTime(decision.revised))
    )
  })
}

/** The new entry at the end. Oldest first, cut to `KEEP`. */
export function appendDecision(list: Decisions, entry: Decision): Decisions {
  return [...list, entry].slice(-KEEP)
}

/** Replaces the four fields of one entry and marks it as revised. */
export function reviseDecision(
  list: Decisions,
  id: string,
  fields: DecisionFields,
  when: string,
): Decisions {
  return list.map((entry) => (entry.id === id ? { ...entry, ...fields, revised: when } : entry))
}

export function withoutDecision(list: Decisions, id: string): Decisions {
  return list.filter((entry) => entry.id !== id)
}

/** The entries grouped by their day: newest day first, newest entry first. */
export function byDay(list: Decisions): { day: string; entries: Decision[] }[] {
  const days = new Map<string, Decision[]>()
  for (const entry of list) {
    const entries = days.get(entry.day)
    if (entries) entries.push(entry)
    else days.set(entry.day, [entry])
  }
  return [...days.entries()]
    .sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0))
    .map(([day, entries]) => ({
      day,
      entries: [...entries].sort((a, b) => Date.parse(b.at) - Date.parse(a.at)),
    }))
}
