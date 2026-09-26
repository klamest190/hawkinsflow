import { useCallback, useState } from 'react'
import { isAnswers } from '../lib/scoring.ts'
import { KEYS, clear, load, save } from '../lib/storage.ts'
import type { Answers, AnswerValue } from '../types.ts'

const KEY = KEYS.answers

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

  /* For restoring a backup: the whole value at once. Empty removes the key,
     as clearing does, instead of leaving an empty entry behind. */
  const replaceAnswers = useCallback((next: Answers) => {
    if (Object.keys(next).length === 0) clear(KEY)
    else save(KEY, next)
    setAnswers(next)
  }, [])

  return { answers, answer, reset, replaceAnswers }
}
