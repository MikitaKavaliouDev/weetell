'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { audioManager } from '@/lib/audio';
import { useEffect } from 'react';
import Image from 'next/image';

interface DetailedBodySelectionProps {
  onNext: () => void;
}

export default function DetailedBodySelection({ onNext }: DetailedBodySelectionProps) {
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  const setSymptom = useAssessmentStore((state) => state.setSymptom);

  useEffect(() => {
    const subtitle =
      locale === 'de' ? 'Bitte genauer auswählen' :
      locale === 'es' ? 'Seleccione más detalladamente' :
      locale === 'tr' ? 'Lütfen daha detaylı seçin' :
      'Please select more specifically';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale as 'en' | 'de' | 'es' | 'tr' | undefined);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handleDetailedClick = () => {
    audioManager.playSound('click');
    setSymptom('fever');
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4 pb-8 px-6 w-full relative">
      <h2 className="text-2xl font-bold text-[#4a4a40] mb-8 text-center">
        {locale === 'de' ? 'Wo genau?' : locale === 'es' ? '¿Dónde exactamente?' : locale === 'tr' ? 'Tam olarak neresi?' : 'Where exactly?'}
      </h2>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[320px] aspect-[3/4] cursor-pointer"
        onClick={handleDetailedClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Image
          src="/assets/head_chest.svg"
          alt="Detailed Body Selection"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}