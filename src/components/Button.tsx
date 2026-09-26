import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'ghost' | 'quiet'
type Size = 'md' | 'sm'

/** Eigene Props plus alles, was ein <button> ohnehin kann (onClick, disabled …). */
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant
  /** For primary and ghost; the quiet variant has one size of its own. */
  size?: Size
}

/* No padding, font size or weight here. They used to sit in `base` and again
   in `quiet`, and when two utilities for the same property meet on one
   element, Tailwind lets the one later in the stylesheet win — `px-7` beat
   `px-4`, so every quiet button came out wider, larger and bolder than
   written, and the `-ml-4` meant to line its text up with the edge fell 12px
   short. For the same reason sizes are a prop and not a `className` override. */
const base =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border ' +
  'tracking-[0.01em] ' +
  'transition-[transform,box-shadow,border-color,color,background-color] duration-300 ease-out ' +
  'hover:-translate-y-px active:translate-y-0 active:scale-[0.985] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink ' +
  'disabled:pointer-events-none disabled:opacity-40'

const variants: Record<Variant, string> = {
  // Der Verlauf ist minimal — er soll die Fläche wölben, nicht als Verlauf auffallen.
  primary:
    'font-semibold border-transparent bg-accent-ink bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(0,0,0,0.10))] ' +
    'text-(--hf-on-accent) shadow-[0_1px_0_rgba(255,255,255,0.28)_inset,0_14px_34px_-14px_var(--hf-accent)] ' +
    'hover:shadow-[0_1px_0_rgba(255,255,255,0.34)_inset,0_20px_44px_-16px_var(--hf-accent)]',
  ghost:
    'font-semibold border-line bg-card/60 text-muted backdrop-blur-sm ' +
    'hover:border-accent/50 hover:bg-card hover:text-text',
  quiet: 'border-transparent bg-transparent px-4 py-2 text-[14px] font-medium text-muted hover:text-text',
}

const sizes: Record<Size, string> = {
  md: 'px-7 py-3 text-[15px]',
  sm: 'px-4 py-2 text-[13.5px]',
}

export function Button({ variant = 'primary', size = 'md', className = '', ...rest }: ButtonProps) {
  const measure = variant === 'quiet' ? '' : sizes[size]
  return <button className={`${base} ${measure} ${variants[variant]} ${className}`} {...rest} />
}
