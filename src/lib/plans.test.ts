import { describe, expect, it } from 'vitest'
import { levelsIn } from '../i18n/levels.ts'
import {
  CHECKS_KEEP,
  actionCore,
  checkTally,
  isPlans,
  reviewDue,
  revisedPlan,
  sortedPlans,
  withCheck,
  withoutKeyword,
} from './plans.ts'
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

  it('accepts check-ins and a revision date, and rejects broken ones', () => {
    const base = { level: 'courage', when: 'A', then: 'B', created: '2026-01-01T00:00:00.000Z' }
    const check = { at: '2026-01-08T00:00:00.000Z', verdict: 'partly' }
    expect(isPlans({ courage: { ...base, revised: '2026-01-05T00:00:00.000Z', checks: [check] } })).toBe(true)
    expect(isPlans({ courage: { ...base, checks: [] } })).toBe(true)
    expect(isPlans({ courage: { ...base, checks: [{ ...check, verdict: 'maybe' }] } })).toBe(false)
    expect(isPlans({ courage: { ...base, checks: [{ ...check, at: 'soon' }] } })).toBe(false)
    expect(isPlans({ courage: { ...base, checks: check } })).toBe(false)
    expect(isPlans({ courage: { ...base, revised: 5 } })).toBe(false)
  })
})

describe('withoutKeyword', () => {
  it('takes the label word off the front', () => {
    expect(withoutKeyword('Wenn ich ein Meeting verlasse', 'Wenn')).toBe('ich ein Meeting verlasse')
    expect(withoutKeyword('  wenn, ich wach werde', 'Wenn')).toBe('ich wach werde')
    expect(withoutKeyword('If I leave a meeting', 'If')).toBe('I leave a meeting')
    expect(withoutKeyword('dann schreibe ich', 'dann')).toBe('schreibe ich')
    expect(withoutKeyword('Then I write it down', 'then')).toBe('I write it down')
  })

  it('leaves words that only start the same way', () => {
    expect(withoutKeyword('Iffy mornings', 'If')).toBe('Iffy mornings')
    expect(withoutKeyword('Wenngleich müde', 'Wenn')).toBe('Wenngleich müde')
    expect(withoutKeyword('Sobald ich merke', 'Wenn')).toBe('Sobald ich merke')
  })

  it('leaves nothing when the keyword is all there is', () => {
    expect(withoutKeyword('Wenn', 'Wenn')).toBe('')
    expect(withoutKeyword('wenn ', 'Wenn')).toBe('')
  })
})

describe('plan check-ins', () => {
  const day = 86_400_000
  const made = new Date('2026-05-01T09:00:00.000Z')
  const plan: Plan = { level: 'courage', when: 'A', then: 'B', created: made.toISOString() }
  const after = (days: number) => new Date(made.getTime() + days * day)

  it('asks a week after the plan was made, and a week after each answer', () => {
    expect(reviewDue(plan, after(6.9))).toBe(false)
    expect(reviewDue(plan, after(7))).toBe(true)

    const checked = withCheck(plan, 'held', after(8))
    expect(reviewDue(checked, after(14))).toBe(false)
    expect(reviewDue(checked, after(15))).toBe(true)
  })

  it('counts the answers and keeps only the recent ones', () => {
    let checked = plan
    for (let week = 1; week <= CHECKS_KEEP + 3; week++) {
      checked = withCheck(checked, week % 3 === 0 ? 'missed' : 'held', after(week * 7))
    }
    expect(checked.checks).toHaveLength(CHECKS_KEEP)
    const tally = checkTally(checked)
    expect(tally.held + tally.partly + tally.missed).toBe(CHECKS_KEEP)
    expect(checkTally(plan)).toEqual({ held: 0, partly: 0, missed: 0 })
  })

  it('starts over when the plan is reworded, and not when it is saved unchanged', () => {
    const checked = withCheck(plan, 'missed', after(8))

    expect(revisedPlan(checked, { level: 'courage', when: 'A', then: 'B' }, after(9))).toBe(checked)

    const reworded = revisedPlan(checked, { level: 'courage', when: 'A sharper', then: 'B' }, after(9))
    expect(reworded.created).toBe(plan.created)
    expect(reworded.revised).toBe(after(9).toISOString())
    expect(reworded.checks).toBeUndefined()
    expect(reviewDue(reworded, after(15))).toBe(false)
    expect(reviewDue(reworded, after(16))).toBe(true)
  })

  it('dates a new plan from now', () => {
    expect(revisedPlan(undefined, { level: 'fear', when: 'A', then: 'B' }, made)).toEqual({
      level: 'fear',
      when: 'A',
      then: 'B',
      created: made.toISOString(),
    })
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
