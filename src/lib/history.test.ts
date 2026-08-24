import { describe, expect, it } from 'vitest'
import { levelsIn } from '../i18n/levels.ts'
import type { History, HistoryEntry } from '../types.ts'
import { clockOf } from './clock.ts'
import { appendRun, isHistory, rankAt } from './history.ts'

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
    expect(history[0].calibration).toBe(210)
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
