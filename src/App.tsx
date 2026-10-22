import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Aurora } from './components/Aurora.tsx'
import { Intro } from './components/Intro.tsx'
import { LanguageToggle } from './components/LanguageToggle.tsx'
import { Moment } from './components/Moment.tsx'
import { Ebbflow } from './components/Ebbflow.tsx'
import { Meditation } from './components/Meditation.tsx'
import { AppBar, KnowledgeNav, Sidebar, TabBar } from './components/Navigation.tsx'
import { Quiz } from './components/Quiz.tsx'
import { QuizHome } from './components/QuizHome.tsx'
import { Result } from './components/Result.tsx'
import { ScaleBrowser } from './components/ScaleBrowser.tsx'
import { Thinking } from './components/Thinking.tsx'
import { QUESTIONS } from './data/questions.ts'
import { copy } from './i18n/copy.ts'
import { ebbCopy } from './i18n/ebbflow.ts'
import { meditationCopy } from './i18n/meditation.ts'
import { momentCopy } from './i18n/moment.ts'
import { thinkingCopy } from './i18n/thinking.ts'
import { levelIn, levelsIn } from './i18n/levels.ts'
import { useAnswers } from './hooks/useAnswers.ts'
import { useCheckIns } from './hooks/useCheckIns.ts'
import { useHistory } from './hooks/useHistory.ts'
import { useMoments } from './hooks/useMoments.ts'
import { useNotes } from './hooks/useNotes.ts'
import { usePlans } from './hooks/usePlans.ts'
import { useLanguage } from './hooks/useLanguage.ts'
import { itemAt } from './lib/array.ts'
import type { BackupData } from './lib/backup.ts'
import { notesOf } from './lib/notes.ts'
import { KNOWLEDGE, type Place, type Tab } from './lib/places.ts'
import { readableOnDark } from './lib/oklch.ts'
import { sortedPlans } from './lib/plans.ts'
import { answeredCount, evaluate } from './lib/scoring.ts'
import type { BelowLevelId, LevelId } from './types.ts'
import type { Journal } from './components/Writing.tsx'

type Phase = 'intro' | 'survey' | 'quiz' | 'result' | 'scale' | 'moment' | 'thinking' | 'breathe' | 'meditation'

const PHASES: readonly Phase[] = [
  'intro',
  'survey',
  'quiz',
  'result',
  'scale',
  'moment',
  'thinking',
  'breathe',
  'meditation',
]

/**
 * The two views that run as a flow: the questionnaire and the moment flow.
 * They hide the navigation and keep their own "cancel". In the middle of 34
 * statements or of a minute of silence, five other places one tap away are
 * a distraction, and a stray tap throws someone out of the flow.
 */
const FOCUS: readonly Phase[] = ['quiz', 'moment']

/** Which place a view belongs to — the one the navigation marks. */
function placeOf(phase: Phase): Place {
  switch (phase) {
    case 'intro':
      return 'today'
    case 'survey':
    case 'quiz':
    case 'result':
      return 'quiz'
    case 'moment':
      return 'moment'
    case 'scale':
      return 'scale'
    case 'thinking':
      return 'thinking'
    case 'breathe':
      return 'breathe'
    case 'meditation':
      return 'meditation'
  }
}

function isPhase(value: unknown): value is Phase {
  return typeof value === 'string' && PHASES.some((phase) => phase === value)
}

/** The view a history entry points to; null for an entry this app didn't write. */
function phaseOf(state: unknown): Phase | null {
  if (typeof state !== 'object' || state === null || !('phase' in state)) return null
  return isPhase(state.phase) ? state.phase : null
}

export default function App() {
  const { language, setLanguage } = useLanguage()
  const { answers, answer, reset, replaceAnswers } = useAnswers()
  /* Die Pläne liegen neben den Antworten und nicht in ihnen: Sie sind das
     Einzige, was der Mensch hier selbst geschrieben hat, und überleben deshalb
     jedes Neustarten des Bogens.

     Sie gehen an alle drei Ansichten, die eine Ebene zeigen — Ergebnis, Skala
     und Moment-Bogen. Früher gab es sie nur zu der einen Ebene, auf der man
     gerade herauskam; zu jeder anderen ließ sich nichts vornehmen. */
  const { plans, savePlan, checkPlan, removePlan, replacePlans } = usePlans()
  /* Und daneben der Verlauf, aus demselben Grund: Er entsteht überhaupt erst
     dadurch, dass jemand den Bogen ein zweites Mal ausfüllt. */
  const { history, record, clearHistory, replaceHistory } = useHistory()
  /* Und die Momente daneben, aus demselben Grund und noch einem: Der Fragebogen
     misst Wochen, ein Moment misst einen Nachmittag. In einer Reihe wären das
     zwei Größen in einer Spalte. */
  const { moments, recordMoment, clearMoments, replaceMoments } = useMoments()
  /* And the daily check-ins: the size between the two — a day. */
  const { checkIns, checkIn, clearCheckIns, replaceCheckIns } = useCheckIns()
  /* What someone chose to keep from a writing practice — the only free text
     here besides the plans, and only on a tap. */
  const { notes, keepNote, removeNote, clearNotes, replaceNotes } = useNotes()

  /** A level's kept writing, for the views that show its practices. */
  const journalFor = (level: LevelId): Journal => ({
    notes: notesOf(notes, level),
    onKeep: (answers) => keepNote(level, answers),
    onDelete: removeNote,
  })
  const [phase, setPhase] = useState<Phase>('intro')

  /* Jeder Wechsel der Ansicht legt einen Eintrag in die Browser-Historie.
     Ohne das verließe „Zurück" auf dem Handy die App statt die Ansicht — als
     installierte PWA ist die Wischgeste am Rand die einzige Zurück-Taste, die
     es gibt, und mitten im Fragebogen aus der App zu fallen ist genau der
     Moment, in dem man sie nicht wieder öffnet.

     `go` ist die eine Stelle, an der Ansichten gewechselt werden; `setPhase`
     ruft sonst nur noch der `popstate`-Lauscher, der den Eintrag zurückliest. */
  const go = useCallback((next: Phase) => {
    window.history.pushState({ phase: next }, '')
    setPhase(next)
  }, [])
  /* Die im Moment-Bogen gewählte Ebene. Sie liegt hier und nicht dort, weil die
     Farbe der ganzen Oberfläche an ihr hängt — siehe den Effekt weiter unten. */
  const [momentLevel, setMomentLevel] = useState<BelowLevelId | null>(null)
  const [openLevel, setOpenLevel] = useState<LevelId | null>(null)
  /* Wohin „Zurück" aus der Skalenansicht führt, wenn sie aus dem Ergebnis
     heraus geöffnet wurde. Null, wenn sie über die Navigation kam: Dann ist sie
     ein Ort für sich, und ein Zurück darüber wäre doppelt. */
  const [returnTo, setReturnTo] = useState<Phase | null>(null)

  /* Die Fläche, in der die Ansichten liegen — sie fängt beim Wechsel den Fokus.
     Siehe den Effekt weiter unten. */
  const view = useRef<HTMLElement>(null)
  const firstView = useRef(true)

  const t = copy[language]
  const m = momentCopy[language]
  const levels = levelsIn(language)
  const answered = answeredCount(answers)
  const complete = answered === QUESTIONS.length

  /* Für den `popstate`-Lauscher: Der hängt einmal am Fenster und sähe sonst
     den Stand vom ersten Rendern. Wer nach einem Neustart zurück auf ein
     Ergebnis blättert, das es nicht mehr gibt, landet auf der Startseite. */
  const answeredRef = useRef(answered)
  useEffect(() => {
    answeredRef.current = answered
  }, [answered])

  useEffect(() => {
    window.history.replaceState({ phase: 'intro' }, '')

    function onPop(event: PopStateEvent) {
      const target = phaseOf(event.state) ?? 'intro'
      setPhase(target === 'result' && answeredRef.current === 0 ? 'intro' : target)
    }

    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
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
              ? itemAt(levels, Math.min(Math.floor((answered / QUESTIONS.length) * levels.length), levels.length - 1)).color
              : defaultAccent

    document.body.style.setProperty('--hf-accent', accent)
    document.body.style.setProperty('--hf-accent-ink', readableOnDark(accent))
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

    /* Without `preventScroll`, focusing a <main> taller than the screen
       scrolls its top edge to the top of the window — under the phone's
       sticky top bar, which then covered the view's heading. The scroll to
       the top above already put it where it belongs. */
    view.current?.focus({ preventScroll: true })
  }, [phase])

  /* Restoring a backup replaces every store at once — see `lib/backup.ts`
     for why it replaces instead of merging. */
  function restore(data: BackupData) {
    replaceAnswers(data.answers)
    replacePlans(data.plans)
    replaceHistory(data.history)
    replaceMoments(data.moments)
    replaceCheckIns(data.checkins)
    replaceNotes(data.notes)
  }

  function startFresh() {
    reset()
    go('quiz')
  }

  /* Der Abschluss ist der einzige Ort, an dem ein Durchgang in den Verlauf
     kommt — nicht das Betreten der Ergebnisansicht. Die ist auch aus der Skala
     heraus wieder erreichbar, und jeder Besuch dort wäre sonst ein neuer Punkt
     auf der Linie.

     Was nicht zu lesen ist, wird auch nicht aufgezeichnet: Ein Punkt auf der
     Linie behauptet, dass an diesem Tag etwas gemessen wurde. */
  function finish() {
    if (readable) record(result.dominant.id, result.calibration, answered)
    go('result')
  }

  /* Jeder Besuch beginnt ohne Ebene: Der Bogen fragt nach dem, was gerade ist,
     und die Antwort von gestern wäre dabei nur im Weg. */
  function openMoment() {
    setMomentLevel(null)
    go('moment')
  }

  function browse(from: Phase | null) {
    setReturnTo(from)
    go('scale')
  }

  /* The navigation's one entrance. The questionnaire's place shows the
     result once every statement is answered, and the questionnaire's page
     before: start, or go on where it stopped. */
  function select(place: Place) {
    switch (place) {
      case 'today':
        go('intro')
        return
      case 'quiz':
        go(complete ? 'result' : 'survey')
        return
      case 'moment':
        openMoment()
        return
      case 'scale':
        browse(null)
        return
      case 'thinking':
        go('thinking')
        return
      case 'breathe':
        go('breathe')
        return
      case 'meditation':
        go('meditation')
        return
    }
  }

  /* The phone's tab for the places to look things up in opens the one last
     visited: whoever reads about meditation and goes to Ebb Flow for a
     minute comes back to meditation, not to the scale. A ref and not state —
     nothing on screen depends on it until the tab is tapped. */
  const lastKnowledge = useRef<Place>('scale')
  useEffect(() => {
    const place = placeOf(phase)
    if (KNOWLEDGE.includes(place)) lastKnowledge.current = place
  }, [phase])

  function selectTab(tab: Tab) {
    if (tab === 'knowledge') select(lastKnowledge.current)
    else select(tab)
  }

  const focusMode = FOCUS.includes(phase)
  const place = placeOf(phase)

  return (
    <div className="grain relative min-h-dvh">
      <Aurora />

      {/* Without this, the first tab stop on every screen was the language
          switch. Focus moves by click and not through the address: a `#main`
          would push a history entry, and every step back here is read as a
          change of view (see `popstate` above). */}
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          // As on a change of view: the focus moves, the page doesn't slide
          // under the top bar.
          view.current?.focus({ preventScroll: true })
        }}
        className="sr-only z-30 rounded-full bg-card px-5 py-2.5 text-[14px] font-semibold text-text focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        style={{ marginTop: 'env(safe-area-inset-top)', marginLeft: 'env(safe-area-inset-left)' }}
      >
        {t.skipToContent}
      </a>

      {/* Die Sprachwahl muss auch mitten im Bogen erreichbar sein. Die Antworten
          hängen an Frage-IDs und nicht an Texten, ein Wechsel kostet also keine
          einzige davon. Im Fokusmodus steht sie deshalb fest oben rechts, und
          beide Abläufe halten diese Ecke frei; sonst sitzt sie in der
          Kopfzeile des Telefons und am Fuß der Sidebar. */}
      {focusMode ? (
        <div
          className="fixed top-0 right-0 z-20 p-4"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top) + 1rem)',
            paddingRight: 'calc(env(safe-area-inset-right) + 1rem)',
          }}
        >
          <LanguageToggle language={language} onChange={setLanguage} t={t} />
        </div>
      ) : (
        <>
          <AppBar t={t} language={language} onLanguage={setLanguage} />
          <Sidebar
            active={place}
            onSelect={select}
            t={t}
            m={m}
            language={language}
            onLanguage={setLanguage}
          />
        </>
      )}

      {/* Über den Wolken, aber unter dem Korn. Der Padding-Wert hält den Inhalt
          von Notch und Home-Indikator frei; neben der Sidebar rückt alles um
          ihre Breite ein. */}
      <div className={focusMode ? '' : 'lg:pl-64'}>
      <main
        ref={view}
        id="main"
        tabIndex={-1}
        /* Kein Rahmen um die halbe Seite: Der Fokus landet hier nur
           programmatisch, nie durch die Tabulatortaste. */
        className="relative z-10 focus:outline-none"
        style={{
          // The phone's top bar keeps the notch free outside the flows.
          paddingTop: focusMode ? 'env(safe-area-inset-top)' : undefined,
          paddingBottom: 'env(safe-area-inset-bottom)',
          // In landscape the notch sits at the side, and the views' own 20–24px
          // of padding is less than its 44px.
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        {phase === 'intro' && (
          <Intro
            levels={levels}
            language={language}
            t={t}
            m={m}
            onStart={startFresh}
            onResume={() => go('quiz')}
            resumeAt={resumeAt}
            complete={complete}
            onBrowse={() => browse(null)}
            onOpenQuiz={() => select('quiz')}
            plans={sortedPlans(plans)}
            onDeletePlan={removePlan}
            onCheckPlan={checkPlan}
            /* After a "partly" or "no": straight to the level that holds the
               plan, opened, where it can be reworded. */
            onEditPlan={(id) => {
              setOpenLevel(id)
              browse(null)
            }}
            history={history}
            onClearHistory={clearHistory}
            moments={moments}
            onClearMoments={clearMoments}
            checkIns={checkIns}
            onCheckIn={checkIn}
            onClearCheckIns={clearCheckIns}
            onClearNotes={clearNotes}
            data={{ answers, plans, history, moments, checkins: checkIns, notes }}
            onRestore={restore}
          />
        )}

        {phase === 'survey' && (
          <QuizHome
            t={t}
            resumeAt={resumeAt}
            complete={complete}
            onStart={startFresh}
            onResume={() => go('quiz')}
            /* Ohne `record`: Der Durchgang steht schon im Verlauf, seit er
               abgeschlossen wurde. Jeder weitere Besuch wäre sonst ein neuer
               Punkt auf der Linie. */
            onShowResult={() => go('result')}
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
            onLeave={() => go('survey')}
          />
        )}

        {phase === 'result' && (
          <Result
            result={result}
            levels={levels}
            language={language}
            t={t}
            answered={answered}
            answers={answers}
            plan={plans[result.dominant.id] ?? null}
            onSavePlan={(when, then) => savePlan(result.dominant.id, when, then)}
            onDeletePlan={() => removePlan(result.dominant.id)}
            journal={journalFor(result.dominant.id)}
            onRestart={startFresh}
            onBrowse={() => browse('result')}
            onInspect={(id) => {
              setOpenLevel(id)
              browse('result')
            }}
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
            onSavePlan={savePlan}
            onRecord={recordMoment}
            onLeave={() => go('intro')}
          />
        )}

        {/* On a phone, the three places to look things up in share a tab;
            this row switches between them. The sidebar lists them itself. */}
        {!focusMode && KNOWLEDGE.includes(place) && <KnowledgeNav active={place} onSelect={select} t={t} />}

        {phase === 'thinking' && (
          <Thinking levels={levels} th={thinkingCopy[language]} />
        )}

        {phase === 'breathe' && <Ebbflow t={t} e={ebbCopy[language]} />}

        {phase === 'meditation' && <Meditation d={meditationCopy[language]} />}

        {phase === 'scale' && (
          <ScaleBrowser
            levels={levels}
            language={language}
            t={t}
            open={openLevel}
            onOpen={setOpenLevel}
            dominant={answered > 0 ? result.dominant.id : null}
            plans={plans}
            onSavePlan={savePlan}
            onDeletePlan={removePlan}
            journalFor={journalFor}
            onBack={returnTo === null ? undefined : () => go(returnTo)}
          />
        )}
        {/* Room for the tab bar, so the last card doesn't end up beneath it. */}
        {!focusMode && <div aria-hidden className="h-24 lg:hidden" />}
      </main>
      </div>

      {!focusMode && <TabBar active={place} onSelect={selectTab} t={t} />}
    </div>
  )
}
