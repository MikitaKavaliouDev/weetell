'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import BodySVG from '@/components/molecules/BodySVG';
import { Rotate3D, Crosshair } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import SymptomIcon from '@/components/atoms/SymptomIcons';
import { getSymptomsForBodyAndAge } from '@/data/symptom-graph';

interface BodyMapSelectionProps {
  onNext: () => void;
}

const BODY_PART_NAMES: Record<string, { en: string; de: string; es: string; tr: string }> = {
  head: { en: 'Head', de: 'Kopf', es: 'Cabeza', tr: 'Baş' },
  chest: { en: 'Chest', de: 'Brust', es: 'Pecho', tr: 'Göğüs' },
  stomach: { en: 'Abdomen', de: 'Bauch', es: 'Abdomen', tr: 'Karın' },
  arms: { en: 'Arms', de: 'Arme', es: 'Brazos', tr: 'Kollar' },
  legs: { en: 'Legs', de: 'Beine', es: 'Piernas', tr: 'Bacaklar' },
  back: { en: 'Back', de: 'Rücken', es: 'Espalda', tr: 'Sırt' },
  skin: { en: 'Skin', de: 'Haut', es: 'Piel', tr: 'Deri' },
};

export default function BodyMapSelection({ onNext }: BodyMapSelectionProps) {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  
  const setBodyPart = useAssessmentStore((state) => state.setBodyPart);
  const setSymptom = useAssessmentStore((state) => state.setSymptom);
  const ageGroup = useAssessmentStore((state) => state.ageGroup);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const subtitle =
      locale === 'de' ? 'Wo tut es weh?' :
      locale === 'es' ? '¿Dónde le duele?' :
      locale === 'tr' ? 'Neresinde ağrıyor?' :
      'Where does it hurt?';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handlePartClick = (partId: string) => {
    audioManager.playSound('click');
    
    // Toggle off if clicking the same part
    if (selectedPartId === partId) {
      setSelectedPartId(null);
      setBodyPart(null);
      setCurrentSubtitle('');
    } else {
      setSelectedPartId(partId);
      setBodyPart(partId);
      
      const partName =
        locale === 'de' ? BODY_PART_NAMES[partId]?.de :
        locale === 'es' ? BODY_PART_NAMES[partId]?.es :
        locale === 'tr' ? BODY_PART_NAMES[partId]?.tr :
        BODY_PART_NAMES[partId]?.en;
      const confirmationText =
        locale === 'de' ? `${partName} ausgewählt` :
        locale === 'es' ? `${partName} seleccionado` :
        locale === 'tr' ? `${partName} seçildi` :
        `${partName} selected`;
      
      setCurrentSubtitle(confirmationText);
    }
  };

  const handleSymptomClick = (symptomId: string) => {
    audioManager.playSound('success');
    setSymptom(symptomId);
    onNext();
  };

  const symptoms = selectedPartId ? getSymptomsForBodyAndAge(selectedPartId, ageGroup || 'child') :[];

  return (
    <div className="flex flex-col items-center h-full pt-4 pb-6 px-6 w-full relative">
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Crosshair className="w-8 h-8 text-[#C5A880]" />
        <h2 className="text-2xl font-bold text-[#4a4a40]">
          {locale === 'de' ? 'Wo tut es weh?' : locale === 'es' ? '¿Dónde le duele?' : locale === 'tr' ? 'Neresinde ağrıyor?' : 'Where does it hurt?'}
        </h2>
      </div>
      
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 max-h-[600px]">
        <BodySVG 
          view={view} 
          ageGroup={ageGroup} 
          selectedPart={selectedPartId} 
          onPartClick={handlePartClick} 
        />
      </div>

      <div className="shrink-0 flex flex-col items-center w-full gap-4 mt-6">
        <motion.button
          layout
          onClick={() => setView(view === 'front' ? 'back' : 'front')}
          className="flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-white rounded-full font-semibold shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Rotate3D className="w-5 h-5" />
          {locale === 'de' ? (view === 'front' ? 'Rücken zeigen' : 'Vorne zeigen') : locale === 'es' ? (view === 'front' ? 'Mostrar Espalda' : 'Mostrar Frente') : locale === 'tr' ? (view === 'front' ? 'Sırtı Göster' : 'Önü Göster') : (view === 'front' ? 'Show Back' : 'Show Front')}
        </motion.button>
      </div>

      {/* Sliding Symptom Panel */}
      <AnimatePresence>
        {selectedPartId && (
          <div className="fixed inset-0 z-50 flex justify-center pointer-events-none">
            <div className="w-full max-w-2xl relative h-full overflow-hidden">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-28 md:w-32 bg-[#FDE68A]/95 backdrop-blur-sm rounded-l-3xl shadow-2xl flex flex-col items-center py-24 gap-6 pointer-events-auto overflow-y-auto border-l-4 border-white"
              >
                {symptoms.map(s => (
                  <div key={s.id} className="group relative flex flex-col items-center w-full">
                     <button
                       onClick={() => handleSymptomClick(s.id)}
                       className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform p-1.5 border-2 border-amber-400"
                     >
                        <SymptomIcon id={s.icon || s.id} selected={false} />
                     </button>
                     
                     {/* Tooltip */}
                     <span className="absolute top-1/2 -translate-y-1/2 right-[calc(50%+2.5rem)] bg-white px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold text-neutral-700 pointer-events-none z-30 border border-amber-200">
                        {locale === 'de' ? s.labelDe : locale === 'es' ? s.labelEs : locale === 'tr' ? s.labelTr : s.label}
                     </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
