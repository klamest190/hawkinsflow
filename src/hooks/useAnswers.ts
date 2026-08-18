import { useCallback, useState } from 'react'
import { clear, load, save } from '../lib/storage.ts'
import type { Answers, AnswerValue } from '../types.ts'

const KEY = 'hawkinsflow.answers.v1'

/* Was aus dem Speicher kommt, ist erst einmal `unknown` — hier wird geprüft,
   dass es wirklich Frage-ID → 0…4 ist. Ohne diese Wache würde eine veraltete
   oder von Hand veränderte Zeile im localStorage die Auswertung stillschweigend
   verfälschen. */
function isAnswers(value: unknown): value is Answers {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  return Object.values(value).every(
    (entry) => typeof entry === 'number' && Number.isInteger(entry) && entry >= 0 && entry <= 4,
  )
}

/**
 * Die Antworten des Bogens, dauerhaft gesichert. Ein versehentlich geschlossener
 * Tab soll nicht 34 Fragen kosten.
 */
export function useAnswers() {
  const [answers, setAnswers] = useState<Answers>(() => load(KEY, isAnswers) ?? {})

  const answer = useCallback((questionId: string, value: AnswerValue) => {
    setAnswers((previous) => {
      const next = { ...previous, [questionId]: value }
      save(KEY, next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    clear(KEY)
    setAnswers({})
  }, [])

  return { answers, answer, reset }
}
