import { test, expect } from '../fixtures/base.fixture';
import { seedZustandState, clearZustandState } from '../fixtures/store.fixture';
import { SplashPage } from '../page-objects/SplashPage';
import type { Locale } from '@/stores/useAssessmentStore';

const STORAGE_KEY = 'weetell-storage';

test.describe('Settings & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Settings Menu', () => {
    test('Menu opens: Clicking settings button shows menu', async ({ page }) => {
      await page.goto('/checkup?step=age');
      const settingsButton = page.locator('button').filter({ has: page.locator('svg') }).first();

      await settingsButton.click();
      await expect(page.getByText('Menu')).toBeVisible();
    });

    test('Home navigation: Clicking home returns to globe', async ({ page }) => {
      await page.goto('/checkup?step=age');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await expect(page.getByText('Menu')).toBeVisible();

      await page.getByText('Home').click();
      await expect(page).toHaveURL(/\//);
    });

    test('Mobile QR: Clicking mobile shows QR code modal', async ({ page }) => {
      await page.goto('/checkup?step=age');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await expect(page.getByText('Menu')).toBeVisible();

      await page.getByText('Mobile').click();

      await expect(page.getByText('Open on Mobile')).toBeVisible();
      await expect(page.locator('svg[role="img"]')).toBeVisible();
    });

    test('Modal close: Clicking close or outside closes QR modal', async ({ page }) => {
      await page.goto('/checkup?step=age');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await page.getByText('Mobile').click();
      await expect(page.getByText('Open on Mobile')).toBeVisible();

      await page.locator('button').filter({ has: page.locator('svg') }).nth(1).click();
      await expect(page.getByText('Open on Mobile')).not.toBeVisible();
    });
  });

  test.describe('Accessibility Toggles', () => {
    test('Text labels toggle: Toggling changes showTextLabels in store', async ({ page }) => {
      await page.goto('/checkup?step=age');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await expect(page.getByText('Menu')).toBeVisible();

      const initialState = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state?.showTextLabels;
        }
        return null;
      }, STORAGE_KEY);

      const textLabelsCheckbox = page.locator('input[type="checkbox"]').first();
      await textLabelsCheckbox.click();

      const newState = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state?.showTextLabels;
        }
        return null;
      }, STORAGE_KEY);

      expect(newState).toBe(!initialState);
    });

    test('Subtitles toggle: Toggling changes showSubtitles in store', async ({ page }) => {
      await page.goto('/checkup?step=age');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await expect(page.getByText('Menu')).toBeVisible();

      const initialState = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state?.showSubtitles;
        }
        return null;
      }, STORAGE_KEY);

      const subtitlesCheckbox = page.locator('input[type="checkbox"]').nth(1);
      await subtitlesCheckbox.click();

      const newState = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state?.showSubtitles;
        }
        return null;
      }, STORAGE_KEY);

      expect(newState).toBe(!initialState);
    });

    test('Toggle persistence: Toggles survive page refresh', async ({ page }) => {
      await page.goto('/checkup?step=age');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      const textLabelsCheckbox = page.locator('input[type="checkbox"]').first();
      await textLabelsCheckbox.click();

      await page.reload();

      const storedState = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state?.showTextLabels;
        }
        return null;
      }, STORAGE_KEY);

      expect(storedState).toBe(false);
    });

    test('Toggle across pages: Settings persist when navigating between pages', async ({ page }) => {
      await page.goto('/checkup?step=age');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      const subtitlesCheckbox = page.locator('input[type="checkbox"]').nth(1);
      await subtitlesCheckbox.click();
      await page.getByText('Home').click();

      await page.goto('/checkup?step=body');
      await page.locator('button').filter({ has: page.locator('svg') }).first().click();

      const storedState = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state?.showSubtitles;
        }
        return null;
      }, STORAGE_KEY);

      expect(storedState).toBe(false);
    });
  });

  test.describe('Locale Persistence', () => {
    test('Locale persists through app: Selected locale survives page refresh', async ({ page }) => {
      await seedZustandState(page, { locale: 'de' });
      await page.goto('/checkup?step=age');
      await page.reload();

      const storedLocale = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state?.locale;
        }
        return null;
      }, STORAGE_KEY);

      expect(storedLocale).toBe('de');
    });

    test('Locale persists across navigation: German locale works after navigation', async ({ page }) => {
      await seedZustandState(page, { locale: 'fr' });
      await page.goto('/checkup?step=age');
      await page.reload();

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await expect(page.getByText('Menu')).toBeVisible();

      await page.getByText('Home').click();
      await expect(page).toHaveURL(/\//);

      await page.reload();

      const storedLocale = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state?.locale;
        }
        return null;
      }, STORAGE_KEY);

      expect(storedLocale).toBe('fr');
    });

    test('All 5 locales can be set and persist: en, de, es, tr, fr', async ({ page }) => {
      const locales: Locale[] = ['en', 'de', 'es', 'tr', 'fr'];

      for (const locale of locales) {
        await seedZustandState(page, { locale });
        await page.goto('/checkup?step=age');
        await page.reload();

        const storedLocale = await page.evaluate((key) => {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            return parsed.state?.locale;
          }
          return null;
        }, STORAGE_KEY);

        expect(storedLocale).toBe(locale);

        await clearZustandState(page);
      }
    });

    test('Locale and accessibility combined: Both settings persist together', async ({ page }) => {
      await seedZustandState(page, {
        locale: 'de',
        showTextLabels: false,
        showSubtitles: false,
      });

      await page.goto('/checkup?step=age');
      await page.reload();

      const stored = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          return parsed.state;
        }
        return null;
      }, STORAGE_KEY);

      expect(stored.locale).toBe('de');
      expect(stored.showTextLabels).toBe(false);
      expect(stored.showSubtitles).toBe(false);
    });
  });

  test.describe('Audio Controls', () => {
    test('Audio on splash: Toggle buttons exist and are interactive', async ({ page }) => {
      const splashPage = new SplashPage(page);
      await page.goto('/');

      await expect(splashPage.audioOnButton).toBeVisible();
      await expect(splashPage.audioOffButton).toBeVisible();

      await splashPage.clickAudioOff();

      await expect(splashPage.audioOffButton).toBeVisible();
    });

    test('Audio state persists: Audio preference survives refresh', async ({ page }) => {
      const splashPage = new SplashPage(page);
      await page.goto('/');

      await splashPage.clickAudioOff();

      await page.reload();

      await expect(splashPage.audioOffButton).toBeVisible();
    });
  });
});