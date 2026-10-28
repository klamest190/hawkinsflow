import { Fragment } from 'react'
import { THRESHOLD } from '../data/levels.ts'
import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import type { MomentCopy } from '../i18n/moment.ts'
import type { BackupData } from '../lib/backup.ts'
import { todayOf } from '../lib/checkins.ts'
import { dueRun, levelOf as levelById } from '../lib/history.ts'
import { readableOnDark } from '../lib/oklch.ts'
import type { CheckIns, History, Language, Level, LevelId, Moments, Plan, PlanVerdict } from '../types.ts'
import { Button } from './Button.tsx'
import { CheckInTrail } from './CheckInTrail.tsx'
import { DailyCheckIn } from './DailyCheckIn.tsx'
import { DataCard } from './DataCard.tsx'
import { HistoryTrail } from './HistoryTrail.tsx'
import { MomentTrail } from './MomentTrail.tsx'
import { PlanCheckIn } from './PlanCheckIn.tsx'
import { PAGE_WIDTH } from './page.ts'

type IntroProps = {
  levels: Level[]
  language: Language
  t: Copy
  m: MomentCopy
  onStart: () => void
  onBrowse: () => void
  /** The questionnaire's own place — where the "it has been weeks" note leads. */
  onOpenQuiz: () => void
  /** Nur gesetzt, wenn ein angefangener Bogen im Speicher liegt. */
  resumeAt: number | null
  onResume: () => void
  /** Alle Fragen beantwortet: Dann führt der Hauptknopf zum Ergebnis zurück. */
  complete: boolean
  /** Alle Wenn-Dann-Pläne, der zuletzt angelegte zuerst; leer beim ersten Besuch. */
  plans: Plan[]
  onDeletePlan: (level: LevelId) => void
  /** The answer to "has this plan been working?" for the newest plan. */
  onCheckPlan: (level: LevelId, verdict: PlanVerdict) => void
  /** Opens a plan's level in the scale, to reword it. */
  onEditPlan: (level: LevelId) => void
  /** Die abgeschlossenen Durchgänge, ältester zuerst; leer beim ersten Besuch. */
  history: History
  onClearHistory: () => void
  /** Die abgeschlossenen Momente, ältester zuerst. */
  moments: Moments
  onClearMoments: () => void
  /** The daily check-ins, oldest first. */
  checkIns: CheckIns
  onCheckIn: (level: LevelId) => void
  onClearCheckIns: () => void
  /** Deletes every kept writing entry, from the data card. */
  onClearNotes: () => void
  /** Everything stored, for the backup at the foot of the page. */
  data: BackupData
  onRestore: (data: BackupData) => void
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
      className="shrink-0 cursor-pointer text-small font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
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
  onOpenQuiz,
  resumeAt,
  onResume,
  complete,
  plans,
  onDeletePlan,
  onCheckPlan,
  onEditPlan,
  history,
  onClearHistory,
  moments,
  onClearMoments,
  checkIns,
  onCheckIn,
  onClearCheckIns,
  onClearNotes,
  data,
  onRestore,
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

  /* Only while no questionnaire is half done: then the card above already
     says "continue at question N", and a second invitation would be noise. */
  const now = new Date()
  const due = resumeAt === null ? dueRun(history, now) : null
  const dueLevel = due === null ? null : levelById(levels, due.run.level)

  /* The check-in asks for a level by its name. Before the first run the
     names are just words, so it waits until there is one — or until someone
     has checked in before, on this device or in a restored backup. */
  const offerCheckIn = history.length > 0 || checkIns.length > 0

  /* Nothing here yet: no run, no plan, no moment, no day, no half-done
     questionnaire. Then this page is a welcome — what the app is, the scale
     at a glance, and the one button to begin with. From the first thing
     stored on, it is the day's page. */
  const welcome =
    plans.length === 0 &&
    history.length === 0 &&
    moments.length === 0 &&
    checkIns.length === 0 &&
    resumeAt === null &&
    !complete

  return (
    <div className={`animate-rise mx-auto flex w-full max-w-xl flex-col items-center px-6 py-12 text-center lg:py-16 ${PAGE_WIDTH}`}>
      {welcome ? (
        <>
          {/* No logo above the name: the bar or the sidebar already shows it,
              and the ladder below is the same picture, large. A third copy
              pushed the button behind the phone's tab bar. */}
          <h1 className="font-display text-hero font-bold tracking-[-0.03em] sm:text-hero-l">
            Hawkins&nbsp;Flow
          </h1>
          <p className="mt-4 max-w-xl text-balance text-lead leading-relaxed text-muted">
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
          <div className="mt-10 flex w-full max-w-xl flex-col-reverse items-center gap-[3px]">
            {levels.map((level, rank) => (
              <Fragment key={level.id}>
                {level.value === THRESHOLD && (
                  <div className="flex w-full items-center gap-3 py-1.5">
                    <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
                    <span className="text-small font-semibold text-muted">
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

          {/* The one button to begin with, and the quiet way to look first.
              Everything else is in the navigation. */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <Button onClick={onStart}>{t.start}</Button>
            <Button variant="quiet" onClick={onBrowse}>
              {t.browseFirst}
            </Button>
          </div>
        </>
      ) : (
        <header>
          <h1 className="font-display text-display font-bold tracking-[-0.02em]">{t.todayTitle}</h1>
          <p className="mt-2 text-body text-muted">
            {new Intl.DateTimeFormat(language, { weekday: 'long', day: 'numeric', month: 'long' }).format(now)}
          </p>
        </header>
      )}

      {/* The day's cards. On a phone one under the other, as always; on a wide
          screen the plan and the check-in side by side — the two that ask for
          something today — and everything else across the full width. */}
      <div className="mt-8 grid w-full gap-4 lg:grid-cols-2 lg:items-start">
        {/* A questionnaire half done: one line and the button that goes on.
            The navigation leads there too, but this says that it is waiting. */}
        {resumeAt !== null && (
          <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl lg:col-span-2 border border-line bg-card/60 p-5 text-left backdrop-blur-sm">
            <p className="text-body leading-relaxed text-text/90">{t.resumeLead}</p>
            <Button size="sm" onClick={onResume}>
              {t.resume(resumeAt + 1)}
            </Button>
          </div>
        )}

        {/* The last run is weeks old. One sentence, no exclamation mark: an
            offer, not a reminder that nags. The button leads to the
            questionnaire's page, not straight into a new run — starting over
            replaces the answers, and that is a choice to make there. */}
        {due !== null && (
          <div className="flex w-full flex-col items-start gap-3 rounded-2xl lg:col-span-2 border border-line bg-card/60 p-5 text-left backdrop-blur-sm">
            <p className="text-body leading-relaxed text-muted">
              {t.returnNudge(due.days)}
              {dueLevel !== null && (
                <>
                  {' '}
                  {t.returnNudgeLevel}{' '}
                  <span className="font-semibold" style={{ color: readableOnDark(dueLevel.color) }}>
                    {dueLevel.name}
                  </span>
                  .
                </>
              )}{' '}
              {t.returnNudgeInvite}
            </p>
            <Button variant="ghost" size="sm" onClick={onOpenQuiz}>
              {t.nudgeOpen}
            </Button>
          </div>
        )}

        {/* Der Plan steht vor den Knöpfen und nicht am Seitenende: Ein
            Wenn-Dann-Satz wirkt nur, wenn er einem wieder einfällt, und die
            Startseite ist der einzige Ort, an dem diese App das erzwingen kann,
            ohne zu benachrichtigen. */}
        {newest !== undefined && (
          <div
            className={
              'w-full rounded-2xl border border-line bg-card/60 p-5 text-left backdrop-blur-sm ' +
              (offerCheckIn ? '' : 'lg:col-span-2')
            }
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-small font-semibold text-muted">
                {t.introPlanLabel}
              </h2>
              {newestLevel !== null && (
                <p className="text-small font-semibold" style={{ color: readableOnDark(newestLevel.color) }}>
                  {newestLevel.name}
                </p>
              )}
            </div>
            <p className="mt-3 text-body leading-relaxed text-text/90">
              <span className="font-display font-semibold text-accent-ink">{t.planWhen}</span>{' '}
              {newest.when}
            </p>
            <p className="mt-1.5 text-body leading-relaxed text-text/90">
              <span className="font-display font-semibold text-accent-ink">{t.planThen}</span>{' '}
              {newest.then}
            </p>

            {/* Only the newest plan is asked about: one question on the start
                page is an offer, one per plan would be a form. `key` starts the
                reply afresh when a different plan moves to the top. */}
            <PlanCheckIn
              key={newest.level}
              plan={newest}
              t={t}
              now={now}
              onCheck={(verdict) => onCheckPlan(newest.level, verdict)}
              onEdit={() => onEditPlan(newest.level)}
            />

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
                <h3 className="text-small font-semibold text-muted">
                  {t.introPlanOthers}
                </h3>
                {older.map((plan) => {
                  const level = levelOf(plan)
                  return (
                    <div key={plan.level} className="flex items-baseline justify-between gap-3">
                      <p className="min-w-0 flex-1 truncate text-small leading-relaxed text-muted">
                        <span
                          className="font-semibold"
                          style={{ color: readableOnDark(level?.color ?? 'var(--hf-muted)') }}
                        >
                          {level?.name ?? plan.level}
                        </span>
                        : {plan.then}
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

        {/* Verlauf und Momente, in einer Karte mit zwei Zeilen.

            Sie standen einmal in zwei Kästen untereinander — zweimal derselbe
            Rahmen, zweimal dieselbe Kopfzeile, zweimal ein erklärender Absatz. Auf
            einem Telefon war die Startseite damit vor allem Kachelwerk, und der
            Verlauf, der eigentlich in einer Sekunde beantworten soll „wo stand ich
            beim letzten Mal", brauchte dafür den halben Bildschirm.

            Zwei Zeilen und trotzdem keine gemeinsame Grafik: Der Verlauf zeigt, wo
            jemand über Wochen steht, die Momente zeigen einzelne Dienstage — in
            einem Bild wären das zwei Größen in einer Spalte. Getrennt hält sie
            jetzt die Linie zwischen den Zeilen statt eines zweiten Rahmens.

            Beide Spuren geben von sich aus nichts aus, solange nichts da ist. Der
            Kasten muss das noch einmal selbst prüfen, sonst stünde beim ersten
            Besuch ein leerer Rahmen unter dem Plan.

            Steht ein Plan darüber, rückt die Karte dicht an ihn heran; ohne Plan
            hängt sie an der Leiter und braucht den vollen Abstand. */}
        {/* Today, between the plan and the trails: the plan says what to do,
            the check-in asks how today is, the trails show how the days were. */}
        {offerCheckIn && (
          <DailyCheckIn
            levels={levels}
            today={todayOf(checkIns, now)}
            t={t}
            onCheckIn={onCheckIn}
            className={newest === undefined ? 'lg:col-span-2' : ''}
          />
        )}

        {(history.length > 0 || moments.length > 0 || checkIns.length > 0) && (
          <div
            className={
              'w-full divide-y divide-line/60 rounded-2xl border border-line bg-card/60 ' +
              'text-left backdrop-blur-sm lg:col-span-2 ' +
              /* On a wide screen the rows stand side by side, one column per
                 row that has something to show. Stacked across the full
                 width, each line grew with it — the drawings scale with
                 their width — and turned into a tall, mostly empty box. */
              'lg:grid lg:auto-cols-fr lg:grid-flow-col lg:divide-x lg:divide-y-0'
            }
          >
            <HistoryTrail
              history={history}
              levels={levels}
              language={language}
              t={t}
              onClear={onClearHistory}
            />

            <MomentTrail
              moments={moments}
              levels={levels}
              language={language}
              m={m}
              onClear={onClearMoments}
            />

            {/* Third and last: days sit between the weeks of the questionnaire
                and the afternoons of the moments, but they are the newest row
                and the one most often empty. */}
            <CheckInTrail
              checkIns={checkIns}
              levels={levels}
              language={language}
              t={t}
              onClear={onClearCheckIns}
            />
          </div>
        )}

      </div>

      {/* At the foot: saving is housekeeping, and this page exists for the
          day, not for the file. */}
      <DataCard data={data} language={language} t={t} onRestore={onRestore} onClearNotes={onClearNotes} />

      <p className="mt-12 max-w-md text-small leading-relaxed text-muted">{t.disclaimer}</p>

      {/* Steht wie in den Schwester-Apps klein am Fuß der Startseite: Es soll
          dastehen, nicht auffallen. Das Jahr kommt aus der Uhr, damit niemand
          es einmal im Januar nachziehen muss. */}
      <p className="mt-8 text-caption tracking-wide text-muted/50">
        {`${t.appName} © ${new Date().getFullYear()} Karsten Lamest`}
      </p>
    </div>
  )
}
