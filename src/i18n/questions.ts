import { QUESTIONS } from '../data/questions.ts'
import type { Language, QuestionId } from '../types.ts'

/**
 * Die Texte der 34 Aussagen. Wie bei den Ebenen ist das deutsche Objekt die
 * Vorlage — fehlt im Englischen eine Frage, meldet das der Compiler.
 *
 * Die Formulierungen beschreiben Verhalten und Erleben der letzten Wochen, nicht
 * Werte oder Absichten: „Ich weiche Konflikten aus“ lässt sich ehrlicher
 * beantworten als „Ich bin ängstlich“. Welche Frage zu welcher Ebene gehört,
 * steht in `data/questions.ts`.
 *
 * Vier Bauregeln, an denen jede Aussage gemessen wird — sie folgen alle daraus,
 * dass geantwortet wird, *wie oft* etwas zutrifft (nie … fast immer):
 *
 * 1. Häufigkeitsförmig. Kein „Es gibt Momente, in denen …“ (wie oft gibt es
 *    Momente?) und kein „Ich kann …“ — eine Fähigkeit hat keine Häufigkeit.
 * 2. Ein Anspruch pro Satz. Wer zwei Dinge behauptet, bekommt trotzdem nur ein
 *    Kreuz, und niemand weiß hinterher, welchem der beiden es galt.
 * 3. Keine Verneinung. Bei „wirft mich nicht um“ heißt „nie“ das Gegenteil von
 *    nie; positiv formuliert stellt sich die Frage gar nicht.
 * 4. Selbst beobachtbar. Weder was andere in meiner Nähe fühlen noch das, was
 *    ich mir „nicht eingestehe“, kann ich ankreuzen.
 *
 * A fifth rule came with the second edition (see `QUESTION_EDITION`):
 *
 * 5. Applies in any three weeks. A statement that needs an occasion (someone
 *    who did me harm, a discussion, a team that hands out tasks) gets "never"
 *    when the occasion didn't come up, and the scoring reads that "never" as
 *    the level being absent.
 *
 * Rule 1 and a part of rule 3 are checked mechanically in
 * `questions.test.ts`; the rest needs a reader.
 */
const de = {
  q01: 'Ich spiele im Kopf durch, was alles schiefgehen könnte, bevor ich etwas angehe.',
  q02: 'Ich freue mich ehrlich mit, wenn jemand anderes Erfolg hat.',
  q03: 'Ich achte darauf, wie ich vor anderen dastehe.',
  q04: 'Ich lasse Dinge liegen, weil schon der erste Schritt zu groß wirkt.',
  q05: 'In einer Diskussion sage ich dazu, was ich weiß und was ich nur vermute.',
  q06: 'Ich entschuldige mich für Dinge, für die ich nicht wirklich verantwortlich bin.',
  q07: 'Ich bringe mich ein, auch wenn die Sache nicht meine Idee war.',
  q08: 'Ich führe im Kopf Streitgespräche mit jemandem, der gar nicht dabei ist.',
  q09: 'Ich denke an eine Zeit zurück, die besser war als jetzt.',
  q10: 'Wenn etwas anders läuft als geplant, richte ich mich ohne langes Hadern neu ein.',
  q11: 'Ich lenke Gespräche von einem bestimmten Teil meines Lebens weg.',
  q12: 'Sobald ich ein Ziel erreicht habe, steht schon das nächste im Raum.',
  q13: 'Ich spreche unangenehme Dinge an, auch wenn mir dabei mulmig ist.',
  q14: 'Für einen Moment fühle ich mich mit allem um mich herum verbunden.',
  q15: 'Ich lasse Menschen ihre Art, auch wenn sie mir fremd ist.',
  q16: 'Ganz gewöhnliche Augenblicke berühren mich: Licht, eine Stimme, ein Weg, den ich täglich gehe.',
  q17: 'Ich sage Ja, um Konflikte zu vermeiden, nicht weil ich will.',
  q18: 'Ich nehme wahr, was in mir vorgeht, ohne mich darin zu verlieren.',
  q19: 'Lob anzunehmen ist mir unangenehm.',
  q20: 'Kleinigkeiten reichen, damit ich gereizt reagiere.',
  q21: 'Bevor ich mir ein Urteil bilde, suche ich nach dem, was dagegen spricht.',
  q22: 'Jede Anstrengung kommt mir von vornherein vergeblich vor.',
  q23: 'Wird es still, greife ich fast automatisch zu Ablenkung: Handy, Essen, Kaufen, Serien.',
  q24: 'Ich zeige Menschen, die mir wichtig sind, dass sie mir wichtig sind.',
  q25: 'Alte Fehler fallen mir ungefragt wieder ein, und ich gehe sie innerlich noch einmal durch.',
  q26: 'Nach einem Fehlschlag frage ich mich als Erstes, was ich daraus mitnehme.',
  q27: 'Um Hilfe zu bitten fällt mir schwerer, als die Sache allein doppelt so lange zu machen.',
  q28: 'Etwas Neues anzufangen fühlt sich an, als würde ich etwas Altes verraten.',
  q29: 'Ein Nein nehme ich hin und suche mir einen anderen Weg.',
  q30: 'Ich sage von mir aus, dass ein Fehler bei mir lag.',
  q31: 'Was außerhalb meiner Macht liegt, lasse ich so stehen.',
  q32: 'Meine Stimmung bleibt gut, auch wenn an dem Tag nichts Schönes passiert.',
  q33: 'Ich sitze in der Stille, ohne dass mir etwas fehlt.',
  q34: 'Für eine Weile sehe ich mir zu, statt mich als jemanden zu erleben, dem etwas zustößt.',
}

type QuestionCopy = typeof de

const en: QuestionCopy = {
  q01: 'I run through everything that could go wrong before I start something.',
  q02: 'I am genuinely glad when someone else does well.',
  q03: 'I keep an eye on how I come across to others.',
  q04: 'I leave things undone because even the first step looks too big.',
  q05: 'In a discussion I say which part I know and which part I am only guessing.',
  q06: 'I apologise for things I am not really responsible for.',
  q07: 'I pitch in even when the thing was not my idea.',
  q08: 'I hold arguments in my head with someone who is not in the room.',
  q09: 'I think back to a time that was better than now.',
  q10: 'When things go differently than planned, I rearrange without a long struggle.',
  q11: 'I steer conversations away from one particular part of myself.',
  q12: 'The moment I reach a goal, the next one is already there.',
  q13: 'I raise uncomfortable things even when it makes me uneasy.',
  q14: 'For a moment I feel connected to everything around me.',
  q15: 'I let people be as they are, even when their way is alien to me.',
  q16: 'Entirely ordinary moments move me: light, a voice, a route I walk every day.',
  q17: 'I say yes to avoid conflict, not because I want to.',
  q18: 'I notice what is going on inside me without getting lost in it.',
  q19: 'Taking a compliment makes me uncomfortable.',
  q20: 'Small things are enough to make me snap.',
  q21: 'Before I make up my mind, I look for what speaks against it.',
  q22: 'Any effort seems pointless to me from the outset.',
  q23: 'When things go quiet I reach for a distraction almost automatically: phone, food, shopping, another episode.',
  q24: 'I show the people who matter to me that they matter.',
  q25: 'Old mistakes come back to me unasked, and I go through them again inside.',
  q26: 'After something fails, my first question is what I take from it.',
  q27: 'Asking for help is harder for me than doing the thing alone in twice the time.',
  q28: 'Starting something new feels as though I were betraying something old.',
  q29: 'I take a no and look for another route.',
  q30: 'I say unprompted that a mistake was mine.',
  q31: 'I let things that are outside my control be.',
  q32: 'My mood stays good even when nothing nice happens that day.',
  q33: 'I sit in silence without anything being missing.',
  q34: 'For a while I watch myself instead of feeling like someone things are happening to.',
}


/* Die Vorlage deckt genau die Fragen aus `data/questions.ts` ab — hier einmal
   nachgerechnet, weil der Compiler das nicht kann: die IDs stehen dort in einem
   Array, hier in einem Objekt, und ein Tippfehler in einer der beiden Listen
   fiele sonst erst auf, wenn im Bogen eine leere Frage steht. */
if (QUESTIONS.some((question) => !(question.id in de))) {
  throw new Error('Zu mindestens einer Frage aus data/questions.ts fehlt der Text.')
}

/* A Map rather than the objects themselves: looked up by a plain string, an
   object gives back `undefined` typed as `string`. */
const TEXT_BY_ID: Record<Language, Map<string, string>> = {
  de: new Map(Object.entries(de)),
  en: new Map(Object.entries(en)),
}

/** Der Text einer Frage in der gelesenen Sprache. */
export function questionText(language: Language, id: QuestionId): string {
  // `QuestionId` is any string; a question without text is broken data, and
  // saying so beats an empty heading in the questionnaire.
  const text = TEXT_BY_ID[language].get(id)
  if (text === undefined) throw new Error(`No ${language} text for question ${id}`)
  return text
}
