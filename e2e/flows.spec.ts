import { readFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'

/* The main flows, clicked through as a person would. Each test starts with
 * its own empty browser profile, so storage never leaks between them. Texts
 * are the German ones: the locale in `playwright.config.ts` makes the app
 * pick German on its own.
 */

const DAY = 86_400_000

/** Writes app storage, then reloads so the hooks read it. */
async function seed(page: Page, entries: Record<string, unknown>) {
  await page.goto('/')
  await page.evaluate((values) => {
    for (const [key, value] of Object.entries(values)) localStorage.setItem(key, JSON.stringify(value))
  }, entries)
  await page.reload()
}

async function stored(page: Page, key: string): Promise<unknown> {
  return page.evaluate((name) => JSON.parse(localStorage.getItem(name) ?? 'null'), key)
}

/** The start page's door to the questionnaire; its title changes with the state. */
const quizDoor = (page: Page) => page.getByRole('button', { name: /Die letzten drei Wochen/ })

test('the questionnaire leads to a result and into the history', async ({ page }) => {
  await page.goto('/')
  await quizDoor(page).click()

  // 1–5 answers and moves on by itself. A varied pattern, since the same
  // answer everywhere is refused as unreadable.
  for (let question = 1; question <= 34; question++) {
    await expect(page.getByText(`${question} / 34`)).toBeVisible()
    await page.keyboard.press(String((question % 5) + 1))
  }

  await expect(page.getByText('Dein Schwerpunkt', { exact: true })).toBeVisible()
  // Focus moves to the view on every change, so a screen reader starts at the top.
  await expect(page.locator('main')).toBeFocused()

  // How it came about is folded away until asked for.
  await expect(page.getByRole('heading', { name: 'Was den Ausschlag gab' })).toHaveCount(0)
  const origin = page.getByRole('button', { name: 'Wie das zustande kam' })
  await origin.click()
  await expect(origin).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('heading', { name: 'Was den Ausschlag gab' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Dein Profil' })).toBeVisible()

  const history = (await stored(page, 'hawkinsflow.history.v1')) as unknown[]
  expect(history).toHaveLength(1)

  // The browser's back button steps through the views, not out of the app.
  await page.goBack()
  await page.goBack()
  await expect(page.getByRole('heading', { name: 'Deine Durchgänge' })).toBeVisible()
  await expect(quizDoor(page)).toContainText('Ergebnis ansehen')
})

test('switching the language mid-questionnaire keeps the answers', async ({ page }) => {
  await page.goto('/')
  await quizDoor(page).click()
  await page.keyboard.press('4')
  await expect(page.getByText('2 / 34')).toBeVisible()

  await page.getByRole('button', { name: 'Auf Englisch umschalten' }).click()
  await expect(page.getByText('How often has this been true over the past three weeks?')).toBeVisible()
  await expect(page.getByText('2 / 34')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  expect(await stored(page, 'hawkinsflow.answers.v1')).toEqual({ q01: 3 })
})

test('the moment flow is recorded on the start page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Ich stecke gerade fest/ }).click()
  await page.getByRole('button', { name: /Angst/ }).click()
  await page.getByRole('button', { name: 'Weiter' }).click()
  await page.getByRole('button', { name: 'Weiter' }).click()
  await page.getByRole('button', { name: 'Fertig' }).click()

  await expect(page.getByRole('heading', { name: 'Deine Momente' })).toBeVisible()
  const moments = (await stored(page, 'hawkinsflow.moments.v1')) as { level: string }[]
  expect(moments.map((moment) => moment.level)).toEqual(['fear'])
})

test('a plan typed with its own "Wenn" is kept without the double word', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Erst die Skala ansehen' }).click()
  await page.getByRole('button', { name: /^200\s*Mut/ }).click()

  // In the level detail the form waits behind a button that hands focus on.
  await page.getByRole('button', { name: 'Plan anlegen' }).click()
  const when = page.getByRole('textbox', { name: 'Wenn' })
  await expect(when).toBeFocused()
  await when.fill('Wenn ich ein Meeting verlasse')
  await page.getByRole('textbox', { name: 'dann' }).fill('dann schreibe ich den einen Satz auf')
  await page.getByRole('button', { name: 'Plan merken' }).click()

  const plans = (await stored(page, 'hawkinsflow.plans.v1')) as Record<string, { when: string; then: string }>
  expect(plans.courage?.when).toBe('ich ein Meeting verlasse')
  expect(plans.courage?.then).toBe('schreibe ich den einen Satz auf')
})

test('a week-old plan asks whether it held and leads back to it', async ({ page }) => {
  const created = new Date(Date.now() - 8 * DAY).toISOString()
  await seed(page, {
    'hawkinsflow.plans.v1': {
      courage: { level: 'courage', when: 'ich ein Meeting verlasse', then: 'schreibe ich es auf', created },
    },
  })

  const question = page.getByRole('group', { name: 'Hat dieser Plan zuletzt gegriffen?' })
  await expect(question).toBeVisible()
  await question.getByRole('button', { name: 'Nein' }).click()

  await expect(question).toHaveCount(0)
  await expect(page.getByText(/meistens am „Wenn“/)).toBeVisible()
  await expect(page.getByText('Bisher: 1 × nein')).toBeVisible()
  const plans = (await stored(page, 'hawkinsflow.plans.v1')) as Record<string, { checks?: { verdict: string }[] }>
  expect(plans.courage?.checks?.map((check) => check.verdict)).toEqual(['missed'])

  // "Change the plan" opens its level in the scale, with the plan in it.
  await page.getByRole('button', { name: 'Plan ändern' }).click()
  await expect(page.getByRole('heading', { name: 'Die Skala', level: 1 })).toBeVisible()
  await expect(page.locator('#level-courage')).toContainText('ich ein Meeting verlasse')

  // Asked once: after a reload the question stays away for a week.
  await page.reload()
  await expect(page.getByText('Bisher: 1 × nein')).toBeVisible()
  await expect(page.getByRole('group', { name: 'Hat dieser Plan zuletzt gegriffen?' })).toHaveCount(0)
})

test('a backup saved on one device restores on another', async ({ page, browser }) => {
  const plan = { level: 'courage', when: 'ich wach werde', then: 'trinke ich Wasser', created: '2026-09-01T08:00:00.000Z' }
  await seed(page, {
    'hawkinsflow.plans.v1': { courage: plan },
    'hawkinsflow.history.v1': [{ taken: '2026-09-01T08:00:00.000Z', level: 'courage', calibration: 210, answered: 34 }],
  })

  const download = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Als Datei sichern' }).click()
  const file = await (await download).path()
  expect(JSON.parse(await readFile(file, 'utf8'))).toMatchObject({ app: 'hawkinsflow', plans: { courage: plan } })

  // A second, empty profile: the other device.
  const other = await browser.newContext({ locale: 'de-DE' })
  const fresh = await other.newPage()
  await fresh.goto('/')
  await expect(fresh.getByRole('heading', { name: 'Dein Plan' })).toHaveCount(0)

  await fresh.locator('input[type="file"]').setInputFiles(file)
  await expect(fresh.getByText(/einen Durchgang und einen Plan/)).toBeVisible()
  await fresh.getByRole('button', { name: 'Ersetzen' }).click()

  await expect(fresh.getByText('Die Sicherung ist geladen.')).toBeVisible()
  await expect(fresh.getByText('trinke ich Wasser')).toBeVisible()
  await expect(fresh.getByRole('heading', { name: 'Deine Durchgänge' })).toBeVisible()
  await other.close()
})

test('the installed app opens without a network', async ({ page, context }) => {
  await page.goto('/')
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready
  })

  await context.setOffline(true)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Hawkins Flow', level: 1 })).toBeVisible()
  await quizDoor(page).click()
  await expect(page.getByText('1 / 34')).toBeVisible()
})
