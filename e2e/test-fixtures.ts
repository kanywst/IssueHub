import { test as base } from '@playwright/test';
import { login } from './helpers/auth';

// Extend the basic test type to include custom fixtures
export const test = base.extend({
  // Add a fixture to create an authenticated session
  authenticatedPage: async ({ page }, use) => {
    // Mock the authentication for testing
    await login(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
