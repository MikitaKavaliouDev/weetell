import type { Page } from '@playwright/test';
import type { Locale } from '@/stores/useAssessmentStore';

export class StartPage {
  readonly page: Page;
  readonly weetellLogo;

  constructor(page: Page) {
    this.page = page;
    this.weetellLogo = page.locator('img[alt="Weetell"]').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/start');
  }

  async selectLocale(locale: Locale): Promise<void> {
    const localeImages: Record<Locale, string> = {
      en: '/assets/english.png',
      es: '/assets/espanol.png',
      de: '/assets/german.png',
      tr: '/assets/turkish.png',
      fr: '/assets/french.png',
    };
    await this.page.locator(`img[src="${localeImages[locale]}"]`).click();
  }

  async isLocaleVisible(locale: Locale): Promise<boolean> {
    const localeImages: Record<Locale, string> = {
      en: '/assets/english.png',
      es: '/assets/espanol.png',
      de: '/assets/german.png',
      tr: '/assets/turkish.png',
      fr: '/assets/french.png',
    };
    return await this.page.locator(`img[src="${localeImages[locale]}"]`).isVisible();
  }
}
