import { KEEP as HISTORY_KEEP, isHistory } from './history.ts'
import { localDay } from './download.ts'
import { KEEP as MOMENTS_KEEP, isMoments } from './moments.ts'
import { isPlans } from './plans.ts'
import { isAnswers } from './scoring.ts'
import { KEYS, load } from './storage.ts'
import type { Answers, History, Moments, Plans } from '../types.ts'

/* A backup of everything this app keeps, as one JSON file.
 *
 * Why it exists: history, plans and moments live in exactly one browser
 * profile. iOS Safari clears the storage of a site that hasn't been opened for
 * seven days unless it is installed, and a new phone or a cleared browser
 * takes all of it without a word — the history, which only becomes a line
 * from the second run on, and the plans, the one thing here the person wrote
 * themselves.
 *
 * Restoring *replaces* what is on the device instead of merging: two histories
 * of the same person on two devices are a rare case, and merging them raises
 * more questions (which plan wins? which run is a duplicate?) than it answers.
 * The screen says what will be replaced before anything is.
 */

/** Everything the backup carries, in the shapes the hooks hold. */
export type BackupData = {
  answers: Answers
  plans: Plans
  history: History
  moments: Moments
}

/** Raised whenever the shape changes; a file from a newer app is refused. */
export const BACKUP_VERSION = 1

export type Backup = BackupData & {
  app: 'hawkinsflow'
  version: typeof BACKUP_VERSION
  /** ISO time of the export. */
  exported: string
}

export function toBackup(data: BackupData, when: Date): Backup {
  return { app: 'hawkinsflow', version: BACKUP_VERSION, exported: when.toISOString(), ...data }
}

/** Why a file can't be restored: not ours at all, or from a newer version. */
export type BackupRefusal = 'invalid' | 'newer'

export type ParsedBackup = { ok: true; backup: Backup } | { ok: false; reason: BackupRefusal }

/**
 * Reads a backup file's text. Every part goes through the same guard that
 * checks it when it comes out of storage — a file is no more trustworthy than
 * a hand-edited storage entry.
 *
 * History and moments are cut to the length the app keeps, so an edited file
 * can't grow them past it.
 */
export function parseBackup(text: string): ParsedBackup {
  let value: unknown
  try {
    value = JSON.parse(text)
  } catch {
    return { ok: false, reason: 'invalid' }
  }

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return { ok: false, reason: 'invalid' }
  }

  const file = value as Partial<Record<keyof Backup, unknown>>
  if (file.app !== 'hawkinsflow' || typeof file.version !== 'number') {
    return { ok: false, reason: 'invalid' }
  }
  if (file.version > BACKUP_VERSION) return { ok: false, reason: 'newer' }

  if (
    file.version !== BACKUP_VERSION ||
    typeof file.exported !== 'string' ||
    Number.isNaN(Date.parse(file.exported)) ||
    !isAnswers(file.answers) ||
    !isPlans(file.plans) ||
    !isHistory(file.history) ||
    !isMoments(file.moments)
  ) {
    return { ok: false, reason: 'invalid' }
  }

  return {
    ok: true,
    backup: {
      app: 'hawkinsflow',
      version: BACKUP_VERSION,
      exported: file.exported,
      answers: file.answers,
      plans: file.plans,
      history: file.history.slice(-HISTORY_KEEP),
      moments: file.moments.slice(-MOMENTS_KEEP),
    },
  }
}

/** Straight from storage — for the crash screen, which has no hooks to ask. */
export function readStoredData(): BackupData {
  return {
    answers: load(KEYS.answers, isAnswers) ?? {},
    plans: load(KEYS.plans, isPlans) ?? {},
    history: load(KEYS.history, isHistory) ?? [],
    moments: load(KEYS.moments, isMoments) ?? [],
  }
}

/** Whether there is anything worth saving. */
export function hasData(data: BackupData): boolean {
  return (
    Object.keys(data.answers).length > 0 ||
    Object.keys(data.plans).length > 0 ||
    data.history.length > 0 ||
    data.moments.length > 0
  )
}

/** `2026-09-26_Hawkins-Flow_Backup.json` — sorts by date in any file list. */
export function backupFileName(when: Date): string {
  return `${localDay(when)}_Hawkins-Flow_Backup.json`
}

export function backupBlob(backup: Backup): Blob {
  // Indented: the file is small, and a person opening it should be able to
  // read their own plans in it.
  return new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
}
