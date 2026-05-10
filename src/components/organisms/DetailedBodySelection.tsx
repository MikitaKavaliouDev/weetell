'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { audioManager } from '@/lib/audio';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import SelectionControls from '@/components/molecules/SelectionControls';

interface DetailedBodySelectionProps {
  onNext: () => void;
}

const SYMPTOM_LABELS: Record<string, { en: string; de: string; es: string; tr: string }> = {
  headache: { en: 'Headache', de: 'Kopfschmerzen', es: 'Dolor de cabeza', tr: 'Baş ağrısı.' },
  fever: { en: 'Fever', de: 'Fieber', es: 'Fiebre', tr: 'Ateş' },
  concussion: { en: 'Concussion', de: 'Gehirnerschütterung', es: 'Conmoción cerebral', tr: 'Sarsıntı.' },
};

const SYMPTOM_OPTIONS = [
  { id: 'headache', icon: '/assets/headache_icon.svg', labelKey: 'Headache' },
  { id: 'fever', icon: '/assets/fever_thermometer_icon.svg', labelKey: 'Fever' },
  { id: 'concussion', icon: '/assets/concussion_icon.svg', labelKey: 'Concussion' },
];

export default function DetailedBodySelection({ onNext }: DetailedBodySelectionProps) {
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  const setSymptom = useAssessmentStore((state) => state.setSymptom);
  const setMenuOpen = useAssessmentStore((state) => state.setMenuOpen);
  const [showSlider, setShowSlider] = useState(false);
  const [tempSelectedSymptom, setTempSelectedSymptom] = useState<string | null>(null);

  useEffect(() => {
    const subtitle =
      locale === 'de' ? 'Wo genau?' :
      locale === 'es' ? '¿Dónde exactamente?' :
      locale === 'tr' ? 'Tam olarak nerede?' :
      'Where exactly?';
    setCurrentSubtitle(subtitle);
    audioManager.playLanguageAudio('where_exactly', locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration('detailed-body-unmount');
    };
  }, [locale, setCurrentSubtitle]);

  const handleForeheadClick = () => {
    audioManager.playSound('click');
    setMenuOpen(false);
    setShowSlider(true);
  };

  const handleSymptomSelect = (id: string) => {
    audioManager.playSound('click');
    setMenuOpen(false);
    const audioKey = id === 'headache' ? 'headache_icon' : id === 'fever' ? 'fever_icon' : 'concussion_icon';
    audioManager.playLanguageAudio(audioKey, locale);
    setTempSelectedSymptom(id);
    setShowSlider(false); // Hide slider when symptom is selected to avoid overlap with controls
    
    // Update subtitle to show what was selected
    const selectedOpt = SYMPTOM_OPTIONS.find(o => o.id === id);
    if (selectedOpt) {
      const labelData = SYMPTOM_LABELS[selectedOpt.labelKey];
      const label = locale === 'de' ? labelData?.de : locale === 'es' ? labelData?.es : locale === 'tr' ? labelData?.tr : labelData?.en || selectedOpt.labelKey;
      setCurrentSubtitle(label);
    }
  };

  const handleConfirm = () => {
    if (tempSelectedSymptom) {
      audioManager.playSound('click');
      setSymptom(tempSelectedSymptom); 
      onNext();
    }
  };

  const handleCancel = () => {
    audioManager.playSound('click');
    setTempSelectedSymptom(null);
    setShowSlider(true); // Show slider again so user can pick another
    setCurrentSubtitle(subtitle);
  };

  const subtitle =
    locale === 'de' ? 'Wo genau?' :
    locale === 'es' ? '¿Dónde exactamente?' :
    locale === 'tr' ? 'Tam olarak nerede?' :
    'Where exactly?';

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">

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
            sizes="320px"
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
            className="fixed top-0 right-0 bottom-0 w-[45%] max-w-[180px] bg-[#FDE68A]/40 backdrop-blur-sm flex flex-col items-center justify-center gap-8 py-10 z-[150] border-l-4 border-white"
          >
            {SYMPTOM_OPTIONS.map((opt, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => {
                      const labelData = SYMPTOM_LABELS[opt.labelKey];
                      const label = locale === 'de' ? labelData?.de : locale === 'es' ? labelData?.es : locale === 'tr' ? labelData?.tr : labelData?.en || opt.labelKey;
                      setCurrentSubtitle(label);
                  }}
                  onHoverEnd={() => {
                      setCurrentSubtitle('');
                  }}
                  onClick={() => handleSymptomSelect(opt.id)}
                  className="w-[100px] h-[100px]   flex items-center justify-center  relative"
                >
                  <Image src={opt.icon} alt={opt.labelKey} width={100} height={100}  />
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
      <SelectionControls
        isVisible={!!tempSelectedSymptom}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        bottomOffset="bottom-12"
        iconSize={50}
      />
    </div>
  );
}
