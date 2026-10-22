import type { Evidence, MeditationId } from '../data/meditations.ts'
import type { Language } from '../types.ts'

/** One form of meditation, as the page explains it. */
export type MeditationText = {
  name: string
  /** How long and how often it is usually practised. */
  length: string
  how: string
  effect: string
  /** What the reviews in `SOURCES` found, in plain words and with their limits. */
  evidence: string
  /** Where this app gives the form something to do; absent where it doesn't. */
  inApp?: string
}

/** A short section of the explanation: a heading and a paragraph. */
type Block = { title: string; body: string }

/* Typed wide on purpose: a form may or may not point into the app. */
function forms(texts: Record<MeditationId, MeditationText>): Record<MeditationId, MeditationText> {
  return texts
}

/**
 * The meditation page: the six forms most often taught and best studied,
 * what they do, and what the research says about them — including what it
 * doesn't say.
 *
 * Held to the same standard as the rest of the app: what is measured is
 * called measured, what is a hope is called a hope, and a number stands only
 * where a review gives one. Every claim here traces back to a study in
 * `SOURCES` (`data/meditations.ts`).
 *
 * As everywhere in this app, the German object is the template.
 */
const de = {
  title: 'Meditation',
  lead: 'Meditieren heißt, die Aufmerksamkeit zu üben: bemerken, wohin sie wandert, und sie zurückholen. Hier stehen die sechs Formen, die am häufigsten gelehrt und am besten untersucht sind, mit dem, was sie bewirken können, und dem, was die Forschung tatsächlich dazu sagt.',

  formsTitle: 'Die wichtigsten Formen',
  // Says what "first" means here: best studied, not "works best for you".
  formsLead:
    'Sortiert nach der Studienlage: was am besten belegt ist, steht oben. Welche Form dir am meisten bringt, kann trotzdem eine weiter unten sein.',
  howLabel: 'So geht’s',
  effectLabel: 'Was sie bewirken kann',
  evidenceLabel: 'Was die Forschung sagt',
  inAppLabel: 'Hier in der App',
  evidenceLevels: { solid: 'gut belegt', moderate: 'mäßig belegt', thin: 'wenig untersucht' } satisfies Record<
    Evidence,
    string
  >,

  forms: forms({
    breath: {
      name: 'Atemmeditation',
      length: '10–20 Minuten, täglich',
      how: 'Setz dich aufrecht hin und richte die Aufmerksamkeit auf den Atem, dort, wo du ihn am deutlichsten spürst: Nase, Brust oder Bauch. Wenn die Gedanken abschweifen, und das tun sie ständig, bemerkst du es und kehrst ohne Kommentar zum Atem zurück.',
      effect:
        'Das Zurückkehren ist die eigentliche Übung, nicht das Stillsein. Jedes Mal trainierst du, einen Gedanken als Gedanken zu bemerken, statt ihm zu folgen. Mit der Zeit wird der Abstand zwischen Reiz und Reaktion größer.',
      evidence:
        'Eine große Übersichtsarbeit über 47 Studien fand mäßige Belege für weniger Angst, Depression und Schmerz, mit kleinen bis mittleren Effekten. Besser als andere wirksame Verfahren wie Sport war Meditation dabei nicht.',
      inApp: 'Ebb Flow ist eine kurze Form davon: die Aufmerksamkeit beim Atem, bis der Ring abgelaufen ist.',
    },
    bodyScan: {
      name: 'Body Scan',
      length: '20–45 Minuten',
      how: 'Du gehst mit der Aufmerksamkeit langsam durch den Körper, von den Zehen bis zum Scheitel, und nimmst wahr, was da ist: Wärme, Druck, Kribbeln, Taubheit. Du musst nichts verändern und nichts entspannen. Bemerken reicht.',
      effect:
        'Er schult das Gespür für Signale aus dem Körper, oft lange bevor ein Gefühl im Kopf ankommt. Wer Anspannung früh bemerkt, kann früher gegensteuern.',
      evidence:
        'Der Body Scan ist der Kern der Achtsamkeitsprogramme MBSR und MBCT. Für MBCT ist die Lage am besten: Bei wiederkehrender Depression senkte es das Rückfallrisiko in einer gemeinsamen Auswertung von neun Studien um etwa ein Drittel. Wie viel davon auf den Body Scan allein zurückgeht, ist kaum untersucht.',
      inApp: 'Der zweite Schritt im Moment-Bogen, „Einmal ganz fühlen“, ist ein Body Scan im Kleinen.',
    },
    openAwareness: {
      name: 'Offenes Gewahrsein',
      length: '10–20 Minuten',
      how: 'Statt bei einem Anker zu bleiben, lässt du alles kommen und gehen: Geräusche, Gedanken, Empfindungen. Du hältst nichts fest und schiebst nichts weg. Du beobachtest nur, wie eins nach dem anderen auftaucht und wieder verschwindet.',
      effect:
        'Es übt Gelassenheit gegenüber dem, was im Kopf geschieht. Gedanken verlieren an Gewicht, wenn du sie kommen und gehen siehst, statt mit ihnen zu ringen.',
      evidence:
        'Als eigene Form wenig untersucht. Meist kommt sie zusammen mit der Atemmeditation vor, und die Studien trennen die beiden selten. Für sich genommen ist sie eher etwas für Geübte.',
      inApp: 'Die Sitz-Übung bei Neutralität, „Kommen und gehen lassen“.',
    },
    lovingKindness: {
      name: 'Liebende Güte (Metta)',
      length: '10–15 Minuten',
      how: 'Du wiederholst innerlich gute Wünsche, zuerst für dich, dann für einen nahen Menschen, einen fremden und zuletzt einen schwierigen: „Mögest du sicher sein. Mögest du gesund sein. Mögest du leicht leben.“ Was du dabei fühlst, ist egal. Die Sätze sind die Übung.',
      effect:
        'Sie richtet die Aufmerksamkeit auf Wohlwollen statt auf Bedrohung, auch dir selbst gegenüber. Gerade bei Scham und Selbstkritik ist das oft der fehlende Gegenpol.',
      evidence:
        'Eine Übersichtsarbeit über 22 Studien fand mittlere Effekte auf Depression, Mitgefühl und Selbstmitgefühl, gemessen gegen Gruppen ohne Übung. Gegen andere aktive Verfahren waren die Ergebnisse uneinheitlich, und die Qualität der Studien war mäßig.',
      inApp: 'Die Sitz-Übung bei Scham, „Die Hand auf dem Brustbein“, arbeitet mit Sätzen dieser Art.',
    },
    mantra: {
      name: 'Mantra-Meditation',
      length: '15–20 Minuten, ein- bis zweimal täglich',
      how: 'Du wiederholst innerlich ein Wort oder eine Silbe, ohne Anstrengung. Wenn die Gedanken wandern, kehrst du zum Wort zurück. Die bekannteste Form ist die Transzendentale Meditation (TM), die in Kursen mit einem persönlichen Mantra gelehrt wird.',
      effect:
        'Das Wort gibt dem Kopf etwas Einfaches zu tun. Viele finden das leichter als den Atem, weil es weniger Kontrolle verlangt.',
      evidence:
        'Für TM gibt es Belege für einen leicht gesenkten Blutdruck, im Mittel um etwa 4 zu 2 mmHg, vergleichbar mit Sport oder einer Ernährungsumstellung. Viele der Studien haben aber ein Risiko für Verzerrung, und unabhängige Langzeitstudien fehlen.',
    },
    slowBreathing: {
      name: 'Langsames Atmen',
      length: '5–20 Minuten',
      how: 'Du atmest gleichmäßig etwa sechsmal pro Minute, also rund fünf Sekunden ein und fünf aus, gern mit etwas längerem Ausatmen. Ohne Pausen und nicht tiefer, als es bequem ist.',
      effect:
        'Bei diesem Tempo schwingen Herzschlag und Atem miteinander, der Ruhenerv ist stärker beteiligt, und der Körper schaltet merklich herunter. Das wirkt in Minuten, nicht erst nach Wochen.',
      evidence:
        'Die körperlichen Effekte, etwa auf die Herzratenvariabilität, sind gut gemessen. Für Stimmung und Angst sind die Studien kleiner. In einer Studie mit fünf Minuten am Tag hob Atmen mit betontem Ausatmen die Stimmung stärker als Achtsamkeitsmeditation. Das ist vielversprechend, aber ein einzelnes Ergebnis.',
      inApp: 'Ebb Flow: drei Rhythmen mit je sechs Atemzügen in der Minute.',
    },
  }),

  bodyTitle: 'Was dabei im Körper passiert',
  body: [
    {
      title: 'Atem und Herz',
      body: 'Beim Einatmen schlägt das Herz etwas schneller, beim Ausatmen langsamer, gesteuert über den Vagusnerv. Wer das Ausatmen verlängert, verlängert die Phase, in der der Körper bremst. Deshalb ist der Atem der einzige Hebel am Stresssystem, den du jederzeit bewusst bedienen kannst.',
    },
    {
      title: 'Aufmerksamkeit',
      body: 'Meditation ist vor allem Aufmerksamkeitstraining. Der Kopf wandert ständig ab, das ist normal. Geübt wird das Bemerken und Zurückkommen, und genau diese Fähigkeit steckt auch darin, einen Impuls zu sehen, bevor er handelt.',
    },
    {
      title: 'Gefühle benennen',
      body: 'Ein Gefühl in Worte zu fassen, dämpft messbar die Reaktion des Gehirns darauf. Darum beginnt der Moment-Bogen damit, die Ebene zu benennen: Sobald ein Gefühl einen Namen hat, wird es kleiner.',
    },
    {
      title: 'Und das Gehirn?',
      body: 'Oft liest man, Meditation verändere schon nach wenigen Wochen die Struktur des Gehirns. Eine große Studie mit über 200 Teilnehmenden fand nach acht Wochen MBSR keine solchen Veränderungen. Was sich ändert, zeigt sich bisher eher im Erleben und Verhalten als im Hirnscan.',
    },
  ] satisfies Block[],

  limitsTitle: 'Was die Forschung nicht sagt',
  limits: [
    'Die Effekte sind echt, aber meist klein bis mittel. Besser als andere wirksame Wege wie Sport oder Therapie ist Meditation in den Studien nicht.',
    'Vieles, was über Meditation behauptet wird, geht über die Studienlage hinaus. Forschende aus dem Feld warnen selbst vor dem Hype.',
    'Meditation kann Nebenwirkungen haben. In einer Übersicht über 83 Studien berichteten im Mittel etwa 8 von 100 Übenden von unerwünschten Effekten, am häufigsten Angst und gedrückter Stimmung, auch ohne frühere psychische Probleme.',
    'Wenn du ein Trauma erlebt hast oder unter einer Psychose oder schweren Depression leidest, geh längeres Meditieren besser mit fachlicher Begleitung an. Eine App ersetzt keine Behandlung.',
  ],

  sourcesTitle: 'Quellen',
}

/** Derived from the German template — every language carries the same keys. */
export type MeditationCopy = typeof de

const en: MeditationCopy = {
  title: 'Meditation',
  lead: 'To meditate is to practise attention: noticing where it wanders and bringing it back. Here are the six forms most often taught and best studied, with what they can do and what the research actually says about them.',

  formsTitle: 'The main forms',
  formsLead:
    'Ordered by the evidence: the best supported come first. The form that does most for you may still be one further down.',
  howLabel: 'How it works',
  effectLabel: 'What it can do',
  evidenceLabel: 'What the research says',
  inAppLabel: 'In this app',
  evidenceLevels: { solid: 'well supported', moderate: 'moderately supported', thin: 'hardly studied' },

  forms: forms({
    breath: {
      name: 'Breath meditation',
      length: '10–20 minutes, daily',
      how: 'Sit upright and rest your attention on the breath where you feel it most clearly: nose, chest or belly. When your thoughts drift off — and they will, constantly — notice it and come back to the breath without comment.',
      effect:
        'Coming back is the actual practice, not keeping still. Each time, you train noticing a thought as a thought instead of following it. Over time the gap between impulse and reaction grows.',
      evidence:
        'A large review of 47 trials found moderate evidence for less anxiety, depression and pain, with small to medium effects. Meditation was not better than other effective approaches such as exercise.',
      inApp: 'Ebb Flow is a short form of it: attention on the breath until the ring has run down.',
    },
    bodyScan: {
      name: 'Body scan',
      length: '20–45 minutes',
      how: 'You move your attention slowly through the body, from the toes to the crown, and notice what is there: warmth, pressure, tingling, numbness. You do not have to change anything or relax anything. Noticing is enough.',
      effect:
        'It trains your sense for signals from the body, often long before a feeling reaches your head. Notice tension early and you can act on it earlier.',
      evidence:
        'The body scan is the core of the mindfulness programmes MBSR and MBCT. For MBCT the evidence is strongest: in recurrent depression it cut the risk of relapse by about a third in a pooled analysis of nine trials. How much of that is down to the body scan alone has hardly been studied.',
      inApp: 'The second step of the moment flow, “Feel it once, all the way”, is a body scan in miniature.',
    },
    openAwareness: {
      name: 'Open awareness',
      length: '10–20 minutes',
      how: 'Instead of staying with one anchor, you let everything come and go: sounds, thoughts, sensations. You hold on to nothing and push nothing away. You only watch how one thing after another appears and disappears again.',
      effect:
        'It practises equanimity towards what goes on in your head. Thoughts lose weight when you watch them come and go instead of wrestling with them.',
      evidence:
        'Hardly studied as a form of its own. It usually comes together with breath meditation, and studies rarely separate the two. On its own it suits people with some practice.',
      inApp: 'The sitting practice under neutrality, “Letting it come and go”.',
    },
    lovingKindness: {
      name: 'Loving-kindness (metta)',
      length: '10–15 minutes',
      how: 'You silently repeat good wishes, first for yourself, then for someone close, a stranger and finally someone difficult: “May you be safe. May you be healthy. May you live with ease.” What you feel while doing it does not matter. The sentences are the practice.',
      effect:
        'It turns attention towards goodwill instead of threat, including towards yourself. With shame and self-criticism in particular, that is often the missing counterweight.',
      evidence:
        'A review of 22 trials found medium effects on depression, compassion and self-compassion, measured against groups with no practice. Against other active approaches the results were mixed, and the quality of the studies was moderate.',
      inApp: 'The sitting practice under shame, “A hand on the breastbone”, works with sentences of this kind.',
    },
    mantra: {
      name: 'Mantra meditation',
      length: '15–20 minutes, once or twice a day',
      how: 'You silently repeat a word or a syllable, without effort. When your thoughts wander, you come back to the word. The best-known form is Transcendental Meditation (TM), taught in courses with a personal mantra.',
      effect:
        'The word gives the mind something simple to do. Many find that easier than the breath because it asks for less control.',
      evidence:
        'For TM there is evidence of slightly lower blood pressure, on average by about 4 over 2 mmHg — comparable to exercise or a change of diet. Many of the trials carry a risk of bias, though, and independent long-term studies are missing.',
    },
    slowBreathing: {
      name: 'Slow breathing',
      length: '5–20 minutes',
      how: 'You breathe evenly about six times a minute — roughly five seconds in and five out, ideally with a slightly longer out-breath. No pauses, and no deeper than is comfortable.',
      effect:
        'At this pace heartbeat and breath swing together, the calming branch of the nervous system takes a larger part, and the body noticeably winds down. It works within minutes, not only after weeks.',
      evidence:
        'The bodily effects, on heart rate variability for instance, are well measured. For mood and anxiety the studies are smaller. In one trial of five minutes a day, breathing with an emphasised out-breath lifted mood more than mindfulness meditation. That is promising, but a single result.',
      inApp: 'Ebb Flow: three rhythms, each at six breaths a minute.',
    },
  }),

  bodyTitle: 'What happens in the body',
  body: [
    {
      title: 'Breath and heart',
      body: 'The heart beats a little faster on the in-breath and slower on the out-breath, steered by the vagus nerve. Lengthen the out-breath and you lengthen the phase in which the body brakes. That is why the breath is the one lever on the stress system you can work on purpose at any time.',
    },
    {
      title: 'Attention',
      body: 'Meditation is above all attention training. The mind wanders off constantly; that is normal. What gets practised is noticing and coming back — and that same ability is in seeing an impulse before it acts.',
    },
    {
      title: 'Naming feelings',
      body: 'Putting a feeling into words measurably dampens the brain’s response to it. That is why the moment flow begins by naming the level: once a feeling has a name, it gets smaller.',
    },
    {
      title: 'And the brain?',
      body: 'You often read that meditation changes the structure of the brain within a few weeks. A large study of more than 200 participants found no such changes after eight weeks of MBSR. So far, what changes shows in experience and behaviour rather than in a brain scan.',
    },
  ],

  limitsTitle: 'What the research does not say',
  limits: [
    'The effects are real but mostly small to medium. In the studies, meditation is not better than other effective routes such as exercise or therapy.',
    'Much of what is claimed for meditation goes beyond the evidence. Researchers in the field warn against the hype themselves.',
    'Meditation can have side effects. In a review of 83 studies, on average about 8 in 100 people practising reported unwanted effects, most often anxiety and low mood, including people with no previous mental health problems.',
    'If you have been through trauma or live with psychosis or severe depression, take up longer meditation with professional support. An app is no replacement for treatment.',
  ],

  sourcesTitle: 'Sources',
}

export const meditationCopy: Record<Language, MeditationCopy> = { de, en }
