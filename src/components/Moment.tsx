import { useEffect, useRef, useState } from 'react'
import { BELOW_THRESHOLD } from '../data/levels.ts'
import type { Copy } from '../i18n/copy.ts'
import type { MomentCopy } from '../i18n/moment.ts'
import type { BelowLevelId, Level, Plans } from '../types.ts'
import { Button } from './Button.tsx'
import { Timer } from './Timer.tsx'

type MomentProps = {
  /** Alle Ebenen in der gelesenen Sprache; gebraucht werden die unteren acht. */
  levels: Level[]
  t: Copy
  m: MomentCopy
  /** Die gewählte Ebene; null, solange keine gewählt ist. Liegt in `App`, weil
      die Farbe der ganzen Oberfläche daran hängt. */
  level: BelowLevelId | null
  onPick: (level: BelowLevelId) => void
  /** Die gespeicherten Wenn-Dann-Pläne — im letzten Schritt steht der passende. */
  plans: Plans
  /** Wird einmal je Durchgang gerufen, beim Erreichen des letzten Schritts. */
  onRecord: (level: BelowLevelId) => void
  onLeave: () => void
}

/** Die Minute Stille in Schritt zwei. */
const FEEL_MINUTES = 1

const STEPS = 4

/**
 * Der Moment-Bogen: vier Schritte, anderthalb Minuten.
 *
 * Die zweite Tür in diese App und die Antwort auf das, was der Fragebogen nicht
 * kann. Der fragt nach den letzten Wochen und zeichnet eine Landkarte; hier geht
 * es um Viertel vor drei an einem Dienstag. Merken, fühlen, fragen, handeln —
 * und die Reihenfolge ist der Inhalt, siehe `i18n/moment.ts`.
 *
 * Ein Schritt nach dem anderen und nicht alles untereinander: Auf einer
 * scrollbaren Seite überspringt man die Minute Stille, und dann bleiben drei
 * Sätze Text übrig, die für sich genommen nichts tun.
 */
export function Moment({
  levels,
  t,
  m,
  level,
  onPick,
  plans,
  onRecord,
  onLeave,
}: MomentProps) {
  const [step, setStep] = useState(0)

  /* Aufgezeichnet wird einmal je Durchgang, beim ersten Erreichen des letzten
     Schritts — nicht beim Wählen. Wer abbricht, nachdem er die Ebene angetippt
     hat, hat den Bogen nicht gemacht; und wer im letzten Schritt einmal zurück-
     und wieder vorblättert, hat ihn nicht zweimal gemacht. Derselbe Grundsatz
     wie beim Fragebogen: Nur der Abschluss zählt. */
  const recorded = useRef(false)

  /* Der Vorlesepunkt wandert mit dem Schritt — aus demselben Grund wie beim
     Wechsel der Ansicht in `App`: Nach dem Antippen einer Kachel ist der Knopf,
     auf dem der Fokus stand, nicht mehr da, und ohne das hier stünde man wieder
     am Anfang der Seite. Beim ersten Rendern nicht; da hat niemand gewechselt. */
  const stepView = useRef<HTMLDivElement>(null)
  const firstStep = useRef(true)

  useEffect(() => {
    if (firstStep.current) {
      firstStep.current = false
      return
    }
    stepView.current?.focus()
  }, [step])

  const chosen: Level | null =
    level === null ? null : (levels.find((entry) => entry.id === level) ?? null)

  const below = levels.filter((entry) => (BELOW_THRESHOLD as string[]).includes(entry.id))

  function go(next: number) {
    if (next >= STEPS - 1 && level !== null && !recorded.current) {
      recorded.current = true
      onRecord(level)
    }
    setStep(next)
  }

  function pick(id: BelowLevelId) {
    onPick(id)
    setStep(1)
  }

  return (
    <div className="animate-rise mx-auto flex w-full max-w-xl flex-col gap-6 px-5 py-8 sm:px-6">
      {/* Der rechte Abstand hält die Ecke frei, in der die Sprachwahl steht. */}
      <header className="flex items-center justify-between gap-4 pr-24">
        <Button variant="quiet" onClick={onLeave} className="-ml-4">
          {m.leave}
        </Button>
        <span className="tabular text-[13px] font-medium text-muted">
          {m.stepOf(step + 1, STEPS)}
        </span>
      </header>

      {/* Die gewählte Ebene steht ab Schritt zwei über allem, was folgt: Der
          ganze Bogen dreht sich um sie, und ohne die Zeile wüsste man nach der
          Minute Stille nicht mehr sicher, was man angetippt hat. */}
      {chosen !== null && step > 0 && (
        <p className="text-[13px] font-semibold">
          <span style={{ color: chosen.color }}>{chosen.name}</span>
          <span className="text-muted"> · {chosen.emotion}</span>
        </p>
      )}

      {/* Kein Rahmen um den halben Bogen: Der Fokus landet hier nur
          programmatisch, nie durch die Tabulatortaste. */}
      <div ref={stepView} tabIndex={-1} className="focus:outline-none">
        {/* ── Schritt 1: merken ──────────────────────────────────────────────
            Acht Kacheln, und zwar genau die acht unter der Schwelle. Über ihr
            steckt niemand fest — die Auswahl ist deshalb keine Kürzung der Skala,
            sondern ihre untere Hälfte. */}
        {step === 0 && (
          <div className="animate-rise flex flex-col gap-5">
            <div>
              <h1 className="font-display text-[28px] leading-[1.2] font-bold tracking-[-0.02em] text-balance sm:text-[32px]">
                {m.pickTitle}
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.pickLead}</p>
            </div>

            <ul className="grid grid-cols-2 gap-2.5">
              {below.map((entry) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => pick(entry.id as BelowLevelId)}
                    className={
                      'flex h-full w-full cursor-pointer items-center gap-3 rounded-2xl border ' +
                      'border-line bg-card/50 px-4 py-3.5 text-left transition-[transform,border-color,background-color] ' +
                      'duration-200 hover:-translate-y-px hover:border-accent/40 hover:bg-card ' +
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
                    }
                  >
                    <span
                      aria-hidden
                      className="h-8 w-1.5 shrink-0 rounded-full"
                      style={{ background: entry.color, boxShadow: `0 0 12px -2px ${entry.color}` }}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] font-semibold">{entry.name}</span>
                      <span className="block truncate text-[12.5px] text-muted">{entry.emotion}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Schritt 2: fühlen ──────────────────────────────────────────────
            Die Minute steht vor der Rückfrage und nicht danach: Ein Gefühl
            umzudeuten, bevor es gefühlt wurde, ist nur eine schnellere Art, es
            wegzuschieben. */}
        {step === 1 && (
          <section className="animate-rise rounded-3xl border border-line bg-card/70 p-6 backdrop-blur-md sm:p-8">
            <h1 className="font-display text-[24px] leading-[1.2] font-bold tracking-[-0.02em]">
              {m.feelTitle}
            </h1>
            <p className="mt-3 text-[16px] leading-relaxed text-text/90">{m.feelBody}</p>
            <Timer minutes={FEEL_MINUTES} t={t} />
            <p className="mt-4 text-[13px] leading-relaxed text-muted/70">{m.feelNote}</p>
          </section>
        )}

        {/* ── Schritt 3: fragen ──────────────────────────────────────────────
            Eine Frage und kein Merksatz. Ein Satz, den man sich vorsagt, trifft
            auf einen Kopf, der ihm widerspricht; eine Frage nimmt ihn in Dienst. */}
        {step === 2 && chosen !== null && level !== null && (
          <section className="animate-rise rounded-3xl border border-line bg-card/70 p-6 text-center backdrop-blur-md sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
              {m.askTitle}
            </p>
            <p
              className="mt-5 font-display text-[26px] leading-[1.25] font-semibold text-balance sm:text-[30px]"
              style={{ color: 'var(--hf-accent)' }}
            >
              {m.questions[level]}
            </p>
            <p className="mx-auto mt-6 max-w-sm text-[13px] leading-relaxed text-balance text-muted/70">
              {m.askNote}
            </p>
          </section>
        )}

        {/* ── Schritt 4: der eine Schritt ────────────────────────────────────
            Der Satz über Entscheidungen steht am Ende und nicht am Anfang:
            Vorher wäre er eine Belehrung gewesen, hier ist er das Ergebnis von
            anderthalb Minuten. */}
        {step === 3 && chosen !== null && (
          <div className="animate-rise flex flex-col gap-4">
            <section className="rounded-3xl border border-line bg-card/70 p-6 backdrop-blur-md sm:p-8">
              <h1 className="font-display text-[24px] leading-[1.2] font-bold tracking-[-0.02em]">
                {m.actTitle}
              </h1>
              <p className="mt-4 rounded-2xl border border-accent/30 bg-accent/8 p-5 text-[16px] leading-relaxed text-text/90">
                {m.noDecision}
              </p>

              <div className="mt-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                  {m.planLabel}
                </p>
                {plans[chosen.id] === undefined ? (
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{m.planNone}</p>
                ) : (
                  <div className="mt-2.5 flex flex-col gap-1.5">
                    <p className="text-[16px] leading-relaxed text-text/90">
                      <span className="font-display font-semibold text-accent">{t.planWhen}</span>{' '}
                      {plans[chosen.id]?.when}
                    </p>
                    <p className="text-[16px] leading-relaxed text-text/90">
                      <span className="font-display font-semibold text-accent">{t.planThen}</span>{' '}
                      {plans[chosen.id]?.then}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                  {m.mantraLabel}
                </p>
                {/* Die Anführungszeichen kommen aus der Sprache, nicht aus dem
                    Text: im Deutschen unten und oben, im Englischen beide oben. */}
                <p className="mt-2.5 font-display text-[17px] leading-snug font-medium text-balance">
                  <q>{chosen.mantra}</q>
                </p>
              </div>
            </section>

            <p className="px-2 text-[12.5px] leading-relaxed text-muted/70">{m.sourceNote}</p>
          </div>
        )}

      </div>

      {/* Die Fußleiste gehört den Schritten zwei bis vier — in Schritt eins ist
          das Antippen einer Kachel schon das Weiter. */}
      {step > 0 && (
        <footer className="flex items-center justify-between gap-3 pb-6">
          <Button variant="quiet" onClick={() => setStep(step - 1)} className="-ml-4">
            {m.back}
          </Button>
          {step === STEPS - 1 ? (
            <Button onClick={onLeave}>{m.done}</Button>
          ) : (
            <Button onClick={() => go(step + 1)}>{m.next}</Button>
          )}
        </footer>
      )}
    </div>
  )
}
