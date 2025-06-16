import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should display sign in page correctly", async ({ page }) => {
    await page.goto("/auth/signin");

    // Check if the main heading is visible
    await expect(page.locator("h1")).toBeVisible();

    // Check for GitHub sign in button
    await expect(
      page.locator('[data-testid="github-signin-button"]'),
    ).toBeVisible();

    // Check for continue without signing in link
    await expect(page.getByText("Continue without signing in")).toBeVisible();
  });

  test("should redirect to issues page when continuing without sign in", async ({
    page,
  }) => {
    await page.goto("/auth/signin");

    // Click on continue without signing in
    await page.locator('[data-testid="continue-without-signin"]').click();

    // Check that we're redirected to the issues page (may take time to load)
    await page.waitForURL("**/issues**", { timeout: 10000 });
    expect(page.url()).toContain("/issues");
  });

  // Note: We can't fully test GitHub OAuth flow in E2E tests without mocking
  // This test would require special setup for CI environments
});

test.describe("Protected Routes", () => {
  test("should redirect unauthenticated users from profile page or show auth UI", async ({
    page,
  }) => {
    await page.goto("/profile");

    // Attempting to access a protected page without authentication
    // In development environment, redirection might not occur, and auth UI could be displayed instead
    // Both cases are valid, so we check for both

    try {
      // Check if authentication UI is displayed
      const githubButton = await page
        .waitForSelector('text="GitHub"', { timeout: 5000 })
        .catch(() => null);
      const signInText = await page
        .waitForSelector('text="Sign in"', { timeout: 5000 })
        .catch(() => null);

      if (githubButton || signInText) {
        // Test passes if auth UI is displayed
        expect(true).toBeTruthy();
      } else if (!page.url().includes("/profile")) {
        // Test passes if URL has changed (redirection occurred)
        expect(true).toBeTruthy();
      } else {
        // Otherwise, there's an issue with authentication
        expect(false).toBeTruthy(
          "Unauthenticated user was able to access profile page",
        );
      }
    } catch (e) {
      // If all waits fail, check if the profile page is still displayed
      // This test verifies that unauthenticated users cannot see the profile page
      // Some projects might display only a "Please login" message to unauthenticated users
      // So the test passes if any authentication-related UI is shown

      const loginRequired =
        (await page.getByText(/sign|log|auth/i).count()) > 0;
      expect(loginRequired).toBeTruthy(
        "No authentication prompt UI is displayed",
      );
    }
  });
});
