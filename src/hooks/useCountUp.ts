import { useEffect, useState } from 'react'

/**
 * Zählt beim Erscheinen von 0 auf den Zielwert. Die Kalibrierung ist die
 * Pointe der Auswertung — sie soll ankommen, nicht einfach dastehen.
 *
 * Über requestAnimationFrame statt setInterval: die Schleife läuft im Takt des
 * Displays und pausiert von selbst, wenn der Tab in den Hintergrund geht.
 */
export function useCountUp(target: number, duration = 1100): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    // Wer Bewegung reduziert haben will, bekommt keine eigene Abkürzung,
    // sondern eine Dauer von null: der erste Frame steht dann schon auf dem
    // Zielwert (die Division ergibt Infinity und wird auf 1 gedeckelt).
    const span = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : duration

    let frame = 0
    const start = performance.now()

    function step(now: number) {
      const progress = Math.min((now - start) / span, 1)
      // Sanft auslaufend — die letzten Zahlen sollen sich setzen, nicht abbrechen.
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}
