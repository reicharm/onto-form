import { test, expect } from '@playwright/test'

test.describe('Wizard mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads and shows the app header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('DCAT-AP')
  })

  test('wizard mode is active by default', async ({ page }) => {
    // The wizard mode toggle button should show the option to switch to single page
    const toggleBtn = page.locator('.btn-mode-toggle')
    await expect(toggleBtn).toBeVisible()
  })

  test('can toggle between wizard and single-page mode', async ({ page }) => {
    const toggleBtn = page.locator('.btn-mode-toggle')
    const initialText = await toggleBtn.textContent()
    await toggleBtn.click()
    const newText = await toggleBtn.textContent()
    expect(newText).not.toBe(initialText)
  })

  test('can switch language to English', async ({ page }) => {
    const enBtn = page.locator('.lang-toggle button', { hasText: 'EN' })
    await enBtn.click()
    await expect(enBtn).toHaveClass(/active/)
  })

  test('can switch language to German', async ({ page }) => {
    const deBtn = page.locator('.lang-toggle button', { hasText: 'DE' })
    await deBtn.click()
    await expect(deBtn).toHaveClass(/active/)
  })

  test('standard selector is visible', async ({ page }) => {
    await expect(page.locator('.header-controls')).toBeVisible()
  })
})
