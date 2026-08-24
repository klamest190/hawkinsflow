import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useCountdown } from '../hooks/useCountdown.ts'
import type { Copy } from '../i18n/copy.ts'
import { chime } from '../lib/chime.ts'
import { clockOf } from '../lib/clock.ts'
import type { Practice, Practices } from '../types.ts'

type PracticeDeckProps = {
  practices: Practices
  t: Copy
}

/* Ab dieser Strecke gilt ein Wischen als Blättern. Kürzer wäre jedes Scrollen
   mit leicht schräger Bewegung ein Seitenwechsel. */
const SWIPE = 48

/** Ein kleiner Knopf für die Uhr — die Knöpfe der App sind für den Kasten zu groß. */
function Chip({
  onClick,
  children,
  strong = false,
}: {
  onClick: () => void
  children: string
  strong?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold ' +
        'transition-[background-color,border-color,color] duration-200 ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
        (strong
          ? 'border-accent/60 bg-accent/20 text-text hover:bg-accent/30'
          : 'border-line bg-void/40 text-muted hover:border-accent/40 hover:text-text')
      }
    >
      {children}
    </button>
  )
}

/**
 * Die Uhr zu einer Übung.
 *
 * Steht nur bei den Übungen mit fester Länge — „bei jedem Impuls" lässt sich
 * nicht stellen. Sie zählt herunter statt hoch, weil die Anweisung eine Dauer
 * nennt und keine Bestzeit: Wer hochzählt, hört auf, wenn es reicht, und das ist
 * bei genau diesen Übungen der Punkt, an dem sie nichts mehr taugen.
 */
function PracticeTimer({ minutes, t }: { minutes: number; t: Copy }) {
  const { remaining, running, done, start, pause, stop } = useCountdown(minutes * 60)
  /* Der Ton gehört zum Übergang auf „abgelaufen" und nicht zum Zustand: ohne
     die Erinnerung würde er bei jedem weiteren Rendern erneut anschlagen. */
  const rang = useRef(false)

  useEffect(() => {
    if (done && !rang.current) {
      rang.current = true
      chime()
    }
    if (!done) rang.current = false
  }, [done])

  // Unberührt heißt: noch nie gelaufen. Dann steht dort nur der eine Knopf.
  const untouched = !running && remaining === minutes * 60

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-accent/20 pt-4">
      {untouched ? (
        <Chip onClick={start} strong>
          {t.timerStart(minutes)}
        </Chip>
      ) : (
        <>
          {/* Die laufenden Sekunden bleiben vor Screenreadern verborgen: Eine
              Anzeige, die sich viermal je Sekunde ändert, würde vorgelesen und
              wäre für eine stille Übung genau das Gegenteil. Angesagt wird
              weiter unten nur, dass die Zeit um ist. */}
          <p
            aria-hidden
            className="tabular font-display text-[26px] leading-none font-semibold text-accent"
          >
            {clockOf(remaining)}
          </p>
          {done ? (
            <Chip onClick={start} strong>
              {t.timerStart(minutes)}
            </Chip>
          ) : (
            <>
              <Chip onClick={running ? pause : start} strong>
                {running ? t.timerPause : t.timerResume}
              </Chip>
              <Chip onClick={stop}>{t.timerStop}</Chip>
            </>
          )}
        </>
      )}

      <p role="status" className="text-[13px] text-muted">
        {done ? t.timerDone : ''}
      </p>
    </div>
  )
}

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
            <PracticeTimer key={practice.name} minutes={practice.minutes} t={t} />
          )}
        </div>
      </div>
    </div>
  )
}
