'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useState, useEffect } from 'react';
import ThermometerSVG from '../molecules/ThermometerSVG';
import VideoPlayer from '../molecules/VideoPlayer';
import { Play } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import { getVideoForTemperature } from '@/data/symptom-graph';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SeveritySelectionProps {
  onNext: () => void;
}

export default function SeveritySelection({ onNext }: SeveritySelectionProps) {
  const router = useRouter();
  const setActionDecision = useAssessmentStore((state) => state.setActionDecision);
  const bodyPart = useAssessmentStore((state) => state.bodyPart);
  const symptom = useAssessmentStore((state) => state.symptom);
  const ageGroup = useAssessmentStore((state) => state.ageGroup);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const subtitle = locale === 'de' ? 'Was möchten Sie tun?' : locale === 'es' ? '¿Qué te gustaría hacer?' : locale === 'tr' ? 'Ne yapmak istersiniz?' : 'What would you like to do?';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handleWatchVideo = () => {
    audioManager.playSound('click');
    setShowVideo(true);
  };

  const handleVideoEnded = () => {
    setShowVideo(false);
  };

  const handleChair = () => {
    audioManager.playSound('click');
    setActionDecision('wait');
    router.push('/results/home-care');
  };

  const handleDoctor = () => {
    audioManager.playSound('click');
    setActionDecision('doctor');
    onNext();
  };

  const videoUrl = getVideoForTemperature(bodyPart || 'head', ageGroup || 'child', symptom || 'fever', 38.0, locale);

  return (
    <div className="flex flex-col items-center justify-between h-full pt-4 pb-8 relative w-full">
      <AnimatePresence mode="wait">
        {showVideo ? (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md mt-10"
          >
            <VideoPlayer 
              src={videoUrl || '/videos/high_fever_en.mp4'}
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
            className="flex-1 w-full flex flex-col items-center justify-center relative"
          >
            <div className="relative w-full max-w-[320px] h-[400px]"> 
              <div className="absolute inset-0 flex items-center justify-center pr-16 mt-8">
                <Image 
                  src="/assets/fever_illustration.svg" 
                  alt="Fever illustration" 
                  width={280} 
                  height={320}
                  className="w-72 h-80 object-contain"
                />
              </div>

             
            </div>

            {/* Action Buttons Layer */}
            <div className="w-full flex justify-center gap-6 mt-8 z-10">
               <motion.button 
                 whileHover={{ scale: 1.1 }} 
                 whileTap={{ scale: 0.95 }} 
                 onClick={handleWatchVideo} 
                 className="w-16 h-16 rounded-full bg-white shadow-lg border-4 border-yellow-400 flex items-center justify-center text-yellow-500"
               >
                  <Play fill="currentColor" size={28} className="ml-1" />
               </motion.button>
               
               <motion.button 
                 whileHover={{ scale: 1.1 }} 
                 whileTap={{ scale: 0.95 }} 
                 onClick={handleChair} 
                 className="w-16 h-16 rounded-full bg-white shadow-lg border-4 border-orange-400 flex items-center justify-center overflow-hidden p-2.5"
               >
                  <Image src="/chair.png" alt="Wait" width={40} height={40} className="object-contain" />
               </motion.button>
               
               <motion.button 
                 whileHover={{ scale: 1.1 }} 
                 whileTap={{ scale: 0.95 }} 
                 onClick={handleDoctor} 
                 className="w-16 h-16 rounded-full bg-white shadow-lg border-4 border-[#10B981] flex items-center justify-center overflow-hidden p-2.5"
               >
                  <Image src="/doctor.png" alt="Doctor" width={40} height={40} className="object-contain" />
               </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
