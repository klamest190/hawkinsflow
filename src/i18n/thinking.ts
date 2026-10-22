import type { Language } from '../types.ts'

/** One station of a model: its name, what happens there, and where the app practises it. */
export type Station = {
  name: string
  body: string
  /** Where this app gives the station something to do; absent where it doesn't. */
  inApp?: string
}

/* Typed wide on purpose: a station may or may not point into the app. */
function stations(list: Station[]): Station[] {
  return list
}

/**
 * The two models of thinking — the "ordinary" one and the Mind Hack Method —
 * and what happens at each of their six stations.
 *
 * Both lists run from the foundation upwards, the order in which one thought
 * builds on the last. Station n of the one model is answered by station n
 * of the other: a limiting belief by an empowering decision, problems by
 * gratitude, and so on. The view shows them in pairs for that reason, and a
 * test checks that both languages have six of each.
 *
 * The station names follow the book the models come from. The explanations
 * are this app's own words, not the book's.
 *
 * As everywhere in this app, the German object is the template; the English
 * one must carry the same keys.
 */
const de = {
  title: 'Zwei Arten zu denken',
  lead:
    'Zwei Modelle dafür, wie aus einem Gedanken eine Handlung wird. Beide haben sechs Stationen, und beide bauen von unten nach oben. Das erste läuft von allein. Das zweite musst du bewusst wählen, Station für Station.',

  ordinaryTitle: 'Das gewöhnliche Denkmodell',
  ordinaryLead:
    'So arbeitet das Gehirn, wenn niemand eingreift: schnell, sparsam, auf Gefahr eingestellt. Es steht auf einer Spitze, einem einzigen alten Satz.',
  mindHackTitle: 'Die Mind-Hack-Methode',
  mindHackLead:
    'Dieselben sechs Schritte, bewusst gegangen. Es steht auf einem breiten Fundament: einer Entscheidung, die du triffst, statt sie zu erben.',

  stationsTitle: 'Station für Station',
  stationsLead:
    'Jede Station des einen Modells hat ihr Gegenstück im anderen. Gelesen wird von unten nach oben, so wie ein Gedanke auf dem vorigen aufbaut.',
  stationLabel: (station: number): string => `Station ${station}`,
  ordinaryTag: 'Gewöhnlich',
  mindHackTag: 'Mind Hack',
  inAppLabel: 'Hier in der App',

  // Read as the foundation upwards: index 0 is the bottom of the pyramid.
  ordinary: stations([
    {
      name: 'Einschränkende Überzeugungen',
      body: 'Am Anfang steht ein Satz, den du irgendwann über dich oder die Welt gelernt hast, oft schon als Kind: „Ich bin nicht gut genug“, „Fehler sind gefährlich“. Er fühlt sich nicht wie eine Meinung an, sondern wie eine Tatsache. Alles Weitere baut auf ihm auf, ohne dass du ihn je geprüft hast.',
    },
    {
      name: 'Probleme',
      body: 'Durch diesen Satz hindurch siehst du vor allem, was fehlt und was schiefgehen kann. Das Gehirn ist darauf gebaut, Gefahren zu finden, und es findet immer welche. Der Tag besteht dann aus Problemen und nicht aus Möglichkeiten.',
    },
    {
      name: 'Verwirrung',
      body: 'Viele Probleme auf einmal ergeben kein Bild, sondern Lärm. Du weißt nicht mehr genau, was du willst, nur noch, was du nicht willst. In diesem Zustand fühlt sich jede Richtung gleich riskant an.',
    },
    {
      name: 'Fragen',
      body: 'Aus der Verwirrung kommen Fragen, die keine Antwort suchen, sondern ein Urteil: „Warum passiert das immer mir?“, „Was stimmt nicht mit mir?“ Das Gehirn beantwortet sie trotzdem, und zwar mit weiteren Belegen für den Satz vom Anfang.',
    },
    {
      name: 'Angst',
      body: 'Am Ende dieser Fragen steht Angst. Sie ist das Gefühl, das zu allem davor passt: Wenn die Welt voller Probleme ist und du ihnen nicht gewachsen bist, ist Vorsicht die vernünftigste Haltung.',
    },
    {
      name: '(Re)Aktionen',
      body: 'Was du dann tust, ist kein Handeln, sondern ein Reagieren, daher das „Re“ in Klammern: ausweichen, aufschieben, kämpfen, dich zurückziehen. Das schützt für den Moment und bestätigt auf Dauer den Satz, mit dem alles anfing. Der Kreis schließt sich.',
    },
  ]),

  mindHack: stations([
    {
      name: 'Ermächtigende Entscheidungen',
      body: 'Hier beginnt es nicht mit einem alten Satz, sondern mit einer Entscheidung: Wie willst du diese Lage sehen, und wer willst du in ihr sein? Du triffst sie bewusst, auch wenn sich der alte Satz noch meldet. Der Unterschied liegt nicht im Gefühl, sondern darin, wer bestimmt.',
      inApp: 'Das Reframing bei Akzeptanz („So bin ich eben — stimmt das?“) prüft einen alten Satz und sagt ihn neu.',
    },
    {
      name: 'Dankbarkeit',
      body: 'Dankbarkeit lenkt den Blick auf das, was schon da ist und trägt. Das ist kein Schönreden der Probleme. Es ist das Gegengewicht zu einem Gehirn, das von selbst nur nach Gefahren sucht.',
      inApp: '„Was du hier schon hast“ steht bei jeder Ebene vor dem Rat, aus genau diesem Grund.',
    },
    {
      name: 'Absolute Klarheit',
      body: 'Aus dem ruhigeren Blick wird ein klares Bild davon, was du willst — so konkret, dass du es erkennen würdest, wenn es da ist. Klarheit ersetzt die Verwirrung nicht durch Gewissheit über die Zukunft, sondern durch ein Ziel.',
      inApp: 'Der Wenn-Dann-Plan macht aus einem Wunsch einen Satz mit Situation und Handlung.',
    },
    {
      name: 'Ermächtigende Fragen',
      body: 'Jetzt stellst du Fragen, die nach vorn zeigen: „Was ist der kleinste nächste Schritt?“, „Wer kann mir dabei helfen?“ Das Gehirn sucht auf jede Frage eine Antwort. Hier sucht es nach Wegen statt nach Belegen.',
      inApp: 'Der Moment-Bogen stellt dir eine solche Frage, eine eigene für jede Ebene unter der Schwelle.',
    },
    {
      name: 'Vertrauen',
      body: 'Vertrauen heißt hier nicht, sicher zu sein, dass alles gut geht. Es heißt, loszugehen, bevor du den ganzen Weg siehst. Es nimmt den Platz ein, den im anderen Modell die Angst hat.',
      inApp: 'Die Übung „Zwei Minuten vor der Schwelle“ bei Mut: das Kurz-davor spüren und dann aufstehen.',
    },
    {
      name: 'Handeln',
      body: 'Am Ende steht Handeln statt Reagieren: ein Schritt, den du gewählt hast, nicht einer, zu dem dich die Lage zwingt. Jede solche Handlung ist ein Beleg gegen den alten Satz und für die Entscheidung, mit der es anfing.',
      inApp: 'Die Übung „Die eine Sache am Morgen“ bei Mut: eine Sache, bewusst gewählt, in der ersten Stunde.',
    },
  ]),

  // Same standard as for Hawkins: what is a model is called a model.
  sourceNote:
    'Beide Modelle stammen aus dem Buch zur Mind-Hack-Methode; die Erklärungen hier sind in eigenen Worten geschrieben. Wie Hawkins’ Skala sind sie ein Denkmodell und nicht wissenschaftlich untersucht.',
  colorNote:
    'Die Farben sind die der Skala: links die Ebenen unter der Schwelle, rechts die darüber. Das ist eine Lesart dieser App, nicht des Buchs.',
}

/** Derived from the German template — every language carries the same keys. */
export type ThinkingCopy = typeof de

const en: ThinkingCopy = {
  title: 'Two ways of thinking',
  lead:
    'Two models of how a thought turns into an action. Both have six stations, and both build from the bottom up. The first runs on its own. The second you have to choose on purpose, station by station.',

  ordinaryTitle: 'The ordinary model of thinking',
  ordinaryLead:
    'This is how the brain works when nobody steps in: fast, economical, tuned to danger. It stands on a point — a single old sentence.',
  mindHackTitle: 'The Mind Hack Method',
  mindHackLead:
    'The same six steps, taken on purpose. It stands on a broad foundation: a decision you make instead of one you inherited.',

  stationsTitle: 'Station by station',
  stationsLead:
    'Every station of the one model has its counterpart in the other. Read from the bottom up, the way one thought builds on the last.',
  stationLabel: (station: number): string => `Station ${station}`,
  ordinaryTag: 'Ordinary',
  mindHackTag: 'Mind Hack',
  inAppLabel: 'In this app',

  ordinary: stations([
    {
      name: 'Limiting beliefs',
      body: 'It starts with a sentence you learnt about yourself or the world at some point, often as a child: “I am not good enough”, “mistakes are dangerous”. It does not feel like an opinion but like a fact. Everything else builds on it, without your ever having tested it.',
    },
    {
      name: 'Problems',
      body: 'Through that sentence you mostly see what is missing and what could go wrong. The brain is built to find dangers, and it always finds some. The day then consists of problems rather than possibilities.',
    },
    {
      name: 'Confusion',
      body: 'Many problems at once do not make a picture, they make noise. You no longer quite know what you want, only what you do not want. In that state every direction feels equally risky.',
    },
    {
      name: 'Questions',
      body: 'Out of the confusion come questions that are not looking for an answer but for a verdict: “Why does this always happen to me?”, “What is wrong with me?” The brain answers them anyway — with more evidence for the sentence it all started with.',
    },
    {
      name: 'Fear',
      body: 'At the end of those questions there is fear. It is the feeling that fits everything before it: if the world is full of problems and you are not up to them, caution is the most sensible stance.',
    },
    {
      name: '(Re)actions',
      body: 'What you then do is not acting but reacting, hence the “re” in brackets: dodging, putting off, fighting, withdrawing. It protects you for the moment and, over time, confirms the sentence it all started with. The circle closes.',
    },
  ]),

  mindHack: stations([
    {
      name: 'Empowering decisions',
      body: 'Here it does not start with an old sentence but with a decision: how do you want to see this situation, and who do you want to be in it? You make it on purpose, even while the old sentence still speaks up. The difference is not in the feeling but in who decides.',
      inApp: 'The reframe under acceptance (“That is just how I am — is it?”) tests an old sentence and puts it again.',
    },
    {
      name: 'Gratitude',
      body: 'Gratitude turns your attention to what is already there and holds you up. That is not glossing over the problems. It is the counterweight to a brain that, left to itself, only looks for danger.',
      inApp: '“What you already have here” stands before the advice on every level, for exactly this reason.',
    },
    {
      name: 'Absolute clarity',
      body: 'The calmer view turns into a clear picture of what you want — concrete enough that you would recognise it if it were there. Clarity does not replace confusion with certainty about the future, but with a goal.',
      inApp: 'The if–then plan turns a wish into a sentence with a situation and an action.',
    },
    {
      name: 'Empowering questions',
      body: 'Now you ask questions that point forward: “What is the smallest next step?”, “Who can help me with this?” The brain looks for an answer to every question. Here it looks for ways instead of evidence.',
      inApp: 'The moment flow asks you a question like that, one of its own for every level below the threshold.',
    },
    {
      name: 'Faith',
      body: 'Faith here does not mean being sure that everything will go well. It means setting off before you can see the whole way. It takes the place that fear holds in the other model.',
      inApp: 'The practice “Two minutes at the threshold” under courage: feel the moment just before, then stand up.',
    },
    {
      name: 'Action',
      body: 'At the end there is acting instead of reacting: a step you chose, not one the situation forces on you. Every action like that is evidence against the old sentence and for the decision it all started with.',
      inApp: 'The practice “The one thing in the morning” under courage: one thing, chosen on purpose, in the first hour.',
    },
  ]),

  sourceNote:
    'Both models come from the book on the Mind Hack Method; the explanations here are written in this app’s own words. Like Hawkins’ scale, they are a way of thinking about thinking and have not been studied scientifically.',
  colorNote:
    'The colours are the scale’s: on the left the levels below the threshold, on the right those above. That is this app’s reading, not the book’s.',
}

export const thinkingCopy: Record<Language, ThinkingCopy> = { de, en }
