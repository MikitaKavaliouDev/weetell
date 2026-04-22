import { test, expect } from '../fixtures/base.fixture';
import { SplashPage } from '../page-objects/SplashPage';

test.describe('Splash Page Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('initial load renders logo, disclaimer unchecked, and Continue disabled', async ({ page }) => {
    const splashPage = new SplashPage(page);

    await expect(splashPage.logo).toBeVisible();
    await expect(splashPage.disclaimerIndicator).toBeVisible();
    await expect(splashPage.continueButton).toBeDisabled();
  });

  test('clicking checkbox enables Continue button', async ({ page }) => {
    const splashPage = new SplashPage(page);

    await expect(splashPage.continueButton).toBeDisabled();
    await splashPage.clickDisclaimer();
    await expect(splashPage.continueButton).toBeEnabled();
  });

  test('Continue button is disabled before accepting disclaimer', async ({ page }) => {
    const splashPage = new SplashPage(page);

    await expect(splashPage.continueButton).toBeDisabled();
    await expect(splashPage.continueButton).toHaveClass(/cursor-not-allowed/);
  });

  test('clicking audio-on button enables audio', async ({ page }) => {
    const splashPage = new SplashPage(page);

    await expect(splashPage.audioOnImage).toHaveClass(/opacity-100/);

    await splashPage.clickAudioOff();
    await expect(splashPage.audioOffImage).toHaveClass(/opacity-100/);
    await expect(splashPage.audioOnImage).toHaveClass(/opacity-30/);

    await splashPage.clickAudioOn();
    await expect(splashPage.audioOnImage).toHaveClass(/opacity-100/);
    await expect(splashPage.audioOffImage).toHaveClass(/opacity-30/);
  });

  test('clicking audio-off button disables audio', async ({ page }) => {
    const splashPage = new SplashPage(page);

    await splashPage.clickAudioOff();
    await expect(splashPage.audioOffImage).toHaveClass(/opacity-100/);
    await expect(splashPage.audioOnImage).toHaveClass(/opacity-30/);
  });

  test('audio is enabled by default', async ({ page }) => {
    const splashPage = new SplashPage(page);

    await expect(splashPage.audioOnImage).toHaveClass(/opacity-100/);
    await expect(splashPage.audioOffImage).toHaveClass(/opacity-30/);
  });

  test('navigation from splash to start works correctly', async ({ page }) => {
    const splashPage = new SplashPage(page);
    await splashPage.clickDisclaimer();
    await splashPage.clickContinue();
    await page.waitForURL('**/start');

    await expect(page).toHaveURL(/\/start/);
    await expect(page.locator('img[alt="World"]')).toBeVisible();
  });

  test('accept disclaimer and Continue navigates to start page', async ({ page }) => {
    const splashPage = new SplashPage(page);

    await splashPage.clickDisclaimer();
    await splashPage.clickContinue();

    await page.waitForURL('**/start');
    await expect(page.locator('.flex.flex-col.min-h-screen')).toBeVisible();
  });

  test('locale persists from splash to start page', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const store = localStorage.getItem('weetell-storage');
      let parsed: any = {};
      if (store) {
        try { parsed = JSON.parse(store); } catch {}
      }
      parsed.state = { ...parsed.state, locale: 'de' };
      localStorage.setItem('weetell-storage', JSON.stringify({
        state: parsed.state,
        version: 0
      }));
    });

    await page.reload();

    const splashPage = new SplashPage(page);
    await splashPage.clickDisclaimer();
    await splashPage.clickContinue();
    await page.waitForURL('**/start');

    await expect(page).toHaveURL(/\/start/);
  });

  test('back button from start returns to splash', async ({ page }) => {
    const splashPage = new SplashPage(page);

    await splashPage.clickDisclaimer();
    await splashPage.clickContinue();
    await page.waitForURL('**/start');

    await expect(page).toHaveURL(/\/start/);

    await page.goBack();
    await page.waitForURL('/');

    await expect(splashPage.logo).toBeVisible();
    await expect(splashPage.continueButton).toBeDisabled();
  });
});
