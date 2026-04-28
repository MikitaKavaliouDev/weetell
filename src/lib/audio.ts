export type SoundType = 
  | 'brand_logo' 
  | 'bubble_appears' 
  | 'click' 
  | 'success' 
  | 'next' 
  | 'back' 
  | 'attention' 
  | 'error' 
  | 'reassurance' 
  | 'voice_cue'
  | 'hover'     // For backward compatibility
  | 'narrative'; // For backward compatibility

type Locale = 'en' | 'de' | 'es' | 'tr' | 'fr';

const SOUND_FILES: Record<string, string> = {
  brand_logo: '01_weetell_brand_logo.wav',
  bubble_appears: '02_speech_bubble_appears.wav',
  click: '03_tap_select.wav',
  success: '04_confirm_success.wav',
  next: '05_next_continue.wav',
  back: '06_back_return.wav',
  attention: '07_attention_check.wav',
  error: '08_try_again_soft.wav',
  reassurance: '09_calm_reassurance.wav',
  voice_cue: '10_listening_voice_cue.wav',
};

class AudioManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private currentLocale: Locale = 'en';
  private sounds: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      this.preloadSounds();
    }
  }

  private preloadSounds() {
    Object.entries(SOUND_FILES).forEach(([type, filename]) => {
      const audio = new Audio(`/assets/weetell_sound_system/${filename}`);
      audio.preload = 'auto';
      this.sounds.set(type, audio);
    });
  }

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

  /**
   * Play a legacy tone if needed.
   * Currently kept for reference but unused by main playSound.
   */
  playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.enabled) return;
    
    try {
      const ctx = this.getContext();
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

    // Handle legacy types
    let mappedType: string = type;
    if (type === 'hover') mappedType = 'click';
    if (type === 'narrative') mappedType = 'bubble_appears';

    const audio = this.sounds.get(mappedType);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.warn(`Failed to play sound ${type}:`, e));
    } else {
      // Fallback to legacy tones if file not found or legacy type not mapped
      switch (type) {
        case 'click':
          this.playTone(800, 0.1, 'sine', 0.2);
          break;
        case 'success':
          this.playTone(523, 0.15, 'sine', 0.2);
          setTimeout(() => this.playTone(659, 0.15, 'sine', 0.2), 150);
          setTimeout(() => this.playTone(784, 0.2, 'sine', 0.2), 300);
          break;
        case 'error':
          this.playTone(200, 0.3, 'sawtooth', 0.15);
          break;
      }
    }
  }
}

export const audioManager = new AudioManager();

