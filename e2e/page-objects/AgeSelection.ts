import type { Page } from '@playwright/test';
import type { AgeGroup } from '@/stores/useAssessmentStore';

export class AgeSelection {
  readonly page: Page;
  readonly babyButton;
  readonly childButton;
  readonly teenButton;

  constructor(page: Page) {
    this.page = page;
    this.babyButton = page.locator('img[alt*="Baby"], img[alt*="Bebé"], img[alt*="Bebek"]').first();
    this.childButton = page.locator('img[alt*="Child"], img[alt*="Niño"], img[alt*="Çocuk"]').first();
    this.teenButton = page.locator('img[alt*="Teen"]').first();
  }

  async selectAge(age: AgeGroup): Promise<void> {
    switch (age) {
      case 'baby':
        await this.babyButton.click();
        break;
      case 'child':
        await this.childButton.click();
        break;
      case 'teen':
        await this.teenButton.click();
        break;
    }
  }

  async selectBaby(): Promise<void> {
    await this.babyButton.click();
  }

  async selectChild(): Promise<void> {
    await this.childButton.click();
  }

  async isAgeSelected(age: AgeGroup): Promise<boolean> {
    if (!age) return false;
    const imageAlt: Record<string, string[]> = {
      baby: ['Baby', 'Bebé', 'Bebek'],
      child: ['Child', 'Niño', 'Çocuk'],
      teen: ['Teen', 'Teenager'],
    };
    const alts = imageAlt[age];
    if (!alts) return false;
    for (const alt of alts) {
      const img = this.page.locator(`img[alt*="${alt}"]`).first();
      if (await img.isVisible()) {
        return true;
      }
    }
    return false;
  }
}
