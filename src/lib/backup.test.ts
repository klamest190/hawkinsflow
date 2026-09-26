import { describe, expect, it } from 'vitest'
import { copy } from '../i18n/copy.ts'
import type { History, Plan } from '../types.ts'
import {
  BACKUP_VERSION,
  backupBlob,
  backupFileName,
  hasData,
  parseBackup,
  toBackup,
  type BackupData,
} from './backup.ts'
import { KEEP as HISTORY_KEEP } from './history.ts'

const plan: Plan = {
  level: 'courage',
  when: 'ich merke, dass ich im Meeting nichts sage',
  then: 'sage ich den nächsten Satz trotzdem',
  created: '2026-01-01T00:00:00.000Z',
}

const data: BackupData = {
  answers: { q01: 3, q02: 0 },
  plans: { courage: plan },
  history: [{ taken: '2026-02-15T09:00:00.000Z', level: 'courage', calibration: 214, answered: 34 }],
  moments: [{ taken: '2026-03-01T15:45:00.000Z', level: 'anger' }],
}

const empty: BackupData = { answers: {}, plans: {}, history: [], moments: [] }

const when = new Date(2026, 8, 26, 10, 30)

/** A backup as it would sit in a file, with one field swapped out. */
function fileWith(changes: Record<string, unknown>): string {
  return JSON.stringify({ ...toBackup(data, when), ...changes })
}

describe('parseBackup', () => {
  it('reads back exactly what was saved', async () => {
    const text = await backupBlob(toBackup(data, when)).text()
    const parsed = parseBackup(text)
    expect(parsed.ok).toBe(true)
    if (parsed.ok) {
      const { answers, plans, history, moments } = parsed.backup
      expect({ answers, plans, history, moments }).toEqual(data)
    }
  })

  it('refuses what is not a backup of this app', () => {
    for (const text of ['', 'not json', '[]', 'null', '{"app":"workify","version":1}']) {
      expect(parseBackup(text), text).toEqual({ ok: false, reason: 'invalid' })
    }
  })

  it('refuses a backup with a part that fails its guard', () => {
    expect(parseBackup(fileWith({ answers: { q01: 7 } })).ok).toBe(false)
    expect(parseBackup(fileWith({ plans: { courage: { level: 'courage' } } })).ok).toBe(false)
    expect(parseBackup(fileWith({ history: [{ taken: 'x' }] })).ok).toBe(false)
    // A moment above the threshold cannot come out of the moment flow.
    expect(parseBackup(fileWith({ moments: [{ taken: 'x', level: 'joy' }] })).ok).toBe(false)
    expect(parseBackup(fileWith({ exported: 'yesterday' })).ok).toBe(false)
  })

  it('tells a backup from a newer version apart', () => {
    expect(parseBackup(fileWith({ version: BACKUP_VERSION + 1 }))).toEqual({ ok: false, reason: 'newer' })
  })

  it('cuts an edited history down to what the app keeps', () => {
    const long: History = Array.from({ length: HISTORY_KEEP + 5 }, (_, day) => ({
      taken: new Date(2026, 0, day + 1).toISOString(),
      level: 'courage',
      calibration: 200,
      answered: 34,
    }))
    const parsed = parseBackup(fileWith({ history: long }))
    expect(parsed.ok && parsed.backup.history).toEqual(long.slice(-HISTORY_KEEP))
  })
})

describe('backup helpers', () => {
  it('names the file by the local date', () => {
    expect(backupFileName(when)).toBe('2026-09-26_Hawkins-Flow_Backup.json')
  })

  it('knows when there is nothing to save', () => {
    expect(hasData(empty)).toBe(false)
    expect(hasData({ ...empty, answers: { q01: 0 } })).toBe(true)
    expect(hasData(data)).toBe(true)
  })
})

describe('the confirmation lists what a backup holds', () => {
  it('in German', () => {
    const t = copy.de
    expect(t.dataContents(2, 1, 7, 0)).toBe('2 Durchgänge, einen Plan und 7 Momente')
    expect(t.dataContents(1, 0, 0, 20)).toBe('einen Durchgang und Antworten auf 20 Aussagen')
    expect(t.dataContents(0, 3, 0, 0)).toBe('3 Pläne')
    expect(t.dataContents(0, 0, 0, 0)).toBe('keine Einträge')
  })

  it('in English', () => {
    const t = copy.en
    expect(t.dataContents(2, 1, 7, 0)).toBe('2 runs, one plan and 7 moments')
    expect(t.dataContents(0, 0, 1, 1)).toBe('one moment and the answer to one statement')
    expect(t.dataContents(0, 0, 0, 0)).toBe('nothing at all')
  })
})
