import { useEffect, useRef, useState } from 'react'
import { LANGUAGE_KEY, detectLanguage } from '../hooks/useLanguage.ts'
import { crashCopy } from '../i18n/crash.ts'
import { clearAppData } from '../lib/storage.ts'
import { Button } from './Button.tsx'
import { Logo } from './Logo.tsx'

/**
 * What stands on screen when rendering has failed. `main.tsx` mounts it in
 * place of the whole app from React's `onUncaughtError` — without it, a throw
 * would leave the dark ground with its grain behind, and the app would look
 * alive while nothing responds.
 *
 * It depends on as little as possible: its own copy file, the language guess
 * and the button. No level data, no hooks with stored state.
 */
export function Crash() {
  const [language] = useState(detectLanguage)
  const [confirming, setConfirming] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const t = crashCopy[language]

  // The node that had focus is gone; a screen reader would otherwise sit on
  // nothing and never hear that the app failed.
  useEffect(() => {
    heading.current?.focus()
  }, [])

  function resetAndReload() {
    // The language is a choice, not data — it can't be what breaks the app.
    clearAppData([LANGUAGE_KEY])
    window.location.reload()
  }

  return (
    <div className="grain relative min-h-dvh" lang={language}>
      <main
        className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-20 text-center"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 5rem)' }}
      >
        <Logo className="h-14 w-14" />
        <h1
          ref={heading}
          tabIndex={-1}
          className="mt-7 font-display text-3xl font-bold tracking-[-0.02em] focus:outline-none"
        >
          {t.title}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">{t.lead}</p>

        <Button className="mt-8" onClick={() => window.location.reload()}>
          {t.reload}
        </Button>

        <div className="mt-14 w-full border-t border-line pt-6">
          {confirming ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-[14px] leading-relaxed text-text/90">{t.resetWarning}</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="ghost" onClick={resetAndReload}>
                  {t.resetConfirm}
                </Button>
                <Button variant="quiet" onClick={() => setConfirming(false)}>
                  {t.resetCancel}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <p className="text-[13px] text-muted">{t.resetOffer}</p>
              <Button variant="quiet" onClick={() => setConfirming(true)}>
                {t.resetStart}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
