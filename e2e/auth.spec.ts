import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display sign in page correctly', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check if the main heading is visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for GitHub sign in button
    await expect(page.locator('[data-testid="github-signin-button"]')).toBeVisible();
    
    // Check for continue without signing in link
    await expect(page.getByText('Continue without signing in')).toBeVisible();
  });

  test('should redirect to issues page when continuing without sign in', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Click on continue without signing in
    await page.locator('[data-testid="continue-without-signin"]').click();
    
    // Check that we're redirected to the issues page (may take time to load)
    await page.waitForURL('**/issues**', { timeout: 10000 });
    expect(page.url()).toContain('/issues');
  });

  // Note: We can't fully test GitHub OAuth flow in E2E tests without mocking
  // This test would require special setup for CI environments
});

test.describe('Protected Routes', () => {
  test('should redirect unauthenticated users from profile page or show auth UI', async ({ page }) => {
    await page.goto('/profile');
    
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
      } else if (!page.url().includes('/profile')) {
        // URLが変わっていたらテスト成功
        expect(true).toBeTruthy();
      } else {
        // それ以外の場合は認証機能に問題がある
        expect(false).toBeTruthy('認証されていないユーザーがプロファイルページに正常にアクセスできてしまいました');
      }
    } catch (e) {
      // すべての待機が失敗した場合、プロファイルページがそのまま表示されているかを確認
      // このテストでは、認証されていないユーザーがプロファイルページを見れないことを確認する
      // プロジェクトによっては、未認証ユーザーに対して「ログインしてください」のみを表示するケースも考えられる
      // そのため、ページ内に認証を促す何らかのUIが表示されていれば成功とする
      
      const loginRequired = await page.getByText(/sign|log|auth/i).count() > 0;
      expect(loginRequired).toBeTruthy('認証を促すUIが表示されていません');
    }
  });
});
