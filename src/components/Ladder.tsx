import { Fragment, type CSSProperties } from 'react'
import { THRESHOLD } from '../data/levels.ts'
import type { LevelId, LevelShape } from '../types.ts'

/** The pause between two rungs lighting up as the ladder climbs. */
export const CLIMB_STEP_MS = 45

type LadderProps = {
  /** All seventeen, lowest first. */
  levels: readonly LevelShape[]
  /** The label at the threshold, e.g. "Schwelle 200". */
  thresholdLabel: string
  /**
   * The level someone reached. The rungs up to it carry their colors, the
   * one itself a glow; those above stay unlit. Without it, every rung is lit.
   */
  reached?: LevelId
  /** Light the rungs up to `reached` one by one, from the bottom. */
  climb?: boolean
  /** The rungs' height and gap, e.g. `h-[7px]` and `gap-[3px]`. */
  rung?: string
  gap?: string
  className?: string
}

/**
 * The ladder: seventeen rungs, wide and dark at the bottom, narrow and light
 * at the top. It explains the scale faster than a paragraph, and the same in
 * every language, because it does without words but one: the threshold, the
 * only height on this scale where the sign changes. It stands in the same
 * place and form wherever the ladder is drawn.
 *
 * `aria-hidden` sits on the rungs, not on the box: the label is the one part
 * of the drawing that says something. In `flex-col-reverse` the first child
 * is at the bottom, so the line, put out before courage, lands between pride
 * and courage.
 *
 * The climb is the app's one orchestrated motion: on the result, the rungs
 * light up to the level reached, then its name appears. Only with
 * `motion-safe`; with reduced motion the ladder is simply there.
 */
export function Ladder({
  levels,
  thresholdLabel,
  reached,
  climb = false,
  rung = 'h-[7px]',
  gap = 'gap-[3px]',
  className = '',
}: LadderProps) {
  const top = reached === undefined ? levels.length - 1 : levels.findIndex((level) => level.id === reached)

  return (
    <div className={`flex w-full flex-col-reverse items-center ${gap} ${className}`}>
      {levels.map((level, rank) => {
        const lit = rank <= top
        const here = reached !== undefined && rank === top
        const style: CSSProperties = lit
          ? {
              background: level.color,
              width: `${96 - rank * 4}%`,
              opacity: here ? 1 : 0.45 + rank * 0.032,
              boxShadow: here ? `0 0 18px 1px ${level.color}` : undefined,
              animationDelay: climb ? `${rank * CLIMB_STEP_MS}ms` : undefined,
            }
          : { background: 'var(--hf-line)', width: `${96 - rank * 4}%`, opacity: 0.7 }

        return (
          <Fragment key={level.id}>
            {level.value === THRESHOLD && (
              <div className="flex w-full items-center gap-3 py-1.5">
                <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
                <span className="text-small font-semibold whitespace-nowrap text-muted">{thresholdLabel}</span>
                <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
              </div>
            )}
            <div
              aria-hidden
              className={
                `${rung} origin-center rounded-full transition-[width] duration-500 ` +
                (climb && lit ? 'motion-safe:animate-rung' : '')
              }
              style={style}
            />
          </Fragment>
        )
      })}
    </div>
  )
}
