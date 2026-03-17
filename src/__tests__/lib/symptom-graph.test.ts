import {
  getSymptomsForBodyAndAge,
  getSymptomById,
  getLocalizedSymptom,
  getVideoForTemperature,
  getUrgencyForTemperature,
  getDoctorGuidance,
} from '@/data/symptom-graph';

describe('symptom-graph', () => {
  describe('getSymptomsForBodyAndAge', () => {
    it('returns symptoms for head and baby', () => {
      const symptoms = getSymptomsForBodyAndAge('head', 'baby');
      expect(symptoms).toHaveLength(1);
      expect(symptoms[0].id).toBe('fever');
    });

    it('returns symptoms for chest and child', () => {
      const symptoms = getSymptomsForBodyAndAge('chest', 'child');
      expect(symptoms).toHaveLength(1);
      expect(symptoms[0].id).toBe('fever');
    });

    it('returns symptoms for skin and teen', () => {
      const symptoms = getSymptomsForBodyAndAge('skin', 'teen');
      expect(symptoms).toHaveLength(1);
      expect(symptoms[0].id).toBe('fever');
    });

    it('returns empty array for unknown body part', () => {
      const symptoms = getSymptomsForBodyAndAge('unknown', 'baby');
      expect(symptoms).toHaveLength(0);
    });
  });

  describe('getSymptomById', () => {
    it('returns symptom by id', () => {
      const symptom = getSymptomById('head', 'baby', 'fever');
      expect(symptom).toBeDefined();
      expect(symptom?.id).toBe('fever');
    });

    it('returns undefined for unknown symptom id', () => {
      const symptom = getSymptomById('head', 'baby', 'unknown');
      expect(symptom).toBeUndefined();
    });
  });

  describe('getLocalizedSymptom', () => {
    it('returns English label for en locale', () => {
      const label = getLocalizedSymptom('head', 'baby', 'fever', 'en');
      expect(label).toBe('Fever');
    });

    it('returns German label for de locale', () => {
      const label = getLocalizedSymptom('head', 'baby', 'fever', 'de');
      expect(label).toBe('Fieber');
    });

    it('returns empty string for unknown symptom', () => {
      const label = getLocalizedSymptom('head', 'baby', 'unknown', 'en');
      expect(label).toBe('');
    });
  });

  describe('getVideoForTemperature', () => {
    it('returns low fever video for temperature <= 37.5', () => {
      const video = getVideoForTemperature('head', 'baby', 'fever', 37.0, 'en');
      expect(video).toBe('/videos/low_fever_en.mp4');
    });

    it('returns medium fever video for temperature <= 39.0', () => {
      const video = getVideoForTemperature('head', 'baby', 'fever', 38.5, 'en');
      expect(video).toBe('/videos/medium_fever_en.mp4');
    });

    it('returns high fever video for temperature > 39.0', () => {
      const video = getVideoForTemperature('head', 'baby', 'fever', 40.0, 'en');
      expect(video).toBe('/videos/high_fever_en.mp4');
    });

    it('returns German video for de locale', () => {
      const video = getVideoForTemperature('head', 'baby', 'fever', 37.0, 'de');
      expect(video).toBe('/videos/low_fever_de.mp4');
    });

    it('returns default video when no range matches', () => {
      const video = getVideoForTemperature('head', 'baby', 'fever', 50.0, 'en');
      expect(video).toBe('/videos/high_fever_en.mp4');
    });

    it('returns empty string for unknown symptom', () => {
      const video = getVideoForTemperature('head', 'baby', 'unknown', 37.0, 'en');
      expect(video).toBe('');
    });
  });

  describe('getUrgencyForTemperature', () => {
    it('returns routine for low fever', () => {
      const urgency = getUrgencyForTemperature('head', 'baby', 'fever', 37.0);
      expect(urgency).toBe('routine');
    });

    it('returns routine for medium fever', () => {
      const urgency = getUrgencyForTemperature('head', 'baby', 'fever', 38.5);
      expect(urgency).toBe('routine');
    });

    it('returns urgent for high fever', () => {
      const urgency = getUrgencyForTemperature('head', 'baby', 'fever', 40.0);
      expect(urgency).toBe('urgent');
    });

    it('returns routine for unknown symptom', () => {
      const urgency = getUrgencyForTemperature('head', 'baby', 'unknown', 40.0);
      expect(urgency).toBe('routine');
    });
  });

  describe('getDoctorGuidance', () => {
    it('returns routine guidance for en locale', () => {
      const guidance = getDoctorGuidance('head', 'baby', 'fever', 'routine', 'en');
      expect(guidance).toContain('Schedule an appointment');
    });

    it('returns urgent guidance for en locale', () => {
      const guidance = getDoctorGuidance('head', 'baby', 'fever', 'urgent', 'en');
      expect(guidance).toContain('Seek medical attention today');
    });

    it('returns emergency guidance for en locale', () => {
      const guidance = getDoctorGuidance('head', 'baby', 'fever', 'emergency', 'en');
      expect(guidance).toContain('Call emergency services');
    });

    it('returns German guidance for de locale', () => {
      const guidance = getDoctorGuidance('head', 'baby', 'fever', 'routine', 'de');
      expect(guidance).toContain('Vereinbaren Sie einen Termin');
    });

    it('returns empty string for unknown symptom', () => {
      const guidance = getDoctorGuidance('head', 'baby', 'unknown', 'routine', 'en');
      expect(guidance).toBe('');
    });
  });
});
