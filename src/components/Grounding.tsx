import { useState } from 'react'
import type { Copy } from '../i18n/copy.ts'
import { itemAt } from '../lib/array.ts'
import { Chip } from './Timer.tsx'

/** Five things, then four, then three … one per sense. */
const COUNTS = [5, 4, 3, 2, 1] as const

/**
 * Five senses, counted down: see, hear, feel, smell, taste.
 *
 * One sense at a time and not all five as a list: a list is read once and
 * put away, and the practice is the looking, not the reading. Self-paced —
 * the person says when they found them — and "start over" is always there,
 * because the practice says to start over when stuck.
 */
export function Grounding({ t }: { t: Copy }) {
  /** -1 before the start, `COUNTS.length` once through. */
  const [step, setStep] = useState(-1)
  const active = step >= 0 && step < COUNTS.length
  const done = step >= COUNTS.length

  return (
    <div className="mt-5 flex flex-col gap-4 border-t border-accent/20 pt-4">
      {active && (
        <div className="flex flex-col gap-3">
          <p aria-live="polite" className="flex items-baseline gap-3">
            <span aria-hidden className="tabular font-display text-display leading-none font-semibold text-accent-ink">
              {itemAt(COUNTS, step)}
            </span>
            <span className="text-lead leading-snug text-text">
              <span className="sr-only">{itemAt(COUNTS, step)} </span>
              {itemAt(t.groundingSenses, step)}
            </span>
          </p>
          <div aria-hidden className="flex gap-1.5">
            {COUNTS.map((count, index) => (
              <span
                key={count}
                className={
                  'h-1.5 w-6 rounded-full transition-colors duration-300 ' +
                  (index < step ? 'bg-accent-ink' : index === step ? 'bg-accent/60' : 'bg-line')
                }
              />
            ))}
          </div>
        </div>
      )}

      <p aria-live="polite" className="empty:hidden text-body leading-relaxed text-text/90">
        {done ? t.groundingDone : ''}
      </p>

      {/* As in `Breath`: the main chip keeps its place, so focus stays on it. */}
      <div className="flex flex-wrap items-center gap-3">
        <Chip onClick={() => setStep(active ? step + 1 : 0)} strong>
          {active ? t.groundingNext : done ? t.groundingAgain : t.groundingStart}
        </Chip>
        {active && step > 0 && <Chip onClick={() => setStep(0)}>{t.groundingAgain}</Chip>}
      </div>
    </div>
  )
}
