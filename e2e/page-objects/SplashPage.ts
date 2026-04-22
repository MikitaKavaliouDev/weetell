import type { Page } from '@playwright/test';

export class SplashPage {
  readonly page: Page;
  readonly logo;
  readonly disclaimerCheckbox;
  readonly disclaimerIndicator;
  readonly continueButton;
  readonly audioOnButton;
  readonly audioOffButton;
  readonly audioOnImage;
  readonly audioOffImage;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('img[alt="Weetell"]').first();
    this.disclaimerCheckbox = page.getByTestId('disclaimer-checkbox');
    this.disclaimerIndicator = page.getByTestId('disclaimer-checkbox-indicator');
    this.continueButton = page.getByRole('button', { name: /continue|weiter|continuar|devam/i });
    this.audioOnButton = page.getByTestId('audio-on-button');
    this.audioOffButton = page.getByTestId('audio-off-button');
    this.audioOnImage = this.audioOnButton.locator('img');
    this.audioOffImage = this.audioOffButton.locator('img');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async acceptDisclaimer(): Promise<void> {
    await this.disclaimerCheckbox.click();
  }

  async clickDisclaimer(): Promise<void> {
    await this.disclaimerCheckbox.click();
  }

  async toggleAudio(state: boolean): Promise<void> {
    if (state) {
      await this.audioOnButton.click();
    } else {
      await this.audioOffButton.click();
    }
  }

  async clickAudioOn(): Promise<void> {
    await this.audioOnButton.click();
  }

  async clickAudioOff(): Promise<void> {
    await this.audioOffButton.click();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async isContinueDisabled(): Promise<boolean> {
    return await this.continueButton.isDisabled();
  }
}
