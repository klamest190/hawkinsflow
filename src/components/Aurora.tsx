/**
 * Zwei große, weiche Farbwolken hinter allem. Sie tragen die Farbe der gerade
 * betrachteten Ebene (--hf-accent) und geben der Oberfläche die Tiefe, die eine
 * flache Fläche nicht hätte.
 *
 * `fixed` und `pointer-events-none`: die Wolken scrollen nicht mit und fangen
 * keine Klicks ab.
 */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,color-mix(in_oklab,var(--hf-accent)_22%,transparent),transparent_70%)]" />
      <div className="animate-drift-a absolute -top-[18%] -left-[12%] h-[62vmax] w-[62vmax] rounded-full bg-accent/25 blur-[90px]" />
      <div className="animate-drift-b absolute -right-[16%] -bottom-[22%] h-[58vmax] w-[58vmax] rounded-full bg-[#6d3bd6]/25 blur-[100px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,var(--hf-deep)_88%)]" />
    </div>
  )
}
