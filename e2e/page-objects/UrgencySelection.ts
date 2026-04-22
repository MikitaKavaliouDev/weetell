import type { Page } from '@playwright/test';

export type UrgencyLevel = 'routine' | 'urgent' | 'emergency';

export class UrgencySelection {
  readonly page: Page;
  readonly proceedButton;
  readonly viewMapButton;

  constructor(page: Page) {
    this.page = page;
    this.proceedButton = page.getByRole('button', { name: /find a doctor|arzt finden|encontrar un médico|doktor bul/i });
    this.viewMapButton = page.getByRole('button', { name: /view map|zur karte|ver mapa|haritayı gör/i });
  }

  async selectUrgency(level: UrgencyLevel): Promise<void> {
    switch (level) {
      case 'routine':
        await this.page.getByRole('button', { name: /routine/i }).click();
        break;
      case 'urgent':
        await this.page.getByRole('button', { name: /urgent/i }).click();
        break;
      case 'emergency':
        await this.page.getByRole('button', { name: /emergency/i }).click();
        break;
    }
  }

  async isUrgencySelected(level: UrgencyLevel): Promise<boolean> {
    const names: Record<UrgencyLevel, RegExp> = {
      routine: /routine|plan/i,
      urgent: /urgent|dringend|urgente|acil/i,
      emergency: /emergency|notfall|emergencia|acil durum/i,
    };
    return await this.page.getByRole('button', { name: names[level] }).isVisible();
  }

  async proceed(): Promise<void> {
    await this.proceedButton.click();
  }

  async viewMap(): Promise<void> {
    await this.viewMapButton.click();
  }
}
