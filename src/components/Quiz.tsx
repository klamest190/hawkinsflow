import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { LEVELS } from '../data/levels.ts'
import { ANSWER_VALUES, QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import { questionText } from '../i18n/questions.ts'
import { itemAt } from '../lib/array.ts'
import type { Answers, AnswerValue, Language } from '../types.ts'
import { Button } from './Button.tsx'

type QuizProps = {
  answers: Answers
  language: Language
  t: Copy
  startIndex: number
  onAnswer: (questionId: string, value: AnswerValue) => void
  onDone: () => void
  onLeave: () => void
}

/* Kurze Pause zwischen Antippen und Weiterblättern: lang genug, dass man die
   eigene Wahl noch aufleuchten sieht, kurz genug, dass 34 Fragen nicht zäh
   werden. */
const ADVANCE_DELAY = 260

export function Quiz({ answers, language, t, startIndex, onAnswer, onDone, onLeave }: QuizProps) {
  const [index, setIndex] = useState(startIndex)
  const timer = useRef<number | undefined>(undefined)
  const heading = useRef<HTMLHeadingElement>(null)
  const options = useRef<(HTMLButtonElement | null)[]>([])
  const headingId = useId()
  const firstQuestion = useRef(true)

  // Ein hängengebliebener Timer würde nach dem Verlassen der Ansicht auf einem
  // nicht mehr vorhandenen Zustand landen — deshalb beim Aufräumen abbrechen.
  // Also whenever the question changes some other way: "next" or → within
  // the advance delay moved on once, and the timer then moved on again, past
  // a question nobody had answered. In a layout effect, so the timer is gone
  // in the same commit as the change and can't fire in between.
  useLayoutEffect(() => () => window.clearTimeout(timer.current), [index])

  /* Each question is a new node (see `key` below), so the answer that had
     focus is gone after the advance and focus falls to <body>: the next Tab
     would start at the top of the page again, 34 times in a row, and a screen
     reader would not hear the new question at all.

     Focus goes to the new question — but only when it was lost. Someone
     paging with the footer's back button keeps focus on that button, unless
     the button has just been disabled on the first question: the browser drops
     focus from it a moment after this effect, so it counts as lost already.

     Not on the first render either: App.tsx has just put the reading point on
     the view, and a child effect runs before the parent's. */
  useEffect(() => {
    if (firstQuestion.current) {
      firstQuestion.current = false
      return
    }
    const active = document.activeElement
    const lost =
      active === null ||
      active === document.body ||
      !active.isConnected ||
      (active instanceof HTMLButtonElement && active.disabled)
    if (lost) heading.current?.focus()
  }, [index])

  const question = itemAt(QUESTIONS, index)
  const current = answers[question.id]
  const isLast = index === QUESTIONS.length - 1
  const progress = (index + (current === undefined ? 0 : 1)) / QUESTIONS.length

  /* Vorwärts geht es nur mit einer Antwort. Eine ausgelassene Frage fehlt der
     Ebene, zu der sie gehört, und die Auswertung mittelt dann über zwei
     Aussagen, von denen nur eine da ist — das verschiebt den Schwerpunkt, ohne
     dass man es dem Ergebnis ansieht. */
  const canAdvance = current !== undefined

  function advance() {
    if (!canAdvance) return
    if (isLast) onDone()
    else setIndex((previous) => Math.min(previous + 1, QUESTIONS.length - 1))
  }

  function choose(value: AnswerValue) {
    onAnswer(question.id, value)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      if (isLast) onDone()
      else setIndex((previous) => Math.min(previous + 1, QUESTIONS.length - 1))
    }, ADVANCE_DELAY)
  }

  function moveBetweenOptions(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    const focused = options.current.findIndex((node) => node === document.activeElement)
    if (focused === -1) return
    event.preventDefault()
    const step = event.key === 'ArrowDown' ? 1 : -1
    const next = (focused + step + ANSWER_VALUES.length) % ANSWER_VALUES.length
    options.current[next]?.focus()
  }

  /* Der Bogen am Rechner: 1 bis 5 antwortet, die Pfeile blättern. Vierunddreißig
     Fragen mit der Maus sind vierunddreißig Zielbewegungen — mit der Zifferreihe
     bleibt die Hand liegen, und der Blick auch.

     Der Lauscher hängt am Fenster und nicht an einem Element, weil der Fokus
     nach dem Antworten nirgends besonders steht. Tastenkürzel mit Strg, Alt oder
     Cmd bleiben unangetastet — das sind die des Browsers. */
  useLayoutEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const value = ANSWER_VALUES.find((candidate) => event.key === String(candidate + 1))
      if (value !== undefined) {
        event.preventDefault()
        choose(value)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        advance()
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setIndex((previous) => Math.max(previous - 1, 0))
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    /* Ohne Abhängigkeitsliste, also nach jedem Rendern neu: Der Lauscher greift
       auf die aktuelle Frage zu, und ein einmal gesetzter hielte für immer die
       erste fest. Ein Lauscher ab- und wieder anzumelden kostet nichts.

       A layout effect and not a passive one: a passive effect runs after
       paint, so for a frame the new question was on screen while the old
       listener still held the previous one. A key pressed then answered the
       previous question again, the advance skipped the new one, and the run
       finished with 33 answers. A layout effect swaps the listener before
       the question is painted. */
  })

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 py-8">
      {/* Rechts bleibt Platz für die Sprachwahl, die fest in dieser Ecke
          steht (siehe App.tsx) — sonst läge der Zähler darunter. */}
      <header className="flex h-10 items-center justify-between gap-4 pr-24">
        <Button variant="quiet" onClick={onLeave} className="-ml-4">
          {t.quizAbort}
        </Button>
        <span className="tabular text-small font-medium text-muted">
          {t.quizProgress(index + 1, QUESTIONS.length)}
        </span>
      </header>

      {/* Der Balken füllt sich im Regenbogen der Skala — der Fortschritt selbst
          ist schon ein Aufstieg von unten nach oben. Drawn as the ladder on
          its side: seventeen segments in the levels' own colors, the lowest
          on the left, so the bar is the same picture as the start page's. */}
      <div
        className="mt-4 flex w-full gap-[3px]"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t.progressLabel}
      >
        {LEVELS.map((level, rank) => {
          const fill = Math.min(Math.max(progress * LEVELS.length - rank, 0), 1)
          return (
            <div key={level.id} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${fill * 100}%`, background: level.color }}
              />
            </div>
          )
        })}
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        {/* `key` erzwingt bei jeder Frage einen neuen Knoten — nur so läuft die
            Einblend-Animation erneut statt nur beim ersten Mal. */}
        <div key={question.id} className="animate-rise">
          <p className="text-small font-semibold text-muted">
            {t.quizPrompt}
          </p>
          {/* The question is the page heading of this view: without it, the
              questionnaire was the one screen with no <h1>. */}
          <h1
            ref={heading}
            id={headingId}
            tabIndex={-1}
            className="mt-4 text-balance font-display text-heading leading-[1.25] font-semibold focus:outline-none sm:text-display-s"
          >
            {questionText(language, question.id)}
          </h1>

          {/* A radio group: one choice out of five, announced as "Rarely, 2 of
              5" instead of five unrelated toggles. One tab stop for the group,
              the chosen answer or else the first.

              Up and down move focus only, they do not choose. In the standard
              pattern selection follows focus — here choosing moves on to the
              next question, so arrowing through the options would answer and
              leave. Space or Enter chooses, as on any button. */}
          {/* The group itself takes no focus: its options carry the roving tab
              stop. A tabIndex here would let a click between two answers
              focus the group, where the arrow keys have nothing to move. */}
          {/* oxlint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div
            role="radiogroup"
            aria-labelledby={headingId}
            onKeyDown={moveBetweenOptions}
            className="mt-9 flex flex-col gap-2.5"
          >
            {ANSWER_VALUES.map((value) => {
              const label = itemAt(t.answers, value)
              const selected = current === value
              const tabStop = current === undefined ? value === 0 : selected
              return (
                <button
                  key={label}
                  ref={(node) => {
                    options.current[value] = node
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={tabStop ? 0 : -1}
                  onClick={() => choose(value)}
                  className={
                    'group flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 text-left ' +
                    'transition-[transform,border-color,background-color,color] duration-200 ' +
                    'hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ' +
                    (selected
                      ? 'border-accent-ink bg-accent/15 text-text'
                      : 'border-line bg-card/50 text-muted hover:border-accent/40 hover:text-text')
                  }
                >
                  {/* Fünf Punkte, die mit der Zustimmung wachsen: die Skala ist
                      auch ohne Lesen erfassbar. They grow inside a column as
                      wide as the largest (8 + 4 × 3 = 20px), so the labels
                      start on one line instead of stepping right. */}
                  <span aria-hidden className="flex w-5 shrink-0 justify-center">
                    <span
                      className={
                        'rounded-full transition-all duration-200 ' +
                        (selected ? 'bg-accent-ink' : 'bg-muted/40 group-hover:bg-accent/60')
                      }
                      style={{ width: 8 + value * 3, height: 8 + value * 3 }}
                    />
                  </span>
                  <span className="text-lead font-medium">{label}</span>
                </button>
              )
            })}
          </div>

          {/* Solange nichts gewählt ist, steht hier der Grund für den stumpfen
              Knopf — der ist auf jedem Gerät nützlich. Danach der
              Tastaturhinweis, und nur dort, wo es eine Tastatur gibt: auf dem
              Handy wäre der Satz ein Rätsel. */}
          {canAdvance ? (
            <p className="mt-5 hidden text-small text-muted sm:block">
              {t.quizKeyHint}
            </p>
          ) : (
            <p className="mt-5 text-small text-muted">{t.quizNeedsAnswer}</p>
          )}
        </div>
      </div>

      <footer className="flex items-center justify-between gap-3">
        <Button
          variant="quiet"
          onClick={() => setIndex((previous) => Math.max(previous - 1, 0))}
          disabled={index === 0}
          className="-ml-4"
        >
          {t.back}
        </Button>
        {/* Der Knopf bleibt stehen und wird stumpf, statt zu verschwinden:
            So ist zu sehen, dass es weitergeht — und woran es gerade hängt. */}
        <Button variant="quiet" onClick={advance} disabled={!canAdvance} className="-mr-4">
          {isLast ? t.evaluate : t.next}
        </Button>
      </footer>
    </div>
  )
}
