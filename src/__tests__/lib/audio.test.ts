import { audioManager } from '../../lib/audio';

beforeEach(() => {
  audioManager.setEnabled(true);
  audioManager.setLocale('en');
  jest.clearAllMocks();


  window.speechSynthesis.cancel = jest.fn();
  window.speechSynthesis.speak = jest.fn();
});

describe('AudioManager', () => {
  describe('narrate', () => {
    it('should call speechSynthesis.speak with correct text', () => {
      audioManager.narrate('Hello world');

      expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
      const utterance = (window.speechSynthesis.speak as jest.Mock).mock.calls[0][0];
      expect(utterance.text).toBe('Hello world');
    });

    it('should set default locale to currentLocale when not provided', () => {
      audioManager.setLocale('de');
      audioManager.narrate('Hallo Welt');

      const utterance = (window.speechSynthesis.speak as jest.Mock).mock.calls[0][0];
      expect(utterance.lang).toBe('de');
    });

    it('should use provided locale over currentLocale', () => {
      audioManager.setLocale('en');
      audioManager.narrate('Hola', 'es');

      const utterance = (window.speechSynthesis.speak as jest.Mock).mock.calls[0][0];
      expect(utterance.lang).toBe('es');
    });

    it('should set rate to 0.9', () => {
      audioManager.narrate('Test');

      const utterance = (window.speechSynthesis.speak as jest.Mock).mock.calls[0][0];
      expect(utterance.rate).toBe(0.9);
    });

    it('should set pitch to 1', () => {
      audioManager.narrate('Test');

      const utterance = (window.speechSynthesis.speak as jest.Mock).mock.calls[0][0];
      expect(utterance.pitch).toBe(1);
    });

    it('should cancel any previous speech before speaking', () => {
      audioManager.narrate('First');
      audioManager.narrate('Second');

      expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(2);
    });

    it('should not speak when disabled', () => {
      audioManager.setEnabled(false);
      audioManager.narrate('Hello');

      expect(window.speechSynthesis.speak).not.toHaveBeenCalled();
    });

    it('should not speak when speechSynthesis is not available', () => {
      const originalSpeechSynthesis = window.speechSynthesis;
      delete (window as any).speechSynthesis;

      expect(() => audioManager.narrate('Test')).not.toThrow();

      window.speechSynthesis = originalSpeechSynthesis;
    });
  });

  describe('stopNarration', () => {
    it('should call speechSynthesis.cancel', () => {
      audioManager.stopNarration();

      expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(1);
    });

    it('should handle missing speechSynthesis gracefully', () => {
      const originalSpeechSynthesis = window.speechSynthesis;
      delete (window as any).speechSynthesis;

      expect(() => audioManager.stopNarration()).not.toThrow();

      window.speechSynthesis = originalSpeechSynthesis;
    });
  });

  describe('setEnabled', () => {
    it('should enable audio', () => {
      audioManager.setEnabled(false);
      audioManager.setEnabled(true);
      audioManager.narrate('Test');

      expect(window.speechSynthesis.speak).toHaveBeenCalled();
    });

    it('should disable audio', () => {
      audioManager.setEnabled(false);
      audioManager.narrate('Test');

      expect(window.speechSynthesis.speak).not.toHaveBeenCalled();
    });
  });

  describe('setLocale', () => {
    it('should set current locale to German', () => {
      audioManager.setLocale('de');

      audioManager.narrate('Test');
      const utterance = (window.speechSynthesis.speak as jest.Mock).mock.calls[0][0];
      expect(utterance.lang).toBe('de');
    });

    it('should set current locale to Spanish', () => {
      audioManager.setLocale('es');

      audioManager.narrate('Test');
      const utterance = (window.speechSynthesis.speak as jest.Mock).mock.calls[0][0];
      expect(utterance.lang).toBe('es');
    });

    it('should set current locale to Turkish', () => {
      audioManager.setLocale('tr');

      audioManager.narrate('Test');
      const utterance = (window.speechSynthesis.speak as jest.Mock).mock.calls[0][0];
      expect(utterance.lang).toBe('tr');
    });
  });

  describe('playSound', () => {
    it('should play click sound', () => {
      expect(() => audioManager.playSound('click')).not.toThrow();
    });

    it('should play pop sound', () => {
      expect(() => audioManager.playSound('pop')).not.toThrow();
    });

    it('should not play any sound when disabled', () => {
      audioManager.setEnabled(false);

      expect(() => audioManager.playSound('click')).not.toThrow();
      expect(() => audioManager.playSound('pop')).not.toThrow();
    });
  });
});
