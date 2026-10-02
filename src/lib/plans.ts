import type { Plan, PlanCheck, PlanVerdict, Plans } from '../types.ts'

/* Kürzer als das ist keine Handlung mehr, sondern ein Satzanfang. Der Wert ist
   an den Schritten der Skala geeicht: „Übe Genug" (9) und „Set an end" (10)
   sind vollständige Vorsätze und sollen stehen bleiben, „Frage bei jedem" (15)
   wäre einer — der wird durch den Doppelpunkt ohnehin nicht abgeschnitten. */
const SHORTEST = 8

/** Der Teil vor dem ersten Treffer — oder alles, wenn es keinen gibt. */
function upTo(text: string, delimiter: RegExp): string {
  const cut = text.search(delimiter)
  return (cut === -1 ? text : text.slice(0, cut)).trim()
}

/**
 * Der Kern eines Schritts: alles bis zum ersten Punkt, Doppelpunkt oder
 * Gedankenstrich.
 *
 * Die Schritte in `i18n/levels.ts` sind zwei bis drei Sätze lang — sie erklären
 * sich selbst, und das sollen sie auch. Als Vorschlag für ein „dann" ist das
 * jedoch zu viel: Ein Vorsatz, den man nicht in einem Atemzug sagen kann, ist im
 * entscheidenden Moment nicht abrufbar. Der erste Teil trägt in allen 17 Ebenen
 * die Handlung, was danach kommt, ist Begründung oder Beispiel.
 */
export function actionCore(step: string): string {
  const core = upTo(step, /[.:\u2014]/)

  // Zu kurz heißt: das Trennzeichen stand mitten in der Handlung statt hinter
  // ihr. Dann gilt der ganze erste Satz, und wenn selbst der nichts hergibt,
  // der Schritt so, wie er dasteht — lieber ein langer Vorschlag als ein
  // sinnloser.
  if (core.length >= SHORTEST) return core

  const sentence = upTo(step, /\./)
  return sentence.length >= SHORTEST ? sentence : step.trim()
}

/**
 * Prüft, was aus dem Speicher kommt. Wie bei den Antworten gilt: eine veraltete
 * oder von Hand geänderte Zeile im localStorage darf nicht als Plan durchgehen,
 * sonst stünde auf der Startseite irgendwann `undefined`.
 */
export function isPlans(value: unknown): value is Plans {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false

  return Object.values(value).every((entry) => {
    if (typeof entry !== 'object' || entry === null) return false
    const plan = entry as Partial<Record<keyof Plan, unknown>>
    return (
      typeof plan.level === 'string' &&
      typeof plan.when === 'string' &&
      typeof plan.then === 'string' &&
      typeof plan.created === 'string' &&
      (plan.revised === undefined || typeof plan.revised === 'string') &&
      (plan.checks === undefined || (Array.isArray(plan.checks) && plan.checks.every(isPlanCheck)))
    )
  })
}

const VERDICTS: readonly PlanVerdict[] = ['held', 'partly', 'missed']

function isPlanCheck(value: unknown): value is PlanCheck {
  if (typeof value !== 'object' || value === null) return false
  const check = value as Partial<Record<keyof PlanCheck, unknown>>
  return (
    typeof check.at === 'string' &&
    !Number.isNaN(Date.parse(check.at)) &&
    VERDICTS.some((verdict) => verdict === check.verdict)
  )
}

/**
 * Alle Pläne, der zuletzt angelegte zuerst.
 *
 * Die Startseite zeigt den jüngsten ausgeschrieben und die übrigen als Zeile
 * darunter. Dass sie überhaupt alle herausgereicht werden, hat einen Grund: Sie
 * sind sonst über die ganze Skala verstreut. Jede Ebene trägt ihren Plan zwar in
 * ihrem Detailblock, aber niemand klappt siebzehn Ebenen auf, um zu sehen, was
 * er sich vorgenommen hat.
 *
 * Sortiert wird über die ISO-Zeichenkette: Sie ist so gebaut, dass ihre
 * alphabetische Ordnung die zeitliche ist, und spart das Umwandeln in Daten.
 */
export function sortedPlans(plans: Plans): Plan[] {
  return Object.values(plans)
    .filter((plan): plan is Plan => plan !== undefined)
    .sort((a, b) => b.created.localeCompare(a.created))
}

/**
 * The keyword the field already stands behind, taken off the front of what was
 * typed. The form shows "If" and "then" as labels, and people often write the
 * whole sentence anyway — which then read "If If I leave a meeting …" on the
 * start page. Only the bare word followed by a space or comma goes: "Iffy
 * mornings" or "Wenngleich" stay as they are.
 */
export function withoutKeyword(text: string, keyword: string): string {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.trim().replace(new RegExp(`^${escaped}(?:[\\s,]+|$)`, 'i'), '')
}

/**
 * How long a plan stands before the start page asks whether it held.
 *
 * A week: long enough for most triggers ("whenever I leave a meeting …") to
 * have come up a few times, short enough that the person still remembers.
 */
export const REVIEW_AFTER_DAYS = 7

/** So many check-ins are kept per plan; the tally only needs the recent ones. */
export const CHECKS_KEEP = 12

/** The latest of creation, last rewording and last check-in — the review clock starts there. */
function lastTouched(plan: Plan): number {
  const times = [plan.created, plan.revised, plan.checks?.at(-1)?.at]
    .filter((time): time is string => time !== undefined)
    .map((time) => Date.parse(time))
  return Math.max(...times)
}

/** Whether the start page should ask about this plan now. */
export function reviewDue(plan: Plan, now: Date): boolean {
  return now.getTime() - lastTouched(plan) >= REVIEW_AFTER_DAYS * 86_400_000
}

/** The plan with one more check-in, the oldest dropped past `CHECKS_KEEP`. */
export function withCheck(plan: Plan, verdict: PlanVerdict, now: Date): Plan {
  const checks = [...(plan.checks ?? []), { at: now.toISOString(), verdict }].slice(-CHECKS_KEEP)
  return { ...plan, checks }
}

/** How often each verdict was given since the last rewording. */
export function checkTally(plan: Plan): Record<PlanVerdict, number> {
  const tally: Record<PlanVerdict, number> = { held: 0, partly: 0, missed: 0 }
  for (const check of plan.checks ?? []) tally[check.verdict] += 1
  return tally
}

/**
 * A plan saved over an existing one. Its creation date stays — it orders the
 * plans on the start page, and rewording one must not move it up. A changed
 * wording is a new attempt, so the check-ins of the old one go and the review
 * clock restarts; saving the same words again changes nothing.
 */
export function revisedPlan(previous: Plan | undefined, next: Omit<Plan, 'created'>, now: Date): Plan {
  if (previous === undefined) return { ...next, created: now.toISOString() }
  if (previous.when === next.when && previous.then === next.then) return previous
  return { level: next.level, when: next.when, then: next.then, created: previous.created, revised: now.toISOString() }
}
