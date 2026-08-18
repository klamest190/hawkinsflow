import type { Question } from '../types.ts'

/* Zwei Fragen pro Ebene, 34 insgesamt. Bewusst gemischt sortiert: stünden sie in
   der Reihenfolge der Skala, würde man das Muster nach fünf Fragen erkennen und
   ab da das Ergebnis mitgestalten statt zu antworten.

   Hier steht nur die Zuordnung Frage → Ebene; die Texte stehen in
   `i18n/questions.ts` in beiden Sprachen. */
export const QUESTIONS: Question[] = [
  { id: 'q01', level: 'fear' },
  { id: 'q02', level: 'love' },
  { id: 'q03', level: 'pride' },
  { id: 'q04', level: 'apathy' },
  { id: 'q05', level: 'reason' },
  { id: 'q06', level: 'guilt' },
  { id: 'q07', level: 'willingness' },
  { id: 'q08', level: 'anger' },
  { id: 'q09', level: 'grief' },
  { id: 'q10', level: 'neutrality' },
  { id: 'q11', level: 'shame' },
  { id: 'q12', level: 'desire' },
  { id: 'q13', level: 'courage' },
  { id: 'q14', level: 'peace' },
  { id: 'q15', level: 'acceptance' },
  { id: 'q16', level: 'joy' },
  { id: 'q17', level: 'fear' },
  { id: 'q18', level: 'enlightenment' },
  { id: 'q19', level: 'shame' },
  { id: 'q20', level: 'anger' },
  { id: 'q21', level: 'reason' },
  { id: 'q22', level: 'apathy' },
  { id: 'q23', level: 'desire' },
  { id: 'q24', level: 'love' },
  { id: 'q25', level: 'guilt' },
  { id: 'q26', level: 'willingness' },
  { id: 'q27', level: 'pride' },
  { id: 'q28', level: 'grief' },
  { id: 'q29', level: 'neutrality' },
  { id: 'q30', level: 'courage' },
  { id: 'q31', level: 'acceptance' },
  { id: 'q32', level: 'joy' },
  { id: 'q33', level: 'peace' },
  { id: 'q34', level: 'enlightenment' },
]
