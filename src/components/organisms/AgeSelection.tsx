'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAssessmentStore, AgeGroup } from '@/stores/useAssessmentStore';
import { audioManager } from '@/lib/audio';
import { useEffect } from 'react';

interface AgeSelectionProps {
  onNext: () => void;
}

export default function AgeSelection({ onNext }: AgeSelectionProps) {
  const setAgeGroup = useAssessmentStore((state) => state.setAgeGroup);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const subtitle =
      locale === 'de' ? 'Wie alt ist das Kind?' :
      locale === 'es' ? '¿Cuántos años tiene el niño?' :
      locale === 'tr' ? 'Çocuğunuz kaç yaşında?' :
      'How old is the child?';
    setCurrentSubtitle(subtitle);
    audioManager.playLanguageAudio('how_old_is_the_child', locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handleSelect = (age: AgeGroup) => {
    audioManager.playSound('click');
    setAgeGroup(age);
    setTimeout(onNext, 200); 
  };

  return (
    <div className=" w-full p-6 justify-center flex flex-1">
      <div className="flex flex-row items-center justify-center gap-8 w-full max-w-2xl mx-auto pb-4">
          {/* Baby Option */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect('baby')}
            className="cursor-pointer flex flex-col items-center justify-center gap-4"
          >
            <div className="relative w-32 h-32 md:w-36 md:h-36">
                <Image 
                   src="/baby.png" 
                   alt={locale === 'de' ? 'Baby 0-3 Jahre' : locale === 'es' ? 'Bebé 0-3 años' : locale === 'tr' ? 'Bebek 0-3 yaş' : 'Baby 0-3 years'} 
                   fill 
                   className="object-contain object-bottom"
                   priority
                />
             </div>
            {showTextLabels && <span className="text-3xl font-bold text-[#C5A880]">0-3</span>}
          </motion.div>
  
          {/* Child Option */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect('child')}
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            <div className="relative w-40 h-56 md:w-44 md:h-60">
                <Image 
                  src="/child.png" 
                  alt={locale === 'de' ? 'Kind 3-11 Jahre' : locale === 'es' ? 'Niño 3-11 años' : locale === 'tr' ? 'Çocuk 3-11 yaş' : 'Child 3-11 years'} 
                  fill 
                  className="object-contain object-bottom"
                  priority
                />
            </div>
            {showTextLabels && <span className="text-3xl font-bold text-[#C5A880]">3-11</span>}
          </motion.div>
      </div>
    </div>
  );
}
