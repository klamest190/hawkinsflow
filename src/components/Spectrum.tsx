import { Fragment } from 'react'
import { THRESHOLD } from '../data/levels.ts'
import type { Copy } from '../i18n/copy.ts'
import type { LevelScore } from '../lib/scoring.ts'
import type { LevelId } from '../types.ts'

type SpectrumProps = {
  scores: LevelScore[]
  /** Wird hervorgehoben — der Schwerpunkt des Ergebnisses. */
  dominant: LevelId
  /** Zieht von unten; bekommt einen eigenen Hinweis. */
  drag?: LevelId | null
  t: Copy
}

/**
 * Das ganze Profil auf einen Blick: siebzehn Balken, oben die höchste Ebene.
 * Nicht nur der Schwerpunkt zählt — interessant ist, wo *neben* ihm noch etwas
 * leuchtet.
 */
export function Spectrum({ scores, dominant, drag, t }: SpectrumProps) {
  return (
    <ol className="flex flex-col gap-1.5">
      {[...scores].reverse().map(({ level, strength }) => {
        const isDominant = level.id === dominant
        const isDrag = level.id === drag

        return (
          <Fragment key={level.id}>
            <li className="flex items-center gap-3">
              <span
                className={
                  'w-[104px] shrink-0 text-right text-[13px] transition-colors ' +
                  (isDominant ? 'font-semibold text-text' : 'text-muted')
                }
              >
                {level.name}
              </span>

              <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-line/60">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    // Auch eine Null bleibt als Strich sichtbar — sonst sähe die
                    // Zeile aus, als wäre sie gar nicht ausgewertet worden.
                    width: `${Math.max(strength * 100, 2)}%`,
                    background: level.color,
                    boxShadow: isDominant ? `0 0 16px -2px ${level.color}` : undefined,
                    opacity: strength === 0 ? 0.3 : 1,
                  }}
                />
              </div>

              <span
                className={
                  'tabular w-[42px] shrink-0 text-[12px] ' +
                  (isDominant ? 'font-semibold text-text' : 'text-muted/70')
                }
              >
                {level.value}
              </span>

              {/* Zwei Marker, die ohne Farbe auskommen — die Balken sind bunt
                  genug, und Farbe allein trägt keine Bedeutung. */}
              <span className="w-4 shrink-0 text-[12px] text-muted">
                {isDominant ? '◆' : isDrag ? '↓' : ''}
              </span>
            </li>

            {/* Die Schwelle, in derselben Form wie in der Leiter auf der
                Startseite und in der Skalenansicht. Sie steht hinter Mut und
                damit zwischen Mut und Stolz — diese Liste läuft von oben nach
                unten, die Leiter von unten nach oben.

                Als eigene Zeile und nicht als Rahmen an einem Balken: Was sie
                trennt, sind zwei Hälften der Skala und nicht zwei Nachbarn. Die
                leeren Felder rechts halten die Spalten der Balkenzeilen — ohne
                sie liefe die Linie unter Zahl und Marker hindurch.

                `aria-hidden`, weil der Ergebnistext die Schwelle in einem
                vollständigen Satz erklärt; zwischen siebzehn vorgelesenen Ebenen
                wäre sie nur ein Einwurf. */}
            {level.value === THRESHOLD && (
              <li aria-hidden className="flex items-center gap-3 py-1">
                <span className="w-[104px] shrink-0 text-right text-[10px] font-semibold tracking-[0.14em] text-muted/70 uppercase">
                  {t.thresholdMark(THRESHOLD)}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-muted/30 via-muted/15 to-transparent" />
                <span className="w-[42px] shrink-0" />
                <span className="w-4 shrink-0" />
              </li>
            )}
          </Fragment>
        )
      })}
    </ol>
  )
}
