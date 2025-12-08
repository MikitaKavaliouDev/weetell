'use client';

import { motion } from 'framer-motion';
import InteractiveCard from '@/components/atoms/InteractiveCard';
import { useAssessmentStore, AgeGroup } from '@/stores/useAssessmentStore';
import { Baby, User } from 'lucide-react';

interface AgeSelectionProps {
  onNext: () => void;
}

export default function AgeSelection({ onNext }: AgeSelectionProps) {
  const setAgeGroup = useAssessmentStore((state) => state.setAgeGroup);
  const selectedAgeGroup = useAssessmentStore((state) => state.ageGroup);

  const handleSelect = (age: AgeGroup) => {
    setAgeGroup(age);
    setTimeout(onNext, 400); 
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-md mx-auto h-full justify-center pb-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-4xl font-bold text-gray-900">
          Who needs help?
        </h2>
        <p className="text-gray-400 font-medium">Please select the patient's age group</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Baby Option */}
        <InteractiveCard
          selected={selectedAgeGroup === 'baby'}
          onClick={() => handleSelect('baby')}
          className="aspect-square flex flex-col items-center justify-center gap-6"
        >
          <div className={`p-6 rounded-full transition-colors duration-300 ${selectedAgeGroup === 'baby' ? 'bg-orange-100 text-orange-500' : 'bg-gray-50 text-gray-400'}`}>
            <Baby size={48} strokeWidth={1.5} />
          </div>
          <div className="text-center space-y-1">
            <span className={`block font-bold text-xl transition-colors ${selectedAgeGroup === 'baby' ? 'text-gray-900' : 'text-gray-500'}`}>Baby</span>
            <span className="text-sm text-gray-400 font-medium block">0-3 years</span>
          </div>
        </InteractiveCard>

        {/* Child Option */}
        <InteractiveCard
          selected={selectedAgeGroup === 'child'}
          onClick={() => handleSelect('child')}
          className="aspect-square flex flex-col items-center justify-center gap-6"
        >
          <div className={`p-6 rounded-full transition-colors duration-300 ${selectedAgeGroup === 'child' ? 'bg-indigo-100 text-indigo-500' : 'bg-gray-50 text-gray-400'}`}>
            <User size={48} strokeWidth={1.5} />
          </div>
           <div className="text-center space-y-1">
            <span className={`block font-bold text-xl transition-colors ${selectedAgeGroup === 'child' ? 'text-gray-900' : 'text-gray-500'}`}>Child</span>
            <span className="text-sm text-gray-400 font-medium block">+3 years</span>
          </div>
        </InteractiveCard>
      </div>
    </div>
  );
}
