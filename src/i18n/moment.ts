import type { BelowLevelId, Language } from '../types.ts'

/**
 * Die Texte des Moment-Bogens — der zweiten Tür in diese App.
 *
 * Warum es sie gibt: Der Fragebogen fragt nach den letzten Wochen und antwortet
 * mit einer Landkarte. Wenn dich um Viertel vor drei eine Mail in den Zorn
 * kippt, hilft dir eine Landkarte nicht. Hier stehen vier Schritte und
 * anderthalb Minuten: merken, fühlen, fragen, und dann eine einzige Sache tun.
 *
 * Die Reihenfolge ist wichtig. Ein Gefühl umzudeuten, bevor es gefühlt wurde,
 * schiebt es nur schneller weg — deshalb steht die Minute Stille vor der
 * Rückfrage. Und am Ende steht eine Frage und kein Merksatz: Einem Satz, den
 * man sich vorsagt, widerspricht der Kopf sofort; eine Frage nimmt ihn mit.
 *
 * Wie überall in dieser App ist das deutsche Objekt die Vorlage, `MomentCopy`
 * leitet sich daraus ab — fehlt im Englischen ein Schlüssel, scheitert der Bau.
 */
const de = {
  // ── Der Weg hinein, auf der Startseite ───────────────────────────────────
  enter: 'Ich stecke gerade fest',

  // ── Die Ansicht ──────────────────────────────────────────────────────────
  // „Abbrechen“ und nicht „Zurück“: Unten in der Fußleiste steht ein Zurück,
  // das einen Schritt zurückgeht. Zwei Knöpfe mit demselben Wort und zwei
  // verschiedenen Folgen wären genau die Art Falle, die man in einem Bogen,
  // der bei Angst aufgemacht wird, nicht einbaut. Der Fragebogen sagt an
  // derselben Stelle dasselbe.
  leave: '← Abbrechen',
  stepOf: (current: number, total: number): string => `Schritt ${current} von ${total}`,
  next: 'Weiter',
  back: 'Zurück',
  done: 'Fertig',

  // ── Schritt 1: merken ────────────────────────────────────────────────────
  pickTitle: 'Was ist es gerade?',
  pickLead:
    'Acht Ebenen, alle unter der Schwelle. Nimm die, die am ehesten passt. Du musst es nicht genau treffen. Es geht nur darum, dem Gefühl einen Namen zu geben. Sobald es einen Namen hat, wird es kleiner.',

  // ── Schritt 2: fühlen ────────────────────────────────────────────────────
  feelTitle: 'Einmal ganz fühlen',
  feelBody:
    'Setz dich hin und such die Empfindung im Körper: Kehle, Brust, Bauch, Kiefer, Hände. Bleib dort und erzähl die Geschichte nicht weiter — kein Warum, kein Wer hat angefangen. Nur die Stelle und wie sie sich anfühlt.',
  // Steht unter der Uhr. Eine Übung, die man nicht abbrechen darf, ist eine
  // Prüfung, und Prüfungen macht man nicht, wenn es einem schlecht geht.
  feelNote: 'Die Minute ist ein Angebot, keine Bedingung — du kannst jederzeit weitergehen.',

  // ── Schritt 3: fragen ────────────────────────────────────────────────────
  askTitle: 'Eine Frage',
  askNote:
    'Du musst sie nicht beantworten und schon gar nicht aufschreiben. Es reicht, dass du sie dir einmal gestellt hast.',

  /**
   * Die Rückfrage je Ebene — das eigentliche Werkzeug dieses Bogens.
   *
   * Jede zielt genau auf die Falle ihrer Ebene: bei Zorn auf den unerfüllten
   * Wunsch dahinter, bei Angst auf den Unterschied zwischen dem, was geschehen
   * ist, und dem, was nur gedacht wird, bei Stolz auf das, was gerade
   * verteidigt wird. Keine davon ist als Trost gemeint, und keine lässt sich
   * mit Ja oder Nein beantworten — damit wäre die Bewegung sofort zu Ende.
   *
   * Als `Record` über `BelowLevelId`: Fehlt eine, meldet das der Compiler.
   */
  questions: {
    shame:
      'Was genau ist geschehen — und was hast du daraus über dich selbst gemacht?',
    guilt: 'Wenn dich niemand mehr bestrafen müsste: Was bliebe zu tun?',
    apathy:
      'Was wäre der kleinste Schritt, den du jetzt noch schaffst — auch wenn er lächerlich klein ist?',
    grief: 'Was fehlt dir gerade — und was sagt das darüber, was dir wichtig ist?',
    fear: 'Was davon ist schon geschehen — und was denkst du gerade nur?',
    desire: 'Was willst du wirklich — und was soll das hier gerade ersetzen?',
    anger: 'Was wolltest du, das du nicht bekommen hast?',
    pride: 'Was müsstest du zugeben, wenn es hier nichts zu verteidigen gäbe?',
  } satisfies Record<BelowLevelId, string>,

  // ── Schritt 4: der eine Schritt ──────────────────────────────────────────
  actTitle: 'Und jetzt',
  /* Der eine Satz, um den dieser ganze Bogen gebaut ist. Er steht am Ende und
     nicht am Anfang: Vorher wäre er eine Belehrung gewesen, hier ist er das
     Ergebnis von anderthalb Minuten. */
  noDecision:
    'Entscheide jetzt nichts, was du nicht zurücknehmen kannst. Unter der Schwelle liefert dir dein Kopf Lösungen, die nur in diesem Zustand einleuchten. Morgen sehen sie anders aus.',
  planLabel: 'Dein Plan für diese Ebene',
  // Steht über dem Formular, wenn zu dieser Ebene noch kein Plan existiert.
  // Früher stand hier der Hinweis, man könne nach dem nächsten Fragebogen einen
  // anlegen — eine Sackgasse an der Stelle, an der jemand am ehesten bereit ist,
  // sich etwas vorzunehmen. Jetzt steht dort das Formular, und dieser Satz sagt,
  // warum gerade jetzt.
  planNone:
    'Für diese Ebene steht noch keiner. Schreib ihn jetzt auf, solange der Moment frisch ist — beim nächsten Mal steht er hier, bevor du überlegen musst.',
  mantraLabel: 'Zum Mitnehmen',
  /* Derselbe Maßstab wie beim Fragebogen: Was belegt ist, wird belegt genannt,
     und was Hawkins ist, bleibt Hawkins. */
  sourceNote:
    'Der Ablauf ist alt und nicht von dieser App: bemerken, fühlen, fragen, handeln. Dass ein Gefühl schwächer wird, sobald du es benennst, ist gut untersucht. Für Fragen gilt dasselbe: Sie bewirken mehr als ein Vorsatz. Nur die Zuordnung zu Hawkins’ Ebenen ist nicht untersucht.',

  // ── Die Spur auf der Startseite ──────────────────────────────────────────
  trailTitle: 'Deine Momente',
  trailLead: (count: number): string =>
    count < 2
      ? 'Hier sammelt sich, wann du unter der Schwelle warst und es bemerkt hast. Auf das Bemerken kommt es an.'
      : `${count} Momente. Das ist keine Bilanz, sondern ein Beleg dafür, dass du sie bemerkt hast.`,
  trailLatest: 'zuletzt',
  trailClear: 'Momente löschen',
  trailEntryLabel: (date: string, level: string): string => `${date}: ${level}`,
}

/** Aus der deutschen Vorlage abgeleitet — jede Sprache trägt dieselben Schlüssel. */
export type MomentCopy = typeof de

const en: MomentCopy = {
  enter: 'I am stuck right now',

  leave: '← Cancel',
  stepOf: (current: number, total: number): string => `Step ${current} of ${total}`,
  next: 'Next',
  back: 'Back',
  done: 'Done',

  pickTitle: 'What is it right now?',
  pickLead:
    'Eight levels, all of them below the threshold. Take the one that fits best. You do not have to get it exactly right. It is only about giving the feeling a name. Once it has a name, it gets smaller.',

  feelTitle: 'Feel it once, all the way',
  feelBody:
    'Sit down and look for the sensation in your body: throat, chest, belly, jaw, hands. Stay there and do not carry the story on — no why, no who started it. Only the place and how it feels.',
  feelNote: 'The minute is an offer, not a condition — you can move on at any time.',

  askTitle: 'One question',
  askNote:
    'You do not have to answer it, and certainly not in writing. It is enough that you have asked yourself once.',

  questions: {
    shame: 'What exactly happened — and what have you made of it about yourself?',
    guilt: 'If nobody had to punish you any more: what would be left to do?',
    apathy:
      'What is the smallest step still within reach — even a ridiculously small one?',
    grief: 'What is missing right now — and what does that say about what matters to you?',
    fear: 'How much of this has already happened — and how much are you only thinking?',
    desire: 'What do you actually want — and what is this here meant to replace?',
    anger: 'What did you want that you did not get?',
    pride: 'What would you have to admit if there were nothing here to defend?',
  } satisfies Record<BelowLevelId, string>,

  actTitle: 'And now',
  noDecision:
    'Do not decide anything now that you cannot take back. Below the threshold your mind offers you solutions that only make sense in this state. Tomorrow they look different.',
  planLabel: 'Your plan for this level',
  planNone:
    'There is none for this level yet. Write it now, while the moment is still fresh — next time it will be waiting here before you have to think.',
  mantraLabel: 'To take with you',
  sourceNote:
    'The sequence is old and not this app’s invention: notice, feel, ask, act. That a feeling gets weaker as soon as you name it is well studied. The same goes for questions: they do more than an intention does. Only the link to Hawkins’ levels has not been studied.',

  trailTitle: 'Your moments',
  trailLead: (count: number): string =>
    count < 2
      ? 'This is where it collects: when you were below the threshold and noticed it. The noticing is what counts.'
      : `${count} moments. This is not a tally, it is evidence that you noticed them.`,
  trailLatest: 'latest',
  trailClear: 'Clear the moments',
  trailEntryLabel: (date: string, level: string): string => `${date}: ${level}`,
}

export const momentCopy: Record<Language, MomentCopy> = { de, en }
