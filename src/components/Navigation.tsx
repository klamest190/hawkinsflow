import type { Copy } from '../i18n/copy.ts'
import type { MomentCopy } from '../i18n/moment.ts'
import type { Language } from '../types.ts'
import { LanguageToggle } from './LanguageToggle.tsx'
import { Logo } from './Logo.tsx'
import { KNOWLEDGE, tabOf, type Place, type Tab } from '../lib/places.ts'

/** The order of the phone's tab bar: the moment flow in the middle, under the thumb. */
const BAR: readonly Tab[] = ['today', 'quiz', 'moment', 'breathe', 'knowledge']

/** The sidebar's list above the group of places to look things up in. */
const SIDE: readonly Place[] = ['today', 'quiz', 'breathe']

type Icon = Place | 'knowledge'

function labelOf(item: Icon, t: Copy): string {
  switch (item) {
    case 'today':
      return t.navToday
    case 'quiz':
      return t.navQuiz
    case 'moment':
      return t.navMoment
    case 'breathe':
      return t.navBreathe
    case 'knowledge':
      return t.navKnowledge
    case 'scale':
      return t.navScale
    case 'thinking':
      return t.navThinking
    case 'meditation':
      return t.navMeditation
    case 'winners':
      return t.navWinners
  }
}

/**
 * The icons, drawn inline: a handful of shapes is not worth an icon library.
 * Each says the place in a line or two — a sun for the day, a list for the
 * questions, two rings for the moment, two waves for the breath going in and
 * out, an open book for what can be looked up, a ladder for the scale, a
 * pyramid for the models of thinking, a seated figure for meditation. Always
 * next to a label, so always `aria-hidden`.
 */
function Glyph({ item, className = 'h-6 w-6' }: { item: Icon; className?: string }) {
  const paths: Record<Icon, string[]> = {
    today: [
      'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z',
      'M12 2.75v2M12 19.25v2M2.75 12h2M19.25 12h2M5.46 5.46l1.41 1.41M17.13 17.13l1.41 1.41M5.46 18.54l1.41-1.41M17.13 6.87l1.41-1.41',
    ],
    quiz: ['M9 6.5h11M9 12h11M9 17.5h11', 'M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01'],
    moment: ['M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z'],
    breathe: ['M3 9.5c2.25-2.5 4.5-2.5 6 0s3.75 2.5 6 0 3.75-2.5 6 0', 'M3 15.5c2.25-2.5 4.5-2.5 6 0s3.75 2.5 6 0 3.75-2.5 6 0'],
    knowledge: ['M12 6.5C10 5 7 4.75 3.5 5.5v13c3.5-.75 6.5-.5 8.5 1 2-1.5 5-1.75 8.5-1v-13C17 4.75 14 5 12 6.5Z', 'M12 6.5v13'],
    scale: ['M7 3v18M17 3v18', 'M7 7.5h10M7 12h10M7 16.5h10'],
    thinking: ['M12 3.5 21 20H3l9-16.5Z', 'M6.9 14.5h10.2M9.4 9.8h5.2'],
    meditation: [
      'M12 8a2.25 2.25 0 1 0 0-4.5A2.25 2.25 0 0 0 12 8Z',
      'M5 19.5c1.5-4 4-6.25 7-6.25s5.5 2.25 7 6.25',
      'M3.5 15.5 8.5 12.5M20.5 15.5l-5-3',
    ],
    // A summit with a flag: the laws of winners.
    winners: ['M2.5 20 9 9.5l3.5 5.5L15 11l6.5 9H2.5Z', 'M15 11V3.5l3.5 1.75L15 7'],
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[item].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

type TabBarProps = {
  /** Where the person is; null where no place fits. */
  active: Place | null
  onSelect: (tab: Tab) => void
  t: Copy
}

/**
 * The phone's bar along the bottom: five tabs, always in view.
 *
 * The moment flow sits in the middle as a round button in the accent color,
 * raised out of the bar: it is the door for a bad moment, and it should be
 * found without looking for it. The others are plain tabs, the current one
 * marked by a tinted pill behind its icon as well as by its color — color
 * alone would not be enough.
 *
 * Buttons and not links: the app has one address, and the views change
 * through `go` in `App`, which keeps the browser's back button working.
 */
export function TabBar({ active, onSelect, t }: TabBarProps) {
  const current = active === null ? null : tabOf(active)

  return (
    <nav
      aria-label={t.navLabel}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-deep/85 backdrop-blur-md lg:hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <ul className="mx-auto flex max-w-xl items-end justify-around px-1">
        {BAR.map((tab) => {
          const here = current === tab

          if (tab === 'moment') {
            return (
              <li key={tab} className="flex flex-1 justify-center">
                <button
                  type="button"
                  onClick={() => onSelect(tab)}
                  aria-current={here ? 'page' : undefined}
                  className="group -mt-5 flex cursor-pointer flex-col items-center gap-1 pb-2 focus-visible:outline-none"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent-ink text-[var(--hf-on-accent)] shadow-[0_12px_30px_-10px_var(--hf-accent)] ring-4 ring-deep transition-transform duration-200 group-hover:-translate-y-px group-active:scale-95 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-accent-ink">
                    <Glyph item={tab} className="h-7 w-7" />
                  </span>
                  <span className="text-caption font-semibold text-text">{labelOf(tab, t)}</span>
                </button>
              </li>
            )
          }

          return (
            <li key={tab} className="flex-1">
              <button
                type="button"
                onClick={() => onSelect(tab)}
                aria-current={here ? 'page' : undefined}
                className={
                  'group flex w-full cursor-pointer flex-col items-center gap-1 pt-2 pb-2 text-caption font-semibold ' +
                  'transition-colors focus-visible:outline-none ' +
                  (here ? 'text-accent-ink' : 'text-muted hover:text-text')
                }
              >
                <span
                  className={
                    'grid h-8 w-14 place-items-center rounded-full transition-colors ' +
                    'group-focus-visible:outline-2 group-focus-visible:outline-accent-ink ' +
                    (here ? 'bg-accent/15' : '')
                  }
                >
                  <Glyph item={tab} />
                </span>
                {labelOf(tab, t)}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/**
 * The row at the top of the places to look things up in, on a phone: the
 * scale, the two ways of thinking, meditation, the laws of winners. A navigation of its
 * own and not tabs of a page — each is a view with its own heading and its
 * own entry in the browser's history. Hidden from `lg` on, where the sidebar
 * lists them all.
 */
export function KnowledgeNav({
  active,
  onSelect,
  t,
}: {
  active: Place
  onSelect: (place: Place) => void
  t: Copy
}) {
  return (
    <nav aria-label={t.navKnowledge} className="mx-auto w-full max-w-2xl px-5 pt-5 sm:px-6 lg:hidden">
      {/* Wrapping and not scrolling sideways: a pill cut off at the edge is
          a place nobody sees. */}
      <ul className="flex flex-wrap gap-2">
        {KNOWLEDGE.map((place) => {
          const here = active === place
          return (
            <li key={place}>
              <button
                type="button"
                onClick={() => onSelect(place)}
                aria-current={here ? 'page' : undefined}
                className={
                  'flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-small font-semibold whitespace-nowrap ' +
                  'transition-[background-color,border-color,color] duration-200 ' +
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ' +
                  (here
                    ? 'border-accent-ink/60 bg-accent/20 text-text'
                    : 'border-line bg-void/30 text-muted hover:border-accent/40 hover:text-text')
                }
              >
                <Glyph item={place} className="h-4 w-4" />
                {labelOf(place, t)}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/**
 * The phone's line along the top: the name of the app and the language. Not
 * a heading — every view has its own `<h1>`, and a second one up here would
 * be read before it on every screen.
 */
export function AppBar({
  t,
  language,
  onLanguage,
}: {
  t: Copy
  language: Language
  onLanguage: (language: Language) => void
}) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line/50 bg-void/75 px-4 pb-2.5 backdrop-blur-md lg:hidden"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top) + 0.625rem)',
        paddingLeft: 'calc(env(safe-area-inset-left) + 1rem)',
        paddingRight: 'calc(env(safe-area-inset-right) + 1rem)',
      }}
    >
      <p className="flex items-center gap-2.5 font-display text-lead font-semibold">
        <Logo className="h-7 w-7" decorative />
        {t.appName}
      </p>
      <LanguageToggle language={language} onChange={onLanguage} t={t} />
    </header>
  )
}

/** One place in the sidebar's list. */
function SideItem({
  place,
  active,
  onSelect,
  t,
}: {
  place: Place
  active: Place | null
  onSelect: (place: Place) => void
  t: Copy
}) {
  const here = active === place
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(place)}
        aria-current={here ? 'page' : undefined}
        className={
          'flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-body font-semibold ' +
          'transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ' +
          (here ? 'bg-accent/12 text-text' : 'text-muted hover:bg-card/70 hover:text-text')
        }
      >
        <span className={here ? 'text-accent-ink' : ''}>
          <Glyph item={place} className="h-5 w-5" />
        </span>
        {labelOf(place, t)}
      </button>
    </li>
  )
}

/**
 * Every place along the left edge, from 1024 px on: there is room for all
 * seven by name, and a bar at the foot of a wide screen sits far from
 * everything. The places to look things up in stand as a group under their
 * own label, as they share a tab on the phone. The moment flow leaves the
 * list and becomes a card with its own line, for the same reason it is the
 * raised button on the phone. The language sits at the foot, out of the way.
 */
export function Sidebar({
  active,
  onSelect,
  t,
  m,
  language,
  onLanguage,
}: {
  active: Place | null
  onSelect: (place: Place) => void
  t: Copy
  m: MomentCopy
  language: Language
  onLanguage: (language: Language) => void
}) {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col overflow-y-auto border-r border-line/60 bg-deep/70 px-4 py-6 backdrop-blur-md lg:flex"
      style={{ paddingLeft: 'calc(env(safe-area-inset-left) + 1rem)' }}
    >
      <p className="flex items-center gap-3 px-3 font-display text-lead font-semibold">
        <Logo className="h-8 w-8" decorative />
        {t.appName}
      </p>

      <nav aria-label={t.navLabel} className="mt-8 flex flex-col gap-6">
        <ul className="flex flex-col gap-1">
          {SIDE.map((place) => (
            <SideItem key={place} place={place} active={active} onSelect={onSelect} t={t} />
          ))}
        </ul>

        <div className="flex flex-col gap-1">
          <p id="sidebar-knowledge" className="px-3 pb-1 text-small font-semibold text-muted">
            {t.navKnowledge}
          </p>
          <ul aria-labelledby="sidebar-knowledge" className="flex flex-col gap-1">
            {KNOWLEDGE.map((place) => (
              <SideItem key={place} place={place} active={active} onSelect={onSelect} t={t} />
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => onSelect('moment')}
          aria-current={active === 'moment' ? 'page' : undefined}
          className="flex cursor-pointer flex-col gap-1.5 rounded-2xl border border-accent/45 bg-accent/10 p-4 text-left transition-[border-color,background-color] duration-200 hover:border-accent/70 hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          <span className="flex items-center gap-2.5 font-display text-body font-semibold text-text">
            <span className="text-accent-ink">
              <Glyph item="moment" className="h-5 w-5" />
            </span>
            {m.enter}
          </span>
          <span className="text-small leading-relaxed text-muted">{t.navMomentLead}</span>
        </button>
      </nav>

      {/* `w-fit`: the toggle is a block and would stretch across the sidebar. */}
      <div className="mt-auto w-fit px-3 pt-6">
        <LanguageToggle language={language} onChange={onLanguage} t={t} />
      </div>
    </aside>
  )
}
