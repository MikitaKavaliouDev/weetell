import type { Page } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;
  readonly searchButton;
  readonly clearButton;
  readonly categoryCards;
  readonly doctorCards;
  readonly backButton;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: /arzt suchen|search/i });
    this.clearButton = page.getByRole('button', { name: /clear/i });
    this.categoryCards = page.locator('button').filter({ has: page.locator('text=/Hausärzte|Gynäkologen|Orthopäden/i') });
    this.doctorCards = page.locator('.bg-white.p-5.rounded-3xl');
    this.backButton = page.locator('button').filter({ has: page.locator('svg') }).first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/results');
  }

  async clickSearch(): Promise<void> {
    await this.searchButton.click();
  }

  async clickClear(): Promise<void> {
    await this.clearButton.click();
  }

  async clickBack(): Promise<void> {
    await this.backButton.click();
  }

  async clickCategory(category: 'Hausärzte' | 'Gynäkologen' | 'Orthopäden'): Promise<void> {
    await this.page.getByText(category).click();
  }

  async clickDoctor(index: number = 0): Promise<void> {
    await this.doctorCards.nth(index).click();
  }

  async clickDoctorById(doctorId: string): Promise<void> {
    await this.page.locator(`[data-doctor-id="${doctorId}"]`).click();
  }

  async isResultsVisible(): Promise<boolean> {
    return await this.searchButton.isVisible();
  }
}
