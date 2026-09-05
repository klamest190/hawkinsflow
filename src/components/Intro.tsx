import { Fragment } from 'react'
import { THRESHOLD } from '../data/levels.ts'
import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import type { MomentCopy } from '../i18n/moment.ts'
import type { History, Language, Level, LevelId, Moments, Plan } from '../types.ts'
import { Button } from './Button.tsx'
import { HistoryTrail } from './HistoryTrail.tsx'
import { Logo } from './Logo.tsx'
import { MomentTrail } from './MomentTrail.tsx'

type IntroProps = {
  levels: Level[]
  language: Language
  t: Copy
  m: MomentCopy
  onStart: () => void
  onBrowse: () => void
  /** Die zweite Tür: der Moment-Bogen für das, was gerade ist. */
  onMoment: () => void
  /** Nur gesetzt, wenn ein angefangener Bogen im Speicher liegt. */
  resumeAt: number | null
  onResume: () => void
  /** Alle Wenn-Dann-Pläne, der zuletzt angelegte zuerst; leer beim ersten Besuch. */
  plans: Plan[]
  onDeletePlan: (level: LevelId) => void
  /** Die abgeschlossenen Durchgänge, ältester zuerst; leer beim ersten Besuch. */
  history: History
  onClearHistory: () => void
  /** Die abgeschlossenen Momente, ältester zuerst. */
  moments: Moments
  onClearMoments: () => void
}

/**
 * Ein Löschen, das nicht wie ein Knopf aussieht — dieselbe stille Zeile wie
 * unter dem Verlauf. Wer hier löscht, tut das nebenbei; ein voller Knopf würde
 * dazu auffordern.
 */
function DeleteLink({
  label,
  title,
  onClick,
}: {
  label: string
  title: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      className="shrink-0 cursor-pointer text-[12px] font-medium text-muted/70 underline decoration-line underline-offset-4 transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
    </button>
  )
}

export function Intro({
  levels,
  language,
  t,
  m,
  onStart,
  onBrowse,
  onMoment,
  resumeAt,
  onResume,
  plans,
  onDeletePlan,
  history,
  onClearHistory,
  moments,
  onClearMoments,
}: IntroProps) {
  /* Der jüngste Plan steht ausgeschrieben, die übrigen als Zeile darunter. Nur
     einen zu zeigen wäre ehrlicher zur ursprünglichen Absicht — ein Vorsatz, an
     den man sich erinnern soll, verträgt keine Liste —, aber dann wüsste niemand
     mehr, was sonst noch aussteht: Die anderen liegen je bei ihrer Ebene in der
     Skala, und dorthin sieht man von der Startseite aus nicht. */
  const [newest, ...older] = plans

  // Die Ebene, zu der ein Plan gehört — sie gibt ihm seine Farbe.
  const levelOf = (plan: Plan): Level | null =>
    levels.find((level) => level.id === plan.level) ?? null

  const newestLevel = newest === undefined ? null : levelOf(newest)

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
          jeder Sprache gleich, weil sie fast ohne Worte auskommt.

          Das eine Wort ist die Schwelle. Sie steht hier, im Profil und in der
          Skalenansicht an derselben Stelle und in derselben Form, weil sie
          überall dasselbe meint: die einzige Höhe dieser Skala, an der sich das
          Vorzeichen ändert.

          `aria-hidden` sitzt an den Sprossen und nicht am Kasten — sonst wäre
          die Beschriftung mit versteckt, und sie ist der einzige Teil dieser
          Grafik, der etwas sagt. In `flex-col-reverse` steht das erste Kind
          unten: Die Linie wird vor Mut ausgegeben und landet damit genau
          zwischen Stolz und Mut. */}
      <div className="mt-10 flex w-full flex-col-reverse items-center gap-[3px]">
        {levels.map((level, rank) => (
          <Fragment key={level.id}>
            {level.value === THRESHOLD && (
              <div className="flex w-full items-center gap-3 py-1.5">
                <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
                <span className="text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
                  {t.thresholdMark(THRESHOLD)}
                </span>
                <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
              </div>
            )}
            <div
              aria-hidden
              className="h-[7px] rounded-full transition-[width] duration-500"
              style={{
                background: level.color,
                width: `${96 - rank * 4}%`,
                opacity: 0.45 + rank * 0.032,
              }}
            />
          </Fragment>
        ))}
      </div>

      {/* Der Plan steht vor den Knöpfen und nicht am Seitenende: Ein
          Wenn-Dann-Satz wirkt nur, wenn er einem wieder einfällt, und die
          Startseite ist der einzige Ort, an dem diese App das erzwingen kann,
          ohne zu benachrichtigen. */}
      {newest !== undefined && (
        <div className="mt-10 w-full rounded-2xl border border-line bg-card/60 p-5 text-left backdrop-blur-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              {t.introPlanLabel}
            </p>
            {newestLevel !== null && (
              <p className="text-[12px] font-semibold" style={{ color: newestLevel.color }}>
                {newestLevel.name}
              </p>
            )}
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-text/90">
            <span className="font-display font-semibold text-accent">{t.planWhen}</span>{' '}
            {newest.when}
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-text/90">
            <span className="font-display font-semibold text-accent">{t.planThen}</span>{' '}
            {newest.then}
          </p>
          <div className="mt-3 flex justify-end">
            <DeleteLink
              label={t.planDelete}
              title={t.planDeleteLabel(newestLevel?.name ?? newest.level)}
              onClick={() => onDeletePlan(newest.level)}
            />
          </div>

          {/* Die älteren Pläne: eine Zeile je Ebene, gekürzt auf das „dann".
              Das „Wenn" fehlt hier bewusst — wer den ganzen Satz wiedersehen
              oder ändern will, klappt die Ebene in der Skala auf. Was diese
              Liste leisten muss, ist zu zeigen, dass es sie gibt, und sie
              löschbar zu machen. */}
          {older.length > 0 && (
            <div className="mt-5 flex flex-col gap-2.5 border-t border-line pt-4">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted/70 uppercase">
                {t.introPlanOthers}
              </p>
              {older.map((plan) => {
                const level = levelOf(plan)
                return (
                  <div key={plan.level} className="flex items-baseline justify-between gap-3">
                    <p className="min-w-0 flex-1 truncate text-[13px] leading-relaxed text-muted">
                      <span
                        className="font-semibold"
                        style={{ color: level?.color ?? 'var(--hf-muted)' }}
                      >
                        {level?.name ?? plan.level}
                      </span>{' '}
                      · {plan.then}
                    </p>
                    <DeleteLink
                      label={t.planDelete}
                      title={t.planDeleteLabel(level?.name ?? plan.level)}
                      onClick={() => onDeletePlan(plan.level)}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Der Verlauf steht unter dem Plan und über den Knöpfen: Er beantwortet
          die Frage, die man sich vor dem Wiederholen stellt — wo stand ich beim
          letzten Mal —, und danach steht der Knopf dafür schon da. */}
      <HistoryTrail
        history={history}
        levels={levels}
        language={language}
        t={t}
        onClear={onClearHistory}
      />

      {/* Und darunter die Momente. Zwei Spuren nebeneinander und nicht in einer:
          Der Verlauf zeigt, wo jemand über Wochen steht, die Momente zeigen
          einzelne Dienstage. In einer Grafik wären das zwei Größen in einer
          Spalte. */}
      <MomentTrail
        moments={moments}
        levels={levels}
        language={language}
        m={m}
        onClear={onClearMoments}
      />

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
        {/* Die zweite Tür. Sie steht direkt unter dem Fragebogen und nicht am
            Seitenende: Wer sie braucht, braucht sie jetzt und sucht nicht. */}
        <Button variant="ghost" onClick={onMoment}>
          {m.enter}
        </Button>
        <Button variant="quiet" onClick={onBrowse}>
          {t.browseFirst}
        </Button>
      </div>

      <p className="mt-12 max-w-md text-[13px] leading-relaxed text-muted/70">{t.disclaimer}</p>

      {/* Steht wie in den Schwester-Apps klein am Fuß der Startseite: Es soll
          dastehen, nicht auffallen. Das Jahr kommt aus der Uhr, damit niemand
          es einmal im Januar nachziehen muss. */}
      <p className="mt-8 text-[11px] tracking-wide text-muted/50">
        {`© ${new Date().getFullYear()} ${t.appName} · Karsten Lamest`}
      </p>
    </div>
  )
}
