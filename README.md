# Hawkins Flow

David R. Hawkins' Map of Consciousness as a self-reflection app: 17 levels from
Shame (20) to Enlightenment (700), a 34-statement questionnaire, a
four-step "moment" flow for when a feeling takes over, if-then plans, and a
history of runs. German and English.

The app says plainly that Hawkins' method is not scientifically supported; the
result is meant as a prompt for reflection, not a measurement. It shows a level
and a band between two neighbouring levels, never the interpolated number.

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

CI runs typecheck, lint, test and build on every push to `main`.

## Layout

```
src/
  App.tsx          views, navigation (History API, no router), accent color
  main.tsx         root; renders the crash screen on an uncaught error
  components/      one file per view or building block
  hooks/           one hook per storage key
  lib/             pure logic: scoring, history, plans, moments, backup,
                   colors, storage, file download
  data/            language-neutral level and question data
  i18n/            all text; German is the template, English must match it
  pdf/             the result as PDF (lazy-loaded @react-pdf)
public/            one manifest per language, and the icons (see assets/README.md)
```

## Your data

Plans, history, moments and unfinished answers live only in the browser that
created them. The start page offers saving everything to a JSON file and
loading it back on another device; loading replaces what is there.
