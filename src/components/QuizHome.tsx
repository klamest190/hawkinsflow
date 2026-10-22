import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import { Button } from './Button.tsx'
import { PAGE_WIDTH } from './page.ts'

type QuizHomeProps = {
  t: Copy
  /** Set only while a questionnaire is half done: where it goes on. */
  resumeAt: number | null
  /** Every statement answered: the main button leads back to the result. */
  complete: boolean
  onStart: () => void
  onResume: () => void
  onShowResult: () => void
}

/**
 * The questionnaire's own place in the navigation: what it is, what it
 * costs, and the one button that fits where someone stands — start, go on,
 * or back to the result.
 *
 * The three states are those of the old door on the start page, and the
 * reason is the same: "start" used to stand there after 34 answers, and the
 * button wiped them. Starting over is a quiet second button, never the first.
 */
export function QuizHome({ t, resumeAt, complete, onStart, onResume, onShowResult }: QuizHomeProps) {
  return (
    <div className={`animate-rise mx-auto flex w-full max-w-xl flex-col px-6 py-10 ${PAGE_WIDTH}`}>
      <h1 className="font-display text-4xl font-bold tracking-[-0.02em]">{t.quizHomeTitle}</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-text/90">{t.introLead(QUESTIONS.length)}</p>
      <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{t.quizHomeLead}</p>

      <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
        {complete ? (
          <Button onClick={onShowResult}>{t.showResult}</Button>
        ) : resumeAt === null ? (
          <Button onClick={onStart}>{t.start}</Button>
        ) : (
          <Button onClick={onResume}>{t.resume(resumeAt + 1)}</Button>
        )}
        {(complete || resumeAt !== null) && (
          <Button variant="quiet" onClick={onStart}>
            {t.restartFromScratch}
          </Button>
        )}
      </div>

      <p className="mt-12 text-[13px] leading-relaxed text-muted">{t.disclaimer}</p>
    </div>
  )
}
