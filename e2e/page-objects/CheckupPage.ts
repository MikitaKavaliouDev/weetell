import type { Page } from '@playwright/test';

export type CheckupStep = 'age' | 'body' | 'detailed' | 'severity' | 'urgency' | 'results';

export class CheckupPage {
  readonly page: Page;
  readonly stepIndicator;
  readonly backButton;
  readonly settingsButton;

  constructor(page: Page) {
    this.page = page;
    this.stepIndicator = page.locator('[data-testid="step-indicator"]');
    this.settingsButton = page.locator('header button, .flex.justify-between button').first();
  }

  async goto(step?: CheckupStep): Promise<void> {
    const url = step ? `/checkup?step=${step}` : '/checkup';
    await this.page.goto(url);
  }

  getStepFromUrl(): CheckupStep {
    const match = this.page.url().match(/step=([^&]+)/);
    return (match?.[1] as CheckupStep) || 'age';
  }

  async getCurrentStep(): Promise<CheckupStep> {
    return this.getStepFromUrl();
  }

  async clickBack(): Promise<void> {
    await this.settingsButton.click();
    await this.page.getByText('Back', { exact: false }).first().click({ timeout: 5000 });
  }

  async clickHome(): Promise<void> {
    await this.settingsButton.click();
    await this.page.getByText('Home', { exact: false }).first().click({ timeout: 5000 });
  }

  async clickRestart(): Promise<void> {
    await this.clickHome();
  }
}
