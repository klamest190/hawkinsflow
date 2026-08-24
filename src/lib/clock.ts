/**
 * Sekunden als `m:ss`.
 *
 * Bewusst ohne führende Null bei den Minuten: „2:00" liest sich wie eine Dauer,
 * „02:00" wie eine Uhrzeit. Negative Werte kommen nicht vor — der Countdown
 * bleibt bei null stehen —, werden aber trotzdem abgefangen, damit im Zweifel
 * eine Null dasteht und kein Minuszeichen.
 */
export function clockOf(seconds: number): string {
  const total = Math.max(0, Math.round(seconds))
  const minutes = Math.floor(total / 60)
  const rest = total % 60

  return `${minutes}:${rest.toString().padStart(2, '0')}`
}
