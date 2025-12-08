'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import InteractiveCard from '@/components/atoms/InteractiveCard';
import { SYMPTOM_GRAPH } from '@/data/symptom-graph';
import { ArrowRight, Check } from 'lucide-react';

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
    <div className="flex flex-col h-full pt-8 pb-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-neutral-800 mb-2">
          What seems to be wrong?
        </h2>
        <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
          {bodyPart || 'General'}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full flex-1 overflow-y-auto content-start pb-24">
        {symptoms.map((symptom, index) => {
           const isSelected = selectedSymptoms.includes(symptom.id);
           return (
            <motion.div
              key={symptom.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <InteractiveCard
                onClick={() => toggleSymptom(symptom.id)}
                selected={isSelected}
                className="flex flex-col items-center justify-center p-4 h-32 text-center relative overflow-hidden"
              >
                {/* Selection Checkmark */}
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-2 right-2 bg-wee-blue text-white rounded-full p-1"
                  >
                    <Check size={12} strokeWidth={3} />
                  </motion.div>
                )}
                
                <span className={`font-bold text-lg transition-colors ${isSelected ? 'text-wee-blue' : 'text-neutral-600'}`}>
                  {symptom.label}
                </span>
              </InteractiveCard>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Action Bar */}
      <motion.div 
        className="fixed bottom-6 left-0 right-0 px-6 flex justify-center pointer-events-none"
      >
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: selectedSymptoms.length > 0 ? 1 : 0,
            y: selectedSymptoms.length > 0 ? 0 : 20,
            pointerEvents: selectedSymptoms.length > 0 ? 'auto' : 'none'
          }}
          onClick={onNext}
          className="bg-neutral-900 text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform"
        >
          <span>Confirm Symptoms</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}
