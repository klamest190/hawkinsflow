/** How many laws the book has. Their texts are in `i18n/winners.ts`, in the book's order. */
export const LAW_COUNT = 30

/** The themes the page groups the laws by — an order of this app's, not the book's. */
export const LAW_GROUPS = ['act', 'focus', 'grow', 'goals', 'resistance', 'character', 'foundations'] as const

export type LawGroup = (typeof LAW_GROUPS)[number]

/**
 * Which laws stand under which theme, by their number in the book. Every
 * number from 1 to 30 appears exactly once, which a test checks: a law in
 * two groups would be read twice, one in none never.
 *
 * Grouped so thirty laws can be taken in: deciding and acting first, as the
 * book begins with decisions; body and money last, as the ground the rest
 * stands on. Within a group, the book's order.
 */
export const GROUP_LAWS: Record<LawGroup, readonly number[]> = {
  act: [1, 6, 10, 14, 21],
  focus: [3, 4, 16, 19, 22],
  grow: [2, 9, 15, 24, 28],
  goals: [11, 17, 27, 29, 30],
  resistance: [7, 8, 13, 23],
  character: [5, 18, 20, 25],
  foundations: [12, 26],
}
