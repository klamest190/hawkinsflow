import type { Copy } from '../i18n/copy.ts'
import type { Language } from '../types.ts'

type LanguageToggleProps = {
  language: Language
  onChange: (next: Language) => void
  t: Copy
}

const OPTIONS: readonly Language[] = ['de', 'en']

/**
 * Zwei Kürzel in einer Kapsel, oben rechts auf jeder Ansicht. Bewusst klein und
 * ohne Flaggen: Flaggen stehen für Länder, nicht für Sprachen, und „de" wird in
 * vier Ländern gesprochen.
 *
 * Beschriftet ist das Kürzel, angesagt wird die Handlung („Auf Englisch
 * umschalten") — sonst liest ein Screenreader zweimal denselben Buchstaben und
 * sagt nicht, was passiert.
 */
export function LanguageToggle({ language, onChange, t }: LanguageToggleProps) {
  return (
    <div
      role="group"
      aria-label={t.languageLabel}
      className="flex items-center gap-0.5 rounded-full border border-line/70 bg-card/50 p-1 backdrop-blur-sm"
    >
      {OPTIONS.map((option) => {
        const active = option === language
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-label={option === 'de' ? t.toGerman : t.toEnglish}
            aria-pressed={active}
            className={
              'cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase ' +
              'transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
              (active ? 'bg-accent/20 text-accent' : 'text-muted hover:text-text')
            }
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
