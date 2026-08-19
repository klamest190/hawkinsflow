import type { ReactNode } from 'react'
import { nextLevelId, THRESHOLD } from '../data/levels.ts'
import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import { levelIn } from '../i18n/levels.ts'
import type { Result as Evaluation } from '../lib/scoring.ts'
import type { Language, Level, Plan } from '../types.ts'
import { Button } from './Button.tsx'
import { LevelDetail } from './LevelDetail.tsx'
import { PlanBuilder } from './PlanBuilder.tsx'
import { Spectrum } from './Spectrum.tsx'

type ResultProps = {
  result: Evaluation
  levels: Level[]
  language: Language
  t: Copy
  /** Wie viele der Fragen beantwortet wurden — unter allen gilt ein Vorbehalt. */
  answered: number
  /** Der Wenn-Dann-Plan zur dominanten Ebene; null, solange keiner steht. */
  plan: Plan | null
  onSavePlan: (when: string, then: string) => void
  onDeletePlan: () => void
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
  plan,
  onSavePlan,
  onDeletePlan,
  onRestart,
  onBrowse,
}: ResultProps) {
  const { band, calibration, dominant, drag, reach, scores } = result
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

      {/* ── Der Schwerpunkt ──────────────────────────────────────────────
          Hier stand einmal die interpolierte Zahl, groß und mitgezählt. Sie ist
          raus: dreistellig aus 34 Kreuzen gerechnet sah sie aus wie ein
          Messwert, und einer war sie nie. Was bleibt, ist die Ebene — und
          darunter das Band, das sagt, wie scharf das überhaupt zu lesen ist.

          Die Zahl der Ebene selbst (Mut · 200) bleibt stehen: die stammt von
          Hawkins und ist ein Name, keine Messung an dieser Person. */}
      <Card className="animate-pop text-center">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
          {t.focusLabel}
        </p>
        <h1
          className="mt-3 font-display text-[52px] leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-[64px]"
          style={{
            color: 'var(--hf-accent)',
            textShadow: '0 12px 60px color-mix(in oklab, var(--hf-accent) 45%, transparent)',
          }}
        >
          {dominant.name}
        </h1>
        {/* Hawkins' Originalbegriff steht darunter — außer im Englischen, wo er
            dasselbe Wort noch einmal wäre. */}
        <p className="tabular mt-2 text-[13px] text-muted">
          {dominant.name === dominant.original
            ? dominant.value
            : `${dominant.original} · ${dominant.value}`}
        </p>

        {/* Das Band. Der Verlauf läuft von der einen Ebenenfarbe in die andere,
            die Beschriftung trägt dieselben Farben — so ist ohne ein weiteres
            Wort zu sehen, dass hier eine Strecke gemeint ist und kein Punkt. */}
        <div className="mt-8">
          <div
            className="h-2.5 rounded-full"
            style={{ background: `linear-gradient(90deg, ${band[0].color}, ${band[1].color})` }}
          />
          <div className="tabular mt-2.5 flex justify-between gap-3 text-[12px] font-semibold">
            <span style={{ color: band[0].color }}>
              {band[0].name} · {band[0].value}
            </span>
            <span style={{ color: band[1].color }}>
              {band[1].name} · {band[1].value}
            </span>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-balance text-muted/80">
          {t.bandNote(band[0].name, band[1].name, QUESTIONS.length)}
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

      {/* ── Der Wenn-Dann-Plan ───────────────────────────────────────────
          Steht direkt unter den Schritten, weil er sie braucht: Die Karte
          darüber sagt, was zu tun wäre, diese hier bindet es an einen Moment.

          Das `key` hängt an der Ebene — wer den Bogen wiederholt und woanders
          herauskommt, soll ein leeres Formular sehen und nicht den halb
          passenden Plan der alten Ebene im Feld stehen haben. */}
      <Card>
        <PlanBuilder
          key={dominant.id}
          level={dominant}
          plan={plan}
          t={t}
          onSave={onSavePlan}
          onDelete={onDeletePlan}
        />
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

      {/* Der Vorbehalt steht auch hier und nicht nur auf der Startseite: dort
          war noch nichts zu glauben. */}
      <p className="mx-auto max-w-lg px-2 text-center text-[13px] leading-relaxed text-muted/70">
        {t.resultDisclaimer}
      </p>

      <div className="flex flex-wrap justify-center gap-3 pt-2 pb-6">
        <Button onClick={onBrowse}>{t.seeAllLevels(levels.length)}</Button>
        <Button variant="ghost" onClick={onRestart}>
          {t.repeatQuiz}
        </Button>
      </div>
    </div>
  )
}
