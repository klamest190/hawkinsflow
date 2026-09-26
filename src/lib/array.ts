/**
 * `list[index]` where the index is in range by construction — a rank taken
 * from the same list, a position clamped to its length, a regex group that
 * always takes part in the match.
 *
 * With `noUncheckedIndexedAccess` every index access may be `undefined`, and
 * the honest answer at these places is not a fallback value but a loud stop:
 * a missing level or question means the data is broken, and a quiet default
 * would compute a wrong result that looks right. The throw lands on the crash
 * screen (see `main.tsx`). Where "missing" is a real case — no touch point, no
 * run yet — the caller handles it instead of using this.
 */
export function itemAt<T>(list: ArrayLike<T>, index: number): T {
  const item = list[index]
  if (item === undefined) {
    throw new RangeError(`No item at ${index} in a list of ${list.length}`)
  }
  return item
}
