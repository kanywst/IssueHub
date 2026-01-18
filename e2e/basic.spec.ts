import { test, expect } from '@playwright/test';

test('basic navigation and homepage content', async ({ page }) => {
  await page.goto('/');

  // Check the title
  await expect(page).toHaveTitle(/IssueHub/);

  // Check for the main heading
  await expect(page.getByRole('heading', { name: /Contribute to/i })).toBeVisible();

  // Scope the "Open Source" check to the main heading to avoid matching other occurrences (footer, features, etc.)
  await expect(page.locator('h1').getByText(/Open Source/i)).toBeVisible();

  // Check if "Start Exploring" button exists  const exploreButton = page.getByRole('link', { name: /Start Exploring/i });
  await expect(exploreButton).toBeVisible();
});

test('navigation to issues page', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('link', { name: /Issues/i })
    .first()
    .click();

  await expect(page).toHaveURL(/\/issues/);
  await expect(page.getByRole('heading', { name: /Explore Issues/i })).toBeVisible();
});

test('navigation to about page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /About/i }).click();

  await expect(page).toHaveURL(/\/about/);
});
