/**
 * How wide a view in the navigation may grow next to the sidebar — the same
 * for every one of them, so switching places doesn't make the page jump.
 * Phones keep each view's own narrower width; this only applies from `lg`.
 *
 * A full class name and not a number: Tailwind finds its classes by reading
 * the source, and a class put together at runtime would never be generated.
 */
export const PAGE_WIDTH = 'lg:max-w-5xl'
