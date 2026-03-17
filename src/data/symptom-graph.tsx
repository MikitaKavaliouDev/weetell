export type Symptom = {
  id: string;
  label: string;
  icon?: string; // Placeholder for icon name
};

export const SYMPTOM_GRAPH: Record<string, Symptom[]> = {
  head: [
    { id: 'headache', label: 'Headache' },
    { id: 'dizziness', label: 'Dizziness' },
    { id: 'vision', label: 'Vision Prob.' },
    { id: 'fever_head', label: 'Hot Head' },
  ],
  chest: [
    { id: 'cough', label: 'Cough' },
    { id: 'shortness_breath', label: 'Short Breath' },
    { id: 'heart_palp', label: 'Palpitations' },
    { id: 'chest_pain', label: 'Chest Pain' },
  ],
  stomach: [
    { id: 'nausea', label: 'Nausea' },
    { id: 'vomiting', label: 'Vomiting' },
    { id: 'diarrhea', label: 'Diarrhea' },
    { id: 'stomach_ache', label: 'Stomach Ache' },
  ],
  legs: [
    { id: 'leg_pain', label: 'Leg Pain' },
    { id: 'swelling', label: 'Swelling' },
    { id: 'rash_legs', label: 'Rash' },
  ],
  arms: [
    { id: 'arm_pain', label: 'Arm Pain' },
    { id: 'numbness', label: 'Numbness' },
    { id: 'rash_arms', label: 'Rash' },
  ],
  back: [
    { id: 'back_pain', label: 'Back Pain' },
    { id: 'stiffness', label: 'Stiffness' },
    { id: 'rash_back', label: 'Rash' },
  ],
  skin: [
    { id: 'rash', label: 'Rash' },
    { id: 'itching', label: 'Itching' },
    { id: 'hives', label: 'Hives' },
    { id: 'bumps', label: 'Bumps' },
    { id: 'discoloration', label: 'Discoloration' },
  ],
};
