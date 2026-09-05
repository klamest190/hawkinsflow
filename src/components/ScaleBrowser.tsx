import { nextLevelId, THRESHOLD } from '../data/levels.ts'
import type { Copy } from '../i18n/copy.ts'
import { levelIn } from '../i18n/levels.ts'
import type { Language, Level, LevelId, Plans } from '../types.ts'
import { Button } from './Button.tsx'
import { LevelDetail } from './LevelDetail.tsx'

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
  onBack: () => void
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
  onBack,
}: ScaleBrowserProps) {
  const courage = levelIn(language, 'courage').name

  return (
    <div className="animate-rise mx-auto flex w-full max-w-2xl flex-col px-5 py-8 sm:px-6">
      <header className="flex items-center justify-between">
        <Button variant="quiet" onClick={onBack} className="-ml-4">
          {t.backArrow}
        </Button>
      </header>

      <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.02em]">{t.scaleTitle}</h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
        {t.scaleLead(levels.length, THRESHOLD, courage)}
      </p>

      <ol className="mt-8 flex flex-col gap-2.5 pb-10">
        {[...levels].reverse().map((level) => {
          const isOpen = open === level.id
          const isMine = dominant === level.id
          const nextId = nextLevelId(level.id)

          return (
            <li key={level.id}>
              {/* Die Schwelle bekommt eine eigene Linie — sie ist die einzige
                  Stelle der Skala, an der sich etwas grundsätzlich ändert. */}
              {level.value === THRESHOLD && (
                <div aria-hidden className="mb-3 flex items-center gap-3 pt-1">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
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
                <button
                  type="button"
                  onClick={() => onOpen(isOpen ? null : level.id)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-card focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:px-5"
                >
                  <span
                    aria-hidden
                    className="h-9 w-1.5 shrink-0 rounded-full"
                    style={{ background: level.color, boxShadow: `0 0 14px -2px ${level.color}` }}
                  />
                  <span className="tabular w-[46px] shrink-0 font-display text-[19px] font-bold">
                    {level.value}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[16px] font-semibold">
                      {level.name}
                      {isMine && (
                        <span className="ml-2 align-middle text-[11px] font-medium text-accent">
                          {t.yourLevel}
                        </span>
                      )}
                    </span>
                    {/* Im Englischen wäre „Courage · Courage" doppelt gemoppelt —
                        dort steht deshalb nur das Gefühl. */}
                    <span className="block truncate text-[13px] text-muted">
                      {level.name === level.original
                        ? level.emotion
                        : `${level.original} · ${level.emotion}`}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={
                      'shrink-0 text-[13px] text-muted transition-transform duration-300 ' +
                      (isOpen ? 'rotate-180' : '')
                    }
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="animate-rise border-t border-line/60 px-5 py-6 sm:px-7">
                    <LevelDetail
                      level={level}
                      next={nextId === null ? null : levelIn(language, nextId)}
                      t={t}
                      plan={plans[level.id] ?? null}
                      onSavePlan={(when, then) => onSavePlan(level.id, when, then)}
                      onDeletePlan={() => onDeletePlan(level.id)}
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
