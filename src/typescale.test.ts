import { describe, expect, it } from 'vitest'
import stylesheet from './index.css?raw'

/* Every font size is a step of the scale in `index.css`. Before it there were
   25 sizes, half a pixel apart in places, and nothing kept a 26th out. */

const sources = import.meta.glob<string>(['./**/*.tsx', './**/*.ts', '!./**/*.test.*', '!./pdf/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** The steps the stylesheet declares: `--text-caption: 11px` gives `caption`. */
const steps = [...stylesheet.matchAll(/--text-([a-z-]+):\s*\d/g)].map((match) => match[1])

describe('the type scale', () => {
  it('is declared in the stylesheet', () => {
    expect(steps).toContain('body')
    expect(steps.length).toBeGreaterThanOrEqual(8)
  })

  it('is the only source of font sizes', () => {
    // A glob that found nothing would pass the check below by default.
    expect(Object.keys(sources)).toContain('./components/Quiz.tsx')
    const strays: string[] = []
    for (const [file, source] of Object.entries(sources)) {
      // An arbitrary size (`text-[13px]`) or one of Tailwind's own (`text-xl`).
      for (const match of source.matchAll(/(?<![\w-])(?:[a-z]+:)*text-(\[\d[^\]]*\]|xs|sm|base|lg|\d?xl)(?![\w-])/g)) {
        strays.push(`${file}: ${match[0]}`)
      }
    }
    expect(strays).toEqual([])
  })
})
