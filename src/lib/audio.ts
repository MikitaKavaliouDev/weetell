export type SoundType = 'click' | 'pop';

type Locale = 'en' | 'de' | 'es' | 'tr' | 'fr';

/** Directory name for each locale code */
const LOCALE_DIR: Record<Locale, string> = {
  en: 'wee_english',
  de: 'wee_german',
  es: 'wee_english', // fallback - no Spanish audio files
  tr: 'wee_turkish',
  fr: 'wee_english', // fallback - no French audio files
};

/**
 * Per-locale filename mapping for language narration.
 * Keys are semantic identifiers; values are the exact filenames (without .mp3)
 * in the corresponding wee_{locale}/ directory.
 */
const LANGUAGE_AUDIO_FILES: Record<string, Partial<Record<Locale, string>>> = {
  please_select_your_language: {
    en: 'English_please_select_your_language',
    de: 'German_waehle_deine_sprache',
    tr: 'Turkish_please_select_language',
  },
  disclaimer_text: {
    en: 'English_disclaimer_text',
    de: 'German_disclaimer_in_german',
    tr: 'Turkish_disclaimer',
  },
  how_old_is_the_child: {
    en: 'English_how_old_is_the_child',
    de: 'German_wie_alt_ist_das_kind',
    tr: 'Turkish_how_old_is_you_child',
  },
  where_does_it_hurt: {
    en: 'English_where_does_it_hurt',
    de: 'German_wo_tut_es_weh',
    tr: 'Turkish_where_does_it_hurt',
  },
  head_selected: {
    en: 'English_head_selected',
    tr: 'Turkish_head_selected',
  },
  where_exactly: {
    en: 'English_where_exactly',
    de: 'German_wo_genau',
    tr: 'Turkish_where_exactly',
  },
  how_high_is_the_fever: {
    en: 'English_How_high_is_the_fever',
    de: 'German_wie_hoch_ist_das_fieber',
    tr: 'Turkish_how_high_is_the_fever',
  },
  fever_icon: {
    en: 'English_fever_icon',
    de: 'German_fieber',
    tr: 'Turkish_fever',
  },
  headache_icon: {
    en: 'English_headache_icon',
    de: 'German_kopfschmerzen',
    tr: 'Turkish_headache',
  },
  concussion_icon: {
    en: 'English_concussion_icon',
    de: 'German_gehirnerschütterung',
    tr: 'Turkish_concussion',
  },
  chair_hourglass_icon: {
    en: 'English_chair_hourGlass_icon',
    de: 'German_chair_hourGlass_icon',
    tr: 'Turkish_chair_hourGlass_icon',
  },
  doctor_icon: {
    en: 'English_doctor_icon',
    de: 'German_doctor_icon',
    tr: 'Turkish_Doctor_icon',
  },
  film_icon: {
    en: 'English_Film_icon',
    de: 'German_Film_icon',
    tr: 'Turkish_Film_icon',
  },
  mild_temperature: {
    en: 'English_mild_temperature',
    de: 'German_erhoehte_temperatur',
    tr: 'Turkish_MildTemp_37',
  },
  moderate_fever: {
    en: 'English_Moderate_fever',
    de: 'German_Maessiges_fieber',
    tr: 'Turkish_Moderate_fever_38',
  },
  high_fever: {
    en: 'English_High_fever',
    de: 'German_Hohes_fieber_bitte_gut_beobachten_Es_kann_sein',
    tr: 'Turkish_Highfever_40',
  },
  find_pharmacy: {
    en: 'English_Lets_find_a_pharmacy_near_u',
    de: 'German_Lass_uns_eine_apotheke_in',
    tr: 'Turkish_lets_find_a_pharmacy',
  },
  find_paediatrician: {
    en: 'English_lets_find_a_paediatrician_',
    de: 'German_Lass_uns_einen_kinderartz_oder_Hausartzt_in_deiner_naehe_finden',
    tr: 'Turkish_Lets_find_ a_doctor',
  },
  stay_calm_observe: {
    en: 'English_stay_calm_and_observe_your_child',
    de: 'German_Bleib_ruhig_und_beobachte_dein_Kind',
    tr: 'Turkish_staycalm_observe',
  },
  high_fever_not_serious: {
    en: 'English_High_fever_is_not_automatically_serious',
    de: 'German_Hohes_fieber_ist_nicht_automatisch_schlimm',
    tr: 'Turkish_highfever_not_bad',
  },
  pay_attention: {
    en: 'English_Pay_attention_to',
    de: 'German_Gib_fluessigkeit_und_sorge_',
    tr: 'Turkish_stay_calm',
  },
  give_fluids_rest: {
    en: 'English_give_fluids_and_insure_rest',
    de: 'German_Gib_fluessigkeit_',
    tr: 'Turkish_give_fluids',
  },
  measure_same_spot: {
    en: 'English_always_measure_the_temp',
    de: 'German_Miss_fieber_immer_an_derselben_stelle',
    tr: 'Turkish_measure_fever_same_spot',
  },
  reduce_fever: {
    en: 'English_reduce_the_fever_if_your_child_is_distressed',
    de: 'German_Senke_das_fieber',
    tr: 'Turkish_lower_temp',
  },
  seek_help: {
    en: 'English_seek_help',
    de: 'German_Hole_hilfe_wenn_dein_gefeuhl_sagt_',
    tr: 'Turkish_Help_if_needed',
  },
};

class AudioManager {
  private enabled: boolean = true;
  private currentLocale: Locale = 'en';

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setLocale(locale: Locale) {
    this.currentLocale = locale;
  }

  /**
   * Play an mp3 file from a URL path.
   */
  playMp3(url: string): void {
    if (!this.enabled || !url) return;
    try {
      const audio = new Audio(url);
      audio.volume = 0.7;
      audio.play().catch(() => {
        // Autoplay blocked - silently fail
      });
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }

  /**
   * Play a language-specific narration audio file for the given locale.
   * Falls back to English if the locale has no audio file for this key.
   */
  playLanguageAudio(key: string, locale?: Locale): void {
    if (!this.enabled) return;
    const loc = locale || this.currentLocale;
    const mapping = LANGUAGE_AUDIO_FILES[key];
    if (!mapping) return;

    // Try requested locale, fall back to English
    const filename = mapping[loc] || mapping['en'];
    if (!filename) return;

    const dir = LOCALE_DIR[loc] || LOCALE_DIR['en'];
    const path = `/wee_audios/wee_language_audio/${dir}/${filename}.mp3`;
    this.playMp3(path);
  }

  narrate(text: string, locale?: Locale) {
    if (!this.enabled) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale || this.currentLocale;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith(locale || this.currentLocale));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  stopNarration() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  playSound(type: SoundType) {
    if (!this.enabled) return;

    this.playMp3('/wee_audios/wee_sounds/wee_sounds_choice/WEE_TELL_CLICK_NAVIGATION_03_260504.mp3');
  }
}

export const audioManager = new AudioManager();
