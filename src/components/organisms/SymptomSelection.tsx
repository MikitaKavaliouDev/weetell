'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { SYMPTOM_GRAPH } from '@/data/symptom-graph';
import BodyPartIllustration from '@/components/atoms/BodyPartIllustrations';
import SymptomIcon from '@/components/atoms/SymptomIcons';
import { Check, ArrowRight } from 'lucide-react';

interface SymptomSelectionProps {
  onNext: () => void;
}

export default function SymptomSelection({ onNext }: SymptomSelectionProps) {
  const bodyPart = useAssessmentStore((state) => state.bodyPart);
  const selectedSymptoms = useAssessmentStore((state) => state.symptoms);
  const toggleSymptom = useAssessmentStore((state) => state.toggleSymptom);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);

  // Fallback if body part not selected (should redirect, but for dev we default)
  const currentPart = bodyPart || 'head';
  const symptoms = SYMPTOM_GRAPH[currentPart] || [];

  return (
    <div className="flex flex-col h-full items-center relative pt-4">
      
      {/* 1. Dynamic Symptom Icons Row */}
      {/* We use a grid or flex wrap depending on count. Flex wrap is safer for small variable counts */}
      <div className="flex flex-wrap justify-center gap-4 mb-2 z-10 w-full px-4 max-h-[30vh] overflow-y-auto">
        {symptoms.map((symptom, index) => {
          const isSelected = selectedSymptoms.includes(symptom.id);
          return (
            <motion.div
              key={symptom.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleSymptom(symptom.id)}
              whileTap={{ scale: 0.9 }}
              className={`relative group cursor-pointer flex flex-col items-center gap-1`}
            >
               <div className="w-20 h-20 transition-transform group-hover:scale-105">
                 <SymptomIcon id={symptom.id} selected={isSelected} />
               </div>
              
               {/* Label (Optional: visible or tooltip? Screenshot showed only icons mostly, but text is good for UX) */}
               {showTextLabels && (
                  <span className={`text-xs font-bold text-center w-20 leading-tight ${isSelected ? 'text-neutral-900' : 'text-neutral-500'}`}>
                      {symptom.label}
                  </span>
                )}

               {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-green-500 text-white rounded-full p-1 shadow-sm"
                  >
                    <Check size={10} strokeWidth={4} />
                  </motion.div>
               )}
            </motion.div>
          );
        })}
      </div>

      {/* 2. Specific Body Part Illustration */}
      <div className="flex-1 w-full flex items-end justify-center pb-0 overflow-hidden relative z-0">
          <div className="w-full max-w-[350px] transform scale-110 -mb-8">
            <BodyPartIllustration part={currentPart} />
          </div>
      </div>

      {/* 3. Confirm Button (Floating) */}
      <motion.div 
        className="fixed bottom-6 left-0 right-0 px-6 flex justify-center pointer-events-none z-20"
      >
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
                opacity: selectedSymptoms.length > 0 ? 1 : 0, 
                y: selectedSymptoms.length > 0 ? 0 : 20,
                pointerEvents: selectedSymptoms.length > 0 ? 'auto' : 'none'
            }}
            onClick={onNext}
            className="bg-neutral-900 text-white px-8 py-3 rounded-full font-bold shadow-xl flex items-center gap-3 hover:bg-black transition-all"
        >
            <span>Confirm Symptoms</span>
            <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}
