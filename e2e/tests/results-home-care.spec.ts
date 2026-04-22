import { test, expect } from '../fixtures/base.fixture';
import { seedZustandState } from '../fixtures/store.fixture';
import { HomeCarePage } from '../page-objects/HomeCarePage';

test.describe('Home Care Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display current temperature from store', async ({ page }) => {
    await seedZustandState(page, { severity: 38.5 });
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await expect(page.getByText('38.5°C')).toBeVisible();
  });

  test('should render 4 care instruction cards', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await expect(homeCarePage.careTipCards).toHaveCount(4);
  });

  test('should display amber warning box with warning signs list', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await expect(page.locator('.bg-amber-50').first()).toBeVisible();
    await expect(homeCarePage.warningSigns).toHaveCount(4);
  });

  test('should open video modal when video button is clicked', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await homeCarePage.clickVideo();

    await expect(page.locator('[class*="fixed"]').first()).toBeVisible();
  });

  test('should navigate to /results/pharmacy when pharmacy advice button is clicked', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await homeCarePage.clickPharmacyAdvice();

    await expect(page).toHaveURL(/\/results\/pharmacy/);
  });

  test('should navigate to /results when find doctor button is clicked', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await homeCarePage.clickFindDoctor();

    await expect(page).toHaveURL(/\/results$/);
  });

  test('should navigate to /checkup?step=age when re-assess link is clicked', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await homeCarePage.clickReAssess();

    await expect(page).toHaveURL(/\/checkup\?step=age/);
  });

  test('should return to previous page when back button is clicked', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await page.goto('/results/home-care');

    await homeCarePage.clickBack();

    await expect(page).not.toHaveURL(/\/results\/home-care/);
  });

  test('should display care tip icons', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await expect(page.locator('.bg-\\[\\#10B981\\]\\/10 svg').first()).toBeVisible();
  });

  test('should display warning signs in localized text', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await expect(page.getByText(/Stiff neck|Difficulty breathing|Rash|Seizures/i).first()).toBeVisible();
  });

  test('should have accessible back button', async ({ page }) => {
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await expect(homeCarePage.backButton).toHaveRole('button');
  });

  test('should display temperature with thermometer icon', async ({ page }) => {
    await seedZustandState(page, { severity: 39.0 });
    const homeCarePage = new HomeCarePage(page);
    await homeCarePage.goto();

    await expect(page.getByText(/39.*°C/)).toBeVisible();
    await expect(page.locator('svg').first()).toBeVisible();
  });
});