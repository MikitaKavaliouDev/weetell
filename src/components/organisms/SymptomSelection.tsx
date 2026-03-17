'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { SYMPTOM_GRAPH } from '@/data/symptom-graph';
import BodyPartIllustration from '@/components/atoms/BodyPartIllustrations';
import { Thermometer } from 'lucide-react';
import { audioManager } from '@/lib/audio';

interface SymptomSelectionProps {
  onNext: () => void;
}

export default function SymptomSelection({ onNext }: SymptomSelectionProps) {
  const router = useRouter();
  const bodyPart = useAssessmentStore((state) => state.bodyPart);
  const symptom = useAssessmentStore((state) => state.symptom);
  const setSymptom = useAssessmentStore((state) => state.setSymptom);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const subtitle = locale === 'de' ? 'Fieber erkannt' : 'Fever detected';
    setCurrentSubtitle(subtitle);
    audioManager.playSound('narrative');
    
    if (!symptom) {
      const currentPart = bodyPart || 'head';
      const symptoms = SYMPTOM_GRAPH[currentPart] || [];
      if (symptoms.length > 0) {
        setSymptom(symptoms[0].id);
      }
    }
    
    const timer = setTimeout(() => {
      onNext();
    }, 1500);
    
    return () => {
      setCurrentSubtitle('');
      clearTimeout(timer);
    };
  }, [locale, bodyPart, symptom, setSymptom, setCurrentSubtitle, onNext]);

  const currentPart = bodyPart || 'head';
  const symptoms = SYMPTOM_GRAPH[currentPart] || [];

  return (
    <div className="flex flex-col h-full items-center justify-center relative pt-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center">
          <Thermometer className="w-16 h-16 text-rose-500" />
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#4a4a40] mb-2">
            {locale === 'de' ? 'Fieber' : 'Fever'}
          </h2>
          <p className="text-neutral-500">
            {locale === 'de' ? 'Symptom erkannt' : 'Symptom detected'}
          </p>
        </div>
      </motion.div>

      <div className="flex-1 w-full flex items-end justify-center pb-0 overflow-hidden relative z-0">
        <div className="w-full max-w-[350px] transform scale-110 -mb-8">
          <BodyPartIllustration part={currentPart} />
        </div>
      </div>
    </div>
  );
}
