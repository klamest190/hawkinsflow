import { useEffect, useId, useRef, useState } from 'react'
import type { Copy } from '../i18n/copy.ts'
import { actionCore, withoutKeyword } from '../lib/plans.ts'
import type { Level, Plan } from '../types.ts'
import { Button } from './Button.tsx'

type PlanBuilderProps = {
  /** Die Ebene, zu der geplant wird — ihre Schritte werden zu Vorschlägen. */
  level: Level
  /** Der gespeicherte Plan dieser Ebene; null, solange keiner steht. */
  plan: Plan | null
  t: Copy
  /**
   * Der Satz über dem Formular. Vorbelegt mit dem allgemeinen — er erklärt, was
   * ein Wenn-Dann-Satz überhaupt soll.
   *
   * Der Moment-Bogen setzt einen eigenen ein: Wer dort ankommt, hat gerade
   * anderthalb Minuten mit einem Gefühl verbracht und braucht keine Erklärung
   * mehr, sondern die Aufforderung, es jetzt festzuhalten.
   */
  lead?: string
  /**
   * Without a plan, show only the lead and a button that opens the form.
   *
   * For the level detail, where the open form was the tallest block of the
   * result page — two fields and six suggestions before the reader reached
   * anything below. The moment flow leaves it open: its last step is the plan.
   */
  compact?: boolean
  onSave: (when: string, then: string) => void
  onDelete: () => void
}

const field =
  'w-full resize-none rounded-xl border border-line bg-void/50 px-4 py-3 ' +
  'text-[15px] leading-relaxed text-text placeholder:text-muted/60 ' +
  'transition-colors focus:border-accent-ink/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink'

const chip =
  'cursor-pointer rounded-full border border-line bg-void/40 px-3 py-1.5 text-left ' +
  'text-[12.5px] leading-snug text-muted transition-colors ' +
  'hover:border-accent/50 hover:text-text ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink'

/** Das Schlüsselwort vor jedem Feld — „Wenn" und „dann", in der Ebenenfarbe. */
function Keyword({ children }: { children: string }) {
  return (
    <span className="font-display text-[17px] font-semibold text-accent-ink">
      {children}
    </span>
  )
}

/**
 * Der Wenn-Dann-Plan zu einer Ebene.
 *
 * Zwei Felder statt eines: Die Schritte weiter oben sagen schon, *was* zu tun
 * wäre — was fehlt, ist der Moment, in dem es dran ist. Deshalb steht das „Wenn"
 * zuerst und bekommt eigene Vorschläge, und deshalb lässt sich nichts speichern,
 * solange eines von beiden leer ist: ein Vorsatz ohne Auslöser ist wieder nur
 * ein guter Wille, und den hatte man schon vor dem Fragebogen.
 *
 * Die Überschrift kommt von außen. Der Kasten steht inzwischen an drei Stellen —
 * im Detailblock einer Ebene und im letzten Schritt des Moment-Bogens —, und
 * jede beschriftet ihn in ihrer eigenen Form: dort die kleine gesperrte Zeile
 * aller Abschnitte, hier die Zeile über dem Plan. Eine eigene `h2` stünde
 * überall daneben.
 */
export function PlanBuilder({
  level,
  plan,
  t,
  lead = t.planLead,
  compact = false,
  onSave,
  onDelete,
}: PlanBuilderProps) {
  const [when, setWhen] = useState(plan?.when ?? '')
  const [then, setThen] = useState(plan?.then ?? '')
  const [editing, setEditing] = useState(plan === null && !compact)
  /* Set when the form opens from the compact button, so focus can follow into
     the first field once it exists — not on first render, where taking focus
     unasked would pull the page down to the form. */
  const focusOnOpen = useRef(false)

  const whenField = useRef<HTMLTextAreaElement>(null)
  const thenField = useRef<HTMLTextAreaElement>(null)
  const id = useId()

  useEffect(() => {
    if (!editing || !focusOnOpen.current) return
    focusOnOpen.current = false
    whenField.current?.focus()
  }, [editing])

  // What is kept: the text without an "If"/"then" the person typed in front.
  const whenText = withoutKeyword(when, t.planWhen)
  const thenText = withoutKeyword(then, t.planThen)
  const complete = whenText.length > 0 && thenText.length > 0

  /* Ein Vorschlag setzt den Anfang und gibt den Cursor zurück ins Feld: Die
     Auslöser enden auf „…", und dort soll direkt weitergeschrieben werden. */
  function prefill(target: 'when' | 'then', text: string) {
    const opening = text.replace(/\s*…\s*$/, ' ')
    if (target === 'when') {
      setWhen(opening)
      whenField.current?.focus()
    } else {
      setThen(opening)
      thenField.current?.focus()
    }
  }

  function save() {
    if (!complete) return
    onSave(whenText, thenText)
    setWhen(whenText)
    setThen(thenText)
    setEditing(false)
  }

  /* Abbrechen und Löschen setzen die Felder zurück, statt nur die Ansicht zu
     wechseln — sonst stünde beim nächsten „Ändern" ein halber Entwurf im Feld,
     den niemand mehr zuordnen kann, oder nach dem Löschen der gelöschte Text. */
  function cancel() {
    setWhen(plan?.when ?? '')
    setThen(plan?.then ?? '')
    setEditing(plan === null && !compact)
  }

  function remove() {
    onDelete()
    setWhen('')
    setThen('')
    setEditing(!compact)
  }

  function open() {
    focusOnOpen.current = true
    setEditing(true)
  }

  // ── Closed, no plan yet ──────────────────────────────────────────────────
  if (!editing && plan === null) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-[14px] leading-relaxed text-muted">{lead}</p>
        <Button variant="ghost" onClick={open}>
          {t.planStart}
        </Button>
      </div>
    )
  }

  // ── Der fertige Plan ──────────────────────────────────────────────────────
  if (!editing && plan !== null) {
    return (
      <div className="flex flex-col gap-5">
        {/* Als Satz und nicht als ausgefülltes Formular: Was hier steht, soll
            man lesen können wie etwas, das man sich selbst gesagt hat. */}
        <div className="flex flex-col gap-2 rounded-2xl border border-accent/30 bg-accent/8 p-5">
          <p className="text-[16px] leading-relaxed text-text/90">
            <Keyword>{t.planWhen}</Keyword> {plan.when}
          </p>
          <p className="text-[16px] leading-relaxed text-text/90">
            <Keyword>{t.planThen}</Keyword> {plan.then}
          </p>
        </div>

        <p className="text-[13px] leading-relaxed text-muted">{t.planStoredNote}</p>

        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => setEditing(true)}>
            {t.planEdit}
          </Button>
          <Button variant="quiet" onClick={remove}>
            {t.planDelete}
          </Button>
        </div>
      </div>
    )
  }

  // ── Das Formular ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[14px] leading-relaxed text-muted">{lead}</p>

      <div className="flex flex-col gap-2.5">
        <label htmlFor={`${id}-when`} className="cursor-pointer">
          <Keyword>{t.planWhen}</Keyword>
        </label>
        <textarea
          id={`${id}-when`}
          ref={whenField}
          rows={2}
          value={when}
          onChange={(event) => setWhen(event.target.value)}
          placeholder={t.planWhenPlaceholder}
          className={field}
        />
        <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          {t.planCueHint}
        </p>
        <div className="flex flex-wrap gap-2">
          {t.planCues.map((cue) => (
            <button key={cue} type="button" className={chip} onClick={() => prefill('when', cue)}>
              {cue}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor={`${id}-then`} className="cursor-pointer">
          <Keyword>{t.planThen}</Keyword>
        </label>
        <textarea
          id={`${id}-then`}
          ref={thenField}
          rows={2}
          value={then}
          onChange={(event) => setThen(event.target.value)}
          placeholder={t.planThenPlaceholder}
          className={field}
        />
        {/* Die Schritte der Ebene, auf ihren Kern gekürzt. Sie stehen wenige
            Zeilen weiter oben in voller Länge — hier zählt nur, dass man sie
            mit einem Griff übernehmen kann. */}
        <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          {t.planStepHint}
        </p>
        <div className="flex flex-wrap gap-2">
          {level.steps.map((step) => {
            const core = actionCore(step)
            return (
              <button
                key={step}
                type="button"
                className={chip}
                onClick={() => prefill('then', core)}
              >
                {core}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={save} disabled={!complete}>
          {t.planSave}
        </Button>
        {(plan !== null || compact) && (
          <Button variant="quiet" onClick={cancel}>
            {t.back}
          </Button>
        )}
      </div>
    </div>
  )
}
