# Decision matrix: move from Workdays to Hawkins Flow

Date: 2026-10-30
Repos: `hawkinsflow` (new feature), `workdays` (removal)

## Goal

The decision matrix (after David Bayer: limiting belief → new empowering
decision → existing evidence) leaves Workdays, a work-time app, and becomes a
place in Hawkins Flow, next to Ebb Flow. It is rebuilt in Hawkins Flow's own
conventions (type scale, surfaces, bilingual copy, local storage with guards),
not ported 1:1.

## Decisions taken

| Question | Decision |
|---|---|
| Existing entries in Workdays (Firestore) | Discarded. No export, no import. Hawkins Flow starts empty. |
| Phone placement | Ebb Flow and the matrix share the fourth tab, renamed "Üben" / "Practice", with a pill row at the top. |
| Daily mood (1–10 stars) | Dropped. Hawkins Flow's daily check-in already answers "how am I today". |
| Help text "why it works" | Kept as Bayer's method, attributed to him, with no claims about the brain or nervous system. |
| Navigation shape | A place of its own (`'decisions'`), not a sub-section of the Ebb Flow page. |

## Out of scope

- Cloud sync or accounts in Hawkins Flow.
- Linking an entry to a level of the scale or to the daily check-in.
- Deleting the orphaned Firestore documents in Workdays' `decisions`
  collection. Once the rules block is gone nobody can read them; removing them
  is a manual step in the Firebase console, left to the owner.

## Order of work

1. Build the matrix in Hawkins Flow, commit and push.
2. Then remove it from Workdays, commit and push.

There is never a moment without the feature.

---

## Part A — Hawkins Flow

### A1. Data model and storage

New type in `src/types.ts`:

```ts
export type Decision = {
  /** Random id; also the React key and the handle for edit and delete. */
  id: string
  /** Local calendar day the entry is about, `yyyy-MM-dd`. Chosen in the form, defaults to today. */
  day: string
  belief: string
  decision: string
  evidence: string
  /** ISO time it was created. */
  at: string
  /** ISO time of the last edit; absent until the first edit. */
  revised?: string
}
export type Decisions = Decision[]
```

New module `src/lib/decisions.ts`:

- `KEEP = 200`: entries beyond this drop out, oldest `at` first, as in the
  other stores.
- `LONGEST = 4000` characters per field; the form's `maxLength` and the guard
  both use it.
- `isDecisions(value): value is Decisions`: array; every entry has string
  `id`, `day` matching `/^\d{4}-\d{2}-\d{2}$/`, string `belief`, `decision`,
  `evidence` each at most `LONGEST` long, at least one of the three non-empty
  after trimming, `at` parseable as a date, and `revised` either absent or a
  parseable date string.
- `appendDecision(list, entry)`: adds at the end, cuts to `KEEP`.
- `reviseDecision(list, id, fields, when)`: replaces `day`, `belief`,
  `decision`, `evidence` of the entry with that id and sets `revised`; an
  unknown id returns the list unchanged.
- `removeDecision(list, id)`.
- `byDay(list)`: groups for display — days newest first, entries within a day
  newest `at` first.

New key in `KEYS` (`src/lib/storage.ts`): `decisions: \`${KEY_PREFIX}decisions.v1\``.

New hook `src/hooks/useDecisions.ts`, modelled on `useNotes`: `decisions`,
`addDecision`, `editDecision`, `removeDecision`, `clearDecisions`,
`replaceDecisions`. An empty list removes the key.

Text is trimmed on save. An entry whose three fields are all empty after
trimming can't be saved (the save button is disabled).

### A2. Backup and data card

- `BackupData` gets `decisions: Decisions`. In a backup file the field is
  optional: absent reads as `[]`, present must pass `isDecisions`.
  `BACKUP_VERSION` stays `1` (additive change, see CLAUDE.md › Storage).
  Restore cuts to `KEEP` as the other stores do.
- `hasData` counts decisions.
- `App.restore` calls `replaceDecisions`.
- `DataCard` shows the number of stored decisions with a "delete all" button,
  exactly as it does for notes, and the restore summary lists their count.
- CLAUDE.md › Storage: the guard list gains `isDecisions`; "Free text is stored
  in two places only" becomes three: plans, kept writing, and the decision
  matrix.

### A3. Navigation

`src/lib/places.ts`:

- `Place` gains `'decisions'`.
- `Tab`: `'breathe'` is replaced by `'practice'`.
- New `PRACTICE: readonly Place[] = ['breathe', 'decisions']` beside
  `KNOWLEDGE`.
- `tabOf`: `breathe` and `decisions` → `'practice'`.

`src/App.tsx`:

- `Phase` and `PHASES` gain `'decisions'`; `placeOf('decisions')` is
  `'decisions'`; `select('decisions')` goes there.
- A `lastPractice` ref (default `'breathe'`) beside `lastKnowledge`;
  `selectTab('practice')` opens it.
- The pill row is shown for both groups: under the knowledge places with
  `KNOWLEDGE`, under the practice places with `PRACTICE`.
- The view renders `<Decisions …/>` for phase `'decisions'`.

`src/components/Navigation.tsx`:

- `BAR` becomes `['today', 'quiz', 'moment', 'practice', 'knowledge']`.
- `KnowledgeNav` becomes `GroupNav({ places, label, active, onSelect })`; its
  `aria-label` is the group's label.
- `SIDE` becomes `['today', 'quiz', 'breathe', 'decisions']`: the matrix sits
  directly under Ebb Flow, without a group heading.
- `labelOf`: `practice` → `t.navPractice`, `decisions` → `t.navDecisions`.
- `Glyph`: `practice` uses the Ebb Flow waves; `decisions` gets a new path, a
  path that forks in two.

Copy (`src/i18n/copy.ts`): `navPractice` ("Üben" / "Practice"),
`navDecisions` ("Matrix" / "Matrix").

CLAUDE.md › Accessibility: the paragraph on places is updated — nine places,
two groups that share a tab on the phone (`KNOWLEDGE`, `PRACTICE`), still five
tabs.

### A4. The view — `src/components/Decisions.tsx`

Copy lives in `src/i18n/decisions.ts` (`decisionsCopy`, German as the
template, English in British spelling, each language's own quotation marks).
No emoji. Sizes only from the type scale.

Top to bottom:

1. **Heading.** One `<h1>` "Entscheidungs-Matrix" / "Decision matrix", and a
   lead sentence naming the method as David Bayer's.
2. **How it works**, folded behind a `Disclosure`: the three steps; a
   paragraph on why Bayer built it this way, written as his idea ("Bayer
   geht davon aus, dass …" / "Bayer's idea is that …"), with no statements
   about the brain, the nervous system or lasting change as fact; then the
   five examples (career, money, dating, health, self-worth), each with a
   "use as a template" button that fills the form and moves focus to its
   first field.
3. **The form**, the view's one `surface-feature`. A date field (default:
   today, local day), then three labelled textareas — belief, decision,
   evidence — each with its explanation as visible help text under the label
   (`aria-describedby`), not as a hover tooltip. Buttons: "Speichern" / "Save";
   while editing also "Abbrechen" / "Cancel". Editing an entry loads it into
   this form and moves focus to it; saving or cancelling clears the form.
4. **The list**, when there are entries: a small heading with the count, then
   one group per day (date as a label, newest day first), each entry showing
   the three labelled fields as reading text (empty field: a dash), with
   "Bearbeiten" / "Edit" and "Löschen" / "Delete". Delete asks inline: the
   button is replaced by "Endgültig löschen" / "Delete for good" and
   "Behalten" / "Keep"; no modal. After a delete, focus goes to the list
   heading, or to the form when the list is now empty.
5. **Empty state**, when there are none: one line of text under the form.

Dates are shown with the language's format (German `30.10.2026`, English
`30/10/2026`).

### A5. Tests (Hawkins Flow)

Vitest:

- `src/lib/decisions.test.ts`: guard accepts a valid list and rejects each
  malformed field (bad day, over-long field, all three empty, bad `at`, bad
  `revised`); append cuts to `KEEP`; revise changes only the given id and sets
  `revised`; remove; `byDay` order.
- `src/lib/backup.test.ts`: a file without `decisions` restores as empty; with
  valid ones restores them; with invalid ones is rejected; version stays 1.
- `src/render.test.tsx`: the decisions view, empty and with entries, in both
  languages; exactly one `<h1>`.
- `src/navigation.test.tsx`: still five tabs; "Üben"/"Practice" is marked for
  both `breathe` and `decisions`; the sidebar lists the matrix right after Ebb
  Flow; the pill row of the practice group shows both places.
- `typescale.test.ts` and the i18n type check cover the new files without
  changes.

Playwright (`e2e/flows.spec.ts`):

- From the "Üben" tab, the pill row switches between Ebb Flow and the matrix.
- Create an entry, reload, it is still there; edit it; delete it with the
  inline confirmation.
- "Use as a template" fills the three fields.

---

## Part B — Workdays

Remove:

- `src/components/views/DecisionMatrixView.tsx`.
- `src/i18n/sections/matrix.ts` and its import and entries in
  `src/i18n/index.ts`.
- `"decisions"` from `ViewType` and the `DecisionMatrixEntry` type in
  `src/types.ts`.
- The lazy import and the render branch in `src/App.tsx`.
- The `decisions` entries in `ACCOUNT_MENU_DESTINATIONS` and
  `MORE_DESTINATIONS` (`src/components/layout/navSlots.ts`); if
  `ACCOUNT_MENU_DESTINATIONS` is then empty, remove it and its rendering in the
  account menu; drop the `decisions` labels in
  `src/i18n/sections/layout.ts`; drop the `Sparkles` import if unused.
- `subscribeDecisions`, `saveDecision`, `deleteDecision` and the collection
  ref in `src/services/firestoreService.ts`.
- The `match /decisions/{decisionId}` block in `firestore.rules`.
- The decision checks and seed in `scripts/verify-rules.mjs`.
- The seeded decisions and the Matrix step in `e2e/layout.spec.ts`.
- Mentions of the Matrix in comments (`src/lib/retryImport.ts`,
  `src/components/ui/page.ts`, `src/components/ui/PageHeader.tsx`,
  `navSlots.ts`) and in `CLAUDE.md` (views list, navigation sections, layout
  test list, the `saveStamp` note). `README.md` has none.

`repomix-output.xml` is a generated snapshot and is left as it is.

Verify: build, lint, Vitest, Playwright and `verify-rules` pass; a search for
`decision|matrix` (case-insensitive) in `src/`, `e2e/`, `scripts/` and
`firestore.rules` finds nothing that belongs to the feature.

Deploying the changed `firestore.rules` is part of the normal Workdays deploy;
until then the old rules stay live, which is harmless.
