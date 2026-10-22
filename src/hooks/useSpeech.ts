import { useCallback, useSyncExternalStore } from 'react'
import type { Language } from '../types.ts'

/* The voice each language asks for; British English, as the texts are. */
const LOCALE: Record<Language, string> = { de: 'de-DE', en: 'en-GB' }

const supported = (): boolean => typeof window !== 'undefined' && 'speechSynthesis' in window

/** The device's voice for a language: the exact locale first, then any of the language. */
function voiceFor(language: Language): SpeechSynthesisVoice | null {
  if (!supported()) return null
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((voice) => voice.lang === LOCALE[language]) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith(language)) ??
    null
  )
}

/* The voices arrive late on some browsers, so whether there is one is a
   store that changes when they do. */
function subscribe(onChange: () => void): () => void {
  if (!supported()) return () => {}
  window.speechSynthesis.addEventListener('voiceschanged', onChange)
  return () => window.speechSynthesis.removeEventListener('voiceschanged', onChange)
}

/**
 * Reads a guided session's instructions aloud with the device's own voice.
 *
 * No recordings, so it works offline and in both languages — at the price
 * of a voice whose sound depends on the device, which is why it is off
 * until someone turns it on. Slower than the default, as a guided
 * meditation is spoken. Without a voice for the language, `available` is
 * false and the switch says so instead of staying silent.
 */
export function useSpeech(language: Language) {
  const available = useSyncExternalStore(
    subscribe,
    () => voiceFor(language) !== null,
    () => false,
  )

  const speak = useCallback(
    (text: string) => {
      const voice = voiceFor(language)
      if (voice === null) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = voice
      utterance.lang = voice.lang
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    },
    [language],
  )

  const silence = useCallback(() => {
    if (supported()) window.speechSynthesis.cancel()
  }, [])

  return { available, speak, silence }
}
