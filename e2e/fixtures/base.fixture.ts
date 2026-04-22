import { test, expect, Page } from '@playwright/test';

export { test, expect };

export const baseFixture = {
  beforeEachHook: async ({ page }: { page: Page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  },

  afterEachHook: async ({ page }: { page: Page }, testInfo: { status?: string }) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({ fullPage: true, timeout: 5000 }).catch(() => null);
    }
  },
};

export function createTest(
  title: string,
  fn: (args: { page: Page }) => Promise<void>
) {
  return test(title, async ({ page }) => {
    await baseFixture.beforeEachHook({ page });
    try {
      await fn({ page });
    } catch (error) {
      await baseFixture.afterEachHook({ page }, { status: 'failed' });
      throw error;
    }
  });
}