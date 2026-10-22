# Hawkins Flow — notes for working on this codebase

See README.md for what the app is and how to run it. This file holds the
conventions that are not obvious from a single file.

## Language

- New code, comments, identifiers, commit messages and docs are English.
- Much of the existing code is commented in German. Leave it as it is; don't
  translate it as a side effect of another change.
- User-facing text is bilingual and never hard-coded in a component. It lives
  in `src/i18n/`. The German object is the template, the type derives from it
  (`type Copy = typeof de`), and the English object must satisfy it — a missing
  key fails the build. Texts with numbers are functions, so each language can
  place the number where its grammar wants it. Write both versions as
  originals, not word-for-word translations, with each language's quotation
  marks („…“ in German, “…” in English). The English uses British spelling.
- `src/i18n/crash.ts` is deliberately separate from `copy.ts`: the crash screen
  must render even if the large copy files are what failed.

## Color

- One CSS variable colors the whole app: `App.tsx` sets `--hf-accent` on
  `<body>` from the current level. It is a registered `@property`, so level
  changes blend over 600 ms.
- `--hf-accent-ink` is the same color raised to a lightness floor
  (`readableOnDark` in `src/lib/oklch.ts`). Use it — `text-accent-ink`,
  `outline-accent-ink`, `bg-accent-ink` — for anything that is text, a focus
  ring, a selected state or the primary button. Keep `--hf-accent` for bars,
  glows, gradients and tinted surfaces. A level color passed inline as text
  goes through `readableOnDark(level.color)`.
- `src/lib/oklch.test.ts` checks every level against the ground colors read
  from `index.css`. If a ground color changes, that test says whether text
  still reads.

## Storage

- All keys are in `KEYS` (`src/lib/storage.ts`); each hook owns one.
- Every read goes through a type guard (`isAnswers`, `isPlans`, `isHistory`,
  `isMoments`, `isCheckIns`, `isNotes`). A backup file goes through the same
  guards. A stored level id is checked against the scale with `isLevelId`.
- Changing a stored shape means bumping the key's version and
  `BACKUP_VERSION` in `src/lib/backup.ts`. There is no migration step yet; a
  value that fails its guard is treated as absent.
- An added *optional* field is not a shape change: old values still pass the
  guard, and older code ignores the field. That is how `Plan.revised` and
  `Plan.checks` came in. The guard still checks the field whenever it is
  there. Bumping `BACKUP_VERSION` would make every earlier backup file
  unloadable, so don't do it for an additive change.
- The same holds for a backup field: `checkins` and `notes` are optional in
  a file, absent reads as empty, present passes its guard.
- Free text is stored in two places only: plans, and writing someone tapped
  "keep" on. The fields of a writing practice forget on unmount by design.

## Practice tools

- A practice carries at most one `tool` (`PracticeTool` in `types.ts`);
  `PracticeTool.tsx` switches over every kind without a default, so a new
  kind fails the build there.
- Which tool the moment flow's second step uses is `FIRST_AID` in
  `src/data/firstAid.ts`; a level with a tool other than the timer needs its
  text in `firstAidBody` (`src/i18n/moment.ts`), which a test checks.
- `src/tools.test.tsx` holds the rules per stretch of the scale, e.g. every
  level from 200 to 400 has a writing tool.
- Motion set from script (the breathing shape) asks `useReducedMotion`; the
  CSS rule in `index.css` doesn't reach it.

## Types

- `noUncheckedIndexedAccess` is on. Where an index is in range by
  construction, read it with `itemAt` (`src/lib/array.ts`): it throws, and
  the throw lands on the crash screen. Where "missing" is a real case, handle
  it instead. No `!` assertions.
- Answer values come from `ANSWER_VALUES` (`src/data/questions.ts`), not from
  the indices of the answer labels.

## Questionnaire

- The construction rules for statements are at the top of
  `src/i18n/questions.ts`; `questions.test.ts` checks the mechanical ones.
- Rewording a statement so that it means something else bumps
  `QUESTION_EDITION` (`src/data/questions.ts`). Every run records its
  edition, and the history trail breaks the line where the edition changes.

## Accessibility

- Each view has exactly one `<h1>`, and heading levels don't skip. The app's
  name in the phone's top bar and the sidebar is not a heading, and the logo
  next to it is `decorative`.
- Five places in the navigation (`Tab` in `Navigation.tsx`): a tab bar on
  phones, a sidebar from `lg` on. `tabOf` in `App.tsx` says which view
  belongs to which tab. The questionnaire and the moment flow are `FOCUS`
  views: no navigation, their own "cancel", the language switch fixed top
  right — keep that corner free there.
- An SVG id must be unique per instance (`useId`): the same component can be
  on the page twice, once inside a `display: none` branch.
- `App.tsx` moves focus to `<main>` on every view change; the questionnaire
  moves it to the new question when the answer that had it unmounts; the
  compact plan form moves it into the "if" field when it opens.
- The questionnaire's answers are a radio group whose options carry the tab
  stop; the practice deck is a tab list. Both disable
  `jsx-a11y/interactive-supports-focus` on the container on purpose.
- Anything drawn (bars, trails, the ladder) needs a text equivalent or is
  `aria-hidden` next to one.

## Tests

- Vitest runs in Node. `src/render.test.tsx` renders every view in both
  languages with `renderToString`; it sees markup, not effects or clicks.
- Behaviour that needs a browser (focus, clicks through a flow, file
  download and upload, offline) is in `e2e/` and runs with Playwright against
  the production build under `vite preview` — the service worker only exists
  there. Phone viewport, German locale. Each test gets an empty profile; seed
  storage with `page.evaluate` and reload.
- A view folded behind a `Disclosure` doesn't appear in `renderToString`.
  Test the folded component on its own (`Spectrum`, `Why`), not through the
  view.
- Vitest normally replaces CSS with an empty string. `vitest.config.ts` lets
  `src/index.css` through so the contrast test can read it via `?raw`.

## Service worker

- A new version waits for the next cold start and never takes over a running
  session, so no one loses their place mid-questionnaire.
- The PDF renderer and its fonts are cached on first use, not precached.

## Git

- Commit straight to `main` and push; no feature branches.
- Conventional Commits.
