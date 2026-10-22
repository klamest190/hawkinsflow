import { useEffect, useRef } from 'react'
import { useBreath } from '../hooks/useBreath.ts'
import { useEbbPreference } from '../hooks/useEbbPreference.ts'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import type { Copy } from '../i18n/copy.ts'
import type { EbbCopy } from '../i18n/ebbflow.ts'
import { breathAt } from '../lib/breath.ts'
import { chime } from '../lib/chime.ts'
import {
  EBB_DURATIONS,
  EBB_MODES,
  EBB_PATTERNS,
  breathsIn,
  remainingLabel,
  type EbbPreference,
} from '../lib/ebbflow.ts'
import { BreathFigure } from './Breath.tsx'
import { PAGE_WIDTH } from './page.ts'
import { Chip } from './Timer.tsx'

type EbbflowProps = {
  t: Copy
  e: EbbCopy
}

/* The ring around the breath: its circumference in viewBox units. */
const RING = 2 * Math.PI * 47

/**
 * One choice as a row of pills — real radio buttons, hidden, behind their
 * labels, so the arrow keys and screen readers work as they do for any
 * radio group. Disabled as a whole while the pause runs: there is nothing to
 * decide then, by design.
 */
function Choice({
  legend,
  name,
  options,
  disabled,
}: {
  legend: string
  name: string
  options: { value: string; checked: boolean; onPick: () => void; label: string; detail?: string; spoken?: string }[]
  disabled: boolean
}) {
  return (
    <fieldset disabled={disabled} className="flex flex-col gap-2.5 transition-opacity disabled:opacity-55">
      <legend className="mb-2.5 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{legend}</legend>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option) => (
          <label
            key={option.value}
            className={
              'flex cursor-pointer flex-col items-center gap-0.5 rounded-2xl border border-line bg-void/30 px-2 py-2.5 text-center ' +
              'transition-[border-color,background-color] duration-200 hover:border-accent/40 ' +
              'has-checked:border-accent-ink/60 has-checked:bg-accent/15 ' +
              'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-ink'
            }
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.checked}
              onChange={option.onPick}
              className="sr-only"
            />
            <span className="text-[14px] font-semibold text-text">{option.label}</span>
            {option.detail !== undefined && (
              <span aria-hidden className="tabular text-[12px] text-muted">
                {option.detail}
              </span>
            )}
            {option.spoken !== undefined && <span className="sr-only">{option.spoken}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * Ebb Flow: a ring that runs down while a circle breathes in and out inside
 * it. The time left stands in the middle, the phase word underneath — the
 * word is announced, the seconds are not, as in `Breath`.
 *
 * On a phone the ring comes first and the choices under it, as in Ebb Flow
 * itself: whoever opens it for the impulse at hand finds the start button
 * without scrolling. On a wide screen the ring stands to the right of the
 * choices. In the reading order the choices come first either way — they
 * are what to decide before starting.
 */
export function Ebbflow({ t, e }: EbbflowProps) {
  const { preference, choose } = useEbbPreference()
  const pattern = EBB_PATTERNS[preference.mode]
  const rounds = breathsIn(preference.seconds)
  const { elapsed, total, running, done, start, pause, stop } = useBreath(pattern, rounds)
  const still = useReducedMotion()

  const untouched = !running && elapsed === 0
  const active = !untouched && !done
  const point = breathAt(pattern, Math.min(elapsed, total - 0.001))

  // As in `Timer`: the chime belongs to the change to done, not to the state.
  const rang = useRef(false)
  useEffect(() => {
    if (done && !rang.current) {
      rang.current = true
      chime()
    }
    if (!done) rang.current = false
  }, [done])

  /* A short pulse at every turn of the breath, where the phone can: the eyes
     can close, and the hand still knows when to turn. */
  const lastPhase = useRef<string | null>(null)
  useEffect(() => {
    if (!running) {
      lastPhase.current = null
      return
    }
    if (lastPhase.current !== null && lastPhase.current !== point.phase && 'vibrate' in navigator) {
      navigator.vibrate(15)
    }
    lastPhase.current = point.phase
  }, [running, point.phase])

  /* A new choice starts a new pause: after one has run out, picking another
     length must not leave the old one standing half-done. */
  function pick(next: Partial<EbbPreference>) {
    stop()
    choose(next)
  }

  const left = total - elapsed

  return (
    <div className={`animate-rise mx-auto flex w-full max-w-2xl flex-col px-5 py-8 sm:px-6 ${PAGE_WIDTH}`}>
      <h1 className="font-display text-4xl font-bold tracking-[-0.02em]">{e.title}</h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{e.lead}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="flex flex-col gap-6">
          <Choice
            legend={e.modeLegend}
            name="ebb-mode"
            disabled={active}
            options={EBB_MODES.map((mode) => ({
              value: mode,
              checked: preference.mode === mode,
              onPick: () => pick({ mode }),
              label: e.modes[mode].name,
              detail: `${EBB_PATTERNS[mode].inhale} · ${EBB_PATTERNS[mode].exhale}`,
              spoken: e.split(EBB_PATTERNS[mode].inhale, EBB_PATTERNS[mode].exhale),
            }))}
          />

          {/* The split as two widths and not two numbers: the boundary moves
              when the rhythm changes. */}
          <div className="flex flex-col gap-2">
            <div aria-hidden className="flex h-8 gap-1 overflow-hidden rounded-full text-[11.5px] font-semibold">
              <span
                className="grid place-items-center rounded-l-full bg-accent/30 text-text transition-[flex-grow] duration-500"
                style={{ flexGrow: pattern.inhale }}
              >
                {e.inhaleShort(pattern.inhale)}
              </span>
              <span
                className="grid place-items-center rounded-r-full bg-accent/10 text-muted transition-[flex-grow] duration-500"
                style={{ flexGrow: pattern.exhale }}
              >
                {e.exhaleShort(pattern.exhale)}
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-muted">{e.modes[preference.mode].use}</p>
          </div>

          <Choice
            legend={e.durationLegend}
            name="ebb-duration"
            disabled={active}
            options={EBB_DURATIONS.map((seconds) => ({
              value: String(seconds),
              checked: preference.seconds === seconds,
              onPick: () => pick({ seconds }),
              label: e.duration(seconds),
            }))}
          />
          <p className="-mt-3 text-[13px] text-muted">
            {e.breaths(rounds)}
            {active && <span className="block pt-1 text-[12.5px]">{e.locked}</span>}
          </p>
        </div>

        <div className="order-first flex flex-col items-center gap-5 rounded-3xl border border-line bg-card/60 p-6 backdrop-blur-sm lg:order-last">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72">
            <BreathFigure pattern={pattern} point={point} active={active} still={still} />
            {/* The ring that runs down: full at the start, empty at the end. */}
            <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx={50} cy={50} r={47} fill="none" stroke="var(--hf-line)" strokeWidth={1.5} />
              <circle
                cx={50}
                cy={50}
                r={47}
                fill="none"
                stroke="var(--hf-accent-ink)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray={RING}
                strokeDashoffset={RING * (elapsed / total)}
              />
            </svg>
            <span
              aria-hidden
              className="tabular absolute inset-0 grid place-items-center font-display text-[34px] font-semibold text-accent-ink"
            >
              {remainingLabel(left, preference.seconds)}
            </span>
          </div>

          <p aria-live="polite" className="min-h-[1.5em] text-center font-display text-[18px] font-semibold text-text">
            {done ? e.done : active ? t.breathPhases[point.phase] : ''}
          </p>

          {/* The main chip keeps its place through every state, as in `Breath`. */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Chip onClick={running ? pause : start} strong>
              {running ? t.timerPause : active ? t.timerResume : done ? e.again : e.start}
            </Chip>
            {active && <Chip onClick={stop}>{t.timerStop}</Chip>}
          </div>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-line bg-card/50 p-5 backdrop-blur-sm">
        <h2 className="font-display text-[17px] font-semibold">{e.whyTitle}</h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-text/85">{e.whyBody}</p>
        <p className="mt-3 text-[12px] leading-relaxed text-muted">{e.whySource}</p>
      </section>
    </div>
  )
}
