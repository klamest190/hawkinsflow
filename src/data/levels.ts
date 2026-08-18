import type { LevelId, LevelShape } from '../types.ts'

/* Die 17 Ebenen in aufsteigender Reihenfolge — die Reihenfolge im Array ist die
   Ordnung der Skala und wird überall so verwendet (Index = Rang).

   Hier steht nur, was in jeder Sprache gleich ist: Rang, Kalibrierungswert,
   Hawkins' Originalbegriff und die Farbe. Alles, was gelesen wird, steht in
   `i18n/levels.ts` — die Auswertung rechnet mit dieser Datei und muss deshalb
   nie wissen, welche Sprache eingestellt ist.

   Die Farben laufen als Regenbogen von unten nach oben: tiefes Rot bei Scham,
   Gold an der Schwelle 200 (Mut), von dort über Grün und Blau ins Violett der
   obersten Ebenen. In OKLCH notiert, damit die Helligkeit über den ganzen Bogen
   gleichmäßig steigt — in HSL würde das Gelb ausbrechen und alles andere
   stumpf wirken lassen. */
export const LEVELS: LevelShape[] = [
  { id: 'shame', value: 20, original: 'Shame', color: 'oklch(0.48 0.15 15)' },
  { id: 'guilt', value: 30, original: 'Guilt', color: 'oklch(0.50 0.16 25)' },
  { id: 'apathy', value: 50, original: 'Apathy', color: 'oklch(0.53 0.14 38)' },
  { id: 'grief', value: 75, original: 'Grief', color: 'oklch(0.57 0.15 50)' },
  { id: 'fear', value: 100, original: 'Fear', color: 'oklch(0.62 0.16 62)' },
  { id: 'desire', value: 125, original: 'Desire', color: 'oklch(0.68 0.16 74)' },
  { id: 'anger', value: 150, original: 'Anger', color: 'oklch(0.72 0.17 86)' },
  { id: 'pride', value: 175, original: 'Pride', color: 'oklch(0.76 0.16 96)' },
  { id: 'courage', value: 200, original: 'Courage', color: 'oklch(0.85 0.17 102)' },
  { id: 'neutrality', value: 250, original: 'Neutrality', color: 'oklch(0.82 0.16 130)' },
  { id: 'willingness', value: 310, original: 'Willingness', color: 'oklch(0.80 0.15 152)' },
  { id: 'acceptance', value: 350, original: 'Acceptance', color: 'oklch(0.79 0.14 178)' },
  { id: 'reason', value: 400, original: 'Reason', color: 'oklch(0.76 0.14 218)' },
  { id: 'love', value: 500, original: 'Love', color: 'oklch(0.74 0.15 262)' },
  { id: 'joy', value: 540, original: 'Joy', color: 'oklch(0.72 0.16 292)' },
  { id: 'peace', value: 600, original: 'Peace', color: 'oklch(0.72 0.16 320)' },
  { id: 'enlightenment', value: 700, original: 'Enlightenment', color: 'oklch(0.80 0.13 340)' },
]

/** Ab hier ist eine Ebene „lebensbejahend" — Hawkins' berühmte Schwelle. */
export const THRESHOLD = 200

/** Der Rang einer Ebene auf der Skala, 0 (Scham) bis 16 (Erleuchtung). */
export function rankOf(id: LevelId): number {
  return LEVELS.findIndex((level) => level.id === id)
}

/**
 * Die ID der nächsthöheren Ebene; bei Erleuchtung gibt es keine.
 *
 * Gibt bewusst nur die ID zurück und nicht die Ebene selbst: welche Sprache
 * dazugehört, weiß diese Datei nicht.
 */
export function nextLevelId(id: LevelId): LevelId | null {
  return LEVELS[rankOf(id) + 1]?.id ?? null
}
