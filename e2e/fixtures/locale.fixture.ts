import { Page } from '@playwright/test';

export type Locale = 'en' | 'de' | 'es' | 'tr' | 'fr';

export type TranslationKey =
  | 'continue'
  | 'next'
  | 'back'
  | 'start'
  | 'homeCare'
  | 'pharmacy'
  | 'doctor'
  | 'emergency'
  | 'selectAge'
  | 'selectBodyPart'
  | 'selectSymptom'
  | 'selectSeverity'
  | 'results'
  | 'restart';

export type Translations = Record<TranslationKey, string>;

const translations: Record<Locale, Translations> = {
  en: {
    continue: 'Continue',
    next: 'Next',
    back: 'Back',
    start: 'Start',
    homeCare: 'Home Care',
    pharmacy: 'Pharmacy',
    doctor: 'Doctor',
    emergency: 'Emergency',
    selectAge: 'How old is your child?',
    selectBodyPart: 'Where does it hurt?',
    selectSymptom: 'What symptoms do you see?',
    selectSeverity: 'How severe is it?',
    results: 'View Results',
    restart: 'Start Over',
  },
  de: {
    continue: 'Weiter',
    next: 'Weiter',
    back: 'Zurück',
    start: 'Start',
    homeCare: 'Selbstpflege',
    pharmacy: 'Apotheke',
    doctor: 'Arzt',
    emergency: 'Notfall',
    selectAge: 'Wie alt ist Ihr Kind?',
    selectBodyPart: 'Wo tut es weh?',
    selectSymptom: 'Welche Symptome sehen Sie?',
    selectSeverity: 'Wie schwer ist es?',
    results: 'Ergebnisse anzeigen',
    restart: 'Neu starten',
  },
  es: {
    continue: 'Continuar',
    next: 'Siguiente',
    back: 'Atrás',
    start: 'Iniciar',
    homeCare: 'Cuidado en casa',
    pharmacy: 'Farmacia',
    doctor: 'Doctor',
    emergency: 'Emergencia',
    selectAge: '¿Qué edad tiene su hijo?',
    selectBodyPart: '¿Dónde le duele?',
    selectSymptom: '¿Qué síntomas observa?',
    selectSeverity: '¿Qué tan grave es?',
    results: 'Ver resultados',
    restart: 'Comenzar de nuevo',
  },
  tr: {
    continue: 'Devam',
    next: 'Sonraki',
    back: 'Geri',
    start: 'Başla',
    homeCare: 'Ev Bakımı',
    pharmacy: 'Eczane',
    doctor: 'Doktor',
    emergency: 'Acil',
    selectAge: 'Çocuğunuz kaç yaşında?',
    selectBodyPart: 'Neresi ağrıyor?',
    selectSymptom: 'Hangi belirtileri görüyorsunuz?',
    selectSeverity: 'Ne kadar şiddetli?',
    results: 'Sonuçları Gör',
    restart: 'Yeniden Başla',
  },
  fr: {
    continue: 'Continuer',
    next: 'Suivant',
    back: 'Retour',
    start: 'Démarrer',
    homeCare: 'Soins à domicile',
    pharmacy: 'Pharmacie',
    doctor: 'Médecin',
    emergency: 'Urgence',
    selectAge: 'Quel âge a votre enfant?',
    selectBodyPart: 'Où a-t-il mal?',
    selectSymptom: 'Quels symptômes observez-vous?',
    selectSeverity: 'Quelle est la gravité?',
    results: 'Voir les résultats',
    restart: 'Recommencer',
  },
};

export async function setLocale(page: Page, locale: Locale): Promise<void> {
  await page.evaluate(
    ([l, key]) => {
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
      parsed.state = { ...existingState, locale: l };
      localStorage.setItem(key, JSON.stringify(parsed));
    },
    [locale, 'weetell-storage'] as [Locale, string]
  );
}

export function t(key: TranslationKey, locale: Locale): string {
  return translations[locale][key] ?? translations.en[key];
}

export { translations };