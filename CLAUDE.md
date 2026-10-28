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

## Type

- Two faces, self-hosted from `@fontsource-variable`, latin subset only,
  declared in `index.css` and precached: Inter for text and controls
  (`font-sans`, the face the PDF uses too), Newsreader with its optical-size
  axis for headings, level names and counters (`font-display`).
- Every font size is a step of the scale in `index.css` (`text-caption` …
  `text-hero-l`). The reading steps grow by one notch from `lg` on, through
  the variables, not through classes. No `text-[13px]` and no Tailwind sizes:
  `src/typescale.test.ts` fails on either.
- Labels are small headings in sentence case (`text-small font-semibold
  text-muted`), not tracked capitals. Between two facts there is no middle
  dot: a level's value goes in brackets („Mut (200)“), lists take commas.

## Surfaces

- Three, defined in `index.css`: text to read sits on the ground without a
  box; `surface` holds a group of things to use (a practice, a form, a
  tool); `surface-feature` is the one thing a view is about, once per view.
  Emphasis inside reading text is a rule on the left
  (`border-l-2 border-accent/50 pl-4`), not another box.
- The ladder (`Ladder`) is the app's picture of the scale: on the start
  page, over the scale's list, beside the result, and on its side as the
  questionnaire's progress. On the result it climbs to the level found
  before the name appears. That is the one orchestrated motion: the short
  rise of a view answers a change of place, but nothing else gets a
  staged entrance of its own.

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

## Claims about research

- The meditation page and Ebb Flow's "why ten seconds" state findings only as
  far as the cited reviews go (`SOURCES` in `src/data/meditations.ts`),
  with their limits and side effects on the page, not behind a fold. A new
  claim needs a source in that list; a number needs it from the review.

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
- Eight places in the navigation (`Place` in `src/lib/places.ts`): a tab
  bar on phones, a sidebar from `lg` on. On phones the scale, thinking,
  meditation and the laws of winners share the tab "Wissen" with a row at the top of each
  (`KNOWLEDGE`, `KnowledgeNav`); the bar has five tabs and should stay at
  five. `placeOf` in `App.tsx` says which view belongs to which place. The questionnaire and the moment flow are `FOCUS`
  views: no navigation, their own "cancel", the language switch fixed top
  right — keep that corner free there. A guided session (`'session'`) is one
  as well.
- A guided session's timings are in `src/data/sessions.ts` (ten minutes, the
  other lengths scaled), its texts in `src/i18n/sessions.ts`, one per step —
  a test checks both have the same count. Its clock is `useCountdown`, which
  goes on in a hidden tab, unlike `useBreath`.
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
