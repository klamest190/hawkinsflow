import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void): () => void {
  const list = window.matchMedia(QUERY)
  list.addEventListener('change', onChange)
  return () => list.removeEventListener('change', onChange)
}

/**
 * Whether the person asked their system for less motion.
 *
 * `index.css` already stops every CSS animation for them. What it can't reach
 * is motion set from script, frame by frame — the breathing shape. That one
 * asks here.
 *
 * Without a window (the render test), there is no preference to read: false.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
