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
    audioManager.narrate(subtitle, locale as 'en' | 'de' | 'es' | 'tr' | undefined);
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
      
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center h-full pt-20 pb-6 px-6 w-full relative">
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

      <div className="fixed bottom-0 left-0 w-full p-6 bg-white/60 backdrop-blur-md z-40 border-t border-gray-100/50">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
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
      </div>

      </div>
  );
}
