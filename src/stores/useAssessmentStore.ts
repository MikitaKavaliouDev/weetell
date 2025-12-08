import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AgeGroup = 'baby' | 'child' | null;
export type Locale = 'de' | 'es' | 'tr' | 'en';
export type BodyPart = string | null;

interface AssessmentState {
  locale: Locale;
  ageGroup: AgeGroup;
  bodyPart: BodyPart;
  symptoms: string[];
  severity: number | null; // 0-10 or temperature
  
  // Actions
  setLocale: (locale: Locale) => void;
  setAgeGroup: (group: AgeGroup) => void;
  setBodyPart: (part: BodyPart) => void;
  toggleSymptom: (symptomId: string) => void;
  setSeverity: (severity: number | null) => void;
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
      resetAssessment: () => set({
        ageGroup: null,
        bodyPart: null,
        symptoms: [],
        severity: null
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
        severity: state.severity 
      }),
    }
  )
);
