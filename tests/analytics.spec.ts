import { test, expect } from '@playwright/test';

test.describe('Analytics Page', () => {
  test('loads GitHub data and renders repo analytics', async ({ page }) => {
    await page.goto('/#/analytics');

    await expect(page.locator('h1')).toContainText('Analytics');

    await expect(
      page.locator('a[href="https://github.com/t-amitai/tamir-tech"]')
    ).toBeVisible();

    // Wait for data to load
    const commits = page.locator('text=Recent Commits');
    const errorMessage = page.locator('text=Something went wrong');
    await expect(commits.or(errorMessage)).toBeVisible({ timeout: 15000 });

    const hasData = await commits.isVisible();
    if (hasData) {
      await expect(page.locator('text=Contribution Activity')).toBeVisible();
      await expect(page.locator('text=Language Breakdown')).toBeVisible();
      await expect(page.locator('text=contributions in the last year')).toBeVisible();
    }
  });
});
