import { THRESHOLD } from '../data/levels.ts'
import type { Copy } from '../i18n/copy.ts'
import { levelOf, rankAt } from '../lib/history.ts'
import type { History, Language, Level } from '../types.ts'

type HistoryTrailProps = {
  history: History
  levels: Level[]
  language: Language
  t: Copy
  onClear: () => void
}

/* Der Zeichenraum der Linie. Die Maße stehen hier und nicht im Markup, weil
   jeder Punkt daraus gerechnet wird — und weil die Grafik über `viewBox`
   gleichmäßig mitwächst, sind es keine Pixel, sondern Verhältnisse.

   Flacher als früher: Was die Linie zu sagen hat, sagt sie auch auf halber
   Höhe, und sie teilt sich die Karte inzwischen mit einer zweiten Spur. */
const BOX = { width: 320, height: 54, padX: 12, padY: 9 }

/** Die Stelle eines Durchgangs im Zeichenraum. */
function pointAt(levels: Level[], calibration: number, index: number, total: number) {
  const span = BOX.width - 2 * BOX.padX
  // Ein einzelner Punkt steht in der Mitte statt am linken Rand.
  const x = total < 2 ? BOX.width / 2 : BOX.padX + (span * index) / (total - 1)

  const rank = rankAt(levels, calibration) / (levels.length - 1)
  const y = BOX.height - BOX.padY - rank * (BOX.height - 2 * BOX.padY)

  return { x, y }
}

/**
 * Die abgeschlossenen Durchgänge als Linie.
 *
 * Die Höhe folgt dem *Rang* der Ebene und nicht Hawkins' Zahl: Zwischen 600 und
 * 700 liegen hundert Punkte, zwischen Scham und Schuld nur zehn — über die rohen
 * Zahlen klebte die Linie unten am Rand.
 *
 * Bewusst ohne Achsenbeschriftung und ohne Zahlen: Was hier steht, ist eine
 * Reihe von Stimmungen an einzelnen Tagen. Ein Koordinatensystem darum würde
 * daraus eine Messreihe machen, und genau das ist sie nicht.
 *
 * Kein eigener Kasten mehr, sondern eine Zeile in dem, den sie sich mit den
 * Momenten teilt — siehe `Intro`. Deshalb steht hier nur noch das Innere.
 */
export function HistoryTrail({ history, levels, language, t, onClear }: HistoryTrailProps) {
  const latest = history.at(-1)
  if (latest === undefined) return null

  const latestLevel = levelOf(levels, latest.level)
  const points = history.map((run, index) => pointAt(levels, run.calibration, index, history.length))
  const thresholdY = pointAt(levels, THRESHOLD, 0, 1).y

  // Einmal gebaut statt je Punkt: `Intl.DateTimeFormat` ist der teuerste Teil
  // dieser Komponente, und die Grafik braucht ihn für jeden Durchgang.
  const day = new Intl.DateTimeFormat(language, { day: 'numeric', month: 'short' })
  const date = day.format(new Date(latest.taken))

  return (
    <section className="p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {t.historyTitle}
        </p>
        {latestLevel !== null && (
          <p className="text-[12px] font-semibold" style={{ color: latestLevel.color }}>
            {t.historyLatest}: {latestLevel.name}
          </p>
        )}
      </div>

      <svg
        viewBox={`0 0 ${BOX.width} ${BOX.height}`}
        className="mt-3 h-auto w-full overflow-visible"
        role="img"
        /* Die Linie ist für Screenreader eine Aufzählung: Datum und Ebene je
           Durchgang. Eine Grafik ohne Text wäre hier schlicht nichts. */
        aria-label={history
          .map((run) =>
            t.historyEntryLabel(
              day.format(new Date(run.taken)),
              levelOf(levels, run.level)?.name ?? run.level,
            ),
          )
          .join(' · ')}
      >
        {/* Die Schwelle bei 200 — die einzige Höhe dieser Skala, an der sich
            etwas grundsätzlich ändert, und deshalb die einzige eingezeichnete. */}
        <line
          x1={0}
          x2={BOX.width}
          y1={thresholdY}
          y2={thresholdY}
          stroke="var(--hf-line)"
          strokeWidth={1}
          strokeDasharray="3 4"
        />

        {points.length > 1 && (
          <polyline
            points={points.map((point) => `${point.x},${point.y}`).join(' ')}
            fill="none"
            stroke="var(--hf-muted)"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {points.map((point, index) => {
          const run = history[index]
          const color = levelOf(levels, run.level)?.color ?? 'var(--hf-muted)'
          const isLatest = index === history.length - 1

          return (
            <circle
              key={run.taken}
              cx={point.x}
              cy={point.y}
              r={isLatest ? 4.5 : 3}
              fill={color}
              /* Der jüngste Punkt bekommt einen Hof statt einer anderen Farbe:
                 So bleibt die Ebenenfarbe überall dieselbe Aussage. */
              stroke={isLatest ? color : 'none'}
              strokeOpacity={0.3}
              strokeWidth={isLatest ? 5 : 0}
            />
          )
        })}
      </svg>

      {/* Datum und Vorbehalt teilen sich eine Zeile mit dem Löschen. Vorher
          stand hier ein Absatz von zweieinhalb Zeilen; der Vorbehalt gehört
          weiterhin dazu — dass diese Linie keine Messreihe ist, muss dabeistehen
          —, aber er sagt es jetzt in einem halben Satz. */}
      <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[12px] leading-relaxed text-muted/70">
          <span className="tabular">{date}</span> · {t.historyLead(history.length)}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 cursor-pointer text-[12px] font-medium text-muted/70 underline decoration-line underline-offset-4 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.historyClear}
        </button>
      </div>
    </section>
  )
}
