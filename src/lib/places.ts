/** Every place the navigation leads to. */
export type Place =
  | 'today'
  | 'quiz'
  | 'moment'
  | 'breathe'
  | 'decisions'
  | 'scale'
  | 'thinking'
  | 'meditation'
  | 'winners'

/**
 * The places to look things up in. On a phone they share one tab, and a row
 * at the top of each switches between them: nine tabs do not fit a phone's
 * width with their names, and five with names read better than nine
 * without.
 */
export const KNOWLEDGE: readonly Place[] = ['scale', 'thinking', 'meditation', 'winners']

/** The places to practise: like the places to look things up in, they share a tab. */
export const PRACTICE: readonly Place[] = ['breathe', 'decisions']

/** The phone's tabs: three places, and the places to practise and to look things up in as one each. */
export type Tab = 'today' | 'quiz' | 'moment' | 'practice' | 'knowledge'

/** The tab a place sits under on the phone. */
export function tabOf(place: Place): Tab {
  switch (place) {
    case 'scale':
    case 'thinking':
    case 'meditation':
    case 'winners':
      return 'knowledge'
    case 'breathe':
    case 'decisions':
      return 'practice'
    default:
      return place
  }
}
