'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { audioManager } from '@/lib/audio';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface DetailedBodySelectionProps {
  onNext: () => void;
}

const SYMPTOM_OPTIONS = [
  { id: 'headache', icon: '/assets/headache_icon.svg', label: 'Fever' },
  { id: 'concussion', icon: '/assets/concussion_icon.svg', label: 'Fever' },
  { id: 'fever', icon: '/assets/fever_thermometer_icon.svg', label: 'Fever' },
];

export default function DetailedBodySelection({ onNext }: DetailedBodySelectionProps) {
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  const setSymptom = useAssessmentStore((state) => state.setSymptom);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const subtitle =
      locale === 'de' ? 'Wo genau?' :
      locale === 'es' ? '¿Dónde exactamente?' :
      locale === 'tr' ? 'Tam olarak neresi?' :
      'Where exactly?';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale as 'en' | 'de' | 'es' | 'tr' | undefined);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handleForeheadClick = () => {
    audioManager.playSound('click');
    setShowSlider(true);
  };

  const handleSymptomSelect = (id: string) => {
    audioManager.playSound('success');
    setSymptom(id); 
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-bold text-[#4a4a40] mb-8 text-center">
        {locale === 'de' ? 'Wo genau?' : locale === 'es' ? '¿Dónde exactamente?' : locale === 'tr' ? 'Tam olarak neresi?' : 'Where exactly?'}
      </h2>
      
      <div className="relative w-full max-w-[320px] aspect-[3/4]">
        <motion.div
          animate={{ scale: showSlider ? 0.95 : 1 }}
          className="relative w-full h-full cursor-pointer"
          onClick={handleForeheadClick}
        >
          <Image
            src="/assets/head_chest.svg"
            alt="Detailed Body Selection"
            fill
            className="object-contain"
            priority
          />
          
          <div 
            className="absolute top-[15%] left-[25%] w-[50%] h-[20%] rounded-full z-20"
            style={{ cursor: 'pointer' }}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {showSlider && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="absolute top-0 right-0 bottom-0 w-[45%] max-w-[180px] bg-[#FDE68A]/90 backdrop-blur-sm rounded-l-3xl shadow-xl flex flex-col items-center justify-center gap-8 py-10 z-30 border-l-4 border-white"
          >
            {SYMPTOM_OPTIONS.map((opt, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => {
                      setCurrentSubtitle(opt.label);
                  }}
                  onHoverEnd={() => {
                      setCurrentSubtitle('');
                  }}
                  onClick={() => handleSymptomSelect(opt.id)}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-amber-400 p-2 relative"
                >
                  <Image src={opt.icon} alt={opt.label} width={40} height={40} className="object-contain" />
                </motion.button>
              </div>
            ))}

            <button 
              onClick={() => setShowSlider(false)}
              className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center"
            >
              <div className="w-1 h-12 bg-white/40 rounded-full hover:bg-white/60 transition-colors" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
