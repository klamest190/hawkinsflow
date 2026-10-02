import { defineConfig, devices } from '@playwright/test'

/* End-to-end tests in a real browser, for what the Vitest suite can't see:
 * focus, clicks through whole flows, file download and upload, and the
 * service worker.
 *
 * They run against the production build under `vite preview`, because the
 * service worker only exists there (see README). A phone viewport, because
 * the app is mostly opened on one. German locale, so the language detection
 * picks German the way it would for most people using the app.
 */
const PORT = 4318

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    locale: 'de-DE',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'phone', use: { ...devices['Pixel 7'] } }],
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    // A running preview may serve an older build than the code under test.
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
