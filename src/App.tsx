import { useEffect, useMemo, useState } from 'react'
import { Aurora } from './components/Aurora.tsx'
import { Intro } from './components/Intro.tsx'
import { LanguageToggle } from './components/LanguageToggle.tsx'
import { Quiz } from './components/Quiz.tsx'
import { Result } from './components/Result.tsx'
import { ScaleBrowser } from './components/ScaleBrowser.tsx'
import { QUESTIONS } from './data/questions.ts'
import { copy } from './i18n/copy.ts'
import { levelIn, levelsIn } from './i18n/levels.ts'
import { useAnswers } from './hooks/useAnswers.ts'
import { useHistory } from './hooks/useHistory.ts'
import { usePlans } from './hooks/usePlans.ts'
import { useLanguage } from './hooks/useLanguage.ts'
import { latestPlan } from './lib/plans.ts'
import { answeredCount, evaluate } from './lib/scoring.ts'
import type { LevelId } from './types.ts'

type Phase = 'intro' | 'quiz' | 'result' | 'scale'

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
  const [phase, setPhase] = useState<Phase>('intro')
  const [openLevel, setOpenLevel] = useState<LevelId | null>(null)
  /* Wohin „Zurück" aus der Skalenansicht führt — sie ist von zwei Seiten aus
     erreichbar, und es wäre unangenehm, aus dem Ergebnis auf der Startseite zu
     landen. */
  const [returnTo, setReturnTo] = useState<Phase>('intro')

  const t = copy[language]
  const levels = levelsIn(language)
  const answered = answeredCount(answers)
  const result = useMemo(() => evaluate(levels, answers), [levels, answers])

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
      phase === 'result'
        ? result.dominant.color
        : phase === 'scale' && openLevel !== null
          ? levelIn(language, openLevel).color
          : phase === 'quiz'
            ? levels[Math.min(Math.floor((answered / QUESTIONS.length) * levels.length), levels.length - 1)].color
            : defaultAccent

    document.body.style.setProperty('--hf-accent', accent)
  }, [phase, openLevel, answered, language, levels, result.dominant.color, defaultAccent])

  // Jeder Wechsel beginnt oben. Ohne das stünde man nach dem Auswerten
  // mitten im Ergebnis, weil die Skalenansicht weit gescrollt war.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [phase])

  function startFresh() {
    reset()
    setPhase('quiz')
  }

  /* Der Abschluss ist der einzige Ort, an dem ein Durchgang in den Verlauf
     kommt — nicht das Betreten der Ergebnisansicht. Die ist auch aus der Skala
     heraus wieder erreichbar, und jeder Besuch dort wäre sonst ein neuer Punkt
     auf der Linie.

     Ein leerer Bogen wird nicht aufgezeichnet: Wer sich durchklickt, ohne zu
     antworten, landet rechnerisch bei Scham, und das als Ergebnis zu
     protokollieren wäre schlicht unwahr. */
  function finish() {
    if (answered > 0) record(result.dominant.id, result.calibration, answered)
    setPhase('result')
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
        className="relative z-10"
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
            onStart={startFresh}
            onResume={() => setPhase('quiz')}
            resumeAt={resumeAt}
            onBrowse={() => browse('intro')}
            plan={latestPlan(plans)}
            history={history}
            onClearHistory={clearHistory}
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
