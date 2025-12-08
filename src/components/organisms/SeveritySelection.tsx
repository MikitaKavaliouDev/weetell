'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface SeveritySelectionProps {
  onNext: () => void;
}

export default function SeveritySelection({ onNext }: SeveritySelectionProps) {
  const setSeverity = useAssessmentStore((state) => state.setSeverity);
  const [value, setValue] = useState(36.5);

  const normalize = (val: number, min: number, max: number) => (val - min) / (max - min);
  const t = normalize(value, 36.0, 40.0); // 0 to 1

  const mouthY1 = 70 + (t * 10);
  const mouthCY = 80 - (t * 20);
  const mouthY2 = 70 + (t * 10);
  
  // Refined Color Palette
  const colorClass = t < 0.4 ? 'text-emerald-500' : t < 0.7 ? 'text-amber-500' : 'text-rose-500';
  const bgClass = t < 0.4 ? 'bg-emerald-500' : t < 0.7 ? 'bg-amber-500' : 'bg-rose-500';

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setValue(val);
    setSeverity(val);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full pt-10 pb-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold text-neutral-800">
          How high is the fever?
        </h2>
        
        {/* Large Value Display */}
        <div className={`text-7xl font-bold transition-colors duration-300 tracking-tighter ${colorClass}`}>
          {value.toFixed(1)}<span className="text-4xl align-top">°C</span>
        </div>
      </motion.div>

      {/* Reactive Face Container - Centered */}
      <div className="flex-1 flex items-center justify-center w-full">
        <motion.div 
          className="w-64 h-64 drop-shadow-2xl"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        >
          <svg viewBox="0 0 100 100" className={`w-full h-full transition-colors duration-300 text-white`}>
            {/* Dynamic Face Color Background */}
            <circle cx="50" cy="50" r="48" className={`transition-all duration-300 ${t < 0.4 ? 'text-emerald-400' : t < 0.7 ? 'text-amber-400' : 'text-rose-500'}`} fill="currentColor" />
            
            {/* Face Features */}
            <g className="text-white/90">
                <circle cx="32" cy="40" r="6" fill="currentColor" />
                <circle cx="68" cy="40" r="6" fill="currentColor" />
                <motion.path 
                d={`M 30,${mouthY1} Q 50,${mouthCY} 70,${mouthY2}`}
                stroke="currentColor" 
                strokeWidth="5" 
                fill="none" 
                strokeLinecap="round"
                />
            </g>

            {/* Sweat Drop Animation */}
            {value > 38.0 && (
              <motion.path
                d="M 82,30 Q 82,42 75,42 Q 68,42 68,30 Q 68,18 75,18 Q 82,18 82,30"
                className="text-white/60"
                fill="currentColor"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              />
            )}
          </svg>
        </motion.div>
      </div>

      {/* Controls Container */}
      <div className="w-full max-w-sm space-y-8">
        {/* Custom Range Input */}
        <div className="relative h-12 flex items-center">
            <div className="absolute w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-100 ${bgClass}`} 
                    style={{ width: `${t * 100}%` }} 
                />
            </div>
            {/* Thumb Visual (Moves with slider) */}
            <div 
                className="absolute top-0 w-full h-full pointer-events-none"
            >
                <motion.div 
                    className="h-12 w-12 -mt-4 bg-white border-4 border-slate-50 rounded-full shadow-xl flex items-center justify-center absolute z-20"
                    style={{ left: `calc(${t * 100}% - 24px)` }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.2 }}
                >
                    <div className={`w-4 h-4 rounded-full ${bgClass}`} />
                </motion.div>
            </div>
            
            <input
            type="range"
            min="36.0"
            max="40.0"
            step="0.1"
            value={value}
            onChange={handleSliderChange}
            className="w-full h-12 absolute top-0 opacity-0 cursor-pointer z-30"
            style={{ touchAction: 'none' }} // Crucial for mobile slide
            />
        </div>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 flex items-center justify-center gap-2 transition-colors duration-300 ${bgClass}`}
        >
          <span>Find Help</span>
          <ArrowRight size={20} opacity={0.8} />
        </motion.button>
      </div>
    </div>
  );
}
