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
import type { Answers, AnswerValue, Language } from './types.ts'

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

describe.each(LANGUAGES)('Ansichten (%s)', (language) => {
  const t = copy[language]
  const levels = levelsIn(language)

  it('Start', () => {
    const html = renderToString(
      <Intro
        levels={levels}
        t={t}
        onStart={noop}
        onBrowse={noop}
        resumeAt={null}
        onResume={noop}
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
        onRestart={noop}
        onBrowse={noop}
      />,
    )
    expect(html).toContain(t.calibrationLabel)
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
        onRestart={noop}
        onBrowse={noop}
      />,
    )
    expect(html).toContain(t.profileTitle)
    expect(html).not.toContain('undefined')
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
