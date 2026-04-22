import type { Page } from '@playwright/test';

export class DetailedBodySelection {
  readonly page: Page;
  readonly headChestImage;

  constructor(page: Page) {
    this.page = page;
    this.headChestImage = page.locator('img[alt="Detailed Body Selection"]');
  }

  async clickHead(): Promise<void> {
    await this.headChestImage.click();
  }

  async selectSymptom(symptom: 'fever' | 'headache' | 'concussion'): Promise<void> {
    const symptomMap: Record<string, string> = {
      fever: '/assets/fever_thermometer_icon.svg',
      headache: '/assets/headache_icon.svg',
      concussion: '/assets/concussion_icon.svg',
    };
    await this.page.locator(`img[src="${symptomMap[symptom]}"], img[alt="${symptom}"]`).click();
  }
}
