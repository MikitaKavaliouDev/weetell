'use client';

import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useEffect } from 'react';
import { audioManager } from '@/lib/audio';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubtitleOverlay() {
  const showSubtitles = useAssessmentStore((state) => state.showSubtitles);
  const currentSubtitle = useAssessmentStore((state) => state.currentSubtitle);
  const isSoundEnabled = useAssessmentStore((state) => state.isSoundEnabled);

  // Synchronize audio manager with store state on mount and when it changes
  useEffect(() => {
    audioManager.setEnabled(isSoundEnabled);
  }, [isSoundEnabled]);

  // Play sound when bubble appears
  useEffect(() => {
    if (showSubtitles && currentSubtitle) {
      audioManager.playSound('pop');
    }
  }, [currentSubtitle, showSubtitles]);
  
  if (!showSubtitles || !currentSubtitle) {
    return null;
  }

  return (
    <div className="fixed top-[100px] left-0 right-0 pointer-events-none z-40 flex justify-center px-6">
      <AnimatePresence>
        {(
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 16 }}
            className="relative bg-wee-yellow text-wee-black font-bold text-xl md:text-2xl px-10 py-5 rounded-[2.5rem] text-center shadow-xl max-w-lg"
          >
            {currentSubtitle}
            
            {/* Speech bubble tail */}
            <div 
              className="absolute -bottom-3 left-10 w-8 h-8 bg-wee-yellow"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                transform: 'translateX(-50%)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
