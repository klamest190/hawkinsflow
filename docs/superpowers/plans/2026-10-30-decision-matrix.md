# Decision Matrix Move — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The decision matrix leaves Workdays and becomes a place in Hawkins Flow, beside Ebb Flow.

**Architecture:** Hawkins Flow gets a local store (`lib/decisions.ts` + `useDecisions`, guarded, in the backup), a view `Decisions.tsx` with its own copy file, and a ninth place `'decisions'` that shares the phone's fourth tab "Üben" with Ebb Flow through a generalised pill row (`GroupNav`). Then Workdays drops the view, its Firestore functions, rules, navigation entries and tests.

**Tech Stack:** Hawkins Flow: React 19, TypeScript, Tailwind 4, Vitest (Node, `renderToString`), Playwright, oxlint. Workdays: React, TypeScript, Firebase/Firestore, Vitest, Playwright, ESLint.

**Spec:** `docs/superpowers/specs/2026-10-30-decision-matrix-design.md` (this repo). Read it first.

## Global Constraints

- Read `hawkinsflow/CLAUDE.md` before Task 1 and `workdays/CLAUDE.md` before Task 6; their rules apply to every task.
- Code, identifiers, comments, commit messages: English. Existing German comments stay untouched.
- User-facing text only in `src/i18n/`; German object is the template, `en: typeof de`-style typing; English in British spelling; quotation marks „…“ (de) and “…” (en). No emoji.
- Font sizes only from the type scale (`text-caption` … `text-hero-l`); no Tailwind sizes, no `text-[…]` (`src/typescale.test.ts` enforces).
- No `!` non-null assertions; index access via `itemAt` where in range by construction.
- Storage key `hawkinsflow.decisions.v1`; `KEEP = 200`; `LONGEST = 4000`; `BACKUP_VERSION` stays `1`.
- Tab label "Üben" / "Practice"; place label "Matrix" / "Matrix"; heading "Entscheidungs-Matrix" / "Decision matrix".
- Help text describes David Bayer's method as his idea; no statements about brain, nervous system or lasting change as fact.
- Commits straight to `main`, Conventional Commits, each ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Push after Task 5 (hawkinsflow) and Task 6 (workdays).
- Order: Tasks 1–5 in `hawkinsflow`, pushed, before Task 6 in `workdays`.

## Review Focus

1. Whitespace-only fields: the save button stays disabled and nothing is stored (Task 1 `isFilled`, Task 3 render test).
2. Deleting the entry that is open in the form: the form leaves edit mode and empties instead of saving a ghost (Task 3 step, Task 5 e2e).
3. "Als Vorlage nutzen" while an entry is being edited: it starts a new entry, it does not overwrite the edited one (Task 3 step, Task 5 e2e).
4. English dates read `30/10/2026`, not the US order (Task 3 render test).
5. A field at the length limit is accepted on reload: the textareas carry `maxLength={LONGEST}`, the same bound as the guard (Task 1 guard test, Task 3 render test).

---

### Task 1: The decisions store logic

**Files:**
- Modify: `src/types.ts` (add after `Notes`)
- Create: `src/lib/decisions.ts`
- Modify: `src/lib/storage.ts` (`KEYS`)
- Test: `src/lib/decisions.test.ts`

**Interfaces:**
- Produces (types, `src/types.ts`):
  ```ts
  export type Decision = { id: string; day: string; belief: string; decision: string; evidence: string; at: string; revised?: string }
  export type Decisions = Decision[]
  export type DecisionFields = Pick<Decision, 'day' | 'belief' | 'decision' | 'evidence'>
  ```
- Produces (`src/lib/decisions.ts`):
  - `KEEP = 200`, `LONGEST = 4000`
  - `DECISION_FIELDS = ['belief', 'decision', 'evidence'] as const`; `type DecisionField = (typeof DECISION_FIELDS)[number]`
  - `isDecisions(value: unknown): value is Decisions`
  - `isFilled(fields: DecisionFields): boolean` — at least one of the three texts non-empty after `trim()`
  - `trimmed(fields: DecisionFields): DecisionFields` — the three texts trimmed, `day` unchanged
  - `appendDecision(list: Decisions, entry: Decision): Decisions` — at the end, then `.slice(-KEEP)`
  - `reviseDecision(list: Decisions, id: string, fields: DecisionFields, when: string): Decisions` — replaces the four fields and sets `revised: when` on that id; unknown id → same contents
  - `withoutDecision(list: Decisions, id: string): Decisions`
  - `byDay(list: Decisions): { day: string; entries: Decision[] }[]` — days newest first (string compare on `yyyy-MM-dd`), entries in a day newest `at` first
- Produces (`KEYS.decisions`): `` `${KEY_PREFIX}decisions.v1` ``

- [ ] **Step 1: Write the failing tests** in `src/lib/decisions.test.ts` (pattern: `src/lib/notes.test.ts`). With a valid entry `base = { id: 'a', day: '2026-10-30', belief: 'Ich bin nicht gut genug.', decision: '', evidence: '', at: '2026-10-30T08:00:00.000Z' }`:
  - `isDecisions([])` and `isDecisions([base])` are `true`; `isDecisions([{ ...base, revised: '2026-10-31T08:00:00.000Z' }])` is `true`.
  - `false` for: not an array; `day: '30.10.2026'`; `day: 5`; `belief: 'x'.repeat(4001)`; all three texts `'  '`; `at: 'yesterday'`; `revised: 'later'`; missing `id`.
  - `true` for `belief: 'x'.repeat(4000)`.
  - `isFilled({ day: base.day, belief: ' ', decision: '\n', evidence: '' })` is `false`; with `evidence: 'a'` is `true`.
  - `trimmed` strips surrounding whitespace of the three texts.
  - `appendDecision` of 201 distinct entries onto `[]` one by one has length 200 and has dropped the first.
  - `reviseDecision(list, 'a', fields, when)` changes only `a`, sets `revised === when`, leaves `at`; with `'zzz'` returns equal contents.
  - `withoutDecision` removes exactly the id.
  - `byDay` on entries for `2026-10-29` (one) and `2026-10-30` (two, `at` 08:00 and 09:00) returns `[{day:'2026-10-30', entries:[09:00, 08:00]}, {day:'2026-10-29', …}]`.

- [ ] **Step 2: Run** `npx vitest run src/lib/decisions.test.ts` — Expected: FAIL, module not found.

- [ ] **Step 3: Implement** the types, `src/lib/decisions.ts` and `KEYS.decisions` per the Interfaces block. The guard follows `isNotes`: each entry an object with string `id`, `day` matching `/^\d{4}-\d{2}-\d{2}$/`, three strings each `length <= LONGEST`, `isFilled`, `at` parseable, `revised` absent or parseable. Doc comments in the style of `notes.ts` (why 200: hand-written entries, years of use; why the guard rejects all-empty: an empty card in the list).

- [ ] **Step 4: Run** `npx vitest run src/lib/decisions.test.ts` — Expected: PASS. Then `npm run typecheck && npm run lint` — Expected: no errors.

- [ ] **Step 5: Commit** `feat(decisions): store logic for the decision matrix`

---

### Task 2: Hook, backup, data card

**Files:**
- Create: `src/hooks/useDecisions.ts`
- Modify: `src/lib/backup.ts`, `src/lib/backup.test.ts`
- Modify: `src/i18n/copy.ts` (`BackupCounts`, `dataContents`, new data-card keys, both languages)
- Modify: `src/components/DataCard.tsx`, `src/components/Intro.tsx`, `src/App.tsx`
- Modify: `src/render.test.tsx` (`nothingStored` gains `decisions: []`), any other `BackupData` literal the type check flags
- Modify: `CLAUDE.md` › Storage

**Interfaces:**
- Consumes: Task 1 (`isDecisions`, `appendDecision`, `reviseDecision`, `withoutDecision`, `trimmed`, `KEEP`, `KEYS.decisions`, types).
- Produces (`useDecisions()` returns): `{ decisions: Decisions; addDecision(fields: DecisionFields): void; editDecision(id: string, fields: DecisionFields): void; removeDecision(id: string): void; clearDecisions(): void; replaceDecisions(list: Decisions): void }`. `addDecision` builds `{ id: crypto.randomUUID(), at: new Date().toISOString(), ...trimmed(fields) }`; `editDecision` passes `trimmed(fields)` and `new Date().toISOString()`; an empty list after remove/replace clears the key (as `useNotes`).
- Produces: `BackupData.decisions: Decisions`; `DataCard` prop `onClearDecisions?: () => void`; `Intro` prop `onClearDecisions: () => void`.
- Produces (copy keys, `Copy`): `dataDecisions(count: number): string`, `dataDecisionsClear: string`, `dataDecisionsClearLabel: string`; `BackupCounts` gains `decisions: number`.

- [ ] **Step 1: Write the failing tests** in `src/lib/backup.test.ts`: add a decision to the `data` fixture and `decisions: []` to `empty`; then
  - `'reads a file from before the matrix as having none'`: `parseBackup(fileWith({ decisions: undefined }))` → ok, `backup.decisions` equals `[]`.
  - `'refuses a file whose decisions fail their guard'`: `fileWith({ decisions: [{ id: 'x' }] })` → `{ ok: false, reason: 'invalid' }`.
  - `'cuts restored decisions to what the app keeps'`: 201 valid decisions → `backup.decisions.length === 200`.
  - `'counts decisions as data'`: `hasData({ ...empty, decisions: [one] })` is `true`.
  - `BACKUP_VERSION` is still `1`.
  The existing round-trip test must include `decisions` in its comparison.

- [ ] **Step 2: Run** `npx vitest run src/lib/backup.test.ts` — Expected: FAIL (type errors / missing field).

- [ ] **Step 3: Implement** `decisions` in `BackupData`, `parseBackup` (`const decisions = file.decisions ?? []`, guard, `.slice(-DECISIONS_KEEP)`, extend the comment that lists the optional fields), `readStoredData`, `hasData`. Write `useDecisions` after `useNotes`.

- [ ] **Step 4: Wire it up:** in `App.tsx` call `useDecisions()` beside `useNotes`, add `decisions` to the `data` object passed to `Intro` and `replaceDecisions(data.decisions)` to `restore`; pass `onClearDecisions={clearDecisions}` through `Intro` to `DataCard`. In `DataCard`, a second row exactly like the notes row (`data.decisions.length > 0`), and `decisions: status.backup.decisions.length` in the `dataContents` call. Copy: de `dataDecisions` → „Die Matrix hat einen Eintrag.“ / „Die Matrix hat {n} Einträge.“, `dataDecisionsClear` „Alle löschen“, label „Alle Einträge der Matrix löschen“; en “The matrix holds one entry.” / “The matrix holds {n} entries.”, “Delete all”, “Delete every entry in the matrix”. `dataContents`: de „einen Matrix-Eintrag“ / „{n} Matrix-Einträge“, en “one matrix entry” / “{n} matrix entries”, placed after the notes part.

- [ ] **Step 5: Update CLAUDE.md › Storage:** add `isDecisions` to the guard list; "Free text is stored in two places only: plans, and writing someone tapped "keep" on." becomes three places, the third being the decision matrix; mention `decisions` beside `checkins` and `notes` as an optional backup field.

- [ ] **Step 6: Run** `npm test && npm run typecheck && npm run lint` — Expected: all pass.

- [ ] **Step 7: Commit** `feat(decisions): keep the matrix in storage and in the backup`

---

### Task 3: The matrix view

**Files:**
- Create: `src/i18n/decisions.ts`
- Create: `src/components/Decisions.tsx`
- Test: `src/decisions.test.tsx`

**Interfaces:**
- Consumes: Task 1 (`DECISION_FIELDS`, `DecisionField`, `LONGEST`, `byDay`, `isFilled`, types); `localDay` from `src/lib/download.ts`; `Disclosure`, `Button`, `PAGE_WIDTH`.
- Produces (`src/i18n/decisions.ts`): `export type DecisionsCopy = typeof de`; `export const decisionsCopy: Record<Language, DecisionsCopy>` with keys:
  `title`, `lead`, `howTitle` (Disclosure label), `steps: { title: string; text: string }[]` (3), `whyTitle`, `why`, `examplesTitle`, `examples: { area: string; belief: string; decision: string; evidence: string }[]` (5), `useTemplate`, `formNew`, `formEdit`, `day`, `fields: Record<DecisionField, { label: string; hint: string; placeholder: string }>` (via `satisfies`), `save`, `cancel`, `listTitle(count: number): string`, `edit`, `remove`, `removeForGood`, `keep`, `empty`, `locale` (`'de-DE'` / `'en-GB'`).
- Produces (`src/components/Decisions.tsx`):
  ```ts
  type DecisionsProps = {
    d: DecisionsCopy
    decisions: Decisions
    onAdd: (fields: DecisionFields) => void
    onEdit: (id: string, fields: DecisionFields) => void
    onRemove: (id: string) => void
  }
  export function Decisions(props: DecisionsProps): JSX.Element
  ```

- [ ] **Step 1: Write the copy** in `src/i18n/decisions.ts`. Source: `../workdays/src/i18n/sections/matrix.ts` (read it now; Task 6 deletes it). Carry over title, steps, the five examples (no emoji, no `*…*` markers), the column labels → `fields.*.label`, placeholders, tooltips → `fields.*.hint`. Change:
  - `lead`: de „Nach David Bayer: Du schreibst einen Glaubenssatz auf, der dich klein hält, entscheidest dich bewusst für einen neuen und sammelst, was schon für ihn spricht.“ / en “After David Bayer: write down a belief that keeps you small, decide on a new one, and collect what already speaks for it.”
  - `steps[2].text`: keep only its first sentence (drop the one about the brain).
  - `whyTitle`: „Warum Bayer es so macht“ / “Why Bayer does it this way”.
  - `why`: de „Bayer geht davon aus, dass positives Denken allein selten trägt, weil man dem neuen Gedanken nicht glaubt. Seine Antwort ist eine Entscheidung zusammen mit Belegen aus dem eigenen Leben: Aus „ich versuche, positiv zu denken“ wird „ich habe entschieden, und das hier spricht dafür“. So beschreibt er seine Methode.“ / en “Bayer's idea is that positive thinking on its own rarely holds, because the new thought isn't believed. His answer is a decision together with evidence from your own life: “I'm trying to think positively” becomes “I have decided, and this is what bears it out”. That is how he describes his method.”
  - No `helpIntro` sentence about the mind seeking proof; no mood keys.
  - `listTitle`: de `Deine Einträge (${n})`, en `Your entries (${n})`.
  - Fixed labels (the e2e tests in Task 5 use the German ones): `howTitle` „So funktioniert die Matrix“ / “How the matrix works”; `useTemplate` „Als Vorlage nutzen“ / “Use as a template”; `formNew` „Neue Entscheidung“ / “New decision”; `formEdit` „Entscheidung bearbeiten“ / “Edit decision”; `day` „Datum“ / “Date”; `save` „Speichern“ / “Save”; `cancel` „Abbrechen“ / “Cancel”; `edit` „Bearbeiten“ / “Edit”; `remove` „Löschen“ / “Delete”; `removeForGood` „Endgültig löschen“ / “Delete for good”; `keep` „Behalten“ / “Keep”.

- [ ] **Step 2: Write the failing tests** in `src/decisions.test.tsx` (`describe.each(['de','en'])`, `renderToString`, as `src/practice-pages.test.tsx`):
  - empty list: exactly one `<h1`, contains `d.title`, `d.lead`, `d.empty`, `d.howTitle`, three `<textarea` each with `maxlength="4000"` and an `aria-describedby`, the save button `disabled`.
  - two entries on `2026-10-30` and one on `2026-10-29`: contains `d.listTitle(3)`, the 29th appears after the 30th, de shows `30.10.2026`, en shows `30/10/2026`; an entry with empty `decision` shows `—` in that field; each entry has `d.edit` and `d.remove`.
  - no `text-[` and no emoji in the output (`/\p{Extended_Pictographic}/u`).

- [ ] **Step 3: Run** `npx vitest run src/decisions.test.tsx` — Expected: FAIL, module not found.

- [ ] **Step 4: Implement `Decisions`** top to bottom as spec A4: `<h1>` (classes as `Ebbflow`'s heading) and lead; `Disclosure` folding steps, why (as reading text with the left rule `border-l-2 border-accent/50 pl-4`), examples (each in a `surface`, button `d.useTemplate`); the form as the one `surface-feature` (heading `<h2>` `d.formNew`/`d.formEdit`, `<input type="date">` defaulting to `localDay(new Date())`, three textareas with `<label>`, visible hint `<p id>` linked by `aria-describedby` (ids from `useId`), `maxLength={LONGEST}`; save `disabled={!isFilled(form)}`, cancel only while editing); then the list via `byDay` (`<h2>` `d.listTitle(n)`, a day label per group formatted with `new Intl.DateTimeFormat(d.locale, { day: '2-digit', month: '2-digit', year: 'numeric' })` on the day parsed as a local date, entries as reading text with `<h3>`-free small labels, empty field `—`), or `d.empty`.
  Behaviour that the render test can't see, in the component:
  - Save calls `onAdd` or `onEdit(editingId, form)`, then empties the form (day back to today) and leaves edit mode.
  - Edit loads the entry into the form, sets `editingId`, focuses the first textarea and scrolls it into view.
  - "Use as template" clears `editingId`, sets day to today and the three texts, closes nothing, focuses the first textarea.
  - Delete swaps that entry's two buttons for `d.removeForGood` and `d.keep`; "for good" calls `onRemove`; if it was the entry in the form, the form empties and leaves edit mode; focus then goes to the list `<h2>` (`tabIndex={-1}`) or, if the list is gone, to the first textarea.
  - Size classes only from the type scale.

- [ ] **Step 5: Run** `npm test && npm run typecheck && npm run lint` — Expected: all pass (including `typescale.test.ts`).

- [ ] **Step 6: Commit** `feat(decisions): the decision matrix view`

---

### Task 4: Navigation — a place under Ebb Flow, the tab "Üben"

**Files:**
- Modify: `src/lib/places.ts`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/i18n/copy.ts` (`navPractice`, `navDecisions`, both languages)
- Modify: `src/App.tsx`
- Test: `src/navigation.test.tsx`

**Interfaces:**
- Consumes: Task 2 (`useDecisions` already in `App`), Task 3 (`Decisions`, `decisionsCopy`).
- Produces: `Place` gains `'decisions'`; `Tab = 'today' | 'quiz' | 'moment' | 'practice' | 'knowledge'`; `PRACTICE: readonly Place[] = ['breathe', 'decisions']`; `tabOf(breathe|decisions) === 'practice'`; `GroupNav({ places, label, active, onSelect }: { places: readonly Place[]; label: string; active: Place; onSelect: (place: Place) => void })` replaces `KnowledgeNav`.

- [ ] **Step 1: Update the tests** in `src/navigation.test.tsx`:
  - five-tabs test: labels `[t.navToday, t.navQuiz, t.navMoment, t.navPractice, t.navKnowledge]`, `t.navBreathe` absent from the bar.
  - new: `<TabBar active="decisions" …/>` and `<TabBar active="breathe" …/>` both mark `t.navPractice`.
  - knowledge row test now renders `<GroupNav places={KNOWLEDGE} label={t.navKnowledge} active="thinking" …/>`.
  - new: `<GroupNav places={PRACTICE} label={t.navPractice} active="decisions" …/>` has `aria-label="${t.navPractice}"`, both `t.navBreathe` and `t.navDecisions`, current on `t.navDecisions`.
  - sidebar test: contains `t.navDecisions`, and `html.indexOf('>' + t.navDecisions + '<')` is right after Ebb Flow and before `t.navKnowledge`.
  - order test: bar order with `t.navPractice` in fourth place.

- [ ] **Step 2: Run** `npx vitest run src/navigation.test.tsx` — Expected: FAIL.

- [ ] **Step 3: Implement** `places.ts` (comments: the places to practise share a tab like the places to look things up in); `Navigation.tsx`: `BAR`, `SIDE = ['today', 'quiz', 'breathe', 'decisions']`, `labelOf` cases `practice` and `decisions`, `Glyph` paths `practice` (same as `breathe`) and `decisions` — a path forking in two: `['M12 21v-7', 'M12 14 6 8M12 14l6-6', 'M6 8V4.5M6 4.5h3.5M18 8V4.5M18 4.5h-3.5']`; `KnowledgeNav` → `GroupNav` (doc comment covers both groups). Copy: `navPractice` „Üben“ / “Practice”, `navDecisions` „Matrix“ / “Matrix”.

- [ ] **Step 4: Wire `App.tsx`:** `'decisions'` in `Phase`, `PHASES`, `placeOf`, `select`; `lastPractice = useRef<Place>('breathe')` updated like `lastKnowledge` from `PRACTICE`; `selectTab('practice')` → `select(lastPractice.current)`; replace the `KnowledgeNav` line by two `GroupNav` lines (KNOWLEDGE / `t.navKnowledge`, PRACTICE / `t.navPractice`), shown when `!focusMode` and the place is in the group; render `<Decisions d={decisionsCopy[language]} decisions={decisions} onAdd={addDecision} onEdit={editDecision} onRemove={removeDecision} />` for phase `'decisions'`.

- [ ] **Step 5: Run** `npm test && npm run build && npm run lint` — Expected: all pass.

- [ ] **Step 6: Commit** `feat(nav): the matrix under Ebb Flow, sharing the tab "Üben"`

---

### Task 5: End-to-end, docs, push

**Files:**
- Modify: `e2e/flows.spec.ts`
- Modify: `CLAUDE.md` › Accessibility (places paragraph)
- Modify: `README.md` if it lists the app's places

- [ ] **Step 1: Update existing e2e tests** that tap the tab `'Ebb Flow'` (`the navigation reaches every place…`, `Ebb Flow breathes in and out…`) to tap `'Üben'`; the sidebar test keeps `'Ebb Flow'` and additionally clicks `'Matrix'` → heading level 1 `'Entscheidungs-Matrix'`.

- [ ] **Step 2: Add e2e tests:**
  - `'the practice tab switches between Ebb Flow and the matrix'`: tap `Üben` → h1 `Ebb Flow`; the row `navigation` named `Üben` → `Matrix` → h1 `Entscheidungs-Matrix`, `Üben` still `aria-current`; tap `Heute`, tap `Üben` → back on the matrix.
  - `'a decision is kept, edited and deleted'`: fill the belief field, „Speichern“ → listed; reload → still listed and `hawkinsflow.decisions.v1` has one entry; „Bearbeiten“ → change text, „Speichern“ → new text shown, stored entry has `revised`; „Löschen“ → „Endgültig löschen“ → empty text shown, key removed (`stored` returns `null`).
  - `'a template fills the form and never overwrites the entry in edit'`: seed one decision, „Bearbeiten“, open „So funktioniert die Matrix“ (use `d.howTitle`'s German text), „Als Vorlage nutzen“ on the first example → three fields hold the example; „Speichern“ → two entries stored, the seeded one unchanged.
  - `'deleting the entry being edited empties the form'`: seed one, „Bearbeiten“, „Löschen“ → „Endgültig löschen“ → form heading is „Neue Entscheidung“ and fields are empty.
  - `'whitespace alone cannot be saved'`: type spaces into all three → save button disabled.

- [ ] **Step 3: Run** `npm run build && npm run test:e2e` — Expected: all pass.

- [ ] **Step 4: Docs:** CLAUDE.md › Accessibility — "Eight places" → nine; the phone shares two groups between tabs (`KNOWLEDGE` under "Wissen", `PRACTICE` under "Üben"), each with a `GroupNav` row; still five tabs. Update README if it names the places.

- [ ] **Step 5: Full check:** `npm run typecheck && npm test && npm run lint && npm run build && npm run test:e2e` — Expected: all green.

- [ ] **Step 6: Commit and push** `test(e2e): the decision matrix and the practice tab` (docs in the same commit), then `git push`.

---

### Task 6: Remove the matrix from Workdays (repo `../workdays`)

**Files:**
- Delete: `src/components/views/DecisionMatrixView.tsx`, `src/i18n/sections/matrix.ts`
- Modify: `src/i18n/index.ts`, `src/types.ts`, `src/App.tsx`, `src/components/layout/navSlots.ts`, `src/components/layout/TopBar.tsx`, `src/i18n/sections/layout.ts`, `src/services/firestoreService.ts`, `firestore.rules`, `scripts/verify-rules.mjs`, `e2e/layout.spec.ts`, `src/lib/retryImport.ts`, `src/components/ui/page.ts`, `src/components/ui/PageHeader.tsx`, `CLAUDE.md`

- [ ] **Step 1: Remove the feature:** the two files; `matrix` import and both entries in `src/i18n/index.ts`; `"decisions"` from `ViewType` and `DecisionMatrixEntry` from `src/types.ts`; lazy import (line 23) and render branch (≈681) in `App.tsx`; the `decisions` destination from `MORE_DESTINATIONS`; `ACCOUNT_MENU_DESTINATIONS` (its only entry is the matrix) and its map plus the divider after it in `TopBar.tsx` (keep the e-mail header and sign-out); `decisions` in both label maps of `layout.ts` (`satisfies Record<ViewType, string>` fails otherwise); whatever becomes unused (`Sparkles`, possibly `isUserAdmin` in `TopBar.tsx`; `npm run lint` with `--max-warnings 0` names them); the DECISION MATRIX section in `firestoreService.ts` and the type import; the `2b. Decision Matrix Collection` block in `firestore.rules`; the `decisions` seed and the two checks in `verify-rules.mjs`; the decisions seed loop and the four Matrix lines in `e2e/layout.spec.ts`.

- [ ] **Step 2: Comments and docs:** drop "Matrix"/"Entscheidungsmatrix" from the lists in `retryImport.ts`, `page.ts`, `PageHeader.tsx`, the `navSlots.ts` doc comments; in `CLAUDE.md` the `saveStamp` note (line ≈88), the layout-test list (≈116), the views list (≈159), the navigation sections (≈211–241: the desktop account menu now holds e-mail and sign-out; "Mehr" holds Auswertung and Export), and the colour note (≈563). Leave `repomix-output.xml` alone.

- [ ] **Step 3: Search:** `grep -rniE "decision|matrix" src e2e scripts firestore.rules CLAUDE.md` — Expected: no hit that belongs to the feature (German „entscheidet“ in unrelated comments is fine).

- [ ] **Step 4: Verify:** `npm run lint && npm test && npm run build`, then `npm run test:e2e` and `npm run verify:rules` — Expected: all pass. If the Firestore emulator (Java, firebase-tools) is not available, say so in the report instead of skipping silently.

- [ ] **Step 5: Commit and push** `refactor: remove the decision matrix (moved to Hawkins Flow)`, then `git push`. Remind the owner: `npm run deploy:rules` publishes the narrower rules; the old documents in the `decisions` collection stay until deleted in the Firebase console.
