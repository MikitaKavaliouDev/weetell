import type { Page, Locator } from '@playwright/test';

export class ServicePage {
  readonly page: Page;
  readonly backButton: Locator;
  readonly locationButton: Locator;
  readonly medicineButton: Locator;
  readonly headerLogo: Locator;
  readonly videoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backButton = this.page.locator('button').filter({ has: this.page.locator('svg') }).first();
    this.locationButton = this.page.locator('button').filter({ has: this.page.locator('img[alt*="Location"]') }).first();
    this.medicineButton = this.page.locator('button').filter({ has: this.page.locator('img[alt*="Medicine"]') }).first();
    this.headerLogo = this.page.locator('img[alt*="Weetell"], svg').first();
    this.videoButton = this.page.locator('button').filter({ has: this.page.locator('svg') }).nth(1);
  }

  async goto(): Promise<void> {
    await this.page.goto('/results/service');
  }

  async clickBack(): Promise<void> {
    await this.backButton.click();
  }

  async clickLocation(): Promise<void> {
    await this.locationButton.click();
  }

  async clickMedicine(): Promise<void> {
    await this.medicineButton.click();
  }
}