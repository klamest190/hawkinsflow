import { THRESHOLD } from '../data/levels.ts'
import type { Copy } from '../i18n/copy.ts'
import { levelIn } from '../i18n/levels.ts'
import type { Language, Level, LevelId, Plans } from '../types.ts'
import { Button } from './Button.tsx'
import { Ladder } from './Ladder.tsx'
import { LevelDetail } from './LevelDetail.tsx'
import type { Journal } from './Writing.tsx'
import { PAGE_WIDTH } from './page.ts'

type ScaleBrowserProps = {
  levels: Level[]
  language: Language
  t: Copy
  /** Die geöffnete Ebene; null heißt: alle zugeklappt. */
  open: LevelId | null
  onOpen: (id: LevelId | null) => void
  /** Aus dem Ergebnis, falls vorhanden — wird in der Liste markiert. */
  dominant: LevelId | null
  /** Alle Wenn-Dann-Pläne; jede aufgeklappte Ebene zeigt ihren eigenen. */
  plans: Plans
  onSavePlan: (level: LevelId, when: string, then: string) => void
  onDeletePlan: (level: LevelId) => void
  /** The kept writing of a level, for the one that is open. */
  journalFor?: (level: LevelId) => Journal
  /** Only when opened from the result: the way back there. */
  onBack?: () => void
}

/**
 * Die ganze Skala von oben nach unten, jede Ebene aufklappbar. Oben steht
 * Erleuchtung — dieselbe Leserichtung wie im Profil, damit „höher" überall
 * dasselbe heißt.
 */
export function ScaleBrowser({
  levels,
  language,
  t,
  open,
  onOpen,
  dominant,
  plans,
  onSavePlan,
  onDeletePlan,
  journalFor,
  onBack,
}: ScaleBrowserProps) {
  const courage = levelIn(language, 'courage').name

  return (
    <div className={`animate-rise mx-auto flex w-full max-w-2xl flex-col px-5 py-8 sm:px-6 ${PAGE_WIDTH}`}>
      {onBack !== undefined && (
        <header className="mb-4 flex items-center justify-between">
          <Button variant="quiet" onClick={onBack} className="-ml-4">
            {t.backArrow}
          </Button>
        </header>
      )}

      <h1 className=" font-display text-display font-bold tracking-[-0.02em]">{t.scaleTitle}</h1>
      <p className="mt-2.5 text-body leading-relaxed text-muted">
        {t.scaleLead(levels.length, THRESHOLD, courage)}
      </p>

      {/* The whole scale at a glance before the list of it: the start page's
          ladder, lit up to the level of the last run once there is one. */}
      <Ladder
        levels={levels}
        thresholdLabel={t.thresholdMark(THRESHOLD)}
        reached={dominant ?? undefined}
        rung="h-[5px]"
        className="mx-auto mt-8 max-w-sm"
      />

      <ol className="mt-10 flex flex-col gap-2.5 pb-10">
        {[...levels].reverse().map((level) => {
          const isOpen = open === level.id
          const isMine = dominant === level.id

          return (
            <li key={level.id}>
              {/* Die Schwelle bekommt eine eigene Linie — sie ist die einzige
                  Stelle der Skala, an der sich etwas grundsätzlich ändert. */}
              {level.value === THRESHOLD && (
                <div aria-hidden className="mb-3 flex items-center gap-3 pt-1">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
                  <span className="text-small font-semibold text-muted">
                    {t.thresholdMark(THRESHOLD)}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
                </div>
              )}

              <div
                className={
                  'overflow-hidden rounded-2xl border transition-colors duration-300 ' +
                  (isOpen ? 'border-line/80 bg-card/80' : 'border-line/50 bg-card/40')
                }
              >
                {/* The button sits inside a heading, as in the accordion
                    pattern: with the names only as button text, the 17 levels
                    could not be reached by heading navigation at all. */}
                <h2>
                  <button
                    type="button"
                    onClick={() => onOpen(isOpen ? null : level.id)}
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? `level-${level.id}` : undefined}
                    className="flex w-full cursor-pointer items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-card focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-ink sm:px-5"
                  >
                    <span
                      aria-hidden
                      className="h-9 w-1.5 shrink-0 rounded-full"
                      style={{ background: level.color, boxShadow: `0 0 14px -2px ${level.color}` }}
                    />
                    <span className="tabular w-[46px] shrink-0 font-display text-title font-bold">
                      {level.value}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-lead font-semibold">
                        {level.name}
                        {isMine && (
                          <span className="ml-2 align-middle text-caption font-medium text-accent-ink">
                            {t.yourLevel}
                          </span>
                        )}
                      </span>
                      {/* Im Englischen wäre „Courage (Courage)" doppelt gemoppelt —
                          dort steht deshalb nur das Gefühl. */}
                      <span className="block truncate text-small text-muted">
                        {level.name === level.original
                          ? level.emotion
                          : `${level.emotion} (${level.original})`}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={
                        'shrink-0 text-small text-muted transition-transform duration-300 ' +
                        (isOpen ? 'rotate-180' : '')
                      }
                    >
                      ▾
                    </span>
                  </button>
                </h2>

                {isOpen && (
                  <div id={`level-${level.id}`} className="animate-rise border-t border-line/60 px-5 py-6 sm:px-7">
                    <LevelDetail
                      level={level}
                      t={t}
                      plan={plans[level.id] ?? null}
                      onSavePlan={(when, then) => onSavePlan(level.id, when, then)}
                      onDeletePlan={() => onDeletePlan(level.id)}
                      journal={journalFor?.(level.id)}
                    />
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
