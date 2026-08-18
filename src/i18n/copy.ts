import type { Language } from '../types.ts'

/**
 * Alle Beschriftungen der Oberfläche. Das deutsche Objekt ist die Vorlage, `Copy`
 * leitet sich daraus ab — fehlt im Englischen ein Schlüssel, scheitert der Build
 * mit `TS2741`, statt dass irgendwo `undefined` steht.
 *
 * Werte, in denen eine Zahl vorkommt, sind Funktionen und keine Platzhalter-
 * Zeichenketten: so kann jede Sprache die Zahl dort einsetzen, wo ihr Satzbau sie
 * verlangt.
 */
const de = {
  appName: 'Hawkins Flow',
  documentTitle: 'Hawkins Flow — die Skala des Bewusstseins',

  languageLabel: 'Sprache',
  toGerman: 'Auf Deutsch umschalten',
  toEnglish: 'Auf Englisch umschalten',

  // ── Start ────────────────────────────────────────────────────────────────
  introLead: (questions: number): string =>
    `Die Skala des Bewusstseins nach David R. Hawkins — von Scham (20) bis Erleuchtung (700). ${questions} Aussagen zeigen dir, wo dein Schwerpunkt gerade liegt, was dich dort hält und was der nächste Schritt ist.`,
  start: 'Fragebogen starten',
  resume: (question: number): string => `Weiter bei Frage ${question}`,
  restartFromScratch: 'Von vorn beginnen',
  browseFirst: 'Erst die Skala ansehen',
  // Steht klein unter den Knöpfen. Eine App, die einem Menschen eine Zahl
  // aufschreibt, muss sagen, woher die Zahl kommt.
  disclaimer:
    'Hawkins’ Kalibrierungen stammen aus dem kinesiologischen Muskeltest und sind wissenschaftlich nicht belegt. Nimm das Ergebnis als Spiegel für die Selbstreflexion — nicht als Diagnose. Bei anhaltender Belastung hilft ein Mensch vom Fach mehr als jede App.',

  // ── Fragebogen ───────────────────────────────────────────────────────────
  quizPrompt: 'Wie oft trifft das zu?',
  quizProgress: (current: number, total: number): string => `${current} / ${total}`,
  quizAbort: '← Abbrechen',
  back: 'Zurück',
  skip: 'Überspringen',
  evaluate: 'Auswerten',
  answers: ['Nie', 'Selten', 'Manchmal', 'Oft', 'Fast immer'],
  progressLabel: 'Fortschritt',

  // ── Ergebnis ─────────────────────────────────────────────────────────────
  focusLabel: 'Dein Schwerpunkt',
  // Steht unter dem Band. Sagt genau das, was der Bogen hergibt — und was
  // nicht. Die Zahl der Aussagen kommt als Wert herein, damit der Satz stimmt,
  // wenn der Bogen einmal wächst.
  bandNote: (lower: string, upper: string, questions: number): string =>
    `Aus ${questions} Aussagen lässt sich nicht genauer ablesen als: irgendwo zwischen ${lower} und ${upper}. Eine einzelne Zahl wäre eine Genauigkeit, die es hier nicht gibt.`,
  // Der zweite Hinweis, und der wichtigere: Er steht dort, wo das Ergebnis
  // steht, und nicht nur am Anfang, wo noch nichts zu glauben war.
  resultDisclaimer:
    'Dieser Bogen ist kein geprüftes Testverfahren: zwei Aussagen je Ebene, alle gleich gepolt, keine Normstichprobe, keine Validierung. Und Hawkins’ Kalibrierungen stammen aus dem kinesiologischen Muskeltest, der sich unter Verblindung nicht bestätigen lässt. Nimm das hier als Anstoß zum Nachdenken — nicht als Messung.',
  wholeScale: 'Ganze Skala',
  restart: 'Neu starten',
  emotionLabel: 'Gefühl',
  worldviewLabel: 'Weltsicht',
  aboveThreshold: (threshold: number): string =>
    `Du stehst über der Schwelle von ${threshold}. Ab hier gibst du mehr Kraft in die Welt, als du ihr entziehst.`,
  belowThreshold: (threshold: number, courage: string): string =>
    `Die Schwelle liegt bei ${threshold} (${courage}). Darunter kostet das Leben mehr Kraft, als es zurückgibt — und genau dort ist der Aufstieg am spürbarsten.`,
  partial: (answered: number, total: number): string =>
    `${answered} von ${total} Fragen beantwortet — das Bild ist noch vorläufig.`,
  profileTitle: 'Dein Profil',
  profileLead:
    'Kein Mensch steht nur auf einer Ebene. Was hier alles leuchtet, ist gleichzeitig in dir vorhanden — der Schwerpunkt ist nur das Mittel daraus.',
  dragTitle: 'Was dich nach unten zieht',
  dragBody: (trap: string): string =>
    `Diese Ebene ist deutlich vorhanden, obwohl dein Schwerpunkt darüber liegt. Hier liegt meist die eigentliche Arbeit: ${trap}`,
  reachTitle: 'Wohin du schon reichst',
  reachBody:
    'So hoch reichen deine besten Momente bereits. Was du dort kennst, ist keine Theorie mehr — es muss nur häufiger werden.',
  levelHeading: (value: number, name: string): string => `Ebene ${value} · ${name}`,
  nextLabel: 'Als Nächstes',
  seeAllLevels: (count: number): string => `Alle ${count} Ebenen ansehen`,
  repeatQuiz: 'Fragebogen wiederholen',

  // ── Die Ebene im Detail ──────────────────────────────────────────────────
  signsHeading: 'Woran du es erkennst',
  trapHeading: 'Was dich hier hält',
  wayTo: (next: string): string => `Der Weg nach ${next}`,
  wayEnds: 'Der Weg endet hier',

  // ── Skala ────────────────────────────────────────────────────────────────
  backArrow: '← Zurück',
  scaleTitle: 'Die Skala',
  scaleLead: (levels: number, threshold: number, courage: string): string =>
    `${levels} Ebenen von 20 bis 700. Ab ${threshold} — ${courage} — kippt das Vorzeichen: darunter zehrt das Leben, darüber gibt es. Tippe eine Ebene an.`,
  thresholdMark: (threshold: number): string => `Schwelle ${threshold}`,
  yourLevel: '◆ deine Ebene',
}

/** Aus der deutschen Vorlage abgeleitet — jede Sprache trägt dieselben Schlüssel. */
export type Copy = typeof de

const en: Copy = {
  appName: 'Hawkins Flow',
  documentTitle: 'Hawkins Flow — the Map of Consciousness',

  languageLabel: 'Language',
  toGerman: 'Switch to German',
  toEnglish: 'Switch to English',

  introLead: (questions: number): string =>
    `David R. Hawkins’ Map of Consciousness — from Shame (20) to Enlightenment (700). ${questions} statements show you where your centre of gravity sits right now, what holds you there and what the next step is.`,
  start: 'Start the questionnaire',
  resume: (question: number): string => `Continue at question ${question}`,
  restartFromScratch: 'Start over',
  browseFirst: 'Look at the scale first',
  disclaimer:
    'Hawkins’ calibrations come from applied kinesiology (muscle testing) and are not scientifically established. Take the result as a mirror for self-reflection — not as a diagnosis. If something weighs on you for long, a professional helps more than any app.',

  quizPrompt: 'How often is this true?',
  quizProgress: (current: number, total: number): string => `${current} / ${total}`,
  quizAbort: '← Cancel',
  back: 'Back',
  skip: 'Skip',
  evaluate: 'See result',
  answers: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'],
  progressLabel: 'Progress',

  focusLabel: 'Your centre of gravity',
  bandNote: (lower: string, upper: string, questions: number): string =>
    `${questions} statements cannot read closer than this: somewhere between ${lower} and ${upper}. A single number would claim a precision that is not there.`,
  resultDisclaimer:
    'This questionnaire is not a validated instrument: two statements per level, all worded in the same direction, no reference sample, no validation. And Hawkins’ calibrations come from applied kinesiology, which does not hold up under blinding. Take this as a prompt for reflection — not as a measurement.',
  wholeScale: 'Whole scale',
  restart: 'Start over',
  emotionLabel: 'Emotion',
  worldviewLabel: 'View of the world',
  aboveThreshold: (threshold: number): string =>
    `You stand above the threshold of ${threshold}. From here you put more strength into the world than you take out of it.`,
  belowThreshold: (threshold: number, courage: string): string =>
    `The threshold sits at ${threshold} (${courage}). Below it, living costs more strength than it returns — and that is exactly where climbing is felt most.`,
  partial: (answered: number, total: number): string =>
    `${answered} of ${total} questions answered — the picture is still provisional.`,
  profileTitle: 'Your profile',
  profileLead:
    'Nobody stands on a single level. Everything lit up here is present in you at the same time — your centre of gravity is only the mean of it.',
  dragTitle: 'What pulls you down',
  dragBody: (trap: string): string =>
    `This level is clearly present even though your centre of gravity sits above it. This is usually where the real work is: ${trap}`,
  reachTitle: 'How far you already reach',
  reachBody:
    'Your best moments already reach this high. What you know up there is no longer theory — it only has to become more frequent.',
  levelHeading: (value: number, name: string): string => `Level ${value} · ${name}`,
  nextLabel: 'Up next',
  seeAllLevels: (count: number): string => `See all ${count} levels`,
  repeatQuiz: 'Take the questionnaire again',

  signsHeading: 'How you recognise it',
  trapHeading: 'What keeps you here',
  wayTo: (next: string): string => `The way to ${next}`,
  wayEnds: 'The way ends here',

  backArrow: '← Back',
  scaleTitle: 'The scale',
  scaleLead: (levels: number, threshold: number, courage: string): string =>
    `${levels} levels from 20 to 700. At ${threshold} — ${courage} — the sign flips: below it life drains, above it life gives. Tap a level.`,
  thresholdMark: (threshold: number): string => `Threshold ${threshold}`,
  yourLevel: '◆ your level',
}

export const copy: Record<Language, Copy> = { de, en }
