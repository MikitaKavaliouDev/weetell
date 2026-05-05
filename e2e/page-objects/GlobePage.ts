import type { Page } from '@playwright/test';
import type { Locale } from '@/stores/useAssessmentStore';

export class GlobePage {
  readonly page: Page;
  readonly worldImage;

  constructor(page: Page) {
    this.page = page;
    this.worldImage = page.locator('img[alt="World"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
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
