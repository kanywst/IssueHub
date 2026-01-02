import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage correctly', async ({ page }) => {
    await page.goto('/');

    // Check if the main heading is visible
    await expect(page.locator('h1').filter({ hasText: 'Contribute to' })).toBeVisible();

    // Check for the Start Exploring button
    await expect(page.getByRole('link', { name: 'Start Exploring' }).first()).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate to issues page', async ({ page, isMobile }) => {
    await page.goto('/');

    if (isMobile) {
      await page.goto('/issues');
    } else {
      await page.locator('[data-testid="nav-issues"]').click();
      // Wait for navigation to complete
      await page.waitForURL('**/issues');
    }

    // Check that we're on the issues page
    await expect(page).toHaveURL('/issues');
    await expect(page.getByRole('heading', { name: 'Explore Issues' })).toBeVisible();
  });

  test('should navigate to home page', async ({ page, isMobile }) => {
    await page.goto('/issues');

    if (isMobile) {
      await page.goto('/');
    } else {
      await page.locator('[data-testid="header-logo"]').click();
      // Wait for navigation to complete
      await page.waitForURL('**/');
    }

    // Check that we're on the home page
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1').filter({ hasText: 'Contribute to' })).toBeVisible();
  });
});
