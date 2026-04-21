'use client';

import { useState } from 'react';
import { X, ArrowLeft, Home, Smartphone, Settings } from 'lucide-react';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuBurgerIcon } from '../atoms/ServiceIllustrations';
import { useIsMobile } from '@/hooks/useIsMobile';

interface AppMenuProps {
  onBack?: () => void;
  onHome?: () => void;
  onMobile?: () => void;
}

export default function SettingsMenu({ onBack, onHome, onMobile }: AppMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);
  const showSubtitles = useAssessmentStore((state) => state.showSubtitles);
  const toggleTextLabels = useAssessmentStore((state) => state.toggleTextLabels);
  const toggleSubtitles = useAssessmentStore((state) => state.toggleSubtitles);
  const locale = useAssessmentStore((state) => state.locale);
  const isMobile = useIsMobile();

  const handleAction = (action?: () => void) => {
    if (action) {
      action();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative z-60 overflow-visible">
      <button onClick={() => setIsOpen(true)} className="p-2 transition-transform active:scale-90">
        <MenuBurgerIcon className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-12 right-0 bg-white shadow-2xl rounded-3xl p-6 w-72 border border-neutral-100 flex flex-col gap-6 z-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-neutral-800 text-lg">Menu</h3>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X size={24} />
              </button>
            </div>

            {/* Navigation Actions */}
            <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3 border-b border-neutral-100 pb-6`}>
              <button onClick={() => handleAction(onBack)} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-neutral-50 transition-colors">
                <ArrowLeft size={24} className="text-neutral-500" />
                <span className="text-[10px] font-bold uppercase text-neutral-400">Back</span>
              </button>
              <button onClick={() => handleAction(onHome)} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-neutral-50 transition-colors">
                <Home size={24} className="text-neutral-500" />
                <span className="text-[10px] font-bold uppercase text-neutral-400">Home</span>
              </button>
              {!isMobile && (
                <button onClick={() => handleAction(onMobile)} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-neutral-50 transition-colors">
                  <Smartphone size={24} className="text-neutral-500" />
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Mobile</span>
                </button>
              )}
            </div>

            {/* Accessibility Toggles */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neutral-400 mb-2">
                <Settings size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Accessibility</span>
              </div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-neutral-700">{
                    locale === 'es' ? 'Etiquetas de Texto' :
                    locale === 'tr' ? 'Metin Etiketleri' :
                    'Text Labels'
                  }</span>
                <input
                  type="checkbox"
                  checked={showTextLabels}
                  onChange={toggleTextLabels}
                  className="w-5 h-5 accent-wee-blue"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-neutral-700">{
                    locale === 'es' ? 'Subtítulos' :
                    locale === 'tr' ? 'Altyazılar' :
                    'Subtitles'
                  }</span>
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