import { Page } from '@playwright/test';

export type AgeGroup = 'baby' | 'child' | 'teen' | null;
export type Locale = 'de' | 'es' | 'tr' | 'en' | 'fr';
export type BodyPart = string | null;
export type ActionDecision = 'wait' | 'doctor' | null;
export type UrgencyLevel = 'routine' | 'urgent' | 'emergency' | null;

export interface AssessmentState {
  locale: Locale;
  ageGroup: AgeGroup;
  bodyPart: BodyPart;
  symptom: string | null;
  severity: number | null;
  actionDecision: ActionDecision;
  urgencyLevel: UrgencyLevel;
  currentSubtitle: string;
  showTextLabels: boolean;
  showSubtitles: boolean;
}

const STORAGE_KEY = 'weetell-storage';

function getDefaultState(): AssessmentState {
  return {
    locale: 'en',
    ageGroup: null,
    bodyPart: null,
    symptom: null,
    severity: null,
    actionDecision: null,
    urgencyLevel: null,
    currentSubtitle: '',
    showTextLabels: true,
    showSubtitles: true,
  };
}

export async function seedZustandState(page: Page, state: Partial<AssessmentState>): Promise<void> {
  const currentState = await getZustandState(page);
  const mergedState = { ...currentState, ...state };

  await page.evaluate(
    ([key, merged]) => {
      const data = localStorage.getItem(key);
      let parsed: Record<string, unknown> = {};

      if (data) {
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = {};
        }
      }

      const existingState = (parsed.state as Record<string, unknown>) || {};
      parsed.state = { ...existingState, ...JSON.parse(JSON.stringify(merged)) };
      localStorage.setItem(key, JSON.stringify(parsed));
    },
    [STORAGE_KEY, mergedState] as [string, AssessmentState]
  );
}

export async function clearZustandState(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.removeItem(key);
  }, STORAGE_KEY);
}

export async function getZustandState(page: Page): Promise<AssessmentState> {
  const result = await page.evaluate((key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      const parsed = JSON.parse(data);
      return parsed.state || null;
    } catch {
      return null;
    }
  }, STORAGE_KEY);

  return result ?? getDefaultState();
}