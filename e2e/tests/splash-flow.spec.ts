import { test, expect } from '../fixtures/base.fixture';
import { GlobePage } from '../page-objects/GlobePage';
import { DisclaimerPage } from '../page-objects/DisclaimerPage';

test.describe('Globe & Disclaimer Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('initial load renders globe and language flags', async ({ page }) => {
    const globe = new GlobePage(page);

    await expect(globe.worldImage).toBeVisible();
    await expect(page.locator('img[alt="English"]')).toBeVisible();
    await expect(page.locator('img[alt="Deutsch"]')).toBeVisible();
    await expect(page.locator('img[alt="Español"]')).toBeVisible();
    await expect(page.locator('img[alt="Türkçe"]')).toBeVisible();
    await expect(page.locator('img[alt="French"]')).toBeVisible();
  });

  test('clicking a flag navigates to disclaimer page', async ({ page }) => {
    const globe = new GlobePage(page);
    const disclaimer = new DisclaimerPage(page);

    await globe.goto();
    await globe.selectLocale('en');

    await expect(page).toHaveURL(/\/disclaimer/);
    await expect(disclaimer.logo).toBeVisible();
  });

  test('disclaimer shows localized text for selected locale', async ({ page }) => {
    const globe = new GlobePage(page);

    await globe.goto();
    await globe.selectLocale('de');

    await expect(page).toHaveURL(/\/disclaimer/);
    await expect(page.getByText(/nicht diagnostisches Bildungswerkzeug/i)).toBeVisible();
  });

  test('disclaimer Continue button is disabled initially', async ({ page }) => {
    const globe = new GlobePage(page);
    const disclaimer = new DisclaimerPage(page);

    await globe.goto();
    await globe.selectLocale('en');
    await expect(disclaimer.continueButton).toBeDisabled();
  });

  test('accepting disclaimer enables Continue button', async ({ page }) => {
    const globe = new GlobePage(page);
    const disclaimer = new DisclaimerPage(page);

    await globe.goto();
    await globe.selectLocale('en');
    await disclaimer.acceptDisclaimer();
    await expect(disclaimer.continueButton).toBeEnabled();
  });

  test('Continue navigates to checkup flow', async ({ page }) => {
    const globe = new GlobePage(page);
    const disclaimer = new DisclaimerPage(page);

    await globe.goto();
    await globe.selectLocale('en');
    await disclaimer.acceptDisclaimer();
    await disclaimer.clickContinue();

    await expect(page).toHaveURL(/\/checkup/);
  });

  test('back arrow from disclaimer returns to globe', async ({ page }) => {
    const globe = new GlobePage(page);
    const disclaimer = new DisclaimerPage(page);

    await globe.goto();
    await globe.selectLocale('en');
    await expect(page).toHaveURL(/\/disclaimer/);

    await disclaimer.clickBack();
    await expect(page).toHaveURL('/');
    await expect(globe.worldImage).toBeVisible();
  });
});
