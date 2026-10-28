import { useRef } from 'react'
import { GROUP_LAWS, LAW_GROUPS, type LawGroup } from '../data/winners.ts'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import type { WinnersCopy } from '../i18n/winners.ts'
import { itemAt } from '../lib/array.ts'
import { PAGE_WIDTH } from './page.ts'

/**
 * Bodo Schäfer's laws of winners: thirty principles, grouped by theme, each
 * as a card — its number in the book, its title, what it asks, one step for
 * today, and where the app practises it.
 *
 * Grouped and not in a list of thirty: a list that long is skimmed, a group
 * of four or five is read. The book's numbers stay on every card, so its
 * order can still be followed.
 *
 * The context — advice from experience, what research supports, where the
 * app disagrees — stands on the page and not behind a fold, as on the
 * meditation page.
 *
 * Seven groups and thirty laws make a long page, so it opens with its
 * contents: a row of the groups on a phone, a list that stays in view beside
 * the laws on a wide screen. Buttons and not links: the app keeps the
 * browser's history itself (see `App`), and a `#hash` would add an entry
 * the back button then had to step through. A jump moves focus to the
 * group's heading, so a screen reader goes on reading there.
 */
export function Winners({ w }: { w: WinnersCopy }) {
  const headings = useRef<Partial<Record<LawGroup, HTMLHeadingElement | null>>>({})
  const still = useReducedMotion()

  function jump(group: LawGroup) {
    const heading = headings.current[group]
    if (heading === null || heading === undefined) return
    heading.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })
    heading.focus({ preventScroll: true })
  }

  return (
    <div className={`animate-rise mx-auto w-full max-w-2xl px-5 py-8 sm:px-6 ${PAGE_WIDTH}`}>
      <h1 className="font-display text-display font-bold tracking-[-0.02em] text-balance">{w.title}</h1>
      <p className="mt-2.5 text-body leading-relaxed text-muted">{w.lead}</p>
      <p className="mt-2 text-small leading-relaxed text-muted">{w.groupNote}</p>

      <div className="mt-8 xl:grid xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-14">
        <nav aria-label={w.contentsLabel} className="xl:sticky xl:top-10 xl:self-start">
          <ol className="flex flex-wrap gap-2 xl:flex-col xl:gap-0.5">
            {LAW_GROUPS.map((group) => (
              <li key={group}>
                <button
                  type="button"
                  onClick={() => jump(group)}
                  className={
                    'flex cursor-pointer items-baseline gap-2 rounded-full border border-line px-3.5 py-1.5 text-left text-small font-semibold text-muted ' +
                    'transition-colors hover:border-accent/40 hover:text-text ' +
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ' +
                    'xl:w-full xl:justify-between xl:rounded-xl xl:border-transparent xl:px-3 xl:py-2 xl:hover:border-transparent xl:hover:bg-card'
                  }
                >
                  {w.groups[group]}
                  <span aria-hidden className="tabular text-caption font-medium text-muted/70">
                    {GROUP_LAWS[group].length}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          {LAW_GROUPS.map((group) => (
            <section key={group} className="mt-10 xl:first:mt-0">
              <h2
                ref={(node) => {
                  headings.current[group] = node
                }}
                tabIndex={-1}
                className="scroll-mt-24 font-display text-heading font-bold tracking-[-0.01em] focus:outline-none xl:scroll-mt-10"
              >
                {w.groups[group]}
              </h2>
              <ul className="mt-6 grid gap-x-10 gap-y-8 2xl:grid-cols-2">
                {GROUP_LAWS[group].map((number) => {
                  const law = itemAt(w.laws, number - 1)
                  return (
                    <li key={number} className="flex flex-col gap-3 border-t border-line pt-5">
                      <div className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="tabular grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-small font-semibold text-accent-ink"
                        >
                          {number}
                        </span>
                        <h3 className="font-display text-lead leading-snug font-semibold">
                          <span className="sr-only">{w.lawLabel(number)}: </span>
                          {law.title}
                        </h3>
                      </div>
                      <p className="text-body leading-relaxed text-text/85">{law.core}</p>
                      <div className="flex flex-col gap-1 border-l-2 border-accent/50 pl-4">
                        <p className="text-small font-semibold text-accent-ink">{w.todayLabel}</p>
                        <p className="text-body leading-relaxed text-text/90">{law.today}</p>
                      </div>
                      {law.inApp !== undefined && (
                        <p className="mt-auto text-small leading-relaxed text-muted">
                          <span className="font-semibold text-text/80">{w.inAppLabel}:</span> {law.inApp}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}

          <h2 className="mt-12 font-display text-heading font-bold tracking-[-0.01em]">{w.notesTitle}</h2>
          <ul className="mt-5 flex flex-col gap-3 border-l-2 border-accent/50 pl-4">
            {w.notes.map((note) => (
              <li key={note} className="flex gap-3 text-body leading-relaxed text-text/90">
                <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
                {note}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-title font-semibold">{w.sourcesTitle}</h2>
          <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-small leading-relaxed text-muted">
            {w.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ol>
          <p className="mt-3 pb-10 text-small leading-relaxed text-muted">{w.sourceNote}</p>
        </div>
      </div>
    </div>
  )
}
