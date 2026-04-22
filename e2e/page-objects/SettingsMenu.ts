import type { Page } from '@playwright/test';
import type { Locale } from '@/stores/useAssessmentStore';

export class SettingsMenu {
  readonly page: Page;
  readonly settingsButton;
  readonly backButton;
  readonly homeButton;
  readonly mobileButton;
  readonly textLabelsToggle;
  readonly subtitlesToggle;

  constructor(page: Page) {
    this.page = page;
    this.settingsButton = page.getByRole('button', { name: /menu/i }).first();
    this.backButton = page.getByRole('button', { name: /back/i });
    this.homeButton = page.getByRole('button', { name: /home/i });
    this.mobileButton = page.getByRole('button', { name: /mobile/i });
    this.textLabelsToggle = page.getByRole('switch', { name: /text labels|etiquetas|metin/i });
    this.subtitlesToggle = page.getByRole('switch', { name: /subtitles|altyazılar/i });
  }

  async openMenu(): Promise<void> {
    await this.settingsButton.click();
  }

  async toggleTextLabels(): Promise<void> {
    await this.textLabelsToggle.click();
  }

  async toggleSubtitles(): Promise<void> {
    await this.subtitlesToggle.click();
  }

  async changeLocale(locale: Locale): Promise<void> {
    await this.page.locator(`img[alt*="${locale}"]`).click();
  }

  async clickHome(): Promise<void> {
    await this.homeButton.click();
  }

  async clickMobile(): Promise<void> {
    await this.mobileButton.click();
  }

  async isMenuOpen(): Promise<boolean> {
    return await this.page.getByText('Menu').isVisible();
  }
}
