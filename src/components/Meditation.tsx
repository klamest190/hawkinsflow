import { EVIDENCE, MEDITATIONS, SOURCES, type Evidence } from '../data/meditations.ts'
import type { MeditationCopy } from '../i18n/meditation.ts'
import { PAGE_WIDTH } from './page.ts'

/** Three dots, filled as far as the evidence goes — next to its words, never instead of them. */
const DOTS: Record<Evidence, number> = { solid: 3, moderate: 2, thin: 1 }

function EvidenceMark({ level, label }: { level: Evidence; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-void/30 px-2.5 py-1 text-[11.5px] font-semibold text-text/85">
      <span aria-hidden className="flex gap-0.5">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={'h-1.5 w-1.5 rounded-full ' + (dot <= DOTS[level] ? 'bg-accent-ink' : 'bg-line')}
          />
        ))}
      </span>
      {label}
    </span>
  )
}

/** A labelled paragraph inside a form's card. */
function Part({ label, children }: { label: string; children: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-accent-ink uppercase">{label}</p>
      <p className="text-[14.5px] leading-relaxed text-text/85">{children}</p>
    </div>
  )
}

/**
 * The meditation page: the six forms as cards — how, what it can do, what
 * the research says, where the app practises it — then what happens in the
 * body, what the research does not say, and the sources.
 *
 * The limits stand on the page and not behind a fold: a page that lists
 * benefits and hides the side effects would be the hype the sources warn of.
 */
export function Meditation({ d }: { d: MeditationCopy }) {
  return (
    <div className={`animate-rise mx-auto flex w-full max-w-2xl flex-col px-5 py-8 sm:px-6 ${PAGE_WIDTH}`}>
      <h1 className="font-display text-4xl font-bold tracking-[-0.02em]">{d.title}</h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{d.lead}</p>

      <h2 className="mt-10 font-display text-[24px] font-bold tracking-[-0.01em]">{d.formsTitle}</h2>
      <ul className="mt-5 grid gap-4 lg:grid-cols-2">
        {MEDITATIONS.map((id) => {
          const form = d.forms[id]
          return (
            <li key={id} className="flex flex-col gap-4 rounded-2xl border border-line bg-card/60 p-5 backdrop-blur-sm">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div>
                  <h3 className="font-display text-[19px] leading-snug font-semibold">{form.name}</h3>
                  <p className="mt-0.5 text-[12.5px] text-muted">{form.length}</p>
                </div>
                <EvidenceMark level={EVIDENCE[id]} label={d.evidenceLevels[EVIDENCE[id]]} />
              </div>
              <Part label={d.howLabel}>{form.how}</Part>
              <Part label={d.effectLabel}>{form.effect}</Part>
              <Part label={d.evidenceLabel}>{form.evidence}</Part>
              {form.inApp !== undefined && (
                <p className="mt-auto border-t border-line/60 pt-3 text-[13px] leading-relaxed text-muted">
                  <span className="font-semibold text-text/80">{d.inAppLabel}:</span> {form.inApp}
                </p>
              )}
            </li>
          )
        })}
      </ul>

      <h2 className="mt-12 font-display text-[24px] font-bold tracking-[-0.01em]">{d.bodyTitle}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {d.body.map((block) => (
          <section key={block.title} className="rounded-2xl border border-line bg-card/50 p-5 backdrop-blur-sm">
            <h3 className="font-display text-[17px] font-semibold">{block.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-text/85">{block.body}</p>
          </section>
        ))}
      </div>

      <h2 className="mt-12 font-display text-[24px] font-bold tracking-[-0.01em]">{d.limitsTitle}</h2>
      <ul className="mt-5 flex flex-col gap-3 rounded-2xl border border-accent/25 bg-accent/[0.06] p-5">
        {d.limits.map((limit) => (
          <li key={limit} className="flex gap-3 text-[14.5px] leading-relaxed text-text/90">
            <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
            {limit}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-[19px] font-semibold">{d.sourcesTitle}</h2>
      <ol className="mt-3 flex list-decimal flex-col gap-1.5 pb-10 pl-5 text-[12.5px] leading-relaxed text-muted">
        {SOURCES.map((source) => (
          <li key={source}>{source}</li>
        ))}
      </ol>
    </div>
  )
}
