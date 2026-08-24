import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Ein Countdown, der nach der Uhr geht und nicht nach den Aufrufen.
 *
 * Ein Zähler, der bei jedem Tick eins abzieht, geht falsch, sobald der Browser
 * den Tab in den Hintergrund schiebt: `setInterval` wird dort gedrosselt, und
 * eine Zehn-Minuten-Übung wäre nach dem Zurückkommen noch bei acht. Deshalb
 * merkt sich der Haken den Zeitpunkt, an dem die Zeit *abläuft*, und rechnet die
 * Restzeit bei jedem Tick neu aus — das Intervall gibt nur den Takt der Anzeige
 * vor.
 *
 * `seconds` wird beim Anlegen genommen und danach nicht mehr beobachtet: Eine
 * Uhr, die mitten im Lauf ihre Länge ändert, ist keine Uhr mehr. Wer eine andere
 * Dauer braucht, gibt der Komponente ein anderes `key` — dann fängt sie als neue
 * an, und das ist genau das, was beim Blättern zur nächsten Übung passieren
 * soll.
 */
export function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  /** Wann die Zeit abläuft; null, solange die Uhr steht. */
  const deadline = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return

    const tick = window.setInterval(() => {
      const left = Math.max(0, ((deadline.current ?? 0) - Date.now()) / 1000)
      setRemaining(left)
      if (left <= 0) setRunning(false)
    }, 250)

    return () => window.clearInterval(tick)
  }, [running])

  const start = useCallback(() => {
    setRemaining((left) => {
      // Nach dem Ablaufen fängt ein Start wieder von vorn an, sonst läuft er da
      // weiter, wo angehalten wurde.
      const from = left <= 0 ? seconds : left
      deadline.current = Date.now() + from * 1000
      return from
    })
    setRunning(true)
  }, [seconds])

  const pause = useCallback(() => {
    setRunning(false)
    deadline.current = null
  }, [])

  const stop = useCallback(() => {
    setRunning(false)
    deadline.current = null
    setRemaining(seconds)
  }, [seconds])

  return {
    /** Restzeit in Sekunden. */
    remaining,
    running,
    /** Die Zeit ist abgelaufen — und die Uhr stand nicht von Anfang an still. */
    done: remaining <= 0 && seconds > 0,
    start,
    pause,
    stop,
  }
}
