import type { Page } from '@playwright/test';

export class DisclaimerPage {
  readonly page: Page;
  readonly logo;
  readonly disclaimerCheckbox;
  readonly continueButton;
  readonly backArrow;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('img[alt="Weetell"]').first();
    this.disclaimerCheckbox = page.getByText(/I understand this is a|Ich verstehe, dass dies ein|Entiendo que esta es una|Bu eğitimsel bir araç/i);
    this.continueButton = page.getByRole('button', { name: /continue|weiter|continuar|devam/i });
    this.backArrow = page.locator('button[aria-label="Back"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/disclaimer');
  }

  async acceptDisclaimer(): Promise<void> {
    await this.disclaimerCheckbox.click();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickBack(): Promise<void> {
    await this.backArrow.click();
  }

  async isContinueDisabled(): Promise<boolean> {
    return await this.continueButton.isDisabled();
  }
}
