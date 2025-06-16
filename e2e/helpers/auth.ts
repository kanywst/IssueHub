import { Page } from '@playwright/test';

/**
 * Helper to mock authentication for E2E tests
 * This simulates a logged in user without requiring actual GitHub OAuth
 */
export async function login(page: Page) {
  // Store a mock session in localStorage
  await page.goto('/');

  // Inject a mock session directly into NextAuth's storage
  await page.evaluate(() => {
    const mockSession = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        image: 'https://github.com/github.png',
        id: 'test-user-id',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    };

    // NextAuth stores session in different ways depending on the version and configuration
    window.localStorage.setItem('next-auth.session-token', JSON.stringify(mockSession));
    window.localStorage.setItem('next-auth.callback-url', 'http://localhost:3000');
    window.sessionStorage.setItem('next-auth.session-token', JSON.stringify(mockSession));

    // Add a cookie as well for more complete mocking
    document.cookie = `next-auth.session-token=${JSON.stringify(mockSession)}; path=/; max-age=86400`;
  });

  // Refresh to apply the session
  await page.reload();
}
