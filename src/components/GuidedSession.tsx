import { useEffect, useRef, useState } from 'react'
import { SESSION_MINUTES, type GuidedId } from '../data/sessions.ts'
import { useCountdown } from '../hooks/useCountdown.ts'
import { useSessionPreference } from '../hooks/useSessionPreference.ts'
import { useSpeech } from '../hooks/useSpeech.ts'
import { useWakeLock } from '../hooks/useWakeLock.ts'
import type { Copy } from '../i18n/copy.ts'
import type { MeditationText } from '../i18n/meditation.ts'
import type { SessionCopy, SessionStep } from '../i18n/sessions.ts'
import { itemAt } from '../lib/array.ts'
import { chime, softChime } from '../lib/chime.ts'
import { clockOf } from '../lib/clock.ts'
import { sessionAt, startOf, stepsFor, totalOf } from '../lib/session.ts'
import type { Language } from '../types.ts'
import { Button } from './Button.tsx'
import { Choice } from './Choice.tsx'
import { Chip } from './Timer.tsx'

type GuidedSessionProps = {
  id: GuidedId
  /** The form's name and how it works, from the meditation page. */
  form: MeditationText
  language: Language
  t: Copy
  s: SessionCopy
  onLeave: () => void
}

type Stage = 'prep' | 'run' | 'done'

/**
 * The running part of a session: the clock, the current step, the tones and
 * the voice. Mounted fresh for every start, so the clock takes the chosen
 * length — `useCountdown` reads its length once.
 *
 * The clock goes by the wall clock and keeps going in a hidden tab: nobody
 * looks at the screen while meditating. The wake lock keeps the screen on,
 * so the page stays awake for the tones of the next steps.
 */
function Running({
  steps,
  texts,
  voice,
  speak,
  silence,
  t,
  s,
  onDone,
  onRestart,
}: {
  steps: number[]
  texts: SessionStep[]
  voice: boolean
  speak: (text: string) => void
  silence: () => void
  t: Copy
  s: SessionCopy
  onDone: () => void
  onRestart: () => void
}) {
  const total = totalOf(steps)
  const { remaining, running, done, start, pause, jump } = useCountdown(total)
  // Just short of the end, so the last instant still reads as the last step.
  const point = sessionAt(steps, Math.min(total - remaining, total - 0.001))
  const step = itemAt(texts, point.index)

  useWakeLock(running)

  // The tap on "begin" is the start; there is nothing to press twice.
  useEffect(() => {
    start()
  }, [start])

  /* A soft tone and, if asked for, the voice at every new step — once per
     step, not again after a pause. */
  const announced = useRef(-1)
  useEffect(() => {
    if (!running || done || point.index === announced.current) return
    announced.current = point.index
    softChime()
    if (voice) speak(`${step.title}. ${step.cue}`)
  }, [running, done, point.index, voice, speak, step])

  // As in `Timer`: the end sounds once, at the change to done.
  const finished = useRef(false)
  useEffect(() => {
    if (!done || finished.current) return
    finished.current = true
    silence()
    chime()
    onDone()
  }, [done, silence, onDone])

  // Leaving the view in the middle of a sentence stops the voice, too.
  useEffect(() => silence, [silence])

  function next() {
    jump(total - startOf(steps, point.index + 1))
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="tabular text-small font-medium text-muted">{s.stepOf(point.index + 1, steps.length)}</p>

      {/* The step's name and instruction are announced together at every
          change; the running seconds stay out of it. */}
      <div aria-live="polite" className="flex flex-col gap-3">
        <h2 className="font-display text-display-s leading-[1.2] font-bold tracking-[-0.02em] text-accent-ink">
          {step.title}
        </h2>
        <p className="text-lead leading-relaxed text-text/90">{step.cue}</p>
      </div>

      <div aria-hidden className="flex flex-col gap-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-accent-ink" style={{ width: `${point.stepProgress * 100}%` }} />
        </div>
        <p className="tabular text-small text-muted">{s.left(clockOf(remaining))}</p>
      </div>

      {/* The main chip keeps its place through every state, as in `Breath`. */}
      <div className="flex flex-wrap items-center gap-3">
        <Chip
          onClick={() => {
            if (running) {
              pause()
              silence()
            } else start()
          }}
          strong
        >
          {running ? t.timerPause : t.timerResume}
        </Chip>
        <Chip onClick={next}>{s.next}</Chip>
        <Chip
          onClick={() => {
            silence()
            onRestart()
          }}
        >
          {s.restart}
        </Chip>
      </div>
    </div>
  )
}

/**
 * A guided meditation: choose the length and the voice, begin, and the
 * screen leads step by step — the step's name, what to do, a soft tone at
 * every change and, if asked for, the device's voice reading it.
 *
 * A flow like the moment flow: no navigation, its own "cancel", one step
 * of the session at a time.
 */
export function GuidedSession({ id, form, language, t, s, onLeave }: GuidedSessionProps) {
  const { preference, choose } = useSessionPreference()
  const { available, speak, silence } = useSpeech(language)
  const [stage, setStage] = useState<Stage>('prep')
  const steps = stepsFor(id, preference.minutes)
  const voice = preference.voice && available

  /* The reading point moves with the stage, as in the moment flow: the
     button that had the focus is gone after "begin" and at the end. */
  const stageView = useRef<HTMLDivElement>(null)
  const firstStage = useRef(true)
  useEffect(() => {
    if (firstStage.current) {
      firstStage.current = false
      return
    }
    stageView.current?.focus({ preventScroll: true })
  }, [stage])

  return (
    <div className="animate-rise mx-auto flex w-full max-w-xl flex-col gap-6 px-5 py-8 sm:px-6">
      {/* The right padding keeps the corner free for the language switch. */}
      <header className="flex h-10 items-center justify-between gap-4 pr-24">
        <Button variant="quiet" onClick={onLeave} className="-ml-4">
          {s.leave}
        </Button>
      </header>

      <h1 className="font-display text-title font-semibold text-muted">{form.name}</h1>

      <div ref={stageView} tabIndex={-1} className="focus:outline-none">
        {stage === 'prep' && (
          <div className="animate-rise flex flex-col gap-6">
            <p className="text-body leading-relaxed text-text/90">{form.how}</p>

            <Choice
              legend={s.lengthLegend}
              name="session-minutes"
              disabled={false}
              options={SESSION_MINUTES.map((minutes) => ({
                value: String(minutes),
                checked: preference.minutes === minutes,
                onPick: () => choose({ minutes }),
                label: s.minutes(minutes),
              }))}
            />

            <div className={'flex flex-col gap-1.5 rounded-2xl border border-line bg-void/30 p-4 ' + (available ? '' : 'opacity-60')}>
              <label
                className={
                  'flex items-center gap-3 text-body font-semibold text-text ' +
                  (available ? 'cursor-pointer' : '')
                }
              >
                <input
                  type="checkbox"
                  checked={voice}
                  disabled={!available}
                  aria-describedby="session-voice-hint"
                  onChange={(event) => choose({ voice: event.target.checked })}
                  className="h-5 w-5 shrink-0 accent-accent-ink"
                />
                {s.voice}
              </label>
              <p id="session-voice-hint" className="pl-8 text-small leading-relaxed text-muted">
                {available ? s.voiceHint : s.voiceMissing}
              </p>
            </div>

            <p className="text-small leading-relaxed text-muted">{s.screenHint}</p>

            <div>
              <Button onClick={() => setStage('run')}>{s.begin}</Button>
            </div>
          </div>
        )}

        {stage === 'run' && (
          <section className="animate-rise surface p-6 sm:p-8">
            <Running
              key={preference.minutes}
              steps={steps}
              texts={s.steps[id]}
              voice={voice}
              speak={speak}
              silence={silence}
              t={t}
              s={s}
              onDone={() => setStage('done')}
              onRestart={() => setStage('prep')}
            />
          </section>
        )}

        {stage === 'done' && (
          <section className="animate-rise flex flex-col gap-5 surface p-6 sm:p-8">
            <h2 className="font-display text-display-s font-bold tracking-[-0.02em]">{s.doneTitle}</h2>
            <p className="text-lead leading-relaxed text-text/90">{s.doneBody}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={onLeave}>{s.backToMeditation}</Button>
              <Button variant="quiet" onClick={() => setStage('prep')}>
                {s.again}
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
