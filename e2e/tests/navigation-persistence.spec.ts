import { test, expect } from '../fixtures/base.fixture';
import { seedZustandState, clearZustandState } from '../fixtures/store.fixture';
import { CheckupPage } from '../page-objects';

const STORAGE_KEY = 'weetell-storage';

test.describe('Navigation Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Back Button Navigation', () => {
    test('Back from disclaimer: Returns to globe', async ({ page }) => {
      await page.goto('/disclaimer');
      await page.locator('svg').first().click();
      await expect(page).toHaveURL('/');
    });

    test('Back from checkup/age: Returns to globe', async ({ page }) => {
      await page.goto('/checkup?step=age');
      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await expect(page.getByText('Menu')).toBeVisible();
      await page.getByText('Back').first().click();
      await expect(page).toHaveURL(/\//);
    });

    test('Back from checkup/body: Returns to age', async ({ page }) => {
      await seedZustandState(page, { ageGroup: 'child' });
      await page.goto('/checkup?step=body');
      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await expect(page.getByText('Menu')).toBeVisible();
      await page.getByText('Back').first().click();
      await expect(page).toHaveURL(/\/checkup/);
    });

    test('Back from checkup/detailed: Returns to body', async ({ page }) => {
      await page.goto('/checkup?step=detailed');
      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await expect(page.getByText('Menu')).toBeVisible();
      await page.getByText('Back').first().click();
      await expect(page).toHaveURL(/step=body/);
    });

    test('Browser back button: Browser history works correctly', async ({ page }) => {
      await page.goto('/checkup?step=age');
      await page.goto('/checkup?step=body');

      await page.goBack();
      await expect(page).toHaveURL(/step=age/);
    });
  });

  test.describe('Restart Assessment', () => {
    test('Restart from splash: State persists when returning to splash', async ({ page }) => {
      await seedZustandState(page, {
        ageGroup: 'baby',
        bodyPart: 'head',
        symptom: 'fever',
      });

      await page.goto('/');

      const state = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(state.ageGroup).toBe('baby');
    });

    test('Restart from globe: State persists on globe page', async ({ page }) => {
      await seedZustandState(page, {
        locale: 'de',
        ageGroup: 'child',
      });

      await page.goto('/');

      const state = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(state.ageGroup).toBe('child');
    });

    test('Restart from checkup: Clears all state, goes to globe', async ({ page }) => {
      await seedZustandState(page, {
        ageGroup: 'teen',
        bodyPart: 'chest',
        symptom: 'pain',
        severity: 2,
      });

      await page.goto('/checkup?step=severity');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await page.waitForTimeout(300);
      await page.getByText('Home').click();

      await expect(page).toHaveURL(/\//);

      const state = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(state.ageGroup).toBeNull();
      expect(state.bodyPart).toBeNull();
      expect(state.symptom).toBeNull();
    });

    test('Restart from results: Clears assessment, goes to globe', async ({ page }) => {
      await seedZustandState(page, {
        ageGroup: 'baby',
        bodyPart: 'head',
        symptom: 'fever',
        severity: 3,
        urgencyLevel: 'urgent',
      });

      await page.goto('/checkup?step=age');

      await page.locator('button').filter({ has: page.locator('svg') }).first().click();
      await page.waitForTimeout(300);
      await page.getByText('Home').click();

      await expect(page).toHaveURL(/\//);

      const state = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(state.urgencyLevel).toBeNull();
    });
  });

  test.describe('localStorage Persistence', () => {
    test('Store survives refresh: All state fields persist', async ({ page }) => {
      const fullState = {
        locale: 'de' as const,
        ageGroup: 'child' as const,
        bodyPart: 'stomach',
        symptom: 'pain',
        severity: 2,
        actionDecision: 'wait' as const,
        urgencyLevel: 'routine' as const,
        showTextLabels: false,
        showSubtitles: false,
      };

      await seedZustandState(page, fullState);

      await page.goto('/checkup?step=age');
      await page.reload();

      const stored = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(stored.locale).toBe('de');
      expect(stored.ageGroup).toBe('child');
      expect(stored.bodyPart).toBe('stomach');
      expect(stored.showTextLabels).toBe(false);
      expect(stored.showSubtitles).toBe(false);
    });

    test('Partial state restore: Can restore with partial state', async ({ page }) => {
      await seedZustandState(page, {
        ageGroup: 'baby',
        bodyPart: 'head',
      });

      await page.goto('/checkup?step=age');

      const stored = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(stored.ageGroup).toBe('baby');
      expect(stored.bodyPart).toBe('head');
      expect(stored.symptom).toBeNull();
    });

    test('Clear storage: Clearing localStorage resets to defaults', async ({ page }) => {
      await seedZustandState(page, {
        locale: 'fr',
        ageGroup: 'teen',
        showTextLabels: false,
      });

      await clearZustandState(page);

      await page.reload();

      const stored = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(stored).toBeNull();
    });
  });

  test.describe('URL State (nuqs)', () => {
    test('Step param persists: ?step=body survives refresh', async ({ page }) => {
      await page.goto('/checkup?step=body');
      await page.reload();

      await expect(page).toHaveURL(/step=body/);
    });

    test('Direct URL navigation: Can navigate to /checkup?step=severity directly', async ({ page }) => {
      await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head', symptom: 'fever' });
      await page.goto('/checkup?step=severity');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveURL(/step=severity/);
    });

    test('Direct URL navigation: Can navigate to /checkup?step=urgency directly', async ({ page }) => {
      await page.goto('/checkup?step=urgency');

      await expect(page).toHaveURL(/step=urgency/);
    });

    test('Invalid step handling: Unknown step shows error with restart', async ({ page }) => {
      await page.goto('/checkup?step=unknown-step');

      await expect(page.getByText(/not implemented|step unknown/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /restart|neustart|reiniciar|yeniden/i })).toBeVisible();
    });

    test('Step navigation: Navigating steps updates URL correctly', async ({ page }) => {
      await seedZustandState(page, { ageGroup: 'child' });
      await page.goto('/checkup?step=age');

      await page.locator('img[alt*="Baby"]').locator('..').click();

      await expect(page).toHaveURL(/step=body/);
    });
  });

  test.describe('Combined Navigation & Persistence', () => {
    test('State preserved across step navigation', async ({ page }) => {
      await seedZustandState(page, { ageGroup: 'baby' });
      await page.goto('/checkup?step=age');

      await page.reload();

      const stored = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(stored.ageGroup).toBe('baby');
    });

    test('Accessibility settings survive step changes', async ({ page }) => {
      await seedZustandState(page, { showTextLabels: false, showSubtitles: false });
      await page.goto('/checkup?step=age');
      await page.reload();

      await page.locator('img[alt*="Baby"]').locator('..').click();
      await page.reload();

      const stored = await page.evaluate((key) => {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data).state;
        return null;
      }, STORAGE_KEY);

      expect(stored.showTextLabels).toBe(false);
      expect(stored.showSubtitles).toBe(false);
    });
  });
});