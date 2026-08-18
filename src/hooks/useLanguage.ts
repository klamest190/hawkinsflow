import { useCallback, useEffect, useState } from 'react'
import { load, save } from '../lib/storage.ts'
import type { Language } from '../types.ts'

const KEY = 'hawkinsflow.language.v1'

function isLanguage(value: unknown): value is Language {
  return value === 'de' || value === 'en'
}

/**
 * Die Vorauswahl kommt aus dem Browser. `navigator.languages` hält die
 * bevorzugten Sprachen in absteigender Reihenfolge („de-AT", „de", „en-US"),
 * deshalb wird die Liste der Reihe nach durchgegangen und der Regionsteil
 * abgeschnitten. Eine einmal getroffene Wahl geht dem Browser vor.
 *
 * Fällt beides aus, bleibt Englisch — es ist die Sprache, die die meisten
 * Besucher zumindest lesen können.
 */
function detectLanguage(): Language {
  const stored = load<Language>(KEY, isLanguage)
  if (stored !== null) return stored

  const preferred = navigator.languages ?? [navigator.language]
  for (const tag of preferred) {
    const base = tag.toLowerCase().split('-')[0]
    if (isLanguage(base)) return base
  }

  return 'en'
}

export function useLanguage() {
  // Lazy: die Erkennung läuft einmal beim ersten Rendern, nicht bei jedem.
  const [language, setLanguageState] = useState<Language>(detectLanguage)

  useEffect(() => {
    // Wichtig für Screenreader und die Silbentrennung des Browsers.
    document.documentElement.lang = language
    save(KEY, language)
  }, [language])

  const setLanguage = useCallback((next: Language): void => {
    setLanguageState(next)
  }, [])

  return { language, setLanguage }
}
