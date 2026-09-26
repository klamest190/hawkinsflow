import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Crash } from './components/Crash.tsx'
import { LANGUAGE_KEY } from './hooks/useLanguage.ts'
import { crashCopy } from './i18n/crash.ts'
import { clearAppData } from './lib/storage.ts'

/** A `localStorage` stand-in for Node, backed by a Map. */
function fakeStorage(entries: Record<string, string>): Storage {
  const map = new Map(Object.entries(entries))
  return {
    get length() {
      return map.size
    },
    key: (index) => [...map.keys()][index] ?? null,
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => void map.set(key, value),
    removeItem: (key) => void map.delete(key),
    clear: () => map.clear(),
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('crash screen', () => {
  it.each([
    ['de', ['de-AT', 'en']],
    ['en', ['en-US']],
  ] as const)('renders in %s from the browser languages', (language, languages) => {
    vi.stubGlobal('navigator', { languages, language: languages[0] })
    const html = renderToString(<Crash />)
    expect(html).toContain(crashCopy[language].title)
    expect(html).toContain(crashCopy[language].reload)
    // The destructive step is offered, never shown straight away.
    expect(html).toContain(crashCopy[language].resetStart)
    expect(html).not.toContain(crashCopy[language].resetConfirm)
  })

  it('follows a stored language choice over the browser', () => {
    vi.stubGlobal('navigator', { languages: ['en-US'], language: 'en-US' })
    vi.stubGlobal('localStorage', fakeStorage({ [LANGUAGE_KEY]: JSON.stringify('de') }))
    expect(renderToString(<Crash />)).toContain(crashCopy.de.title)
  })
})

describe('clearAppData', () => {
  it('removes every key of this app, and only those', () => {
    const storage = fakeStorage({
      'hawkinsflow.answers.v1': '{}',
      'hawkinsflow.plans.v1': '{}',
      'hawkinsflow.history.v1': '[]',
      'hawkinsflow.moments.v1': '[]',
      [LANGUAGE_KEY]: '"de"',
      'someone-else': 'keep',
    })
    vi.stubGlobal('localStorage', storage)

    clearAppData([LANGUAGE_KEY])

    // Four adjacent keys in a row: a loop that removed while walking the
    // indices would leave every second one behind.
    expect(storage.length).toBe(2)
    expect(storage.getItem(LANGUAGE_KEY)).toBe('"de"')
    expect(storage.getItem('someone-else')).toBe('keep')
  })

  it('survives a storage that throws', () => {
    vi.stubGlobal('localStorage', {
      get length(): number {
        throw new Error('denied')
      },
    })
    expect(() => clearAppData()).not.toThrow()
  })
})
