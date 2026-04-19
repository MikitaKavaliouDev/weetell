export type temperatureRange = {
  maxTemp: number;
  videoUrl: string;
  videoUrlDe: string;
  videoUrlEs: string;
  videoUrlTr: string;
  urgency: 'routine' | 'urgent' | 'emergency';
};

export type AgeGroup = 'baby' | 'child' | 'teen';

export type Symptom = {
  id: string;
  label: string;
  labelDe: string;
  labelEs: string;
  labelTr: string;
  icon?: string;
  videoUrl: string;
  videoUrlDe: string;
  videoUrlEs: string;
  videoUrlTr: string;
  temperatureRanges: temperatureRange[];
  waitGuidance: {
    title: string;
    titleDe: string;
    titleEs: string;
    titleTr: string;
    steps: { text: string; textDe: string; textEs: string; textTr: string }[];
  };
  doctorGuidance: {
    routine: string;
    routineDe: string;
    routineEs: string;
    routineTr: string;
    urgent: string;
    urgentDe: string;
    urgentEs: string;
    urgentTr: string;
    emergency: string;
    emergencyDe: string;
    emergencyEs: string;
    emergencyTr: string;
  };
};

const FEVER_DATA: Symptom = {
  id: 'fever',
  label: 'Fever',
  labelDe: 'Fieber',
  labelEs: 'Fiebre',
  labelTr: 'Ateş',
  icon: 'fever',
  videoUrl: '/videos/high_fever_en.mp4',
  videoUrlDe: '/videos/high_fever_de.mp4',
  videoUrlEs: '/videos/high_fever_es.mp4',
  videoUrlTr: '/videos/high_fever_tr.mp4',
  temperatureRanges:[
    { maxTemp: 37.5, videoUrl: '/videos/low_fever_en.mp4', videoUrlDe: '/videos/low_fever_de.mp4', videoUrlEs: '/videos/low_fever_es.mp4', videoUrlTr: '/videos/low_fever_tr.mp4', urgency: 'routine' },
    { maxTemp: 39.0, videoUrl: '/videos/medium_fever_en.mp4', videoUrlDe: '/videos/medium_fever_de.mp4', videoUrlEs: '/videos/medium_fever_es.mp4', videoUrlTr: '/videos/medium_fever_tr.mp4', urgency: 'routine' },
    { maxTemp: 40.0, videoUrl: '/videos/high_fever_en.mp4', videoUrlDe: '/videos/high_fever_de.mp4', videoUrlEs: '/videos/high_fever_es.mp4', videoUrlTr: '/videos/high_fever_tr.mp4', urgency: 'urgent' },
  ],
  waitGuidance: {
    title: 'Fever Care',
    titleDe: 'Fieberpflege',
    titleEs: 'Cuidado de la Fiebre',
    titleTr: 'Ateş Bakımı',
    steps:[
      { text: 'Monitor temperature every 4 hours', textDe: 'Temperatur alle 4 Stunden messen', textEs: 'Controle la temperatura cada 4 horas', textTr: 'Her 4 saatte bir sıcaklığı kontrol edin' },
      { text: 'Keep child hydrated with fluids', textDe: 'Kind mit Flüssigkeiten versorgen', textEs: 'Mantenga al niño hidratado con líquidos', textTr: 'Çocuğu sıvılarla hidrate edin' },
      { text: 'Ensure adequate rest and sleep', textDe: 'Für ausreichend Ruhe sorgen', textEs: 'Asegure descanso y sueño adecuados', textTr: 'Yeterli dinlenme ve uyku sağlayın' },
      { text: 'Use fever reducer medication if needed', textDe: 'Fiebersenkende Medikamente bei Bedarf', textEs: 'Use medicamento antifebril si es necesario', textTr: 'Gerekirse ateş düşürücü ilaç kullanın' },
    ],
  },
  doctorGuidance: {
    routine: 'Schedule an appointment with your pediatrician within 2-3 days.',
    routineDe: 'Vereinbaren Sie einen Termin mit Ihrem Kinderarzt in 2-3 Tagen.',
    routineEs: 'Programe una cita con su pediatra en 2-3 días.',
    routineTr: '2-3 gün içinde çocuk doktorunuzla randevu alın.',
    urgent: 'Seek medical attention today - visit a clinic or urgent care.',
    urgentDe: 'Suchen Sie noch heute medizinische Hilfe auf - besuchen Sie eine Klinik oder Notfallpraxis.',
    urgentEs: 'Busque atención médica hoy - visite una clínica o urgencia.',
    urgentTr: 'Bugün tıbbi yardım arayın - bir kliniği veya acil servisi ziyaret edin.',
    emergency: 'Call emergency services immediately or go to the nearest emergency room.',
    emergencyDe: 'Rufen Sie sofort den Notdienst oder gehen Sie in die nächste Notaufnahme.',
    emergencyEs: 'Llame a emergencias inmediatamente o vaya a la sala de emergencia más cercana.',
    emergencyTr: 'Acil servisleri hemen arayın veya en yakın acil servise gidin.',
  },
};

const HEADACHE_DATA: Symptom = { ...FEVER_DATA, id: 'headache', label: 'Headache', labelDe: 'Kopfschmerzen', labelEs: 'Dolor de cabeza', labelTr: 'Baş ağrısı', icon: 'headache' };
const DIZZINESS_DATA: Symptom = { ...FEVER_DATA, id: 'dizziness', label: 'Dizziness', labelDe: 'Schwindel', labelEs: 'Mareo', labelTr: 'Baş dönmesi', icon: 'dizziness' };
const VISION_DATA: Symptom = { ...FEVER_DATA, id: 'vision', label: 'Vision', labelDe: 'Sicht', labelEs: 'Visión', labelTr: 'Görme', icon: 'vision' };

export const SYMPTOM_GRAPH: Record<string, Record<AgeGroup, Symptom[]>> = {
  head: {
    baby:[FEVER_DATA, HEADACHE_DATA, DIZZINESS_DATA, VISION_DATA],
    child:[FEVER_DATA, HEADACHE_DATA, DIZZINESS_DATA, VISION_DATA],
    teen:[FEVER_DATA, HEADACHE_DATA, DIZZINESS_DATA, VISION_DATA],
  },
  chest: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
  stomach: {
    baby:[FEVER_DATA],
    child: [FEVER_DATA],
    teen: [FEVER_DATA],
  },
  arms: {
    baby: [FEVER_DATA],
    child:[FEVER_DATA],
    teen: [FEVER_DATA],
  },
  legs: {
    baby: [FEVER_DATA],
    child: [FEVER_DATA],
    teen:[FEVER_DATA],
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
  return bodyPartData[ageGroup] ||[];
}

export function getSymptomById(bodyPart: string, ageGroup: AgeGroup, symptomId: string): Symptom | undefined {
  const symptoms = getSymptomsForBodyAndAge(bodyPart, ageGroup);
  return symptoms.find((s) => s.id === symptomId);
}

export function getLocalizedSymptom(bodyPart: string, ageGroup: AgeGroup, symptomId: string, locale: string): string {
  const symptom = getSymptomById(bodyPart, ageGroup, symptomId);
  if (!symptom) return '';
  return locale === 'de' ? symptom.labelDe : locale === 'es' ? symptom.labelEs : locale === 'tr' ? symptom.labelTr : symptom.label;
}

export function getVideoForTemperature(bodyPart: string, ageGroup: AgeGroup, symptomId: string, temperature: number, locale: string): string {
  const symptom = getSymptomById(bodyPart, ageGroup, symptomId);
  if (!symptom) return '';
  
  const range = symptom.temperatureRanges.find(r => temperature <= r.maxTemp);
  if (!range) return locale === 'de' ? symptom.videoUrlDe : locale === 'es' ? symptom.videoUrlEs : locale === 'tr' ? symptom.videoUrlTr : symptom.videoUrl;
  
  return locale === 'de' ? range.videoUrlDe : locale === 'es' ? range.videoUrlEs : locale === 'tr' ? range.videoUrlTr : range.videoUrl;
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
    return locale === 'de' ? guidance.emergencyDe : locale === 'es' ? guidance.emergencyEs : locale === 'tr' ? guidance.emergencyTr : guidance.emergency;
  }
  if (urgency === 'urgent') {
    return locale === 'de' ? guidance.urgentDe : locale === 'es' ? guidance.urgentEs : locale === 'tr' ? guidance.urgentTr : guidance.urgent;
  }
  return locale === 'de' ? guidance.routineDe : locale === 'es' ? guidance.routineEs : locale === 'tr' ? guidance.routineTr : guidance.routine;
}
