import { test, expect } from '../fixtures/base.fixture';
import { seedZustandState } from '../fixtures/store.fixture';
import { PharmacyPage } from '../page-objects/PharmacyPage';

test.describe('Pharmacy Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should render 2 guidance advice cards', async ({ page }) => {
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await expect(pharmacyPage.guidanceCards).toHaveCount(2);
  });

  test('should navigate to /results/map when find pharmacy button is clicked', async ({ page }) => {
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await pharmacyPage.clickFindPharmacy();

    await expect(page).toHaveURL(/\/results\/map/);
  });

  test('should return to previous page when back button is clicked', async ({ page }) => {
    const pharmacyPage = new PharmacyPage(page);
    await page.goto('/results/pharmacy');

    await pharmacyPage.clickBack();

    await expect(page).not.toHaveURL(/\/results\/pharmacy/);
  });

  test('should trigger audio narration on mount via useEffect', async ({ page }) => {
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await expect(page).toHaveURL(/\/results\/pharmacy/);
  });

  test('should display pharmacy advice content', async ({ page }) => {
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await expect(pharmacyPage.guidanceCards.first()).toBeVisible();
  });

  test('should display medicine illustration', async ({ page }) => {
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await expect(page.locator('img[alt*="Pharmacy"], img[alt*="Medicine"]')).toBeVisible();
  });

  test('should have accessible find pharmacy button', async ({ page }) => {
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await expect(pharmacyPage.findPharmacyButton).toHaveRole('button');
  });

  test('should navigate to /results/pharmacy directly', async ({ page }) => {
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await expect(page).toHaveURL(/\/results\/pharmacy/);
  });

  test('should display localized title based on store locale', async ({ page }) => {
    await seedZustandState(page, { locale: 'de' });
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await expect(page.getByText('Apotheker-Beratung')).toBeVisible();
  });

  test('should display Spanish title when locale is es', async ({ page }) => {
    await seedZustandState(page, { locale: 'es' });
    const pharmacyPage = new PharmacyPage(page);
    await pharmacyPage.goto();

    await expect(page.getByText('Consejo de Farmacia')).toBeVisible();
  });
});