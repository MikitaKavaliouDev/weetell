'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import type { ActionDecision as ActionDecisionType } from '@/stores/useAssessmentStore';
import { Clock, Stethoscope, Home, GraduationCap } from 'lucide-react';

interface ActionDecisionProps {
  onNext: () => void;
}

export default function ActionDecision({ onNext }: ActionDecisionProps) {
  const setActionDecision = useAssessmentStore((state) => state.setActionDecision);

  const handleSelect = (decision: ActionDecisionType) => {
    setActionDecision(decision);
    setTimeout(onNext, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4 pb-8 px-6">
      <h2 className="text-2xl font-bold text-[#4a4a40] mb-8 text-center">
        What's the next step?
      </h2>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* Wait / Home Care Option */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('wait')}
          className="cursor-pointer bg-white border-2 border-[#10B981] rounded-3xl p-6 flex items-center gap-5 shadow-sm"
        >
          <div className="w-16 h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center">
            <Home className="w-8 h-8 text-[#10B981]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#10B981]">Wait & Monitor</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Home care instructions & video guide
            </p>
          </div>
          <Clock className="w-6 h-6 text-[#10B981]" />
        </motion.div>

        {/* Doctor Option */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('doctor')}
          className="cursor-pointer bg-white border-2 border-[#EF4444] rounded-3xl p-6 flex items-center gap-5 shadow-sm"
        >
          <div className="w-16 h-16 bg-[#EF4444]/10 rounded-2xl flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-[#EF4444]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#EF4444]">See a Doctor</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Find medical help nearby
            </p>
          </div>
          <GraduationCap className="w-6 h-6 text-[#EF4444]" />
        </motion.div>
      </div>
    </div>
  );
}
