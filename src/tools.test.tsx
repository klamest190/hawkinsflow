import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { PracticeTool } from './components/PracticeTool.tsx'
import { BREATH_PATTERNS } from './data/breathing.ts'
import { FIRST_AID } from './data/firstAid.ts'
import { BELOW_THRESHOLD } from './data/levels.ts'
import { copy } from './i18n/copy.ts'
import { levelIn } from './i18n/levels.ts'
import { momentCopy } from './i18n/moment.ts'
import { isBelowLevelId } from './lib/moments.ts'
import type { Language } from './types.ts'

/* The tools under the practices, each rendered on its own: the practice deck
   shows one practice at a time, and the moment flow keeps its step in state,
   so neither view reaches them in `renderToString`. Clicking through them is
   in `e2e/`. */

const LANGUAGES: Language[] = ['de', 'en']

describe.each(LANGUAGES)('tools (%s)', (language) => {
  const t = copy[language]
  const m = momentCopy[language]

  it('offers a breath of the stated length, at rest until started', () => {
    const html = renderToString(<PracticeTool tool={{ kind: 'breath', pattern: 'box', minutes: 1 }} t={t} />)
    expect(html).toContain(t.breathStart(1))
    // Nothing is counted before the start, and no phase word is announced.
    expect(html).not.toContain(t.breathPhases.inhale)
    expect(html).not.toContain(t.breathRound(1, 4))
    expect(html).toContain('aria-live="polite"')
  })

  it('draws the box as a square and the long exhale as a circle', () => {
    const box = renderToString(<PracticeTool tool={{ kind: 'breath', pattern: 'box', minutes: 1 }} t={t} />)
    const round = renderToString(
      <PracticeTool tool={{ kind: 'breath', pattern: 'longExhale', minutes: 1 }} t={t} />,
    )
    expect(box).toContain('<rect')
    expect(round).not.toContain('<rect')
    expect(round).toContain('<circle')
  })

  it('starts the five senses with a single button', () => {
    const html = renderToString(<PracticeTool tool={{ kind: 'grounding' }} t={t} />)
    expect(html).toContain(t.groundingStart)
    expect(html).not.toContain(t.groundingNext)
  })

  it('names five senses, one per count', () => {
    expect(t.groundingSenses).toHaveLength(5)
  })

  /* A level whose second step is not the minute of feeling needs its own
     text there — the generic one says "feel the sensation in your body", and
     for apathy that is exactly what the step avoids. */
  it('gives every level with a first-aid tool of its own its own text', () => {
    for (const id of BELOW_THRESHOLD) {
      if (!isBelowLevelId(id)) throw new Error(id)
      const body = m.firstAidBody[id]
      if (FIRST_AID[id].kind === 'timer') expect(body, id).toBeUndefined()
      else expect(body?.length ?? 0, id).toBeGreaterThan(80)
    }
  })
})

describe('first aid', () => {
  /* Someone who breathes four in, six out in the moment flow should meet the
     same breath under the level's sitting practice, and the other way round. */
  it('breathes for fear as the fear practice does', () => {
    const aid = FIRST_AID.fear
    const sitting = levelIn('de', 'fear').practices.find((practice) => practice.kind === 'sitting')
    expect(aid.kind).toBe('breath')
    expect(sitting?.tool?.kind).toBe('breath')
    if (aid.kind === 'breath' && sitting?.tool?.kind === 'breath') {
      expect(aid.pattern).toBe(sitting.tool.pattern)
    }
  })

  it('keeps the moment flow short', () => {
    for (const tool of Object.values(FIRST_AID)) {
      if (tool.kind !== 'grounding') expect(tool.minutes).toBeLessThanOrEqual(2)
    }
  })

  it('names only patterns that exist', () => {
    for (const tool of Object.values(FIRST_AID)) {
      if (tool.kind === 'breath') expect(BREATH_PATTERNS[tool.pattern]).toBeDefined()
    }
  })
})
