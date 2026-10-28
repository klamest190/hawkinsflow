import { EVIDENCE, MEDITATIONS, SOURCES, type Evidence } from '../data/meditations.ts'
import { GUIDED, type GuidedId } from '../data/sessions.ts'
import type { MeditationCopy } from '../i18n/meditation.ts'
import { Button } from './Button.tsx'
import { PAGE_WIDTH } from './page.ts'

/** Three dots, filled as far as the evidence goes — next to its words, never instead of them. */
const DOTS: Record<Evidence, number> = { solid: 3, moderate: 2, thin: 1 }

function EvidenceMark({ level, label }: { level: Evidence; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-void/30 px-2.5 py-1 text-caption font-semibold text-text/85">
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

function isGuided(id: string): id is GuidedId {
  return GUIDED.some((guided) => guided === id)
}

/** A labelled paragraph inside a form's card. */
function Part({ label, children }: { label: string; children: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-caption font-semibold tracking-[0.16em] text-accent-ink uppercase">{label}</p>
      <p className="text-body leading-relaxed text-text/85">{children}</p>
    </div>
  )
}

/**
 * The meditation page: the six forms as cards, best supported first — how, what it can do, what
 * the research says, where the app practises it — then what happens in the
 * body, what the research does not say, and the sources.
 *
 * The limits stand on the page and not behind a fold: a page that lists
 * benefits and hides the side effects would be the hype the sources warn of.
 */
export function Meditation({
  d,
  onPractice,
  onEbbFlow,
}: {
  d: MeditationCopy
  /** Opens the guided session of a form. */
  onPractice: (id: GuidedId) => void
  /** Slow breathing is practised in Ebb Flow. */
  onEbbFlow: () => void
}) {
  return (
    <div className={`animate-rise mx-auto flex w-full max-w-2xl flex-col px-5 py-8 sm:px-6 ${PAGE_WIDTH}`}>
      <h1 className="font-display text-display font-bold tracking-[-0.02em]">{d.title}</h1>
      <p className="mt-2.5 text-body leading-relaxed text-muted">{d.lead}</p>

      <h2 className="mt-10 font-display text-heading font-bold tracking-[-0.01em]">{d.formsTitle}</h2>
      <p className="mt-2 text-body leading-relaxed text-muted">{d.formsLead}</p>
      {/* An ordered list: the order is a statement — best supported first. */}
      <ol className="mt-5 grid gap-4 lg:grid-cols-2">
        {MEDITATIONS.map((id) => {
          const form = d.forms[id]
          return (
            <li key={id} className="flex flex-col gap-4 rounded-2xl border border-line bg-card/60 p-5 backdrop-blur-sm">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div>
                  <h3 className="font-display text-title leading-snug font-semibold">{form.name}</h3>
                  <p className="mt-0.5 text-small text-muted">{form.length}</p>
                </div>
                <EvidenceMark level={EVIDENCE[id]} label={d.evidenceLevels[EVIDENCE[id]]} />
              </div>
              <Part label={d.howLabel}>{form.how}</Part>
              <Part label={d.effectLabel}>{form.effect}</Part>
              <Part label={d.evidenceLabel}>{form.evidence}</Part>
              {/* At the foot of every card, the way from reading to doing. */}
              <div className="mt-auto flex flex-col gap-3 border-t border-line/60 pt-3">
                {form.inApp !== undefined && (
                  <p className="text-small leading-relaxed text-muted">
                    <span className="font-semibold text-text/80">{d.inAppLabel}:</span> {form.inApp}
                  </p>
                )}
                <div>
                  {isGuided(id) ? (
                    <Button variant="ghost" size="sm" onClick={() => onPractice(id)}>
                      {d.practiceNow}
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={onEbbFlow}>
                      {d.practiceInEbbFlow}
                    </Button>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <h2 className="mt-12 font-display text-heading font-bold tracking-[-0.01em]">{d.bodyTitle}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {d.body.map((block) => (
          <section key={block.title} className="rounded-2xl border border-line bg-card/50 p-5 backdrop-blur-sm">
            <h3 className="font-display text-lead font-semibold">{block.title}</h3>
            <p className="mt-2 text-body leading-relaxed text-text/85">{block.body}</p>
          </section>
        ))}
      </div>

      <h2 className="mt-12 font-display text-heading font-bold tracking-[-0.01em]">{d.limitsTitle}</h2>
      <ul className="mt-5 flex flex-col gap-3 rounded-2xl border border-accent/25 bg-accent/[0.06] p-5">
        {d.limits.map((limit) => (
          <li key={limit} className="flex gap-3 text-body leading-relaxed text-text/90">
            <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
            {limit}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-title font-semibold">{d.sourcesTitle}</h2>
      <ol className="mt-3 flex list-decimal flex-col gap-1.5 pb-10 pl-5 text-small leading-relaxed text-muted">
        {SOURCES.map((source) => (
          <li key={source}>{source}</li>
        ))}
      </ol>
    </div>
  )
}
