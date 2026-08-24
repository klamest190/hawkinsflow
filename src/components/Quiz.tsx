import { useEffect, useRef, useState } from 'react'
import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import { questionText } from '../i18n/questions.ts'
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

  // Ein hängengebliebener Timer würde nach dem Verlassen der Ansicht auf einem
  // nicht mehr vorhandenen Zustand landen — deshalb beim Aufräumen abbrechen.
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const question = QUESTIONS[index]
  const current = answers[question.id]
  const isLast = index === QUESTIONS.length - 1
  const progress = (index + (current === undefined ? 0 : 1)) / QUESTIONS.length

  function choose(value: AnswerValue) {
    onAnswer(question.id, value)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      if (isLast) onDone()
      else setIndex((previous) => Math.min(previous + 1, QUESTIONS.length - 1))
    }, ADVANCE_DELAY)
  }

  /* Der Bogen am Rechner: 1 bis 5 antwortet, die Pfeile blättern. Vierunddreißig
     Fragen mit der Maus sind vierunddreißig Zielbewegungen — mit der Zifferreihe
     bleibt die Hand liegen, und der Blick auch.

     Der Lauscher hängt am Fenster und nicht an einem Element, weil der Fokus
     nach dem Antworten nirgends besonders steht. Tastenkürzel mit Strg, Alt oder
     Cmd bleiben unangetastet — das sind die des Browsers. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const value = t.answers.findIndex((_, position) => event.key === String(position + 1))
      if (value !== -1) {
        event.preventDefault()
        choose(value as AnswerValue)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        if (isLast) onDone()
        else setIndex((previous) => Math.min(previous + 1, QUESTIONS.length - 1))
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
       erste fest. Ein Lauscher ab- und wieder anzumelden kostet nichts. */
  })

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 py-8">
      {/* Rechts bleibt Platz für die Sprachwahl, die fest in dieser Ecke
          steht (siehe App.tsx) — sonst läge der Zähler darunter. */}
      <header className="flex items-center justify-between gap-4 pr-24">
        <Button variant="quiet" onClick={onLeave} className="-ml-4">
          {t.quizAbort}
        </Button>
        <span className="tabular text-[13px] font-medium text-muted">
          {t.quizProgress(index + 1, QUESTIONS.length)}
        </span>
      </header>

      {/* Der Balken füllt sich im Regenbogen der Skala — der Fortschritt selbst
          ist schon ein Aufstieg von unten nach oben. */}
      <div
        className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t.progressLabel}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${Math.max(progress * 100, 2)}%`,
            background:
              'linear-gradient(90deg, oklch(0.55 0.17 20), oklch(0.72 0.17 70), oklch(0.85 0.17 102), oklch(0.78 0.15 175), oklch(0.74 0.16 300))',
          }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        {/* `key` erzwingt bei jeder Frage einen neuen Knoten — nur so läuft die
            Einblend-Animation erneut statt nur beim ersten Mal. */}
        <div key={question.id} className="animate-rise">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
            {t.quizPrompt}
          </p>
          <h2 className="mt-4 text-balance font-display text-[26px] leading-[1.25] font-semibold sm:text-[30px]">
            {questionText(language, question.id)}
          </h2>

          <div className="mt-9 flex flex-col gap-2.5">
            {t.answers.map((label, value) => {
              const selected = current === value
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => choose(value as AnswerValue)}
                  aria-pressed={selected}
                  className={
                    'group flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 text-left ' +
                    'transition-[transform,border-color,background-color,color] duration-200 ' +
                    'hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
                    (selected
                      ? 'border-accent bg-accent/15 text-text'
                      : 'border-line bg-card/50 text-muted hover:border-accent/40 hover:text-text')
                  }
                >
                  {/* Fünf Punkte, die mit der Zustimmung wachsen: die Skala ist
                      auch ohne Lesen erfassbar. */}
                  <span
                    className={
                      'shrink-0 rounded-full transition-all duration-200 ' +
                      (selected ? 'bg-accent' : 'bg-muted/40 group-hover:bg-accent/60')
                    }
                    style={{ width: 8 + value * 3, height: 8 + value * 3 }}
                  />
                  <span className="text-[16px] font-medium">{label}</span>
                </button>
              )
            })}
          </div>

          {/* Nur dort, wo es eine Tastatur gibt. Auf dem Handy wäre der Satz
              ein Rätsel. */}
          <p aria-hidden className="mt-5 hidden text-[12px] text-muted/70 sm:block">
            {t.quizKeyHint}
          </p>
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
        {/* Überspringen bleibt möglich: eine erzwungene Antwort ist keine. */}
        <Button
          variant="quiet"
          onClick={() => (isLast ? onDone() : setIndex((previous) => previous + 1))}
          className="-mr-4"
        >
          {isLast ? t.evaluate : t.skip}
        </Button>
      </footer>
    </div>
  )
}
