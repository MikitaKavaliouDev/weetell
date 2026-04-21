'use client';

import { useAssessmentStore } from '@/stores/useAssessmentStore';

export default function SubtitleOverlay() {
  const showSubtitles = useAssessmentStore((state) => state.showSubtitles);
  const currentSubtitle = useAssessmentStore((state) => state.currentSubtitle);
  
  if (!showSubtitles || !currentSubtitle) return null;

  return (
    <div className="fixed top-[100px] left-0 right-0 pointer-events-none z-40 flex justify-center px-6">
       <div 
         className="bg-black/80 text-white font-bold text-lg px-6 py-3 rounded-2xl text-center backdrop-blur-md max-w-lg shadow-xl"
       >
           {currentSubtitle}
       </div>
    </div>
  );
}
