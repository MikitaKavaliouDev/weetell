import type { Page } from '@playwright/test';

export class SeveritySelection {
  readonly page: Page;
  readonly watchVideoButton;
  readonly chairButton;
  readonly doctorButton;

  constructor(page: Page) {
    this.page = page;
    this.watchVideoButton = page.locator('img[alt="Play video"]').first();
    this.chairButton = page.locator('img[alt="Wait"]').first();
    this.doctorButton = page.locator('img[alt="Doctor"]').first();
  }

  async setSeverity(temp: number): Promise<void> {
    const slider = this.page.locator('input[type="range"]');
    if (await slider.isVisible()) {
      await slider.fill(String(temp));
    }
  }

  async getSeverity(): Promise<number | null> {
    const slider = this.page.locator('input[type="range"]');
    if (await slider.isVisible()) {
      const value = await slider.inputValue();
      return parseFloat(value);
    }
    return null;
  }

  async watchVideo(): Promise<void> {
    await this.watchVideoButton.click();
  }

  async selectChair(): Promise<void> {
    await this.chairButton.click();
    await this.page.waitForTimeout(500);
  }

  async selectDoctor(): Promise<void> {
    await this.doctorButton.click();
    await this.page.waitForTimeout(500);
  }

  async clickNext(): Promise<void> {
    const nextButton = this.page.locator('img[alt="Go to bed"]').first();
    if (await nextButton.isVisible({ timeout: 3000 })) {
      await nextButton.click();
    }
  }
}
