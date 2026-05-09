'use client';

import { useState } from 'react';
import { X, Home, Smartphone, Settings } from 'lucide-react';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuBurgerIcon } from '../atoms/ServiceIllustrations';
import { useIsMobile } from '@/hooks/useIsMobile';
import ToggleSwitch from '../atoms/ToggleSwitch';
import { audioManager } from '@/lib/audio';

interface AppMenuProps {
  onHome?: () => void;
  onMobile?: () => void;
}

export default function SettingsMenu({ onHome, onMobile }: AppMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);
  const showSubtitles = useAssessmentStore((state) => state.showSubtitles);
  const isSoundEnabled = useAssessmentStore((state) => state.isSoundEnabled);
  const toggleTextLabels = useAssessmentStore((state) => state.toggleTextLabels);
  const toggleSubtitles = useAssessmentStore((state) => state.toggleSubtitles);
  const toggleSound = useAssessmentStore((state) => state.toggleSound);
  const locale = useAssessmentStore((state) => state.locale);
  const isMobile = useIsMobile();

  const handleAction = (action?: () => void, sound: 'click' | 'pop' = 'click') => {
    if (action) {
      audioManager.playSound(sound);
      action();
      setIsOpen(false);
    }
  };

  const handleToggleSound = () => {
    toggleSound();
    // Synchronize with audio manager (using the inverse of current state since toggle just happened/is happening)
    const newEnabled = !isSoundEnabled;
    audioManager.setEnabled(newEnabled);
    if (!newEnabled) {
      audioManager.stopNarration();
    } else {
      audioManager.playSound('click');
    }
  };

  return (
    <div className="relative z-[100] overflow-visible">
      <button onClick={() => {
        audioManager.playSound('click');
        setIsOpen(true);
      }} className="p-2 transition-transform active:scale-90">
        <MenuBurgerIcon className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-12 right-0 bg-white shadow-2xl rounded-3xl p-6 w-72 border border-neutral-100 flex flex-col gap-6 z-[110]"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-neutral-800 text-lg">Menu</h3>
              <button onClick={() => {
                audioManager.playSound('click');
                setIsOpen(false);
              }} className="text-neutral-400 hover:text-neutral-600">
                <X size={24} />
              </button>
            </div>

            {/* Navigation Actions */}
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 border-b border-neutral-100 pb-6`}>
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
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{
                    locale === 'es' ? 'Etiquetas de Texto' :
                    locale === 'tr' ? 'Metin Etiketleri' :
                    locale === 'de' ? 'Textbezeichnungen' :
                    locale === 'fr' ? 'Étiquettes de texte' :
                    'Text Labels'
                  }</span>
                <ToggleSwitch 
                  isOn={showTextLabels} 
                  onToggle={toggleTextLabels} 
                  ariaLabel="Toggle Text Labels"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{
                    locale === 'es' ? 'Subtítulos' :
                    locale === 'tr' ? 'Altyazılar' :
                    locale === 'de' ? 'Untertitel' :
                    locale === 'fr' ? 'Sous-titres' :
                    'Subtitles'
                  }</span>
                <ToggleSwitch 
                  isOn={showSubtitles} 
                  onToggle={toggleSubtitles} 
                  ariaLabel="Toggle Subtitles"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{
                    locale === 'es' ? 'Narración de voz' :
                    locale === 'tr' ? 'Sesli Anlatım' :
                    locale === 'de' ? 'Sprachausgabe' :
                    locale === 'fr' ? 'Narration sonore' :
                    'Sound Narration'
                  }</span>
                <ToggleSwitch 
                  isOn={isSoundEnabled} 
                  onToggle={handleToggleSound} 
                  ariaLabel="Toggle Sound Narration"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}