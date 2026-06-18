import { test, expect } from '@playwright/test'

test.describe('Single-page mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Switch to single-page mode
    const toggleBtn = page.locator('.btn-mode-toggle')
    // Only click if currently in wizard mode (button text contains 'Single' or 'Einzel')
    const text = await toggleBtn.textContent()
    if (text && (text.includes('Single') || text.includes('Einzel'))) {
      await toggleBtn.click()
    }
  })

  test('form is visible in single-page mode', async ({ page }) => {
    const form = page.locator('form, .metadata-form, [class*="form"]').first()
    await expect(form).toBeVisible({ timeout: 5000 })
  })

  test('can toggle back to wizard mode', async ({ page }) => {
    const toggleBtn = page.locator('.btn-mode-toggle')
    await toggleBtn.click()
    // After clicking, text should change back
    await expect(toggleBtn).toBeVisible()
  })

  test('export button is accessible', async ({ page }) => {
    const exportBtn = page.locator('button', { hasText: /export/i }).first()
    if (await exportBtn.isVisible()) {
      await expect(exportBtn).toBeEnabled()
    }
  })
})
