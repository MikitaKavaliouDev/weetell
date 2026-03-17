export type temperatureRange = {
  maxTemp: number;
  videoUrl: string;
  videoUrlDe: string;
  urgency: 'routine' | 'urgent' | 'emergency';
};

export type AgeGroup = 'baby' | 'child' | 'teen';

export type Symptom = {
  id: string;
  label: string;
  labelDe: string;
  icon?: string;
  videoUrl: string;
  videoUrlDe: string;
  temperatureRanges: temperatureRange[];
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

const FEVER_DATA: Symptom = {
  id: 'fever',
  label: 'Fever',
  labelDe: 'Fieber',
  icon: 'thermometer',
  videoUrl: '/videos/high_fever_en.mp4',
  videoUrlDe: '/videos/high_fever_de.mp4',
  temperatureRanges: [
    { maxTemp: 37.5, videoUrl: '/videos/low_fever_en.mp4', videoUrlDe: '/videos/low_fever_de.mp4', urgency: 'routine' },
    { maxTemp: 39.0, videoUrl: '/videos/medium_fever_en.mp4', videoUrlDe: '/videos/medium_fever_de.mp4', urgency: 'routine' },
    { maxTemp: 40.0, videoUrl: '/videos/high_fever_en.mp4', videoUrlDe: '/videos/high_fever_de.mp4', urgency: 'urgent' },
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
};

export const SYMPTOM_GRAPH: Record<string, Record<AgeGroup, Symptom[]>> = {
  head: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
  chest: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
  stomach: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
  arms: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
  legs: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
  back: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
  skin: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
};

export function getSymptomsForBodyAndAge(bodyPart: string, ageGroup: AgeGroup): Symptom[] {
  const bodyPartData = SYMPTOM_GRAPH[bodyPart];
  if (!bodyPartData) return [];
  return bodyPartData[ageGroup] || [];
}

export function getSymptomById(bodyPart: string, ageGroup: AgeGroup, symptomId: string): Symptom | undefined {
  const symptoms = getSymptomsForBodyAndAge(bodyPart, ageGroup);
  return symptoms.find((s) => s.id === symptomId);
}

export function getLocalizedSymptom(bodyPart: string, ageGroup: AgeGroup, symptomId: string, locale: string): string {
  const symptom = getSymptomById(bodyPart, ageGroup, symptomId);
  if (!symptom) return '';
  return locale === 'de' ? symptom.labelDe : symptom.label;
}

export function getVideoForTemperature(bodyPart: string, ageGroup: AgeGroup, symptomId: string, temperature: number, locale: string): string {
  const symptom = getSymptomById(bodyPart, ageGroup, symptomId);
  if (!symptom) return '';
  
  const range = symptom.temperatureRanges.find(r => temperature <= r.maxTemp);
  if (!range) return locale === 'de' ? symptom.videoUrlDe : symptom.videoUrl;
  
  return locale === 'de' ? range.videoUrlDe : range.videoUrl;
}

export function getUrgencyForTemperature(bodyPart: string, ageGroup: AgeGroup, symptomId: string, temperature: number): 'routine' | 'urgent' | 'emergency' {
  const symptom = getSymptomById(bodyPart, ageGroup, symptomId);
  if (!symptom) return 'routine';
  
  const range = symptom.temperatureRanges.find(r => temperature <= r.maxTemp);
  return range?.urgency || 'routine';
}

export function getDoctorGuidance(bodyPart: string, ageGroup: AgeGroup, symptomId: string, urgency: string, locale: string): string {
  const symptom = getSymptomById(bodyPart, ageGroup, symptomId);
  if (!symptom) return '';
  
  const guidance = symptom.doctorGuidance;
  if (urgency === 'emergency') {
    return locale === 'de' ? guidance.emergencyDe : guidance.emergency;
  }
  if (urgency === 'urgent') {
    return locale === 'de' ? guidance.urgentDe : guidance.urgent;
  }
  return locale === 'de' ? guidance.routineDe : guidance.routine;
}
