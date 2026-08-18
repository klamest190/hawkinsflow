import type { ReactNode } from 'react'
import { nextLevelId, THRESHOLD } from '../data/levels.ts'
import { QUESTIONS } from '../data/questions.ts'
import { useCountUp } from '../hooks/useCountUp.ts'
import type { Copy } from '../i18n/copy.ts'
import { levelIn } from '../i18n/levels.ts'
import type { Result as Evaluation } from '../lib/scoring.ts'
import type { Language, Level } from '../types.ts'
import { Button } from './Button.tsx'
import { LevelDetail } from './LevelDetail.tsx'
import { Spectrum } from './Spectrum.tsx'

type ResultProps = {
  result: Evaluation
  levels: Level[]
  language: Language
  t: Copy
  /** Wie viele der Fragen beantwortet wurden — unter allen gilt ein Vorbehalt. */
  answered: number
  onRestart: () => void
  onBrowse: () => void
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={
        'rounded-3xl border border-line bg-card/70 p-6 backdrop-blur-md sm:p-8 ' + className
      }
    >
      {children}
    </section>
  )
}

export function Result({
  result,
  levels,
  language,
  t,
  answered,
  onRestart,
  onBrowse,
}: ResultProps) {
  const { calibration, dominant, drag, reach, scores } = result
  const counted = useCountUp(calibration)
  const nextId = nextLevelId(dominant.id)
  const next = nextId === null ? null : levelIn(language, nextId)
  const aboveThreshold = calibration >= THRESHOLD
  // Der Name der Schwellen-Ebene wird im Satz gebraucht — auf Deutsch „Mut",
  // auf Englisch „Courage". Aus der Liste geholt und nicht geschrieben, damit
  // beides eine Quelle hat.
  const courage = levelIn(language, 'courage').name

  return (
    <div className="animate-rise mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 py-10 sm:px-6">
      {/* Der rechte Abstand hält die Ecke frei, in der die Sprachwahl steht. */}
      <header className="flex items-center justify-between pr-24">
        <Button variant="quiet" onClick={onBrowse} className="-ml-4">
          {t.wholeScale}
        </Button>
        <Button variant="quiet" onClick={onRestart} className="-mr-4">
          {t.restart}
        </Button>
      </header>

      {/* ── Die Zahl ─────────────────────────────────────────────────────── */}
      <Card className="animate-pop text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
          {t.calibrationLabel}
        </p>
        <p
          className="tabular mt-2 font-display text-[86px] leading-none font-bold sm:text-[104px]"
          style={{
            color: 'var(--hf-accent)',
            textShadow: '0 12px 60px color-mix(in oklab, var(--hf-accent) 45%, transparent)',
          }}
        >
          {counted}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em]">{dominant.name}</h1>
        {/* Hawkins' Originalbegriff steht darunter — außer im Englischen, wo er
            dasselbe Wort noch einmal wäre. */}
        <p className="tabular mt-1 text-[13px] text-muted">
          {dominant.name === dominant.original
            ? dominant.value
            : `${dominant.original} · ${dominant.value}`}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-line bg-void/40 px-3.5 py-1.5 text-[13px] text-muted">
            {t.emotionLabel}: <span className="text-text">{dominant.emotion}</span>
          </span>
          <span className="rounded-full border border-line bg-void/40 px-3.5 py-1.5 text-[13px] text-muted">
            {t.worldviewLabel}: <span className="text-text">{dominant.worldview}</span>
          </span>
        </div>

        <p className="mt-6 text-[14px] leading-relaxed text-muted">
          {aboveThreshold ? t.aboveThreshold(THRESHOLD) : t.belowThreshold(THRESHOLD, courage)}
        </p>

        {answered < QUESTIONS.length && (
          <p className="mt-4 text-[13px] text-muted/70">{t.partial(answered, QUESTIONS.length)}</p>
        )}
      </Card>

      {/* ── Das Profil ───────────────────────────────────────────────────── */}
      <Card>
        <h2 className="font-display text-xl font-semibold">{t.profileTitle}</h2>
        <p className="mt-1.5 mb-6 text-[14px] leading-relaxed text-muted">{t.profileLead}</p>
        <Spectrum scores={scores} dominant={dominant.id} drag={drag?.id ?? null} />
      </Card>

      {/* ── Was zieht und was trägt ──────────────────────────────────────── */}
      {(drag !== null || reach.id !== dominant.id) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {drag !== null && (
            <Card className="flex flex-col gap-2">
              <h2 className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                {t.dragTitle}
              </h2>
              <p className="font-display text-xl font-semibold" style={{ color: drag.color }}>
                {drag.name} · {drag.value}
              </p>
              <p className="text-[14px] leading-relaxed text-muted">
                {/* Die Falle wird hier in den Satz eingebettet und beginnt
                    deshalb klein — im Deutschen wie im Englischen. */}
                {t.dragBody(drag.trap.charAt(0).toLowerCase() + drag.trap.slice(1))}
              </p>
            </Card>
          )}
          {reach.id !== dominant.id && (
            <Card className="flex flex-col gap-2">
              <h2 className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                {t.reachTitle}
              </h2>
              <p className="font-display text-xl font-semibold" style={{ color: reach.color }}>
                {reach.name} · {reach.value}
              </p>
              <p className="text-[14px] leading-relaxed text-muted">{t.reachBody}</p>
            </Card>
          )}
        </div>
      )}

      {/* ── Die Ebene im Detail ──────────────────────────────────────────── */}
      <Card>
        <h2 className="mb-6 font-display text-xl font-semibold">
          {t.levelHeading(dominant.value, dominant.name)}
        </h2>
        <LevelDetail level={dominant} next={next} t={t} />
      </Card>

      {/* ── Der nächste Schritt ──────────────────────────────────────────── */}
      {next && (
        <Card className="text-center">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            {t.nextLabel}
          </p>
          <p className="mt-3 font-display text-3xl font-bold" style={{ color: next.color }}>
            {next.name}
          </p>
          <p className="tabular mt-1 text-[13px] text-muted">
            {next.name === next.original ? next.value : `${next.original} · ${next.value}`}
          </p>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-balance text-muted">
            {next.essence}
          </p>
        </Card>
      )}

      <div className="flex flex-wrap justify-center gap-3 pt-2 pb-6">
        <Button onClick={onBrowse}>{t.seeAllLevels(levels.length)}</Button>
        <Button variant="ghost" onClick={onRestart}>
          {t.repeatQuiz}
        </Button>
      </div>
    </div>
  )
}
