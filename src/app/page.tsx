'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { audioManager } from '@/lib/audio';
import { Play } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();
  const [showStart, setShowStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStart(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    audioManager.playSound('success');
    audioManager.narrate('Welcome to Weetell', 'en');
    setTimeout(() => {
      router.push('/start');
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
        className="relative z-10 flex flex-col items-center"
      >
        <h1 className="text-[120px] leading-none font-bold text-wee-blue tracking-tighter drop-shadow-sm">
          Wee
        </h1>
        
        <p className="text-lg text-neutral-500 mt-2">Digital Health Companion</p>

        {showStart && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleStart}
            className="mt-12 flex items-center gap-3 px-8 py-4 bg-wee-blue text-white rounded-full font-bold text-xl shadow-lg shadow-blue-500/30 hover:bg-wee-blue-dark transition-colors"
          >
            <Play fill="currentColor" size={24} />
            Start
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
