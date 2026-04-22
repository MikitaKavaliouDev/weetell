import { test, expect } from '../fixtures/base.fixture';
import { ServicePage } from '../page-objects/ServicePage';

test.describe('Service Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display location and medicine buttons on page load', async ({ page }) => {
    const servicePage = new ServicePage(page);
    await servicePage.goto();

    await expect(servicePage.locationButton).toBeVisible();
    await expect(servicePage.medicineButton).toBeVisible();
  });

  test('should navigate to /results/consult when location button is clicked', async ({ page }) => {
    const servicePage = new ServicePage(page);
    await servicePage.goto();

    await servicePage.clickLocation();

    await expect(page).toHaveURL(/\/results\/consult/);
  });

  test('should navigate to /results/pharmacy when medicine button is clicked', async ({ page }) => {
    const servicePage = new ServicePage(page);
    await servicePage.goto();

    await servicePage.clickMedicine();

    await expect(page).toHaveURL(/\/results\/pharmacy/);
  });

  test('should navigate back to /results when back button is clicked', async ({ page }) => {
    await page.goto('/results');
    await page.goto('/results/service');
    const servicePage = new ServicePage(page);

    await servicePage.clickBack();

    await expect(page).toHaveURL(/\/results/);
  });

  test('should display WeeHeaderLogo in header', async ({ page }) => {
    const servicePage = new ServicePage(page);
    await servicePage.goto();

    await expect(servicePage.headerLogo).toBeVisible();
  });

  test('should have accessible buttons for location and medicine', async ({ page }) => {
    const servicePage = new ServicePage(page);
    await servicePage.goto();

    await expect(servicePage.locationButton).toHaveRole('button');
    await expect(servicePage.medicineButton).toHaveRole('button');
  });

  test('should navigate to /results/service directly', async ({ page }) => {
    const servicePage = new ServicePage(page);
    await servicePage.goto();

    await expect(page).toHaveURL(/\/results\/service/);
  });

  test('should display both circular action buttons with icons', async ({ page }) => {
    const servicePage = new ServicePage(page);
    await servicePage.goto();

    await expect(page.locator('button.rounded-full')).toHaveCount(2);
    await expect(servicePage.locationButton).toBeVisible();
    await expect(servicePage.medicineButton).toBeVisible();
  });

  test('should have video play button visible in footer', async ({ page }) => {
    const servicePage = new ServicePage(page);
    await servicePage.goto();

    await expect(servicePage.videoButton).toBeVisible();
  });
});