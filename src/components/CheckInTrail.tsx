import { THRESHOLD, rankOf } from '../data/levels.ts'
import type { Copy } from '../i18n/copy.ts'
import { WINDOW, daysBetween } from '../lib/checkins.ts'
import { readableOnDark } from '../lib/oklch.ts'
import type { CheckIn, CheckIns, Language, Level } from '../types.ts'

type CheckInTrailProps = {
  checkIns: CheckIns
  levels: Level[]
  language: Language
  t: Copy
  onClear: () => void
}

/* The same drawing space as the history's line, so the two rows in the card
   read as one family. */
const BOX = { width: 320, height: 54, padX: 12, padY: 9 }

/**
 * The check-ins of the last thirty days, as dots at the height of their level.
 *
 * Placed by calendar day and not by entry: a week without a tap is a gap,
 * and closing it would draw a line across days nobody said anything about.
 * The line only joins days that follow each other.
 *
 * Height by rank, as in the history, and like it without axes or numbers:
 * these are single days, not a series of measurements.
 *
 * The window ends at the latest check-in, not at today, so the row always has
 * something to show; its date stands underneath.
 */
export function CheckInTrail({ checkIns, levels, language, t, onClear }: CheckInTrailProps) {
  const latest = checkIns.at(-1)
  if (latest === undefined) return null

  const end = new Date(latest.at)
  const levelOf = (entry: CheckIn): Level | null => levels.find((level) => level.id === entry.level) ?? null

  const x = (day: number) => BOX.padX + ((BOX.width - 2 * BOX.padX) * day) / (WINDOW - 1)
  const y = (rank: number) =>
    BOX.height - BOX.padY - (rank / (levels.length - 1)) * (BOX.height - 2 * BOX.padY)

  // Day 0 is the oldest day in the window, `WINDOW - 1` the latest check-in.
  const points = checkIns
    .map((entry) => ({ entry, day: WINDOW - 1 - daysBetween(new Date(entry.at), end) }))
    .filter((point) => point.day >= 0)
    .map((point) => ({ ...point, x: x(point.day), y: y(rankOf(point.entry.level)) }))

  // Runs of days in a row; each one gets its own line.
  const runs: (typeof points)[] = []
  for (const point of points) {
    const run = runs.at(-1)
    const previous = run?.at(-1)
    if (run !== undefined && previous !== undefined && point.day === previous.day + 1) run.push(point)
    else runs.push([point])
  }

  const thresholdY = y(levels.findIndex((level) => level.value === THRESHOLD))
  const latestLevel = levelOf(latest)
  const day = new Intl.DateTimeFormat(language, { day: 'numeric', month: 'short' })

  return (
    <section className="p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {t.checkInTrailTitle}
        </h2>
        {latestLevel !== null && (
          <p className="text-[12px] font-semibold" style={{ color: readableOnDark(latestLevel.color) }}>
            {t.checkInTrailLatest}: {latestLevel.name}
          </p>
        )}
      </div>

      <svg
        viewBox={`0 0 ${BOX.width} ${BOX.height}`}
        className="mt-3 h-auto w-full overflow-visible"
        role="img"
        aria-label={points
          .map(({ entry }) =>
            t.checkInEntryLabel(day.format(new Date(entry.at)), levelOf(entry)?.name ?? entry.level),
          )
          .join(' · ')}
      >
        <line
          x1={0}
          x2={BOX.width}
          y1={thresholdY}
          y2={thresholdY}
          stroke="var(--hf-line)"
          strokeWidth={1}
          strokeDasharray="3 4"
        />

        {runs.map(
          (run) =>
            run.length > 1 && (
              <polyline
                key={run[0]?.entry.at}
                points={run.map((point) => `${point.x},${point.y}`).join(' ')}
                fill="none"
                stroke="var(--hf-muted)"
                strokeOpacity={0.4}
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ),
        )}

        {points.map(({ entry, ...point }) => {
          const color = levelOf(entry)?.color ?? 'var(--hf-muted)'
          const isLatest = entry === latest
          return (
            <circle
              key={entry.at}
              cx={point.x}
              cy={point.y}
              r={isLatest ? 4 : 2.75}
              fill={color}
              // The latest gets a halo instead of another color, as in the other rows.
              stroke={isLatest ? color : 'none'}
              strokeOpacity={0.3}
              strokeWidth={isLatest ? 5 : 0}
            />
          )
        })}
      </svg>

      <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[12px] leading-relaxed text-muted">
          <span className="tabular">{day.format(end)}</span> · {t.checkInTrailLead(checkIns.length)}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 cursor-pointer text-[12px] font-medium text-muted underline decoration-line underline-offset-4 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          {t.checkInClear}
        </button>
      </div>
    </section>
  )
}
