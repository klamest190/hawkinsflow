import { useState } from 'react'
import { CRISIS_BELOW } from '../data/levels.ts'
import type { Copy } from '../i18n/copy.ts'
import type { Level, Plan } from '../types.ts'
import { PlanBuilder } from './PlanBuilder.tsx'
import { PracticeDeck } from './PracticeDeck.tsx'

type LevelDetailProps = {
  level: Level
  t: Copy
  /** Der Wenn-Dann-Plan zu dieser Ebene; null, solange keiner steht. */
  plan: Plan | null
  onSavePlan: (when: string, then: string) => void
  onDeletePlan: () => void
  /**
   * Im Ergebnis: Zeichen, Falle und Maß liegen hinter einem Aufklapper, damit
   * Rat, Übung und Plan zuerst kommen. In der Skala steht alles offen — dort
   * schlägt man nach und will nicht zweimal klappen.
   */
  collapsible?: boolean
}

/** Eine Überschrift im Detailblock — klein, gesperrt, in der Ebenenfarbe. */
function Heading({ children }: { children: string }) {
  return (
    <h3 className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{children}</h3>
  )
}

/**
 * Alles, was zu einer Ebene zu sagen ist: wie sie sich anfühlt, was sie einem
 * schon gibt, womit anzufangen ist, woran man sie erkennt, was auf ihr
 * festhält, woran man merkt, dass es wirkt — und die Übungen. Steht im
 * Ergebnis wie im Nachschlagewerk; deshalb kennt die Komponente keinen der
 * beiden Kontexte, nur den Schalter `collapsible`.
 *
 * Die Reihenfolge ist die eines Gesprächs: erst benennen, wo man steht, dann
 * anerkennen, was da ist, dann das eine sagen, was jetzt zu tun ist, und erst
 * danach erklären. Die Schritte-Liste, die hier einmal stand, ist weg — sie
 * sagte in anderen Worten, was Rat und Übungen schon sagen. Ihre Sätze leben
 * als Vorschläge im Plan weiter.
 */
export function LevelDetail({
  level,
  t,
  plan,
  onSavePlan,
  onDeletePlan,
  collapsible = false,
}: LevelDetailProps) {
  const [open, setOpen] = useState(!collapsible)
  const crisis = level.value < CRISIS_BELOW

  /* Die drei erklärenden Abschnitte — im Ergebnis hinter dem Aufklapper, in
     der Skala an ihrem alten Platz zwischen Rat und Übungen. */
  const explanation = (
    <>
      <section className="flex flex-col gap-3">
        <Heading>{t.signsHeading}</Heading>
        <ul className="flex flex-col gap-2">
          {level.signs.map((sign) => (
            <li key={sign} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
              {sign}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <Heading>{t.trapHeading}</Heading>
        <p className="border-l-2 border-accent/50 pl-4 text-[15px] leading-relaxed text-muted">
          {level.trap}
        </p>
      </section>

      {/* Das Maß. Früher der dritte Absatz des Rats und dort am Ende eines
          langen Blocks — dabei ist es der Teil, den man nach zwei Tagen
          braucht, wenn der erste Griff getan ist und die Frage kommt, ob das
          überhaupt etwas bringt. */}
      <section className="flex flex-col gap-3">
        <Heading>{t.progressHeading}</Heading>
        <p className="text-[15px] leading-relaxed text-muted">{level.progress}</p>
        {/* In der Skala steht die Nummer hier; im Ergebnis weiter oben, wo sie
            nicht hinter einem Aufklapper liegt. */}
        {crisis && !collapsible && (
          <p className="text-[14px] leading-relaxed text-text/90">{t.crisisNote}</p>
        )}
      </section>
    </>
  )

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <p className="text-[16px] leading-relaxed text-text/90">{level.essence}</p>
        {/* Die Stärke der Ebene, direkt hinter der Essenz und vor dem Rat: Ein
            Rat ohne Anerkennung liest sich wie eine Zurechtweisung. Kein
            Kasten, nur eine Zeile mit Etikett — sie soll gehört werden, nicht
            auffallen. */}
        <div className="flex flex-col gap-1.5 border-l-2 border-accent/50 pl-4">
          <Heading>{t.strengthHeading}</Heading>
          <p className="text-[15px] leading-relaxed text-text/80">{level.strength}</p>
        </div>
      </div>

      {/* Der Rat. Ein Absatz, eigene Fläche: Hier spricht jemand den Leser an,
          während der Rest der Seite über eine Ebene berichtet. Der Kasten trägt
          die Ebenenfarbe, sehr blass — kräftiger geriete er in Streit mit dem
          Übungskasten weiter unten, der dieselbe Farbe führt. */}
      <section className="flex flex-col gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.07] px-5 py-4">
        <Heading>{t.adviceHeading}</Heading>
        <p className="text-[15px] leading-relaxed text-text/90">{level.advice}</p>
      </section>

      {/* Die Nummer steht in voller Farbe und nicht gedämpft, und im Ergebnis
          vor dem Aufklapper: der eine Satz auf dieser Seite, der nicht
          überlesen werden darf. */}
      {crisis && collapsible && (
        <p className="text-[14px] leading-relaxed text-text/90">{t.crisisNote}</p>
      )}

      {!collapsible && explanation}

      {/* Die Übungen. Eigene Fläche mit Ebenenfarbe, damit auf einen Blick zu
          sehen ist, dass hier etwas anderes steht: nicht, wohin es geht,
          sondern was man heute Abend tut. Drei nebeneinander statt
          untereinander — so steht immer eine da, und die anderen beiden sind
          eine Taste weit weg. */}
      <section className="flex flex-col gap-3">
        <Heading>{t.practiceHeading}</Heading>
        <PracticeDeck practices={level.practices} t={t} />
      </section>

      {/* Der Wenn-Dann-Plan. Er steht hinter den Übungen und vor dem Mantra:
          Alles davor sagt, was zu tun wäre — der Plan bindet eines davon an
          einen Moment. Das `key` bindet das Formular an seine Ebene: In der
          Skalenansicht steht derselbe Kasten siebzehnmal, und ohne das trüge
          der nächste den halben Entwurf des vorigen im Feld. */}
      <section className="flex flex-col gap-3">
        <Heading>{t.planTitle}</Heading>
        <PlanBuilder
          key={level.id}
          level={level}
          plan={plan}
          t={t}
          onSave={onSavePlan}
          onDelete={onDeletePlan}
        />
      </section>

      {/* Der Aufklapper. Zeichen, Falle und Maß sind das, was man liest, wenn
          der erste Griff getan ist — nicht das, was zwischen Rat und Übung
          stehen muss. Ein Knopf und kein <details>: So bekommt er dieselbe
          Fokusführung und dieselbe Einblendung wie der Rest der App. */}
      {collapsible && (
        <div className="flex flex-col gap-7">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((previous) => !previous)}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line bg-void/30 px-5 py-3.5 text-left text-[14px] font-semibold text-text transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {open ? t.lessAboutLevel : t.moreAboutLevel}
            <span
              aria-hidden
              className={
                'text-[13px] text-muted transition-transform duration-300 ' +
                (open ? 'rotate-180' : '')
              }
            >
              ▾
            </span>
          </button>
          {open && <div className="animate-rise flex flex-col gap-7">{explanation}</div>}
        </div>
      )}

      {/* Die Anführungszeichen kommen aus der Sprache, nicht aus dem Text: im
          Deutschen „unten und oben", im Englischen beide oben. */}
      <p className="rounded-2xl border border-line bg-card/60 px-5 py-4 text-center font-display text-[17px] leading-snug font-medium text-balance">
        <q>{level.mantra}</q>
      </p>
    </div>
  )
}
