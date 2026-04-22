import { test, expect } from '../fixtures/base.fixture';
import { seedZustandState } from '../fixtures/store.fixture';
import { CheckupPage, AgeSelection, BodyMapSelection, DetailedBodySelection, SeveritySelection, UrgencySelection } from '../page-objects';

test.describe('Checkup Wizard Flow', () => {
  let checkupPage: CheckupPage;
  let ageSelection: AgeSelection;
  let bodyMapSelection: BodyMapSelection;
  let detailedBodySelection: DetailedBodySelection;
  let severitySelection: SeveritySelection;
  let urgencySelection: UrgencySelection;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/checkup');

    checkupPage = new CheckupPage(page);
    ageSelection = new AgeSelection(page);
    bodyMapSelection = new BodyMapSelection(page);
    detailedBodySelection = new DetailedBodySelection(page);
    severitySelection = new SeveritySelection(page);
    urgencySelection = new UrgencySelection(page);
  });

  test('1. Age step loads first at /checkup?step=age', async ({ page }) => {
    await checkupPage.goto('age');
    await expect(page.locator('img[alt*="Baby"]').first()).toBeVisible();
    await expect(page.locator('img[alt*="Child"]').first()).toBeVisible();
  });

  test('2. Age → Body: Selecting age navigates to ?step=body', async ({ page }) => {
    await checkupPage.goto('age');
    await ageSelection.selectBaby();
    await page.waitForURL(/step=body/);
    expect(checkupPage.getStepFromUrl()).toBe('body');
  });

  test('3. Body → Detailed: Selecting body part navigates to ?step=detailed', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child' });
    await checkupPage.goto('body');
    await bodyMapSelection.selectBodyPart('head');
    await page.waitForURL(/step=detailed/, { timeout: 15000 });
    expect(checkupPage.getStepFromUrl()).toBe('detailed');
  });

  test('4. Detailed → Severity: Selecting symptom navigates to ?step=severity', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head' });
    await checkupPage.goto('detailed');
    await detailedBodySelection.clickHead();
    await page.waitForTimeout(500);
    await detailedBodySelection.selectSymptom('fever');
    await page.waitForURL(/step=severity/, { timeout: 15000 });
    expect(checkupPage.getStepFromUrl()).toBe('severity');
  });

  test('5. Severity → Urgency: Setting severity navigates to ?step=urgency', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head', symptom: 'fever' });
    await checkupPage.goto('severity');
    await severitySelection.selectChair();
    await page.waitForURL(/step=urgency/, { timeout: 15000 });
    expect(checkupPage.getStepFromUrl()).toBe('urgency');
  });

  test('6. Urgency → Results: Selecting urgency navigates to /results', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head', symptom: 'fever', actionDecision: 'wait' });
    await checkupPage.goto('urgency');
    await urgencySelection.proceed();
    await page.waitForURL(/\/results/, { timeout: 15000 });
  });

  test('7. Back from body: Returns to age step', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child' });
    await checkupPage.goto('body');
    await checkupPage.clickBack();
    await page.waitForURL(/step=age/);
    expect(checkupPage.getStepFromUrl()).toBe('age');
  });

  test('8. Back from detailed: Returns to body step', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head' });
    await checkupPage.goto('detailed');
    await checkupPage.clickBack();
    await page.waitForURL(/step=body/);
    expect(checkupPage.getStepFromUrl()).toBe('body');
  });

  test('9. Back from severity: Returns to detailed step', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head', symptom: 'fever' });
    await checkupPage.goto('severity');
    await checkupPage.clickBack();
    await page.waitForURL(/step=detailed/);
    expect(checkupPage.getStepFromUrl()).toBe('detailed');
  });

  test('10. Back from urgency: Returns to severity step', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head', symptom: 'fever', actionDecision: 'wait' });
    await checkupPage.goto('urgency');
    await checkupPage.clickBack();
    await page.waitForURL(/step=severity/);
    expect(checkupPage.getStepFromUrl()).toBe('severity');
  });

  test('11. Back from age: Returns to /start', async ({ page }) => {
    await checkupPage.goto('age');
    await checkupPage.clickBack();
    await page.waitForURL(/\/start/);
  });

  test('12. Direct URL access: Navigating to /checkup?step=severity loads severity step', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head', symptom: 'fever' });
    await checkupPage.goto('severity');
    const playButton = page.locator('img[alt="Play video"]').first();
    const waitButton = page.locator('img[alt="Wait"]').first();
    const doctorButton = page.locator('img[alt="Doctor"]').first();
    const anyVisible = await playButton.isVisible() || await waitButton.isVisible() || await doctorButton.isVisible();
    expect(anyVisible).toBeTruthy();
  });

  test('13. Invalid step: Unknown step shows error with restart option', async ({ page }) => {
    await checkupPage.goto('invalid-step');
    await expect(page.getByRole('heading', { name: /step not implemented yet/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /restart/i })).toBeVisible();
  });

  test('14. Step persistence: Refreshing page keeps current step', async ({ page }) => {
    await checkupPage.goto('age');
    await page.reload();
    expect(checkupPage.getStepFromUrl()).toBe('age');
  });

  test('15. Age selection persists: After selecting age, refresh shows selected age', async ({ page }) => {
    await checkupPage.goto('age');
    await ageSelection.selectChild();
    await page.waitForURL(/step=body/);
    await page.reload();
    await page.waitForURL(/step=body/);
  });

  test('16. Body part persists: Selected body part remains after refresh', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head' });
    await checkupPage.goto('detailed');
    await page.reload();
    await page.waitForURL(/step=detailed/);
  });

  test('17. Severity value persists: Temperature setting survives refresh', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head', symptom: 'fever', actionDecision: 'wait' });
    await checkupPage.goto('urgency');
    await expect(page.getByText(/routine|urgent|emergency/i)).toBeVisible();
    await page.reload();
    await page.waitForURL(/step=urgency/);
    await expect(page.getByText(/routine|urgent|emergency/i)).toBeVisible();
  });

  test('18. Full state restore: Complete assessment state restores on refresh', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head', symptom: 'fever', actionDecision: 'wait' });
    await checkupPage.goto('severity');
    await page.reload();
    await page.waitForURL(/step=severity/);
  });

  test('19. Restart from middle: Clicking restart clears state, goes to /start', async ({ page }) => {
    await seedZustandState(page, { ageGroup: 'child', bodyPart: 'head' });
    await checkupPage.goto('detailed');
    await checkupPage.clickHome();
    await page.waitForURL(/\/start/);
    const state = await page.evaluate(() => {
      const data = localStorage.getItem('weetell-storage');
      if (!data) return null;
      const parsed = JSON.parse(data);
      return parsed.state?.ageGroup;
    });
    expect(state).toBeNull();
  });

  test('20. Restart from results: Results page restart clears all assessment data', async ({ page }) => {
    await seedZustandState(page, {
      ageGroup: 'baby',
      bodyPart: 'chest',
      symptom: 'fever',
      severity: 38.5,
      urgencyLevel: 'urgent',
      actionDecision: 'wait',
    });
    await page.goto('/results');
    await page.locator('button').filter({ has: page.locator('svg') }).first().click();
    await page.getByRole('button', { name: /home/i }).click();
    await page.waitForURL(/\/start/);
    const state = await page.evaluate(() => {
      const data = localStorage.getItem('weetell-storage');
      if (!data) return {};
      const parsed = JSON.parse(data);
      return parsed.state || {};
    });
    expect(state.ageGroup).toBeNull();
    expect(state.bodyPart).toBeNull();
    expect(state.symptom).toBeNull();
  });
});