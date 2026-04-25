'use client';

import Image from 'next/image';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { audioManager } from '@/lib/audio';

/**
 * SoundToggle component provides global controls for sound narration.
 * It appears as two speaker icons in the bottom-left corner of the screen.
 * Persists across all pages via RootLayout.
 */
export default function SoundToggle() {
  const isSoundEnabled = useAssessmentStore((state) => state.isSoundEnabled);
  const toggleSound = useAssessmentStore((state) => state.toggleSound);

  const toggleAudio = (state: boolean) => {
    if (state !== isSoundEnabled) {
      toggleSound();
      audioManager.setEnabled(state);
      if (state) {
        audioManager.playSound('click');
      }
    }
  };

  return (
    <div className="fixed bottom-2 left-10 flex gap-4 z-150 pointer-events-auto">
      <button 
        data-testid="audio-on-button-global"
        onClick={() => toggleAudio(true)}
        className="transition-transform hover:scale-110 active:scale-95"
        aria-label="Turn sound on"
      >
        <Image 
          src="/assets/blue_on_speaker_icons.svg"
          alt="Audio on"
          width={40}
          height={60}
          className={`transition-opacity duration-300 ${isSoundEnabled ? "opacity-100" : "opacity-30"}`}
        />
      </button>
      <button 
        data-testid="audio-off-button-global"
        onClick={() => toggleAudio(false)}
        className="transition-transform hover:scale-110 active:scale-95"
        aria-label="Turn sound off"
      >
        <Image 
          src="/assets/yellow_off_speaker_icon.svg"
          alt="Audio off"
          width={40}
          height={60}
          className={`transition-opacity duration-300 ${!isSoundEnabled ? "opacity-100" : "opacity-30"}`}
        />
      </button>
    </div>
  );
}
