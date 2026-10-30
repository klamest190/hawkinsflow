import type { DecisionField } from '../lib/decisions.ts'
import type { Language } from '../types.ts'

/** What the form shows for one of the three texts. */
type FieldText = { label: string; hint: string; placeholder: string }

/**
 * The texts of the decision matrix, after David Bayer: a belief that keeps
 * someone small, the decision made instead, and the evidence that already
 * speaks for it. The method is his and the page says so — the help text
 * describes his idea, not findings about the brain.
 *
 * As everywhere in this app, the German object is the template.
 */
const de = {
  title: 'Entscheidungs-Matrix',
  lead: 'Nach David Bayer: Du schreibst einen Glaubenssatz auf, der dich klein hält, entscheidest dich bewusst für einen neuen und sammelst, was schon für ihn spricht.',

  howTitle: 'So funktioniert die Matrix',
  // Numbered by the list they stand in, not in the title.
  steps: [
    {
      title: 'Limitierender Glaubenssatz',
      text: 'Den einschränkenden Gedanken sichtbar machen. Was bewusst ist, steuert dich nicht mehr unbemerkt.',
    },
    {
      title: 'Neue stärkende Entscheidung',
      text: 'Bewusst entscheiden – nicht wünschen –, was du stattdessen wählst. Eine Entscheidung ist eine Festlegung.',
    },
    {
      title: 'Bestehende Beweise',
      text: 'Echte Belege sammeln, die die neue Entscheidung bereits stützen.',
    },
  ],
  whyTitle: 'Warum Bayer es so macht',
  why: 'Bayer geht davon aus, dass positives Denken allein selten trägt, weil man dem neuen Gedanken nicht glaubt. Seine Antwort ist eine Entscheidung zusammen mit Belegen aus dem eigenen Leben: Aus „ich versuche, positiv zu denken“ wird „ich habe entschieden, und das hier spricht dafür“. So beschreibt er seine Methode.',
  examplesTitle: 'Beispiele aus verschiedenen Lebensbereichen',
  examples: [
    {
      area: 'Beruf',
      belief: 'Ich bin nicht gut genug, um befördert zu werden.',
      decision: 'Ich entscheide mich, Verantwortung zu übernehmen und in meine nächste Rolle hineinzuwachsen.',
      evidence:
        'Ich habe bereits Projekte erfolgreich geleitet, Kollegen fragen mich um Rat, und ich habe schon schwierige Situationen gelöst.',
    },
    {
      area: 'Finanzen',
      belief: 'Ich werde nie genug Geld haben.',
      decision: 'Ich entscheide mich, bewusst zu wirtschaften und meinen Wohlstand aktiv aufzubauen.',
      evidence:
        'Ich habe schon Rücklagen gebildet, ich lerne ständig über Finanzen dazu, und ich habe Ausgaben reduziert, als es nötig war.',
    },
    {
      area: 'Dating',
      belief: 'Niemand will mit mir zusammen sein.',
      decision: 'Ich entscheide mich, mich selbst wertzuschätzen und offen auf Menschen zuzugehen.',
      evidence:
        'Ich habe enge Freundschaften, Menschen vertrauen sich mir an, und ich wurde schon mehrfach gemocht und geschätzt.',
    },
    {
      area: 'Gesundheit',
      belief: 'Ich schaffe es nie, dauerhaft fit zu werden.',
      decision: 'Ich entscheide mich, meinen Körper Schritt für Schritt zu stärken.',
      evidence:
        'Ich war schon wochenlang am Stück aktiv, ich fühle mich nach Bewegung besser, und ich habe Gewohnheiten bereits erfolgreich geändert.',
    },
    {
      area: 'Selbstwert',
      belief: 'Ich muss perfekt sein, sonst bin ich nichts wert.',
      decision: 'Ich entscheide mich, mich selbst anzunehmen — mit Stärken und Schwächen.',
      evidence:
        'Menschen mögen mich trotz meiner Fehler, ich bin an Rückschlägen gewachsen, und ich habe schon oft mutige Schritte gemacht.',
    },
  ],
  useTemplate: 'Als Vorlage nutzen',

  formNew: 'Neue Entscheidung',
  formEdit: 'Entscheidung bearbeiten',
  day: 'Datum',
  // The explanations stand under each label, not in a tooltip: a tooltip
  // needs a mouse, and these are what makes the field fillable.
  fields: {
    belief: {
      label: 'Limitierender Glaubenssatz',
      hint: 'Der einschränkende Gedanke, der dich blockiert oder klein hält, oft unbewusst. Zum Beispiel „Ich bin nicht gut genug“ oder „Geld kommt mir nie leicht“.',
      placeholder: 'Welcher Glaubenssatz hält dich zurück?',
    },
    decision: {
      label: 'Neue stärkende Entscheidung',
      hint: 'Was du stattdessen bewusst wählst, zu glauben oder zu tun: eine Festlegung, kein Wunsch. Zum Beispiel „Ich entscheide mich, mutig voranzugehen“.',
      placeholder: 'Wofür entscheidest du dich bewusst neu?',
    },
    evidence: {
      label: 'Bestehende Beweise',
      hint: 'Konkrete Belege aus deinem Leben, die zeigen, dass die neue Entscheidung schon jetzt stimmt.',
      placeholder: 'Welche Beweise gibt es bereits dafür?',
    },
  } satisfies Record<DecisionField, FieldText>,
  save: 'Speichern',
  cancel: 'Abbrechen',

  listTitle: (count: number): string => `Deine Einträge (${count})`,
  edit: 'Bearbeiten',
  remove: 'Löschen',
  removeForGood: 'Endgültig löschen',
  keep: 'Behalten',
  empty: 'Noch keine Einträge. Beginne mit deiner ersten bewussten Entscheidung.',

  /** For the day of each group: `30.10.2026`. */
  locale: 'de-DE',
}

/** Derived from the German template — every language carries the same keys. */
export type DecisionsCopy = typeof de

const en: DecisionsCopy = {
  title: 'Decision matrix',
  lead: 'After David Bayer: write down a belief that keeps you small, decide on a new one, and collect what already speaks for it.',

  howTitle: 'How the matrix works',
  steps: [
    {
      title: 'Limiting belief',
      text: 'Make the restricting thought visible. What you are aware of no longer steers you unnoticed.',
    },
    {
      title: 'New empowering decision',
      text: 'Consciously decide, rather than wish, what you choose instead. A decision is a commitment.',
    },
    {
      title: 'Existing evidence',
      text: 'Collect real proof that already supports the new decision.',
    },
  ],
  whyTitle: 'Why Bayer does it this way',
  why: 'Bayer’s idea is that positive thinking on its own rarely holds, because the new thought isn’t believed. His answer is a decision together with evidence from your own life: “I’m trying to think positively” becomes “I have decided, and this is what bears it out”. That is how he describes his method.',
  examplesTitle: 'Examples from different areas of life',
  examples: [
    {
      area: 'Career',
      belief: 'I’m not good enough to get promoted.',
      decision: 'I decide to take on responsibility and grow into my next role.',
      evidence:
        'I have already led projects successfully, colleagues ask me for advice, and I have handled difficult situations before.',
    },
    {
      area: 'Money',
      belief: 'I’ll never have enough money.',
      decision: 'I decide to manage my money deliberately and actively build my wealth.',
      evidence: 'I have built up savings before, I keep learning about finance, and I cut my spending when I had to.',
    },
    {
      area: 'Dating',
      belief: 'Nobody wants to be with me.',
      decision: 'I decide to value myself and to meet people openly.',
      evidence: 'I have close friendships, people confide in me, and I have been liked and appreciated many times.',
    },
    {
      area: 'Health',
      belief: 'I’ll never manage to stay fit.',
      decision: 'I decide to strengthen my body step by step.',
      evidence:
        'I have been active for weeks at a time, I feel better after exercise, and I have changed habits successfully before.',
    },
    {
      area: 'Self-worth',
      belief: 'I have to be perfect, otherwise I’m worthless.',
      decision: 'I decide to accept myself — strengths and weaknesses alike.',
      evidence:
        'People like me despite my mistakes, I have grown from setbacks, and I have taken brave steps many times.',
    },
  ],
  useTemplate: 'Use as a template',

  formNew: 'New decision',
  formEdit: 'Edit decision',
  day: 'Date',
  fields: {
    belief: {
      label: 'Limiting belief',
      hint: 'The restricting thought that blocks you or keeps you small, often without your noticing. For example “I’m not good enough” or “Money never comes easily to me”.',
      placeholder: 'Which belief is holding you back?',
    },
    decision: {
      label: 'New empowering decision',
      hint: 'What you consciously choose to believe or do instead: a commitment, not a wish. For example “I decide to move forward with courage”.',
      placeholder: 'What do you consciously decide on instead?',
    },
    evidence: {
      label: 'Existing evidence',
      hint: 'Concrete proof from your own life that the new decision already holds true.',
      placeholder: 'What evidence is there already?',
    },
  },
  save: 'Save',
  cancel: 'Cancel',

  listTitle: (count) => `Your entries (${count})`,
  edit: 'Edit',
  remove: 'Delete',
  removeForGood: 'Delete for good',
  keep: 'Keep',
  empty: 'No entries yet. Start with your first conscious decision.',

  /** British order: `30/10/2026`, not the US one. */
  locale: 'en-GB',
}

export const decisionsCopy: Record<Language, DecisionsCopy> = { de, en }
