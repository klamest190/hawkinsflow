import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Ebbflow } from './components/Ebbflow.tsx'
import { Meditation } from './components/Meditation.tsx'
import { EVIDENCE, EVIDENCE_ORDER, MEDITATIONS, SOURCES } from './data/meditations.ts'
import { copy } from './i18n/copy.ts'
import { ebbCopy } from './i18n/ebbflow.ts'
import { meditationCopy } from './i18n/meditation.ts'
import { EBB_DURATIONS, EBB_MODES } from './lib/ebbflow.ts'
import type { Language } from './types.ts'

/* The meditation page and Ebb Flow. Vitest runs in Node: Ebb Flow is rendered
   at rest, and the breathing itself is clicked through in `e2e/`. */

const LANGUAGES: Language[] = ['de', 'en']
const noop = () => {}

/** Heading levels in document order — none may skip a level. */
function skips(html: string): string[] {
  const levels = [...html.matchAll(/<h([1-6])/g)].map((match) => Number(match[1]))
  return levels.flatMap((level, index) => {
    const previous = levels[index - 1]
    return previous !== undefined && level - previous > 1 ? [`h${previous} → h${level}`] : []
  })
}

describe.each(LANGUAGES)('meditation (%s)', (language) => {
  const d = meditationCopy[language]
  const html = renderToString(<Meditation d={d} onPractice={noop} onEbbFlow={noop} />)

  it('explains every form in full', () => {
    for (const id of MEDITATIONS) {
      const form = d.forms[id]
      for (const part of [form.how, form.effect, form.evidence]) expect(part.length, id).toBeGreaterThan(100)
      expect(form.length.length, id).toBeGreaterThan(5)
      expect(html, id).toContain(form.name)
    }
  })

  it('rates the evidence of every form in words, next to the dots', () => {
    for (const id of MEDITATIONS) expect(html).toContain(d.evidenceLevels[EVIDENCE[id]])
  })

  /* A page about benefits that leaves out the side effects would be the hype
     its own sources warn of. */
  it('names what the research does not say, in view, and lists its sources', () => {
    expect(html).toContain(d.limitsTitle)
    expect(d.limits.length).toBeGreaterThanOrEqual(4)
    for (const limit of d.limits) expect(html).toContain(limit)
    for (const source of SOURCES) expect(html).toContain(source.replace(/&/g, '&amp;'))
  })

  it('has one page heading and no skipped heading level', () => {
    expect(html.match(/<h1/g)).toHaveLength(1)
    expect(skips(html)).toEqual([])
  })
})

describe('the order of the forms', () => {
  it('puts the best supported first and never goes back up', () => {
    const steps = MEDITATIONS.map((id) => EVIDENCE_ORDER.indexOf(EVIDENCE[id]))
    expect(steps).toEqual([...steps].sort((a, b) => a - b))
    expect(MEDITATIONS[0]).toBe('bodyScan')
  })

  it('shows them on the page in that order', () => {
    const html = renderToString(<Meditation d={meditationCopy.de} onPractice={noop} onEbbFlow={noop} />)
    const positions = MEDITATIONS.map((id) => html.indexOf(`>${meditationCopy.de.forms[id].name}</h3>`))
    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
  })
})

describe('meditation in both languages', () => {
  it('points into the app from the same forms', () => {
    for (const id of MEDITATIONS) {
      expect(meditationCopy.en.forms[id].inApp === undefined, id).toBe(meditationCopy.de.forms[id].inApp === undefined)
    }
    expect(meditationCopy.en.body).toHaveLength(meditationCopy.de.body.length)
    expect(meditationCopy.en.limits).toHaveLength(meditationCopy.de.limits.length)
  })
})

describe.each(LANGUAGES)('Ebb Flow (%s)', (language) => {
  const t = copy[language]
  const e = ebbCopy[language]
  const html = renderToString(<Ebbflow t={t} e={e} />)

  it('starts at rest on the calmest rhythm and twenty seconds', () => {
    expect(html).toContain(e.start)
    expect(html).toContain(e.breaths(2))
    // The calm rhythm is the checked radio, and its line of use is shown.
    expect(html).toMatch(/value="relax" checked=""|checked="" value="relax"/)
    expect(html).toContain(e.modes.relax.use)
    // Nothing is announced before the start: the live region stands empty.
    expect(html).toMatch(/aria-live="polite"[^>]*><\/p>/)
    // And no quote yet: one is drawn when a pause begins.
    expect(html).not.toContain('<blockquote')
  })

  it('offers every rhythm and length, with the rhythm read out as seconds', () => {
    for (const mode of EBB_MODES) {
      expect(html).toContain(e.modes[mode].name)
    }
    expect(html).toContain(e.split(4, 6))
    for (const seconds of EBB_DURATIONS) expect(html).toContain(e.duration(seconds))
  })

  it('has one page heading and no skipped heading level', () => {
    expect(html.match(/<h1/g)).toHaveLength(1)
    expect(skips(html)).toEqual([])
  })
})
