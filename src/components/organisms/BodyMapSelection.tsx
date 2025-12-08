'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import BodySVG from '@/components/molecules/BodySVG';
import { RotateCcw } from 'lucide-react';

interface BodyMapSelectionProps {
  onNext: () => void;
}

export default function BodyMapSelection({ onNext }: BodyMapSelectionProps) {
  const [view, setView] = useState<'front' | 'back'>('front');
  const setBodyPart = useAssessmentStore((state) => state.setBodyPart);
  const selectedPart = useAssessmentStore((state) => state.bodyPart);
  const ageGroup = useAssessmentStore((state) => state.ageGroup);

  const handlePartClick = (partId: string) => {
    setBodyPart(partId);
    // Optional: Zoom animation here?
    setTimeout(onNext, 300);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full pt-4 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Where does it hurt?
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Tap the area on the {ageGroup || 'body'}
        </p>
      </motion.div>

      <div className="relative w-full flex-1 flex items-center justify-center">
        <BodySVG 
          view={view} 
          ageGroup={ageGroup} 
          selectedPart={selectedPart} 
          onPartClick={handlePartClick} 
        />
        
        {/* Helper Tip or Label */}
        {selectedPart && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="absolute bottom-10 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium"
           >
             Selected: {selectedPart.charAt(0).toUpperCase() + selectedPart.slice(1)}
           </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={() => setView(v => v === 'front' ? 'back' : 'front')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <RotateCcw size={20} className="text-wee-blue" />
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            Turn Around
          </span>
        </button>
      </div>
    </div>
  );
}
