import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Winners } from './components/Winners.tsx'
import { GROUP_LAWS, LAW_COUNT, LAW_GROUPS } from './data/winners.ts'
import { winnersCopy } from './i18n/winners.ts'
import type { Language } from './types.ts'

/* The laws of winners: thirty, each in one group, all on the page. */

const LANGUAGES: Language[] = ['de', 'en']

const escape = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

describe('the laws of winners', () => {
  /* A law in two groups would be read twice, one in none never. */
  it('puts every law in exactly one group', () => {
    const numbers = LAW_GROUPS.flatMap((group) => GROUP_LAWS[group]).sort((a, b) => a - b)
    expect(numbers).toEqual(Array.from({ length: LAW_COUNT }, (_, index) => index + 1))
  })
})

describe.each(LANGUAGES)('the laws of winners (%s)', (language) => {
  const w = winnersCopy[language]
  const html = renderToString(<Winners w={w} />)

  it('has all thirty, each with what it asks and a step for today', () => {
    expect(w.laws).toHaveLength(LAW_COUNT)
    for (const law of w.laws) {
      expect(law.core.length, law.title).toBeGreaterThan(60)
      expect(law.today.length, law.title).toBeGreaterThan(30)
    }
  })

  it('shows every law under its group, with its number for screen readers', () => {
    for (const law of w.laws) expect(html).toContain(escape(law.title))
    for (const group of LAW_GROUPS) expect(html).toContain(escape(w.groups[group]))
    expect(html).toContain(w.lawLabel(30))
    expect(html.match(/<h3/g)).toHaveLength(LAW_COUNT)
  })

  /* Advice from experience is called that, on the page and not behind a fold. */
  it('puts the context and the sources in view', () => {
    for (const note of w.notes) expect(html).toContain(escape(note))
    for (const source of w.sources) expect(html).toContain(escape(source))
    expect(html).toContain(escape(w.sourceNote))
  })

  it('has one page heading and no skipped heading level', () => {
    expect(html.match(/<h1/g)).toHaveLength(1)
    const levels = [...html.matchAll(/<h([1-6])/g)].map((match) => Number(match[1]))
    levels.forEach((level, index) => {
      const previous = levels[index - 1]
      if (previous !== undefined) expect(level - previous, `h${previous} → h${level}`).toBeLessThanOrEqual(1)
    })
  })
})

describe('the laws of winners in both languages', () => {
  it('points into the app from the same laws', () => {
    winnersCopy.de.laws.forEach((law, index) => {
      expect(winnersCopy.en.laws[index]?.inApp === undefined, law.title).toBe(law.inApp === undefined)
    })
    expect(winnersCopy.en.notes).toHaveLength(winnersCopy.de.notes.length)
  })
})
