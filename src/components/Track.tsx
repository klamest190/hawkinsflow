import { useEffect, useRef, useState } from 'react'
import type { Copy } from '../i18n/copy.ts'
import { clockOf } from '../lib/clock.ts'
import type { TrackId } from '../types.ts'
import { Chip } from './Timer.tsx'

type TrackProps = {
  track: TrackId
  t: Copy
}

type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'failed'

/* Ten milliseconds of silence, as a WAV. Played inside the first tap, it
   unlocks the audio element for the recording that follows — see `play`. */
const SILENCE =
  'data:audio/wav;base64,UklGRnQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA=='

/**
 * A guided meditation: play, pause, a place in the recording, and the time.
 *
 * The file is fetched whole on the first play and played from memory, not
 * streamed. Streaming asks for ranges, and the service worker can't keep a
 * partial answer — the recording would never be there offline, and offline
 * is where a sitting practice is most often done. Fetched whole, the answer
 * is a plain one the worker keeps (see `vite.config.ts`), and from then on
 * it plays without a network. The price is a few seconds' wait the first
 * time, which the button says.
 *
 * Nothing is loaded before the first tap: a recording is megabytes, and most
 * people who open a level don't play it.
 */
export function Track({ track, t }: TrackProps) {
  const { title, file } = t.tracks[track]
  const audio = useRef<HTMLAudioElement>(null)
  /** The object URL of the fetched recording; null until the first play. */
  const source = useRef<string | null>(null)
  const mounted = useRef(true)
  /** True while the silent clip plays; its events are not the recording's. */
  const priming = useRef(false)
  const [status, setStatus] = useState<Status>('idle')
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState<number | null>(null)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (source.current !== null) URL.revokeObjectURL(source.current)
    }
  }, [])

  /** Fetches the recording once. False when it can't be had. */
  async function load(): Promise<boolean> {
    if (source.current !== null) return true

    setStatus('loading')
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}${file}`)
      if (!response.ok) throw new Error(`${response.status}`)
      const blob = await response.blob()
      // Left the view while it loaded: nothing to play it in.
      if (!mounted.current) return false
      source.current = URL.createObjectURL(blob)
      return true
    } catch {
      if (mounted.current) setStatus('failed')
      return false
    }
  }

  /**
   * Browsers only start sound in answer to a tap, and a tap counts for a few
   * seconds at most — on iOS, only within the handler itself. The first play
   * has to fetch the recording first, which can take longer on a phone
   * network. So the tap starts a silent clip at once, inside the handler:
   * that unlocks this element, and the recording may start on it once it has
   * arrived.
   */
  function play() {
    const element = audio.current
    if (element === null) return

    if (source.current !== null) {
      if (status === 'ended') element.currentTime = 0
      element.play().catch(() => setStatus('failed'))
      return
    }

    priming.current = true
    element.src = SILENCE
    // Interrupted by the recording's load below, by design.
    element.play().catch(() => {})

    void load().then((ready) => {
      priming.current = false
      if (!ready || source.current === null) return
      element.src = source.current
      element.play().catch(() => setStatus('failed'))
    })
  }

  /* The lock screen and the headphones' buttons name what is playing. Not
     every browser has the media session; where it is missing, nothing is lost. */
  function announce() {
    if ('mediaSession' in navigator && typeof MediaMetadata !== 'undefined') {
      navigator.mediaSession.metadata = new MediaMetadata({ title, artist: t.appName })
    }
  }

  const playing = status === 'playing'
  const label = playing
    ? t.trackPause
    : status === 'paused'
      ? t.trackResume
      : status === 'ended'
        ? t.trackAgain
        : t.trackPlay

  return (
    <div className="mt-5 flex flex-col gap-3 border-t border-accent/20 pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-display text-[15px] font-semibold text-text">{title}</p>
        {duration !== null && <p className="tabular text-[12px] text-muted">{clockOf(duration)}</p>}
      </div>

      <input
        type="range"
        min={0}
        max={duration ?? 0}
        step={1}
        value={Math.min(time, duration ?? 0)}
        disabled={duration === null}
        onChange={(event) => {
          const at = Number(event.target.value)
          if (audio.current !== null) audio.current.currentTime = at
          setTime(at)
        }}
        aria-label={t.trackSeek}
        aria-valuetext={t.trackPosition(clockOf(time), clockOf(duration ?? 0))}
        className="w-full cursor-pointer accent-accent-ink disabled:cursor-default disabled:opacity-40"
      />

      {/* The main chip keeps its place through every state, as in `Breath`. */}
      <div className="flex flex-wrap items-center gap-3">
        <Chip onClick={playing ? () => audio.current?.pause() : play} strong>
          {label}
        </Chip>
        {duration !== null && (
          <span aria-hidden className="tabular text-[13px] text-muted">
            {clockOf(time)} / {clockOf(duration)}
          </span>
        )}
        <p role="status" className="empty:hidden text-[13px] text-text/90">
          {status === 'loading' ? t.trackLoading : status === 'failed' ? t.trackFailed : ''}
        </p>
      </div>

      <p className="text-[12px] leading-relaxed text-muted">{t.trackNote}</p>

      {/* No captions track: what the voice says is the practice text above
          it, which stands on the page for anyone who can't hear it. */}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audio}
        preload="none"
        onPlay={() => {
          if (priming.current) return
          setStatus('playing')
          announce()
        }}
        onPause={() => {
          if (!priming.current) setStatus((previous) => (previous === 'ended' ? previous : 'paused'))
        }}
        onEnded={() => {
          if (!priming.current) setStatus('ended')
        }}
        onTimeUpdate={(event) => {
          if (!priming.current) setTime(event.currentTarget.currentTime)
        }}
        onLoadedMetadata={(event) => {
          if (priming.current) return
          const length = event.currentTarget.duration
          setDuration(Number.isFinite(length) ? length : null)
        }}
        onError={() => {
          if (!priming.current && source.current !== null) setStatus('failed')
        }}
      />
    </div>
  )
}
