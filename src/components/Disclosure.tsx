type DisclosureProps = {
  open: boolean
  onToggle: () => void
  /** The id of the region this button shows and hides. */
  controls: string
  children: string
}

/**
 * The button that folds a part of a page away — "more about this level" in the
 * level detail, "how this came about" on the result.
 *
 * A button and not `<details>`: that way it gets the same focus ring and the
 * same fade-in as the rest of the app. `aria-controls` only points at the
 * region while it exists.
 */
export function Disclosure({ open, onToggle, controls, children }: DisclosureProps) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={open ? controls : undefined}
      onClick={onToggle}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-line bg-void/30 px-5 py-3.5 text-left text-[14px] font-semibold text-text transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
    >
      {children}
      <span
        aria-hidden
        className={'text-[13px] text-muted transition-transform duration-300 ' + (open ? 'rotate-180' : '')}
      >
        ▾
      </span>
    </button>
  )
}
