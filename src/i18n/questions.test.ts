import { describe, expect, it } from 'vitest'
import { QUESTIONS } from '../data/questions.ts'
import type { Language } from '../types.ts'
import { questionText } from './questions.ts'

/* The construction rules in `questions.ts` that a pattern can check. The
   answer is a frequency, "never" to "almost always", so a statement must not
   bring its own: "I often think back…" answered with "often" says "often"
   twice, and answered with "rarely" says nothing at all. Same for an ability
   ("I can…"), which has no frequency, and for "there are moments", which
   asks how often there are moments.

   Negation (rule 3) is checked only where it is unambiguous. A plain "not"
   is fine when it doesn't turn the statement into its opposite — "not
   because I want to" in q17 — and telling the two apart needs a reader. */
const FORBIDDEN: Record<Language, RegExp[]> = {
  de: [
    /\b(nie|selten|manchmal|oft|häufig|meistens|immer|ständig)\b/i,
    /\bich kann\b/i,
    /\bes gibt (momente|zeiten|tage)\b/i,
  ],
  en: [
    /\b(never|rarely|seldom|sometimes|often|frequently|usually|always|constantly)\b/i,
    /\bI can\b/,
    /\bthere are (moments|times|days)\b/i,
  ],
}

describe.each(['de', 'en'] as const)('statements (%s)', (language) => {
  it.each(QUESTIONS.map((question) => question.id))('%s follows the mechanical rules', (id) => {
    const text = questionText(language, id)
    for (const pattern of FORBIDDEN[language]) {
      expect(text, String(pattern)).not.toMatch(pattern)
    }
  })
})
