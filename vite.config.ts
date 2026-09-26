import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

/* The PDF renderer and its fonts: loaded only when someone taps "save as PDF"
   (see `src/pdf/exportResult.ts`). Kept out of the precache below. */
const PDF_ASSETS = /\/assets\/(react-pdf|ResultDocument|inter-).*\.(js|woff2?)$/

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    /* A service worker, so the installed app opens without a network.

       The manifest promises `display: standalone`; without this, the app sat
       on the home screen and showed the browser's error page offline — although
       after loading it needs no network at all. The moment flow is made for
       wherever someone happens to be when a feeling takes over.

       - `prompt` without any prompt UI: a new version waits until every window
         of the app is closed and takes over on the next cold start, never in
         the middle of the questionnaire or the moment flow, where a reload
         would lose the current step.
       - The precache holds the shell, the entry bundle, styles and icons. The
         PDF renderer (about 440 kB gzipped) and its fonts are cached on first
         use instead: the moment flow, the reason for going offline, needs no
         PDF, and preloading 1.7 MB on a first visit is the wrong price.
       - `manifest: false`: the hand-written `public/manifest.webmanifest` stays
         the one source. */
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'script-defer',
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webmanifest}'],
        globIgnores: ['**/react-pdf*.js', '**/ResultDocument*.js'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => PDF_ASSETS.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'hawkinsflow-pdf',
              // Hashed file names: each release adds a set; the oldest go first.
              expiration: { maxEntries: 16 },
            },
          },
        ],
      },
    }),
  ],
  build: {
    /* `@react-pdf` wiegt gut ein Megabyte und löst die 500-kB-Warnung aus. Hier
       ist sie kein Hinweis, sondern Rauschen: Der Renderer liegt in einem
       eigenen Bündel, das erst geladen wird, wenn jemand im Ergebnis auf „Als
       PDF sichern" tippt (siehe `src/pdf/exportResult.ts`). Der Start der App
       trägt davon nichts. */
    chunkSizeWarningLimit: 1500,
  },
})
