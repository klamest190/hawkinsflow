import { BREATH_PATTERNS } from '../data/breathing.ts'
import type { Copy } from '../i18n/copy.ts'
import type { PracticeTool as Tool } from '../types.ts'
import { Breath } from './Breath.tsx'
import { Grounding } from './Grounding.tsx'
import { Timer } from './Timer.tsx'

type PracticeToolProps = {
  tool: Tool
  t: Copy
}

/**
 * The instrument under a practice's instructions, picked by its kind.
 *
 * Every kind has its own case and the switch has no default: a new kind in
 * `PracticeTool` fails the build here instead of rendering nothing.
 *
 * The caller keys it by practice, so flipping to the next practice starts a
 * fresh instrument instead of carrying over the last one's state.
 */
export function PracticeTool({ tool, t }: PracticeToolProps) {
  switch (tool.kind) {
    case 'timer':
      return <Timer minutes={tool.minutes} t={t} />
    case 'breath':
      return <Breath pattern={BREATH_PATTERNS[tool.pattern]} minutes={tool.minutes} t={t} />
    case 'grounding':
      return <Grounding t={t} />
  }
}
