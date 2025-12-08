'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import BodySVG from '@/components/molecules/BodySVG';
import { Rotate3D } from 'lucide-react'; // Better icon name than RotateCcw for this context

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
    setTimeout(onNext, 400);
  };

  return (
    <div className="flex flex-col items-center h-full pt-8 pb-10 px-6 gap-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 z-10"
      >
        <h2 className="text-3xl font-bold text-neutral-800">
          Where does it hurt?
        </h2>
        <p className="text-neutral-500 font-medium">
          Tap the area on the {ageGroup || 'body'}
        </p>
      </motion.div>

      <div className="relative w-full flex-1 flex items-center justify-center max-h-[600px]">
        {/* Background glow for premium feel */}
        <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <BodySVG 
          view={view} 
          ageGroup={ageGroup} 
          selectedPart={selectedPart} 
          onPartClick={handlePartClick} 
        />
        
        {/* Floating Label for selection feedback */}
        {selectedPart && (
           <motion.div
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             className="absolute bottom-4 bg-white text-neutral-800 px-6 py-2 rounded-full shadow-lg border border-slate-100 font-bold capitalize text-lg"
           >
             {selectedPart}
           </motion.div>
        )}
      </div>

      {/* Controls - Floating Card Style */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10"
      >
        <button
          onClick={() => setView(v => v === 'front' ? 'back' : 'front')}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all active:scale-95 group"
        >
          <div className="bg-blue-50 p-2 rounded-full text-wee-blue group-hover:bg-blue-100 transition-colors">
            <Rotate3D size={20} />
          </div>
          <span className="font-bold text-neutral-700">
            Turn {view === 'front' ? 'Back' : 'Front'}
          </span>
        </button>
      </motion.div>
    </div>
  );
}
