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
  // Weiter-Knopf noch stumpf ist.
  quizNeedsAnswer: 'Wähle eine Antwort, um weiterzugehen.',
  progressLabel: 'Fortschritt',

  // ── Ergebnis ohne eine einzige Antwort ───────────────────────────────────
  // Die Auswertung liefert auch dann etwas: Ohne Gewicht fällt der Schwerpunkt
  // auf den Anfang der Skala und damit auf Scham. Das ist der Startwert einer
  // Rechnung und keine Aussage über den Menschen davor — deshalb steht hier ein
  // eigener Text statt der untersten Ebene in 64 Pixeln.
  emptyTitle: 'Nichts angekreuzt, nichts abzulesen',
  emptyLead:
    'Du hast keine einzige Aussage beantwortet. Ohne Antworten liegt auf der Skala nirgends ein Gewicht, und die Rechnung käme ganz unten heraus — nicht, weil dort jemand stünde, sondern weil dort das Zählen anfängt. Daraus eine Ebene zu machen wäre schlicht gelogen.',

  // ── Ergebnis, das nicht zu lesen ist ─────────────────────────────────────
  // Derselbe Fall wie oben, nur schwerer zu sehen: Hier sind alle 34 Fragen
  // beantwortet, und der Bogen käme trotzdem zu keiner Auskunft. Ohne diesen
  // Schirm bekäme man einen vollständigen Befund vorgesetzt — und hätte allen
  // Grund, ihn zu glauben.
  uniformTitle: 'Überall dasselbe Kreuz',
  uniformLead:
    'Alle Aussagen, die du beantwortet hast, tragen denselben Wert. Dann steht auf jeder Ebene dasselbe, und wo überall dasselbe steht, gibt es keinen Schwerpunkt. Was hier herauskäme, wäre kein Ergebnis, sondern die Stelle, an der sich alles gegenseitig aufhebt.',
  uniformHint: 'Nimm dir die Aussagen noch einmal einzeln vor — sie fragen Verschiedenes.',

  // ── Vorbehalt vor einem Ergebnis ─────────────────────────────────────────
  // Steht als erste Karte über dem Befund und nicht als Fußnote darunter: Wer
  // die Ebene erst in 64 Pixeln gelesen hat, liest den Vorbehalt nicht mehr.
  bothEndsTitle: 'Das passt nicht zusammen',
  bothEndsBody:
    'Die untersten und die obersten Ebenen leuchten bei dir gleichzeitig stark. Beides zugleich gibt es nicht: Wer fast immer ausweicht, spricht nicht fast immer an. Lies das Folgende mit diesem Vorbehalt — oder geh den Bogen noch einmal durch und lass dir für jede Aussage einen Augenblick Zeit.',

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
  practiceHeading: 'Die Übungen',
  // Die drei Sorten. Stehen als Marke auf der Karte — kurz genug, dass drei
  // davon nebeneinander passen, und ohne Fachwort: „Sitzen" trifft es besser
  // als „Meditation", weil niemand dabei etwas Besonderes werden soll.
  practiceKinds: { writing: 'Schreiben', action: 'Tun', sitting: 'Sitzen' },
  practiceDeckLabel: 'Die drei Übungen dieser Ebene',
  // Fängt mit dem an, was auf dem Reiter steht: Wer die Oberfläche per Sprache
  // bedient, sagt „Schreiben" — und das muss im vorgelesenen Namen vorkommen,
  // sonst findet der Befehl den Knopf nicht (WCAG 2.5.3).
  practiceTabLabel: (kind: string, name: string): string => `${kind}: ${name}`,
  practiceHint: 'Mit ← und → wechseln',

  // ── Die Uhr im Übungskasten ──────────────────────────────────────────────
  // Sieben der Übungen sagen wörtlich „stell zwei Minuten" — die Uhr steht
  // deshalb dort, wo die Anweisung steht, und nicht in einer eigenen Ansicht.
  // Die Einzahl kommt vor, seit die Minute Stille im Moment-Bogen dieselbe Uhr
  // benutzt — „1 Minuten starten" wäre der eine Satz, an dem man merkt, dass
  // hier eine Maschine schreibt.
  timerStart: (minutes: number): string =>
    minutes === 1 ? 'Eine Minute starten' : `${minutes} Minuten starten`,
  timerPause: 'Anhalten',
  timerResume: 'Weiter',
  // „Zurücksetzen" und nicht „Abbrechen": Der Knopf hält die Uhr nicht nur an,
  // er stellt sie auf die volle Dauer zurück. Und im Moment-Bogen stünde ein
  // zweites „Abbrechen" drei Zentimeter über diesem, das die ganze Ansicht
  // verlässt — zwei Knöpfe, ein Wort, zwei Folgen.
  timerStop: 'Zurücksetzen',
  timerDone: 'Die Zeit ist um.',
  wayTo: (next: string): string => `Der Weg nach ${next}`,
  wayEnds: 'Der Weg endet hier',

  // ── Skala ────────────────────────────────────────────────────────────────
  backArrow: '← Zurück',
  scaleTitle: 'Die Skala',
  scaleLead: (levels: number, threshold: number, courage: string): string =>
    `${levels} Ebenen von 20 bis 700. Ab ${threshold} — ${courage} — kippt das Vorzeichen: darunter zehrt das Leben, darüber gibt es. Tippe eine Ebene an.`,
  thresholdMark: (threshold: number): string => `Schwelle ${threshold}`,
  yourLevel: '◆ deine Ebene',
  // ── Der Wenn-Dann-Plan ───────────────────────────────────────────────────
  planTitle: 'Dein Wenn-Dann-Plan',
  // Sagt in einem Satz, warum hier ein Formular steht statt einer weiteren Liste.
  planLead:
    'Ein Vorsatz sagt, was du willst. Ein Wenn-Dann-Satz sagt zusätzlich, woran du den Moment erkennst — und wird deutlich häufiger auch wirklich getan, weil die Entscheidung dann schon gefallen ist.',
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
    'Der Plan steht ab jetzt auf der Startseite — dort, wo du ihn siehst, bevor du etwas anderes tust.',
  introPlanLabel: 'Dein Plan',
  // Die älteren Pläne stehen darunter, einer je Zeile. Sonst wären sie nirgends
  // mehr erreichbar: Das Ergebnis zeigt nur den Plan der Ebene, auf der man
  // gerade herauskommt — wer beim nächsten Durchgang woanders landet, käme an
  // den vorigen nie wieder heran, weder zum Lesen noch zum Löschen.
  introPlanOthers: 'Früher angelegt',
  planDeleteLabel: (level: string): string => `Plan zu ${level} löschen`,

  // ── Der Verlauf ──────────────────────────────────────────────────────────
  // Steht auf der Startseite unter dem Plan. Der Ton bleibt vorsichtig: Aus
  // zwei Punkten eine Entwicklung zu lesen ist genau der Fehler, vor dem der
  // Vorbehalt am Ergebnis warnt.
  historyTitle: 'Deine Durchgänge',
  historyLead: (runs: number): string =>
    runs < 2
      ? 'Ein Durchgang ist noch keine Entwicklung. Ab dem zweiten steht hier eine Linie.'
      : `${runs} Durchgänge. Was die Linie zeigt, ist deine Stimmung an ${runs} Tagen — keine Messreihe.`,
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
    'Dieser Bildschirm ist weg, sobald du den Bogen wiederholst. Das PDF bleibt — mit dem heutigen Tag im Dateinamen und auf jeder Seite.',
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
    `David R. Hawkins’ Map of Consciousness — from Shame (20) to Enlightenment (700). ${questions} statements show you where your centre of gravity sits right now, what holds you there and what the next step is.`,
  start: 'Start the questionnaire',
  resume: (question: number): string => `Continue at question ${question}`,
  restartFromScratch: 'Start over',
  browseFirst: 'Look at the scale first',
  disclaimer:
    'Hawkins’ calibrations come from applied kinesiology (muscle testing) and are not scientifically established. Take the result as a mirror for self-reflection — not as a diagnosis. If something weighs on you for long, a professional helps more than any app.',

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

  emptyTitle: 'Nothing ticked, nothing to read',
  emptyLead:
    'You have not answered a single statement. With no answers there is no weight anywhere on the scale, and the sum would come out at the very bottom — not because anyone stands there, but because that is where counting begins. Turning that into a level would simply be a lie.',

  uniformTitle: 'The same tick everywhere',
  uniformLead:
    'Every statement you answered carries the same value. Then every level says the same thing, and where everything says the same, there is no centre of gravity. What would come out here is not a result but the point at which everything cancels itself out.',
  uniformHint: 'Take the statements one at a time — they are not asking the same thing.',

  bothEndsTitle: 'That does not fit together',
  bothEndsBody:
    'The lowest and the highest levels are both strongly lit in your answers. Both at once does not exist: someone who almost always avoids does not almost always speak up. Read what follows with that in mind — or take the questionnaire again and give each statement a moment.',

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
    `${levels} levels from 20 to 700. At ${threshold} — ${courage} — the sign flips: below it life drains, above it life gives. Tap a level.`,
  thresholdMark: (threshold: number): string => `Threshold ${threshold}`,
  yourLevel: '◆ your level',
  planTitle: 'Your if–then plan',
  planLead:
    'An intention says what you want. An if–then sentence also says how you will recognise the moment — and gets carried out far more often, because by then the decision has already been made.',
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
    'From now on the plan sits on the start screen — where you see it before you do anything else.',
  introPlanLabel: 'Your plan',
  introPlanOthers: 'Made earlier',
  planDeleteLabel: (level: string): string => `Delete the plan for ${level}`,

  historyTitle: 'Your runs',
  historyLead: (runs: number): string =>
    runs < 2
      ? 'One run is not a development yet. From the second one there will be a line here.'
      : `${runs} runs. What the line shows is how you felt on ${runs} days — not a series of measurements.`,
  historyLatest: 'latest',
  historyClear: 'Clear the history',
  historyEntryLabel: (date: string, level: string): string => `${date}: ${level}`,

  pdfCardTitle: 'Take it with you',
  pdfCardLead:
    'This screen is gone the moment you retake the questionnaire. The PDF stays — with today’s date in its name and on every page.',
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
