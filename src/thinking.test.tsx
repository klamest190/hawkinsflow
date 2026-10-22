import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Thinking } from './components/Thinking.tsx'
import { copy } from './i18n/copy.ts'
import { levelsIn } from './i18n/levels.ts'
import { thinkingCopy } from './i18n/thinking.ts'
import type { Language } from './types.ts'

/* The two models of thinking: their stations and the view that pairs them. */

const LANGUAGES: Language[] = ['de', 'en']
const noop = () => {}

/** A station name as a literal piece of a pattern — "(Re)Aktionen" has brackets. */
const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

describe.each(LANGUAGES)('two ways of thinking (%s)', (language) => {
  const t = copy[language]
  const th = thinkingCopy[language]
  const html = renderToString(<Thinking levels={levelsIn(language)} t={t} th={th} onBack={noop} />)

  /* The view pairs station n of the one model with station n of the other.
     A seventh on one side would stand without its answer. */
  it('has six stations in each model', () => {
    expect(th.ordinary).toHaveLength(6)
    expect(th.mindHack).toHaveLength(6)
  })

  it('explains every station, and points into the app only from the Mind Hack side', () => {
    for (const station of [...th.ordinary, ...th.mindHack]) {
      expect(station.body.length, station.name).toBeGreaterThan(120)
    }
    expect(th.ordinary.every((station) => station.inApp === undefined)).toBe(true)
    expect(th.mindHack.every((station) => (station.inApp?.length ?? 0) > 40)).toBe(true)
  })

  it('shows every station twice: in its pyramid and in its pair', () => {
    for (const station of [...th.ordinary, ...th.mindHack]) {
      // Once as the heading of its side in the pair, once as its band's label.
      expect(html, station.name).toMatch(new RegExp(`<h3[^>]*>${escaped(station.name)}</h3>`))
      expect(html, station.name).toMatch(new RegExp(`${escaped(station.name)}</span></li>`))
    }
    expect(html).toContain(th.stationLabel(6))
    expect(html).toContain(th.sourceNote)
    expect(html).not.toContain('undefined')
  })

  it('has one page heading and no skipped heading level', () => {
    expect(html.match(/<h1/g)).toHaveLength(1)
    const levels = [...html.matchAll(/<h([1-6])/g)].map((match) => Number(match[1]))
    levels.forEach((level, index) => {
      const previous = levels[index - 1]
      if (previous !== undefined) expect(level - previous, `h${previous} → h${level}`).toBeLessThanOrEqual(1)
    })
  })

  it('stands the ordinary model on its point and the Mind Hack Method on its base', () => {
    const widths = [...html.matchAll(/<li[^>]*style="width:(\d+)%/g)].map((match) => Number(match[1]))
    // Top to bottom: the ordinary model narrows, the Mind Hack Method widens.
    expect(widths.slice(0, 6)).toEqual([100, 90, 80, 70, 60, 50])
    expect(widths.slice(6, 12)).toEqual([50, 60, 70, 80, 90, 100])
  })
})

describe('two ways of thinking in both languages', () => {
  it('names the same stations in the same order', () => {
    const { de, en } = thinkingCopy
    expect(en.ordinary).toHaveLength(de.ordinary.length)
    expect(en.mindHack).toHaveLength(de.mindHack.length)
    de.mindHack.forEach((station, index) => {
      expect(en.mindHack[index]?.inApp === undefined, station.name).toBe(station.inApp === undefined)
    })
  })
})
