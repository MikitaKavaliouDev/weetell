'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import BodySVG from '@/components/molecules/BodySVG';
import { Rotate3D, Crosshair, Check, ArrowRight } from 'lucide-react';
import { audioManager } from '@/lib/audio';

interface BodyMapSelectionProps {
  onNext: () => void;
}

const BODY_PART_NAMES: Record<string, { en: string; de: string }> = {
  head: { en: 'Head', de: 'Kopf' },
  chest: { en: 'Chest', de: 'Brust' },
  stomach: { en: 'Abdomen', de: 'Bauch' },
  arms: { en: 'Arms', de: 'Arme' },
  legs: { en: 'Legs', de: 'Beine' },
  back: { en: 'Back', de: 'Rücken' },
  skin: { en: 'Skin', de: 'Haut' },
};

export default function BodyMapSelection({ onNext }: BodyMapSelectionProps) {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
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
    setSelectedPartId(partId);
    
    const partName = locale === 'de' ? BODY_PART_NAMES[partId]?.de : BODY_PART_NAMES[partId]?.en;
    const confirmationText = locale === 'de' 
      ? `${partName} ausgewählt` 
      : `${partName} selected`;
    
    setCurrentSubtitle(confirmationText);
  };

  const handleConfirm = () => {
    if (selectedPartId) {
      audioManager.playSound('success');
      setBodyPart(selectedPartId);
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center h-full pt-4 pb-28 px-6 w-full">
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Crosshair className="w-8 h-8 text-[#C5A880]" />
        <h2 className="text-2xl font-bold text-[#4a4a40]">
          {locale === 'de' ? 'Wo tut es weh?' : 'Where does it hurt?'}
        </h2>
      </div>
      
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 max-h-[600px]">
        <BodySVG 
          view={view} 
          ageGroup={ageGroup} 
          selectedPart={selectedPart} 
          onPartClick={handlePartClick} 
        />
      </div>

      <div className="shrink-0 flex flex-col items-center w-full gap-3 mt-4">
        <AnimatePresence>
          {selectedPartId && (
            <motion.div
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
              animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <div className="bg-wee-blue text-white px-8 py-3 rounded-2xl flex items-center gap-3 shadow-lg mt-2">
                <Check size={24} />
                <span className="font-bold text-lg">
                  {locale === 'de' 
                    ? BODY_PART_NAMES[selectedPartId]?.de 
                    : BODY_PART_NAMES[selectedPartId]?.en}
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirm}
                className="bg-[#4a4a40] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg mb-1"
              >
                {locale === 'de' ? 'Bestätigen' : 'Confirm'}
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          onClick={() => setView(view === 'front' ? 'back' : 'front')}
          className="flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-white rounded-full font-semibold shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Rotate3D className="w-5 h-5" />
          {view === 'front' ? 'Show Back' : 'Show Front'}
        </motion.button>
      </div>
    </div>
  );
}
