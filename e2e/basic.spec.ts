import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main heading is visible
    await expect(page.locator('h1').filter({ hasText: 'Find Your First Step' })).toBeVisible();
    
    // Check for the Browse Issues button
    await expect(page.getByRole('link', { name: 'Browse Issues' })).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate to issues page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Browse Issues button using more specific selector
    await page.locator('[data-testid="nav-issues"]').click();
    
    // Check that we're on the issues page
    await expect(page).toHaveURL('/issues');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    // Click on About link in the header
    await page.getByRole('link', { name: 'About' }).click();
    
    // Check that we're on the about page
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1').filter({ hasText: 'About IssueHub' })).toBeVisible();
  });
});
