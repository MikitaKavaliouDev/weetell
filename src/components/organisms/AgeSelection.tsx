'use client';

import { motion } from 'framer-motion';
import InteractiveCard from '@/components/atoms/InteractiveCard';
import { useAssessmentStore, AgeGroup } from '@/stores/useAssessmentStore';
import { Baby, User } from 'lucide-react'; // Using Lucide as placeholders for illustrations

interface AgeSelectionProps {
  onNext: () => void;
}

export default function AgeSelection({ onNext }: AgeSelectionProps) {
  const setAgeGroup = useAssessmentStore((state) => state.setAgeGroup);
  const selectedAgeGroup = useAssessmentStore((state) => state.ageGroup);

  const handleSelect = (age: AgeGroup) => {
    setAgeGroup(age);
    // Add small delay for visual feedback before navigation
    setTimeout(onNext, 400); 
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-200"
      >
        Who needs help?
      </motion.h2>

      <div className="grid grid-cols-2 gap-6 w-full">
        <InteractiveCard
          selected={selectedAgeGroup === 'baby'}
          onClick={() => handleSelect('baby')}
          className="flex flex-col items-center gap-4 py-8"
        >
          <div className="p-4 bg-orange-100 rounded-full text-orange-500">
            <Baby size={48} />
          </div>
          <span className="font-semibold text-lg text-neutral-700 dark:text-neutral-300">Baby (0-3)</span>
        </InteractiveCard>

        <InteractiveCard
          selected={selectedAgeGroup === 'child'}
          onClick={() => handleSelect('child')}
          className="flex flex-col items-center gap-4 py-8"
        >
          <div className="p-4 bg-indigo-100 rounded-full text-indigo-500">
            <User size={48} />
          </div>
          <span className="font-semibold text-lg text-neutral-700 dark:text-neutral-300">Child (3+)</span>
        </InteractiveCard>
      </div>
    </div>
  );
}
