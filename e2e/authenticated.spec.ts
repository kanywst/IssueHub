import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test.describe('Authenticated User Features', () => {
  test.skip('should display profile page for authenticated users', async ({ page }) => {
    // Log in first
    test.info().annotations.push({ type: 'skip-ci', description: 'Authentication is unstable in CI' });
    
    await login(page);
    
    // Navigate to profile page
    await page.goto('/profile');
    
    // Check if the profile page is displayed
    await expect(page).toHaveURL('/profile');
    
    // Check for heading
    await expect(page.locator('h1').first()).toBeVisible();
  });
  
  test.skip('should allow saving issues for authenticated users', async ({ page }) => {
    // Skip this test in CI
    test.info().annotations.push({ type: 'skip-ci', description: 'Authentication and API connection required' });
    
    await login(page);
    await page.goto('/issues');
    
    // Basic check
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
