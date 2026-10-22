import { useCallback, useEffect, useRef, useState } from 'react'
import { cycleOf } from '../lib/breath.ts'
import type { BreathPattern } from '../types.ts'

/**
 * The clock behind a breathing session: seconds since the start, at frame
 * rate, so the shape on screen moves smoothly.
 *
 * Like `useCountdown`, it goes by the clock and not by counting frames — see
 * `breathAt`. Unlike it, a hidden tab pauses the session: nobody can follow a
 * shape they can't see, and on return it would jump mid-breath. The session
 * waits instead, and resumes where it stopped.
 *
 * `pattern` and `rounds` are taken once, as in `useCountdown`; a different
 * length is a different `key`.
 */
export function useBreath(pattern: BreathPattern, rounds: number) {
  const total = cycleOf(pattern) * rounds
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  /** `performance.now()` at which `elapsed` was 0 — moved on every resume. */
  const origin = useRef(0)

  useEffect(() => {
    if (!running) return

    let frame = 0
    const tick = () => {
      const seconds = Math.min(total, (performance.now() - origin.current) / 1000)
      setElapsed(seconds)
      if (seconds >= total) setRunning(false)
      else frame = requestAnimationFrame(tick)
    }
    const onVisibility = () => {
      if (document.hidden) setRunning(false)
    }

    frame = requestAnimationFrame(tick)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [running, total])

  const start = useCallback(() => {
    setElapsed((from) => {
      // After the last round, a start begins again from the first.
      const at = from >= total ? 0 : from
      origin.current = performance.now() - at * 1000
      return at
    })
    setRunning(true)
  }, [total])

  const pause = useCallback(() => setRunning(false), [])

  const stop = useCallback(() => {
    setRunning(false)
    setElapsed(0)
  }, [])

  return {
    /** Seconds since the start, 0 … `total`. */
    elapsed,
    total,
    running,
    /** The last round is over. */
    done: elapsed >= total,
    start,
    pause,
    stop,
  }
}
