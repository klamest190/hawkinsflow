import type { BelowLevelId, Language } from '../types.ts'

/**
 * Die Texte des Moment-Bogens — der zweiten Tür in diese App.
 *
 * Warum es sie gibt: Der Fragebogen fragt nach den letzten Wochen und antwortet
 * mit einer Landkarte. Wenn dich um Viertel vor drei eine Mail in den Zorn
 * kippt, ist eine Landkarte das Falscheste, was man dir anbieten kann. Hier
 * stehen vier Schritte und anderthalb Minuten: merken, fühlen, fragen, und dann
 * eine einzige Sache tun.
 *
 * Die Reihenfolge ist der Inhalt. Ein Gefühl umzudeuten, bevor es gefühlt
 * wurde, ist nur eine schnellere Art, es wegzuschieben — deshalb steht die
 * Minute Stille vor der Rückfrage. Und die Rückfrage ist eine Frage und kein
 * Merksatz: Ein Satz, den man sich vorsagt, trifft auf einen Kopf, der ihm
 * widerspricht; eine Frage nimmt ihn in Dienst.
 *
 * Wie überall in dieser App ist das deutsche Objekt die Vorlage, `MomentCopy`
 * leitet sich daraus ab — fehlt im Englischen ein Schlüssel, scheitert der Bau.
 */
const de = {
  // ── Der Weg hinein, auf der Startseite ───────────────────────────────────
  enter: 'Ich stecke gerade fest',

  // ── Die Ansicht ──────────────────────────────────────────────────────────
  // „Abbrechen" und nicht „Zurück": Unten in der Fußleiste steht ein Zurück,
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
    'Acht Ebenen, alle unter der Schwelle. Nimm die, die am ehesten passt — genau treffen musst du nicht. Es geht darum, dass es einen Namen bekommt: Etwas, das benannt ist, hat schon aufgehört, alles zu sein.',

  // ── Schritt 2: fühlen ────────────────────────────────────────────────────
  feelTitle: 'Einmal ganz fühlen',
  feelBody:
    'Setz dich hin und such die Empfindung im Körper: Kehle, Brust, Bauch, Kiefer, Hände. Bleib dort, ohne die Geschichte weiterzuerzählen — kein Warum, kein Wer hat angefangen. Nur die Stelle und wie sie sich anfühlt.',
  // Steht unter der Uhr. Eine Übung, die man nicht abbrechen darf, ist eine
  // Prüfung, und Prüfungen macht man nicht, wenn es einem schlecht geht.
  feelNote: 'Die Minute ist ein Angebot, keine Bedingung — weiter geht es jederzeit.',

  // ── Schritt 3: fragen ────────────────────────────────────────────────────
  askTitle: 'Eine Frage',
  askNote:
    'Du musst sie nicht beantworten und schon gar nicht aufschreiben. Es reicht, dass sie im Raum steht.',

  /**
   * Die Rückfrage je Ebene — der eigentliche Griff dieses Bogens.
   *
   * Jede zielt auf die Falle ihrer Ebene und auf nichts sonst: Bei Zorn auf den
   * unerfüllten Wunsch dahinter, bei Angst auf den Unterschied zwischen dem, was
   * geschehen ist, und dem, was gedacht wird, bei Stolz auf das, was gerade
   * verteidigt wird. Keine davon ist tröstlich gemeint, und keine lässt sich mit
   * Ja oder Nein beantworten — beides wäre das Ende der Bewegung.
   *
   * Als `Record` über `BelowLevelId`: Fehlt eine, meldet das der Compiler.
   */
  questions: {
    shame:
      'Was genau ist geschehen — und was davon hast du daraus über dich selbst gemacht?',
    guilt: 'Wenn dich niemand mehr bestrafen müsste: Was bliebe zu tun?',
    apathy:
      'Was wäre der kleinste Schritt, den du jetzt noch schaffst — auch wenn er lächerlich klein ist?',
    grief: 'Was fehlt dir gerade — und was sagt das über das, was dir wichtig ist?',
    fear: 'Was davon ist schon geschehen — und was denkst du gerade nur?',
    desire: 'Wonach ist dir wirklich — und was soll das hier gerade ersetzen?',
    anger: 'Was wolltest du, das du nicht bekommen hast?',
    pride: 'Was müsstest du zugeben, wenn hier nichts zu verteidigen wäre?',
  } satisfies Record<BelowLevelId, string>,

  // ── Schritt 4: der eine Schritt ──────────────────────────────────────────
  actTitle: 'Und jetzt',
  /* Der eine Satz, um den dieser ganze Bogen gebaut ist. Er steht am Ende und
     nicht am Anfang: Vorher wäre er eine Belehrung gewesen, hier ist er das
     Ergebnis von anderthalb Minuten. */
  noDecision:
    'Triff jetzt nichts, was du nicht zurücknehmen kannst. Unter der Schwelle liefert der Kopf Lösungen, die von hier unten einleuchten — und nur von hier unten.',
  planLabel: 'Dein Plan für diese Ebene',
  planNone:
    'Für diese Ebene steht noch kein Wenn-Dann-Plan. Nach dem nächsten Durchgang durch den Fragebogen kannst du einen anlegen — dann steht er beim nächsten Mal genau hier.',
  mantraLabel: 'Zum Mitnehmen',
  /* Derselbe Maßstab wie beim Fragebogen: Was belegt ist, wird belegt genannt,
     und was Hawkins ist, bleibt Hawkins. */
  sourceNote:
    'Der Ablauf ist alt und nicht von dieser App: bemerken, fühlen, fragen, handeln. Dass ein benanntes Gefühl messbar an Wucht verliert und dass eine Frage weiter trägt als ein Vorsatz, ist gut untersucht. Die Zuordnung zu Hawkins’ Ebenen ist es nicht.',

  // ── Die Spur auf der Startseite ──────────────────────────────────────────
  trailTitle: 'Deine Momente',
  trailLead: (count: number): string =>
    count < 2
      ? 'Hier sammelt sich, wann du unter der Schwelle standst — und dass du es bemerkt hast. Das Bemerken ist der ganze Punkt.'
      : `${count} Momente. Keine Bilanz — ein Beleg dafür, dass du sie bemerkt hast.`,
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
    'Eight levels, all of them below the threshold. Take the one that fits best — you do not have to get it exactly right. The point is that it gets a name: once something is named, it has stopped being everything.',

  feelTitle: 'Feel it once, all the way',
  feelBody:
    'Sit down and look for the sensation in your body: throat, chest, belly, jaw, hands. Stay there without carrying the story on — no why, no who started it. Only the place and how it feels.',
  feelNote: 'The minute is an offer, not a condition — you can move on at any time.',

  askTitle: 'One question',
  askNote:
    'You do not have to answer it, and certainly not in writing. It is enough that it is in the room.',

  questions: {
    shame: 'What exactly happened — and what have you made of it about yourself?',
    guilt: 'If nobody had to punish you any more: what would be left to do?',
    apathy:
      'What is the smallest step still within reach — even a ridiculous one?',
    grief: 'What is missing right now — and what does that say about what matters to you?',
    fear: 'How much of this has already happened — and how much are you only thinking?',
    desire: 'What are you actually after — and what is this here meant to replace?',
    anger: 'What did you want that you did not get?',
    pride: 'What would you have to admit if there were nothing here to defend?',
  } satisfies Record<BelowLevelId, string>,

  actTitle: 'And now',
  noDecision:
    'Decide nothing now that you cannot take back. Below the threshold the mind supplies solutions that make sense from down here — and only from down here.',
  planLabel: 'Your plan for this level',
  planNone:
    'There is no if–then plan for this level yet. You can write one after your next run through the questionnaire — then it will be waiting right here.',
  mantraLabel: 'To take with you',
  sourceNote:
    'The sequence is old and not this app’s invention: notice, feel, ask, act. That naming a feeling measurably takes the force out of it, and that a question carries further than an intention, is well studied. Pinning it to Hawkins’ levels is not.',

  trailTitle: 'Your moments',
  trailLead: (count: number): string =>
    count < 2
      ? 'This is where it collects: when you were below the threshold, and that you noticed. The noticing is the whole point.'
      : `${count} moments. Not a tally — evidence that you noticed them.`,
  trailLatest: 'latest',
  trailClear: 'Clear the moments',
  trailEntryLabel: (date: string, level: string): string => `${date}: ${level}`,
}

export const momentCopy: Record<Language, MomentCopy> = { de, en }
