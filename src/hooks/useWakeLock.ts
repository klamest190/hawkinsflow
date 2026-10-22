import { useEffect } from 'react'

/**
 * Keeps the screen on while `active` — a guided session is one where nobody
 * touches the phone, and a screen that goes dark puts the page to sleep:
 * the tones of the next step would not sound.
 *
 * The browser drops the lock whenever the page is hidden, so it is asked for
 * again on every return. Where there is no wake lock, nothing happens, and
 * the session still works with the screen on.
 */
export function useWakeLock(active: boolean): void {
  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return

    let lock: WakeLockSentinel | null = null
    let ended = false

    const request = () => {
      navigator.wakeLock
        .request('screen')
        .then((sentinel) => {
          if (ended) void sentinel.release()
          else lock = sentinel
        })
        .catch(() => {
          /* Refused — low battery, or no permission. The session goes on. */
        })
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') request()
    }

    request()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      ended = true
      document.removeEventListener('visibilitychange', onVisibility)
      void lock?.release().catch(() => {})
    }
  }, [active])
}
