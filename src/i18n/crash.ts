import type { Language } from '../types.ts'

/**
 * The texts of the crash screen, kept apart from `copy.ts` on purpose: this
 * screen appears when something in the app has already failed, and it must
 * still render if the failure lies in the big copy files themselves.
 *
 * As everywhere in this app, the German object is the template and
 * `CrashCopy` derives from it — a key missing in English breaks the build.
 */
const de = {
  title: 'Hier ist etwas schiefgegangen',
  lead: 'Die App ist über einen Fehler gestolpert. Deine Pläne, dein Verlauf und deine Momente liegen weiter auf diesem Gerät. Meistens reicht es, die Seite neu zu laden.',
  reload: 'Neu laden',
  // The last resort, one step removed: a crash that survives a reload can come
  // from stored data this version can't read.
  resetOffer: 'Tritt der Fehler nach dem Neuladen wieder auf?',
  resetStart: 'Gespeicherte Daten löschen',
  resetWarning:
    'Das löscht deine Pläne, deinen Verlauf, deine Momente und angefangene Antworten auf diesem Gerät. Rückgängig machen lässt sich das nicht.',
  resetConfirm: 'Ja, alles löschen',
  resetCancel: 'Doch nicht',
  // Offered next to the delete, so nothing has to be lost to get the app back.
  backupFirst: 'Vorher als Datei sichern',
  backupFailed: 'Das Sichern hat nicht geklappt.',
}

export type CrashCopy = typeof de

const en: CrashCopy = {
  title: 'Something went wrong',
  lead: 'The app tripped over an error. Your plans, your history and your moments are still on this device. Reloading the page usually does it.',
  reload: 'Reload',
  resetOffer: 'Does the error come back after reloading?',
  resetStart: 'Delete saved data',
  resetWarning:
    'This deletes your plans, your history, your moments and any unfinished answers on this device. It can’t be undone.',
  resetConfirm: 'Yes, delete everything',
  resetCancel: 'Keep it',
  backupFirst: 'Save to a file first',
  backupFailed: 'Saving did not work.',
}

export const crashCopy: Record<Language, CrashCopy> = { de, en }
