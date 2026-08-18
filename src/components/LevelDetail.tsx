import type { Copy } from '../i18n/copy.ts'
import type { Level } from '../types.ts'

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
 * Alles, was zu einer Ebene zu sagen ist: wie sie sich anfühlt, woran man sie
 * erkennt, was auf ihr festhält und wie es weitergeht. Steht im Ergebnis wie im
 * Nachschlagewerk — deshalb kennt die Komponente keinen der beiden Kontexte.
 */
export function LevelDetail({ level, next, t }: LevelDetailProps) {
  return (
    <div className="flex flex-col gap-7">
      <p className="text-[16px] leading-relaxed text-text/90">{level.essence}</p>

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

      {/* Die Übung. Bewusst als eigene Fläche und nicht als vierter Punkt der
          Liste darüber: Die Schritte sagen, wohin es geht, die Übung sagt, was
          man heute Abend tut. Der Kasten trägt die Ebenenfarbe, damit auf einen
          Blick zu sehen ist, dass hier etwas anderes steht. */}
      <section className="flex flex-col gap-3">
        <Heading>{t.practiceHeading}</Heading>
        <div className="rounded-2xl border border-accent/30 bg-accent/8 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-display text-[17px] font-semibold">{level.practice.name}</p>
            <p className="text-[12px] font-semibold tracking-[0.08em] text-accent uppercase">
              {level.practice.duration}
            </p>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{level.practice.body}</p>
        </div>
      </section>

      {/* Die Anführungszeichen kommen aus der Sprache, nicht aus dem Text: im
          Deutschen „unten und oben", im Englischen beide oben. */}
      <p className="rounded-2xl border border-line bg-card/60 px-5 py-4 text-center font-display text-[17px] leading-snug font-medium text-balance">
        <q>{level.mantra}</q>
      </p>
    </div>
  )
}
