import { test, expect } from '@playwright/test'
import path from 'path'

test.describe('Hindi Font Rendering', () => {
  test('Noto Sans Devanagari loads for Hindi content', async ({ page }) => {
    await page.goto('/')

    // Switch to Hindi
    const hiBtn = page.getByRole('button', { name: 'HI' })
    await hiBtn.click()
    await page.waitForLoadState('networkidle')

    // Verify Devanagari font family on h1
    const fontFamily = await page.locator('h1').first().evaluate(el =>
      window.getComputedStyle(el).fontFamily.toLowerCase()
    )
    expect(fontFamily).toContain('noto sans devanagari')

    // Screenshot hero
    const snapshotDir = path.join(__dirname, 'snapshots')
    await page.locator('section').first().screenshot({
      path: path.join(snapshotDir, 'hero-hindi.png'),
    })

    // Screenshot nav
    await page.locator('nav').screenshot({
      path: path.join(snapshotDir, 'nav-hindi.png'),
    })

    // Screenshot waitlist form
    await page.locator('#waitlist').scrollIntoViewIfNeeded()
    await page.locator('#waitlist').screenshot({
      path: path.join(snapshotDir, 'waitlist-hindi.png'),
    })
  })

  test('Hindi h1 contains Devanagari characters', async ({ page }) => {
    await page.goto('/')
    const hiBtn = page.getByRole('button', { name: 'HI' })
    await hiBtn.click()
    await page.waitForLoadState('networkidle')
    const h1Text = await page.locator('h1').first().textContent() ?? ''
    const hasDevanagari = /[\u0900-\u097F]/.test(h1Text)
    expect(hasDevanagari).toBe(true)
  })
})
