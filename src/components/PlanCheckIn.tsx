import { useId, useState } from 'react'
import type { Copy } from '../i18n/copy.ts'
import { checkTally, reviewDue } from '../lib/plans.ts'
import type { Plan, PlanVerdict } from '../types.ts'
import { Button } from './Button.tsx'

type PlanCheckInProps = {
  plan: Plan
  t: Copy
  /** Read once per render; passed in so the render test can fix the date. */
  now: Date
  onCheck: (verdict: PlanVerdict) => void
  /** Opens the plan's level in the scale, where it can be reworded. */
  onEdit: () => void
}

const VERDICTS: readonly PlanVerdict[] = ['held', 'partly', 'missed']

const choice =
  'cursor-pointer rounded-full border border-line bg-void/40 px-4 py-1.5 text-[13px] font-medium text-text ' +
  'transition-colors hover:border-accent/50 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink'

/**
 * "Has this plan been working?" — asked under the plan on the start page once
 * it has stood for a week, and a week after each answer.
 *
 * Without it, a plan was written once and never looked at again: the app had
 * no way of telling a trigger that works from one that never comes up. The
 * question is the cheapest way to find out, and the answer decides what to
 * say next — "partly" and "no" lead back to the plan, since a vague "if" is
 * the usual reason it didn't hold.
 *
 * The reply stays until the page is left; the question itself is gone the
 * moment it is answered, because the answer resets the clock.
 */
export function PlanCheckIn({ plan, t, now, onCheck, onEdit }: PlanCheckInProps) {
  const [reply, setReply] = useState<PlanVerdict | null>(null)
  const questionId = useId()
  const tally = checkTally(plan)
  const asked = reply === null && reviewDue(plan, now)

  function answer(verdict: PlanVerdict) {
    onCheck(verdict)
    setReply(verdict)
  }

  return (
    <>
      {asked && (
        <div role="group" aria-labelledby={questionId} className="mt-4 border-t border-line pt-4">
          <p id={questionId} className="text-[14px] font-semibold text-text">
            {t.planCheckQuestion}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {VERDICTS.map((verdict) => (
              <button key={verdict} type="button" className={choice} onClick={() => answer(verdict)}>
                {t.planVerdicts[verdict]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Always in the tree, so a screen reader announces the reply when it
          appears instead of finding it by chance. */}
      <div aria-live="polite">
        {reply !== null && (
          <div className="mt-4 border-t border-line pt-4">
            <p className="text-[14px] leading-relaxed text-text/90">{t.planCheckReply[reply]}</p>
            {reply !== 'held' && (
              <Button variant="ghost" onClick={onEdit} className="mt-3">
                {t.planRework}
              </Button>
            )}
          </div>
        )}
      </div>

      {!asked && tally.held + tally.partly + tally.missed > 0 && (
        <p className="mt-3 text-[12px] text-muted">{t.planTally(tally.held, tally.partly, tally.missed)}</p>
      )}
    </>
  )
}
