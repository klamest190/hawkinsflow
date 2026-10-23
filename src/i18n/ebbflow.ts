import type { EbbMode } from '../lib/ebbflow.ts'
import type { Language } from '../types.ts'

/** A rhythm's name and what it is for. */
type ModeText = { name: string; use: string }

/**
 * The texts of Ebb Flow: a pause between impulse and reaction, breathed in
 * and out like the tide. The concept and the three rhythms come from the
 * Ebb Flow app; here they live as one place in the navigation.
 *
 * As everywhere in this app, the German object is the template.
 */
const de = {
  title: 'Ebb Flow',
  lead: 'Eine Pause zwischen Reiz und Reaktion. Du atmest ein und aus wie Ebbe und Flut, sechs Atemzüge in der Minute, bis der Ring abgelaufen ist. Danach entscheidest du, und nicht der Impuls.',

  modeLegend: 'Rhythmus',
  // From calming to clear. The name is what it does, the line under the
  // choice says when it fits.
  modes: {
    relax: { name: 'Ruhe', use: 'Abends, bei Hektik, zum Einschlafen. Der längere Ausatem bremst den Puls.' },
    balance: { name: 'Mitte', use: 'Tagsüber, für Ausgeglichenheit und einen klaren Kopf. Nichts zieht in eine Richtung.' },
    clarity: {
      name: 'Klarheit',
      use: 'Bei Müdigkeit oder vor etwas, das Konzentration braucht. Die wachste der drei Verlangsamungen.',
    },
  } satisfies Record<EbbMode, ModeText>,
  split: (inhale: number, exhale: number): string => `${inhale} Sekunden ein, ${exhale} Sekunden aus`,
  inhaleShort: (seconds: number): string => `${seconds} s ein`,
  exhaleShort: (seconds: number): string => `${seconds} s aus`,

  durationLegend: 'Dauer',
  duration: (seconds: number): string => (seconds < 60 ? `${seconds} s` : `${seconds / 60} min`),
  // The app counts in breaths, not minutes — this is the line that says so.
  breaths: (count: number): string => (count === 1 ? 'Ein Atemzug' : `${count} Atemzüge`),

  start: 'Beginnen',
  again: 'Noch einmal',
  done: 'Die Pause ist um. Jetzt entscheidest du, nicht der Impuls.',
  // While it runs there is nothing to choose; the line says why the choice is grey.
  locked: 'Während der Pause gibt es nichts zu wählen.',

  whyTitle: 'Warum zehn Sekunden',
  whyBody:
    'Alle drei Rhythmen dauern zehn Sekunden je Atemzug, also sechs in der Minute. In diesem Tempo schwingen Herzschlag und Atem miteinander: Beim Einatmen schlägt das Herz etwas schneller, beim Ausatmen langsamer, und bei vielen Menschen wird diese Schwankung um sechs Atemzüge pro Minute am größten. Das ist gut gemessen. Der Rhythmus ändert nur die Neigung: Ein längerer Ausatem bremst stärker, ein längerer Einatem weniger.',
  whySource: 'Lehrer & Gevirtz (2014), Frontiers in Psychology · Zaccaro et al. (2018), Frontiers in Human Neuroscience',

  // A quote for each pause, from the Ebb Flow app. Only the index is kept,
  // so a quote on screen switches along with the language — both lists must
  // carry the same thought line for line, which a test checks by length.
  // Three lines that named "twenty seconds" say "the pause" here: a pause in
  // this app runs up to five minutes.
  quotes: [
    'Zwischen dem, was auf dich einwirkt, und dem, was du tust, liegt ein kurzer, freier Raum.',
    'Die Welle steigt. Du musst sie nicht reiten – du kannst sie auch einfach vorbeiziehen lassen.',
    'Nicht jeder Gedanke, der laut ruft, verdient eine Antwort.',
    'Was jetzt dringend wirkt, ist nach der Pause meist nur ein Gedanke unter vielen.',
    'Du entscheidest nicht, ob der Impuls kommt. Du entscheidest, was danach passiert.',
    'Ruhe ist kein Zustand, den man abwartet. Sie ist einer, den man kurz herstellt.',
    'Ein Reiz ist ein Vorschlag, keine Anweisung.',
    'Das Meer zieht sich zurück, bevor die nächste Welle kommt. Auch das ist ein Rhythmus.',
    'Was du jetzt nicht tust, kannst du in einer Minute immer noch tun.',
    'Dringlichkeit ist ein Gefühl, keine Tatsache.',
    'Der Impuls will Tempo. Gib ihm stattdessen Zeit.',
    'Du musst nicht glauben, was die erste Sekunde dir sagt.',
    'Ein aufgeschobener Klick hat noch nie etwas kaputt gemacht.',
    'Die Nachricht ist nach der Pause noch da. Deine Ruhe vielleicht nicht.',
    'Atme aus, bevor du antwortest.',
    'Was aufwühlt, will gesehen werden – nicht sofort bedient.',
    'Zwischen Reiz und Reaktion darfst du wohnen bleiben.',
    'Ein Impuls ist ein Gast, kein Befehl.',
    'Du kannst den Gedanken bemerken, ohne ihm zu folgen.',
    'Diese Pause gehört dir – niemandem sonst.',
  ],
}

/** Derived from the German template — every language carries the same keys. */
export type EbbCopy = typeof de

const en: EbbCopy = {
  title: 'Ebb Flow',
  lead: 'A pause between impulse and reaction. You breathe in and out like ebb and flow, six breaths a minute, until the ring has run down. After that, you decide — not the impulse.',

  modeLegend: 'Rhythm',
  modes: {
    relax: { name: 'Calm', use: 'In the evening, in a rush, to fall asleep. The longer out-breath slows the pulse.' },
    balance: { name: 'Centre', use: 'During the day, for balance and a clear head. Nothing pulls either way.' },
    clarity: {
      name: 'Clarity',
      use: 'When tired, or before something that needs concentration. The most awake of the three slow breaths.',
    },
  },
  split: (inhale: number, exhale: number): string => `${inhale} seconds in, ${exhale} seconds out`,
  inhaleShort: (seconds: number): string => `${seconds} s in`,
  exhaleShort: (seconds: number): string => `${seconds} s out`,

  durationLegend: 'Length',
  duration: (seconds: number): string => (seconds < 60 ? `${seconds} s` : `${seconds / 60} min`),
  breaths: (count: number): string => (count === 1 ? 'One breath' : `${count} breaths`),

  start: 'Begin',
  again: 'Once more',
  done: 'The pause is over. Now you decide, not the impulse.',
  locked: 'There is nothing to choose while the pause runs.',

  whyTitle: 'Why ten seconds',
  whyBody:
    'All three rhythms take ten seconds a breath, which is six a minute. At that pace heartbeat and breath swing together: the heart beats a little faster on the in-breath and slower on the out-breath, and for many people that swing is largest at around six breaths a minute. That is well measured. The rhythm only changes the lean: a longer out-breath slows things more, a longer in-breath less.',
  whySource: 'Lehrer & Gevirtz (2014), Frontiers in Psychology · Zaccaro et al. (2018), Frontiers in Human Neuroscience',

  quotes: [
    'Between what acts on you and what you do lies a brief, open space.',
    'The wave is rising. You do not have to ride it – you can let it pass.',
    'Not every thought that shouts deserves an answer.',
    'What feels urgent now is usually one thought among many once the pause is over.',
    'You do not decide whether the urge arrives. You decide what happens next.',
    'Calm is not a state you wait for. It is one you make, briefly.',
    'A stimulus is a suggestion, not an instruction.',
    'The sea draws back before the next wave. That, too, is a rhythm.',
    'What you do not do now, you can still do a minute from now.',
    'Urgency is a feeling, not a fact.',
    'The urge wants speed. Give it time instead.',
    'You do not have to believe what the first second tells you.',
    'A postponed tap has never broken anything.',
    'The message will still be there after the pause. Your calm might not be.',
    'Breathe out before you answer.',
    'What stirs you wants to be seen – not immediately obeyed.',
    'You are allowed to linger between stimulus and response.',
    'An urge is a guest, not a command.',
    'You can notice the thought without following it.',
    'This pause belongs to you – to no one else.',
  ],
}

export const ebbCopy: Record<Language, EbbCopy> = { de, en }
