import { test, expect } from '../fixtures/base.fixture';
import { ResultsPage } from '../page-objects/ResultsPage';

test.describe('Results Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should show hero content with search button and category cards on initial load', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await expect(resultsPage.searchButton).toBeVisible();
    await expect(page.getByText('Hausärzte')).toBeVisible();
    await expect(page.getByText('Gynäkologen')).toBeVisible();
    await expect(page.getByText('Orthopäden')).toBeVisible();
  });

  test('should show results list and hide hero when search button is clicked', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await resultsPage.clickSearch();

    await expect(page.getByText(/\d+ Specialists found/)).toBeVisible();
    await expect(resultsPage.searchButton).not.toBeVisible();
  });

  test('should hide results list and show hero when clear button is clicked', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await resultsPage.clickSearch();
    await expect(page.getByText(/\d+ Specialists found/)).toBeVisible();

    await resultsPage.clickClear();

    await expect(resultsPage.searchButton).toBeVisible();
  });

  test('should trigger search when category card is clicked', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await resultsPage.clickCategory('Hausärzte');

    await expect(page.getByText(/\d+ Specialists found/)).toBeVisible();
  });

  test('should show doctor cards with rating, distance and availability', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await resultsPage.clickSearch();

    const firstDoctorCard = page.locator('.bg-white.p-5.rounded-3xl').first();
    await expect(firstDoctorCard.locator('svg').first()).toBeVisible();
    await expect(firstDoctorCard.getByText(/km/).first()).toBeVisible();
    await expect(firstDoctorCard.getByText(/Available Today/).first()).toBeVisible();
  });

  test('should navigate to service page when doctor card is clicked', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await resultsPage.clickSearch();
    await resultsPage.clickDoctor(0);

    await expect(page).toHaveURL(/\/results\/service/);
  });

  test('should return to previous page when back button is clicked', async ({ page }) => {
    await page.goto('/results');
    const resultsPage = new ResultsPage(page);

    await resultsPage.clickBack();

    await expect(page).not.toHaveURL(/\/results$/);
  });

  test('should return to initial state showing hero content after clearing search', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await expect(page.getByText('Oft gesucht')).toBeVisible();

    await resultsPage.clickSearch();
    await expect(page.getByText(/\d+ Specialists found/)).toBeVisible();

    await resultsPage.clickClear();

    await expect(page.getByText('Oft gesucht')).toBeVisible();
    await expect(resultsPage.searchButton).toBeVisible();
  });

  test('should have accessible aria labels on interactive elements', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await expect(resultsPage.searchButton).toHaveRole('button');
    await expect(resultsPage.backButton).toHaveRole('button');
  });

  test('should display category section with correct German labels', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await expect(page.getByText('Oft gesucht')).toBeVisible();
    await expect(page.getByText('Hausärzte')).toBeVisible();
    await expect(page.getByText('Gynäkologen')).toBeVisible();
    await expect(page.getByText('Orthopäden')).toBeVisible();
  });

  test('should navigate directly to /results page', async ({ page }) => {
    await page.goto('/results');

    await expect(page.getByText('Oft gesucht')).toBeVisible();
    await expect(page.getByText('Hausärzte')).toBeVisible();
  });

  test('should persist search state during navigation', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();

    await resultsPage.clickSearch();
    await expect(page.getByText(/\d+ Specialists found/)).toBeVisible();

    await resultsPage.clickDoctor(0);
    await expect(page).toHaveURL(/\/results\/service/);

    await page.goBack();
    await page.waitForURL(/\/results/);
  });
});