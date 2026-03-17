type SoundType = 'click' | 'success' | 'error' | 'hover' | 'narrative';

class AudioManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

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
      case 'hover':
        this.playTone(440, 0.05, 'sine', 0.1);
        break;
      case 'narrative':
        this.playTone(300, 0.3, 'sine', 0.1);
        break;
    }
  }
}

export const audioManager = new AudioManager();
