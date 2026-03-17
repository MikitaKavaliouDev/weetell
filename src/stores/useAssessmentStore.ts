import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AgeGroup = 'baby' | 'child' | 'teen' | null;
export type Locale = 'de' | 'es' | 'tr' | 'en';
export type BodyPart = string | null;
export type ActionDecision = 'wait' | 'doctor' | null;
export type UrgencyLevel = 'routine' | 'urgent' | 'emergency' | null;

interface AssessmentState {
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
  
  // Actions
  setLocale: (locale: Locale) => void;
  setAgeGroup: (group: AgeGroup) => void;
  setBodyPart: (part: BodyPart) => void;
  setSymptom: (symptomId: string | null) => void;
  setSeverity: (severity: number | null) => void;
  setActionDecision: (decision: ActionDecision) => void;
  setUrgencyLevel: (level: UrgencyLevel) => void;
  setCurrentSubtitle: (subtitle: string) => void;
  clearSubtitle: () => void;
  toggleTextLabels: () => void;
  toggleSubtitles: () => void;
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
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

      setLocale: (locale) => set({ locale }),
      setAgeGroup: (ageGroup) => set({ ageGroup }),
      setBodyPart: (bodyPart) => set({ bodyPart }),
      setSymptom: (symptomId) => set({ symptom: symptomId }),
      setSeverity: (severity) => set({ severity }),
      setActionDecision: (actionDecision) => set({ actionDecision }),
      setUrgencyLevel: (urgencyLevel) => set({ urgencyLevel }),
      setCurrentSubtitle: (subtitle) => set({ currentSubtitle: subtitle }),
      clearSubtitle: () => set({ currentSubtitle: '' }),
      toggleTextLabels: () => set((state) => ({ showTextLabels: !state.showTextLabels })),
      toggleSubtitles: () => set((state) => ({ showSubtitles: !state.showSubtitles })),
      resetAssessment: () => set({
        ageGroup: null,
        bodyPart: null,
        symptom: null,
        severity: null,
        actionDecision: null,
        urgencyLevel: null,
        // Intentionally not resetting accessibility settings
      }),
    }),
    {
      name: 'weetell-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        locale: state.locale, 
        ageGroup: state.ageGroup,
        bodyPart: state.bodyPart,
        symptom: state.symptom,
        severity: state.severity,
        actionDecision: state.actionDecision,
        urgencyLevel: state.urgencyLevel,
        showTextLabels: state.showTextLabels,
        showSubtitles: state.showSubtitles 
      }),
    }
  )
);
