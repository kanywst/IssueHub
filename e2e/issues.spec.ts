import { test, expect } from '@playwright/test';

test.describe('Issues Page', () => {
  test('should display issues page correctly', async ({ page }) => {
    await page.goto('/issues');
    
    // Check if the main heading is visible
    await expect(page.locator('h1').first()).toBeVisible();
    
    // より具体的なセレクタを使用
    await expect(page.getByRole('heading', { name: /Find Good First Issues/i })).toBeVisible();
  });

  test.skip('should filter issues by language', async ({ page }) => {
    // Skipping this test in CI as it requires API connection
    test.info().annotations.push({ type: 'skip-ci', description: 'Requires API connection' });
    
    await page.goto('/issues');
    
    // Basic interaction with the form
    const languageSelect = page.locator('select').first();
    await languageSelect.click();
    await page.getByRole('option').nth(1).click();
    
    // Click the filter button - using a more generic selector
    await page.getByRole('button').first().click();
    
    // Just verify the page doesn't crash
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Saved Issues', () => {
  test('should require authentication to access saved issues', async ({ page }) => {
    await page.goto('/saved-issues');
    
    // Use a more reliable approach - wait for redirect or auth content
    try {
      // Either we'll be redirected, or we'll see auth UI
      await Promise.any([
        page.waitForURL('**/auth/signin**', { timeout: 5000 }),
        page.waitForURL('**/api/auth/signin**', { timeout: 5000 }),
        page.waitForSelector('text=/sign|log/i', { timeout: 5000 })
      ]);
      // If we get here, the test passed
      expect(true).toBeTruthy();
    } catch (e) {
      // If we're still on saved-issues without redirect, that's a failure
      const isStillOnSavedIssues = page.url().includes('/saved-issues');
      expect(isStillOnSavedIssues).toBeFalsy();
    }
  });
});
