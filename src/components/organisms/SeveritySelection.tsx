'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useState, useEffect } from 'react';
import FeverChildSVG from '../molecules/FeverChildSVG';
import ThermometerSVG from '../molecules/ThermometerSVG';
import VideoPlayer from '../molecules/VideoPlayer';
import { Play } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import { getVideoForTemperature } from '@/data/symptom-graph';

interface SeveritySelectionProps {
  onNext: () => void;
}

const TEMPERATURES = [
  { value: 37.5, label: '37,5' },
  { value: 38.0, label: '38' },
  { value: 40.0, label: '40', unit: 'c' },
];

export default function SeveritySelection({ onNext }: SeveritySelectionProps) {
  const setSeverity = useAssessmentStore((state) => state.setSeverity);
  const severity = useAssessmentStore((state) => state.severity);
  const bodyPart = useAssessmentStore((state) => state.bodyPart);
  const symptom = useAssessmentStore((state) => state.symptom);
  const [selectedTemp, setSelectedTemp] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const subtitle = locale === 'de' ? 'Wie hoch ist das Fieber?' : 'How high is the fever?';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handleSelect = (val: number) => {
    audioManager.playSound('click');
    setSelectedTemp(val);
    setSeverity(val);
    setTimeout(() => {
        onNext();
    }, 400);
  };

  const handleWatchVideo = () => {
    audioManager.playSound('click');
    setShowVideo(true);
  };

  const handleVideoEnded = () => {
    setShowVideo(false);
  };

  const currentTemp = selectedTemp || severity;
  const ageGroup = useAssessmentStore((state) => state.ageGroup);
  const videoUrl = getVideoForTemperature(bodyPart || 'head', ageGroup || 'child', symptom || 'fever', currentTemp || 37.5, locale);

  return (
    <div className="flex flex-col items-center justify-between h-full pt-4 pb-8 relative">
      <AnimatePresence mode="wait">
        {showVideo ? (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <VideoPlayer 
              src={videoUrl || '/videos/fever-guide.mp4'}
              locale={locale}
              onEnded={handleVideoEnded}
            />
          </motion.div>
        ) : (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[320px] h-[400px]"> 
              <div className="absolute inset-0 flex items-center justify-center pr-16 mt-8">
                <div className="w-72 h-80">
                  <FeverChildSVG />
                </div>
              </div>

              <div className="absolute top-10 right-0 flex flex-col items-center">
                <div className="mb-2 -mr-6">
                  <ThermometerSVG />
                </div>
                
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
                      <span className="relative font-bold">
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
          </motion.div>
        )}
      </AnimatePresence>

      {!showVideo && (
        <div className="w-full px-6 flex justify-between items-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWatchVideo}
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
      )}
    </div>
  );
}
