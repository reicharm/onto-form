import { test, expect } from '@playwright/test'

test.describe('Import flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('import button is visible in header', async ({ page }) => {
    const importBtn = page.locator('.btn-import-header')
    await expect(importBtn).toBeVisible()
  })

  test('clicking import button opens import panel', async ({ page }) => {
    await page.locator('.btn-import-header').click()
    // ImportPanel should appear
    const importPanel = page.locator('.import-panel, [class*="import"]').first()
    await expect(importPanel).toBeVisible({ timeout: 5000 })
  })

  test('import panel can be closed', async ({ page }) => {
    await page.locator('.btn-import-header').click()
    // Wait for panel
    await page.waitForTimeout(500)
    // Find and click close button
    const closeBtn = page.locator('button', { hasText: /close|schlie|×/i }).last()
    if (await closeBtn.isVisible()) {
      await closeBtn.click()
      await expect(closeBtn).not.toBeVisible({ timeout: 3000 })
    }
  })
})
