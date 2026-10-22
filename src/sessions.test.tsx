import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { GuidedSession } from './components/GuidedSession.tsx'
import { Meditation } from './components/Meditation.tsx'
import { MEDITATIONS } from './data/meditations.ts'
import { GUIDED, SESSIONS } from './data/sessions.ts'
import { copy } from './i18n/copy.ts'
import { meditationCopy } from './i18n/meditation.ts'
import { sessionCopy } from './i18n/sessions.ts'
import type { Language } from './types.ts'

/* The guided sessions: their texts against their timings, the page before
   the start, and the way in from the meditation page. The session itself
   runs on a clock and is clicked through in `e2e/`. */

const LANGUAGES: Language[] = ['de', 'en']
const noop = () => {}

describe.each(LANGUAGES)('guided sessions (%s)', (language) => {
  const s = sessionCopy[language]
  const d = meditationCopy[language]

  /* One text per timed step: a missing one would leave a step on screen
     without words, an extra one would never be shown. */
  it('has a text for every timed step', () => {
    for (const id of GUIDED) {
      expect(s.steps[id], id).toHaveLength(SESSIONS[id].length)
      for (const step of s.steps[id]) {
        expect(step.title.length, id).toBeGreaterThan(2)
        expect(step.cue.length, id).toBeGreaterThan(40)
      }
    }
  })

  it('offers the length and the voice before the start', () => {
    const html = renderToString(
      <GuidedSession id="bodyScan" form={d.forms.bodyScan} language={language} t={copy[language]} s={s} onLeave={noop} />,
    )
    expect(html).toContain(d.forms.bodyScan.name)
    expect(html).toContain(s.begin)
    for (const minutes of [5, 10, 20]) expect(html).toContain(s.minutes(minutes))
    // Ten minutes unless chosen otherwise; reading aloud off.
    expect(html).toMatch(/checked="" value="10"|value="10" checked=""/)
    expect(html).toContain(s.voice)
    // Without a voice — as in this test, with no browser — the switch says so.
    expect(html).toContain(s.voiceMissing)
    expect(html.match(/<h1/g)).toHaveLength(1)
  })

  it('leads from every card on the meditation page into practice', () => {
    const html = renderToString(<Meditation d={d} onPractice={noop} onEbbFlow={noop} />)
    expect(html.split(`>${d.practiceNow}<`).length - 1).toBe(GUIDED.length)
    // The one form without a session of its own leads to Ebb Flow.
    expect(html.split(`>${d.practiceInEbbFlow}<`).length - 1).toBe(MEDITATIONS.length - GUIDED.length)
  })
})
