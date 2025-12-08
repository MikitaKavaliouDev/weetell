'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import BodySVG from '@/components/molecules/BodySVG';
import { Rotate3D } from 'lucide-react'; // Better icon name than RotateCcw for this context

interface BodyMapSelectionProps {
  onNext: () => void;
}

export default function BodyMapSelection({ onNext }: BodyMapSelectionProps) {
  const [view, setView] = useState<'front' | 'back'>('front');
  const setBodyPart = useAssessmentStore((state) => state.setBodyPart);
  const selectedPart = useAssessmentStore((state) => state.bodyPart);
  const ageGroup = useAssessmentStore((state) => state.ageGroup);

  const handlePartClick = (partId: string) => {
    setBodyPart(partId);
    setTimeout(onNext, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4 pb-4 px-6">
      
      <div className="relative w-full flex-1 flex items-center justify-center max-h-[600px]">
        {/* Background glow for premium feel - kept gentle */}
        
        <BodySVG 
          view={view} 
          ageGroup={ageGroup} 
          selectedPart={selectedPart} 
          onPartClick={handlePartClick} 
        />
      </div>
    </div>
  );
}
