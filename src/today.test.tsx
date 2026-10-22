import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { CheckInTrail } from './components/CheckInTrail.tsx'
import { DailyCheckIn } from './components/DailyCheckIn.tsx'
import { Intro } from './components/Intro.tsx'
import { copy } from './i18n/copy.ts'
import { levelIn, levelsIn } from './i18n/levels.ts'
import { momentCopy } from './i18n/moment.ts'
import type { CheckIns, History, Language } from './types.ts'

/* The daily check-in on the start page and its row in the trail card. */

const LANGUAGES: Language[] = ['de', 'en']
const noop = () => {}

const history: History = [
  { taken: '2026-02-15T09:00:00.000Z', level: 'courage', calibration: 214, answered: 34 },
]

/** Local noon on a day of October 2026. */
const on = (day: number): string => new Date(2026, 9, day, 12).toISOString()

describe.each(LANGUAGES)('today (%s)', (language) => {
  const t = copy[language]
  const m = momentCopy[language]
  const levels = levelsIn(language)

  const intro = (props: { history?: History; checkIns?: CheckIns }) =>
    renderToString(
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
        complete={false}
        onShowResult={noop}
        plans={[]}
        onDeletePlan={noop}
        onCheckPlan={noop}
        onEditPlan={noop}
        history={props.history ?? []}
        onClearHistory={noop}
        moments={[]}
        onClearMoments={noop}
        checkIns={props.checkIns ?? []}
        onCheckIn={noop}
        onClearCheckIns={noop}
        data={{ answers: {}, plans: {}, history: [], moments: [], checkins: [] }}
        onRestore={noop}
      />,
    )

  it('waits with the check-in until there has been a first run', () => {
    expect(intro({})).not.toContain(t.checkInQuestion)
    expect(intro({ history })).toContain(t.checkInQuestion)
  })

  it('keeps offering it once someone has checked in, even without a run', () => {
    const html = intro({ checkIns: [{ at: on(3), level: 'fear' }] })
    expect(html).toContain(t.checkInToday)
    // The trail card stands for the check-ins alone, too.
    expect(html).toContain(t.checkInTrailTitle)
  })

  it('shows the level chosen today in place of the question, closed', () => {
    const html = renderToString(
      <DailyCheckIn levels={levels} today={{ at: on(5), level: 'courage' }} t={t} onCheckIn={noop} />,
    )
    expect(html).toContain(levelIn(language, 'courage').name)
    expect(html).toContain(t.checkInChange)
    expect(html).not.toContain(t.checkInQuestion)
    // Closed: none of the seventeen tiles is in the page yet.
    expect(html).toContain('aria-expanded="false"')
    expect(html).not.toContain('aria-pressed')
  })

  it('joins only days that follow each other', () => {
    const checkIns: CheckIns = [
      { at: on(1), level: 'fear' },
      { at: on(2), level: 'courage' },
      { at: on(6), level: 'reason' },
      { at: on(7), level: 'love' },
      { at: on(9), level: 'joy' },
    ]
    const html = renderToString(
      <CheckInTrail checkIns={checkIns} levels={levels} language={language} t={t} onClear={noop} />,
    )
    expect(html.match(/<polyline/g)).toHaveLength(2)
    expect(html.match(/<circle/g)).toHaveLength(5)
    expect(html).toContain(t.checkInTrailLead(5))
    // Read out as dates and levels — a row of dots is nothing to a screen reader.
    expect(html).toContain(levelIn(language, 'reason').name)
  })

  it('leaves out what is older than the window', () => {
    const checkIns: CheckIns = [
      { at: new Date(2026, 7, 1, 12).toISOString(), level: 'fear' },
      { at: on(9), level: 'joy' },
    ]
    const html = renderToString(
      <CheckInTrail checkIns={checkIns} levels={levels} language={language} t={t} onClear={noop} />,
    )
    expect(html.match(/<circle/g)).toHaveLength(1)
  })
})
