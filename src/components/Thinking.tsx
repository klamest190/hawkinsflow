import { useRef, useState, type KeyboardEvent } from 'react'
import type { Example, Station, ThinkingCopy } from '../i18n/thinking.ts'
import { itemAt } from '../lib/array.ts'
import { readableOnDark } from '../lib/oklch.ts'
import type { Level } from '../types.ts'
import { PAGE_WIDTH } from './page.ts'

type ThinkingProps = {
  /** All levels in the language read; their colors tint the stations. */
  levels: Level[]
  th: ThinkingCopy
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
      <h2 className="font-display text-title leading-snug font-semibold">{title}</h2>
      <p className="text-body leading-relaxed text-muted">{lead}</p>

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
                className="text-caption leading-tight font-semibold"
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
      <p className="text-small font-semibold text-muted">{tag}</p>
      <h3 className="font-display text-lead leading-snug font-semibold" style={{ color: readableOnDark(color) }}>
        {station.name}
      </h3>
      <p className="text-body leading-relaxed text-text/85">{station.body}</p>
      {station.inApp !== undefined && (
        <p className="mt-1 text-small leading-relaxed text-muted">
          <span className="font-semibold text-text/80">{inAppLabel}:</span> {station.inApp}
        </p>
      )}
    </div>
  )
}

/**
 * The examples, one at a time: a row of tabs for the area, and under
 * it the situation and the six stations, each with what the inner voice
 * says in the ordinary model and in the Mind Hack Method.
 *
 * Tabs as in `PracticeDeck`: the arrow keys move between them, the
 * selection follows the focus, and screen readers announce how many there
 * are and which one is open. One at a time and not all below each other:
 * seventy-two sentences in a row read as a list to skim, six pairs as one
 * situation to think through.
 */
function Examples({
  th,
  ordinaryColors,
  mindHackColors,
}: {
  th: ThinkingCopy
  ordinaryColors: string[]
  mindHackColors: string[]
}) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const example: Example = itemAt(th.examples, active)

  function show(index: number) {
    const target = (index + th.examples.length) % th.examples.length
    setActive(target)
    tabs.current[target]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const jump: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: th.examples.length - 1,
    }
    const target = jump[event.key]
    if (target === undefined) return
    event.preventDefault()
    show(target)
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      {/* As in the tabs pattern, the tabs carry the roving tab stop and the
          list takes no focus of its own. */}
      {/* oxlint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div role="tablist" aria-label={th.examplesLabel} onKeyDown={onKeyDown} className="flex flex-wrap gap-2">
        {th.examples.map((entry, index) => {
          const selected = index === active
          return (
            <button
              key={entry.title}
              ref={(node) => {
                tabs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`example-tab-${index}`}
              aria-selected={selected}
              aria-controls={`example-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={
                'cursor-pointer rounded-full border px-4 py-2 text-small font-semibold ' +
                'transition-[background-color,border-color,color] duration-200 ' +
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ' +
                (selected
                  ? 'border-accent-ink/60 bg-accent/20 text-text'
                  : 'border-line bg-void/30 text-muted hover:border-accent/40 hover:text-text')
              }
            >
              {entry.title}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`example-panel-${active}`}
        aria-labelledby={`example-tab-${active}`}
        tabIndex={-1}
        className="rounded-2xl border border-line bg-card/50 p-5 backdrop-blur-sm"
      >
        {/* The key starts the fade-in afresh on every change of tab. */}
        <div key={example.title} className="animate-rise flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-small font-semibold text-accent-ink">{th.situationLabel}</p>
            <p className="text-body leading-relaxed text-text/90">{example.situation}</p>
          </div>

          <ol className="flex flex-col gap-4">
            {example.ordinary.map((ordinary, index) => (
              <li key={ordinary} className="flex flex-col gap-2 border-t border-line/60 pt-4">
                <p className="tabular text-small font-semibold text-muted">
                  {th.stationLabel(index + 1)}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Voice
                    station={itemAt(th.ordinary, index).name}
                    color={itemAt(ordinaryColors, index)}
                    text={ordinary}
                  />
                  <Voice
                    station={itemAt(th.mindHack, index).name}
                    color={itemAt(mindHackColors, index)}
                    text={itemAt(example.mindHack, index)}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

/** One sentence of the inner voice, under the name of its station. */
function Voice({ station, color, text }: { station: string; color: string; text: string }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 pl-3.5" style={{ borderColor: color }}>
      <p className="text-small font-semibold" style={{ color: readableOnDark(color) }}>
        {station}
      </p>
      <p className="text-body leading-relaxed text-text/85">
        <q>{text}</q>
      </p>
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
export function Thinking({ levels, th }: ThinkingProps) {
  const ordinaryColors = th.ordinary.map((_, index) => itemAt(levels, ORDINARY_FROM + index).color)
  const mindHackColors = th.mindHack.map((_, index) => itemAt(levels, MIND_HACK_FROM + index).color)

  return (
    <div className={`animate-rise mx-auto flex w-full max-w-3xl flex-col px-5 py-8 sm:px-6 ${PAGE_WIDTH}`}>
      <h1 className="font-display text-display font-bold tracking-[-0.02em] text-balance">{th.title}</h1>
      <p className="mt-2.5 text-body leading-relaxed text-muted">{th.lead}</p>

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

      <h2 className="mt-12 font-display text-heading font-bold tracking-[-0.01em]">{th.stationsTitle}</h2>
      <p className="mt-2 text-body leading-relaxed text-muted">{th.stationsLead}</p>

      <ol className="mt-6 flex flex-col gap-4">
        {th.ordinary.map((ordinary, index) => (
          <li key={ordinary.name} className="rounded-2xl border border-line bg-card/50 p-5 backdrop-blur-sm">
            <p className="tabular text-small font-semibold text-muted">
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

      <h2 className="mt-12 font-display text-heading font-bold tracking-[-0.01em]">{th.examplesTitle}</h2>
      <p className="mt-2 text-body leading-relaxed text-muted">{th.examplesLead}</p>
      <Examples th={th} ordinaryColors={ordinaryColors} mindHackColors={mindHackColors} />

      <div className="mt-8 flex flex-col gap-2 pb-10">
        <p className="text-small leading-relaxed text-muted">{th.sourceNote}</p>
        <p className="text-small leading-relaxed text-muted">{th.colorNote}</p>
      </div>
    </div>
  )
}
