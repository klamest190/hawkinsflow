import type { GuidedId } from '../data/sessions.ts'
import type { Language } from '../types.ts'

/** One step of a guided session: what it is called, and what to do. */
export type SessionStep = { title: string; cue: string }

/* Typed wide on purpose: the count of steps is checked by a test against
   `SESSIONS` in `data/sessions.ts`, not by the type. */
function scripts(texts: Record<GuidedId, SessionStep[]>): Record<GuidedId, SessionStep[]> {
  return texts
}

/**
 * The guided sessions: one text per step, in the order of `SESSIONS`.
 *
 * Written to be read on a screen and heard from a device's voice alike:
 * short sentences, one instruction each, nothing that only works in
 * writing. They ask for noticing, never for a result — "spür" and not
 * "entspann dich": a session that asks for calm turns every restless minute
 * into a failure.
 *
 * As everywhere in this app, the German object is the template.
 */
const de = {
  leave: '← Abbrechen',
  lengthLegend: 'Dauer',
  minutes: (minutes: number): string => `${minutes} min`,
  voice: 'Anweisungen vorlesen',
  voiceHint: 'Mit der Stimme deines Geräts. Wie sie klingt, hängt vom Gerät ab.',
  voiceMissing: 'Auf diesem Gerät gibt es keine deutsche Stimme zum Vorlesen.',
  screenHint: 'Der Bildschirm bleibt während der Sitzung an. Bei jedem neuen Schritt klingt ein leiser Ton.',
  begin: 'Beginnen',
  stepOf: (current: number, total: number): string => `Schritt ${current} von ${total}`,
  next: 'Nächster Schritt',
  restart: 'Von vorn',
  left: (clock: string): string => `noch ${clock}`,
  doneTitle: 'Geschafft',
  doneBody: 'Bleib noch einen Moment sitzen, bevor du aufstehst. Was du jetzt spürst, gehört zur Übung.',
  again: 'Noch einmal',
  backToMeditation: 'Zurück zur Meditation',

  steps: scripts({
    bodyScan: [
      { title: 'Ankommen', cue: 'Leg dich hin oder setz dich bequem. Schließ die Augen, wenn du magst. Spür, wo dein Körper aufliegt.' },
      { title: 'Die Füße', cue: 'Geh mit der Aufmerksamkeit zu den Füßen. Zehen, Sohlen, Fersen. Bemerk, was da ist: Wärme, Kälte, Kribbeln, oder auch nichts.' },
      { title: 'Die Unterschenkel', cue: 'Wandere weiter zu den Unterschenkeln. Spür, wo sie aufliegen. Alles darf da sein, wie es ist.' },
      { title: 'Knie und Oberschenkel', cue: 'Weiter zu den Knien und den Oberschenkeln. Druck, Schwere, Spannung. Du musst nichts ändern.' },
      { title: 'Das Becken', cue: 'Spür das Becken und die Hüften. Wo berühren sie den Boden oder den Stuhl? Bleib einfach dort.' },
      { title: 'Der Bauch', cue: 'Geh zum Bauch. Spür, wie er sich mit dem Atem hebt und senkt, ganz von allein.' },
      { title: 'Der Rücken', cue: 'Wandere den Rücken hinauf, vom unteren Rücken bis zwischen die Schulterblätter. Wo ist es weit, wo eng? Beides ist in Ordnung.' },
      { title: 'Die Brust', cue: 'Spür die Brust. Den Atem, vielleicht den Herzschlag. Beobachte nur.' },
      { title: 'Hände und Arme', cue: 'Geh zu den Händen. Finger, Handflächen, Handgelenke. Dann die Arme hinauf bis zu den Schultern.' },
      { title: 'Schultern und Nacken', cue: 'Spür Schultern und Nacken. Hier sitzt oft viel Spannung. Du musst sie nicht lösen. Bemerk sie nur.' },
      { title: 'Das Gesicht', cue: 'Geh zum Gesicht. Kiefer, Lippen, Augen, Stirn. Spür, ob etwas festhält, und lass es da sein.' },
      { title: 'Der ganze Körper', cue: 'Nimm jetzt den ganzen Körper auf einmal wahr, von den Füßen bis zum Scheitel. Ein Körper, der atmet. Bleib so, bis der Ton kommt.' },
    ],
    breath: [
      { title: 'Ankommen', cue: 'Setz dich aufrecht hin, die Füße auf dem Boden. Lass die Hände ruhen. Schließ die Augen oder senk den Blick.' },
      { title: 'Den Atem finden', cue: 'Spür, wo du den Atem am deutlichsten merkst: an der Nase, in der Brust oder im Bauch. Such dir eine Stelle aus.' },
      { title: 'Der Anker', cue: 'Bleib mit der Aufmerksamkeit an dieser Stelle. Du musst den Atem nicht lenken. Er geht von allein.' },
      { title: 'Abschweifen', cue: 'Irgendwann bist du in Gedanken. Das ist kein Fehler, das passiert jedem. Sobald du es merkst, kehr zum Atem zurück.' },
      { title: 'Zählen', cue: 'Wenn es dir hilft, zähl die Ausatemzüge bis zehn und fang dann wieder bei eins an. Verzählt? Einfach neu beginnen.' },
      { title: 'Zurückkehren', cue: 'Jedes Zurückkehren ist die eigentliche Übung. Nicht das Stillsein. Bemerken, zurückkommen, wieder und wieder.' },
      { title: 'Weiter werden', cue: 'Lass den Atem in der Mitte bleiben und nimm den ganzen Körper dazu. Atem und Körper, beides zugleich.' },
      { title: 'Abschluss', cue: 'Lass den Atem los. Spür noch einmal, wie du sitzt. Öffne die Augen, wenn du so weit bist.' },
    ],
    lovingKindness: [
      { title: 'Ankommen', cue: 'Setz dich bequem hin. Leg eine Hand auf die Brust, wenn du magst. Spür ein paar Atemzüge lang, dass du da bist.' },
      { title: 'Du selbst', cue: 'Sag dir innerlich: Möge ich sicher sein. Möge ich gesund sein. Möge ich leicht leben. Wiederhol die Sätze in deinem Tempo. Was du dabei fühlst, ist egal.' },
      { title: 'Ein naher Mensch', cue: 'Denk an einen Menschen, der dir nahe ist. Wünsch ihm dasselbe: Mögest du sicher sein. Mögest du gesund sein. Mögest du leicht leben.' },
      { title: 'Ein fremder Mensch', cue: 'Denk an jemanden, den du nur flüchtig kennst. Die Kassiererin, einen Nachbarn. Wünsch auch ihm: Mögest du sicher sein, gesund, leicht.' },
      { title: 'Ein schwieriger Mensch', cue: 'Denk an jemanden, mit dem es schwer ist. Nicht den schwersten. Wünsch ihm dasselbe, so gut es geht. Wenn es nicht geht, kehr zu dir zurück.' },
      { title: 'Alle', cue: 'Lass den Kreis weit werden: alle Menschen, überall. Mögen alle sicher sein. Mögen alle gesund sein. Mögen alle leicht leben.' },
      { title: 'Abschluss', cue: 'Lass die Sätze ausklingen. Spür nach, was jetzt da ist. Öffne die Augen, wenn du so weit bist.' },
    ],
    mantra: [
      { title: 'Ankommen', cue: 'Setz dich bequem hin und schließ die Augen. Lass den Atem gehen, wie er will.' },
      { title: 'Das Wort', cue: 'Wähl ein einfaches, ruhiges Wort, zum Beispiel „Ruhe“ oder „Om“. Es muss nichts bedeuten. Es soll nur leicht sein.' },
      { title: 'Wiederholen', cue: 'Sag das Wort innerlich, ohne Anstrengung. Immer wieder, in deinem Tempo. Du musst es nicht mit dem Atem verbinden.' },
      { title: 'Zurückkehren', cue: 'Wenn Gedanken kommen, lass sie da sein. Sobald du merkst, dass das Wort weg ist, nimm es sanft wieder auf.' },
      { title: 'Leiser werden', cue: 'Lass das Wort leiser werden, wie ein Flüstern. Es darf fast verschwinden.' },
      { title: 'Ausklingen', cue: 'Hör auf, das Wort zu wiederholen. Sitz einfach still und bleib bei dem, was jetzt da ist.' },
      { title: 'Abschluss', cue: 'Spür, wie du sitzt. Beweg Finger und Füße. Öffne die Augen, wenn du so weit bist.' },
    ],
    openAwareness: [
      { title: 'Ankommen', cue: 'Setz dich aufrecht und bequem hin. Schließ die Augen oder lass den Blick weich werden.' },
      { title: 'Der Atem', cue: 'Bleib zuerst ein paar Atemzüge beim Atem, um anzukommen. Spür, wie er kommt und geht.' },
      { title: 'Geräusche', cue: 'Öffne die Aufmerksamkeit für Geräusche. Nahe, ferne, leise. Benenn sie nicht. Lass sie kommen und gehen.' },
      { title: 'Der Körper', cue: 'Nimm Empfindungen im Körper dazu, wo immer sie auftauchen. Ein Jucken, Wärme, Druck. Auch sie kommen und gehen.' },
      { title: 'Gedanken', cue: 'Beobachte jetzt auch Gedanken, wie Wolken am Himmel. Du musst ihnen nicht folgen. Sieh nur, wie sie auftauchen und vorbeiziehen.' },
      { title: 'Alles', cue: 'Lass alles zu: Geräusche, Empfindungen, Gedanken. Halt nichts fest, schieb nichts weg. Du bist der Raum, in dem es geschieht.' },
      { title: 'Ruhen', cue: 'Ruh einfach im Gewahrsein, ohne etwas Bestimmtes zu beachten. Wenn du dich verlierst, kehr kurz zum Atem zurück.' },
      { title: 'Abschluss', cue: 'Komm langsam zurück. Spür, wo du sitzt, und öffne die Augen, wenn du so weit bist.' },
    ],
  }),
}

/** Derived from the German template — every language carries the same keys. */
export type SessionCopy = typeof de

const en: SessionCopy = {
  leave: '← Cancel',
  lengthLegend: 'Length',
  minutes: (minutes: number): string => `${minutes} min`,
  voice: 'Read the instructions aloud',
  voiceHint: 'In your device’s voice. How it sounds depends on the device.',
  voiceMissing: 'This device has no English voice to read aloud.',
  screenHint: 'The screen stays on during the session. A soft tone sounds at each new step.',
  begin: 'Begin',
  stepOf: (current: number, total: number): string => `Step ${current} of ${total}`,
  next: 'Next step',
  restart: 'Start over',
  left: (clock: string): string => `${clock} left`,
  doneTitle: 'Done',
  doneBody: 'Stay seated for a moment before you get up. Whatever you feel now is part of the practice.',
  again: 'Once more',
  backToMeditation: 'Back to meditation',

  steps: scripts({
    bodyScan: [
      { title: 'Arriving', cue: 'Lie down or sit comfortably. Close your eyes if you like. Feel where your body rests.' },
      { title: 'The feet', cue: 'Bring your attention to your feet. Toes, soles, heels. Notice what is there: warmth, cold, tingling, or nothing at all.' },
      { title: 'The lower legs', cue: 'Move on to your lower legs. Feel where they rest. Everything may be as it is.' },
      { title: 'Knees and thighs', cue: 'On to the knees and the thighs. Pressure, heaviness, tension. You do not have to change anything.' },
      { title: 'The pelvis', cue: 'Feel the pelvis and the hips. Where do they touch the floor or the chair? Simply stay there.' },
      { title: 'The belly', cue: 'Move to the belly. Feel it rise and fall with the breath, all by itself.' },
      { title: 'The back', cue: 'Travel up the back, from the lower back to between the shoulder blades. Where is it wide, where tight? Both are fine.' },
      { title: 'The chest', cue: 'Feel the chest. The breath, perhaps the heartbeat. Just watch.' },
      { title: 'Hands and arms', cue: 'Go to the hands. Fingers, palms, wrists. Then up the arms to the shoulders.' },
      { title: 'Shoulders and neck', cue: 'Feel the shoulders and the neck. A lot of tension often sits here. You do not have to release it. Just notice it.' },
      { title: 'The face', cue: 'Move to the face. Jaw, lips, eyes, forehead. Feel whether something is holding on, and let it be there.' },
      { title: 'The whole body', cue: 'Now take in the whole body at once, from the feet to the crown. A body, breathing. Stay like this until the tone.' },
    ],
    breath: [
      { title: 'Arriving', cue: 'Sit upright, feet on the floor. Let your hands rest. Close your eyes or lower your gaze.' },
      { title: 'Finding the breath', cue: 'Feel where you notice the breath most clearly: at the nose, in the chest or in the belly. Pick one place.' },
      { title: 'The anchor', cue: 'Keep your attention at that place. You do not have to steer the breath. It breathes by itself.' },
      { title: 'Drifting off', cue: 'At some point you will be lost in thought. That is no mistake; it happens to everyone. As soon as you notice, come back to the breath.' },
      { title: 'Counting', cue: 'If it helps, count the out-breaths up to ten, then start again at one. Lost count? Simply begin again.' },
      { title: 'Coming back', cue: 'Every return is the actual practice. Not keeping still. Noticing, coming back, again and again.' },
      { title: 'Widening', cue: 'Let the breath stay in the centre and take in the whole body as well. Breath and body, both at once.' },
      { title: 'Closing', cue: 'Let go of the breath. Feel once more how you are sitting. Open your eyes when you are ready.' },
    ],
    lovingKindness: [
      { title: 'Arriving', cue: 'Sit comfortably. Put a hand on your chest if you like. For a few breaths, feel that you are here.' },
      { title: 'Yourself', cue: 'Say to yourself: May I be safe. May I be healthy. May I live with ease. Repeat the sentences at your own pace. What you feel while doing it does not matter.' },
      { title: 'Someone close', cue: 'Think of someone close to you. Wish them the same: May you be safe. May you be healthy. May you live with ease.' },
      { title: 'Someone you barely know', cue: 'Think of someone you only know in passing. The cashier, a neighbour. Wish them too: may you be safe, healthy, at ease.' },
      { title: 'Someone difficult', cue: 'Think of someone you find difficult. Not the most difficult. Wish them the same, as well as you can. If it does not work, come back to yourself.' },
      { title: 'Everyone', cue: 'Let the circle grow wide: all people, everywhere. May all be safe. May all be healthy. May all live with ease.' },
      { title: 'Closing', cue: 'Let the sentences fade. Feel what is there now. Open your eyes when you are ready.' },
    ],
    mantra: [
      { title: 'Arriving', cue: 'Sit comfortably and close your eyes. Let the breath go as it likes.' },
      { title: 'The word', cue: 'Choose a simple, quiet word, such as “calm” or “om”. It does not have to mean anything. It only has to be light.' },
      { title: 'Repeating', cue: 'Say the word silently, without effort. Again and again, at your own pace. You do not have to tie it to the breath.' },
      { title: 'Coming back', cue: 'When thoughts come, let them be. As soon as you notice the word has gone, gently pick it up again.' },
      { title: 'Growing quieter', cue: 'Let the word grow quieter, like a whisper. It may almost disappear.' },
      { title: 'Fading out', cue: 'Stop repeating the word. Simply sit still and stay with whatever is there now.' },
      { title: 'Closing', cue: 'Feel how you are sitting. Move your fingers and feet. Open your eyes when you are ready.' },
    ],
    openAwareness: [
      { title: 'Arriving', cue: 'Sit upright and comfortably. Close your eyes or let your gaze go soft.' },
      { title: 'The breath', cue: 'Stay with the breath for a few breaths first, to arrive. Feel it come and go.' },
      { title: 'Sounds', cue: 'Open your attention to sounds. Near, far, quiet. Do not name them. Let them come and go.' },
      { title: 'The body', cue: 'Add sensations in the body, wherever they appear. An itch, warmth, pressure. They come and go as well.' },
      { title: 'Thoughts', cue: 'Now watch thoughts too, like clouds in the sky. You do not have to follow them. Just see them appear and pass.' },
      { title: 'Everything', cue: 'Let everything in: sounds, sensations, thoughts. Hold on to nothing, push nothing away. You are the space in which it happens.' },
      { title: 'Resting', cue: 'Simply rest in awareness, without attending to anything in particular. If you get lost, come back to the breath for a moment.' },
      { title: 'Closing', cue: 'Slowly come back. Feel where you are sitting, and open your eyes when you are ready.' },
    ],
  }),
}

export const sessionCopy: Record<Language, SessionCopy> = { de, en }
