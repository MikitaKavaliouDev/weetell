import type { Page, Locator } from '@playwright/test';

export class HomeCarePage {
  readonly page: Page;
  readonly backButton: Locator;
  readonly videoButton: Locator;
  readonly pharmacyAdviceButton: Locator;
  readonly findDoctorButton: Locator;
  readonly reAssessLink: Locator;
  readonly temperatureDisplay: Locator;
  readonly careTipCards: Locator;
  readonly warningBox: Locator;
  readonly warningSigns: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backButton = this.page.locator('button').filter({ has: this.page.locator('svg') }).first();
    this.videoButton = this.page.getByRole('button', { name: /watch care video|pflegevideo|ver video|care video/i });
    this.pharmacyAdviceButton = this.page.getByRole('button', { name: /pharmacy advice|apotheken|consejo de farmacia|eczane/i });
    this.findDoctorButton = this.page.getByRole('button', { name: /find a doctor|jetzt arzt|encontrar un médico|doktor bul/i });
    this.reAssessLink = this.page.getByText(/re-assess|reevaluar|semptomları|symptome/i);
    this.temperatureDisplay = this.page.locator('text=/\\d+°C|--/');
    this.careTipCards = this.page.locator('.bg-white.rounded-2xl.p-4').filter({ has: this.page.locator('svg') });
    this.warningBox = this.page.locator('.bg-amber-50, .bg-amber-100');
    this.warningSigns = this.warningBox.locator('li');
  }

  async goto(): Promise<void> {
    await this.page.goto('/results/home-care');
  }

  async clickBack(): Promise<void> {
    await this.backButton.click();
  }

  async clickVideo(): Promise<void> {
    await this.videoButton.click();
  }

  async clickPharmacyAdvice(): Promise<void> {
    await this.pharmacyAdviceButton.click();
  }

  async clickFindDoctor(): Promise<void> {
    await this.findDoctorButton.click();
  }

  async clickReAssess(): Promise<void> {
    await this.reAssessLink.click();
  }
}