import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import type { Copy } from '../i18n/copy.ts'
import {
  backupBlob,
  backupFileName,
  hasData,
  parseBackup,
  toBackup,
  type Backup,
  type BackupData,
  type BackupRefusal,
} from '../lib/backup.ts'
import { deliver } from '../lib/download.ts'
import type { Language } from '../types.ts'
import { Button } from './Button.tsx'

type DataCardProps = {
  data: BackupData
  language: Language
  t: Copy
  onRestore: (data: BackupData) => void
}

type Status =
  | { kind: 'idle' }
  | { kind: 'saving' }
  | { kind: 'saveFailed' }
  | { kind: 'refused'; reason: BackupRefusal }
  | { kind: 'confirm'; backup: Backup }
  | { kind: 'restored' }

/**
 * Saving everything to a file and bringing it back — see `lib/backup.ts` for
 * why this exists. A quiet card at the foot of the start page: saving is
 * something to do now and then, not a call to action on every visit.
 *
 * Restoring never happens on the file pick alone. The card first says what
 * the file holds and that it replaces what is here, and waits for a second tap.
 */
export function DataCard({ data, language, t, onRestore }: DataCardProps) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const picker = useRef<HTMLInputElement>(null)
  const question = useRef<HTMLParagraphElement>(null)
  const filled = hasData(data)

  // The confirmation replaces nothing on screen, but a screen reader would not
  // notice it appeared below the buttons; it gets the reading point.
  useEffect(() => {
    if (status.kind === 'confirm') question.current?.focus()
  }, [status.kind])

  async function save() {
    setStatus({ kind: 'saving' })
    const now = new Date()
    try {
      await deliver(backupBlob(toBackup(data, now)), backupFileName(now))
      setStatus({ kind: 'idle' })
    } catch {
      setStatus({ kind: 'saveFailed' })
    }
  }

  async function pick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    // Cleared at once, so picking the same file again still fires a change.
    event.target.value = ''
    if (file === undefined) return

    let text: string
    try {
      text = await file.text()
    } catch {
      setStatus({ kind: 'refused', reason: 'invalid' })
      return
    }

    const parsed = parseBackup(text)
    setStatus(parsed.ok ? { kind: 'confirm', backup: parsed.backup } : { kind: 'refused', reason: parsed.reason })
  }

  function restore(backup: Backup) {
    const { answers, plans, history, moments } = backup
    onRestore({ answers, plans, history, moments })
    setStatus({ kind: 'restored' })
  }

  return (
    <section className="mt-10 w-full rounded-2xl border border-line/70 bg-card/40 p-5 text-left backdrop-blur-sm">
      <h2 className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{t.dataTitle}</h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
        {filled ? t.dataLead : t.dataLeadEmpty}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {filled && (
          <Button variant="ghost" size="sm" onClick={save} disabled={status.kind === 'saving'}>
            {t.dataExport}
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={() => picker.current?.click()}>
          {t.dataImport}
        </Button>
        {/* The real picker, out of sight: a file input can't be styled into
            the app's buttons, so the button above opens it. */}
        <input
          ref={picker}
          type="file"
          accept=".json,application/json"
          className="hidden"
          tabIndex={-1}
          aria-hidden
          onChange={pick}
        />
      </div>

      {status.kind === 'confirm' && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line bg-void/40 p-4">
          <p ref={question} tabIndex={-1} className="text-[14px] leading-relaxed text-text/90 focus:outline-none">
            {t.dataConfirm(
              new Intl.DateTimeFormat(language, { dateStyle: 'long' }).format(new Date(status.backup.exported)),
              t.dataContents(
                status.backup.history.length,
                Object.keys(status.backup.plans).length,
                status.backup.moments.length,
                Object.keys(status.backup.answers).length,
              ),
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" onClick={() => restore(status.backup)}>
              {t.dataReplace}
            </Button>
            <Button variant="quiet" onClick={() => setStatus({ kind: 'idle' })}>
              {t.dataCancel}
            </Button>
          </div>
        </div>
      )}

      {/* Always in the tree, so the announcement is heard when it changes. */}
      <p role="status" className="empty:hidden mt-3 text-[13px] text-text/90">
        {status.kind === 'restored' ? t.dataRestored : ''}
      </p>
      <p role="alert" className="empty:hidden mt-3 text-[13px] text-text/90">
        {status.kind === 'saveFailed'
          ? t.dataExportFailed
          : status.kind === 'refused'
            ? status.reason === 'newer'
              ? t.dataNewer
              : t.dataInvalid
            : ''}
      </p>
    </section>
  )
}
