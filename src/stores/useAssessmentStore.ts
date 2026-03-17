import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AgeGroup = 'baby' | 'child' | 'teen' | null;
export type Locale = 'de' | 'es' | 'tr' | 'en';
export type BodyPart = string | null;
export type ActionDecision = 'wait' | 'doctor' | null;

interface AssessmentState {
  locale: Locale;
  ageGroup: AgeGroup;
  bodyPart: BodyPart;
  symptoms: string[];
  severity: number | null;
  actionDecision: ActionDecision;
  currentSubtitle: string;
  showTextLabels: boolean;
  showSubtitles: boolean;
  
  // Actions
  setLocale: (locale: Locale) => void;
  setAgeGroup: (group: AgeGroup) => void;
  setBodyPart: (part: BodyPart) => void;
  toggleSymptom: (symptomId: string) => void;
  setSeverity: (severity: number | null) => void;
  setActionDecision: (decision: ActionDecision) => void;
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
      symptoms: [],
      severity: null,
      actionDecision: null,
      currentSubtitle: '',
      showTextLabels: true,
      showSubtitles: true,

      setLocale: (locale) => set({ locale }),
      setAgeGroup: (ageGroup) => set({ ageGroup }),
      setBodyPart: (bodyPart) => set({ bodyPart }),
      toggleSymptom: (symptomId) =>
        set((state) => {
          const exists = state.symptoms.includes(symptomId);
          return {
            symptoms: exists
              ? state.symptoms.filter((id) => id !== symptomId)
              : [...state.symptoms, symptomId],
          };
        }),
      setSeverity: (severity) => set({ severity }),
      setActionDecision: (actionDecision) => set({ actionDecision }),
      setCurrentSubtitle: (subtitle) => set({ currentSubtitle: subtitle }),
      clearSubtitle: () => set({ currentSubtitle: '' }),
      toggleTextLabels: () => set((state) => ({ showTextLabels: !state.showTextLabels })),
      toggleSubtitles: () => set((state) => ({ showSubtitles: !state.showSubtitles })),
      resetAssessment: () => set({
        ageGroup: null,
        bodyPart: null,
        symptoms: [],
        severity: null,
        actionDecision: null,
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
        symptoms: state.symptoms,
        severity: state.severity,
        actionDecision: state.actionDecision,
        showTextLabels: state.showTextLabels,
        showSubtitles: state.showSubtitles 
      }),
    }
  )
);
