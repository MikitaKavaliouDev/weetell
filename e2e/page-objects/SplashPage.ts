import type { Page } from '@playwright/test';

export class SplashPage {
  readonly page: Page;
  readonly logo;
  readonly audioOnButton;
  readonly audioOffButton;
  readonly audioOnImage;
  readonly audioOffImage;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('img[alt="Weetell"]').first();
    this.audioOnButton = page.getByTestId('audio-on-button-global');
    this.audioOffButton = page.getByTestId('audio-off-button-global');
    this.audioOnImage = this.audioOnButton.locator('img');
    this.audioOffImage = this.audioOffButton.locator('img');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
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
}
