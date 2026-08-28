import { useState, type ReactNode } from 'react'
import { nextLevelId, THRESHOLD } from '../data/levels.ts'
import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import { levelIn } from '../i18n/levels.ts'
import type { Result as Evaluation } from '../lib/scoring.ts'
import { exportResult } from '../pdf/exportResult.ts'
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

/**
 * Der Pfeil in die Ablage — das eine Zeichen, das überall „herunterladen"
 * heißt. Es steht zweimal: groß in der Marke der Karte und klein im Knopf, damit
 * beim Überfliegen klar ist, worauf der Satz hinausläuft.
 */
function DownloadMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 16.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" />
    </svg>
  )
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
  /* Der Export hat drei Zustände und keinen mehr: bereit, läuft, ging schief.
     Der mittlere ist wichtig — zwischen Klick und Datei liegt das Nachladen des
     Renderers, und ohne Rückmeldung sieht das aus wie ein toter Knopf. */
  const [exporting, setExporting] = useState(false)
  const [exportFailed, setExportFailed] = useState(false)

  const { band, calibration, dominant, drag, reach, scores } = result
  const nextId = nextLevelId(dominant.id)
  const next = nextId === null ? null : levelIn(language, nextId)
  const aboveThreshold = calibration >= THRESHOLD
  // Der Name der Schwellen-Ebene wird im Satz gebraucht — auf Deutsch „Mut",
  // auf Englisch „Courage". Aus der Liste geholt und nicht geschrieben, damit
  // beides eine Quelle hat.
  const courage = levelIn(language, 'courage').name

  async function downloadPdf() {
    setExporting(true)
    setExportFailed(false)
    try {
      await exportResult({ result, language, t, answered, plan })
    } catch {
      setExportFailed(true)
    } finally {
      setExporting(false)
    }
  }

  /* ── Wenn nichts abzulesen ist ──────────────────────────────────────────
     Zwei Fälle, ein Schirm — beide Male rechnet die Auswertung etwas aus, und
     beide Male steckt in den Antworten nichts davon.

     Ohne eine einzige Antwort findet `focusRank` kein Gewicht, fällt auf null
     zurück, und das ist der Anfang der Skala: Scham. Ein Startwert, keine
     Aussage über den Menschen davor.

     Der zweite Fall ist der unangenehmere, weil er nach einem echten Ergebnis
     aussieht: 34 beantwortete Fragen, alle mit demselben Kreuz. Dann tragen alle
     Ebenen dasselbe Gewicht, das Mittel liegt in der Mitte der Skala, und
     heraus kommt „Mut" — mit Band, mit Ballast, mit Spielraum nach oben. Vier
     der fünf gleichförmigen Muster liefern genau denselben Befund; das allein
     zeigt, dass er aus der Rechnung stammt und nicht aus den Antworten.

     Deshalb hier ein eigener Schirm und kein Vorbehalt unter einem Ergebnis:
     Beides ist kein halbes Ergebnis, sondern keines. `App.finish()` schreibt
     beide Fälle aus demselben Grund nicht in den Verlauf. */
  const unreadable = answered === 0 || result.reservation === 'uniform'

  if (unreadable) {
    const empty = answered === 0
    return (
      <div className="animate-rise mx-auto flex w-full max-w-xl flex-col gap-6 px-5 py-16 sm:px-6">
        <Card className="animate-pop text-center">
          <h1 className="font-display text-[30px] leading-[1.15] font-bold tracking-[-0.02em] text-balance sm:text-[36px]">
            {empty ? t.emptyTitle : t.uniformTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-balance text-muted">
            {empty ? t.emptyLead : t.uniformLead}
          </p>
          {!empty && (
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-balance text-muted/70">
              {t.uniformHint}
            </p>
          )}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button onClick={onRestart}>{empty ? t.start : t.repeatQuiz}</Button>
            <Button variant="ghost" onClick={onBrowse}>
              {t.browseFirst}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

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

      {/* Der Widerspruch steht als erste Karte und nicht als Fußnote unten:
          Wer die Ebene erst in 64 Pixeln gelesen hat, liest den Vorbehalt
          danach nicht mehr. Bewusst ohne Akzentfarbe — er ist kein Teil des
          Befundes, sondern etwas, das davorsteht. */}
      {result.reservation === 'bothEnds' && (
        <Card className="animate-pop border-line/80">
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            {t.bothEndsTitle}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text/90">{t.bothEndsBody}</p>
        </Card>
      )}

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
        <Spectrum scores={scores} dominant={dominant.id} drag={drag?.id ?? null} t={t} />
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

      {/* ── Mitnehmen ────────────────────────────────────────────────────
          Steht als eigene Karte und nicht als dritter Knopf in der Reihe unten:
          Dort war der Export ein Geist neben zwei anderen und wurde übersehen.
          Hier hat er ein Zeichen, einen Satz und einen vollen Knopf.

          Der Platz ist bewusst das Ende — erst ist das Ergebnis gelesen, dann
          lohnt es sich, es mitzunehmen. */}
      {answered > 0 && (
        <Card className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <span
            aria-hidden
            className="grid h-12 w-12 shrink-0 place-items-center self-center rounded-2xl border border-accent/40 bg-accent/10 text-accent sm:self-start"
          >
            <DownloadMark className="h-6 w-6" />
          </span>

          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-semibold">{t.pdfCardTitle}</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{t.pdfCardLead}</p>
            {exportFailed && (
              <p role="alert" className="mt-2 text-[13px] text-muted">
                {t.pdfFailed}
              </p>
            )}
          </div>

          <Button onClick={() => void downloadPdf()} disabled={exporting} className="shrink-0">
            <DownloadMark className="h-[18px] w-[18px]" />
            {exporting ? t.pdfBusy : t.pdfDownload}
          </Button>
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
