import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'ghost' | 'quiet'

/** Eigene Props plus alles, was ein <button> ohnehin kann (onClick, disabled …). */
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant
}

const base =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border ' +
  'px-7 py-3 text-[15px] font-semibold tracking-[0.01em] ' +
  'transition-[transform,box-shadow,border-color,color,background-color] duration-300 ease-out ' +
  'hover:-translate-y-px active:translate-y-0 active:scale-[0.985] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ' +
  'disabled:pointer-events-none disabled:opacity-40'

const variants: Record<Variant, string> = {
  // Der Verlauf ist minimal — er soll die Fläche wölben, nicht als Verlauf auffallen.
  primary:
    'border-transparent bg-accent bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(0,0,0,0.10))] ' +
    'text-[#12080c] shadow-[0_1px_0_rgba(255,255,255,0.28)_inset,0_14px_34px_-14px_var(--hf-accent)] ' +
    'hover:shadow-[0_1px_0_rgba(255,255,255,0.34)_inset,0_20px_44px_-16px_var(--hf-accent)]',
  ghost:
    'border-line bg-card/60 text-muted backdrop-blur-sm ' +
    'hover:border-accent/50 hover:bg-card hover:text-text',
  quiet: 'border-transparent bg-transparent px-4 py-2 text-[14px] font-medium text-muted hover:text-text',
}

export function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />
}
