/** Every place the navigation leads to. */
export type Place = 'today' | 'quiz' | 'moment' | 'breathe' | 'scale' | 'thinking' | 'meditation'

/**
 * The places to look things up in. On a phone they share one tab, and a row
 * of three at the top of each switches between them: seven tabs do not fit
 * a phone's width with their names, and five with names read better than
 * seven without.
 */
export const KNOWLEDGE: readonly Place[] = ['scale', 'thinking', 'meditation']

/** The phone's tabs: four places, and the three to look things up in as one. */
export type Tab = 'today' | 'quiz' | 'moment' | 'breathe' | 'knowledge'

/** The tab a place sits under on the phone. */
export function tabOf(place: Place): Tab {
  switch (place) {
    case 'scale':
    case 'thinking':
    case 'meditation':
      return 'knowledge'
    default:
      return place
  }
}
