import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import { questionText } from '../i18n/questions.ts'
import { itemAt } from '../lib/array.ts'
import { readableOnDark } from '../lib/oklch.ts'
import { weightiest, type LevelScore } from '../lib/scoring.ts'
import type { Answers, Language } from '../types.ts'

/**
 * The heaviest levels and, under each, its statements with the answer given.
 *
 * Shows the reason in the person's own answers rather than in numbers: the
 * weights stay hidden for the same reason the calibration does (see
 * `Result.calibration` in `scoring.ts`). Unanswered statements are left out.
 */
export function Why({
  scores,
  answers,
  language,
  t,
}: {
  scores: LevelScore[]
  answers: Answers
  language: Language
  t: Copy
}) {
  return (
    <ol className="flex flex-col gap-6">
      {weightiest(scores).map(({ level }) => (
        <li key={level.id} className="flex flex-col gap-2.5">
          <h3 className="font-display text-[17px] font-semibold" style={{ color: readableOnDark(level.color) }}>
            {level.name} · {level.value}
          </h3>
          <ul className="flex flex-col gap-2">
            {QUESTIONS.filter((question) => question.level === level.id).map((question) => {
              const value = answers[question.id]
              if (value === undefined) return null
              const answer = itemAt(t.answers, value)
              return (
                <li
                  key={question.id}
                  className="flex flex-col gap-1.5 border-l-2 border-line pl-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <q className="text-[14.5px] leading-relaxed text-text/90">{questionText(language, question.id)}</q>
                  <span className="shrink-0 self-start rounded-full border border-line bg-void/40 px-3 py-1 text-[12.5px] text-muted">
                    <span className="sr-only">{t.whyAnswerPrefix} </span>
                    {answer}
                  </span>
                </li>
              )
            })}
          </ul>
        </li>
      ))}
    </ol>
  )
}
