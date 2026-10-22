import { useEffect, useRef } from 'react'
import { useBreath } from '../hooks/useBreath.ts'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import type { Copy } from '../i18n/copy.ts'
import { breathAt, fullness, roundsIn, type BreathPoint } from '../lib/breath.ts'
import { chime } from '../lib/chime.ts'
import type { BreathPattern } from '../types.ts'
import { Chip } from './Timer.tsx'

type BreathProps = {
  pattern: BreathPattern
  minutes: number
  t: Copy
}

/* The drawing space, in viewBox units: the square's edge runs from EDGE to
   100 - EDGE, and the circle fits the same box. */
const EDGE = 12
const SIDE = 100 - 2 * EDGE

/**
 * Where the dot on the square stands: up the left side on the in-breath,
 * across the top through the hold, down the right side on the out-breath,
 * back along the bottom through the rest. One lap is one breath — the shape
 * the pattern is named for.
 */
function dotAt({ phase, progress }: BreathPoint): { x: number; y: number } {
  const far = EDGE + SIDE
  switch (phase) {
    case 'inhale':
      return { x: EDGE, y: far - SIDE * progress }
    case 'hold':
      return { x: EDGE + SIDE * progress, y: EDGE }
    case 'exhale':
      return { x: far, y: EDGE + SIDE * progress }
    case 'rest':
      return { x: far - SIDE * progress, y: far }
  }
}

/**
 * The shape that breathes. A pattern with holds is drawn as a square with a
 * dot going round it, since the holds are what makes it a box; one without
 * as a circle that grows and shrinks. Both fill as the lungs do.
 *
 * With reduced motion, nothing moves: the shape stays at half size and the
 * dot is left out. The count in the middle and the phase word below still
 * change — they are text, not motion, and they carry the whole instruction.
 */
function Figure({
  pattern,
  point,
  active,
  still,
}: {
  pattern: BreathPattern
  point: BreathPoint
  active: boolean
  still: boolean
}) {
  const full = still ? 0.5 : active ? fullness(point) : 0
  const square = pattern.hold > 0 || pattern.rest > 0

  return (
    <svg viewBox="0 0 100 100" aria-hidden className="h-full w-full overflow-visible">
      {square ? (
        <>
          <rect
            x={EDGE}
            y={EDGE}
            width={SIDE}
            height={SIDE}
            rx={6}
            fill="none"
            stroke="var(--hf-accent)"
            strokeOpacity={0.35}
            strokeWidth={1.5}
          />
          <rect
            x={EDGE}
            y={EDGE}
            width={SIDE}
            height={SIDE}
            rx={6}
            fill="var(--hf-accent)"
            fillOpacity={0.14}
            transform={`translate(50 50) scale(${0.3 + 0.7 * full}) translate(-50 -50)`}
          />
          {active && !still && (
            <>
              <circle {...cxy(dotAt(point))} r={9} fill="var(--hf-accent)" fillOpacity={0.25} />
              <circle {...cxy(dotAt(point))} r={4.5} fill="var(--hf-accent-ink)" />
            </>
          )}
        </>
      ) : (
        <>
          <circle
            cx={50}
            cy={50}
            r={SIDE / 2}
            fill="none"
            stroke="var(--hf-accent)"
            strokeOpacity={0.35}
            strokeWidth={1.5}
          />
          <circle
            cx={50}
            cy={50}
            r={(SIDE / 2) * (0.35 + 0.65 * full)}
            fill="var(--hf-accent)"
            fillOpacity={0.15}
            stroke="var(--hf-accent-ink)"
            strokeOpacity={0.4}
            strokeWidth={1}
          />
        </>
      )}
    </svg>
  )
}

function cxy({ x, y }: { x: number; y: number }) {
  return { cx: x, cy: y }
}

/**
 * A paced breath under a practice or in the moment flow: the shape, the
 * seconds left in the phase, the phase word, and the rounds.
 *
 * The phase word is announced politely, every few seconds. For someone who
 * can't see the shape it is the instruction itself — unlike the timer's
 * running seconds, which are kept from screen readers because they say
 * nothing a person needs to hear four times a second.
 */
export function Breath({ pattern, minutes, t }: BreathProps) {
  const rounds = roundsIn(pattern, minutes)
  const { elapsed, total, running, done, start, pause, stop } = useBreath(pattern, rounds)
  const still = useReducedMotion()
  // As in `Timer`: the chime belongs to the change to done, not to the state.
  const rang = useRef(false)

  useEffect(() => {
    if (done && !rang.current) {
      rang.current = true
      chime()
    }
    if (!done) rang.current = false
  }, [done])

  const untouched = !running && elapsed === 0
  const active = !untouched && !done
  // Just short of the end, so the last instant still reads as the last round.
  const point = breathAt(pattern, Math.min(elapsed, total - 0.001))

  return (
    <div className="mt-5 flex flex-col items-center gap-4 border-t border-accent/20 pt-5">
      <div className="relative h-44 w-44">
        <Figure pattern={pattern} point={point} active={active} still={still} />
        {active && (
          <span
            aria-hidden
            className="tabular absolute inset-0 grid place-items-center font-display text-[30px] font-semibold text-accent-ink"
          >
            {point.left}
          </span>
        )}
      </div>

      <p aria-live="polite" className="min-h-[1.5em] font-display text-[17px] font-semibold text-text">
        {done ? t.breathDone : active ? t.breathPhases[point.phase] : ''}
      </p>

      {/* The main chip keeps its place through every state, so focus stays on
          it when its label changes from "start" to "pause". */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Chip onClick={running ? pause : start} strong>
          {running ? t.timerPause : active ? t.timerResume : t.breathStart(minutes)}
        </Chip>
        {active && <Chip onClick={stop}>{t.timerStop}</Chip>}
        {active && (
          <span className="tabular text-[13px] text-muted">
            {t.breathRound(Math.min(point.round + 1, rounds), rounds)}
          </span>
        )}
      </div>
    </div>
  )
}
