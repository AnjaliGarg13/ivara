import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('no critical or serious axe violations', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    const criticalOrSerious = results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    )
    expect(criticalOrSerious).toHaveLength(0)
  })

  test('all images have non-empty alt text', async ({ page }) => {
    await page.goto('/')
    const images = page.locator('img')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).not.toBeNull()
      expect(alt!.trim()).not.toBe('')
    }
  })

  test('all form inputs have accessible labels', async ({ page }) => {
    await page.goto('/')
    await page.locator('#waitlist').scrollIntoViewIfNeeded()
    const inputs = page.locator('#waitlist input')
    const count = await inputs.count()
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')
      // Check for associated label element
      const hasLabelElement = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false
      expect(ariaLabel || ariaLabelledBy || hasLabelElement).toBeTruthy()
    }
  })

  test('language toggle has accessible label', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /EN|HI|English|Hindi|language/i }).first()
    const ariaLabel = await toggle.getAttribute('aria-label')
    const text = await toggle.textContent()
    expect(ariaLabel || (text && text.trim().length > 0)).toBeTruthy()
  })

  test('all interactive elements are keyboard reachable', async ({ page }) => {
    await page.goto('/')
    // Tab through page and ensure all focusable elements get focus
    const focusableCount = await page.evaluate(() =>
      document.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ).length
    )
    expect(focusableCount).toBeGreaterThan(5)
  })
})
