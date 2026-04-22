# Weetell E2E Testing Guide

End-to-end test suite for the Weetell Digital Health pediatric symptom checker. This guide covers everything you need to run, write, and debug tests.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Fixtures Guide](#fixtures-guide)
- [Page Objects Guide](#page-objects-guide)
- [Writing New Tests](#writing-new-tests)
- [State Management](#state-management)
- [Debugging](#debugging)
- [CI/CD](#cicd)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)
- [Test Coverage](#test-coverage)

---

## Overview

The E2E test suite validates the full user journey through the Weetell application, from splash screen through symptom assessment to results. Tests run against a live Next.js development server using Playwright.

**Tech stack:**

| Tool | Version | Purpose |
|------|---------|---------|
| Playwright | ^1.50.0 | Browser automation and testing |
| Next.js | 16.0.7 | Application framework |
| React | 19.2.0 | UI library |
| Zustand | ^5.0.9 | State management with localStorage persistence |
| nuqs | ^2.8.3 | URL query state management |
| Tailwind CSS | ^4 | Styling |

**What the suite covers:**

- Splash screen disclaimer flow and audio toggle
- Locale selection (en, de, es, tr, fr)
- Age group selection (baby, child, teen)
- Body map interaction (front/back rotation, body part selection)
- Symptom selection and severity assessment
- Action decision routing (wait, doctor)
- Urgency level display and doctor finding flow
- Accessibility toggles (text labels, subtitles)
- URL state synchronization via nuqs
- Multi-browser compatibility (Chromium, Firefox, WebKit)
- Mobile responsiveness (iPhone 13 viewport)

---

## Prerequisites

### Required Software

- **Node.js** 18 or later
- **npm** (comes with Node.js)

### Install Playwright Browsers

After cloning the repository, install the browser binaries:

```bash
npx playwright install
```

This downloads Chromium, Firefox, and WebKit. If you also need system dependencies (Linux):

```bash
npx playwright install --with-deps
```

### Verify Installation

```bash
npx playwright --version
```

---

## Quick Start

```bash
# 1. Install Playwright browsers (one-time setup)
npx playwright install

# 2. Run the full E2E test suite
npm run test:e2e
```

The dev server starts automatically. Tests run headless across all configured browsers.

---

## Running Tests

### All Tests (Headless)

```bash
npm run test:e2e
```

Runs every test in `e2e/tests/` across all browser projects (chromium, firefox, webkit, mobile-chrome).

### Headed Mode (Watch Tests Run)

```bash
npm run test:e2e:headed
```

Opens visible browser windows so you can watch test execution in real time. Useful for understanding what a test is doing.

### UI Mode (Interactive)

```bash
npm run test:e2e:ui
```

Opens the Playwright UI dashboard at `http://localhost:9323`. You can:

- Run individual tests by clicking
- Step through test execution
- Inspect DOM snapshots at each step
- View traces, screenshots, and console output

### Specific Test File

```bash
npx playwright test e2e/tests/splash-flow.spec.ts
```

### Specific Browser

```bash
npx playwright test --project=firefox
npx playwright test --project=chromium
npx playwright test --project=webkit
npx playwright test --project=mobile-chrome
```

### Specific Test by Name

```bash
npx playwright test -g "should navigate from splash to start"
```

The `-g` flag filters tests by title using a regex pattern.

### Debug Mode (Step Through)

```bash
npx playwright test --debug
```

Opens Playwright Inspector with a paused browser. Step through each action manually.

### Parallel Execution

Tests run in parallel by default (`fullyParallel: true` in config). To run serially:

```bash
npx playwright test --workers=1
```

---

## Test Structure

### Directory Layout

```
e2e/
├── fixtures/              # Custom Playwright fixtures
│   ├── base.fixture.ts    # Core test/expect exports, before/after hooks
│   ├── store.fixture.ts   # Zustand state seeding and clearing utilities
│   └── locale.fixture.ts  # Translation helpers and locale management
├── page-objects/          # Page Object Model classes
│   ├── index.ts           # CheckupPage, AgeSelection, BodyMapSelection, etc.
│   ├── SplashPage.ts      # Splash screen interactions
│   └── StartPage.ts       # Start/locale selection page interactions
└── tests/                 # Test spec files
    └── *.spec.ts          # Individual test files
```

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Test files | `kebab-case.spec.ts` | `splash-flow.spec.ts` |
| Test titles | Descriptive sentence | `should navigate from splash to start page` |
| Page objects | `PascalCase.ts` | `SplashPage.ts` |
| Fixtures | `kebab-case.fixture.ts` | `store.fixture.ts` |
| Test groups | `describe('feature name')` | `describe('splash screen flow')` |

### File Organization

Each test file should focus on one feature or user flow. Keep related tests together:

```
tests/
├── splash-flow.spec.ts       # Splash screen, disclaimer, audio
├── locale-selection.spec.ts  # Language switching
├── age-selection.spec.ts     # Baby/child/teen routing
├── body-map.spec.ts          # Body part selection
├── symptom-assessment.spec.ts # Symptom and severity flow
└── accessibility.spec.ts     # Text labels, subtitles toggles
```

---

## Fixtures Guide

Fixtures provide reusable setup, utilities, and teardown logic. They are the foundation of clean, maintainable tests.

### base.fixture.ts

The core fixture that exports `test` and `expect` with automatic setup.

**What it does:**

- Before each test: navigates to `/` and clears localStorage
- After each test (on failure): takes a full-page screenshot

**How to use:**

```typescript
import { test, expect, createTest } from '../fixtures/base.fixture';

// Option 1: Use the exported test directly (includes auto-setup)
test('my test', async ({ page }) => {
  // page is already at '/' with clean localStorage
});

// Option 2: Use createTest for explicit control
createTest('my test', async ({ page }) => {
  // Same auto-setup, wrapped in a helper
});
```

### store.fixture.ts

Utilities for manipulating Zustand persisted state directly in the browser.

**Exports:**

| Function | Purpose |
|----------|---------|
| `seedZustandState(page, state)` | Merge partial state into localStorage |
| `clearZustandState(page)` | Remove all Zustand state from localStorage |
| `getZustandState(page)` | Read current Zustand state from localStorage |

**Types:**

```typescript
interface AssessmentState {
  locale: 'de' | 'es' | 'tr' | 'en' | 'fr';
  ageGroup: 'baby' | 'child' | 'teen' | null;
  bodyPart: string | null;
  symptom: string | null;
  severity: number | null;
  actionDecision: 'wait' | 'doctor' | null;
  urgencyLevel: 'routine' | 'urgent' | 'emergency' | null;
  currentSubtitle: string;
  showTextLabels: boolean;
  showSubtitles: boolean;
}
```

**How to use:**

```typescript
import { test, expect } from '../fixtures/base.fixture';
import { seedZustandState, clearZustandState } from '../fixtures/store.fixture';

test('test with pre-seeded state', async ({ page }) => {
  // Seed state before navigating
  await seedZustandState(page, {
    locale: 'de',
    ageGroup: 'baby',
    showTextLabels: false,
  });

  await page.goto('/start');

  // The page should now render in German with baby selected
  await expect(page.getByText('Wie alt ist Ihr Kind?')).toBeVisible();
});

test('test with clean state', async ({ page }) => {
  await clearZustandState(page);
  await page.goto('/');
  // Fresh state, no persisted data
});
```

### locale.fixture.ts

Translation lookup and locale management for multi-language testing.

**Exports:**

| Export | Type | Purpose |
|--------|------|---------|
| `setLocale(page, locale)` | Function | Set locale in Zustand storage |
| `t(key, locale)` | Function | Look up translated string |
| `translations` | Object | Full translation dictionary |

**Available translation keys:**

```typescript
type TranslationKey =
  | 'continue' | 'next' | 'back' | 'start'
  | 'homeCare' | 'pharmacy' | 'doctor' | 'emergency'
  | 'selectAge' | 'selectBodyPart' | 'selectSymptom'
  | 'selectSeverity' | 'results' | 'restart';
```

**How to use:**

```typescript
import { test, expect } from '../fixtures/base.fixture';
import { setLocale, t, translations } from '../fixtures/locale.fixture';

test('displays correct translations', async ({ page }) => {
  await setLocale(page, 'de');
  await page.goto('/start');

  // Use the t() helper for assertions
  const continueText = t('continue', 'de');
  await expect(page.getByText(continueText)).toBeVisible();

  // Or access translations directly
  await expect(page.getByText(translations.de.doctor)).toBeVisible();
});
```

---

## Page Objects Guide

Page Objects encapsulate page-specific selectors and interactions. They keep tests readable and make selector changes localized.

### Available Page Objects

#### SplashPage

Handles the splash screen disclaimer and audio controls.

```typescript
import { SplashPage } from '../page-objects/SplashPage';

const splash = new SplashPage(page);

// Properties
splash.disclaimerCheckbox   // Checkbox for "I understand"
splash.continueButton       // Continue button (disabled until checkbox checked)
splash.audioOnButton        // Audio on toggle
splash.audioOffButton       // Audio off toggle

// Methods
await splash.goto();                    // Navigate to /
await splash.acceptDisclaimer();        // Check the disclaimer checkbox
await splash.toggleAudio(true);         // Turn audio on
await splash.toggleAudio(false);        // Turn audio off
await splash.clickContinue();           // Click continue
await splash.isContinueDisabled();      // Returns boolean
```

#### StartPage

Handles the locale selection screen.

```typescript
import { StartPage } from '../page-objects/StartPage';

const start = new StartPage(page);

// Properties
start.weetellLogo         // Weetell logo image

// Methods
await start.goto();                     // Navigate to /start
await start.selectLocale('de');         // Click German locale
await start.selectLocale('en');         // Click English locale
await start.isLocaleVisible('fr');      // Check if French locale is visible
```

#### CheckupPage

Handles the main assessment flow navigation.

```typescript
import { CheckupPage } from '../page-objects';

const checkup = new CheckupPage(page);

// Methods
await checkup.goto();                   // Navigate to /checkup
await checkup.goto('age');              // Navigate to /checkup?step=age
await checkup.openMenu();               // Open the step menu
await checkup.clickBack();              // Go back one step
await checkup.clickHome();              // Return to home
checkup.getStepFromUrl();               // Returns current step from URL
```

#### AgeSelection

Handles baby/child age group selection.

```typescript
import { AgeSelection } from '../page-objects';

const ageSelection = new AgeSelection(page);

// Methods
await ageSelection.selectBaby();        // Select baby (0-1 years)
await ageSelection.selectChild();       // Select child (2-12 years)
```

#### BodyMapSelection

Handles the interactive SVG body map.

```typescript
import { BodyMapSelection } from '../page-objects';

const bodyMap = new BodyMapSelection(page);

// Methods
await bodyMap.selectBodyPart('head');   // Click head region
await bodyMap.selectBodyPart('chest');  // Click chest region
await bodyMap.selectBodyPart('stomach');// Click stomach region
await bodyMap.selectBodyPart('arms');   // Click arms region
await bodyMap.selectBodyPart('legs');   // Click legs region
await bodyMap.selectBodyPart('back');   // Click back region
await bodyMap.selectBodyPart('skin');   // Click skin region
await bodyMap.rotateView();             // Toggle front/back view
```

#### DetailedBodySelection

Handles the detailed head/chest symptom selection screen.

```typescript
import { DetailedBodySelection } from '../page-objects';

const detailed = new DetailedBodySelection(page);

// Methods
await detailed.clickHead();             // Click the head/chest image
await detailed.selectSymptom('fever');      // Select fever symptom
await detailed.selectSymptom('headache');   // Select headache symptom
await detailed.selectSymptom('concussion'); // Select concussion symptom
```

#### SeveritySelection

Handles the severity assessment with video and action selection.

```typescript
import { SeveritySelection } from '../page-objects';

const severity = new SeveritySelection(page);

// Methods
await severity.watchVideo();        // Click play video
await severity.selectChair();       // Select "wait" (home care)
await severity.selectDoctor();      // Select "see doctor"
```

#### UrgencySelection

Handles the urgency results screen.

```typescript
import { UrgencySelection } from '../page-objects';

const urgency = new UrgencySelection(page);

// Methods
await urgency.proceed();            // Click "find a doctor"
await urgency.viewMap();            // Click "view map"
```

### Best Practices

1. **Instantiate in tests, not in fixtures.** Create page objects inside your test function so each test gets a fresh instance.

2. **One page object per logical page or component.** Do not combine unrelated interactions into a single class.

3. **Use descriptive method names.** `selectBaby()` is better than `clickFirstButton()`.

4. **Keep selectors inside page objects.** If a selector changes, you only update one file.

5. **Return booleans for assertions.** Methods like `isContinueDisabled()` let tests write clean assertions.

---

## Writing New Tests

### Test Template

Here is a complete example following the Arrange-Act-Assert pattern:

```typescript
import { test, expect } from '../fixtures/base.fixture';
import { SplashPage } from '../page-objects/SplashPage';
import { StartPage } from '../page-objects/StartPage';
import { setLocale } from '../fixtures/locale.fixture';
import { seedZustandState } from '../fixtures/store.fixture';

describe('splash screen flow', () => {
  test('should require disclaimer acceptance before continuing', async ({ page }) => {
    // Arrange
    const splash = new SplashPage(page);
    await splash.goto();

    // Act - try to continue without accepting
    const isDisabled = await splash.isContinueDisabled();

    // Assert
    expect(isDisabled).toBe(true);

    // Act - accept disclaimer
    await splash.acceptDisclaimer();

    // Assert - continue button should now be enabled
    expect(await splash.isContinueDisabled()).toBe(false);
  });

  test('should navigate to start page after accepting disclaimer', async ({ page }) => {
    // Arrange
    const splash = new SplashPage(page);
    await splash.goto();

    // Act
    await splash.acceptDisclaimer();
    await splash.clickContinue();

    // Assert
    await expect(page).toHaveURL(/\/start/);
    const start = new StartPage(page);
    await expect(start.weetellLogo).toBeVisible();
  });

  test('should display German translations when locale is set to de', async ({ page }) => {
    // Arrange
    await setLocale(page, 'de');
    await page.goto('/start');

    // Act & Assert
    await expect(page.getByText('Wie alt ist Ihr Kind?')).toBeVisible();
  });
});
```

### Arrange-Act-Assert Pattern

Every test should follow this structure:

1. **Arrange**: Set up the preconditions. Navigate to a page, seed state, create page objects.
2. **Act**: Perform the user action. Click a button, fill a form, select an option.
3. **Assert**: Verify the outcome. Check URL, visible elements, state changes.

### Using Fixtures and Page Objects Together

```typescript
test('complete assessment flow in German', async ({ page }) => {
  // Arrange: seed state and create page objects
  await seedZustandState(page, { locale: 'de', showTextLabels: true });
  const splash = new SplashPage(page);
  const start = new StartPage(page);
  const checkup = new CheckupPage(page);
  const ageSelection = new AgeSelection(page);

  // Act: go through the flow
  await splash.goto();
  await splash.acceptDisclaimer();
  await splash.clickContinue();

  await expect(page).toHaveURL(/\/start/);
  await start.selectLocale('de');

  await checkup.goto('age');
  await ageSelection.selectBaby();

  // Assert: verify state progressed
  expect(checkup.getStepFromUrl()).toBeTruthy();
});
```

### Common Assertions

```typescript
// URL assertions
await expect(page).toHaveURL('/start');
await expect(page).toHaveURL(/\/checkup/);

// Visibility assertions
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// State assertions
await expect(element).toHaveText('Expected Text');
await expect(element).toHaveAttribute('src', '/assets/image.png');
await expect(element).toBeDisabled();
await expect(element).toBeEnabled();
await expect(element).toBeChecked();

// Count assertions
await expect(page.locator('.locale-option')).toHaveCount(5);

// Text content
await expect(page.getByText('Continue')).toBeVisible();
```

---

## State Management

### How Zustand Persistence Works

Weetell uses Zustand with the `persist` middleware. State is serialized to `localStorage` under the key `weetell-storage`. The structure looks like:

```json
{
  "state": {
    "locale": "en",
    "ageGroup": null,
    "bodyPart": null,
    "symptom": null,
    "severity": null,
    "actionDecision": null,
    "urgencyLevel": null,
    "showTextLabels": true,
    "showSubtitles": true
  }
}
```

Note that `currentSubtitle` is NOT persisted (it is transient).

### Seeding State Before Tests

Use `seedZustandState` to pre-populate state. This merges your partial state with whatever currently exists:

```typescript
await seedZustandState(page, {
  locale: 'fr',
  ageGroup: 'teen',
  showTextLabels: false,
});
```

Call this **before** navigating to the page that reads the state. Zustand hydrates from localStorage on page load.

### Clearing State Between Tests

The `base.fixture.ts` automatically clears localStorage before each test via `beforeEachHook`. You should not need to manually clear state in most cases.

If you need explicit clearing within a test:

```typescript
import { clearZustandState } from '../fixtures/store.fixture';

await clearZustandState(page);
```

### Testing with Pre-Populated State

This is useful for testing later steps in the flow without going through the entire journey:

```typescript
test('displays urgency results with pre-seeded assessment', async ({ page }) => {
  // Seed a completed assessment state
  await seedZustandState(page, {
    locale: 'en',
    ageGroup: 'baby',
    bodyPart: 'head',
    symptom: 'fever',
    severity: 3,
    actionDecision: 'doctor',
    urgencyLevel: 'urgent',
  });

  // Navigate directly to results
  await page.goto('/results');

  // Verify the results page renders correctly
  await expect(page.getByText(/urgent/i)).toBeVisible();
});
```

---

## Debugging

### Playwright Inspector

Run tests with the `--debug` flag to open the inspector:

```bash
npx playwright test --debug
```

The inspector lets you:

- Step through each action one at a time
- See the current DOM snapshot
- Inspect element selectors
- Pause and resume execution

### Trace Viewer

Traces capture screenshots, DOM snapshots, and console logs for each test step. They are recorded on retry by default (`trace: 'on-first-retry'`).

To record traces for all tests, update `playwright.config.ts`:

```typescript
use: {
  trace: 'on',  // or 'retain-on-failure'
}
```

View a trace:

```bash
npx playwright show-trace playwright-report/data/trace.zip
```

Or open the HTML report and click "Trace" on a failed test.

### Screenshots on Failure

Screenshots are automatically captured when a test fails (`screenshot: 'only-on-failure'`). They are saved to the test-results directory.

To take a manual screenshot in a test:

```typescript
await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
```

### Video on Failure

Videos are recorded on retry (`video: 'retry-with-video'`). To always record:

```typescript
use: {
  video: 'on',  // or 'retain-on-failure'
}
```

### Console Logs

Access browser console output in your test:

```typescript
page.on('console', msg => {
  console.log(`[${msg.type()}] ${msg.text()}`);
});
```

### Page Pause

Pause execution at any point for manual inspection:

```typescript
await page.pause();
```

This opens the Playwright Inspector at that exact moment.

---

## CI/CD

### GitHub Actions

The E2E tests can run in CI using Playwright's official Docker image. Here is a sample workflow:

```yaml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          CI: true

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Headless Mode

Tests run headless by default in the config. In CI, this is automatic. For local headless runs:

```bash
npm run test:e2e
```

### Retry Configuration

In CI, tests retry up to 2 times on failure (`retries: process.env.CI ? 2 : 0`). Traces are captured on the first retry for debugging.

To change retry count:

```bash
npx playwright test --retries=3
```

---

## Common Patterns

### Testing Multi-Step Flows

Break the flow into logical sections. Use page objects for each step:

```typescript
test('complete baby fever assessment flow', async ({ page }) => {
  // Step 1: Splash
  const splash = new SplashPage(page);
  await splash.goto();
  await splash.acceptDisclaimer();
  await splash.clickContinue();
  await expect(page).toHaveURL(/\/start/);

  // Step 2: Locale selection
  const start = new StartPage(page);
  await start.selectLocale('en');

  // Step 3: Age selection
  const checkup = new CheckupPage(page);
  const ageSelection = new AgeSelection(page);
  await checkup.goto('age');
  await ageSelection.selectBaby();

  // Step 4: Body map
  const bodyMap = new BodyMapSelection(page);
  await checkup.goto('body');
  await bodyMap.selectBodyPart('head');

  // Step 5: Symptom selection
  const detailed = new DetailedBodySelection(page);
  await detailed.selectSymptom('fever');

  // Step 6: Severity
  const severity = new SeveritySelection(page);
  await severity.selectDoctor();

  // Step 7: Urgency results
  const urgency = new UrgencySelection(page);
  await expect(page).toHaveURL(/\/results/);
});
```

### Testing Locale Switching

Use the locale fixture to set state, then verify translated text:

```typescript
import { setLocale, t } from '../fixtures/locale.fixture';

const locales: Array<{ code: 'en' | 'de' | 'es' | 'tr' | 'fr'; name: string }> = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'fr', name: 'French' },
];

for (const { code, name } of locales) {
  test(`displays ${name} continue button`, async ({ page }) => {
    await setLocale(page, code);
    await page.goto('/start');

    const expectedText = t('continue', code);
    await expect(page.getByText(expectedText)).toBeVisible();
  });
}
```

### Testing Accessibility Toggles

Toggle text labels and subtitles, then verify UI changes:

```typescript
test('toggling text labels hides/shows labels', async ({ page }) => {
  await seedZustandState(page, { showTextLabels: true });
  await page.goto('/checkup?step=age');

  // Labels should be visible
  await expect(page.getByText('Baby')).toBeVisible();

  // Toggle off
  await seedZustandState(page, { showTextLabels: false });
  await page.reload();

  // Labels should be hidden
  await expect(page.getByText('Baby')).toBeHidden();
});
```

### Testing URL State (nuqs)

Verify that URL query parameters reflect the current step:

```typescript
test('URL reflects current assessment step', async ({ page }) => {
  const checkup = new CheckupPage(page);

  await checkup.goto('age');
  await expect(page).toHaveURL(/step=age/);

  await checkup.goto('body');
  await expect(page).toHaveURL(/step=body/);

  // Verify the helper extracts the step correctly
  expect(checkup.getStepFromUrl()).toBe('body');
});
```

---

## Troubleshooting

### Common Errors

#### "Page.goto: net::ERR_CONNECTION_REFUSED"

The dev server is not running. Playwright should start it automatically, but if it fails:

```bash
# Start the dev server manually
npm run dev

# Then run tests with reuseExistingServer
npx playwright test
```

#### "Element is not visible"

The element may be hidden, off-screen, or not yet rendered. Solutions:

```typescript
// Wait for the element explicitly
await page.waitForSelector('img[alt="Baby"]', { state: 'visible' });

// Scroll into view
await element.scrollIntoViewIfNeeded();

// Check if it exists at all
const count = await page.locator('img[alt="Baby"]').count();
console.log('Found elements:', count);
```

#### "Test timed out"

Default timeout is 30 seconds. For slow operations:

```typescript
// Increase timeout for a single test
test('slow test', async ({ page }) => {
  test.setTimeout(60_000);
  // ...
});

// Or increase in config (playwright.config.ts)
timeout: 60_000,
```

#### State Leakage Between Tests

If one test's state affects another:

1. Verify `base.fixture.ts` `beforeEachHook` is running (it clears localStorage)
2. Avoid sharing state between tests
3. Use `clearZustandState(page)` explicitly if needed
4. Run tests serially to isolate: `npx playwright test --workers=1`

#### "Cannot find module" for Fixtures or Page Objects

Check your import paths. All imports should be relative from the test file:

```typescript
// From e2e/tests/my-test.spec.ts
import { test, expect } from '../fixtures/base.fixture';
import { SplashPage } from '../page-objects/SplashPage';
```

#### Selectors Not Matching

Selectors in page objects may drift if the UI changes. Debug with:

```typescript
// Log all matching elements
const elements = await page.locator('img[alt*="Baby"]').all();
console.log('Found:', elements.length);

// Use Playwright's locator debugging
await page.locator('img[alt*="Baby"]').highlight();
```

### Timeout Issues

| Timeout Type | Default | Where to Change |
|-------------|---------|----------------|
| Test timeout | 30s | `playwright.config.ts` or `test.setTimeout()` |
| Expect timeout | 10s | `playwright.config.ts` expect.timeout |
| Action timeout | 15s | `playwright.config.ts` use.actionTimeout |
| Web server startup | 120s | `playwright.config.ts` webServer.timeout |

### Debugging Checklist

When a test fails:

1. Run with `--headed` to see what happens
2. Run with `--debug` to step through
3. Check the HTML report: `npx playwright show-report`
4. Look at the trace if available
5. Check the screenshot in `test-results/`
6. Add `console.log` statements to understand state
7. Use `await page.pause()` at the failure point

---

## Test Coverage

### Test Files

| File | Covers | Status |
|------|--------|--------|
| `tests/splash-flow.spec.ts` | Splash screen, disclaimer checkbox, audio toggle, navigation to start | To be created |
| `tests/locale-selection.spec.ts` | Language selection, translation verification, locale persistence | To be created |
| `tests/age-selection.spec.ts` | Baby/child/teen selection, age-based routing | To be created |
| `tests/body-map.spec.ts` | SVG body map, front/back rotation, body part selection | To be created |
| `tests/symptom-assessment.spec.ts` | Symptom selection, severity rating, action decision | To be created |
| `tests/accessibility.spec.ts` | Text labels toggle, subtitles toggle, screen reader support | To be created |
| `tests/full-flow.spec.ts` | End-to-end complete assessment journey | To be created |

### User Flow Diagram

```
Splash (/)
  │
  ├─ [ ] Accept disclaimer
  │
  ├─ [ ] Toggle audio (optional)
  │
  ▼
Start (/start)
  │
  ├─ [ ] Select locale (en/de/es/tr/fr)
  │
  ▼
Checkup - Age (/checkup?step=age)
  │
  ├─ [ ] Select age group (baby/child/teen)
  │
  ▼
Checkup - Body (/checkup?step=body)
  │
  ├─ [ ] Select body part on SVG map
  │
  ▼
Checkup - Symptom (/checkup?step=symptom)
  │
  ├─ [ ] Select specific symptom
  │
  ▼
Checkup - Severity (/checkup?step=severity)
  │
  ├─ [ ] Watch video (optional)
  ├─ [ ] Select action (wait/doctor)
  │
  ▼
Results (/results)
  │
  ├─ [ ] View urgency level
  ├─ [ ] Find doctor / view map
  │
  ▼
Complete
```

### Browser Matrix

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chromium | Yes | - |
| Firefox | Yes | - |
| WebKit (Safari) | Yes | - |
| Chrome | - | iPhone 13 |

---

## Adding New Tests

1. **Create a new spec file** in `e2e/tests/` following the naming convention.
2. **Import fixtures and page objects** from the appropriate directories.
3. **Write tests** using the Arrange-Act-Assert pattern.
4. **Run the new file** to verify: `npx playwright test e2e/tests/your-new-test.spec.ts`
5. **Run the full suite** to ensure no regressions: `npm run test:e2e`

If you need new page objects for a page not yet covered, add them to `e2e/page-objects/` following the existing patterns.
