import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Intro } from './components/Intro.tsx'
import { KnowledgeNav, Sidebar, TabBar } from './components/Navigation.tsx'
import { QuizHome } from './components/QuizHome.tsx'
import { copy } from './i18n/copy.ts'
import { levelsIn } from './i18n/levels.ts'
import { momentCopy } from './i18n/moment.ts'
import type { History, Language } from './types.ts'

/* The navigation, the questionnaire's page, and the two faces of the day's
   page: a welcome on the first visit, the day after that. */

const LANGUAGES: Language[] = ['de', 'en']
const noop = () => {}

const history: History = [
  { taken: '2026-10-01T09:00:00.000Z', level: 'courage', calibration: 214, answered: 34 },
]

describe.each(LANGUAGES)('navigation (%s)', (language) => {
  const t = copy[language]
  const m = momentCopy[language]
  const levels = levelsIn(language)

  it('shows five tabs in the bar and marks the one the place sits under', () => {
    const html = renderToString(<TabBar active="meditation" onSelect={noop} t={t} />)
    expect(html).toContain(`aria-label="${t.navLabel}"`)
    for (const label of [t.navToday, t.navQuiz, t.navMoment, t.navBreathe, t.navKnowledge]) {
      expect(html).toContain(label)
    }
    expect(html.match(/aria-current="page"/g)).toHaveLength(1)
    // Meditation sits under the tab for the places to look things up in.
    expect(html).toMatch(new RegExp(`aria-current="page"[^>]*>(?:(?!</button>).)*${t.navKnowledge}`))
  })

  it('switches between the three places to look things up in, marking the current one', () => {
    const html = renderToString(<KnowledgeNav active="thinking" onSelect={noop} t={t} />)
    expect(html).toContain(`aria-label="${t.navKnowledge}"`)
    for (const label of [t.navScale, t.navThinking, t.navMeditation]) expect(html).toContain(label)
    expect(html).toMatch(new RegExp(`aria-current="page"[^>]*>(?:(?!</button>).)*${t.navThinking}`))
  })

  it('puts the moment flow in the middle of the bar', () => {
    const html = renderToString(<TabBar active={null} onSelect={noop} t={t} />)
    const order = [t.navToday, t.navQuiz, t.navMoment, t.navBreathe, t.navKnowledge].map((label) =>
      html.indexOf(`>${label}<`),
    )
    expect(order).toEqual([...order].sort((a, b) => a - b))
    expect(html).not.toContain('aria-current')
  })

  it('gives the moment flow its own card in the sidebar, with the language at the foot', () => {
    const html = renderToString(
      <Sidebar active="today" onSelect={noop} t={t} m={m} language={language} onLanguage={noop} />,
    )
    expect(html).toContain(m.enter)
    expect(html).toContain(t.navMomentLead)
    // All seven places by name, the three to look things up in under their label.
    for (const label of [t.navToday, t.navQuiz, t.navBreathe, t.navScale, t.navThinking, t.navMeditation]) {
      expect(html).toContain(label)
    }
    expect(html).toContain(t.navKnowledge)
    expect(html).toContain(t.languageLabel)
  })

  it('offers the one button that fits on the questionnaire page', () => {
    const page = (resumeAt: number | null, complete: boolean) =>
      renderToString(
        <QuizHome
          t={t}
          resumeAt={resumeAt}
          complete={complete}
          onStart={noop}
          onResume={noop}
          onShowResult={noop}
        />,
      )
    expect(page(null, false)).toContain(t.start)
    expect(page(null, false)).not.toContain(t.restartFromScratch)
    expect(page(11, false)).toContain(t.resume(12))
    expect(page(11, false)).toContain(t.restartFromScratch)
    // After 34 answers, "start" must not be the first button: it wipes them.
    expect(page(null, true)).toContain(t.showResult)
    expect(page(null, true)).not.toContain(`>${t.start}<`)
  })

  const intro = (props: { history?: History; resumeAt?: number | null }) =>
    renderToString(
      <Intro
        levels={levels}
        language={language}
        t={t}
        m={m}
        onStart={noop}
        onBrowse={noop}
        onOpenQuiz={noop}
        resumeAt={props.resumeAt ?? null}
        onResume={noop}
        complete={false}
        plans={[]}
        onDeletePlan={noop}
        onCheckPlan={noop}
        onEditPlan={noop}
        history={props.history ?? []}
        onClearHistory={noop}
        moments={[]}
        onClearMoments={noop}
        checkIns={[]}
        onCheckIn={noop}
        onClearCheckIns={noop}
        onClearNotes={noop}
        data={{ answers: {}, plans: {}, history: [], moments: [], checkins: [], notes: [] }}
        onRestore={noop}
      />,
    )

  it('welcomes on the first visit, with the scale and one button to begin', () => {
    const html = intro({})
    expect(html).toContain(t.start)
    expect(html).toContain(t.thresholdMark(200))
    expect(html).not.toContain(`>${t.todayTitle}<`)
  })

  it('is the day page once something is stored', () => {
    const html = intro({ history })
    expect(html).toContain(`>${t.todayTitle}</h1>`)
    expect(html).not.toContain(t.introLead(34))
    expect(html.match(/<h1/g)).toHaveLength(1)
  })

  it('says a half-done questionnaire is waiting', () => {
    const html = intro({ resumeAt: 11 })
    expect(html).toContain(t.resumeLead)
    expect(html).toContain(t.resume(12))
  })
})
