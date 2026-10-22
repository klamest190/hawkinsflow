# Hawkins Flow

David R. Hawkins' Map of Consciousness as a self-reflection app: 17 levels from
Shame (20) to Enlightenment (700), a 34-statement questionnaire, a
four-step "moment" flow for when a feeling takes over, if-then plans that
ask after a week whether they held, a daily check-in, and a history of runs.
Each level carries three practices, and a practice can bring a tool along: a
timer, a paced breath, a five-senses count, fields to write in (kept only on
request), or a player for a guided meditation. A page of its own sets two models of
thinking side by side — the "ordinary" one and the Mind Hack Method — station
by station. German and English.

The app says plainly that Hawkins' method is not scientifically supported; the
result is meant as a prompt for reflection, not a measurement. It shows a level
and a band between two neighbouring levels, never the interpolated number.
Folded under the result, "how this came about" names the levels that carried
the most weight and the person's own answers to their statements.

## Stack

React 19, TypeScript (strict), Tailwind CSS v4, Vite 8. Installable PWA with a
service worker (`vite-plugin-pwa`). No backend, no network access, no
tracking: everything is stored in `localStorage` on the device.

## Scripts

| Command             | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Dev server                                     |
| `npm run build`     | Type check, production build, service worker   |
| `npm run preview`   | Serve the production build (with the worker)   |
| `npm run typecheck` | `tsc -b` only                                  |
| `npm run lint`      | oxlint, including jsx-a11y                     |
| `npm run test`      | Vitest                                         |
| `npm run test:e2e`  | Playwright: builds, serves the preview, runs the flows in Chromium |

CI runs typecheck, lint, test and build on every push to `main`, and the
Playwright flows as a second job. Locally, Playwright needs its Chromium once:
`npx playwright install chromium`.

## Layout

```
src/
  App.tsx          views, navigation (History API, no router), accent color;
                   a tab bar on phones, a sidebar from 1024 px, both hidden
                   in the questionnaire and the moment flow
  main.tsx         root; renders the crash screen on an uncaught error
  components/      one file per view or building block
  hooks/           one hook per storage key
  lib/             pure logic: scoring, history, plans, moments, check-ins,
                   kept notes, breathing, backup, colors, storage, download
  data/            language-neutral data: levels, questions, breathing
                   patterns, the moment flow's first-aid tool per level
  i18n/            all text; German is the template, English must match it
  pdf/             the result as PDF (lazy-loaded @react-pdf)
e2e/               Playwright flows: questionnaire, moment, plan, check-in,
                   backup, offline
public/            one manifest per language, and the icons (see assets/README.md)
```

## Guided meditations

The player is built but has no recordings yet. To add one, put the files at
`public/audio/de/<id>.mp3` and `public/audio/en/<id>.mp3` (ids and titles in
`tracks` in `src/i18n/copy.ts`), then give a practice in
`src/i18n/levels.ts` the tool `{ kind: 'audio', track: '<id>' }` in both
languages. They are not precached; the service worker keeps each one from its
first play on.

## Your data

Plans, history, moments, daily check-ins, kept writing and unfinished answers
live only in the browser that created them. Writing in a practice is not
stored unless "keep" is tapped. The start page offers saving everything to a JSON file and
loading it back on another device; loading replaces what is there.
