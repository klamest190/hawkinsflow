import type { Language } from '../types.ts'

/**
 * Alle Beschriftungen der Oberfläche. Das deutsche Objekt ist die Vorlage, `Copy`
 * leitet sich daraus ab — fehlt im Englischen ein Schlüssel, scheitert der Build
 * mit `TS2741`, statt dass irgendwo `undefined` steht.
 *
 * Werte, in denen eine Zahl vorkommt, sind Funktionen und keine Platzhalter-
 * Zeichenketten: So kann jede Sprache die Zahl dort einsetzen, wo ihr Satzbau sie
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
    `Die Skala des Bewusstseins nach David R. Hawkins reicht von Scham (20) bis Erleuchtung (700). ${questions} Aussagen zeigen dir, wo du gerade stehst, was dich dort hält und was ein sinnvoller nächster Schritt wäre.`,
  start: 'Fragebogen starten',
  resume: (question: number): string => `Weiter bei Frage ${question}`,
  restartFromScratch: 'Von vorn beginnen',
  browseFirst: 'Erst die Skala ansehen',
  // Steht klein unter den Knöpfen. Eine App, die einem Menschen eine Zahl
  // aufschreibt, muss sagen, woher die Zahl kommt.
  disclaimer:
    'Hawkins hat seine Werte mit dem kinesiologischen Muskeltest ermittelt. Wissenschaftlich belegt ist das nicht. Nimm das Ergebnis als Anstoß zum Nachdenken, nicht als Diagnose. Wenn dich etwas länger belastet, hilft dir eine Fachperson mehr als eine App.',

  // ── Fragebogen ───────────────────────────────────────────────────────────
  quizPrompt: 'Wie oft trifft das in den letzten Wochen zu?',
  quizProgress: (current: number, total: number): string => `${current} / ${total}`,
  quizAbort: '← Abbrechen',
  back: 'Zurück',
  next: 'Weiter',
  evaluate: 'Auswerten',
  answers: ['Nie', 'Selten', 'Manchmal', 'Oft', 'Fast immer'],
  // Steht klein unter den Antworten und nur dort, wo es eine Tastatur gibt.
  quizKeyHint: '1 – 5 antwortet, ← → blättert',
  // Steht dort, wo sonst der Tastaturhinweis steht, und sagt, warum der
  // Weiter-Knopf noch ausgegraut ist.
  quizNeedsAnswer: 'Wähle eine Antwort, um weiterzugehen.',
  progressLabel: 'Fortschritt',

  // ── Ergebnis ohne eine einzige Antwort ───────────────────────────────────
  // Die Auswertung liefert auch dann etwas: Ohne Gewicht fällt der Schwerpunkt
  // auf den Anfang der Skala und damit auf Scham. Das ist der Startwert einer
  // Rechnung und keine Aussage über den Menschen davor — deshalb steht hier ein
  // eigener Text statt der untersten Ebene in 64 Pixeln.
  emptyTitle: 'Keine Antworten, kein Ergebnis',
  emptyLead:
    'Du hast noch keine einzige Aussage beantwortet. Ohne Antworten können wir nichts berechnen. Rein rechnerisch käme ganz unten etwas heraus, aber nur, weil die Skala dort anfängt. Mit dir hätte das nichts zu tun.',

  // ── Ergebnis, das nicht zu lesen ist ─────────────────────────────────────
  // Derselbe Fall wie oben, nur schwerer zu sehen: Hier sind alle 34 Fragen
  // beantwortet, und der Bogen käme trotzdem zu keiner Auskunft. Ohne diesen
  // Schirm bekäme man einen vollständigen Befund vorgesetzt — und hätte allen
  // Grund, ihn zu glauben.
  uniformTitle: 'Überall dieselbe Antwort',
  uniformLead:
    'Du hast bei allen Aussagen denselben Wert angekreuzt. Dann ist jede Ebene gleich stark, und es gibt keinen Schwerpunkt, den wir dir zeigen könnten. Ein Ergebnis wäre hier nur eine Zahl, die nichts bedeutet.',
  uniformHint: 'Geh die Aussagen noch einmal einzeln durch — sie fragen sehr Verschiedenes.',

  // ── Vorbehalt vor einem Ergebnis ─────────────────────────────────────────
  // Steht als erste Karte über dem Befund und nicht als Fußnote darunter: Wer
  // die Ebene erst in 64 Pixeln gelesen hat, liest den Vorbehalt nicht mehr.
  bothEndsTitle: 'Die Antworten passen nicht zusammen',
  bothEndsBody:
    'Bei dir sind die untersten und die obersten Ebenen gleichzeitig stark. Beides zusammen kommt selten vor: Wenn du fast immer ausweichst, sprichst du kaum fast immer unangenehme Dinge an. Lies das Ergebnis deshalb vorsichtig, oder geh den Fragebogen in Ruhe noch einmal durch.',

  // ── Ergebnis ─────────────────────────────────────────────────────────────
  focusLabel: 'Dein Schwerpunkt',
  // Steht unter dem Band. Sagt genau das, was der Bogen hergibt — und was
  // nicht. Die Zahl der Aussagen kommt als Wert herein, damit der Satz stimmt,
  // wenn der Bogen einmal wächst.
  bandNote: (lower: string, upper: string, questions: number): string =>
    `Mit ${questions} Aussagen kommen wir nicht näher heran: Du liegst irgendwo zwischen ${lower} und ${upper}. Eine einzelne Zahl wäre genauer, als dieser Fragebogen sein kann.`,
  // Der zweite Hinweis, und der wichtigere: Er steht dort, wo das Ergebnis
  // steht, und nicht nur am Anfang, wo noch nichts zu glauben war.
  resultDisclaimer:
    'Dieser Fragebogen ist kein geprüftes Testverfahren. Es gibt nur zwei Aussagen pro Ebene, sie sind alle in dieselbe Richtung formuliert, es gibt keine Vergleichsgruppe, und niemand hat geprüft, ob er misst, was er messen soll. Dazu kommt: Hawkins hat seine Werte mit dem kinesiologischen Muskeltest ermittelt, und der funktioniert unter kontrollierten Bedingungen nicht. Nimm das Ergebnis als Anstoß zum Nachdenken und nicht als Messung.',
  wholeScale: 'Ganze Skala',
  restart: 'Neu starten',
  emotionLabel: 'Gefühl',
  worldviewLabel: 'Weltsicht',
  aboveThreshold: (threshold: number): string =>
    `Du liegst über der Schwelle von ${threshold}. Ab hier gibst du mehr Kraft in die Welt, als sie dich kostet.`,
  belowThreshold: (threshold: number, courage: string): string =>
    `Die Schwelle liegt bei ${threshold} (${courage}). Darunter kostet der Alltag mehr Kraft, als er zurückgibt. Genau deshalb merkt man dort jeden Schritt nach oben besonders deutlich.`,
  partial: (answered: number, total: number): string =>
    `${answered} von ${total} Fragen beantwortet — das Bild ist noch vorläufig.`,
  profileTitle: 'Dein Profil',
  profileLead:
    'Niemand steht nur auf einer einzigen Ebene. Alles, was hier leuchtet, ist gerade in dir. Dein Schwerpunkt ist nur der Durchschnitt daraus.',
  dragTitle: 'Was dich nach unten zieht',
  dragBody: (trap: string): string =>
    `Diese Ebene ist bei dir deutlich vorhanden, obwohl dein Schwerpunkt darüber liegt. Hier liegt meistens die eigentliche Arbeit: ${trap}`,
  reachTitle: 'Wohin du schon reichst',
  reachBody:
    'So weit reichen deine guten Momente schon. Was es dort oben gibt, kennst du also. Es darf nur öfter vorkommen.',
  levelHeading: (value: number, name: string): string => `Ebene ${value} · ${name}`,
  nextLabel: 'Als Nächstes',
  seeAllLevels: (count: number): string => `Alle ${count} Ebenen ansehen`,
  repeatQuiz: 'Fragebogen wiederholen',

  // ── Die Ebene im Detail ──────────────────────────────────────────────────
  // Der Rat steht als erstes im Detailblock — vor „Woran du es erkennst“,
  // weil er das einzige Feld ist, das gewichtet statt beschreibt.
  adviceHeading: 'Der Rat',
  signsHeading: 'Woran du es erkennst',
  trapHeading: 'Was dich hier hält',
  practiceHeading: 'Die Übungen',
  // Die drei Sorten. Stehen als Marke auf der Karte — kurz genug, dass drei
  // davon nebeneinander passen, und ohne Fachwort: „Sitzen“ trifft es besser
  // als „Meditation“, weil niemand dabei etwas Besonderes werden soll.
  practiceKinds: { writing: 'Schreiben', action: 'Tun', sitting: 'Sitzen' },
  practiceDeckLabel: 'Die drei Übungen dieser Ebene',
  // Fängt mit dem an, was auf dem Reiter steht: Wer die Oberfläche per Sprache
  // bedient, sagt „Schreiben“ — und das muss im vorgelesenen Namen vorkommen,
  // sonst findet der Befehl den Knopf nicht (WCAG 2.5.3).
  practiceTabLabel: (kind: string, name: string): string => `${kind}: ${name}`,
  practiceHint: 'Mit ← und → wechseln',

  // ── Die Uhr im Übungskasten ──────────────────────────────────────────────
  // Sieben der Übungen sagen wörtlich „stell zwei Minuten“ — die Uhr steht
  // deshalb dort, wo die Anweisung steht, und nicht in einer eigenen Ansicht.
  // Die Einzahl kommt vor, seit die Minute Stille im Moment-Bogen dieselbe Uhr
  // benutzt — „1 Minuten starten“ wäre der eine Satz, an dem man merkt, dass
  // hier eine Maschine schreibt.
  timerStart: (minutes: number): string =>
    minutes === 1 ? 'Eine Minute starten' : `${minutes} Minuten starten`,
  timerPause: 'Anhalten',
  timerResume: 'Weiter',
  // „Zurücksetzen“ und nicht „Abbrechen“: Der Knopf hält die Uhr nicht nur an,
  // er stellt sie auf die volle Dauer zurück. Und im Moment-Bogen stünde ein
  // zweites „Abbrechen“ drei Zentimeter über diesem, das die ganze Ansicht
  // verlässt — zwei Knöpfe, ein Wort, zwei Folgen.
  timerStop: 'Zurücksetzen',
  timerDone: 'Die Zeit ist um.',
  wayTo: (next: string): string => `Der Weg nach ${next}`,
  wayEnds: 'Der Weg endet hier',

  // ── Skala ────────────────────────────────────────────────────────────────
  backArrow: '← Zurück',
  scaleTitle: 'Die Skala',
  scaleLead: (levels: number, threshold: number, courage: string): string =>
    `${levels} Ebenen von 20 bis 700. Ab ${threshold} (${courage}) dreht sich das Vorzeichen: Darunter kostet dich das Leben mehr Kraft, als es dir gibt. Darüber ist es umgekehrt. Tippe eine Ebene an.`,
  thresholdMark: (threshold: number): string => `Schwelle ${threshold}`,
  yourLevel: '◆ deine Ebene',
  // ── Der Wenn-Dann-Plan ───────────────────────────────────────────────────
  planTitle: 'Dein Wenn-Dann-Plan',
  // Sagt in einem Satz, warum hier ein Formular steht statt einer weiteren Liste.
  planLead:
    'Ein Vorsatz sagt, was du willst. Ein Wenn-Dann-Satz sagt dazu, in welcher Situation du es tust. Solche Sätze setzen die Leute deutlich häufiger um, weil die Entscheidung schon vorher gefallen ist.',
  planWhen: 'Wenn',
  planThen: 'dann',
  planWhenPlaceholder: 'die Situation, an der du es merkst',
  planThenPlaceholder: 'was du in genau diesem Moment tust',
  planCueHint: 'Anfänge für den Auslöser',
  planCues: ['Sobald ich merke, dass …', 'Immer wenn ich …', 'Morgen früh, bevor ich …'],
  planStepHint: 'Oder nimm einen Schritt von oben',
  planSave: 'Plan merken',
  planEdit: 'Ändern',
  planDelete: 'Löschen',
  planStoredNote:
    'Der Plan steht ab jetzt auf der Startseite — gleich sichtbar, wenn du die App öffnest.',
  introPlanLabel: 'Dein Plan',
  // Die älteren Pläne stehen darunter, einer je Zeile. Erreichbar sind sie
  // inzwischen auch über die Skala — jede Ebene trägt ihren Plan im Detailblock.
  // Hier stehen sie trotzdem, und zwar beieinander: Wer wissen will, was er sich
  // insgesamt vorgenommen hat, soll dafür nicht siebzehn Ebenen aufklappen.
  introPlanOthers: 'Früher angelegt',
  planDeleteLabel: (level: string): string => `Plan zu ${level} löschen`,

  // ── Der Verlauf ──────────────────────────────────────────────────────────
  // Steht auf der Startseite unter dem Plan. Der Ton bleibt vorsichtig: Aus
  // zwei Punkten eine Entwicklung zu lesen ist genau der Fehler, vor dem der
  // Vorbehalt am Ergebnis warnt.
  historyTitle: 'Deine Durchgänge',
  // Steht klein unter der Linie, in einer Zeile mit dem Datum. Früher war das
  // ein Absatz von zweieinhalb Zeilen — für einen Vorbehalt, der in einen
  // halben Satz passt. Weglassen lässt er sich nicht: Eine Linie sieht aus wie
  // eine Messreihe, und eine ist sie nicht.
  historyLead: (runs: number): string =>
    runs < 2 ? 'Ab dem zweiten Durchgang wird daraus eine Linie.' : `${runs} Tage, keine Messreihe.`,
  historyLatest: 'zuletzt',
  historyClear: 'Verlauf löschen',
  historyEntryLabel: (date: string, level: string): string => `${date}: ${level}`,

  // ── Das PDF ──────────────────────────────────────────────────────────────
  // Der Ergebnisschirm ist weg, sobald jemand den Bogen wiederholt. Das PDF ist
  // das Einzige, was ihn überdauert — deshalb steht der Tag darauf, im
  // Dateinamen wie im Dokument.
  // Die Karte, die den Export sichtbar macht. Vorher stand hier nur ein
  // stiller Knopf zwischen zwei anderen — man übersah ihn.
  pdfCardTitle: 'Nimm es mit',
  pdfCardLead:
    'Dieser Bildschirm ist weg, sobald du den Fragebogen wiederholst. Das PDF bleibt — mit dem heutigen Datum im Dateinamen und auf jeder Seite.',
  pdfDownload: 'Als PDF sichern',
  pdfBusy: 'PDF wird erstellt …',
  pdfFailed: 'Das PDF ließ sich nicht erstellen. Versuch es noch einmal.',
  pdfSubtitle: 'Deine Auswertung',
  // Ersetzen im Profil die Zeichen ◆ und ↓ der Oberfläche: die liegen in keiner
  // PDF-Schrift verlässlich vor und kämen als leeres Rechteck heraus.
  pdfMarkFocus: 'Schwerpunkt',
  pdfMarkDrag: 'zieht',
  pdfPage: (current: number, total: number): string => `Seite ${current} von ${total}`,
  // Steht klein unter dem Datum in der Fußzeile.
  pdfSource: 'Erstellt mit Hawkins Flow',
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
    `David R. Hawkins’ Map of Consciousness runs from Shame (20) to Enlightenment (700). ${questions} statements show you where you stand right now, what keeps you there and what a sensible next step would be.`,
  start: 'Start the questionnaire',
  resume: (question: number): string => `Continue at question ${question}`,
  restartFromScratch: 'Start over',
  browseFirst: 'Look at the scale first',
  disclaimer:
    'Hawkins arrived at his values through applied kinesiology (muscle testing). That is not scientifically established. Take the result as something to think about, not as a diagnosis. If something weighs on you for longer, a professional will help you more than an app.',

  quizPrompt: 'How often has this been true in recent weeks?',
  quizProgress: (current: number, total: number): string => `${current} / ${total}`,
  quizAbort: '← Cancel',
  back: 'Back',
  next: 'Next',
  evaluate: 'See result',
  answers: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'],
  quizKeyHint: '1 – 5 answers, ← → moves',
  quizNeedsAnswer: 'Pick an answer to move on.',
  progressLabel: 'Progress',

  emptyTitle: 'No answers, no result',
  emptyLead:
    'You have not answered a single statement yet. With no answers we cannot calculate anything. The number would come out at the very bottom, but only because that is where the scale starts. It would say nothing about you.',

  uniformTitle: 'The same answer everywhere',
  uniformLead:
    'You gave every statement the same value. Then every level is equally strong, and there is no centre of gravity we could show you. A result here would be a number that means nothing.',
  uniformHint: 'Go through the statements one at a time — they ask about very different things.',

  bothEndsTitle: 'These answers do not fit together',
  bothEndsBody:
    'The lowest and the highest levels are both strong in your answers. That combination is rare: if you almost always avoid things, you hardly ever speak up almost always as well. So read the result carefully, or take the questionnaire again when you have time.',

  focusLabel: 'Your centre of gravity',
  bandNote: (lower: string, upper: string, questions: number): string =>
    `With ${questions} statements we cannot get any closer than this: you are somewhere between ${lower} and ${upper}. A single number would be more precise than this questionnaire can be.`,
  resultDisclaimer:
    'This questionnaire is not a validated instrument. There are only two statements per level, they are all worded in the same direction, there is no comparison group, and nobody has checked whether it measures what it is supposed to measure. On top of that, Hawkins arrived at his values through muscle testing, and that does not work under controlled conditions. Take the result as something to think about and not as a measurement.',
  wholeScale: 'Whole scale',
  restart: 'Start over',
  emotionLabel: 'Emotion',
  worldviewLabel: 'View of the world',
  aboveThreshold: (threshold: number): string =>
    `You are above the threshold of ${threshold}. From here you put more strength into the world than it costs you.`,
  belowThreshold: (threshold: number, courage: string): string =>
    `The threshold sits at ${threshold} (${courage}). Below it, daily life costs more strength than it gives back. That is exactly why every step upward is so noticeable down there.`,
  partial: (answered: number, total: number): string =>
    `${answered} of ${total} questions answered — the picture is still provisional.`,
  profileTitle: 'Your profile',
  profileLead:
    'Nobody stands on a single level. Everything lit up here is in you right now. Your centre of gravity is only the average of it.',
  dragTitle: 'What pulls you down',
  dragBody: (trap: string): string =>
    `This level is clearly present in you even though your centre of gravity sits above it. This is usually where the real work is: ${trap}`,
  reachTitle: 'How far you already reach',
  reachBody:
    'Your good moments already reach this far. So you know what it is like up there. It just needs to happen more often.',
  levelHeading: (value: number, name: string): string => `Level ${value} · ${name}`,
  nextLabel: 'Up next',
  seeAllLevels: (count: number): string => `See all ${count} levels`,
  repeatQuiz: 'Take the questionnaire again',

  adviceHeading: 'The advice',
  signsHeading: 'How you recognise it',
  trapHeading: 'What keeps you here',
  practiceHeading: 'The practices',
  practiceKinds: { writing: 'Writing', action: 'Doing', sitting: 'Sitting' },
  practiceDeckLabel: 'The three practices for this level',
  practiceTabLabel: (kind: string, name: string): string => `${kind}: ${name}`,
  practiceHint: 'Use ← and → to switch',

  timerStart: (minutes: number): string =>
    minutes === 1 ? 'Start one minute' : `Start ${minutes} minutes`,
  timerPause: 'Pause',
  timerResume: 'Resume',
  timerStop: 'Reset',
  timerDone: 'Time is up.',
  wayTo: (next: string): string => `The way to ${next}`,
  wayEnds: 'The way ends here',

  backArrow: '← Back',
  scaleTitle: 'The scale',
  scaleLead: (levels: number, threshold: number, courage: string): string =>
    `${levels} levels from 20 to 700. At ${threshold} (${courage}) the sign flips: below it, life costs you more strength than it gives you. Above it, the other way round. Tap a level.`,
  thresholdMark: (threshold: number): string => `Threshold ${threshold}`,
  yourLevel: '◆ your level',
  planTitle: 'Your if–then plan',
  planLead:
    'An intention says what you want. An if–then sentence adds the situation you will do it in. People carry plans like that out far more often, because the decision has already been made.',
  planWhen: 'If',
  planThen: 'then',
  planWhenPlaceholder: 'the situation you notice it in',
  planThenPlaceholder: 'what you do in exactly that moment',
  planCueHint: 'Openings for the trigger',
  planCues: ['The moment I notice that …', 'Whenever I …', 'Tomorrow morning, before I …'],
  planStepHint: 'Or take one of the steps above',
  planSave: 'Keep this plan',
  planEdit: 'Change',
  planDelete: 'Delete',
  planStoredNote:
    'From now on the plan sits on the start screen — visible as soon as you open the app.',
  introPlanLabel: 'Your plan',
  introPlanOthers: 'Made earlier',
  planDeleteLabel: (level: string): string => `Delete the plan for ${level}`,

  historyTitle: 'Your runs',
  historyLead: (runs: number): string =>
    runs < 2
      ? 'From the second run on, this becomes a line.'
      : `${runs} days, not a measurement series.`,
  historyLatest: 'latest',
  historyClear: 'Clear the history',
  historyEntryLabel: (date: string, level: string): string => `${date}: ${level}`,

  pdfCardTitle: 'Take it with you',
  pdfCardLead:
    'This screen is gone as soon as you retake the questionnaire. The PDF stays — with today’s date in the file name and on every page.',
  pdfDownload: 'Save as PDF',
  pdfBusy: 'Building the PDF …',
  pdfFailed: 'The PDF could not be created. Please try again.',
  pdfSubtitle: 'Your result',
  pdfMarkFocus: 'centre',
  pdfMarkDrag: 'pulls',
  pdfPage: (current: number, total: number): string => `Page ${current} of ${total}`,
  pdfSource: 'Made with Hawkins Flow',
}

export const copy: Record<Language, Copy> = { de, en }
