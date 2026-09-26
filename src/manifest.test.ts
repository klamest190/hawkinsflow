import { describe, expect, it } from 'vitest'
import de from '../public/manifest.de.webmanifest?raw'
import en from '../public/manifest.en.webmanifest?raw'

/* Two manifests, one app: `useLanguage` swaps between them, so everything but
   the language and the description has to match — a different `id` or
   `start_url` would make the browser see a second app. */
describe('the two manifests', () => {
  const manifests = { de: JSON.parse(de) as Record<string, unknown>, en: JSON.parse(en) as Record<string, unknown> }

  it('carry their own language and a description in it', () => {
    for (const [language, manifest] of Object.entries(manifests)) {
      expect(manifest.lang, language).toBe(language)
      expect(typeof manifest.description, language).toBe('string')
    }
    expect(manifests.de.description).not.toBe(manifests.en.description)
  })

  it('agree on everything else', () => {
    const rest = ({ lang: _lang, description: _description, ...others }: Record<string, unknown>) => others
    expect(rest(manifests.en)).toEqual(rest(manifests.de))
  })
})
