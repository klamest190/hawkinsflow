import { describe, expect, it } from 'vitest'
import { levelsIn } from '../i18n/levels.ts'
import { actionCore, isPlans, sortedPlans } from './plans.ts'
import type { Language, Plan, Plans } from '../types.ts'

const LANGUAGES: Language[] = ['de', 'en']

/* Die Spanne, in der ein Vorschlag als Chip funktioniert. Die Skala liegt heute
   zwischen 9 („Übe Genug") und 83 Zeichen — die Grenzen lassen Luft, sollen
   aber auffallen, wenn ein neuer Schritt so gebaut ist, dass die Kürzung ihn
   auf einen Satzanfang zusammenstreicht oder gar nicht erst greift. */
const SHORTEST_CORE = 8
const LONGEST_CORE = 90

describe('actionCore', () => {
  it('kürzt auf den ersten Satzteil', () => {
    expect(actionCore('Trenne Tat und Person. Schreibe auf, was passiert ist.')).toBe(
      'Trenne Tat und Person',
    )
    expect(actionCore('Halte den Schwung: eine unbequeme Sache pro Woche.')).toBe(
      'Halte den Schwung',
    )
    expect(actionCore('Übe Genug: eine Woche ohne Neuanschaffung, und notiere, was war.')).toBe(
      'Übe Genug',
    )
    expect(actionCore('Practise letting go in small ways — not every resistance counts.')).toBe(
      'Practise letting go in small ways',
    )
  })

  it('lässt einen Schritt ohne Trennzeichen unverändert', () => {
    expect(actionCore('Bitte diese Woche um echte Hilfe')).toBe('Bitte diese Woche um echte Hilfe')
  })

  /* Ein zu kurzer Rest wäre als Vorschlag wertlos („Frag" statt „Frag nach
     Hilfe"). Dann steht lieber der ganze Schritt da. */
  it('fällt bei einem zu kurzen Rest auf den ganzen Schritt zurück', () => {
    expect(actionCore('Geh los. Und zwar heute.')).toBe('Geh los. Und zwar heute.')
  })

  /* Der eigentliche Zweck des Tests: Die Vorschläge im Formular kommen aus den
     Schritten aller 17 Ebenen. Wenn dort einer so formuliert ist, dass die
     Kürzung Unsinn ergibt, soll das hier auffallen und nicht im Ergebnis. */
  it.each(LANGUAGES)('liefert für jeden Schritt der Skala einen brauchbaren Kern (%s)', (language) => {
    for (const level of levelsIn(language)) {
      for (const step of level.steps) {
        const core = actionCore(step)
        expect(core.length, `${level.id}: ${step}`).toBeGreaterThanOrEqual(SHORTEST_CORE)
        expect(core.length, `${level.id}: ${step}`).toBeLessThanOrEqual(LONGEST_CORE)
        expect(core, `${level.id}: ${step}`).toBe(core.trim())
      }
    }
  })
})

describe('isPlans', () => {
  const valid: Plans = {
    courage: { level: 'courage', when: 'A', then: 'B', created: '2026-01-01T00:00:00.000Z' },
  }

  it('nimmt an, was die App selbst schreibt', () => {
    expect(isPlans({})).toBe(true)
    expect(isPlans(valid)).toBe(true)
  })

  it('weist zurück, was von Hand kaputtgemacht wurde', () => {
    expect(isPlans(null)).toBe(false)
    expect(isPlans([])).toBe(false)
    expect(isPlans('courage')).toBe(false)
    expect(isPlans({ courage: { level: 'courage', when: 'A' } })).toBe(false)
    expect(isPlans({ courage: { level: 'courage', when: 1, then: 'B', created: 'x' } })).toBe(false)
  })
})

describe('sortedPlans', () => {
  const older: Plan = { level: 'fear', when: 'A', then: 'B', created: '2026-01-01T00:00:00.000Z' }
  const middle: Plan = { level: 'anger', when: 'C', then: 'D', created: '2026-02-01T00:00:00.000Z' }
  const newer: Plan = { level: 'courage', when: 'E', then: 'F', created: '2026-03-01T00:00:00.000Z' }

  /* Die Reihenfolge im Objekt ist die des Einfügens und sagt nichts über das
     Alter — deshalb beide Richtungen. */
  it('gibt den zuletzt angelegten zuerst', () => {
    expect(sortedPlans({ fear: older, anger: middle, courage: newer })).toEqual([
      newer,
      middle,
      older,
    ])
    expect(sortedPlans({ courage: newer, fear: older, anger: middle })).toEqual([
      newer,
      middle,
      older,
    ])
  })

  it('gibt ohne Plan eine leere Liste zurück', () => {
    expect(sortedPlans({})).toEqual([])
  })
})
