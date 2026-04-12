import { test, expect, Page } from '@playwright/test'

// Helper to mock the waitlist API
async function mockWaitlistSuccess(page: Page) {
  await page.route('/api/waitlist', route =>
    route.fulfill({ status: 200, contentType: 'application/json',
      body: JSON.stringify({ success: true, message: "You're on the list!" }) })
  )
}
async function mockWaitlistError(page: Page) {
  await page.route('/api/waitlist', route =>
    route.fulfill({ status: 500, contentType: 'application/json',
      body: JSON.stringify({ success: false, error: 'Something went wrong.' }) })
  )
}

test.describe('Navigation', () => {
  test('renders logo, language toggle, and CTA', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('banner')).toBeVisible()
    // Logo
    await expect(page.getByText('Ivara').first()).toBeVisible()
    // Language toggle
    const langToggle = page.getByRole('button', { name: /EN|HI|English|Hindi/i }).first()
    await expect(langToggle).toBeVisible()
    // Nav CTA
    const navCTA = page.getByRole('navigation').getByRole('button', { name: /waitlist/i })
    await expect(navCTA).toBeVisible()
  })

  test('language toggle switches EN to HI', async ({ page }) => {
    await page.goto('/')
    const hiButton = page.getByRole('button', { name: 'HI' })
    await hiButton.click()
    // After toggle, Hindi text should appear
    // Hero should contain Devanagari characters
    const heroText = await page.locator('h1').textContent()
    const hasDevanagari = /[\u0900-\u097F]/.test(heroText ?? '')
    expect(hasDevanagari).toBe(true)
  })
})

test.describe('Hero Section', () => {
  test('EN headline is visible and contains positioning copy', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    const text = await h1.textContent()
    // Must contain the positioning copy (or A/B variant)
    const hasPositioningCopy =
      (text ?? '').toLowerCase().includes('checkup') ||
      (text ?? '').toLowerCase().includes('appointment') ||
      (text ?? '').toLowerCase().includes('safety net')
    expect(hasPositioningCopy).toBe(true)
  })

  test('primary CTA button is visible and clickable', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('button', { name: /join.*waitlist|get.*early.*access/i }).first()
    await expect(cta).toBeVisible()
    await expect(cta).toBeEnabled()
  })

  test('primary CTA scrolls to waitlist section', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('button', { name: /join.*waitlist|get.*early.*access/i }).first()
    await cta.click()
    // Wait for scroll
    await page.waitForTimeout(600)
    const waitlistSection = page.locator('#waitlist')
    await expect(waitlistSection).toBeInViewport()
  })
})

test.describe('Waitlist Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Scroll to waitlist section
    await page.locator('#waitlist').scrollIntoViewIfNeeded()
  })

  test('accepts valid email and shows success state', async ({ page }) => {
    await mockWaitlistSuccess(page)
    const emailInput = page.locator('#waitlist input[type="email"]')
    await emailInput.fill('priya@example.com')
    await page.locator('#waitlist').getByRole('button', { name: /join|waitlist|reserve/i }).click()
    // Success state
    await expect(page.getByText(/you're on the list|aap list mein/i)).toBeVisible({ timeout: 5000 })
  })

  test('rejects invalid email with error message', async ({ page }) => {
    const emailInput = page.locator('#waitlist input[type="email"]')
    await emailInput.fill('not-an-email')
    await page.locator('#waitlist').getByRole('button', { name: /join|waitlist|reserve/i }).click()
    // Error message or browser validation should appear
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
  })

  test('shows error state on API failure', async ({ page }) => {
    await mockWaitlistError(page)
    const emailInput = page.locator('#waitlist input[type="email"]')
    await emailInput.fill('priya@example.com')
    await page.locator('#waitlist').getByRole('button', { name: /join|waitlist|reserve/i }).click()
    await expect(page.getByText(/something went wrong|try again|galat/i)).toBeVisible({ timeout: 5000 })
  })

  test('shows loading state during submission', async ({ page }) => {
    // Slow route to catch loading state
    await page.route('/api/waitlist', async route => {
      await new Promise(r => setTimeout(r, 1000))
      await route.fulfill({ status: 200, contentType: 'application/json',
        body: JSON.stringify({ success: true, message: "You're on the list!" }) })
    })
    const emailInput = page.locator('#waitlist input[type="email"]')
    await emailInput.fill('priya@example.com')
    const submitBtn = page.locator('#waitlist').getByRole('button', { name: /join|waitlist|reserve/i })
    await submitBtn.click()
    // Button should be disabled or show loading during request
    const isDisabled = await submitBtn.isDisabled()
    const hasLoadingText = /loading|submitting|please wait/i.test(await submitBtn.textContent() ?? '')
    const hasAriaBusy = await submitBtn.getAttribute('aria-busy') === 'true'
    expect(isDisabled || hasLoadingText || hasAriaBusy).toBe(true)
  })
})

test.describe('Feature Cards', () => {
  test('all 6 feature cards render', async ({ page }) => {
    await page.goto('/')
    await page.locator('#features').scrollIntoViewIfNeeded()
    const cards = page.locator('#features [data-testid="feature-card"]')
    await expect(cards).toHaveCount(6)
  })

  test('mood card has identical visual treatment to BP card', async ({ page }) => {
    await page.goto('/')
    await page.locator('#features').scrollIntoViewIfNeeded()

    const bpCard = page.locator('[data-testid="feature-card-bp"]')
    const moodCard = page.locator('[data-testid="feature-card-mood"]')

    await expect(bpCard).toBeVisible()
    await expect(moodCard).toBeVisible()

    // Compare computed styles — must be identical for mental health parity
    const bpStyles = await bpCard.evaluate((el) => {
      const cs = window.getComputedStyle(el)
      return { bg: cs.backgroundColor, radius: cs.borderRadius, padding: cs.padding }
    })
    const moodStyles = await moodCard.evaluate((el) => {
      const cs = window.getComputedStyle(el)
      return { bg: cs.backgroundColor, radius: cs.borderRadius, padding: cs.padding }
    })

    expect(bpStyles.bg).toBe(moodStyles.bg)
    expect(bpStyles.radius).toBe(moodStyles.radius)
    expect(bpStyles.padding).toBe(moodStyles.padding)
  })

  test('mood card text contains no stigmatizing language', async ({ page }) => {
    await page.goto('/')
    await page.locator('#features').scrollIntoViewIfNeeded()
    const moodCard = page.locator('[data-testid="feature-card-mood"]')
    const text = (await moodCard.textContent() ?? '').toLowerCase()
    const forbidden = ['depression', 'disorder', 'mental illness', 'psychiatric', 'anxiety disorder']
    for (const word of forbidden) {
      expect(text).not.toContain(word)
    }
  })
})

test.describe('Pricing', () => {
  test('both pricing tiers render with correct prices', async ({ page }) => {
    await page.goto('/')
    await page.locator('#pricing').scrollIntoViewIfNeeded()
    await expect(page.getByText('₹299')).toBeVisible()
    await expect(page.getByText('₹599')).toBeVisible()
  })
})

test.describe('FAQ', () => {
  test('FAQ items are collapsed by default', async ({ page }) => {
    await page.goto('/')
    await page.locator('#faq').scrollIntoViewIfNeeded()
    const firstAnswer = page.locator('#faq [data-radix-accordion-content]').first()
    // Radix accordion content is hidden when collapsed
    const isHidden = await firstAnswer.evaluate(el =>
      el.getAttribute('data-state') === 'closed' || window.getComputedStyle(el).display === 'none' || el.clientHeight === 0
    )
    expect(isHidden).toBe(true)
  })

  test('clicking FAQ item expands it', async ({ page }) => {
    await page.goto('/')
    await page.locator('#faq').scrollIntoViewIfNeeded()
    const firstTrigger = page.locator('#faq button[data-radix-accordion-trigger]').first()
    await firstTrigger.click()
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
  })

  test('clicking expanded FAQ item collapses it', async ({ page }) => {
    await page.goto('/')
    await page.locator('#faq').scrollIntoViewIfNeeded()
    const firstTrigger = page.locator('#faq button[data-radix-accordion-trigger]').first()
    await firstTrigger.click()
    await firstTrigger.click()
    await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
  })
})

test.describe('Mobile Layout', () => {
  test.use({ viewport: { width: 360, height: 812 } })

  test('hamburger menu is visible at 360px', async ({ page }) => {
    await page.goto('/')
    const hamburger = page.getByRole('button', { name: /menu|open navigation/i })
    await expect(hamburger).toBeVisible()
  })

  test('hero h1 is readable at 360px (min 20px font size)', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1').first()
    const fontSize = await h1.evaluate(el => parseFloat(window.getComputedStyle(el).fontSize))
    expect(fontSize).toBeGreaterThanOrEqual(20)
  })
})
