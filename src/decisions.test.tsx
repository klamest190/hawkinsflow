import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Decisions, HowItWorks } from './components/Decisions.tsx'
import { decisionsCopy } from './i18n/decisions.ts'
import { DECISION_FIELDS, LONGEST } from './lib/decisions.ts'
import type { Decisions as DecisionList, Language } from './types.ts'

/* The decision matrix, rendered at rest. Saving, editing, the inline delete
   and where focus goes after each are clicked through in `e2e/`. */

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

const ENTRIES: DecisionList = [
  {
    id: 'older',
    day: '2026-10-29',
    belief: 'Ich schaffe das nicht.',
    decision: 'Ich fange trotzdem an.',
    evidence: 'Letztes Jahr habe ich es auch geschafft.',
    at: '2026-10-29T18:00:00.000Z',
  },
  {
    id: 'morning',
    day: '2026-10-30',
    belief: 'Ich bin nicht gut genug.',
    decision: '',
    evidence: 'Das Projekt im Sommer lief gut.',
    at: '2026-10-30T08:00:00.000Z',
  },
  {
    id: 'noon',
    day: '2026-10-30',
    belief: 'Geld kommt mir nie leicht.',
    decision: 'Ich entscheide mich, bewusst zu wirtschaften.',
    evidence: 'Ich habe Rücklagen gebildet.',
    at: '2026-10-30T12:00:00.000Z',
    revised: '2026-10-30T13:00:00.000Z',
  },
]

/** How each language writes the two days of `ENTRIES`. */
const DAYS: Record<Language, [string, string]> = {
  de: ['30.10.2026', '29.10.2026'],
  en: ['30/10/2026', '29/10/2026'],
}

function view(language: Language, decisions: DecisionList): string {
  return renderToString(
    <Decisions d={decisionsCopy[language]} decisions={decisions} onAdd={noop} onEdit={noop} onRemove={noop} />,
  )
}

describe.each(LANGUAGES)('the decision matrix (%s)', (language) => {
  const d = decisionsCopy[language]

  describe('without entries', () => {
    const html = view(language, [])

    it('has one page heading, the lead and the empty line', () => {
      expect(html.match(/<h1/g)).toHaveLength(1)
      expect(skips(html)).toEqual([])
      for (const text of [d.title, d.lead, d.empty, d.howTitle]) expect(html).toContain(text)
    })

    /* The same bound as the guard: a field the form accepts is never one that
       makes the stored list fail on the next load. */
    it('has three textareas at the length limit, each with its hint linked', () => {
      const areas = [...html.matchAll(/<textarea[^>]*>/g)].map((match) => match[0])
      expect(areas).toHaveLength(DECISION_FIELDS.length)
      for (const area of areas) {
        expect(area).toMatch(new RegExp(`maxlength="${LONGEST}"`, 'i'))
        const described = /aria-describedby="([^"]+)"/.exec(area)?.[1]
        expect(described, area).toBeDefined()
        expect(html).toContain(`id="${described}"`)
      }
      for (const field of DECISION_FIELDS) {
        expect(html).toContain(d.fields[field].label)
        expect(html).toContain(d.fields[field].hint.replace(/&/g, '&amp;'))
      }
    })

    it('cannot save an empty form, and shows no cancel outside editing', () => {
      const save = new RegExp(`<button[^>]*>${d.save}</button>`).exec(html)?.[0]
      expect(save).toBeDefined()
      expect(save).toContain('disabled')
      expect(html).not.toContain(`>${d.cancel}<`)
      expect(html).toContain(d.formNew)
    })

    it('keeps the explanation folded', () => {
      expect(html).not.toContain(d.whyTitle)
    })
  })

  describe('with entries', () => {
    const html = view(language, ENTRIES)
    const [newer, older] = DAYS[language]

    it('heads the list with the count and no empty line', () => {
      expect(html).toContain(d.listTitle(ENTRIES.length))
      expect(html).not.toContain(d.empty)
      expect(skips(html)).toEqual([])
    })

    it('groups by day, newest first, in the language’s date format', () => {
      expect(html).toContain(newer)
      expect(html).toContain(older)
      expect(html.indexOf(older)).toBeGreaterThan(html.indexOf(newer))
      // Within a day, the later entry first.
      expect(html.indexOf('Geld kommt mir nie leicht.')).toBeLessThan(html.indexOf('Ich bin nicht gut genug.'))
    })

    it('shows a dash for an empty field', () => {
      expect(html).toContain('>—<')
    })

    it('gives every entry an edit and a delete button', () => {
      expect(html.split(`>${d.edit}</button>`)).toHaveLength(ENTRIES.length + 1)
      expect(html.split(`>${d.remove}</button>`)).toHaveLength(ENTRIES.length + 1)
    })
  })

  it('has no arbitrary sizes and no emoji', () => {
    const html = view(language, ENTRIES) + renderToString(<HowItWorks d={d} onTemplate={noop} />)
    expect(html).not.toContain('text-[')
    expect(html).not.toMatch(/\p{Extended_Pictographic}/u)
  })
})

/* Folded behind a `Disclosure` in the view, so tested on its own. */
describe.each(LANGUAGES)('how the matrix works (%s)', (language) => {
  const d = decisionsCopy[language]
  const html = renderToString(<HowItWorks d={d} onTemplate={noop} />)

  it('lists the three steps in order', () => {
    expect(html).toContain('<ol')
    expect(d.steps).toHaveLength(3)
    let last = -1
    for (const step of d.steps) {
      const at = html.indexOf(step.title)
      expect(at, step.title).toBeGreaterThan(last)
      expect(html).toContain(step.text)
      last = at
    }
  })

  it('gives Bayer’s reasoning as his', () => {
    expect(html).toContain(d.whyTitle)
    expect(html).toContain(d.why.replace(/&/g, '&amp;'))
    expect(d.why).toContain('Bayer')
  })

  it('offers five examples, each as a template', () => {
    expect(d.examples).toHaveLength(5)
    for (const example of d.examples) {
      expect(html).toContain(example.area)
      expect(html).toContain(example.belief)
    }
    expect(html.split(`>${d.useTemplate}</button>`)).toHaveLength(d.examples.length + 1)
  })

  it('heads its parts below the page heading without skipping a level', () => {
    expect(html).not.toContain('<h1')
    expect(skips('<h1>' + html)).toEqual([])
    expect(html.match(/<h3/g)).toHaveLength(d.examples.length)
  })
})

/* A day that got past the guard must not take the screen down: the label
   falls back to the stored text. */
describe('an impossible stored day', () => {
  it('renders as the raw string instead of throwing', () => {
    const entry = ENTRIES[0]
    expect(entry).toBeDefined()
    const html = view('de', entry ? [{ ...entry, day: '2026-13-45' }] : [])
    expect(html).toContain('2026-13-45')
  })
})
