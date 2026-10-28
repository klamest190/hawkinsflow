import { useEffect, useId, useRef, useState } from 'react'
import type { Copy } from '../i18n/copy.ts'
import { LONGEST, answersOf } from '../lib/notes.ts'
import type { NoteAnswer, Notes } from '../types.ts'
import { Chip, Timer } from './Timer.tsx'

/**
 * Where a level's kept entries come from and go to. Built per level by the
 * view that shows it; absent where nothing can be kept, and then the fields
 * still work and only forget.
 */
export type Journal = {
  /** This level's kept entries, oldest first. */
  notes: Notes
  onKeep: (answers: NoteAnswer[]) => void
  onDelete: (at: string) => void
}

type WritingProps = {
  prompts: string[]
  /** A line above the fields, for the reframe. */
  lead?: string
  /** The practice's clock, under the fields. */
  minutes?: number
  t: Copy
  journal?: Journal
}

/**
 * The fields of a writing practice: one per question, and a "keep".
 *
 * Nothing is stored while someone writes. The text lives in this component
 * and goes with it — on leaving the practice, flipping to the next one,
 * closing the level. That is the deal the hint under the fields states, and
 * the reason "keep" is a tap and not a default: what is written for a reader
 * is written differently, and the only reader here would be oneself.
 */
export function Writing({ prompts, lead, minutes, t, journal }: WritingProps) {
  const [texts, setTexts] = useState<string[]>(() => prompts.map(() => ''))
  const [kept, setKept] = useState(false)
  const [showKept, setShowKept] = useState(false)
  const id = useId()
  const toggle = useRef<HTMLButtonElement>(null)
  const firstField = useRef<HTMLTextAreaElement>(null)

  const answers = answersOf(prompts, texts)
  const notes = journal?.notes ?? []

  /* After keeping, the keep chip is gone with the text it kept; the toggle
     to the kept entries takes the focus. It only exists from the next render
     on when this was the first entry, hence the effect. */
  useEffect(() => {
    if (kept) toggle.current?.focus()
  }, [kept])

  function keep() {
    if (journal === undefined || answers === null) return
    journal.onKeep(answers)
    setTexts(prompts.map(() => ''))
    setKept(true)
  }

  function remove(at: string) {
    journal?.onDelete(at)
    // The delete link goes with its entry. The toggle stays while others are
    // left; after the last one, the first field is the nearest place.
    ;(notes.length > 1 ? toggle : firstField).current?.focus()
  }

  return (
    <div className="mt-5 flex flex-col gap-4 border-t border-accent/20 pt-4">
      {lead !== undefined && <p className="text-body leading-relaxed text-text/85">{lead}</p>}

      {prompts.map((prompt, index) => (
        <label key={prompt} className="flex flex-col gap-1.5">
          <span className="text-small leading-snug font-semibold text-text/90">{prompt}</span>
          <textarea
            ref={index === 0 ? firstField : undefined}
            rows={3}
            maxLength={LONGEST}
            value={texts[index] ?? ''}
            onChange={(event) => {
              const value = event.target.value
              setTexts((previous) => previous.map((text, at) => (at === index ? value : text)))
              setKept(false)
            }}
            className="resize-y rounded-xl border border-line bg-void/40 px-3.5 py-2.5 text-body leading-relaxed text-text transition-colors focus:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
          />
        </label>
      ))}

      <p className="text-small leading-relaxed text-muted">
        {journal === undefined ? t.writeHintNoKeep : t.writeHint}
      </p>

      {journal !== undefined && (
        <div className="flex flex-wrap items-center gap-3">
          {answers !== null && (
            <Chip onClick={keep} strong>
              {t.writeKeep}
            </Chip>
          )}
          {notes.length > 0 && (
            <Chip
              ref={toggle}
              onClick={() => setShowKept((previous) => !previous)}
              expanded={showKept}
              controls={`${id}-kept`}
            >
              {showKept ? t.notesHide : t.notesShow(notes.length)}
            </Chip>
          )}
          <p role="status" className="empty:hidden text-small text-text/90">
            {kept ? t.writeKept : ''}
          </p>
        </div>
      )}

      {/* Folded by default: the entries are private, and the practice card
          is also what someone shows when they show the app. Newest first. */}
      {journal !== undefined && showKept && notes.length > 0 && (
        <ul id={`${id}-kept`} className="animate-rise flex flex-col gap-3">
          {[...notes].reverse().map((note) => {
            const date = t.noteDate(note.at)
            return (
              <li key={note.at} className="rounded-xl border border-line bg-void/30 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="tabular text-small font-semibold text-muted">{date}</p>
                  <button
                    type="button"
                    onClick={() => remove(note.at)}
                    aria-label={t.noteDeleteLabel(date)}
                    className="shrink-0 cursor-pointer text-small font-medium text-muted underline decoration-line underline-offset-4 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                  >
                    {t.noteDelete}
                  </button>
                </div>
                {note.answers.map((answer) => (
                  <div key={answer.prompt} className="mt-2.5">
                    <p className="text-small leading-snug text-muted">{answer.prompt}</p>
                    <p className="mt-0.5 text-body leading-relaxed whitespace-pre-wrap text-text/90">
                      {answer.text}
                    </p>
                  </div>
                ))}
              </li>
            )
          })}
        </ul>
      )}

      {minutes !== undefined && <Timer minutes={minutes} t={t} />}
    </div>
  )
}
