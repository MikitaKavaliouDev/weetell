'use client';

import { useAssessmentStore } from '@/stores/useAssessmentStore';

export default function SubtitleOverlay() {
  const showSubtitles = useAssessmentStore((state) => state.showSubtitles);
  const currentSubtitle = useAssessmentStore((state) => state.currentSubtitle);
  
  if (!showSubtitles || !currentSubtitle) return null;

  return (
    <div className="fixed bottom-24 left-0 right-0 pointer-events-none z-50 flex justify-center px-6">
       <div 
         className="bg-black/75 text-white font-bold text-lg px-6 py-3 rounded-xl text-center backdrop-blur-sm max-w-lg"
       >
           {currentSubtitle}
       </div>
    </div>
  );
}
