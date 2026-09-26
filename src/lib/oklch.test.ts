import { describe, expect, it } from 'vitest'
import { LEVELS } from '../data/levels.ts'
import stylesheet from '../index.css?raw'
import { mix, oklchToHex, readableOnDark } from './oklch.ts'

/* Der Test, den es ohne das PDF nicht gäbe: `@react-pdf` liest kein OKLCH, und
   es sagt das erst beim Rendern. Hier fällt es beim Testlauf auf. */

describe('oklchToHex', () => {
  it('trifft die Ecken der Skala', () => {
    expect(oklchToHex('oklch(0 0 0)')).toBe('#000000')
    expect(oklchToHex('oklch(1 0 0)')).toBe('#ffffff')
    // Dieselbe Helligkeit in Prozent geschrieben.
    expect(oklchToHex('oklch(100% 0 0)')).toBe('#ffffff')
  })

  it('rechnet ein bekanntes Rot', () => {
    // sRGB-Rot ist oklch(62.8% 0.2577 29.23) — auf ein, zwei Stufen genau.
    const hex = oklchToHex('oklch(0.628 0.2577 29.23)')
    const [, r, g, b] = /^#(..)(..)(..)$/.exec(hex) as RegExpExecArray
    expect(parseInt(r, 16)).toBeGreaterThan(250)
    expect(parseInt(g, 16)).toBeLessThan(6)
    expect(parseInt(b, 16)).toBeLessThan(6)
  })

  it('gibt zurück, was es nicht kennt', () => {
    expect(oklchToHex('#123456')).toBe('#123456')
    expect(oklchToHex('rebeccapurple')).toBe('rebeccapurple')
  })

  it('übersetzt jede der 17 Ebenenfarben', () => {
    for (const level of LEVELS) {
      expect(oklchToHex(level.color), level.id).toMatch(/^#[\da-f]{6}$/)
    }
    // Und keine zwei Ebenen fallen dabei auf dieselbe Farbe zusammen.
    expect(new Set(LEVELS.map((level) => oklchToHex(level.color))).size).toBe(LEVELS.length)
  })
})

/* Relative Leuchtdichte nach WCAG — nur hier gebraucht, deshalb steht sie hier
   und nicht in der Bibliothek. */
function luminance(hex: string): number {
  const value = parseInt(hex.slice(1), 16)
  const channels = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((byte) => {
    const share = byte / 255
    return share <= 0.03928 ? share / 12.92 : ((share + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

const contrastOnWhite = (hex: string): number => 1.05 / (luminance(hex) + 0.05)

describe('die Ebenenfarben auf weißem Papier', () => {
  it('sind ungedeckelt teils unlesbar', () => {
    // Das Gold von Mut auf Weiß: rund 1,7:1. Genau deshalb gibt es den Deckel.
    expect(contrastOnWhite(oklchToHex('oklch(0.85 0.17 102)'))).toBeLessThan(3)
  })

  it('erfüllen gedeckelt alle die AA-Schwelle von 4,5:1', () => {
    for (const level of LEVELS) {
      expect(contrastOnWhite(oklchToHex(level.color, 0.5)), level.id).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('lassen den Farbton stehen — der Regenbogen bleibt unterscheidbar', () => {
    expect(new Set(LEVELS.map((level) => oklchToHex(level.color, 0.5))).size).toBe(LEVELS.length)
  })
})

/* The screen side, read from the stylesheet rather than copied: if someone
   lightens the card or changes the button ink later, these tests notice. */
function token(name: string): string {
  const match = new RegExp(`--hf-${name}:\\s*(#[\\da-f]{6})`, 'i').exec(stylesheet)
  if (match === null) throw new Error(`--hf-${name} is missing from index.css`)
  return match[1]
}

const contrast = (a: string, b: string): number => {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

describe('level colors on the dark screen', () => {
  const grounds = { card: token('card'), void: token('void') }
  const onAccent = token('on-accent')

  it('are partly unreadable without the floor', () => {
    // Shame against the card: about 2.6:1. This is why the floor exists.
    expect(contrast(oklchToHex(LEVELS[0].color), grounds.card)).toBeLessThan(3)
  })

  it('meet AA 4.5:1 against card and void once raised', () => {
    for (const level of LEVELS) {
      const ink = oklchToHex(readableOnDark(level.color))
      for (const [ground, hex] of Object.entries(grounds)) {
        expect(contrast(ink, hex), `${level.id} on ${ground}`).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  it('carry the dark button label at AA 4.5:1', () => {
    for (const level of LEVELS) {
      const surface = oklchToHex(readableOnDark(level.color))
      expect(contrast(onAccent, surface), level.id).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('keep their hue — all 17 stay distinguishable', () => {
    expect(new Set(LEVELS.map((level) => oklchToHex(readableOnDark(level.color)))).size).toBe(
      LEVELS.length,
    )
  })

  it('leave colors above the floor untouched', () => {
    const courage = 'oklch(0.85 0.17 102)'
    expect(readableOnDark(courage)).toBe(courage)
    expect(readableOnDark('var(--hf-muted)')).toBe('var(--hf-muted)')
  })
})

describe('mix', () => {
  it('gibt an den Enden die Ausgangsfarben zurück', () => {
    expect(mix('#000000', '#ffffff', 0)).toBe('#000000')
    expect(mix('#000000', '#ffffff', 1)).toBe('#ffffff')
  })

  it('mischt dazwischen', () => {
    expect(mix('#000000', '#ffffff', 0.5)).toBe('#808080')
    expect(mix('#ff0000', '#0000ff', 0.5)).toBe('#800080')
  })

  it('klemmt Werte außerhalb von 0…1', () => {
    expect(mix('#000000', '#ffffff', -1)).toBe('#000000')
    expect(mix('#000000', '#ffffff', 2)).toBe('#ffffff')
  })
})
