'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { ArrowRight, Thermometer } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SeveritySelectionProps {
  onNext: () => void;
}

export default function SeveritySelection({ onNext }: SeveritySelectionProps) {
  const setSeverity = useAssessmentStore((state) => state.setSeverity);
  const [value, setValue] = useState(36.5);

  // Map temperature to mouth curve
  // 36.5 (Happy) -> 40 (Sad)
  // Curve: "M 30,70 Q 50,80 70,70" (Smile) -> "M 30,80 Q 50,60 70,80" (Frown)
  
  // Simple linear interpolation helper
  const normalize = (val: number, min: number, max: number) => (val - min) / (max - min);
  const t = normalize(value, 36.0, 40.0); // 0 to 1

  const mouthY1 = 70 + (t * 10); // 70 -> 80
  const mouthCY = 80 - (t * 20); // 80 -> 60
  const mouthY2 = 70 + (t * 10); // 70 -> 80
  
  // Color interpolation
  // Green (#22c55e) to Red (#ef4444)
  const color = t < 0.5 ? 'text-green-500' : t < 0.8 ? 'text-orange-500' : 'text-red-500';

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setValue(val);
    setSeverity(val);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          How high is the fever?
        </h2>
        <div className={`text-5xl font-bold transition-colors ${color}`}>
          {value.toFixed(1)}°C
        </div>
      </motion.div>

      {/* Reactive Face SVG */}
      <motion.div 
        className="w-48 h-48 drop-shadow-xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.2 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
          <circle cx="50" cy="50" r="45" fill="currentColor" />
          {/* Eyes */}
          <circle cx="35" cy="40" r="5" className="text-neutral-800" fill="currentColor" />
          <circle cx="65" cy="40" r="5" className="text-neutral-800" fill="currentColor" />
          {/* Mouth - Dynamic Path */}
          <motion.path 
            d={`M 30,${mouthY1} Q 50,${mouthCY} 70,${mouthY2}`}
            stroke="currentColor" 
            strokeWidth="3" 
            fill="none" 
            className="text-neutral-800"
            strokeLinecap="round"
          />
          {/* Sweat Drop (only if high fever) */}
          {value > 38.5 && (
            <motion.path
              d="M 80,30 Q 80,40 75,40 Q 70,40 70,30 Q 70,20 75,20 Q 80,20 80,30"
              className="text-blue-400"
              fill="currentColor"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            />
          )}
        </svg>
      </motion.div>

      {/* Slider Input */}
      <div className="w-full px-4 relative">
        <Thermometer className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="range"
          min="36.0"
          max="40.5"
          step="0.1"
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-wee-blue ml-8"
        />
      </div>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 flex items-center gap-2 bg-wee-blue text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30"
      >
        <span>Find Help</span>
        <ArrowRight size={20} />
      </motion.button>
    </div>
  );
}
