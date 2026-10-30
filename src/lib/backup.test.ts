import { describe, expect, it } from 'vitest'
import { copy } from '../i18n/copy.ts'
import type { Decision, History, Plan } from '../types.ts'
import {
  BACKUP_VERSION,
  backupBlob,
  backupFileName,
  hasData,
  parseBackup,
  toBackup,
  type BackupData,
} from './backup.ts'
import { KEEP as DECISIONS_KEEP } from './decisions.ts'
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
  checkins: [{ at: '2026-03-02T08:00:00.000Z', level: 'neutrality' }],
  notes: [
    {
      at: '2026-03-03T20:00:00.000Z',
      level: 'courage',
      answers: [{ prompt: 'Was kostet dich Kraft?', text: 'Das Projekt.' }],
    },
  ],
  decisions: [
    {
      id: 'd1',
      day: '2026-03-04',
      at: '2026-03-04T09:00:00.000Z',
      belief: 'Ich muss alles allein schaffen.',
      decision: 'Ich bitte um Hilfe.',
      evidence: 'Letzte Woche hat es geholfen.',
    },
  ],
}

const empty: BackupData = { answers: {}, plans: {}, history: [], moments: [], checkins: [], notes: [], decisions: [] }

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
      const { answers, plans, history, moments, checkins, notes, decisions } = parsed.backup
      expect({ answers, plans, history, moments, checkins, notes, decisions }).toEqual(data)
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
    expect(parseBackup(fileWith({ checkins: [{ at: 'x', level: 'courage' }] })).ok).toBe(false)
    expect(parseBackup(fileWith({ notes: [{ at: 'x', level: 'courage', answers: [] }] })).ok).toBe(false)
  })

  /* Check-ins came after the first backups. A file from before them must
     still load — with none — or every backup made so far would be refused. */
  it('loads a backup from before the check-ins and entries, with none', () => {
    const { checkins: _, notes: __, ...before } = toBackup(data, when)
    const parsed = parseBackup(JSON.stringify(before))
    expect(parsed.ok).toBe(true)
    expect(parsed.ok && parsed.backup.checkins).toEqual([])
    expect(parsed.ok && parsed.backup.notes).toEqual([])
    expect(parsed.ok && parsed.backup.history).toEqual(data.history)
  })

  it('reads a file from before the matrix as having none', () => {
    const parsed = parseBackup(fileWith({ decisions: undefined }))
    expect(parsed.ok).toBe(true)
    expect(parsed.ok && parsed.backup.decisions).toEqual([])
  })

  it('refuses a file whose decisions fail their guard', () => {
    expect(parseBackup(fileWith({ decisions: [{ id: 'x' }] }))).toEqual({ ok: false, reason: 'invalid' })
  })

  it('cuts restored decisions to what the app keeps', () => {
    const [one] = data.decisions
    const many: Decision[] = Array.from({ length: DECISIONS_KEEP + 1 }, (_, index) => ({
      ...(one as Decision),
      id: 'd' + index,
    }))
    const parsed = parseBackup(fileWith({ decisions: many }))
    expect(parsed.ok && parsed.backup.decisions.length).toBe(DECISIONS_KEEP)
  })

  it('keeps the backup version', () => {
    expect(BACKUP_VERSION).toBe(1)
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
    expect(hasData({ ...empty, checkins: data.checkins })).toBe(true)
    expect(hasData({ ...empty, notes: data.notes })).toBe(true)
    expect(hasData({ ...empty, decisions: data.decisions })).toBe(true)
    expect(hasData(data)).toBe(true)
  })
})

describe('the confirmation lists what a backup holds', () => {
  const none = { runs: 0, plans: 0, moments: 0, days: 0, notes: 0, decisions: 0, answers: 0 }

  it('in German', () => {
    const t = copy.de
    expect(t.dataContents({ ...none, runs: 2, plans: 1, moments: 7 })).toBe('2 Durchgänge, einen Plan und 7 Momente')
    expect(t.dataContents({ ...none, runs: 1, answers: 20 })).toBe('einen Durchgang und Antworten auf 20 Aussagen')
    expect(t.dataContents({ ...none, plans: 3 })).toBe('3 Pläne')
    expect(t.dataContents({ ...none, days: 12 })).toBe('12 Tageseinträge')
    expect(t.dataContents({ ...none, days: 1, notes: 2 })).toBe('einen Tageseintrag und 2 Schreibeinträge')
    expect(t.dataContents({ ...none, notes: 1, decisions: 2 })).toBe('einen Schreibeintrag und 2 Matrix-Einträge')
    expect(t.dataContents({ ...none, decisions: 1 })).toBe('einen Matrix-Eintrag')
    expect(t.dataContents(none)).toBe('keine Einträge')
  })

  it('in English', () => {
    const t = copy.en
    expect(t.dataContents({ ...none, runs: 2, plans: 1, moments: 7 })).toBe('2 runs, one plan and 7 moments')
    expect(t.dataContents({ ...none, moments: 1, answers: 1 })).toBe('one moment and the answer to one statement')
    expect(t.dataContents({ ...none, days: 1 })).toBe('one daily entry')
    expect(t.dataContents(none)).toBe('nothing at all')
  })
})
