export type SoundType = 'click' | 'pop';

type Locale = 'en' | 'de' | 'es' | 'tr' | 'fr';

class AudioManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private currentLocale: Locale = 'en';

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setLocale(locale: Locale) {
    this.currentLocale = locale;
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

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.enabled) return;

    try {
      const ctx = this.getContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }

  playSound(type: SoundType) {
    if (!this.enabled) return;

    switch (type) {
      case 'click':
        this.playTone(800, 0.08, 'sine', 0.2);
        break;
      case 'pop':
        this.playTone(1000, 0.15, 'sine', 0.25);
        break;
    }
  }
}

export const audioManager = new AudioManager();
