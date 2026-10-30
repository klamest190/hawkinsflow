import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import type { DecisionsCopy } from '../i18n/decisions.ts'
import { localDay } from '../lib/download.ts'
import { DECISION_FIELDS, LONGEST, byDay, isDay, isFilled } from '../lib/decisions.ts'
import type { Decision, DecisionFields, Decisions as DecisionList } from '../types.ts'
import { Button } from './Button.tsx'
import { Disclosure } from './Disclosure.tsx'
import { PAGE_WIDTH } from './page.ts'

type DecisionsProps = {
  d: DecisionsCopy
  decisions: DecisionList
  onAdd: (fields: DecisionFields) => void
  onEdit: (id: string, fields: DecisionFields) => void
  onRemove: (id: string) => void
}

type Example = DecisionsCopy['examples'][number]

/** Where focus goes once the render after a change has landed. */
type FocusTarget = 'form' | 'list' | 'confirm' | 'remove'

const field =
  'w-full rounded-xl border border-line bg-void/50 px-4 py-3 ' +
  'text-body leading-relaxed text-text placeholder:text-muted/60 ' +
  'transition-colors focus:border-accent-ink/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink'

function blank(): DecisionFields {
  return { day: localDay(new Date()), belief: '', decision: '', evidence: '' }
}

/**
 * The decision matrix, after David Bayer: a belief that keeps someone small,
 * the decision made instead, and the evidence that already speaks for it.
 *
 * One form serves both a new entry and an edit; `editingId` says which. It is
 * the view's feature, so it stands open — the explanation and the examples
 * are folded above it, for whoever needs them once.
 */
export function Decisions({ d, decisions, onAdd, onEdit, onRemove }: DecisionsProps) {
  const [howOpen, setHowOpen] = useState(false)
  const [form, setForm] = useState<DecisionFields>(blank)
  const [editingId, setEditingId] = useState<string | null>(null)
  /* The entry whose delete was last asked about, and whether the question is
     still open. Kept after "keep" so focus can return to its delete button. */
  const [asked, setAsked] = useState<{ id: string; open: boolean } | null>(null)

  const id = useId()
  const firstField = useRef<HTMLTextAreaElement>(null)
  const listHeading = useRef<HTMLHeadingElement>(null)
  const confirmButton = useRef<HTMLButtonElement>(null)
  const removeButton = useRef<HTMLButtonElement>(null)
  const pendingFocus = useRef<FocusTarget | null>(null)

  /* Each of these changes unmounts the button that had focus, or swaps the
     list it stood in. The target only exists after the render, hence the
     effect; the list heading may be gone after the last delete, and then the
     form is the nearest place. */
  useEffect(() => {
    const target = pendingFocus.current
    if (target === null) return
    pendingFocus.current = null
    if (target === 'list') (listHeading.current ?? firstField.current)?.focus()
    else if (target === 'form') firstField.current?.focus()
    else if (target === 'confirm') confirmButton.current?.focus()
    else removeButton.current?.focus()
  })

  const groups = byDay(decisions)
  const dayLabel = new Intl.DateTimeFormat(d.locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
  const canSave = isFilled(form) && isDay(form.day)

  /* The form is already on the page; it only needs bringing into view, with
     its first field ready to write in. */
  function toForm() {
    firstField.current?.focus({ preventScroll: true })
    firstField.current?.scrollIntoView({ block: 'center' })
  }

  function reset() {
    setForm(blank())
    setEditingId(null)
  }

  function save(event: FormEvent) {
    event.preventDefault()
    if (!canSave) return
    if (editingId === null) onAdd(form)
    else onEdit(editingId, form)
    reset()
    pendingFocus.current = 'list'
  }

  function cancel() {
    reset()
    pendingFocus.current = 'form'
  }

  function edit(entry: Decision) {
    setForm({ day: entry.day, belief: entry.belief, decision: entry.decision, evidence: entry.evidence })
    setEditingId(entry.id)
    toForm()
  }

  /* A template always starts a new entry: whatever was being edited stays as
     it was saved. */
  function fillFromTemplate(example: Example) {
    setForm({ day: localDay(new Date()), belief: example.belief, decision: example.decision, evidence: example.evidence })
    setEditingId(null)
    toForm()
  }

  function ask(entryId: string) {
    setAsked({ id: entryId, open: true })
    pendingFocus.current = 'confirm'
  }

  function keep(entryId: string) {
    setAsked({ id: entryId, open: false })
    pendingFocus.current = 'remove'
  }

  function removeForGood(entryId: string) {
    onRemove(entryId)
    setAsked(null)
    // No ghost: an entry deleted while open in the form can't be saved back.
    if (editingId === entryId) reset()
    pendingFocus.current = 'list'
  }

  const howId = `${id}-how`
  const formHeading = `${id}-form`

  return (
    <div className={`animate-rise mx-auto flex w-full max-w-2xl flex-col px-5 py-8 sm:px-6 ${PAGE_WIDTH}`}>
      <h1 className="font-display text-display font-bold tracking-[-0.02em]">{d.title}</h1>
      <p className="mt-2.5 text-body leading-relaxed text-muted">{d.lead}</p>

      <div className="mt-8 flex flex-col gap-7">
        <Disclosure open={howOpen} onToggle={() => setHowOpen((previous) => !previous)} controls={howId}>
          {d.howTitle}
        </Disclosure>
        {howOpen && (
          <div id={howId} className="animate-rise">
            <HowItWorks d={d} onTemplate={fillFromTemplate} />
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="flex flex-col gap-6">
          <form
            aria-labelledby={formHeading}
            onSubmit={save}
            className="surface-feature flex flex-col gap-5 p-5 sm:p-6"
          >
            <h2 id={formHeading} className="font-display text-title font-semibold">
              {editingId === null ? d.formNew : d.formEdit}
            </h2>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${id}-day`} className="text-small font-semibold text-muted">
                {d.day}
              </label>
              <input
                id={`${id}-day`}
                type="date"
                required
                value={form.day}
                onChange={(event) => {
                  const day = event.target.value
                  setForm((previous) => ({ ...previous, day }))
                }}
                className={`${field} tabular sm:w-56`}
              />
            </div>

            {DECISION_FIELDS.map((name, index) => {
              const text = d.fields[name]
              const fieldId = `${id}-${name}`
              return (
                <div key={name} className="flex flex-col gap-1.5">
                  <label htmlFor={fieldId} className="text-body font-semibold text-text">
                    {text.label}
                  </label>
                  <p id={`${fieldId}-hint`} className="text-small leading-relaxed text-muted">
                    {text.hint}
                  </p>
                  <textarea
                    id={fieldId}
                    ref={index === 0 ? firstField : undefined}
                    rows={3}
                    maxLength={LONGEST}
                    aria-describedby={`${fieldId}-hint`}
                    placeholder={text.placeholder}
                    value={form[name]}
                    onChange={(event) => {
                      const value = event.target.value
                      setForm((previous) => ({ ...previous, [name]: value }))
                    }}
                    className={`${field} mt-1 resize-y`}
                  />
                </div>
              )
            })}

            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={!canSave}>
                {d.save}
              </Button>
              {editingId !== null && (
                <Button type="button" variant="quiet" onClick={cancel}>
                  {d.cancel}
                </Button>
              )}
            </div>
          </form>

          {groups.length === 0 && <p className="text-body leading-relaxed text-muted">{d.empty}</p>}
        </div>

        {groups.length > 0 && (
          <section aria-labelledby={`${id}-list`} className="flex flex-col gap-8">
            <h2
              id={`${id}-list`}
              ref={listHeading}
              tabIndex={-1}
              className="font-display text-title font-semibold focus:outline-none"
            >
              {d.listTitle(decisions.length)}
            </h2>

            {groups.map((group) => (
              <div key={group.day} className="flex flex-col gap-4">
                <p className="tabular text-small font-semibold text-muted">
                  <time dateTime={group.day}>{dayLabel.format(new Date(`${group.day}T00:00`))}</time>
                </p>
                <ul className="flex flex-col gap-6">
                  {group.entries.map((entry) => {
                    const confirming = asked?.id === entry.id && asked.open
                    return (
                      <li key={entry.id} className="flex flex-col gap-3 border-t border-line pt-4">
                        <dl className="flex flex-col gap-3">
                          {DECISION_FIELDS.map((name) => (
                            <div key={name}>
                              <dt className="text-small font-semibold text-muted">{d.fields[name].label}</dt>
                              <dd className="mt-0.5 text-body leading-relaxed whitespace-pre-wrap text-text/90">
                                {entry[name] === '' ? '—' : entry[name]}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <div className="flex flex-wrap gap-2">
                          {confirming ? (
                            <>
                              <Button
                                ref={confirmButton}
                                variant="ghost"
                                size="sm"
                                onClick={() => removeForGood(entry.id)}
                              >
                                {d.removeForGood}
                              </Button>
                              <Button variant="quiet" onClick={() => keep(entry.id)}>
                                {d.keep}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => edit(entry)}>
                                {d.edit}
                              </Button>
                              <Button
                                ref={asked?.id === entry.id ? removeButton : undefined}
                                variant="quiet"
                                onClick={() => ask(entry.id)}
                              >
                                {d.remove}
                              </Button>
                            </>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

type HowItWorksProps = {
  d: DecisionsCopy
  onTemplate: (example: Example) => void
}

/**
 * The folded part of the view: Bayer's three steps, why he works this way,
 * and five examples that can each fill the form. Its own component so the
 * render test reaches it, which it can't behind the `Disclosure`.
 */
export function HowItWorks({ d, onTemplate }: HowItWorksProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-10">
      <ol className="flex list-decimal flex-col gap-4 pl-6 marker:font-display marker:font-semibold marker:text-accent-ink">
        {d.steps.map((step) => (
          <li key={step.title} className="pl-1">
            <p className="text-body font-semibold text-text">{step.title}</p>
            <p className="mt-0.5 text-body leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>

      <section>
        <h2 className="font-display text-title font-semibold">{d.whyTitle}</h2>
        <p className="mt-3 border-l-2 border-accent/50 pl-4 text-body leading-relaxed text-text/90">{d.why}</p>
      </section>

      <section>
        <h2 className="font-display text-title font-semibold">{d.examplesTitle}</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {d.examples.map((example, index) => {
            const areaId = `${id}-area-${index}`
            return (
              <li key={example.area} className="surface flex flex-col gap-4 p-5">
                <h3 id={areaId} className="font-display text-lead font-semibold">
                  {example.area}
                </h3>
                <dl className="flex flex-col gap-3">
                  {DECISION_FIELDS.map((name) => (
                    <div key={name}>
                      <dt className="text-small font-semibold text-muted">{d.fields[name].label}</dt>
                      <dd className="mt-0.5 text-body leading-relaxed text-text/90">{example[name]}</dd>
                    </div>
                  ))}
                </dl>
                {/* Five buttons with the same name: the area they belong to
                    is read after it, not instead of it. */}
                <Button
                  variant="ghost"
                  size="sm"
                  aria-describedby={areaId}
                  onClick={() => onTemplate(example)}
                  className="mt-auto self-start"
                >
                  {d.useTemplate}
                </Button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
