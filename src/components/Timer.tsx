import { useEffect, useRef } from 'react'
import { useCountdown } from '../hooks/useCountdown.ts'
import type { Copy } from '../i18n/copy.ts'
import { chime } from '../lib/chime.ts'
import { clockOf } from '../lib/clock.ts'

/**
 * Ein kleiner Knopf für die Uhr — die Knöpfe der App sind dafür zu groß.
 *
 * Steht hier und nicht im Übungsstapel, weil ihn inzwischen zwei Ansichten
 * brauchen: der Kasten mit den Übungen und die Minute Stille im Moment-Bogen.
 */
export function Chip({
  onClick,
  children,
  strong = false,
}: {
  onClick: () => void
  children: string
  strong?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold ' +
        'transition-[background-color,border-color,color] duration-200 ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
        (strong
          ? 'border-accent/60 bg-accent/20 text-text hover:bg-accent/30'
          : 'border-line bg-void/40 text-muted hover:border-accent/40 hover:text-text')
      }
    >
      {children}
    </button>
  )
}

/**
 * Die Uhr zu einer Übung oder zu einer Minute Stille.
 *
 * Sie zählt herunter statt hoch, weil die Anweisung eine Dauer nennt und keine
 * Bestzeit: Wer hochzählt, hört auf, wenn es reicht, und das ist bei genau
 * diesen Übungen der Punkt, an dem sie nichts mehr taugen.
 *
 * Ein Wechsel der Dauer braucht ein neues `key` — siehe `useCountdown`.
 */
export function Timer({ minutes, t }: { minutes: number; t: Copy }) {
  const { remaining, running, done, start, pause, stop } = useCountdown(minutes * 60)
  /* Der Ton gehört zum Übergang auf „abgelaufen" und nicht zum Zustand: ohne
     die Erinnerung würde er bei jedem weiteren Rendern erneut anschlagen. */
  const rang = useRef(false)

  useEffect(() => {
    if (done && !rang.current) {
      rang.current = true
      chime()
    }
    if (!done) rang.current = false
  }, [done])

  // Unberührt heißt: noch nie gelaufen. Dann steht dort nur der eine Knopf.
  const untouched = !running && remaining === minutes * 60

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-accent/20 pt-4">
      {untouched ? (
        <Chip onClick={start} strong>
          {t.timerStart(minutes)}
        </Chip>
      ) : (
        <>
          {/* Die laufenden Sekunden bleiben vor Screenreadern verborgen: Eine
              Anzeige, die sich viermal je Sekunde ändert, würde vorgelesen und
              wäre für eine stille Übung genau das Gegenteil. Angesagt wird
              weiter unten nur, dass die Zeit um ist. */}
          <p
            aria-hidden
            className="tabular font-display text-[26px] leading-none font-semibold text-accent"
          >
            {clockOf(remaining)}
          </p>
          {done ? (
            <Chip onClick={start} strong>
              {t.timerStart(minutes)}
            </Chip>
          ) : (
            <>
              <Chip onClick={running ? pause : start} strong>
                {running ? t.timerPause : t.timerResume}
              </Chip>
              <Chip onClick={stop}>{t.timerStop}</Chip>
            </>
          )}
        </>
      )}

      <p role="status" className="text-[13px] text-muted">
        {done ? t.timerDone : ''}
      </p>
    </div>
  )
}
