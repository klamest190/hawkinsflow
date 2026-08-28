import type { MomentCopy } from '../i18n/moment.ts'
import type { Language, Level, Moments } from '../types.ts'

type MomentTrailProps = {
  moments: Moments
  levels: Level[]
  language: Language
  m: MomentCopy
  onClear: () => void
}

/* So viele Punkte stehen nebeneinander. Mehr passen auf ein Telefon nicht in
   eine Zeile, und eine zweite Zeile sähe nach einem Kalender aus — nach etwas,
   das gezählt werden will. */
const SHOW = 14

/**
 * Die Momente als Punktreihe.
 *
 * Bewusst keine Linie wie beim Verlauf und keine Höhe: Zwei Momente sind kein
 * Auf und Ab, sie sind zwei Dienstage. Was die Reihe zeigt, ist ihre Farbe —
 * wer sie ansieht, erkennt binnen einer Sekunde, ob dieselbe Ebene immer
 * wiederkommt. Genau das ist die einzige Auskunft, die hier ehrlich zu haben
 * ist.
 */
export function MomentTrail({ moments, levels, language, m, onClear }: MomentTrailProps) {
  const latest = moments.at(-1)
  if (latest === undefined) return null

  const shown = moments.slice(-SHOW)
  const levelOf = (id: string): Level | null => levels.find((level) => level.id === id) ?? null
  const latestLevel = levelOf(latest.level)

  // Einmal gebaut statt je Punkt — `Intl.DateTimeFormat` ist der teuerste Teil
  // dieser Komponente.
  const day = new Intl.DateTimeFormat(language, { day: 'numeric', month: 'short' })

  return (
    <div className="mt-6 w-full rounded-2xl border border-line bg-card/60 p-5 text-left backdrop-blur-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {m.trailTitle}
        </p>
        {latestLevel !== null && (
          <p className="text-[12px] font-semibold" style={{ color: latestLevel.color }}>
            {m.trailLatest}: {latestLevel.name}
          </p>
        )}
      </div>

      {/* Für Screenreader eine Aufzählung: Datum und Ebene je Moment. Eine Reihe
          farbiger Punkte wäre dort schlicht nichts. */}
      <div
        role="img"
        aria-label={shown
          .map((moment) =>
            m.trailEntryLabel(
              day.format(new Date(moment.taken)),
              levelOf(moment.level)?.name ?? moment.level,
            ),
          )
          .join(' · ')}
        className="mt-4 flex flex-wrap items-center gap-2"
      >
        {shown.map((moment, index) => {
          const level = levelOf(moment.level)
          const isLatest = index === shown.length - 1

          return (
            <span
              key={moment.taken}
              className="rounded-full"
              style={{
                width: isLatest ? 12 : 9,
                height: isLatest ? 12 : 9,
                background: level?.color ?? 'var(--hf-muted)',
                // Der jüngste Punkt bekommt einen Hof statt einer anderen Farbe:
                // So bleibt die Ebenenfarbe überall dieselbe Aussage.
                boxShadow: isLatest ? `0 0 0 4px color-mix(in oklab, ${level?.color ?? 'var(--hf-muted)'} 22%, transparent)` : undefined,
                opacity: isLatest ? 1 : 0.75,
              }}
            />
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <p className="max-w-sm text-[13px] leading-relaxed text-muted/80">
          {m.trailLead(moments.length)}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="cursor-pointer text-[12px] font-medium text-muted/70 underline decoration-line underline-offset-4 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {m.trailClear}
        </button>
      </div>
    </div>
  )
}
