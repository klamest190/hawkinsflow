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
 * One situation, thought through both models: what the inner voice says at
 * each station, from the foundation upwards — six sentences for the ordinary
 * model, six for the Mind Hack Method. Without quotation marks: the view
 * sets them, in the language's own form.
 */
export type Example = {
  title: string
  situation: string
  ordinary: string[]
  mindHack: string[]
}

/* Typed wide on purpose: the six-and-six is checked by a test, not the type. */
function examples(list: Example[]): Example[] {
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

  // Six situations, each thought through both models, station by station —
  // work, the self, love, the body, friends and family, the direction of a
  // life: the areas where the same six steps come up most.
  // In the inner voice and in the first person: that is where these
  // sentences are heard, and where they can be caught.
  examplesTitle: 'Sechs Beispiele',
  examplesLead:
    'Dieselbe Lage, zweimal durchdacht. Links, wie es von allein läuft, rechts, wie es bewusst gewählt klingen kann. Von unten nach oben gelesen, Station für Station.',
  examplesLabel: 'Bereich des Beispiels',
  situationLabel: 'Die Lage',
  examples: examples([
    {
      title: 'Karriere & Geld',
      situation: 'Intern ist eine Stelle mit mehr Verantwortung und mehr Gehalt ausgeschrieben. Die Frist endet in einer Woche.',
      ordinary: [
        'Leute wie ich werden nicht befördert. Geld verdienen die anderen.',
        'Mir fehlen Erfahrung, Kontakte und der richtige Abschluss.',
        'Vielleicht erst eine Weiterbildung? Oder gleich etwas ganz anderes? Ich weiß nicht mal, was ich eigentlich will.',
        'Warum ist das bei mir immer so schwer? Was, wenn die mich auslachen?',
        'Wenn ich mich bewerbe und abgelehnt werde, wissen alle, dass ich es nicht kann.',
        'Ich lasse die Frist verstreichen und sage mir, dass der Zeitpunkt sowieso schlecht war.',
      ],
      mindHack: [
        'Ich bewerbe mich als jemand, der wachsen will, nicht als jemand, der schon alles kann.',
        'Ich habe zwei Projekte erfolgreich durchgezogen, und mein Team vertraut mir.',
        'Ich will diese Rolle und fünfzehn Prozent mehr Gehalt. Daran messe ich die nächsten drei Monate.',
        'Wer hat diese Rolle schon, und wen kann ich diese Woche fragen, wie der Weg dorthin war?',
        'Ich weiß nicht, ob es klappt. Ich weiß, dass ich am Versuch wachse.',
        'Ich schreibe heute Abend die Bewerbung und bitte morgen meine Chefin um ein Gespräch.',
      ],
    },
    {
      title: 'Selbstbewusstsein',
      situation: 'Im Meeting hast du eine Idee, die noch niemand angesprochen hat.',
      ordinary: [
        'Was ich sage, ist nicht so wichtig.',
        'Ich rede zu umständlich, die anderen sind schlagfertiger, und letztes Mal hat keiner reagiert.',
        'Jetzt sagen oder später? Ist die Idee überhaupt gut? Vielleicht hat sie schon jemand gebracht.',
        'Warum kann ich nicht einfach so selbstsicher sein wie die anderen?',
        'Wenn ich mich blamiere, denken alle, ich habe keine Ahnung.',
        'Ich sage nichts und ärgere mich hinterher, als jemand anderes genau das vorschlägt.',
      ],
      mindHack: [
        'Meine Sicht ist ein Beitrag, auch wenn sie nicht perfekt ist.',
        'Ich kenne das Thema gut, und zwei Kollegen haben mich schon nach meiner Meinung gefragt.',
        'Ich sage einen Satz: das Problem und meinen Vorschlag. Mehr nicht.',
        'Wie würde ich es sagen, wenn ich wüsste, dass es niemanden stört?',
        'Ein Satz, der nicht perfekt ist, kostet mich wenig. Schweigen kostet mich mehr.',
        'Ich hebe die Hand und sage den einen Satz, bevor ich ihn zerdenke.',
      ],
    },
    {
      title: 'Dating & Partnerschaft',
      situation: 'Nach einem schönen zweiten Date meldet sich die andere Person einen Tag lang nicht.',
      ordinary: [
        'Am Ende will mich sowieso niemand wirklich.',
        'Keine Antwort. Ich war zu viel, habe zu viel erzählt, mein Witz kam falsch an.',
        'Schreiben oder abwarten? Bin ich zu anhänglich, wenn ich mich melde, und zu kühl, wenn nicht?',
        'Was stimmt nicht mit mir, dass es nie klappt?',
        'Wenn ich mich melde und abgewiesen werde, bestätigt das alles.',
        'Ich schreibe drei Nachrichten hintereinander, oder ich ziehe mich zurück und lösche die Nummer.',
      ],
      mindHack: [
        'Ich bin es wert, gemocht zu werden, egal, wie dieser eine Mensch antwortet.',
        'Der Abend war schön, wir haben viel gelacht, und ich war ehrlich ich selbst.',
        'Ich suche jemanden, der sich auch auf mich freut. Das ist mein Maßstab, nicht die Geschwindigkeit einer Antwort.',
        'Was würde ich jetzt tun, wenn ich mich sicher fühlen würde?',
        'Ich weiß nicht, wie es ausgeht. Ich kann gut damit leben, mich gezeigt zu haben.',
        'Ich schreibe eine freundliche Nachricht, dass mir der Abend gefallen hat, und lege das Handy weg.',
      ],
    },
    {
      title: 'Gesundheit & Körper',
      situation: 'Du wolltest dreimal die Woche Sport machen. Nach zwei Wochen hast du eine ganze Woche ausgelassen.',
      ordinary: [
        'Ich bin einfach nicht der sportliche Typ. Ich halte nie etwas durch.',
        'Keine Zeit, kein Geld fürs Studio, und mein Knie zwickt auch noch.',
        'Laufen, Krafttraining oder doch Yoga? Morgens oder abends? Ich weiß nicht, wo ich anfangen soll.',
        'Warum schaffen das alle anderen, nur ich nicht?',
        'Wenn ich wieder anfange und wieder aufhöre, ist das der Beweis, dass es keinen Sinn hat.',
        'Ich lasse es ganz und nehme mir vor, im Januar richtig neu anzufangen.',
      ],
      mindHack: [
        'Ich bin jemand, der sich bewegt, auch nach einer Pause. Eine verpasste Woche ändert daran nichts.',
        'Zwei Wochen habe ich geschafft, und mein Körper hat sich danach gut angefühlt.',
        'Zweimal die Woche zwanzig Minuten zügig gehen. Das ist das Ziel, mehr nicht.',
        'Was ist die kleinste Bewegung, die ich heute noch schaffe?',
        'Ich muss nicht wissen, ob ich es ein Jahr durchhalte. Ich muss nur heute losgehen.',
        'Ich ziehe jetzt die Schuhe an und gehe eine Runde um den Block.',
      ],
    },
    {
      title: 'Familie & Freundschaft',
      situation: 'Eine gute Freundin hat deinen Geburtstag vergessen und sich seitdem nicht gemeldet.',
      ordinary: [
        'Ich bin den Leuten nie so wichtig wie sie mir.',
        'Kein Anruf, keine Nachricht. Und letzten Monat hat sie auch schon abgesagt.',
        'Ansprechen oder runterschlucken? Bin ich kleinlich? Ist die Freundschaft vorbei?',
        'Warum muss immer ich mich um alles kümmern?',
        'Wenn ich es anspreche, gibt es Streit, und dann verliere ich sie ganz.',
        'Ich antworte kühl auf ihre nächste Nachricht und erzähle anderen, wie enttäuscht ich bin.',
      ],
      mindHack: [
        'Ich darf sagen, was mir wichtig ist. Eine Freundschaft verträgt das.',
        'Sie war da, als es mir im Frühjahr schlecht ging. Das zählt mehr als ein vergessener Tag.',
        'Ich will ihr ohne Vorwurf sagen, dass es mich getroffen hat, und wissen, wie es ihr geht.',
        'Was ist bei ihr gerade los, und wie sage ich es so, dass sie es hören kann?',
        'Ich weiß nicht, wie sie reagiert. Ich vertraue darauf, dass Ehrlichkeit uns näher bringt als Schweigen.',
        'Ich rufe sie an und sage: Ich war traurig, dass du dich nicht gemeldet hast. Wie geht es dir?',
      ],
    },
    {
      title: 'Sinn & Zukunft',
      situation: 'Der Job ist sicher, das Leben läuft. Trotzdem fragst du dich immer öfter, ob das schon alles war.',
      ordinary: [
        'Für große Veränderungen ist es jetzt zu spät. Andere hatten einfach mehr Glück.',
        'Kredit, Verantwortung, keine Rücklagen für einen Neuanfang. Und eine Idee habe ich auch nicht.',
        'Kündigen? Teilzeit? Studium? Auswandern? Jeder Gedanke führt zu zehn neuen.',
        'Was habe ich bloß die letzten zehn Jahre gemacht?',
        'Wenn ich etwas ändere und es schiefgeht, stehe ich mit nichts da.',
        'Ich scrolle abends durch Jobportale und mache am nächsten Morgen weiter wie immer.',
      ],
      mindHack: [
        'Mein Leben gehört mir, auch wenn ich die Antwort noch nicht kenne.',
        'Ich habe einen sicheren Job, der mir Zeit und Geld gibt, Neues auszuprobieren.',
        'Ich will herausfinden, wobei ich die Zeit vergesse. Drei Versuche in den nächsten drei Monaten.',
        'Was würde ich ausprobieren, wenn es nur ein Experiment wäre und kein Lebensentwurf?',
        'Ich muss nicht den ganzen Weg sehen. Der nächste Schritt reicht.',
        'Ich melde mich diese Woche für einen Abendkurs an und spreche mit jemandem, der den Weg schon gegangen ist.',
      ],
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

  examplesTitle: 'Six examples',
  examplesLead:
    'The same situation, thought through twice. On the left, how it runs by itself; on the right, how it can sound when chosen on purpose. Read from the bottom up, station by station.',
  examplesLabel: 'Area of the example',
  situationLabel: 'The situation',
  examples: examples([
    {
      title: 'Career & money',
      situation: 'A role with more responsibility and a higher salary has been advertised internally. Applications close in a week.',
      ordinary: [
        'People like me do not get promoted. Money is for other people.',
        'I lack the experience, the contacts and the right degree.',
        'Maybe a course first? Or something else entirely? I do not even know what I want.',
        'Why is it always so hard for me? What if they laugh at me?',
        'If I apply and get turned down, everyone will know I cannot do it.',
        'I let the deadline pass and tell myself the timing was bad anyway.',
      ],
      mindHack: [
        'I am applying as someone who wants to grow, not as someone who can already do it all.',
        'I have pulled off two projects, and my team trusts me.',
        'I want this role and fifteen per cent more pay. That is what I will measure the next three months by.',
        'Who already has this role, and whom can I ask this week how they got there?',
        'I do not know whether it will work. I know I grow by trying.',
        'I will write the application tonight and ask my manager for a conversation tomorrow.',
      ],
    },
    {
      title: 'Self-confidence',
      situation: 'In a meeting you have an idea nobody has raised yet.',
      ordinary: [
        'What I have to say does not really matter.',
        'I ramble, the others are quicker, and last time nobody reacted.',
        'Say it now or later? Is the idea even good? Maybe someone has already said it.',
        'Why can I not just be as confident as everyone else?',
        'If I embarrass myself, everyone will think I have no idea.',
        'I say nothing and kick myself afterwards when someone else suggests exactly that.',
      ],
      mindHack: [
        'My view is a contribution, even if it is not perfect.',
        'I know this subject well, and two colleagues have already asked for my opinion.',
        'I will say one sentence: the problem and my suggestion. Nothing more.',
        'How would I put it if I knew it would bother nobody?',
        'An imperfect sentence costs me little. Staying silent costs me more.',
        'I raise my hand and say the one sentence before I overthink it.',
      ],
    },
    {
      title: 'Dating & relationships',
      situation: 'After a lovely second date, the other person has not been in touch for a day.',
      ordinary: [
        'In the end nobody really wants me anyway.',
        'No reply. I was too much, talked too much, my joke landed wrong.',
        'Text or wait? Am I clingy if I get in touch, and cold if I do not?',
        'What is wrong with me that it never works out?',
        'If I get in touch and get turned down, it proves everything.',
        'I send three messages in a row, or I pull back and delete the number.',
      ],
      mindHack: [
        'I am worth liking, however this one person replies.',
        'The evening was lovely, we laughed a lot, and I was honestly myself.',
        'I am looking for someone who looks forward to me, too. That is my measure, not how fast a reply comes.',
        'What would I do right now if I felt secure?',
        'I do not know how it will turn out. I can live well with having shown myself.',
        'I send one friendly message saying I enjoyed the evening, and put the phone down.',
      ],
    },
    {
      title: 'Health & body',
      situation: 'You meant to exercise three times a week. After two weeks you skipped a whole week.',
      ordinary: [
        'I am just not the sporty type. I never stick with anything.',
        'No time, no money for a gym, and my knee is playing up as well.',
        'Running, weights or yoga? Mornings or evenings? I do not know where to start.',
        'Why can everyone else manage it, just not me?',
        'If I start again and stop again, that proves there is no point.',
        'I drop it altogether and promise myself a proper fresh start in January.',
      ],
      mindHack: [
        'I am someone who moves, even after a break. One missed week does not change that.',
        'I managed two weeks, and my body felt good afterwards.',
        'Twenty minutes of brisk walking, twice a week. That is the goal, nothing more.',
        'What is the smallest bit of movement I can still manage today?',
        'I do not have to know whether I will keep it up for a year. I only have to set off today.',
        'I put my shoes on now and walk once round the block.',
      ],
    },
    {
      title: 'Family & friends',
      situation: 'A good friend forgot your birthday and has not been in touch since.',
      ordinary: [
        'I never matter to people as much as they matter to me.',
        'No call, no message. And last month she cancelled on me, too.',
        'Raise it or swallow it? Am I being petty? Is the friendship over?',
        'Why is it always me who has to take care of everything?',
        'If I bring it up, there will be a row, and then I will lose her altogether.',
        'I reply coolly to her next message and tell others how let down I feel.',
      ],
      mindHack: [
        'I am allowed to say what matters to me. A friendship can take that.',
        'She was there when I was struggling in the spring. That counts for more than one forgotten day.',
        'I want to tell her, without blame, that it hurt, and to find out how she is.',
        'What is going on for her at the moment, and how can I say it so she can hear it?',
        'I do not know how she will react. I trust that honesty brings us closer than silence.',
        'I call her and say: I was sad you did not get in touch. How are you?',
      ],
    },
    {
      title: 'Meaning & the future',
      situation: 'The job is secure, life is ticking along. Still, you wonder more and more often whether this is all there is.',
      ordinary: [
        'It is too late now for big changes. Other people were simply luckier.',
        'A mortgage, responsibilities, no savings for a fresh start. And I do not even have an idea.',
        'Quit? Go part-time? Study? Move abroad? Every thought leads to ten more.',
        'What on earth have I been doing for the last ten years?',
        'If I change something and it goes wrong, I will be left with nothing.',
        'I scroll through job sites in the evening and carry on as usual the next morning.',
      ],
      mindHack: [
        'My life belongs to me, even while I do not know the answer yet.',
        'I have a secure job that gives me the time and money to try new things.',
        'I want to find out what makes me lose track of time. Three experiments in the next three months.',
        'What would I try if it were only an experiment and not a plan for my life?',
        'I do not have to see the whole way. The next step is enough.',
        'This week I sign up for an evening class and talk to someone who has walked that path.',
      ],
    },
  ]),

  sourceNote:
    'Both models come from the book on the Mind Hack Method; the explanations here are written in this app’s own words. Like Hawkins’ scale, they are a way of thinking about thinking and have not been studied scientifically.',
  colorNote:
    'The colours are the scale’s: on the left the levels below the threshold, on the right those above. That is this app’s reading, not the book’s.',
}

export const thinkingCopy: Record<Language, ThinkingCopy> = { de, en }
