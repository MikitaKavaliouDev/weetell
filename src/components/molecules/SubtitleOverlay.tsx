'use client';

import { useAssessmentStore } from '@/stores/useAssessmentStore';

export default function SubtitleOverlay() {
  const showSubtitles = useAssessmentStore((state) => state.showSubtitles);
  
  if (!showSubtitles) return null;

  // In the future, this layout overlay listens to an active audio/video track context
  return (
    <div className="fixed bottom-24 left-0 right-0 pointer-events-none z-50 flex justify-center px-6">
       <div 
         className="bg-black/75 text-white font-bold text-lg px-6 py-2 rounded-lg text-center backdrop-blur-sm hidden empty:hidden" 
         id="subtitle-container"
       >
           {/* Foundation for injecting subtitles during interactions/audio playback */}
       </div>
    </div>
  );
}
