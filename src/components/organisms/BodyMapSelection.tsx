'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import BodySVG from '@/components/molecules/BodySVG';
import { Rotate3D, Crosshair } from 'lucide-react';
import { audioManager } from '@/lib/audio';

interface BodyMapSelectionProps {
  onNext: () => void;
}

export default function BodyMapSelection({ onNext }: BodyMapSelectionProps) {
  const [view, setView] = useState<'front' | 'back'>('front');
  const setBodyPart = useAssessmentStore((state) => state.setBodyPart);
  const selectedPart = useAssessmentStore((state) => state.bodyPart);
  const ageGroup = useAssessmentStore((state) => state.ageGroup);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const subtitle = locale === 'de' ? 'Wo tut es weh?' : 'Where does it hurt?';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handlePartClick = (partId: string) => {
    audioManager.playSound('click');
    setBodyPart(partId);
    setTimeout(onNext, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4 pb-4 px-6">
      <div className="flex items-center gap-3 mb-4">
        <Crosshair className="w-8 h-8 text-[#C5A880]" />
        <h2 className="text-2xl font-bold text-[#4a4a40]">
          {locale === 'de' ? 'Wo tut es weh?' : 'Where does it hurt?'}
        </h2>
      </div>
      
      <div className="relative w-full flex-1 flex items-center justify-center max-h-[600px]">
        {/* Background glow for premium feel - kept gentle */}
        
        <BodySVG 
          view={view} 
          ageGroup={ageGroup} 
          selectedPart={selectedPart} 
          onPartClick={handlePartClick} 
        />
      </div>

      {/* Back toggle button */}
      <motion.button
        onClick={() => setView(view === 'front' ? 'back' : 'front')}
        className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-white rounded-full font-semibold shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Rotate3D className="w-5 h-5" />
        {view === 'front' ? 'Show Back' : 'Show Front'}
      </motion.button>
    </div>
  );
}
