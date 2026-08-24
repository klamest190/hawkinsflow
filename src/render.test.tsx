import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Intro } from './components/Intro.tsx'
import { Quiz } from './components/Quiz.tsx'
import { Result } from './components/Result.tsx'
import { ScaleBrowser } from './components/ScaleBrowser.tsx'
import { QUESTIONS } from './data/questions.ts'
import { copy } from './i18n/copy.ts'
import { levelsIn } from './i18n/levels.ts'
import { questionText } from './i18n/questions.ts'
import { evaluate } from './lib/scoring.ts'
import type { Answers, AnswerValue, History, Language, Plan } from './types.ts'

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
        plan={null}
        history={[]}
        onClearHistory={noop}
      />,
    )
    expect(html).toContain(t.start)
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
    expect(html).not.toContain('undefined')
  })

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
    expect(html).toContain(t.focusLabel)
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
        plan={plan}
        history={[]}
        onClearHistory={noop}
      />,
    )
    expect(html).toContain(t.introPlanLabel)
    expect(html).toContain(plan.when)
    expect(html).not.toContain('undefined')
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
        plan={null}
        history={history}
        onClearHistory={noop}
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
        plan={null}
        history={history.slice(0, 1)}
        onClearHistory={noop}
      />,
    )
    expect(html.match(/<circle/g)).toHaveLength(1)
    expect(html).not.toContain('<polyline')
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
})
