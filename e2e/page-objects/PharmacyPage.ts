import type { Page, Locator } from '@playwright/test';

export class PharmacyPage {
  readonly page: Page;
  readonly backButton: Locator;
  readonly findPharmacyButton: Locator;
  readonly guidanceCards: Locator;
  readonly subtitleText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backButton = this.page.locator('button').filter({ has: this.page.locator('svg') }).first();
    this.findPharmacyButton = this.page.getByRole('button', { name: /find a pharmacy|apotheke|Encontrar una Farmacia|Eczane Bul/i });
    this.guidanceCards = this.page.locator('.bg-slate-50.p-4.rounded-2xl');
    this.subtitleText = this.page.locator('[aria-live="polite"], text=/pharmacist|apotheker|farmacéutico|eczacı/i');
  }

  async goto(): Promise<void> {
    await this.page.goto('/results/pharmacy');
  }

  async clickBack(): Promise<void> {
    await this.backButton.click();
  }

  async clickFindPharmacy(): Promise<void> {
    await this.findPharmacyButton.click();
  }
}