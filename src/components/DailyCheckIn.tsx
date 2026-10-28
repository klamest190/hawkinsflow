import { Fragment, useRef, useState } from 'react'
import { THRESHOLD } from '../data/levels.ts'
import type { Copy } from '../i18n/copy.ts'
import { readableOnDark } from '../lib/oklch.ts'
import type { CheckIn, Level, LevelId } from '../types.ts'
import { Chip } from './Timer.tsx'

type DailyCheckInProps = {
  levels: Level[]
  /** Today's check-in; null until the first tap of the day. */
  today: CheckIn | null
  t: Copy
  onCheckIn: (level: LevelId) => void
  className?: string
}

/**
 * The daily check-in: where someone stands today, in one tap.
 *
 * Closed by default. Seventeen tiles on the start page every morning would
 * push the two doors below the fold, and the doors are what the page is
 * for. Open, the tiles stand in the order of the scale, with the threshold
 * between pride and courage as everywhere else.
 *
 * Tinted with the accent and not the card ground: this is the one card on
 * the start page that asks for something today.
 */
export function DailyCheckIn({ levels, today, t, onCheckIn, className = '' }: DailyCheckInProps) {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const chosen = today === null ? null : (levels.find((level) => level.id === today.level) ?? null)

  function pick(id: LevelId) {
    onCheckIn(id)
    setOpen(false)
    // The tile that had the focus goes with the grid; the toggle takes it.
    toggle.current?.focus()
  }

  return (
    <section
      className={
        'w-full rounded-2xl border border-accent/25 bg-accent/[0.06] p-5 text-left backdrop-blur-sm ' +
        className
      }
    >
      <h2 className="text-caption font-semibold tracking-[0.16em] text-muted uppercase">{t.checkInTitle}</h2>

      <div className="mt-2 flex items-center justify-between gap-4">
        {/* One live region for both states, so the change from the question
            to the chosen level is heard. */}
        <div aria-live="polite" className="min-w-0">
          {chosen === null ? (
            <>
              <p className="font-display text-lead font-semibold text-text">{t.checkInQuestion}</p>
              <p className="mt-1 text-small leading-relaxed text-muted">{t.checkInLead}</p>
            </>
          ) : (
            <p className="text-body leading-relaxed">
              <span className="font-display text-lead font-semibold" style={{ color: readableOnDark(chosen.color) }}>
                {chosen.name}
              </span>
              <span className="text-muted"> · {chosen.emotion}</span>
            </p>
          )}
        </div>
        <Chip
          ref={toggle}
          onClick={() => setOpen((previous) => !previous)}
          strong={chosen === null && !open}
          expanded={open}
          controls="checkin-levels"
        >
          {open ? t.checkInClose : chosen === null ? t.checkInPick : t.checkInChange}
        </Chip>
      </div>

      {open && (
        <div
          id="checkin-levels"
          role="group"
          aria-label={t.checkInPickLabel}
          className="animate-rise mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {levels.map((level) => {
            const selected = today?.level === level.id
            return (
              <Fragment key={level.id}>
                {level.value === THRESHOLD && (
                  <div className="col-span-full flex items-center gap-3 py-1">
                    <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
                    <span className="text-caption font-semibold tracking-[0.18em] text-muted uppercase">
                      {t.thresholdMark(THRESHOLD)}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
                  </div>
                )}
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => pick(level.id)}
                  className={
                    'flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-left ' +
                    'transition-[border-color,background-color] duration-200 ' +
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ' +
                    (selected
                      ? 'border-accent-ink/60 bg-accent/15'
                      : 'border-line bg-card/50 hover:border-accent/40 hover:bg-card')
                  }
                >
                  <span
                    aria-hidden
                    className="h-6 w-1 shrink-0 rounded-full"
                    style={{ background: level.color, boxShadow: `0 0 10px -2px ${level.color}` }}
                  />
                  <span className="min-w-0 truncate text-small font-semibold text-text">{level.name}</span>
                </button>
              </Fragment>
            )
          })}
        </div>
      )}
    </section>
  )
}
