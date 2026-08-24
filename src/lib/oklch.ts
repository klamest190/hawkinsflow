/* Farben für das PDF.
 *
 * Die 17 Ebenenfarben stehen in `data/levels.ts` als OKLCH — aus gutem Grund:
 * nur so steigt die Helligkeit über den ganzen Regenbogen gleichmäßig an. Jeder
 * Browser der letzten Jahre liest das.
 *
 * Der PDF-Renderer nicht. `@react-pdf` gibt Farben an `color-string` weiter, und
 * das kennt Hex, `rgb`, `hsl`, `hwb` und die benannten Farben — sonst nichts.
 * Ein `oklch(…)` käme dort als Fehler oder als Schwarz heraus, und zwar erst
 * beim Rendern: der Build sieht davon nichts.
 *
 * Also wird hier umgerechnet, statt in `levels.ts` neben jede Farbe eine zweite
 * in Hex zu schreiben. Zwei Werte für dieselbe Farbe laufen irgendwann
 * auseinander, und dann leuchtet der Balken am Bildschirm anders als der auf dem
 * Papier.
 */

/** `oklch(0.85 0.17 102)` — Helligkeit (0…1 oder in Prozent), Chroma, Winkel. */
const OKLCH = /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)$/i

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

/** Linearer Lichtanteil → sRGB, also mit der Gammakurve des Bildschirms. */
function gamma(channel: number): number {
  return channel <= 0.0031308 ? 12.92 * channel : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055
}

function toHexPair(linear: number): string {
  return Math.round(gamma(clamp01(linear)) * 255)
    .toString(16)
    .padStart(2, '0')
}

/**
 * OKLCH nach Hex — über OKLab und lineares sRGB, mit den Matrizen aus der
 * CSS-Color-4-Spezifikation.
 *
 * Was nicht nach OKLCH aussieht, kommt unverändert zurück: ein `#rrggbb` ist
 * bereits am Ziel, und alles andere kann `color-string` immer noch selbst
 * versuchen. Stillschweigend Schwarz zurückzugeben wäre schlimmer als der
 * Fehler, den es verdecken würde.
 *
 * Werte außerhalb des sRGB-Raums werden geklemmt. Ein, zwei der kräftigeren
 * Ebenenfarben liegen knapp darüber; der Browser bildet sie eine Spur sauberer
 * ab als diese Klemmung. Auf Papier ist der Unterschied nicht zu sehen.
 *
 * `maxLightness` deckelt die Helligkeit, bevor gerechnet wird. Die Ebenenfarben
 * sind für einen fast schwarzen Grund gemacht — das Gold von Mut (#e5d127) ist
 * auf weißem Papier als Schrift schlicht nicht zu lesen. Gedeckelt bleibt der
 * Farbton derselbe, nur dunkel genug für Text; Balken und Flächen bekommen
 * weiterhin die volle Farbe. Siehe `levelInk` in `pdf/ResultDocument.tsx`.
 */
export function oklchToHex(css: string, maxLightness?: number): string {
  const match = OKLCH.exec(css.trim())
  if (match === null) return css

  const given = Number(match[1]) / (match[2] === '%' ? 100 : 1)
  const lightness = maxLightness === undefined ? given : Math.min(given, maxLightness)
  const chroma = Number(match[3])
  const hue = (Number(match[4]) * Math.PI) / 180

  // OKLCH ist OKLab in Polarkoordinaten.
  const a = chroma * Math.cos(hue)
  const b = chroma * Math.sin(hue)

  // Die drei Zapfenantworten, zurück aus ihrer Kubikwurzel.
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3

  const red = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const green = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const blue = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  return `#${toHexPair(red)}${toHexPair(green)}${toHexPair(blue)}`
}

/** Die drei Kanäle eines `#rrggbb`; bei allem anderen Schwarz. */
function channels(hex: string): [number, number, number] {
  const match = /^#([\da-f]{6})$/i.exec(hex.trim())
  if (match === null) return [0, 0, 0]

  const value = parseInt(match[1], 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

/**
 * Zwei Hex-Farben mischen; `amount` ist der Anteil von `to` (0…1).
 *
 * Das PDF braucht das an zwei Stellen, an denen die App CSS hat, das
 * `@react-pdf` nicht kennt: für die getönten Flächen (in der App
 * `bg-accent/8`, hier die Ebenenfarbe mit viel Weiß) und für das Band, das
 * dort ein `linear-gradient` ist und hier aus vielen schmalen Streifen besteht.
 *
 * Gemischt wird schlicht im sRGB-Raum. Für zwei benachbarte Ebenenfarben, die
 * ohnehin ähnlich hell sind, sieht man den Unterschied zu einer Mischung in
 * OKLab nicht.
 */
export function mix(from: string, to: string, amount: number): string {
  const weight = clamp01(amount)
  const [r1, g1, b1] = channels(from)
  const [r2, g2, b2] = channels(to)

  const blend = (a: number, b: number): string =>
    Math.round(a + (b - a) * weight)
      .toString(16)
      .padStart(2, '0')

  return `#${blend(r1, r2)}${blend(g1, g2)}${blend(b1, b2)}`
}
