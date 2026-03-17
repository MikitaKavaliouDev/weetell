export type Symptom = {
  id: string;
  label: string;
  icon?: string;
};

export const SYMPTOM_GRAPH: Record<string, Symptom[]> = {
  head: [
    { id: 'fever_head', label: 'Hot Head' },
    { id: 'headache', label: 'Headache' },
    { id: 'chills', label: 'Chills' },
    { id: 'sweating', label: 'Sweating' },
  ],
  skin: [
    { id: 'sweating', label: 'Sweating' },
    { id: 'chills', label: 'Chills' },
    { id: 'flushed', label: 'Flushed Skin' },
  ],
};
