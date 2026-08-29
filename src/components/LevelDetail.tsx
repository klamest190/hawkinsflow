import type { Copy } from '../i18n/copy.ts'
import type { Level } from '../types.ts'
import { PracticeDeck } from './PracticeDeck.tsx'

type LevelDetailProps = {
  level: Level
  /** Die nächsthöhere Ebene; null bei Erleuchtung. Kommt von außen, weil das
      Nachschlagen die Sprache kennen muss und diese Komponente sie nicht. */
  next: Level | null
  t: Copy
}

/** Eine Überschrift im Detailblock — klein, gesperrt, in der Ebenenfarbe. */
function Heading({ children }: { children: string }) {
  return (
    <h3 className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{children}</h3>
  )
}

/**
 * Alles, was zu einer Ebene zu sagen ist: wie sie sich anfühlt, was zuerst zu
 * tun ist, woran man sie erkennt, was auf ihr festhält und wie es weitergeht.
 * Steht im Ergebnis wie im Nachschlagewerk — deshalb kennt die Komponente keinen
 * der beiden Kontexte.
 */
export function LevelDetail({ level, next, t }: LevelDetailProps) {
  return (
    <div className="flex flex-col gap-7">
      <p className="text-[16px] leading-relaxed text-text/90">{level.essence}</p>

      {/* Der Rat. Er steht direkt hinter der Essenz und vor allem anderen, weil
          er als einziges Feld Stellung nimmt: Alles darunter beschreibt oder
          zählt auf — drei Zeichen, drei Schritte, drei Übungen —, und wer hier
          herauskommt, weiß danach nicht, womit anzufangen ist. Der Rat nennt das
          eine, was zuerst zählt, und meist den Fehler, den fast alle machen.

          Vor der Essenz stünde er nicht besser: Erst muss benannt sein, wo man
          steht, dann kann jemand dazu etwas sagen.

          Eigene Fläche und nicht nur eine Überschrift, weil der Ton ein anderer
          ist: Hier spricht jemand den Leser an, während der Rest der Seite über
          eine Ebene berichtet. Der Kasten trägt die Ebenenfarbe, sehr blass —
          kräftiger geriete er in Streit mit dem Übungskasten weiter unten, der
          dieselbe Farbe führt und die konkretere Aufforderung enthält. */}
      <section className="flex flex-col gap-2.5 rounded-2xl border border-accent/25 bg-accent/[0.07] px-5 py-4">
        <Heading>{t.adviceHeading}</Heading>
        {/* Drei Absätze, ohne Zwischenüberschriften: Der Griff, der Fehler, das
            Maß (siehe `Advice` in `types.ts`). Beschriftet sähe der Rat aus wie
            ein weiteres Formular, und hier spricht als einzige Stelle der Seite
            jemand den Leser an. Der Abstand zwischen den Absätzen macht die
            Gliederung sichtbar genug. */}
        {level.advice.map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-relaxed text-text/90">
            {paragraph}
          </p>
        ))}
      </section>

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
        <p className="border-l-2 border-accent/50 pl-4 text-[15px] leading-relaxed text-muted italic">
          {level.trap}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <Heading>{next ? t.wayTo(next.name) : t.wayEnds}</Heading>
        <ol className="flex flex-col gap-3">
          {level.steps.map((step, position) => (
            <li key={step} className="flex gap-3.5 text-[15px] leading-relaxed text-text/90">
              <span
                aria-hidden
                className="tabular mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 text-[12px] font-semibold text-accent"
              >
                {position + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Die Übungen. Bewusst als eigene Fläche und nicht als vierter Punkt der
          Liste darüber: Die Schritte sagen, wohin es geht, die Übungen sagen,
          was man heute Abend tut. Der Kasten trägt die Ebenenfarbe, damit auf
          einen Blick zu sehen ist, dass hier etwas anderes steht.

          Drei statt einer, und nebeneinander statt untereinander: Untereinander
          läse sich die dritte wie ein Nachtrag, den man überspringt. So steht
          immer eine da, und die anderen beiden sind eine Taste weit weg. */}
      <section className="flex flex-col gap-3">
        <Heading>{t.practiceHeading}</Heading>
        <PracticeDeck practices={level.practices} t={t} />
      </section>

      {/* Die Anführungszeichen kommen aus der Sprache, nicht aus dem Text: im
          Deutschen „unten und oben", im Englischen beide oben. */}
      <p className="rounded-2xl border border-line bg-card/60 px-5 py-4 text-center font-display text-[17px] leading-snug font-medium text-balance">
        <q>{level.mantra}</q>
      </p>
    </div>
  )
}
