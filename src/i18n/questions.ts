import { QUESTIONS } from '../data/questions.ts'
import type { Language, QuestionId } from '../types.ts'

/**
 * Die Texte der 34 Aussagen. Wie bei den Ebenen ist das deutsche Objekt die
 * Vorlage — fehlt im Englischen eine Frage, meldet das der Compiler.
 *
 * Die Formulierungen beschreiben Verhalten und Erleben der letzten Wochen, nicht
 * Werte oder Absichten: „Ich weiche Konflikten aus" lässt sich ehrlicher
 * beantworten als „Ich bin ängstlich". Welche Frage zu welcher Ebene gehört,
 * steht in `data/questions.ts`.
 */
const de = {
  q01: 'Ich spiele im Kopf durch, was alles schiefgehen könnte, bevor ich etwas angehe.',
  q02: 'Ich wünsche Menschen Gutes, auch wenn ich selbst nichts davon habe.',
  q03: 'Kritik trifft mich härter, als ich mir eingestehe — selbst wenn sie sachlich stimmt.',
  q04: 'Vieles ist mir gerade schlicht egal; anfangen kostet mehr Kraft, als ich habe.',
  q05: 'Ich trenne im Gespräch sauber zwischen Fakten, Meinungen und Gefühlen.',
  q06: 'Ich entschuldige mich für Dinge, für die ich nicht wirklich verantwortlich bin.',
  q07: 'Ich melde mich freiwillig für Aufgaben, bevor jemand fragen muss.',
  q08: 'Ich führe im Kopf Streitgespräche, die so nie stattgefunden haben.',
  q09: 'Ich denke oft an eine Zeit zurück, die besser war als jetzt.',
  q10: 'Wenn ein Plan platzt, finde ich mich damit ab, ohne dass es mich lange beschäftigt.',
  q11: 'Es gibt etwas an mir, von dem niemand wissen darf.',
  q12: 'Sobald ich ein Ziel erreicht habe, steht schon das nächste im Raum.',
  q13: 'Ich spreche unangenehme Dinge an, auch wenn mir dabei mulmig ist.',
  q14: 'Es gibt Momente, in denen die Trennung zwischen mir und der Welt kaum spürbar ist.',
  q15: 'Ich frage mich zuerst, was ich beitragen kann — nicht, wer schuld ist.',
  q16: 'Ganz gewöhnliche Augenblicke berühren mich: Licht, eine Stimme, ein Weg, den ich täglich gehe.',
  q17: 'Ich sage Ja, um Konflikte zu vermeiden, nicht weil ich will.',
  q18: 'Es gibt Zeiten, in denen einfach gehandelt wird, ohne dass ein „Ich" dabei beteiligt scheint.',
  q19: 'Wenn mich jemand lobt, ist mir das eher unangenehm.',
  q20: 'Kleinigkeiten bringen mich schneller auf die Palme, als mir lieb ist.',
  q21: 'Ich ändere meine Meinung, wenn die Faktenlage es verlangt.',
  q22: 'Ratschläge von anderen erreichen mich nicht wirklich — ich höre zu und es passiert nichts.',
  q23: 'Wird es still, greife ich fast automatisch zu Ablenkung: Handy, Essen, Kaufen, Serien.',
  q24: 'Meine Anwesenheit tut anderen gut, auch wenn ich nichts Besonderes sage.',
  q25: 'Alte Fehler kommen ungefragt hoch und werden innerlich neu verhandelt.',
  q26: 'Rückschläge nehme ich als Information, nicht als Urteil über mich.',
  q27: 'Um Hilfe zu bitten fällt mir schwerer, als die Sache allein doppelt so lange zu machen.',
  q28: 'Etwas Neues anzufangen fühlt sich an, als würde ich etwas Altes verraten.',
  q29: 'Ein Nein von außen wirft mich nicht um.',
  q30: 'Ich übernehme Verantwortung, ohne zuerst nach Schuldigen zu suchen.',
  q31: 'Ich kann jemandem vergeben, ohne die Sache zu verharmlosen.',
  q32: 'Meine gute Stimmung hängt kaum davon ab, was gerade passiert.',
  q33: 'Stille fühlt sich für mich voll an, nicht leer.',
  q34: 'Verbundenheit erscheint mir wirklicher als Getrenntheit.',
}

type QuestionCopy = typeof de

const en: QuestionCopy = {
  q01: 'I run through everything that could go wrong before I start something.',
  q02: 'I wish people well even when there is nothing in it for me.',
  q03: 'Criticism hits me harder than I admit — even when it is factually right.',
  q04: 'A lot of things simply do not matter to me right now; starting costs more than I have.',
  q05: 'In a conversation I keep facts, opinions and feelings cleanly apart.',
  q06: 'I apologise for things I am not really responsible for.',
  q07: 'I volunteer for tasks before anyone has to ask.',
  q08: 'I hold arguments in my head that never took place that way.',
  q09: 'I often think back to a time that was better than now.',
  q10: 'When a plan falls through, I come to terms with it without dwelling on it.',
  q11: 'There is something about me that nobody may know.',
  q12: 'The moment I reach a goal, the next one is already there.',
  q13: 'I raise uncomfortable things even when it makes me uneasy.',
  q14: 'There are moments when the separation between me and the world is barely there.',
  q15: 'I ask first what I can contribute — not who is to blame.',
  q16: 'Entirely ordinary moments move me: light, a voice, a route I walk every day.',
  q17: 'I say yes to avoid conflict, not because I want to.',
  q18: 'There are times when action simply happens, with no "I" seeming to take part.',
  q19: 'When someone praises me, I find it rather uncomfortable.',
  q20: 'Small things get under my skin faster than I would like.',
  q21: 'I change my mind when the evidence calls for it.',
  q22: 'Advice from others does not really land — I listen and nothing happens.',
  q23: 'When things go quiet I reach for a distraction almost automatically: phone, food, shopping, another episode.',
  q24: 'My presence does other people good, even when I say nothing special.',
  q25: 'Old mistakes surface unasked and get tried all over again inside me.',
  q26: 'I take setbacks as information, not as a verdict on me.',
  q27: 'Asking for help is harder for me than doing the thing alone in twice the time.',
  q28: 'Starting something new feels as though I were betraying something old.',
  q29: 'A no from someone else does not knock me over.',
  q30: 'I take responsibility without first looking for someone to blame.',
  q31: 'I can forgive someone without making light of what happened.',
  q32: 'My good mood barely depends on what is happening around me.',
  q33: 'Silence feels full to me, not empty.',
  q34: 'Connectedness seems more real to me than separateness.',
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
