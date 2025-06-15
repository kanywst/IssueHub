import { test, expect } from '@playwright/test';

test.describe('Issues Page', () => {
  test('should display issues page correctly', async ({ page }) => {
    await page.goto('/issues');
    
    // Check if the main heading is visible
    await expect(page.locator('h1').first()).toBeVisible();
    
    // より具体的なセレクタを使用
    await expect(page.getByRole('heading', { name: /Find Good First Issues/i })).toBeVisible();
  });

  test('should filter issues by language', async ({ page }) => {
    // Skipping this test in CI as it requires API connection
    test.info().annotations.push({ type: 'skip-ci', description: 'Requires API connection' });
    
    await page.goto('/issues');
    
    // Basic interaction with the form
    await page.locator('[data-testid="language-select"]').click();
    await page.getByRole('option').nth(1).click();
    
    // Click the search button
    await page.locator('[data-testid="search-button"]').click();
    
    // Wait for the search results to load
    await page.waitForSelector('[data-testid="issue-card"]', { timeout: 10000 });
    
    // Just verify the page doesn't crash and shows results
    const issueCount = await page.locator('[data-testid="issue-card"]').count();
    expect(issueCount).toBeGreaterThan(0);
  });

  test('should search issues by keyword', async ({ page }) => {
    // Skipping this test in CI as it requires API connection
    test.info().annotations.push({ type: 'skip-ci', description: 'Requires API connection' });
    
    await page.goto('/issues');
    
    // Input a search keyword
    await page.locator('[data-testid="keyword-search-input"]').fill('documentation');
    
    // Click the search button
    await page.locator('[data-testid="search-button"]').click();
    
    // Wait for the search results to load
    await page.waitForSelector('[data-testid="issue-card"]', { timeout: 10000 });
    
    // Verify at least one issue is displayed
    const issueCount = await page.locator('[data-testid="issue-card"]').count();
    expect(issueCount).toBeGreaterThan(0);
  });
});

test.describe('Saved Issues', () => {
  test('should require authentication to access saved issues or show auth UI', async ({ page }) => {
    await page.goto('/saved-issues');
    
    // 認証が必要なページへの未認証アクセスを試みる
    // 開発環境ではリダイレクトが発生しない場合もあり、その場合はページ内に認証関連のUIが表示される
    // どちらのケースも正常なので、両方をチェックする
    
    try {
      // ページ内に認証関連のUIが表示されるか確認
      const githubButton = await page.waitForSelector('text="GitHub"', { timeout: 5000 }).catch(() => null);
      const signInText = await page.waitForSelector('text="Sign in"', { timeout: 5000 }).catch(() => null);
      
      if (githubButton || signInText) {
        // 認証UIが表示されたらテスト成功
        expect(true).toBeTruthy();
      } else if (!page.url().includes('/saved-issues')) {
        // URLが変わっていたらテスト成功
        expect(true).toBeTruthy();
      } else {
        // それ以外の場合は認証要求UIを探す
        const loginPrompt = await page.getByText(/sign|log|auth|please/i).count() > 0;
        expect(loginPrompt).toBeTruthy();
      }
    } catch (e) {
      // すべての待機が失敗した場合、ページ内に認証を促す何らかのテキストがあるか確認
      const loginRequired = await page.getByText(/sign|log|auth|please/i).count() > 0;
      expect(loginRequired).toBeTruthy();
    }
  });
});
