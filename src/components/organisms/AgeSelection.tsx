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
    const subtitle = locale === 'de' ? 'Wie alt ist das Kind?' : 'How old is the child?';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handleSelect = (age: AgeGroup) => {
    audioManager.playSound('success');
    setAgeGroup(age);
    setTimeout(onNext, 200); 
  };

  return (
    <div className="flex flex-row items-end justify-center gap-8 w-full h-full pb-20">
        {/* Baby Option */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('baby')}
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image 
                 src="/baby.png" 
                 alt={locale === 'de' ? 'Baby 0-3 Jahre' : 'Baby 0-3 years'} 
                 fill 
                 className="object-contain object-bottom"
                 priority
              />
           </div>
          {showTextLabels && <span className="text-3xl font-bold text-[#C5A880]">{locale === 'de' ? '0-3' : '0-3'}</span>}
        </motion.div>

        {/* Child Option */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('child')}
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="relative w-40 h-56 md:w-48 md:h-64">
              <Image 
                src="/child.png" 
                alt={locale === 'de' ? 'Kind 3-11 Jahre' : 'Child 3-11 years'} 
                fill 
                className="object-contain object-bottom"
                priority
              />
          </div>
          {showTextLabels && <span className="text-3xl font-bold text-[#C5A880]">{locale === 'de' ? '3-11' : '3-11'}</span>}
        </motion.div>

        {/* Teen Option - Commented out for now
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('teen')}
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="relative w-40 h-56 md:w-48 md:h-64">
              <Image 
                src="/teen.png" 
                alt={locale === 'de' ? 'Teenager 12-21 Jahre' : 'Teen 12-21 years'} 
                fill 
                className="object-contain object-bottom"
                priority
              />
          </div>
          {showTextLabels && <span className="text-3xl font-bold text-[#C5A880]">{locale === 'de' ? '12-21' : '12-21'}</span>}
        </motion.div>
        */}
    </div>
  );
}
