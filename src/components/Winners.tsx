import { GROUP_LAWS, LAW_GROUPS } from '../data/winners.ts'
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
 */
export function Winners({ w }: { w: WinnersCopy }) {
  return (
    <div className={`animate-rise mx-auto flex w-full max-w-2xl flex-col px-5 py-8 sm:px-6 ${PAGE_WIDTH}`}>
      <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-balance">{w.title}</h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{w.lead}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{w.groupNote}</p>

      {LAW_GROUPS.map((group) => (
        <section key={group} className="mt-10">
          <h2 className="font-display text-[24px] font-bold tracking-[-0.01em]">{w.groups[group]}</h2>
          <ul className="mt-5 grid gap-4 lg:grid-cols-2">
            {GROUP_LAWS[group].map((number) => {
              const law = itemAt(w.laws, number - 1)
              return (
                <li key={number} className="flex flex-col gap-3 rounded-2xl border border-line bg-card/60 p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="tabular grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-[13px] font-semibold text-accent-ink"
                    >
                      {number}
                    </span>
                    <h3 className="font-display text-[17.5px] leading-snug font-semibold">
                      <span className="sr-only">{w.lawLabel(number)}: </span>
                      {law.title}
                    </h3>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-text/85">{law.core}</p>
                  <div className="flex flex-col gap-1 rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-accent-ink uppercase">{w.todayLabel}</p>
                    <p className="text-[14px] leading-relaxed text-text/90">{law.today}</p>
                  </div>
                  {law.inApp !== undefined && (
                    <p className="mt-auto text-[13px] leading-relaxed text-muted">
                      <span className="font-semibold text-text/80">{w.inAppLabel}:</span> {law.inApp}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      <h2 className="mt-12 font-display text-[24px] font-bold tracking-[-0.01em]">{w.notesTitle}</h2>
      <ul className="mt-5 flex flex-col gap-3 rounded-2xl border border-accent/25 bg-accent/[0.06] p-5">
        {w.notes.map((note) => (
          <li key={note} className="flex gap-3 text-[14.5px] leading-relaxed text-text/90">
            <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
            {note}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-[19px] font-semibold">{w.sourcesTitle}</h2>
      <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-[12.5px] leading-relaxed text-muted">
        {w.sources.map((source) => (
          <li key={source}>{source}</li>
        ))}
      </ol>
      <p className="mt-3 pb-10 text-[12.5px] leading-relaxed text-muted">{w.sourceNote}</p>
    </div>
  )
}
