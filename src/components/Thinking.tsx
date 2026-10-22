import type { Copy } from '../i18n/copy.ts'
import type { Station, ThinkingCopy } from '../i18n/thinking.ts'
import { itemAt } from '../lib/array.ts'
import { readableOnDark } from '../lib/oklch.ts'
import type { Level } from '../types.ts'
import { Button } from './Button.tsx'

type ThinkingProps = {
  /** All levels in the language read; their colors tint the stations. */
  levels: Level[]
  t: Copy
  th: ThinkingCopy
  onBack: () => void
}

/* Where each model takes its colors on the scale: the ordinary one from shame
   upwards, the Mind Hack Method from courage upwards. Station n takes the
   level n places up from there — fear lands on fear by itself. */
const ORDINARY_FROM = 0
const MIND_HACK_FROM = 8

/**
 * One model as a pyramid: six bands, labelled, numbered as the station list
 * below them. `inverted` stands the ordinary model on its point, as the book
 * draws it — everything rests on one sentence. The Mind Hack Method stands
 * on its broad side.
 *
 * Real text in a list and not a drawing: read out, it is the six stations
 * from the top down, which is how the shape is seen. Trapezoids by
 * `clip-path`, so a band is still a box the label can wrap in; the side
 * padding keeps the text off the slanted edges.
 */
function Pyramid({
  title,
  lead,
  stations,
  colors,
  inverted,
}: {
  title: string
  lead: string
  stations: Station[]
  colors: string[]
  inverted: boolean
}) {
  // Foundation first in the data, top first on screen.
  const shown = stations.map((station, index) => ({ station, index })).reverse()

  return (
    <section className="flex flex-col gap-3 rounded-3xl border border-line bg-card/60 p-5 backdrop-blur-sm">
      <h2 className="font-display text-[19px] leading-snug font-semibold">{title}</h2>
      <p className="text-[14px] leading-relaxed text-muted">{lead}</p>

      <ol className="mt-2 flex flex-col items-center gap-1">
        {shown.map(({ station, index }, row) => {
          // Row 0 is the top. Upright, it is the narrowest; inverted, the widest.
          const step = inverted ? row : stations.length - 1 - row
          const width = 100 - step * 10
          const color = itemAt(colors, index)
          // Each band slants by the width the next one loses, so the six
          // edges line up into one straight side.
          const slant = (5 / width) * 100

          return (
            <li
              key={station.name}
              className="flex min-h-12 items-center justify-center px-[9%] py-2 text-center"
              style={{
                width: `${width}%`,
                background: `color-mix(in oklab, ${color} 22%, transparent)`,
                clipPath: inverted
                  ? `polygon(0 0, 100% 0, ${100 - slant}% 100%, ${slant}% 100%)`
                  : `polygon(${slant}% 0, ${100 - slant}% 0, 100% 100%, 0 100%)`,
              }}
            >
              <span
                className="text-[11.5px] leading-tight font-semibold tracking-[0.08em] uppercase"
                style={{ color: readableOnDark(color) }}
              >
                <span className="tabular opacity-70">{index + 1}</span> {station.name}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/** One side of a pair: whose station it is, its name, what happens, where to practise it. */
function Side({ tag, station, color, inAppLabel }: { tag: string; station: Station; color: string; inAppLabel: string }) {
  return (
    <div className="flex flex-col gap-1.5 border-l-2 pl-4" style={{ borderColor: color }}>
      <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{tag}</p>
      <h3 className="font-display text-[17px] leading-snug font-semibold" style={{ color: readableOnDark(color) }}>
        {station.name}
      </h3>
      <p className="text-[14.5px] leading-relaxed text-text/85">{station.body}</p>
      {station.inApp !== undefined && (
        <p className="mt-1 text-[13px] leading-relaxed text-muted">
          <span className="font-semibold text-text/80">{inAppLabel}:</span> {station.inApp}
        </p>
      )}
    </div>
  )
}

/**
 * Two models of thinking, side by side: the pyramids, then the six stations
 * in pairs — each station of the ordinary model next to the one of the Mind
 * Hack Method that answers it.
 *
 * Pairs and not two lists: read one after the other, the second list would
 * have to be held against a first one already out of view. Side by side, the
 * contrast is the explanation.
 */
export function Thinking({ levels, t, th, onBack }: ThinkingProps) {
  const ordinaryColors = th.ordinary.map((_, index) => itemAt(levels, ORDINARY_FROM + index).color)
  const mindHackColors = th.mindHack.map((_, index) => itemAt(levels, MIND_HACK_FROM + index).color)

  return (
    <div className="animate-rise mx-auto flex w-full max-w-3xl flex-col px-5 py-8 sm:px-6">
      {/* The right padding keeps the corner free for the language switch. */}
      <header className="flex items-center justify-between pr-24">
        <Button variant="quiet" onClick={onBack} className="-ml-4">
          {t.backArrow}
        </Button>
      </header>

      <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.02em] text-balance">{th.title}</h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{th.lead}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Pyramid
          title={th.ordinaryTitle}
          lead={th.ordinaryLead}
          stations={th.ordinary}
          colors={ordinaryColors}
          inverted
        />
        <Pyramid
          title={th.mindHackTitle}
          lead={th.mindHackLead}
          stations={th.mindHack}
          colors={mindHackColors}
          inverted={false}
        />
      </div>

      <h2 className="mt-12 font-display text-[24px] font-bold tracking-[-0.01em]">{th.stationsTitle}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{th.stationsLead}</p>

      <ol className="mt-6 flex flex-col gap-4">
        {th.ordinary.map((ordinary, index) => (
          <li key={ordinary.name} className="rounded-2xl border border-line bg-card/50 p-5 backdrop-blur-sm">
            <p className="tabular text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              {th.stationLabel(index + 1)}
            </p>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <Side
                tag={th.ordinaryTag}
                station={ordinary}
                color={itemAt(ordinaryColors, index)}
                inAppLabel={th.inAppLabel}
              />
              <Side
                tag={th.mindHackTag}
                station={itemAt(th.mindHack, index)}
                color={itemAt(mindHackColors, index)}
                inAppLabel={th.inAppLabel}
              />
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-2 pb-10">
        <p className="text-[12.5px] leading-relaxed text-muted">{th.sourceNote}</p>
        <p className="text-[12.5px] leading-relaxed text-muted">{th.colorNote}</p>
      </div>
    </div>
  )
}
