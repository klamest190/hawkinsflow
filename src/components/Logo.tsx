/**
 * Vier Stufen, die nach oben schmaler und heller werden — die Skala als Zeichen.
 * Die Farben stehen fest und folgen nicht der Ebene: das Logo ist die App, nicht
 * der aktuelle Zustand.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Hawkins Flow">
      <defs>
        {/* `userSpaceOnUse` ist hier keine Feinheit, sondern der Unterschied
            zwischen einer Skala und vier Farbklecksen: Ohne die Angabe rechnet
            SVG den Verlauf je Form aus, und jeder einzelne Balken trüge den
            ganzen Regenbogen. Die Koordinaten laufen deshalb durch den
            Zeichenraum — von der Unterkante der untersten Stufe bis zur
            Oberkante der obersten. */}
        <linearGradient id="hf-logo" gradientUnits="userSpaceOnUse" x1="0" y1="51" x2="0" y2="12">
          <stop offset="0" stopColor="oklch(0.55 0.17 20)" />
          <stop offset="0.35" stopColor="oklch(0.72 0.17 70)" />
          <stop offset="0.55" stopColor="oklch(0.85 0.17 102)" />
          <stop offset="0.78" stopColor="oklch(0.78 0.15 175)" />
          <stop offset="1" stopColor="oklch(0.74 0.16 300)" />
        </linearGradient>
      </defs>
      <g fill="url(#hf-logo)">
        <rect x="12" y="45" width="40" height="6" rx="3" />
        <rect x="16" y="34" width="32" height="6" rx="3" />
        <rect x="20" y="23" width="24" height="6" rx="3" />
        <rect x="25" y="12" width="14" height="6" rx="3" />
      </g>
    </svg>
  )
}
