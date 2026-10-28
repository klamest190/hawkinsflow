/**
 * One choice as a row of pills — real radio buttons, hidden, behind their
 * labels, so the arrow keys and screen readers work as they do for any
 * radio group. Disabled as a whole while something runs: there is nothing
 * to decide then, by design. Used by Ebb Flow and the guided sessions.
 */
export function Choice({
  legend,
  name,
  options,
  disabled,
}: {
  legend: string
  name: string
  options: { value: string; checked: boolean; onPick: () => void; label: string; detail?: string; spoken?: string }[]
  disabled: boolean
}) {
  return (
    <fieldset disabled={disabled} className="flex flex-col gap-2.5 transition-opacity disabled:opacity-55">
      <legend className="mb-2.5 text-small font-semibold text-muted">{legend}</legend>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option) => (
          <label
            key={option.value}
            className={
              'flex cursor-pointer flex-col items-center gap-0.5 rounded-2xl border border-line bg-void/30 px-2 py-2.5 text-center ' +
              'transition-[border-color,background-color] duration-200 hover:border-accent/40 ' +
              'has-checked:border-accent-ink/60 has-checked:bg-accent/15 ' +
              'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-ink'
            }
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.checked}
              onChange={option.onPick}
              className="sr-only"
            />
            <span className="text-body font-semibold text-text">{option.label}</span>
            {option.detail !== undefined && (
              <span aria-hidden className="tabular text-small text-muted">
                {option.detail}
              </span>
            )}
            {option.spoken !== undefined && <span className="sr-only">{option.spoken}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
