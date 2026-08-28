import { useEffect, useMemo, useRef, useState } from 'react'
import { Aurora } from './components/Aurora.tsx'
import { Intro } from './components/Intro.tsx'
import { LanguageToggle } from './components/LanguageToggle.tsx'
import { Moment } from './components/Moment.tsx'
import { Quiz } from './components/Quiz.tsx'
import { Result } from './components/Result.tsx'
import { ScaleBrowser } from './components/ScaleBrowser.tsx'
import { QUESTIONS } from './data/questions.ts'
import { copy } from './i18n/copy.ts'
import { momentCopy } from './i18n/moment.ts'
import { levelIn, levelsIn } from './i18n/levels.ts'
import { useAnswers } from './hooks/useAnswers.ts'
import { useHistory } from './hooks/useHistory.ts'
import { useMoments } from './hooks/useMoments.ts'
import { usePlans } from './hooks/usePlans.ts'
import { useLanguage } from './hooks/useLanguage.ts'
import { sortedPlans } from './lib/plans.ts'
import { answeredCount, evaluate } from './lib/scoring.ts'
import type { BelowLevelId, LevelId } from './types.ts'

type Phase = 'intro' | 'quiz' | 'result' | 'scale' | 'moment'

export default function App() {
  const { language, setLanguage } = useLanguage()
  const { answers, answer, reset } = useAnswers()
  /* Die Pläne liegen neben den Antworten und nicht in ihnen: Sie sind das
     Einzige, was der Mensch hier selbst geschrieben hat, und überleben deshalb
     jedes Neustarten des Bogens. */
  const { plans, savePlan, removePlan } = usePlans()
  /* Und daneben der Verlauf, aus demselben Grund: Er entsteht überhaupt erst
     dadurch, dass jemand den Bogen ein zweites Mal ausfüllt. */
  const { history, record, clearHistory } = useHistory()
  /* Und die Momente daneben, aus demselben Grund und noch einem: Der Fragebogen
     misst Wochen, ein Moment misst einen Nachmittag. In einer Reihe wären das
     zwei Größen in einer Spalte. */
  const { moments, recordMoment, clearMoments } = useMoments()
  const [phase, setPhase] = useState<Phase>('intro')
  /* Die im Moment-Bogen gewählte Ebene. Sie liegt hier und nicht dort, weil die
     Farbe der ganzen Oberfläche an ihr hängt — siehe den Effekt weiter unten. */
  const [momentLevel, setMomentLevel] = useState<BelowLevelId | null>(null)
  const [openLevel, setOpenLevel] = useState<LevelId | null>(null)
  /* Wohin „Zurück" aus der Skalenansicht führt — sie ist von zwei Seiten aus
     erreichbar, und es wäre unangenehm, aus dem Ergebnis auf der Startseite zu
     landen. */
  const [returnTo, setReturnTo] = useState<Phase>('intro')

  /* Die Fläche, in der die Ansichten liegen — sie fängt beim Wechsel den Fokus.
     Siehe den Effekt weiter unten. */
  const view = useRef<HTMLElement>(null)
  const firstView = useRef(true)

  const t = copy[language]
  const m = momentCopy[language]
  const levels = levelsIn(language)
  const answered = answeredCount(answers)
  const result = useMemo(() => evaluate(levels, answers), [levels, answers])

  /* Ob aus diesem Bogen überhaupt etwas abzulesen ist. Zwei Fälle sagen nein:
     kein einziges Kreuz, oder überall dasselbe (siehe `Reservation` in
     `scoring.ts`). Beide rechnen sich zu einem vollständigen Befund aus, und in
     beiden steckt in den Antworten nichts davon. */
  const readable = answered > 0 && result.reservation !== 'uniform'


  /* Die Farbe, solange keine Ebene im Spiel ist: das Gold von Mut — die
     Schwelle, um die sich die ganze Skala dreht. */
  const defaultAccent = levelIn(language, 'courage').color

  // Die erste noch offene Frage — dort geht es nach einer Unterbrechung weiter.
  const firstOpen = QUESTIONS.findIndex((question) => answers[question.id] === undefined)
  const resumeAt = answered > 0 && answered < QUESTIONS.length ? Math.max(firstOpen, 0) : null

  useEffect(() => {
    document.title = t.documentTitle
  }, [t])

  /* Eine einzige Zuweisung färbt die ganze App: Hintergrundwolken, Knöpfe,
     Überschriften und Balken lesen alle --hf-accent. Während des Fragebogens
     wandert die Farbe mit dem Fortschritt durch den Regenbogen — der Bogen
     selbst fühlt sich dadurch wie ein Aufstieg an. */
  useEffect(() => {
    const accent =
      /* Ist nichts abzulesen, steht dort kein Ergebnis, sondern der Hinweis
         darauf (siehe `Result`) — und die Ebenenfarbe um ihn herum wäre genau
         die Aussage, die dieser Schirm nicht machen will. */
      phase === 'result' && readable
        ? result.dominant.color
        : phase === 'scale' && openLevel !== null
          ? levelIn(language, openLevel).color
          : // Im Moment-Bogen färbt die gewählte Ebene alles — vom Antippen der
            // Kachel an bis zum letzten Schritt.
            phase === 'moment' && momentLevel !== null
            ? levelIn(language, momentLevel).color
            : phase === 'quiz'
              ? levels[Math.min(Math.floor((answered / QUESTIONS.length) * levels.length), levels.length - 1)].color
              : defaultAccent

    document.body.style.setProperty('--hf-accent', accent)
  }, [
    phase,
    openLevel,
    momentLevel,
    readable,
    answered,
    language,
    levels,
    result.dominant.color,
    defaultAccent,
  ])

  /* Jeder Wechsel beginnt oben. Ohne das stünde man nach dem Auswerten mitten im
     Ergebnis, weil die Skalenansicht weit gescrollt war.

     Und derselbe Anfang gilt für den Vorlesepunkt: Wer die App mit einem
     Screenreader bedient, steht nach dem Wechsel sonst auf einem Knoten, den es
     nicht mehr gibt, und muss die Seite von vorn suchen. Das `tabIndex={-1}` am
     <main> macht die Fläche anspringbar, ohne sie in die Tabulatorreihenfolge zu
     hängen.

     Beim allerersten Rendern nicht: Da hat niemand gewechselt, und den Fokus
     beim Laden der Seite ungefragt einzufangen wäre eine Zumutung. */
  useEffect(() => {
    window.scrollTo({ top: 0 })

    if (firstView.current) {
      firstView.current = false
      return
    }

    view.current?.focus()
  }, [phase])

  function startFresh() {
    reset()
    setPhase('quiz')
  }

  /* Der Abschluss ist der einzige Ort, an dem ein Durchgang in den Verlauf
     kommt — nicht das Betreten der Ergebnisansicht. Die ist auch aus der Skala
     heraus wieder erreichbar, und jeder Besuch dort wäre sonst ein neuer Punkt
     auf der Linie.

     Was nicht zu lesen ist, wird auch nicht aufgezeichnet: Ein Punkt auf der
     Linie behauptet, dass an diesem Tag etwas gemessen wurde. */
  function finish() {
    if (readable) record(result.dominant.id, result.calibration, answered)
    setPhase('result')
  }

  /* Jeder Besuch beginnt ohne Ebene: Der Bogen fragt nach dem, was gerade ist,
     und die Antwort von gestern wäre dabei nur im Weg. */
  function openMoment() {
    setMomentLevel(null)
    setPhase('moment')
  }

  function browse(from: Phase) {
    setReturnTo(from)
    setPhase('scale')
  }

  return (
    <div className="grain relative min-h-dvh">
      <Aurora />

      {/* Die Sprachwahl steht fest oben rechts und gehört keiner Ansicht: sie
          muss auch mitten im Bogen erreichbar sein. Die Antworten hängen an
          Frage-IDs und nicht an Texten, ein Wechsel kostet also keine einzige
          davon. Alle vier Ansichten halten diese Ecke deshalb frei. */}
      <div
        className="fixed top-0 right-0 z-20 p-4"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
      >
        <LanguageToggle language={language} onChange={setLanguage} t={t} />
      </div>

      {/* Über den Wolken, aber unter dem Korn. Der Padding-Wert hält den Inhalt
          von Notch und Home-Indikator frei. */}
      <main
        ref={view}
        tabIndex={-1}
        /* Kein Rahmen um die halbe Seite: Der Fokus landet hier nur
           programmatisch, nie durch die Tabulatortaste. */
        className="relative z-10 focus:outline-none"
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {phase === 'intro' && (
          <Intro
            levels={levels}
            language={language}
            t={t}
            m={m}
            onStart={startFresh}
            onResume={() => setPhase('quiz')}
            resumeAt={resumeAt}
            onBrowse={() => browse('intro')}
            onMoment={openMoment}
            plans={sortedPlans(plans)}
            onDeletePlan={removePlan}
            history={history}
            onClearHistory={clearHistory}
            moments={moments}
            onClearMoments={clearMoments}
          />
        )}

        {phase === 'quiz' && (
          <Quiz
            answers={answers}
            language={language}
            t={t}
            startIndex={resumeAt ?? 0}
            onAnswer={answer}
            onDone={finish}
            onLeave={() => setPhase('intro')}
          />
        )}

        {phase === 'result' && (
          <Result
            result={result}
            levels={levels}
            language={language}
            t={t}
            answered={answered}
            plan={plans[result.dominant.id] ?? null}
            onSavePlan={(when, then) => savePlan(result.dominant.id, when, then)}
            onDeletePlan={() => removePlan(result.dominant.id)}
            onRestart={startFresh}
            onBrowse={() => browse('result')}
          />
        )}

        {phase === 'moment' && (
          <Moment
            levels={levels}
            t={t}
            m={m}
            level={momentLevel}
            onPick={setMomentLevel}
            plans={plans}
            onRecord={recordMoment}
            onLeave={() => setPhase('intro')}
          />
        )}

        {phase === 'scale' && (
          <ScaleBrowser
            levels={levels}
            language={language}
            t={t}
            open={openLevel}
            onOpen={setOpenLevel}
            dominant={answered > 0 ? result.dominant.id : null}
            onBack={() => setPhase(returnTo)}
          />
        )}
      </main>
    </div>
  )
}
