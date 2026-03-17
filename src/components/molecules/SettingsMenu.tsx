'use client';

import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);
  const showSubtitles = useAssessmentStore((state) => state.showSubtitles);
  const toggleTextLabels = useAssessmentStore((state) => state.toggleTextLabels);
  const toggleSubtitles = useAssessmentStore((state) => state.toggleSubtitles);

  return (
    <div className="relative z-50">
      <button onClick={() => setIsOpen(true)} className="p-2 text-neutral-500 hover:text-neutral-800 transition-colors">
        <Settings size={28} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-12 right-0 bg-white shadow-xl rounded-2xl p-4 w-64 border border-neutral-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-neutral-800">Accessibility</h3>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-neutral-700">Show Text Labels</span>
                <input
                  type="checkbox"
                  checked={showTextLabels}
                  onChange={toggleTextLabels}
                  className="w-5 h-5 accent-wee-blue"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-neutral-700">Show Subtitles</span>
                <input
                  type="checkbox"
                  checked={showSubtitles}
                  onChange={toggleSubtitles}
                  className="w-5 h-5 accent-wee-blue"
                />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
