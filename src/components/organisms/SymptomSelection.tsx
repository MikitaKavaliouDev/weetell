'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { SYMPTOM_GRAPH } from '@/data/symptom-graph';
import BodyPartIllustration from '@/components/atoms/BodyPartIllustrations';
import { Check, Thermometer, Droplets, Wind, Activity } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import { useEffect, useState } from 'react';

interface SymptomSelectionProps {
  onNext: () => void;
}

const SYMPTOM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  fever: Thermometer,
  sweating: Droplets,
  chills: Wind,
  flushed: Activity,
};

export default function SymptomSelection({ onNext }: SymptomSelectionProps) {
  const bodyPart = useAssessmentStore((state) => state.bodyPart);
  const symptom = useAssessmentStore((state) => state.symptom);
  const setSymptom = useAssessmentStore((state) => state.setSymptom);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);

  const currentPart = bodyPart || 'head';
  const symptoms = SYMPTOM_GRAPH[currentPart] || [];

  useEffect(() => {
    const subtitle = locale === 'de' ? 'Welche Symptome?' : 'What symptoms?';
    setCurrentSubtitle(subtitle);
    audioManager.playSound('narrative');
    return () => setCurrentSubtitle('');
  }, [locale, setCurrentSubtitle]);

  const handleSelectSymptom = (symptomId: string) => {
    audioManager.playSound('click');
    setSymptom(symptomId);
    setTimeout(onNext, 300);
  };

  return (
    <div className="flex flex-col h-full items-center relative pt-4">
      <h2 className="text-2xl font-bold text-[#4a4a40] mb-4 text-center">
        {locale === 'de' ? 'Welche Symptome?' : 'What symptoms?'}
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-4 z-10 w-full px-4 max-h-[30vh] overflow-y-auto">
        {symptoms.map((symptomItem, index) => {
          const isSelected = symptom === symptomItem.id;
          const IconComponent = SYMPTOM_ICONS[symptomItem.id] || Thermometer;
          
          return (
            <motion.div
              key={symptomItem.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelectSymptom(symptomItem.id)}
              whileTap={{ scale: 0.9 }}
              className="relative group cursor-pointer flex flex-col items-center gap-2"
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${
                isSelected 
                  ? 'bg-rose-100 border-2 border-rose-500' 
                  : 'bg-white border-2 border-neutral-200 group-hover:border-rose-300'
              }`}>
                <IconComponent className={`w-10 h-10 ${isSelected ? 'text-rose-500' : 'text-neutral-600'}`} />
               
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-1 shadow-sm"
                  >
                    <Check size={12} strokeWidth={4} />
                  </motion.div>
                )}
              </div>
               
              {showTextLabels && (
                <span className={`text-xs font-bold text-center w-20 leading-tight ${isSelected ? 'text-neutral-900' : 'text-neutral-500'}`}>
                  {locale === 'de' ? symptomItem.labelDe : symptomItem.label}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex-1 w-full flex items-end justify-center pb-0 overflow-hidden relative z-0">
        <div className="w-full max-w-[350px] transform scale-110 -mb-8">
          <BodyPartIllustration part={currentPart} />
        </div>
      </div>
    </div>
  );
}
