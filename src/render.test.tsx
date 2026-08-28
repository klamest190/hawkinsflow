import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Intro } from './components/Intro.tsx'
import { Moment } from './components/Moment.tsx'
import { Quiz } from './components/Quiz.tsx'
import { Result } from './components/Result.tsx'
import { ScaleBrowser } from './components/ScaleBrowser.tsx'
import { BELOW_THRESHOLD } from './data/levels.ts'
import { QUESTIONS } from './data/questions.ts'
import { copy } from './i18n/copy.ts'
import { momentCopy } from './i18n/moment.ts'
import { levelIn, levelsIn } from './i18n/levels.ts'
import { questionText } from './i18n/questions.ts'
import { evaluate } from './lib/scoring.ts'
import type { Answers, AnswerValue, History, Language, Moments, Plan } from './types.ts'

/* Ein Rauchtest: jede Ansicht einmal rendern, und zwar in jeder Sprache. Er
   prüft keine Optik, sondern dass keine der vier Seiten beim Aufbau stolpert —
   der Ergebnisseite genügt dafür ein leerer Bogen, denn genau dort lauern die
   Sonderfälle (keine Ebene, die zieht, kein Spielraum nach oben).

   Beide Sprachen zu durchlaufen kostet nichts und fängt genau den Fehler, den
   eine Übersetzung typischerweise macht: ein Schlüssel, den es nur in der
   Vorlage gibt, fällt beim Rendern als `undefined` auf.

   renderToString und nicht das DOM: so kommt der Test ohne jsdom und ohne
   Testing-Library aus. Was er nicht sieht, sind Effekte und Klicks. */

const LANGUAGES: Language[] = ['de', 'en']

const mixed: Answers = {}
QUESTIONS.forEach((question, position) => {
  mixed[question.id] = ((position * 3) % 5) as AnswerValue
})

const noop = () => {}

/* Ein fertiger Plan — er nimmt in beiden Ansichten den zweiten Zweig: auf der
   Startseite die Erinnerungskarte, im Ergebnis den gespeicherten Satz statt des
   Formulars. Ohne ihn liefe der Rauchtest nur durch die leeren Fassungen. */
const plan: Plan = {
  level: 'courage',
  when: 'ich merke, dass ich im Meeting nichts sage',
  then: 'sage ich den nächsten Satz trotzdem',
  created: '2026-01-01T00:00:00.000Z',
}

/* Drei Durchgänge über ein Vierteljahr — genug für eine Linie mit zwei Ecken,
   und einer davon unter der Schwelle, damit die gestrichelte Linie mitten
   durchs Bild läuft und nicht am Rand klebt. */
const history: History = [
  { taken: '2026-01-04T09:00:00.000Z', level: 'fear', calibration: 112, answered: 34 },
  { taken: '2026-02-15T09:00:00.000Z', level: 'courage', calibration: 214, answered: 34 },
  { taken: '2026-03-28T09:00:00.000Z', level: 'willingness', calibration: 322, answered: 30 },
]

describe.each(LANGUAGES)('Ansichten (%s)', (language) => {
  const t = copy[language]
  const m = momentCopy[language]
  const levels = levelsIn(language)

  it('Start', () => {
    const html = renderToString(
      <Intro
        levels={levels}
        language={language}
        t={t}
        onStart={noop}
        onBrowse={noop}
        resumeAt={null}
        onResume={noop}
        plans={[]}
        onDeletePlan={noop}
        history={[]}
        onClearHistory={noop}
        m={m}
        onMoment={noop}
        moments={[]}
        onClearMoments={noop}
      />,
    )
    expect(html).toContain(t.start)
    // Das Kürzel am Fuß der Seite, mit dem laufenden Jahr statt einem
    // einbetonierten.
    expect(html).toContain(`© ${new Date().getFullYear()} ${t.appName} · Karsten Lamest`)
    expect(html).not.toContain('undefined')
  })

  it('Fragebogen', () => {
    const html = renderToString(
      <Quiz
        answers={{}}
        language={language}
        t={t}
        startIndex={0}
        onAnswer={noop}
        onDone={noop}
        onLeave={noop}
      />,
    )
    expect(html).toContain(questionText(language, QUESTIONS[0].id))
    /* Ohne Antwort geht es nicht weiter: Der Weiter-Knopf ist stumpf, und
       darunter steht, woran es liegt. Stumpf sind hier zwei — „Zurück" hat auf
       der ersten Frage ohnehin kein Ziel. */
    expect(html).toContain(t.quizNeedsAnswer)
    expect(html.match(/disabled=""/g)).toHaveLength(2)
    expect(html).not.toContain('undefined')
  })

  /* Die Gegenprobe. Die erste Antwort im Muster ist die 0 — genau der Wert, den
     eine Prüfung auf Wahrheitsgehalt statt auf `undefined` verschlucken würde. */
  it('Fragebogen mit beantworteter Frage', () => {
    const html = renderToString(
      <Quiz
        answers={mixed}
        language={language}
        t={t}
        startIndex={0}
        onAnswer={noop}
        onDone={noop}
        onLeave={noop}
      />,
    )
    expect(html).toContain(t.next)
    expect(html).not.toContain(t.quizNeedsAnswer)
    // Nur noch „Zurück" ist stumpf.
    expect(html.match(/disabled=""/g)).toHaveLength(1)
    expect(html).not.toContain('undefined')
  })

  /* Ohne eine einzige Antwort fällt die Rechnung auf den Anfang der Skala und
     damit auf Scham. Angezeigt werden darf das nicht: Das ist ein Startwert und
     keine Aussage über den Menschen davor. */
  it('Ergebnis ohne eine einzige Antwort', () => {
    const html = renderToString(
      <Result
        result={evaluate(levels, {})}
        levels={levels}
        language={language}
        t={t}
        answered={0}
        plan={null}
        onSavePlan={noop}
        onDeletePlan={noop}
        onRestart={noop}
        onBrowse={noop}
      />,
    )
    expect(html).toContain(t.emptyTitle)
    expect(html).not.toContain(t.focusLabel)
    expect(html).not.toContain(levels[0].name)
    expect(html).not.toContain('undefined')
  })

  /* Alle 34 Fragen beantwortet und trotzdem kein Ergebnis: Ohne diesen Schirm
     bekäme man „Mut 200" vorgesetzt — mit Band, Ballast und Spielraum nach
     oben, alles aus der Rechnung und nichts aus den Antworten. */
  it('Ergebnis aus lauter gleichen Kreuzen', () => {
    const same: Answers = {}
    for (const question of QUESTIONS) same[question.id] = 4

    const html = renderToString(
      <Result
        result={evaluate(levels, same)}
        levels={levels}
        language={language}
        t={t}
        answered={QUESTIONS.length}
        plan={null}
        onSavePlan={noop}
        onDeletePlan={noop}
        onRestart={noop}
        onBrowse={noop}
      />,
    )
    expect(html).toContain(t.uniformTitle)
    expect(html).not.toContain(t.focusLabel)
    expect(html).not.toContain(t.profileTitle)
    expect(html).not.toContain('undefined')
  })

  /* Unten und oben gleichzeitig: Das Ergebnis wird gezeigt, aber der Vorbehalt
     steht davor — und zwar über dem Befund, nicht als Fußnote darunter. */
  it('Ergebnis mit Widerspruch bekommt den Vorbehalt davor', () => {
    const both: Answers = {}
    for (const question of QUESTIONS) {
      const ends = ['shame', 'guilt', 'apathy', 'grief', 'fear', 'love', 'joy', 'peace', 'enlightenment']
      both[question.id] = (ends.includes(question.level) ? 4 : 0) satisfies AnswerValue
    }

    const html = renderToString(
      <Result
        result={evaluate(levels, both)}
        levels={levels}
        language={language}
        t={t}
        answered={QUESTIONS.length}
        plan={null}
        onSavePlan={noop}
        onDeletePlan={noop}
        onRestart={noop}
        onBrowse={noop}
      />,
    )
    expect(html).toContain(t.bothEndsTitle)
    // Der Befund selbst steht weiterhin da — er wird eingeordnet, nicht ersetzt.
    expect(html).toContain(t.focusLabel)
    expect(html.indexOf(t.bothEndsTitle)).toBeLessThan(html.indexOf(t.focusLabel))
    expect(html).not.toContain('undefined')
  })

  it('Ergebnis mit vollem Bogen', () => {
    const html = renderToString(
      <Result
        result={evaluate(levels, mixed)}
        levels={levels}
        language={language}
        t={t}
        answered={QUESTIONS.length}
        plan={null}
        onSavePlan={noop}
        onDeletePlan={noop}
        onRestart={noop}
        onBrowse={noop}
      />,
    )
    expect(html).toContain(t.profileTitle)
    expect(html).toContain(t.planTitle)
    expect(html).not.toContain('undefined')
  })

  it('Ergebnis mit gespeichertem Plan', () => {
    const html = renderToString(
      <Result
        result={evaluate(levels, mixed)}
        levels={levels}
        language={language}
        t={t}
        answered={QUESTIONS.length}
        plan={plan}
        onSavePlan={noop}
        onDeletePlan={noop}
        onRestart={noop}
        onBrowse={noop}
      />,
    )
    expect(html).toContain(plan.then)
    // Der gespeicherte Plan zeigt den Satz, nicht noch einmal das Formular.
    expect(html).not.toContain(t.planSave)
    expect(html).not.toContain('undefined')
  })

  it('Start mit erinnertem Plan', () => {
    const html = renderToString(
      <Intro
        levels={levels}
        language={language}
        t={t}
        onStart={noop}
        onBrowse={noop}
        resumeAt={null}
        onResume={noop}
        plans={[plan]}
        onDeletePlan={noop}
        history={[]}
        onClearHistory={noop}
        m={m}
        onMoment={noop}
        moments={[]}
        onClearMoments={noop}
      />,
    )
    expect(html).toContain(t.introPlanLabel)
    expect(html).toContain(plan.when)
    expect(html).not.toContain('undefined')
  })

  /* Ein Plan zu einer Ebene, auf der man nicht mehr herauskommt, war früher
     unsichtbar und unlöschbar — das Ergebnis zeigt nur den Plan der aktuellen
     Ebene. Die Startseite muss deshalb alle tragen. */
  it('Start mit mehreren Plänen', () => {
    const older: Plan = {
      level: 'fear',
      when: 'der Wecker klingelt',
      then: 'stehe ich sofort auf',
      created: '2025-11-01T00:00:00.000Z',
    }
    const html = renderToString(
      <Intro
        levels={levels}
        language={language}
        t={t}
        onStart={noop}
        onBrowse={noop}
        resumeAt={null}
        onResume={noop}
        plans={[plan, older]}
        onDeletePlan={noop}
        history={[]}
        onClearHistory={noop}
        m={m}
        onMoment={noop}
        moments={[]}
        onClearMoments={noop}
      />,
    )
    // Der jüngste ausgeschrieben, der ältere als Zeile mit seinem „dann".
    expect(html).toContain(plan.when)
    expect(html).toContain(t.introPlanOthers)
    expect(html).toContain(older.then)
    expect(html).not.toContain('undefined')
  })

  /* Die Schwelle bei 200 steht in allen drei Ansichten, die die Skala zeigen —
     Leiter, Profil und Skalenansicht. Sie an einer Stelle wegfallen zu lassen
     wäre der Unterschied zwischen einer Idee und einer Verzierung. */
  it('zeichnet die Schwelle in die Leiter der Startseite', () => {
    const html = renderToString(
      <Intro
        levels={levels}
        language={language}
        t={t}
        onStart={noop}
        onBrowse={noop}
        resumeAt={null}
        onResume={noop}
        plans={[]}
        onDeletePlan={noop}
        history={[]}
        onClearHistory={noop}
        m={m}
        onMoment={noop}
        moments={[]}
        onClearMoments={noop}
      />,
    )
    expect(html).toContain(t.thresholdMark(200))
  })

  it('zeichnet die Schwelle ins Profil', () => {
    const html = renderToString(
      <Result
        result={evaluate(levels, mixed)}
        levels={levels}
        language={language}
        t={t}
        answered={QUESTIONS.length}
        plan={null}
        onSavePlan={noop}
        onDeletePlan={noop}
        onRestart={noop}
        onBrowse={noop}
      />,
    )
    expect(html).toContain(t.thresholdMark(200))
  })

  it('Start mit Verlauf', () => {
    const html = renderToString(
      <Intro
        levels={levels}
        language={language}
        t={t}
        onStart={noop}
        onBrowse={noop}
        resumeAt={null}
        onResume={noop}
        plans={[]}
        onDeletePlan={noop}
        history={history}
        onClearHistory={noop}
        m={m}
        onMoment={noop}
        moments={[]}
        onClearMoments={noop}
      />,
    )
    expect(html).toContain(t.historyTitle)
    // Drei Durchgänge heißt: drei Punkte und eine Linie zwischen ihnen.
    expect(html.match(/<circle/g)).toHaveLength(history.length)
    expect(html).toContain('<polyline')
    expect(html).not.toContain('undefined')
    expect(html).not.toContain('NaN')
  })

  /* Ein einzelner Durchgang ist der Sonderfall der Linie: Ohne zweiten Punkt
     gibt es keine Strecke, und die Rechnung teilt beinahe durch null. */
  it('Start mit einem einzigen Durchgang', () => {
    const html = renderToString(
      <Intro
        levels={levels}
        language={language}
        t={t}
        onStart={noop}
        onBrowse={noop}
        resumeAt={null}
        onResume={noop}
        plans={[]}
        onDeletePlan={noop}
        history={history.slice(0, 1)}
        onClearHistory={noop}
        m={m}
        onMoment={noop}
        moments={[]}
        onClearMoments={noop}
      />,
    )
    expect(html.match(/<circle/g)).toHaveLength(1)
    expect(html).not.toContain('<polyline')
    expect(html).not.toContain('NaN')
  })

  /* ── Der Moment-Bogen ───────────────────────────────────────────────────
     Vier Schritte in einer Komponente; renderToString sieht immer nur den
     ersten, weil die anderen an Zustand hängen. Geprüft wird deshalb hier, dass
     die Auswahl steht und aus genau den acht Ebenen unter der Schwelle besteht
     — der letzte Schritt kommt gleich darunter mit gesetzter Ebene. */
  it('Moment: die Auswahl zeigt genau die acht Ebenen unter der Schwelle', () => {
    const html = renderToString(
      <Moment
        levels={levels}
        t={t}
        m={m}
        level={null}
        onPick={noop}
        plans={{}}
        onRecord={noop}
        onLeave={noop}
      />,
    )
    expect(html).toContain(m.pickTitle)
    for (const id of BELOW_THRESHOLD) {
      expect(html, id).toContain(levelIn(language, id).name)
    }
    // Und keine darüber: Über der Schwelle steckt niemand fest.
    expect(html).not.toContain(levelIn(language, 'courage').name)
    expect(html).not.toContain('undefined')
  })

  it('Moment: mit gewählter Ebene steht deren Name über dem Bogen', () => {
    const html = renderToString(
      <Moment
        levels={levels}
        t={t}
        m={m}
        level="anger"
        onPick={noop}
        plans={{}}
        onRecord={noop}
        onLeave={noop}
      />,
    )
    expect(html).toContain(levelIn(language, 'anger').name)
    expect(html).not.toContain('undefined')
  })

  /* Die Spur auf der Startseite. Der jüngste Punkt ist größer als die anderen —
     gezählt werden hier nur die Punkte selbst und der Name der letzten Ebene. */
  it('Start mit Momenten', () => {
    const moments: Moments = [
      { taken: '2026-08-20T09:00:00.000Z', level: 'fear' },
      { taken: '2026-08-24T18:30:00.000Z', level: 'anger' },
      { taken: '2026-08-27T07:15:00.000Z', level: 'anger' },
    ]
    const html = renderToString(
      <Intro
        levels={levels}
        language={language}
        t={t}
        m={m}
        onStart={noop}
        onBrowse={noop}
        onMoment={noop}
        resumeAt={null}
        onResume={noop}
        plans={[]}
        onDeletePlan={noop}
        history={[]}
        onClearHistory={noop}
        moments={moments}
        onClearMoments={noop}
      />,
    )
    expect(html).toContain(m.trailTitle)
    expect(html).toContain(m.trailLatest)
    expect(html).toContain(levelIn(language, 'anger').name)
    expect(html).not.toContain('undefined')
    expect(html).not.toContain('NaN')
  })

  /* Die Übungen sind der einzige Inhalt, der pro Ebene aus mehreren Teilen
     besteht. Ein leeres Feld fiele beim Rendern nicht auf — der Kasten stünde
     einfach halb leer da. Also hier einmal ausgezählt. */
  it('gibt jeder Ebene drei vollständige Übungen', () => {
    for (const level of levels) {
      expect(level.practices, level.id).toHaveLength(3)

      for (const { name, duration, body } of level.practices) {
        expect(name.length, level.id).toBeGreaterThan(3)
        expect(duration.length, level.id).toBeGreaterThan(3)
        expect(body.length, level.id).toBeGreaterThan(80)
      }

      /* Von jeder Sorte genau eine — sonst stünden im Kasten zwei Reiter mit
         derselben Aufschrift, und die Auflage aus `types.ts`, dass nicht alle
         drei Übungen Schreibübungen sind, wäre stillschweigend gefallen. */
      expect(level.practices.map((practice) => practice.kind).sort(), level.id).toEqual([
        'action',
        'sitting',
        'writing',
      ])
    }

    // Und keine zwei Übungen der ganzen Skala teilen sich einen Namen.
    const names = levels.flatMap((level) => level.practices.map((practice) => practice.name))
    expect(new Set(names).size).toBe(levels.length * 3)
  })

  /* Wo eine Minutenzahl steht, läuft im Kasten eine Uhr. Sie muss zu dem
     passen, was die Zeile daneben behauptet: Eine Übung, die „6 Minuten" sagt
     und zehn zählt, ist schlimmer als eine ohne Uhr. */
  it('lässt Uhr und Dauer dasselbe sagen', () => {
    for (const level of levels) {
      for (const { minutes, duration, name } of level.practices) {
        if (minutes === undefined) continue

        expect(minutes, name).toBeGreaterThan(0)
        expect(duration, name).toContain(String(minutes))
      }
    }
  })

  /* Der Übungsstapel steckt im Detailblock und damit in zwei Ansichten. Geprüft
     wird hier, dass alle drei Reiter dastehen und die Uhr bei einer Übung mit
     Minutenangabe auftaucht — beides fiele sonst erst beim Anfassen auf. */
  it('zeigt die drei Übungen mit Uhr', () => {
    const html = renderToString(
      <ScaleBrowser
        levels={levels}
        language={language}
        t={t}
        open="fear"
        onOpen={noop}
        dominant={null}
        onBack={noop}
      />,
    )
    for (const kind of Object.values(t.practiceKinds)) expect(html).toContain(kind)
    expect(html).toContain('role="tablist"')
    // Die Angst-Übung „Und dann?" dauert zehn Minuten und bekommt deshalb eine.
    expect(html).toContain(t.timerStart(10))
  })

  it('Skala mit aufgeklappter Ebene', () => {
    const html = renderToString(
      <ScaleBrowser
        levels={levels}
        language={language}
        t={t}
        open="courage"
        onOpen={noop}
        dominant="courage"
        onBack={noop}
      />,
    )
    expect(html).toContain(t.scaleTitle)
    expect(html).not.toContain('undefined')
  })

  /* Der Rat ist das einzige Feld, das Stellung nimmt, und er steht deshalb vor
     allem, was beschreibt. Beides wird hier geprüft — dass er da ist, und dass
     er vor „Woran du es erkennst" steht. Die Reihenfolge über die Fundstellen
     im HTML: Fiele der Rat ans Ende, wäre er hinter drei Aufzählungen die
     Fußnote, die er nicht sein soll. */
  it('stellt den Rat vor die beschreibenden Abschnitte', () => {
    const html = renderToString(
      <ScaleBrowser
        levels={levels}
        language={language}
        t={t}
        open="fear"
        onOpen={noop}
        dominant={null}
        onBack={noop}
      />,
    )
    const fear = levelIn(language, 'fear')
    expect(html).toContain(t.adviceHeading)
    expect(html).toContain(fear.advice.slice(0, 40))
    expect(html.indexOf(t.adviceHeading)).toBeLessThan(html.indexOf(t.signsHeading))
  })
})

/* Die Ratschläge selbst. Der Compiler erzwingt bereits, dass keiner fehlt (die
   englische Fassung wird gegen die deutsche geprüft) — was er nicht sieht, ist
   ein Rat, der aus Versehen leer, abgeschnitten oder in beiden Sprachen
   derselbe Text ist. */
describe('Die Ratschläge', () => {
  it.each(LANGUAGES)('trägt auf jeder Ebene einen ganzen Satz (%s)', (language) => {
    for (const level of levelsIn(language)) {
      expect(level.advice.length).toBeGreaterThan(80)
      expect(level.advice.trim()).toBe(level.advice)
      expect(level.advice.endsWith('.')).toBe(true)
    }
  })

  it('sagt es in beiden Sprachen mit eigenen Worten', () => {
    for (const de of levelsIn('de')) {
      const en = levelIn('en', de.id)
      expect(en.advice).not.toBe(de.advice)
    }
  })
})
