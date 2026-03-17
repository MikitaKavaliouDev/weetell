export type TemperatureRange = {
  maxTemp: number;
  videoUrl: string;
  videoUrlDe: string;
  urgency: 'routine' | 'urgent' | 'emergency';
};

export type Symptom = {
  id: string;
  label: string;
  labelDe: string;
  icon?: string;
  videoUrl: string;
  videoUrlDe: string;
  temperatureRanges: TemperatureRange[];
  waitGuidance: {
    title: string;
    titleDe: string;
    steps: { text: string; textDe: string }[];
  };
  doctorGuidance: {
    routine: string;
    routineDe: string;
    urgent: string;
    urgentDe: string;
    emergency: string;
    emergencyDe: string;
  };
};

export const SYMPTOM_GRAPH: Record<string, Symptom[]> = {
  head: [
    {
      id: 'fever',
      label: 'Fever',
      labelDe: 'Fieber',
      icon: 'thermometer',
      videoUrl: '/videos/fever-guide.mp4',
      videoUrlDe: '/videos/fever-guide.mp4',
      temperatureRanges: [
        { maxTemp: 37.5, videoUrl: '/videos/fever-low.mp4', videoUrlDe: '/videos/fever-low.mp4', urgency: 'routine' },
        { maxTemp: 39.0, videoUrl: '/videos/fever-medium.mp4', videoUrlDe: '/videos/fever-medium.mp4', urgency: 'routine' },
        { maxTemp: 40.0, videoUrl: '/videos/fever-high.mp4', videoUrlDe: '/videos/fever-high.mp4', urgency: 'urgent' },
      ],
      waitGuidance: {
        title: 'Fever Care',
        titleDe: 'Fieberpflege',
        steps: [
          { text: 'Monitor temperature every 4 hours', textDe: 'Temperatur alle 4 Stunden messen' },
          { text: 'Keep child hydrated with fluids', textDe: 'Kind mit Flüssigkeiten versorgen' },
          { text: 'Ensure adequate rest and sleep', textDe: 'Für ausreichend Ruhe sorgen' },
          { text: 'Use fever reducer medication if needed', textDe: 'Fiebersenkende Medikamente bei Bedarf' },
        ],
      },
      doctorGuidance: {
        routine: 'Schedule an appointment with your pediatrician within 2-3 days.',
        routineDe: 'Vereinbaren Sie einen Termin mit Ihrem Kinderarzt in 2-3 Tagen.',
        urgent: 'Seek medical attention today - visit a clinic or urgent care.',
        urgentDe: 'Suchen Sie noch heute medizinische Hilfe auf - besuchen Sie eine Klinik oder Notfallpraxis.',
        emergency: 'Call emergency services immediately or go to the nearest emergency room.',
        emergencyDe: 'Rufen Sie sofort den Notdienst oder gehen Sie in die nächste Notaufnahme.',
      },
    },
  ],
  skin: [
    {
      id: 'fever',
      label: 'Fever',
      labelDe: 'Fieber',
      icon: 'thermometer',
      videoUrl: '/videos/fever-guide.mp4',
      videoUrlDe: '/videos/fever-guide.mp4',
      temperatureRanges: [
        { maxTemp: 37.5, videoUrl: '/videos/fever-low.mp4', videoUrlDe: '/videos/fever-low.mp4', urgency: 'routine' },
        { maxTemp: 39.0, videoUrl: '/videos/fever-medium.mp4', videoUrlDe: '/videos/fever-medium.mp4', urgency: 'routine' },
        { maxTemp: 40.0, videoUrl: '/videos/fever-high.mp4', videoUrlDe: '/videos/fever-high.mp4', urgency: 'urgent' },
      ],
      waitGuidance: {
        title: 'Fever Care',
        titleDe: 'Fieberpflege',
        steps: [
          { text: 'Monitor temperature every 4 hours', textDe: 'Temperatur alle 4 Stunden messen' },
          { text: 'Keep child hydrated with fluids', textDe: 'Kind mit Flüssigkeiten versorgen' },
          { text: 'Ensure adequate rest and sleep', textDe: 'Für ausreichend Ruhe sorgen' },
          { text: 'Use fever reducer medication if needed', textDe: 'Fiebersenkende Medikamente bei Bedarf' },
        ],
      },
      doctorGuidance: {
        routine: 'Schedule an appointment with your pediatrician within 2-3 days.',
        routineDe: 'Vereinbaren Sie einen Termin mit Ihrem Kinderarzt in 2-3 Tagen.',
        urgent: 'Seek medical attention today - visit a clinic or urgent care.',
        urgentDe: 'Suchen Sie noch heute medizinische Hilfe auf - besuchen Sie eine Klinik oder Notfallpraxis.',
        emergency: 'Call emergency services immediately or go to the nearest emergency room.',
        emergencyDe: 'Rufen Sie sofort den Notdienst oder gehen Sie in die nächste Notaufnahme.',
      },
    },
  ],
};

export function getSymptomById(bodyPart: string, symptomId: string): Symptom | undefined {
  const symptoms = SYMPTOM_GRAPH[bodyPart];
  return symptoms?.find((s) => s.id === symptomId);
}

export function getLocalizedSymptom(bodyPart: string, symptomId: string, locale: string): string {
  const symptom = getSymptomById(bodyPart, symptomId);
  if (!symptom) return '';
  return locale === 'de' ? symptom.labelDe : symptom.label;
}

export function getVideoForTemperature(bodyPart: string, symptomId: string, temperature: number, locale: string): string {
  const symptom = getSymptomById(bodyPart, symptomId);
  if (!symptom) return '';
  
  const range = symptom.temperatureRanges.find(r => temperature <= r.maxTemp);
  if (!range) return symptom.videoUrl;
  
  return locale === 'de' ? range.videoUrlDe : range.videoUrl;
}

export function getUrgencyForTemperature(bodyPart: string, symptomId: string, temperature: number): 'routine' | 'urgent' | 'emergency' {
  const symptom = getSymptomById(bodyPart, symptomId);
  if (!symptom) return 'routine';
  
  const range = symptom.temperatureRanges.find(r => temperature <= r.maxTemp);
  return range?.urgency || 'routine';
}
