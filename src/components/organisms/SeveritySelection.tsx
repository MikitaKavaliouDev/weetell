'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useState } from 'react';
import FeverChildSVG from '../molecules/FeverChildSVG';
import ThermometerSVG from '../molecules/ThermometerSVG';
import { Play } from 'lucide-react';

interface SeveritySelectionProps {
  onNext: () => void;
}

const TEMPERATURES = [
  { value: 37.5, label: '37,5' },
  { value: 38.0, label: '38' },
  { value: 40.0, label: '40', unit: 'c' }, // The superscript c handling
];

export default function SeveritySelection({ onNext }: SeveritySelectionProps) {
  const setSeverity = useAssessmentStore((state) => state.setSeverity);
  const [selectedTemp, setSelectedTemp] = useState<number | null>(null);

  const handleSelect = (val: number) => {
    setSelectedTemp(val);
    setSeverity(val);
    // Auto-advance after selection to mimic simple interaction
    setTimeout(() => {
        onNext();
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full pt-4 pb-8 relative">
      <div className="flex-1 w-full flex items-center justify-center relative">
        {/* Main Illustration Area */}
        <div className="relative w-full max-w-[320px] h-[400px]"> 
          {/* Child Illustration */}
          <div className="absolute inset-0 flex items-center justify-center pr-16 mt-8">
             <div className="w-72 h-80">
                <FeverChildSVG />
             </div>
          </div>

          {/* Thermometer & Numbers Group */}
          <div className="absolute top-10 right-0 flex flex-col items-center">
            {/* Thermometer Icon */}
            <div className="mb-2 -mr-6">
              <ThermometerSVG />
            </div>
            
            {/* Temperature List */}
            <div className="flex flex-col gap-2 items-end mt-2">
              {TEMPERATURES.map((temp) => (
                <motion.button
                  key={temp.value}
                  onClick={() => handleSelect(temp.value)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-5xl font-bold tracking-tight bg-transparent border-none p-1 transition-colors duration-300 ${
                    selectedTemp === temp.value ? 'text-rose-500' : 'text-[#4a4a40]'
                  }`}
                  style={{ fontFamily: 'inherit' }}
                >
                  <span className="relative font-handwritten">
                    {temp.label}
                    {temp.unit && (
                      <span className="absolute top-0 -right-5 text-3xl align-top">
                        °{temp.unit}
                      </span>
                    )}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full px-6 flex justify-between items-end">
         {/* Video/Play Button (Bottom Left) */}
         <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-12 border-2 border-yellow-400 rounded-md flex items-center justify-center text-yellow-500 bg-white relative overflow-hidden"
         >
             <div className="absolute left-1.5 top-0 bottom-0 flex flex-col justify-between py-1">
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
             </div>
              <div className="absolute right-1.5 top-0 bottom-0 flex flex-col justify-between py-1">
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
             </div>

            <Play fill="currentColor" size={20} className="ml-0.5" />
         </motion.button>
      </div>
    </div>
  );
}
