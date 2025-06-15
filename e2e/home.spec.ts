import { test, expect } from '@playwright/test';

test('homepage has call to action', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Ready to Start Contributing?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start Exploring' })).toBeVisible();
});
