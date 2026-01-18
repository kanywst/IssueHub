import { test, expect } from '@playwright/test';

test('issue search and library save flow', async ({ page }) => {
  // Go to issues page
  await page.goto('/issues');

  // Wait for issues to load (using a reasonable timeout)
  await expect(page.getByTestId('keyword-search-input')).toBeVisible();

  // Search for "react"
  await page.getByTestId('keyword-search-input').fill('react');
  await page.getByTestId('search-button').click();

  // Since we are using real API, we just check if some issues appear
  // (In a more robust test, we would mock the API response)
  await expect(page.locator('role=link[name*="react" i]').first()).toBeVisible({ timeout: 15000 });

  // Save the first issue to library
  const firstIssueCard = page.locator('div[class*="MuiPaper-root"]').first();
  const saveButton = firstIssueCard.locator('button').first();

  await saveButton.click();

  // Verify snackbar appears
  await expect(page.getByText(/Saved to library/i)).toBeVisible();

  // Navigate to Saved Issues page
  await page
    .getByRole('link', { name: /Saved Issues/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/saved-issues/);

  // Verify the issue is in the saved issues list
  await expect(page.getByTestId('issue-card')).toBeVisible();

  // Remove the issue
  await page.getByTestId('remove-button').first().click();

  // Verify list is empty
  await expect(page.getByText(/You haven't saved any issues yet/i)).toBeVisible();
});
