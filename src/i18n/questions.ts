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
 */
const de = {
  q01: 'Ich spiele im Kopf durch, was alles schiefgehen könnte, bevor ich etwas angehe.',
  q02: 'Ich freue mich ehrlich mit, wenn jemand anderes Erfolg hat.',
  q03: 'Nach einer Kritik beschäftigt mich noch Stunden später, was ich hätte entgegnen können.',
  q04: 'Ich lasse Dinge liegen, weil schon der erste Schritt zu groß wirkt.',
  q05: 'In einer Diskussion sage ich dazu, was ich weiß und was ich nur vermute.',
  q06: 'Ich entschuldige mich für Dinge, für die ich nicht wirklich verantwortlich bin.',
  q07: 'Ich melde mich freiwillig für Aufgaben, bevor jemand fragen muss.',
  q08: 'Ich führe im Kopf Streitgespräche mit jemandem, der gar nicht dabei ist.',
  q09: 'Ich denke oft an eine Zeit zurück, die besser war als jetzt.',
  q10: 'Wenn etwas anders läuft als geplant, richte ich mich ohne langes Hadern neu ein.',
  q11: 'Ich lenke Gespräche von einem bestimmten Teil meines Lebens weg.',
  q12: 'Sobald ich ein Ziel erreicht habe, steht schon das nächste im Raum.',
  q13: 'Ich spreche unangenehme Dinge an, auch wenn mir dabei mulmig ist.',
  q14: 'Für einen Moment fühle ich mich mit allem um mich herum verbunden.',
  q15: 'Ich lasse Menschen ihre Art, auch wenn sie mir fremd ist.',
  q16: 'Ganz gewöhnliche Augenblicke berühren mich: Licht, eine Stimme, ein Weg, den ich täglich gehe.',
  q17: 'Ich sage Ja, um Konflikte zu vermeiden, nicht weil ich will.',
  q18: 'Hinterher merke ich, dass ich etwas getan habe, ohne es entschieden zu haben.',
  q19: 'Lob anzunehmen ist mir unangenehm.',
  q20: 'Kleinigkeiten reichen, damit ich gereizt reagiere.',
  q21: 'Ich nehme eine Meinung zurück, wenn ich auf ein Argument keine Antwort habe.',
  q22: 'Ratschläge lasse ich nicht an mich heran, auch wenn sie gut gemeint sind.',
  q23: 'Wird es still, greife ich fast automatisch zu Ablenkung: Handy, Essen, Kaufen, Serien.',
  q24: 'Menschen erzählen mir Dinge, die sie sonst niemandem erzählen.',
  q25: 'Alte Fehler fallen mir ungefragt wieder ein, und ich gehe sie innerlich noch einmal durch.',
  q26: 'Nach einem Fehlschlag frage ich mich als Erstes, was ich daraus mitnehme.',
  q27: 'Um Hilfe zu bitten fällt mir schwerer, als die Sache allein doppelt so lange zu machen.',
  q28: 'Etwas Neues anzufangen fühlt sich an, als würde ich etwas Altes verraten.',
  q29: 'Ein Nein nehme ich hin und suche mir einen anderen Weg.',
  q30: 'Ich sage von mir aus, dass ein Fehler bei mir lag.',
  q31: 'Jemandem, der mir geschadet hat, begegne ich wieder offen.',
  q32: 'Meine Stimmung bleibt gut, auch wenn an dem Tag nichts Schönes passiert.',
  q33: 'Ich sitze in der Stille, ohne dass mir etwas fehlt.',
  q34: 'Für eine Weile sehe ich mir zu, statt mich als jemanden zu erleben, dem etwas zustößt.',
}

type QuestionCopy = typeof de

const en: QuestionCopy = {
  q01: 'I run through everything that could go wrong before I start something.',
  q02: 'I am genuinely glad when someone else does well.',
  q03: 'Hours after a criticism I am still working out what I should have said back.',
  q04: 'I leave things undone because even the first step looks too big.',
  q05: 'In a discussion I say which part I know and which part I am only guessing.',
  q06: 'I apologise for things I am not really responsible for.',
  q07: 'I volunteer for tasks before anyone has to ask.',
  q08: 'I hold arguments in my head with someone who is not in the room.',
  q09: 'I often think back to a time that was better than now.',
  q10: 'When things go differently than planned, I rearrange without a long struggle.',
  q11: 'I steer conversations away from one particular part of myself.',
  q12: 'The moment I reach a goal, the next one is already there.',
  q13: 'I raise uncomfortable things even when it makes me uneasy.',
  q14: 'For a moment I feel connected to everything around me.',
  q15: 'I let people be as they are, even when their way is alien to me.',
  q16: 'Entirely ordinary moments move me: light, a voice, a route I walk every day.',
  q17: 'I say yes to avoid conflict, not because I want to.',
  q18: 'Afterwards I notice that I did something without having decided to.',
  q19: 'Taking a compliment makes me uncomfortable.',
  q20: 'Small things are enough to make me snap.',
  q21: 'I drop an opinion when I have no answer to an argument.',
  q22: 'I do not let advice in, even when it is well meant.',
  q23: 'When things go quiet I reach for a distraction almost automatically: phone, food, shopping, another episode.',
  q24: 'People tell me things they tell nobody else.',
  q25: 'Old mistakes come back to me unasked, and I go through them again inside.',
  q26: 'After something fails, my first question is what I take from it.',
  q27: 'Asking for help is harder for me than doing the thing alone in twice the time.',
  q28: 'Starting something new feels as though I were betraying something old.',
  q29: 'I take a no and look for another route.',
  q30: 'I say unprompted that a mistake was mine.',
  q31: 'I meet someone who has wronged me openly again.',
  q32: 'My mood stays good even when nothing nice happens that day.',
  q33: 'I sit in silence without anything being missing.',
  q34: 'For a while I watch myself instead of feeling like someone things are happening to.',
}

const QUESTION_TEXT: Record<Language, QuestionCopy> = { de, en }

/* Die Vorlage deckt genau die Fragen aus `data/questions.ts` ab — hier einmal
   nachgerechnet, weil der Compiler das nicht kann: die IDs stehen dort in einem
   Array, hier in einem Objekt, und ein Tippfehler in einer der beiden Listen
   fiele sonst erst auf, wenn im Bogen eine leere Frage steht. */
if (QUESTIONS.some((question) => !(question.id in de))) {
  throw new Error('Zu mindestens einer Frage aus data/questions.ts fehlt der Text.')
}

/** Der Text einer Frage in der gelesenen Sprache. */
export function questionText(language: Language, id: QuestionId): string {
  return QUESTION_TEXT[language][id as keyof QuestionCopy]
}
