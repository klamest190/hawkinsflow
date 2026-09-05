import type { Plan, Plans } from '../types.ts'

/* Kürzer als das ist keine Handlung mehr, sondern ein Satzanfang. Der Wert ist
   an den Schritten der Skala geeicht: „Übe Genug" (9) und „Set an end" (10)
   sind vollständige Vorsätze und sollen stehen bleiben, „Frage bei jedem" (15)
   wäre einer — der wird durch den Doppelpunkt ohnehin nicht abgeschnitten. */
const SHORTEST = 8

/** Der Teil vor dem ersten Treffer — oder alles, wenn es keinen gibt. */
function upTo(text: string, delimiter: RegExp): string {
  const cut = text.search(delimiter)
  return (cut === -1 ? text : text.slice(0, cut)).trim()
}

/**
 * Der Kern eines Schritts: alles bis zum ersten Punkt, Doppelpunkt oder
 * Gedankenstrich.
 *
 * Die Schritte in `i18n/levels.ts` sind zwei bis drei Sätze lang — sie erklären
 * sich selbst, und das sollen sie auch. Als Vorschlag für ein „dann" ist das
 * jedoch zu viel: Ein Vorsatz, den man nicht in einem Atemzug sagen kann, ist im
 * entscheidenden Moment nicht abrufbar. Der erste Teil trägt in allen 17 Ebenen
 * die Handlung, was danach kommt, ist Begründung oder Beispiel.
 */
export function actionCore(step: string): string {
  const core = upTo(step, /[.:\u2014]/)

  // Zu kurz heißt: das Trennzeichen stand mitten in der Handlung statt hinter
  // ihr. Dann gilt der ganze erste Satz, und wenn selbst der nichts hergibt,
  // der Schritt so, wie er dasteht — lieber ein langer Vorschlag als ein
  // sinnloser.
  if (core.length >= SHORTEST) return core

  const sentence = upTo(step, /\./)
  return sentence.length >= SHORTEST ? sentence : step.trim()
}

/**
 * Prüft, was aus dem Speicher kommt. Wie bei den Antworten gilt: eine veraltete
 * oder von Hand geänderte Zeile im localStorage darf nicht als Plan durchgehen,
 * sonst stünde auf der Startseite irgendwann `undefined`.
 */
export function isPlans(value: unknown): value is Plans {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false

  return Object.values(value).every((entry) => {
    if (typeof entry !== 'object' || entry === null) return false
    const plan = entry as Partial<Plan>
    return (
      typeof plan.level === 'string' &&
      typeof plan.when === 'string' &&
      typeof plan.then === 'string' &&
      typeof plan.created === 'string'
    )
  })
}

/**
 * Alle Pläne, der zuletzt angelegte zuerst.
 *
 * Die Startseite zeigt den jüngsten ausgeschrieben und die übrigen als Zeile
 * darunter. Dass sie überhaupt alle herausgereicht werden, hat einen Grund: Sie
 * sind sonst über die ganze Skala verstreut. Jede Ebene trägt ihren Plan zwar in
 * ihrem Detailblock, aber niemand klappt siebzehn Ebenen auf, um zu sehen, was
 * er sich vorgenommen hat.
 *
 * Sortiert wird über die ISO-Zeichenkette: Sie ist so gebaut, dass ihre
 * alphabetische Ordnung die zeitliche ist, und spart das Umwandeln in Daten.
 */
export function sortedPlans(plans: Plans): Plan[] {
  return Object.values(plans)
    .filter((plan): plan is Plan => plan !== undefined)
    .sort((a, b) => b.created.localeCompare(a.created))
}
