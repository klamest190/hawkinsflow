import { useId, useRef, useState } from 'react'
import type { Copy } from '../i18n/copy.ts'
import { actionCore } from '../lib/plans.ts'
import type { Level, Plan } from '../types.ts'
import { Button } from './Button.tsx'

type PlanBuilderProps = {
  /** Die Ebene, zu der geplant wird — ihre Schritte werden zu Vorschlägen. */
  level: Level
  /** Der gespeicherte Plan dieser Ebene; null, solange keiner steht. */
  plan: Plan | null
  t: Copy
  onSave: (when: string, then: string) => void
  onDelete: () => void
}

const field =
  'w-full resize-none rounded-xl border border-line bg-void/50 px-4 py-3 ' +
  'text-[15px] leading-relaxed text-text placeholder:text-muted/45 ' +
  'transition-colors focus:border-accent/60 focus:outline-none'

const chip =
  'cursor-pointer rounded-full border border-line bg-void/40 px-3 py-1.5 text-left ' +
  'text-[12.5px] leading-snug text-muted transition-colors ' +
  'hover:border-accent/50 hover:text-text ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

/** Das Schlüsselwort vor jedem Feld — „Wenn" und „dann", in der Ebenenfarbe. */
function Keyword({ children }: { children: string }) {
  return (
    <span className="font-display text-[17px] font-semibold text-accent">
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
 */
export function PlanBuilder({ level, plan, t, onSave, onDelete }: PlanBuilderProps) {
  const [when, setWhen] = useState(plan?.when ?? '')
  const [then, setThen] = useState(plan?.then ?? '')
  const [editing, setEditing] = useState(plan === null)

  const whenField = useRef<HTMLTextAreaElement>(null)
  const thenField = useRef<HTMLTextAreaElement>(null)
  const id = useId()

  const complete = when.trim().length > 0 && then.trim().length > 0

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
    onSave(when.trim(), then.trim())
    setEditing(false)
  }

  /* Abbrechen und Löschen setzen die Felder zurück, statt nur die Ansicht zu
     wechseln — sonst stünde beim nächsten „Ändern" ein halber Entwurf im Feld,
     den niemand mehr zuordnen kann, oder nach dem Löschen der gelöschte Text. */
  function cancel() {
    setWhen(plan?.when ?? '')
    setThen(plan?.then ?? '')
    setEditing(plan === null)
  }

  function remove() {
    onDelete()
    setWhen('')
    setThen('')
    setEditing(true)
  }

  // ── Der fertige Plan ──────────────────────────────────────────────────────
  if (!editing && plan !== null) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="font-display text-xl font-semibold">{t.planTitle}</h2>

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

        <p className="text-[13px] leading-relaxed text-muted/70">{t.planStoredNote}</p>

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
      <div>
        <h2 className="font-display text-xl font-semibold">{t.planTitle}</h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{t.planLead}</p>
      </div>

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
        <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-muted/70 uppercase">
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
        <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-muted/70 uppercase">
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
        {plan !== null && (
          <Button variant="quiet" onClick={cancel}>
            {t.back}
          </Button>
        )}
      </div>
    </div>
  )
}
