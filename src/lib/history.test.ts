import { describe, expect, it } from 'vitest'
import { levelsIn } from '../i18n/levels.ts'
import type { History, HistoryEntry } from '../types.ts'
import { itemAt } from './array.ts'
import { clockOf } from './clock.ts'
import { RETURN_AFTER_DAYS, appendRun, dueRun, editionBreak, isHistory, rankAt } from './history.ts'

const levels = levelsIn('de')

function run(taken: string, calibration: number): HistoryEntry {
  return { taken, level: 'courage', calibration, answered: 34 }
}

describe('appendRun', () => {
  it('hängt einen Durchgang hinten an', () => {
    const history = appendRun([run('2026-01-01T09:00:00.000Z', 200)], run('2026-02-01T09:00:00.000Z', 250))

    expect(history).toHaveLength(2)
    expect(history.at(-1)?.calibration).toBe(250)
  })

  it('ersetzt den letzten, wenn er aus derselben Sitzung stammt', () => {
    /* Denselben Nachmittag zweimal abzuschließen — Ergebnis ansehen, zurück,
       noch einmal durchklicken — ist ein Durchgang und nicht zwei. */
    const history = appendRun(
      [run('2026-01-01T09:00:00.000Z', 200)],
      run('2026-01-01T09:04:00.000Z', 210),
    )

    expect(history).toHaveLength(1)
    expect(itemAt(history, 0).calibration).toBe(210)
  })

  it('behält höchstens vierundzwanzig Durchgänge', () => {
    let history: History = []
    for (let month = 0; month < 40; month++) {
      // Ein Durchgang pro Tag, damit keiner als dieselbe Sitzung gilt.
      const day = String((month % 28) + 1).padStart(2, '0')
      const year = 2020 + Math.floor(month / 12)
      history = appendRun(history, run(`${year}-01-${day}T09:00:00.000Z`, 100 + month))
    }

    expect(history).toHaveLength(24)
    // Gekappt wird vorn: der jüngste Eintrag bleibt in jedem Fall stehen.
    expect(history.at(-1)?.calibration).toBe(139)
  })
})

describe('rankAt', () => {
  it('gibt einer Ebene genau ihren Rang', () => {
    expect(rankAt(levels, 20)).toBe(0)
    expect(rankAt(levels, 200)).toBe(8)
    expect(rankAt(levels, 700)).toBe(16)
  })

  it('interpoliert zwischen zwei Ebenen', () => {
    // 225 liegt genau zwischen Mut (200) und Neutralität (250).
    expect(rankAt(levels, 225)).toBeCloseTo(8.5)
  })

  it('bleibt an beiden Enden im Rahmen', () => {
    expect(rankAt(levels, 0)).toBe(0)
    expect(rankAt(levels, 5000)).toBe(16)
  })
})

describe('isHistory', () => {
  it('nimmt an, was aus der App kommt', () => {
    expect(isHistory([run('2026-01-01T09:00:00.000Z', 200)])).toBe(true)
    expect(isHistory([])).toBe(true)
  })

  it('weist zurück, was von Hand im Speicher stand', () => {
    expect(isHistory(null)).toBe(false)
    expect(isHistory({ taken: 'heute' })).toBe(false)
    expect(isHistory([{ taken: '2026-01-01', level: 'courage' }])).toBe(false)
    // Eine Zahl, die keine ist, würde die Linie ins Nichts zeichnen.
    expect(isHistory([{ ...run('2026-01-01T09:00:00.000Z', 200), calibration: NaN }])).toBe(false)
  })

  it('accepts runs with and without an edition', () => {
    expect(isHistory([run('2026-01-01T09:00:00.000Z', 200), { ...run('2026-02-01T09:00:00.000Z', 210), edition: 2 }])).toBe(true)
  })

  it('rejects an edition that is not a whole number from 1 up', () => {
    for (const edition of [0, 1.5, '2', null]) {
      expect(isHistory([{ ...run('2026-01-01T09:00:00.000Z', 200), edition }]), String(edition)).toBe(false)
    }
  })
})

describe('editionBreak', () => {
  it('finds nothing while every run answered the same questions', () => {
    expect(editionBreak([])).toBeNull()
    expect(editionBreak([run('2026-01-01T09:00:00.000Z', 200), run('2026-02-01T09:00:00.000Z', 210)])).toBeNull()
  })

  it('counts a run without an edition as edition 1', () => {
    const history = [
      run('2026-01-01T09:00:00.000Z', 200),
      { ...run('2026-02-01T09:00:00.000Z', 210), edition: 1 },
    ]
    expect(editionBreak(history)).toBeNull()
  })

  it('names the first run on the new questions', () => {
    const first = { ...run('2026-03-01T09:00:00.000Z', 220), edition: 2 }
    const history = [
      run('2026-01-01T09:00:00.000Z', 200),
      run('2026-02-01T09:00:00.000Z', 210),
      first,
      { ...run('2026-04-01T09:00:00.000Z', 230), edition: 2 },
    ]
    expect(editionBreak(history)).toBe(first)
  })
})

describe('clockOf', () => {
  it('schreibt Minuten und Sekunden', () => {
    expect(clockOf(120)).toBe('2:00')
    expect(clockOf(59)).toBe('0:59')
    expect(clockOf(605)).toBe('10:05')
  })

  it('bleibt bei null stehen', () => {
    expect(clockOf(0)).toBe('0:00')
    expect(clockOf(-3)).toBe('0:00')
  })
})

describe('dueRun', () => {
  const run: HistoryEntry = { taken: '2026-09-01T09:00:00.000Z', level: 'courage', calibration: 214, answered: 34 }
  const daysLater = (days: number): Date => new Date(Date.parse(run.taken) + days * 86_400_000)

  it('stays quiet without a run', () => {
    expect(dueRun([], daysLater(400))).toBeNull()
  })

  it('stays quiet while the last run is recent', () => {
    expect(dueRun([run], daysLater(RETURN_AFTER_DAYS - 1))).toBeNull()
  })

  it('speaks up from three weeks on, with the whole days since', () => {
    expect(dueRun([run], daysLater(RETURN_AFTER_DAYS))).toEqual({ run, days: RETURN_AFTER_DAYS })
  })

  it('looks only at the last run', () => {
    const older: HistoryEntry = { ...run, taken: '2026-01-01T09:00:00.000Z' }
    expect(dueRun([older, run], daysLater(5))).toBeNull()
  })
})
