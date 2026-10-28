/**
 * One soft light from above, in the color of the level being looked at
 * (--hf-accent), fading into the ground. It used to be two drifting clouds as
 * well, one of them a violet of its own: decoration in motion, competing with
 * the one thing that should move, the color changing with the level.
 *
 * `fixed` und `pointer-events-none`: das Licht scrollt nicht mit und fängt
 * keine Klicks ab.
 */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,color-mix(in_oklab,var(--hf-accent)_22%,transparent),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,var(--hf-deep)_88%)]" />
    </div>
  )
}
