import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import type { Level, Plan } from '../types.ts'
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
  /** Der zuletzt angelegte Wenn-Dann-Plan; null, solange keiner steht. */
  plan: Plan | null
}

export function Intro({ levels, t, onStart, onBrowse, resumeAt, onResume, plan }: IntroProps) {
  // Die Ebene, zu der der Plan gehört — sie gibt ihm seine Farbe.
  const planLevel = plan === null ? null : (levels.find((level) => level.id === plan.level) ?? null)
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

      {/* Der Plan steht vor den Knöpfen und nicht am Seitenende: Ein
          Wenn-Dann-Satz wirkt nur, wenn er einem wieder einfällt, und die
          Startseite ist der einzige Ort, an dem diese App das erzwingen kann,
          ohne zu benachrichtigen. */}
      {plan !== null && (
        <div className="mt-10 w-full rounded-2xl border border-line bg-card/60 p-5 text-left backdrop-blur-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              {t.introPlanLabel}
            </p>
            {planLevel !== null && (
              <p className="text-[12px] font-semibold" style={{ color: planLevel.color }}>
                {planLevel.name}
              </p>
            )}
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-text/90">
            <span className="font-display font-semibold text-accent">{t.planWhen}</span> {plan.when}
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-text/90">
            <span className="font-display font-semibold text-accent">{t.planThen}</span> {plan.then}
          </p>
        </div>
      )}

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
