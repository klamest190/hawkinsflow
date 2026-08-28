import { useRef, useState, type KeyboardEvent } from 'react'
import type { Copy } from '../i18n/copy.ts'
import type { Practice, Practices } from '../types.ts'
import { Timer } from './Timer.tsx'

type PracticeDeckProps = {
  practices: Practices
  t: Copy
}

/* Ab dieser Strecke gilt ein Wischen als Blättern. Kürzer wäre jedes Scrollen
   mit leicht schräger Bewegung ein Seitenwechsel. */
const SWIPE = 48

/**
 * Die drei Übungen einer Ebene, eine nach der anderen.
 *
 * Als Reiter-Muster gebaut (`tablist` / `tab` / `tabpanel`) und nicht als
 * Karussell mit Pfeilknöpfen: Dieses Muster ist genau das, für das die
 * Pfeiltasten vorgesehen sind, und Screenreader kündigen damit von sich aus an,
 * dass es drei sind und welche gerade offen ist.
 *
 * Die Auswahl folgt dem Fokus — bei drei kurzen Karten ist das richtige
 * Verhalten: erst wählen und dann bestätigen müssen wäre ein Klick zu viel für
 * etwas, das nichts kostet.
 */
export function PracticeDeck({ practices, t }: PracticeDeckProps) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const touchStart = useRef<number | null>(null)

  function show(index: number, moveFocus: boolean) {
    // Modulo mit Korrektur: vom ersten nach links landet man am letzten.
    const target = (index + practices.length) % practices.length
    setActive(target)
    if (moveFocus) tabs.current[target]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const jump: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: practices.length - 1,
    }
    const target = jump[event.key]
    if (target === undefined) return

    event.preventDefault()
    show(target, true)
  }

  const practice: Practice = practices[active]

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div
          role="tablist"
          aria-label={t.practiceDeckLabel}
          onKeyDown={onKeyDown}
          className="flex gap-2"
        >
          {practices.map((entry, index) => {
            const selected = index === active
            return (
              <button
                key={entry.name}
                ref={(node) => {
                  tabs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`practice-tab-${index}`}
                aria-selected={selected}
                aria-controls={`practice-panel-${index}`}
                aria-label={t.practiceTabLabel(t.practiceKinds[entry.kind], entry.name)}
                /* Nur der offene Reiter ist mit Tab erreichbar; zwischen den
                   dreien wird mit den Pfeiltasten gewechselt. */
                tabIndex={selected ? 0 : -1}
                onClick={() => show(index, false)}
                className={
                  'cursor-pointer rounded-full border px-3.5 py-1.5 text-[12px] font-semibold ' +
                  'transition-[background-color,border-color,color] duration-200 ' +
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
                  (selected
                    ? 'border-accent/60 bg-accent/20 text-text'
                    : 'border-line bg-void/30 text-muted hover:border-accent/40 hover:text-text')
                }
              >
                {t.practiceKinds[entry.kind]}
              </button>
            )
          })}
        </div>

        {/* Der Hinweis steht klein daneben und verschwindet auf schmalen
            Geräten — dort gibt es keine Pfeiltasten, dafür das Wischen. */}
        <p aria-hidden className="hidden text-[12px] text-muted/70 sm:block">
          {t.practiceHint}
        </p>
      </div>

      <div
        role="tabpanel"
        id={`practice-panel-${active}`}
        aria-labelledby={`practice-tab-${active}`}
        tabIndex={-1}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX
        }}
        onTouchEnd={(event) => {
          const from = touchStart.current
          touchStart.current = null
          if (from === null) return

          const moved = event.changedTouches[0].clientX - from
          if (Math.abs(moved) >= SWIPE) show(moved < 0 ? active + 1 : active - 1, false)
        }}
        className="rounded-2xl border border-accent/30 bg-accent/8 p-5"
      >
        {/* Das `key` erzwingt einen neuen Knoten je Übung — sonst liefe die
            Einblendung nur beim ersten Mal, und das Blättern sähe aus wie ein
            Textwechsel im selben Kasten. */}
        <div key={practice.name} className="animate-rise">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-display text-[17px] font-semibold">{practice.name}</p>
            <p className="text-[12px] font-semibold tracking-[0.08em] text-accent uppercase">
              {practice.duration}
            </p>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{practice.body}</p>

          {/* Das `key` bindet die Uhr an ihre Übung: Beim Blättern beginnt sie
              als neue, statt mit der Restzeit der vorigen weiterzulaufen. */}
          {practice.minutes !== undefined && (
            <Timer key={practice.name} minutes={practice.minutes} t={t} />
          )}
        </div>
      </div>
    </div>
  )
}
