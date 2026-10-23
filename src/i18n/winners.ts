import type { LawGroup } from '../data/winners.ts'
import type { Language } from '../types.ts'

/** One law: its title, what it asks, one step for today, and where the app practises it. */
export type Law = {
  title: string
  core: string
  today: string
  /** Where this app gives the law something to do; absent where it doesn't. */
  inApp?: string
}

/* Typed wide on purpose: a law may or may not point into the app, and the
   count of thirty is checked by a test, not by the type. */
function laws(list: Law[]): Law[] {
  return list
}

/**
 * Bodo Schäfer's "Die Gesetze der Gewinner": the thirty laws, in the book's
 * order — index 0 is law 1.
 *
 * The German titles follow the book as two independent summaries list them;
 * the English ones are this app's translation. What each law asks and the
 * step for today are written in this app's own words: a summary of the
 * idea, not the book's text. They describe the principle and leave out
 * claims, figures and rules the book may add.
 *
 * Held to the app's standard: the page says what is advice from experience
 * and what research supports, in `notes`.
 *
 * As everywhere in this app, the German object is the template.
 */
const de = {
  title: 'Die Gesetze der Gewinner',
  lead: 'Dreißig Grundsätze für Erfolg und ein erfülltes Leben aus dem Buch von Bodo Schäfer. Zu jedem steht, worum es geht, ein Schritt für heute und, wo es passt, wo du ihn in dieser App schon übst.',
  groupNote: 'Die Gruppen sind eine Ordnung dieser App, die Nummern die Reihenfolge im Buch.',
  lawLabel: (number: number): string => `Gesetz ${number}`,
  todayLabel: 'Heute',
  inAppLabel: 'Hier in der App',
  groups: {
    act: 'Entscheiden & Handeln',
    focus: 'Fokus & Selbstführung',
    grow: 'Lernen & Wachsen',
    goals: 'Ziele & Antrieb',
    resistance: 'Widerstände meistern',
    character: 'Persönlichkeit & Miteinander',
    foundations: 'Körper & Geld',
  } satisfies Record<LawGroup, string>,

  laws: laws([
    {
      title: 'Triff Entscheidungen',
      core: 'Wer nicht entscheidet, lässt andere oder den Zufall entscheiden. Eine Entscheidung ist erst dann eine, wenn ihr eine Handlung folgt.',
      today: 'Nimm eine Sache, die du seit Wochen vor dir herschiebst, und entscheide sie heute: ja oder nein.',
      inApp: 'Station 1 der Mind-Hack-Methode bei Denken: ermächtigende Entscheidungen.',
    },
    {
      title: 'Lerne und wachse konstant',
      core: 'Wer aufhört zu lernen, fällt zurück, auch wenn er stehen bleibt. Wachstum entsteht aus täglichen kleinen Dosen, nicht aus seltenen großen.',
      today: 'Lies oder hör heute fünfzehn Minuten etwas, das dich in deinem wichtigsten Bereich weiterbringt.',
    },
    {
      title: 'Erlebe den heutigen Tag bewusst',
      core: 'Das Leben findet heute statt, nicht im Gestern und nicht im Irgendwann. Wer den Tag bewusst beginnt und abschließt, verliert ihn nicht an die Routine.',
      today: 'Frag dich heute Abend: Wofür war dieser Tag gut, und was nehme ich mit?',
      inApp: 'Der Tages-Check-in auf „Heute“.',
    },
    {
      title: 'Konzentriere dich auf deine einkommensproduzierenden Aktivitäten',
      core: 'Nicht alles, was dich beschäftigt, bringt dich voran. Erkenne die wenigen Tätigkeiten, die wirklich Ergebnis und Einkommen schaffen, und gib ihnen den besten Teil deiner Zeit.',
      today: 'Schreib die drei Tätigkeiten auf, die bei dir am meisten bewirken, und reservier morgen die erste Stunde für eine davon.',
    },
    {
      title: 'Werde zu einer Persönlichkeit',
      core: 'Erfolg hält nur, wenn der Mensch dahinter trägt. Werte, Verlässlichkeit und Charakter sind kein Beiwerk, sondern das Fundament.',
      today: 'Halte heute ein Versprechen, auch ein kleines, das du sonst hättest schleifen lassen.',
    },
    {
      title: 'Tu es einfach',
      core: 'Zwischen Wissen und Tun liegt der größte Abstand. Perfekte Vorbereitung ist oft nur eine elegante Form des Aufschiebens.',
      today: 'Fang eine Aufgabe, die du meidest, mit dem kleinsten möglichen Schritt an: jetzt, für fünf Minuten.',
      inApp: 'Der Wenn-Dann-Plan bindet ein Vorhaben an einen Moment.',
    },
    {
      title: 'Gehe richtig mit Stress um',
      core: 'Druck gehört zu jedem Vorhaben, das sich lohnt. Schaden richtet er an, wenn er ohne Pause bleibt und du ihn den ganzen Tag mit dir trägst.',
      today: 'Leg heute zwischen zwei Aufgaben eine bewusste Pause von einer Minute ein.',
      inApp: 'Ebb Flow: eine Pause zwischen Reiz und Reaktion.',
    },
    {
      title: 'Lerne Schwierigkeiten zu meistern',
      core: 'Schwierigkeiten gehören zu jedem Weg, der sich lohnt. Entscheidend ist nicht, ob sie kommen, sondern wie schnell du von der Klage zur Lösung wechselst.',
      today: 'Schreib zu deinem größten Problem drei mögliche nächste Schritte auf, egal wie klein.',
      inApp: 'Das Reframing bei der Ebene Akzeptanz.',
    },
    {
      title: 'Erfinde das Rad nicht neu',
      core: 'Fast jedes Ziel hat schon jemand vor dir erreicht. Von dessen Weg zu lernen, spart dir Jahre.',
      today: 'Such dir einen Menschen, der hat, was du willst, und stell ihm diese Woche eine konkrete Frage.',
    },
    {
      title: 'Entwickle Momentum',
      core: 'Der Anfang kostet die meiste Kraft, danach trägt der Schwung. Regelmäßigkeit schlägt Intensität.',
      today: 'Tu heute etwas für dein wichtigstes Ziel, und morgen wieder. Die Kette zählt mehr als der einzelne Tag.',
    },
    {
      title: 'Träume und lebe deinen Traum',
      core: 'Ein großer Traum gibt Richtung und Energie. Gelebt wird er erst, wenn du ihn in Ziele und Schritte übersetzt.',
      today: 'Beschreib in fünf Sätzen, wie dein Leben in zehn Jahren aussehen soll, wenn alles gut geht.',
    },
    {
      title: 'Achte auf deinen Körper',
      core: 'Ohne Energie keine Leistung. Schlaf, Bewegung und Ernährung sind keine Belohnung für später, sondern die Voraussetzung für alles andere.',
      today: 'Geh heute zwanzig Minuten zügig spazieren und lass das Handy dabei in der Tasche.',
      inApp: 'Das Beispiel „Gesundheit & Körper“ bei Denken.',
    },
    {
      title: 'Lass dich von Ablehnung nicht entmutigen',
      core: 'Ein Nein gilt meist einem Angebot oder einem Moment, nicht dir als Mensch. Wer viel versucht, hört viele Neins, und genau deshalb auch Jas.',
      today: 'Frag heute nach etwas, bei dem du mit einem Nein rechnest.',
      inApp: 'Das Beispiel „Dating & Partnerschaft“ bei Denken.',
    },
    {
      title: 'Gib 110 Prozent',
      core: 'Wer etwas mehr gibt als erwartet, fällt auf und baut Vertrauen auf. Gemeint ist Einsatz für das Wichtige, nicht für alles.',
      today: 'Mach heute bei einer Aufgabe einen Schritt mehr, als von dir erwartet wird.',
    },
    {
      title: 'Wachse an deinen Problemen',
      core: 'Probleme zeigen, wo die nächste Stufe deiner Entwicklung liegt. Wer größere Probleme lösen kann, ist mit ihnen gewachsen.',
      today: 'Frag dich bei deinem aktuellen Problem: Was kann ich daran lernen, das mir später hilft?',
    },
    {
      title: 'Sei Chef und Angestellter in einer Person',
      core: 'Als Chef legst du fest, was wichtig ist, als Angestellter führst du es zuverlässig aus. Selbstführung heißt, beide Rollen ernst zu nehmen.',
      today: 'Plan heute Abend als Chef den morgigen Tag, und halte dich morgen als Angestellter daran.',
    },
    {
      title: 'Setze dir große Ziele',
      core: 'Kleine Ziele erzeugen kleine Anstrengung. Ein großes, klares Ziel setzt Kräfte frei, die du vorher nicht kanntest.',
      today: 'Formuliere ein Ziel für dieses Jahr so konkret, dass du am Ende eindeutig sagen kannst, ob du es erreicht hast.',
      inApp: 'Station 3 der Mind-Hack-Methode bei Denken: absolute Klarheit.',
    },
    {
      title: 'Gib anderen, was sie brauchen',
      core: 'Erfolg entsteht, wenn du für andere Wert schaffst. Wer zuerst fragt, was der andere braucht, wird gebraucht.',
      today: 'Frag heute einen Kunden, Kollegen oder Freund, womit du ihm wirklich helfen könntest.',
    },
    {
      title: 'Lass dich nicht ablenken',
      core: 'Ablenkung ist der leise Gegner jedes Ziels. Was du nicht bewusst ausschließt, frisst deine Aufmerksamkeit.',
      today: 'Arbeite heute fünfundvierzig Minuten an einer Sache, mit stummem Handy und geschlossenem Postfach.',
      inApp: 'Die Atemmeditation übt genau das Zurückkehren.',
    },
    {
      title: 'Sei ein produktives Vorbild',
      core: 'Menschen folgen dem, was du tust, nicht dem, was du sagst. Wer andere führen will, geht voran.',
      today: 'Tu heute das, was du von anderen erwartest, zuerst selbst.',
    },
    {
      title: 'Beginne alles Wichtige so schnell wie möglich',
      core: 'Je länger zwischen Entschluss und erster Handlung liegt, desto unwahrscheinlicher wird sie. Der erste Schritt muss nicht groß sein, nur bald.',
      today: 'Mach für deinen neuesten Vorsatz noch heute den ersten konkreten Schritt.',
      inApp: 'Der Wenn-Dann-Plan: Situation und Handlung vorher festlegen.',
    },
    {
      title: 'Übernimm die volle Verantwortung',
      core: 'Solange andere schuld sind, haben andere die Macht. Verantwortung heißt nicht Schuld, sondern die Frage: Was kann ich jetzt tun?',
      today: 'Ersetze heute einmal „Die anderen …“ durch „Was ich tun kann, ist …“.',
    },
    {
      title: 'Lerne, mit Angst umzugehen',
      core: 'Angst verschwindet nicht durch Warten, sondern durch Handeln. Mut heißt, mit der Angst loszugehen.',
      today: 'Tu heute eine kleine Sache, vor der du ein bisschen Angst hast.',
      inApp: 'Der Moment-Bogen beginnt bei Angst mit dem langen Ausatmen.',
    },
    {
      title: 'Konzentriere dich auf deine Stärken',
      core: 'Wer nur an Schwächen arbeitet, wird bestenfalls durchschnittlich. Wer seine Stärken ausbaut, kann herausragend werden.',
      today: 'Frag drei Menschen, was du ihrer Meinung nach besonders gut kannst.',
    },
    {
      title: 'Gib und vergib',
      core: 'Großzügigkeit öffnet Türen, Groll hält dich fest. Wer vergibt, befreit vor allem sich selbst.',
      today: 'Lass heute einen alten Ärger los, oder sag jemandem Danke, den du übersehen hast.',
      inApp: 'Die Meditation der liebenden Güte.',
    },
    {
      title: 'Gehe klug mit deinem Geld um',
      core: 'Geld ist ein Werkzeug, kein Ziel. Wer einen festen Teil seines Einkommens zuerst für sich zurücklegt, baut sich Freiheit auf.',
      today: 'Richte einen Dauerauftrag ein, der jeden Monat gleich nach dem Gehaltseingang einen festen Betrag beiseitelegt.',
    },
    {
      title: 'Errichte geduldig dein Fundament',
      core: 'Was schnell hochgezogen wird, fällt oft schnell. Dauerhafter Erfolg braucht Zeit, in der man noch wenig sieht.',
      today: 'Schreib auf, woran du seit Monaten arbeitest, ohne dass es schon sichtbar ist, und warum es sich trotzdem lohnt.',
    },
    {
      title: 'Umgib dich mit Vorbildern',
      core: 'Du wirst den Menschen ähnlich, mit denen du die meiste Zeit verbringst. Wähle dein Umfeld so bewusst wie deine Ziele.',
      today: 'Verabrede dich diese Woche mit jemandem, der dich inspiriert.',
      inApp: 'Station 4 im Beispiel „Karriere & Geld“ bei Denken.',
    },
    {
      title: 'Akzeptiere Unzufriedenheit als treibende Kraft',
      core: 'Unzufriedenheit ist ein Zeichen, dass mehr möglich ist. Statt sie zu betäuben, kannst du sie in Veränderung lenken.',
      today: 'Schreib auf, womit du gerade unzufrieden bist, und daneben, was du ändern könntest.',
      inApp: 'Das Beispiel „Sinn & Zukunft“ bei Denken.',
    },
    {
      title: 'Sei ein Adler und keine Ente',
      core: 'Enten schnattern und beklagen sich, Adler steigen über die Wolken. Du entscheidest, ob dich das Klagen anderer herunterzieht.',
      today: 'Verlass heute ein Gespräch, das nur aus Jammern besteht, oder lenk es auf eine Lösung.',
    },
  ]),

  notesTitle: 'Einordnung',
  notes: [
    'Ein Ratgeber aus Erfahrung, kein Forschungsbericht. Die „Gesetze“ sind Grundsätze, keine Naturgesetze, und als Ganzes nicht wissenschaftlich untersucht.',
    'Manches passt gut zur Forschung: Wer einen Vorsatz mit einem konkreten Wann und Wie verbindet, setzt ihn deutlich häufiger um. Das stützt die Gesetze 6 und 21.',
    'Anderes ist Haltung, kein Befund. Ob dir ein Grundsatz hilft, merkst du daran, was er in deinem Alltag verändert.',
    '„Gib 110 Prozent“ verträgt sich nicht mit Dauerüberlastung. Bei der Ebene Mut warnt diese App davor, alles auf einmal anzupacken. Nimm das Gesetz als Einsatz für das Wichtige, nicht für alles.',
  ],
  sourcesTitle: 'Quellen',
  sources: [
    'Schäfer, B. (2001). Die Gesetze der Gewinner. Erfolg und ein erfülltes Leben. Frankfurt am Main: Frankfurter Allgemeine Buch; Taschenbuch bei dtv, 2003.',
    'Gollwitzer, P. M. & Sheeran, P. (2006). Implementation intentions and goal achievement: a meta-analysis of effects and processes. Advances in Experimental Social Psychology, 38.',
  ],
  sourceNote: 'Die Titel der Gesetze folgen dem Buch. Was zu jedem Gesetz hier steht, ist in eigenen Worten geschrieben und gibt den Grundgedanken wieder, nicht den Text des Buchs.',
}

/** Derived from the German template — every language carries the same keys. */
export type WinnersCopy = typeof de

const en: WinnersCopy = {
  title: 'The laws of winners',
  lead: 'Thirty principles for success and a fulfilled life from Bodo Schäfer’s book. Each comes with what it is about, one step for today and, where it fits, where you already practise it in this app.',
  groupNote: 'The groups are this app’s order; the numbers are the order in the book.',
  lawLabel: (number: number): string => `Law ${number}`,
  todayLabel: 'Today',
  inAppLabel: 'In this app',
  groups: {
    act: 'Deciding & acting',
    focus: 'Focus & self-leadership',
    grow: 'Learning & growing',
    goals: 'Goals & drive',
    resistance: 'Mastering resistance',
    character: 'Character & others',
    foundations: 'Body & money',
  },

  laws: laws([
    {
      title: 'Make decisions',
      core: 'If you do not decide, others or chance decide for you. A decision only becomes one when an action follows it.',
      today: 'Take something you have been putting off for weeks and decide it today: yes or no.',
      inApp: 'Station 1 of the Mind Hack Method under Thinking: empowering decisions.',
    },
    {
      title: 'Keep learning and growing',
      core: 'Stop learning and you fall behind, even while standing still. Growth comes from small daily doses, not from rare large ones.',
      today: 'Read or listen for fifteen minutes today to something that moves you on in your most important area.',
    },
    {
      title: 'Live today consciously',
      core: 'Life happens today, not yesterday and not some day. Begin and close the day on purpose, and you do not lose it to routine.',
      today: 'Ask yourself tonight: what was this day good for, and what do I take from it?',
      inApp: 'The daily check-in under “Today”.',
    },
    {
      title: 'Focus on your income-producing activities',
      core: 'Not everything that keeps you busy moves you forward. Find the few activities that really create results and income, and give them the best part of your time.',
      today: 'Write down the three activities that achieve the most for you, and keep the first hour tomorrow for one of them.',
    },
    {
      title: 'Become a person of character',
      core: 'Success only lasts if the person behind it holds. Values, reliability and character are not extras but the foundation.',
      today: 'Keep a promise today, even a small one you would otherwise have let slide.',
    },
    {
      title: 'Just do it',
      core: 'The greatest distance lies between knowing and doing. Perfect preparation is often just an elegant way of putting things off.',
      today: 'Start a task you have been avoiding with the smallest possible step: now, for five minutes.',
      inApp: 'The if–then plan ties an intention to a moment.',
    },
    {
      title: 'Handle stress well',
      core: 'Pressure is part of every undertaking worth the effort. It does harm when it goes on without a break and you carry it with you all day.',
      today: 'Take a deliberate one-minute pause between two tasks today.',
      inApp: 'Ebb Flow: a pause between impulse and reaction.',
    },
    {
      title: 'Learn to master difficulties',
      core: 'Difficulties are part of every path worth taking. What matters is not whether they come but how quickly you move from complaint to solution.',
      today: 'Write down three possible next steps for your biggest problem, however small.',
      inApp: 'The reframe under the level of acceptance.',
    },
    {
      title: 'Do not reinvent the wheel',
      core: 'Almost every goal has been reached by someone before you. Learning from their path saves you years.',
      today: 'Find someone who has what you want, and ask them one concrete question this week.',
    },
    {
      title: 'Build momentum',
      core: 'Starting takes the most effort; after that, momentum carries you. Regularity beats intensity.',
      today: 'Do something for your most important goal today, and again tomorrow. The chain counts for more than the single day.',
    },
    {
      title: 'Dream and live your dream',
      core: 'A big dream gives direction and energy. You only live it once you translate it into goals and steps.',
      today: 'Describe in five sentences what your life should look like in ten years if everything goes well.',
    },
    {
      title: 'Look after your body',
      core: 'No energy, no performance. Sleep, movement and food are not a reward for later but the precondition for everything else.',
      today: 'Walk briskly for twenty minutes today and leave your phone in your pocket.',
      inApp: 'The example “Health & body” under Thinking.',
    },
    {
      title: 'Do not let rejection discourage you',
      core: 'A no is usually about an offer or a moment, not about you as a person. Try a lot and you hear a lot of noes — and for exactly that reason, yeses too.',
      today: 'Ask for something today where you expect a no.',
      inApp: 'The example “Dating & relationships” under Thinking.',
    },
    {
      title: 'Give 110 per cent',
      core: 'Give a little more than expected and you stand out and build trust. It means effort for what matters, not for everything.',
      today: 'Go one step further than expected on one task today.',
    },
    {
      title: 'Grow through your problems',
      core: 'Problems show where the next stage of your development lies. Whoever can solve bigger problems has grown with them.',
      today: 'Ask yourself about your current problem: what can I learn from it that will help me later?',
    },
    {
      title: 'Be boss and employee in one',
      core: 'As the boss you decide what matters; as the employee you carry it out reliably. Leading yourself means taking both roles seriously.',
      today: 'Tonight, as the boss, plan tomorrow; tomorrow, as the employee, stick to it.',
    },
    {
      title: 'Set yourself big goals',
      core: 'Small goals create small effort. A big, clear goal releases strength you did not know you had.',
      today: 'Word one goal for this year so concretely that at the end you can say without doubt whether you reached it.',
      inApp: 'Station 3 of the Mind Hack Method under Thinking: absolute clarity.',
    },
    {
      title: 'Give others what they need',
      core: 'Success comes from creating value for others. Ask first what the other person needs, and you will be needed.',
      today: 'Ask a customer, colleague or friend today what you could really help them with.',
    },
    {
      title: 'Do not get distracted',
      core: 'Distraction is the quiet opponent of every goal. Whatever you do not shut out on purpose eats your attention.',
      today: 'Work on one thing for forty-five minutes today, with your phone silent and your inbox closed.',
      inApp: 'Breath meditation practises exactly this coming back.',
    },
    {
      title: 'Be a productive role model',
      core: 'People follow what you do, not what you say. If you want to lead others, go first.',
      today: 'Do first yourself what you expect of others today.',
    },
    {
      title: 'Start everything important as soon as possible',
      core: 'The longer the gap between a decision and the first action, the less likely the action becomes. The first step need not be big, only soon.',
      today: 'Take the first concrete step on your newest intention today.',
      inApp: 'The if–then plan: setting the situation and the action in advance.',
    },
    {
      title: 'Take full responsibility',
      core: 'As long as others are to blame, others hold the power. Responsibility does not mean blame but the question: what can I do now?',
      today: 'Once today, replace “They …” with “What I can do is …”.',
    },
    {
      title: 'Learn to deal with fear',
      core: 'Fear does not go away by waiting but by acting. Courage means setting off with the fear.',
      today: 'Do one small thing today that you are a little afraid of.',
      inApp: 'For fear, the moment flow begins with the long out-breath.',
    },
    {
      title: 'Focus on your strengths',
      core: 'Work only on your weaknesses and you become average at best. Build on your strengths and you can become outstanding.',
      today: 'Ask three people what they think you are particularly good at.',
    },
    {
      title: 'Give and forgive',
      core: 'Generosity opens doors; resentment holds you back. Whoever forgives frees themselves above all.',
      today: 'Let go of an old grudge today, or thank someone you have overlooked.',
      inApp: 'The loving-kindness meditation.',
    },
    {
      title: 'Be smart with your money',
      core: 'Money is a tool, not a goal. Put a fixed part of your income aside for yourself first, and you build freedom.',
      today: 'Set up a standing order that puts a fixed amount aside every month as soon as your pay comes in.',
    },
    {
      title: 'Patiently build your foundation',
      core: 'What goes up quickly often comes down quickly. Lasting success needs time in which little can be seen yet.',
      today: 'Write down what you have been working on for months without it showing yet, and why it is worth it all the same.',
    },
    {
      title: 'Surround yourself with role models',
      core: 'You become like the people you spend most of your time with. Choose your company as deliberately as your goals.',
      today: 'Arrange to meet someone who inspires you this week.',
      inApp: 'Station 4 in the example “Career & money” under Thinking.',
    },
    {
      title: 'Accept dissatisfaction as a driving force',
      core: 'Dissatisfaction is a sign that more is possible. Instead of numbing it, you can steer it into change.',
      today: 'Write down what you are dissatisfied with right now, and next to it what you could change.',
      inApp: 'The example “Meaning & the future” under Thinking.',
    },
    {
      title: 'Be an eagle, not a duck',
      core: 'Ducks quack and complain; eagles rise above the clouds. You decide whether other people’s complaining pulls you down.',
      today: 'Leave a conversation today that is nothing but moaning, or steer it towards a solution.',
    },
  ]),

  notesTitle: 'In context',
  notes: [
    'Advice from experience, not a research report. The “laws” are principles, not laws of nature, and as a whole they have not been studied scientifically.',
    'Some of it fits the research well: tie an intention to a concrete when and how, and you carry it out far more often. That supports laws 6 and 21.',
    'Other parts are an attitude, not a finding. Whether a principle helps you shows in what it changes in your everyday life.',
    '“Give 110 per cent” does not go with permanent overload. Under the level of courage, this app warns against taking everything on at once. Take the law as effort for what matters, not for everything.',
  ],
  sourcesTitle: 'Sources',
  sources: [
    'Schäfer, B. (2001). Die Gesetze der Gewinner. Erfolg und ein erfülltes Leben. Frankfurt am Main: Frankfurter Allgemeine Buch; paperback by dtv, 2003.',
    'Gollwitzer, P. M. & Sheeran, P. (2006). Implementation intentions and goal achievement: a meta-analysis of effects and processes. Advances in Experimental Social Psychology, 38.',
  ],
  sourceNote: 'The German titles of the laws follow the book; the English ones are this app’s translation. What stands with each law is written in this app’s own words and gives the core idea, not the book’s text.',
}

export const winnersCopy: Record<Language, WinnersCopy> = { de, en }
