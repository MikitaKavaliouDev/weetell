'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import InteractiveCard from '@/components/atoms/InteractiveCard';
import { SYMPTOM_GRAPH } from '@/data/symptom-graph';
import { ArrowRight } from 'lucide-react';

interface SymptomSelectionProps {
  onNext: () => void;
}

export default function SymptomSelection({ onNext }: SymptomSelectionProps) {
  const bodyPart = useAssessmentStore((state) => state.bodyPart);
  const selectedSymptoms = useAssessmentStore((state) => state.symptoms);
  const toggleSymptom = useAssessmentStore((state) => state.toggleSymptom);

  // Fallback if body part not selected or invalid
  const symptoms = bodyPart ? SYMPTOM_GRAPH[bodyPart] || [] : [];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto min-h-[50vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          What seems to be wrong?
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 capitalize">
          Region: {bodyPart}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {symptoms.map((symptom) => (
          <InteractiveCard
            key={symptom.id}
            onClick={() => toggleSymptom(symptom.id)}
            selected={selectedSymptoms.includes(symptom.id)}
            className="flex flex-col items-center justify-center p-4 h-32 text-center"
          >
            <span className="font-medium text-lg">{symptom.label}</span>
          </InteractiveCard>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: selectedSymptoms.length > 0 ? 1 : 0.5,
          scale: selectedSymptoms.length > 0 ? 1 : 0.95
        }}
        disabled={selectedSymptoms.length === 0}
        onClick={onNext}
        className="mt-8 flex items-center gap-2 bg-wee-blue text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        <span>Next Step</span>
        <ArrowRight size={20} />
      </motion.button>
    </div>
  );
}
