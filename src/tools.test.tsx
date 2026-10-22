import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { DataCard } from './components/DataCard.tsx'
import { PracticeTool } from './components/PracticeTool.tsx'
import type { Journal } from './components/Writing.tsx'
import { BREATH_PATTERNS } from './data/breathing.ts'
import { FIRST_AID } from './data/firstAid.ts'
import { BELOW_THRESHOLD, THRESHOLD } from './data/levels.ts'
import { copy } from './i18n/copy.ts'
import { levelIn, levelsIn } from './i18n/levels.ts'
import { momentCopy } from './i18n/moment.ts'
import { isBelowLevelId } from './lib/moments.ts'
import type { Language, Note } from './types.ts'

/* The tools under the practices, each rendered on its own: the practice deck
   shows one practice at a time, and the moment flow keeps its step in state,
   so neither view reaches them in `renderToString`. Clicking through them is
   in `e2e/`. */

const LANGUAGES: Language[] = ['de', 'en']
const noop = () => {}

const note: Note = {
  at: '2026-10-05T19:00:00.000Z',
  level: 'courage',
  answers: [{ prompt: 'Die drei Dinge', text: 'Das Projekt, das niemand will.' }],
}

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

  it('gives a field per question and keeps nothing on its own', () => {
    const journal: Journal = { notes: [], onKeep: noop, onDelete: noop }
    const html = renderToString(<PracticeTool tool={{ kind: 'reframe', minutes: 15 }} t={t} journal={journal} />)
    expect(html.match(/<textarea/g)).toHaveLength(3)
    for (const prompt of t.reframePrompts) expect(html).toContain(prompt)
    expect(html).toContain(t.writeHint)
    // "Keep" only appears once something is written; the clock stays.
    expect(html).not.toContain(`>${t.writeKeep}<`)
    expect(html).toContain(t.timerStart(15))
  })

  it('says it only forgets where nothing can be kept', () => {
    const html = renderToString(<PracticeTool tool={{ kind: 'prompts', prompts: ['Eins'] }} t={t} />)
    expect(html).toContain(t.writeHintNoKeep)
    expect(html).not.toContain(t.writeHint)
  })

  it('folds the kept entries away until asked', () => {
    const journal: Journal = { notes: [note, { ...note, at: '2026-10-06T19:00:00.000Z' }], onKeep: noop, onDelete: noop }
    const html = renderToString(<PracticeTool tool={{ kind: 'prompts', prompts: ['Eins'] }} t={t} journal={journal} />)
    expect(html).toContain(t.notesShow(2))
    expect(html).not.toContain('Das Projekt, das niemand will.')
  })

  it('lets all kept entries go from the data card at once', () => {
    const data = { answers: {}, plans: {}, history: [], moments: [], checkins: [], notes: [note] }
    const html = renderToString(
      <DataCard data={data} language={language} t={t} onRestore={noop} onClearNotes={noop} />,
    )
    expect(html).toContain(t.dataNotes(1))
    expect(html).toContain(t.dataNotesClearLabel)
    // The crash screen has no way to clear them, and shows no link.
    expect(renderToString(<DataCard data={data} language={language} t={t} onRestore={noop} />)).not.toContain(
      t.dataNotesClearLabel,
    )
  })

  it('loads nothing before the first tap on a recording', () => {
    const html = renderToString(<PracticeTool tool={{ kind: 'audio', track: 'settle' }} t={t} />)
    expect(html).toContain(t.tracks.settle.title)
    expect(html).toContain(t.trackPlay)
    expect(html).toContain(t.trackNote)
    // No source yet, and nothing the browser would fetch on its own.
    expect(html).toContain('preload="none"')
    expect(html).not.toContain(t.tracks.settle.file)
    // Nothing to seek in until the length is known.
    expect(html).toMatch(/<input[^>]*type="range"[^>]*disabled/)
  })

  it('keeps each recording in its own language folder', () => {
    for (const [id, track] of Object.entries(t.tracks)) {
      expect(track.file, id).toBe(`audio/${language}/${id}.mp3`)
    }
  })

  /* From courage to reason, the writing practice has fields: the reframe,
     the prompts or the stoic question of what is in one's hands. */
  it('gives every level from the threshold to reason a writing tool', () => {
    for (const level of levelsIn(language).filter((entry) => entry.value >= THRESHOLD && entry.value <= 400)) {
      const writing = level.practices.find((practice) => practice.kind === 'writing')
      expect(['prompts', 'reframe'], level.id).toContain(writing?.tool?.kind)
    }
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

describe('writing prompts', () => {
  /* The prompts are translated per practice. A question that exists in one
     language only would be a field the other never sees. */
  it('asks as many questions in both languages', () => {
    const de = levelsIn('de')
    const en = levelsIn('en')
    de.forEach((level, rank) => {
      level.practices.forEach((practice, index) => {
        const other = en[rank]?.practices[index]?.tool
        const count = (tool: typeof practice.tool) => (tool?.kind === 'prompts' ? tool.prompts.length : 0)
        expect(count(other), `${level.id} ${practice.kind}`).toBe(count(practice.tool))
        expect(other?.kind, `${level.id} ${practice.kind}`).toBe(practice.tool?.kind)
      })
    })
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
