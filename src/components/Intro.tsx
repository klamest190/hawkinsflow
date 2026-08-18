import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import type { Level } from '../types.ts'
import { Button } from './Button.tsx'
import { Logo } from './Logo.tsx'

type IntroProps = {
  levels: Level[]
  t: Copy
  onStart: () => void
  onBrowse: () => void
  /** Nur gesetzt, wenn ein angefangener Bogen im Speicher liegt. */
  resumeAt: number | null
  onResume: () => void
}

export function Intro({ levels, t, onStart, onBrowse, resumeAt, onResume }: IntroProps) {
  return (
    <div className="animate-rise mx-auto flex w-full max-w-xl flex-col items-center px-6 py-16 text-center">
      <Logo className="h-16 w-16 drop-shadow-[0_8px_28px_rgba(0,0,0,0.5)]" />

      <h1 className="mt-7 font-display text-5xl font-bold tracking-[-0.03em] sm:text-6xl">
        Hawkins&nbsp;Flow
      </h1>
      <p className="mt-4 text-balance text-[17px] leading-relaxed text-muted">
        {t.introLead(QUESTIONS.length)}
      </p>

      {/* Die Leiter: siebzehn Sprossen, unten breit und dunkel, oben schmal und
          licht. Sie erklärt die Skala schneller als ein Absatz Text — und in
          jeder Sprache gleich, weil sie ohne Worte auskommt. */}
      <div aria-hidden className="mt-10 flex w-full flex-col-reverse items-center gap-[3px]">
        {levels.map((level, rank) => (
          <div
            key={level.id}
            className="h-[7px] rounded-full transition-[width] duration-500"
            style={{
              background: level.color,
              width: `${96 - rank * 4}%`,
              opacity: 0.45 + rank * 0.032,
            }}
          />
        ))}
      </div>

      <div className="mt-11 flex flex-col items-center gap-3">
        {resumeAt === null ? (
          <Button onClick={onStart}>{t.start}</Button>
        ) : (
          <>
            <Button onClick={onResume}>{t.resume(resumeAt + 1)}</Button>
            <Button variant="quiet" onClick={onStart}>
              {t.restartFromScratch}
            </Button>
          </>
        )}
        <Button variant="ghost" onClick={onBrowse}>
          {t.browseFirst}
        </Button>
      </div>

      <p className="mt-12 max-w-md text-[13px] leading-relaxed text-muted/70">{t.disclaimer}</p>
    </div>
  )
}
