'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useState, useEffect } from 'react';
import ThermometerSVG from '../molecules/ThermometerSVG';
import VideoPlayer from '../molecules/VideoPlayer';
import VideoShortcutButton from '../atoms/VideoShortcutButton';
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
  
  type View = 'selection' | 'video-preview' | 'video-playing' | 'waiting-room' | 'home-care-choice';
  const [view, setView] = useState<View>('selection');

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
    setView('video-preview');
  };

  const handleStartVideo = () => {
    audioManager.playSound('click');
    setView('video-playing');
  };

  const handleVideoEnded = () => {
    setView('video-preview');
  };

  const handleChair = () => {
    audioManager.playSound('click');
    setActionDecision('wait');
    setView('home-care-choice');
  };

  const handleDoctor = () => {
    audioManager.playSound('click');
    setActionDecision('doctor');
    setView('waiting-room');
  };

  const videoUrl = getVideoForTemperature(bodyPart || 'head', ageGroup || 'child', symptom || 'fever', 38.0, locale);

  return (
    <div className="flex flex-col items-center justify-between h-full pt-4 pb-8 relative w-full">
       
      <AnimatePresence mode="wait">
        {view === 'video-playing' ? (
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
        ) : view === 'video-preview' ? (
          <motion.div
            key="video-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 w-full flex flex-col items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartVideo}
              className="w-full max-w-[280px] aspect-video flex items-center justify-center mb-12"
            >
              <Image
                src="/assets/Play_film_button.svg"
                alt="Start video"
                width={280}
                height={200}
                className="object-contain"
              />
            </motion.button>

            <div className="fixed bottom-0 left-0 w-full p-6 bg-white/60 backdrop-blur-md z-40 border-t border-gray-100/50">
              <div className="flex justify-center gap-8 max-w-2xl mx-auto">
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={handleChair} 
                  className="w-20 flex flex-col items-center gap-2"
                >
                  <Image src="/chair.png" alt="Wait" width={60} height={80} className="object-contain" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={handleDoctor} 
                  className="w-20 flex flex-col items-center gap-2"
                >
                  <Image src="/doctor.png" alt="Doctor" width={60} height={80} className="object-contain" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : view === 'selection' ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full flex flex-col items-center justify-center relative"
          >
            <div className="relative w-full max-w-full h-[400px]"> 
              <div className="flex items-center justify-center  ">
                <Image 
                  src="/assets/fever_illustration.svg" 
                  alt="Fever illustration" 
                  width={300} 
                  height={400}
                  className="w-full h-[400px] object-contain"
                />
              </div>

             
            </div>

            {/* Action Buttons Layer */}
            <div className="fixed bottom-12 left-0 w-full p-6 bg-white/60 backdrop-blur-md z-40 border-t border-gray-100/50">
                <div className="flex justify-center gap-6 max-w-2xl mx-auto">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWatchVideo}
                    className="w-[100px]  flex items-center justify-center"
                  >
                    <Image
                      src="/assets/Play_film_button.svg"
                      alt="Play video"
                      width={100}
                      height={100}
                      className="object-contain ml-0.5"
                    />
                  </motion.button>
                 
                 <motion.button 
                   whileHover={{ scale: 1.1 }} 
                   whileTap={{ scale: 0.95 }} 
                   onClick={handleChair} 
                   className="w-[100px]  flex items-center justify-center overflow-hidden"
                 >
                    <Image src="/chair.png" alt="Wait" width={75}
                      height={100} className="object-contain" />
                 </motion.button>
                 
                  <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={handleDoctor} 
                   className="w-[100px]  flex items-center justify-center overflow-hidden"
                  >
                     <Image src="/doctor.png" alt="Nurse"  width={75}
                       height={100} className="object-contain" />
                  </motion.button>
                </div>
             </div>
           </motion.div>
        ) : view === 'waiting-room' ? (
          <motion.div
            key="waiting-room"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 w-full flex flex-col items-center justify-center relative"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="relative w-full max-w-sm aspect-square flex items-center justify-center"
            >
              <Image
                src="/assets/Bed_waiting_button.svg"
                alt="Go to bed"
                fill
                className="object-contain"
              />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 400, damping: 16 }}
              className="fixed bottom-12 left-0 z-50"
            >
              <VideoShortcutButton
                onClick={() => setView('video-preview')}
                className="w-[100px] h-[100px] flex items-center justify-center cursor-pointer"
              />
            </motion.div>
          </motion.div>
        ) : view === 'home-care-choice' ? (
          <motion.div
            key="home-care-choice"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 w-full flex flex-col items-center justify-center relative"
          >
            <div className="flex justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/results/map')}
                className="w-1/2 max-w-[160px] aspect-square flex items-center justify-center"
              >
                <Image
                  src="/assets/directions_icon.svg"
                  alt="Directions"
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/results/pharmacy')}
                className="w-1/2 max-w-[160px] aspect-square flex items-center justify-center"
              >
                <Image
                  src="/assets/chemist_icon.svg"
                  alt="Chemist"
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </motion.button>
            </div>

            {/* Video shortcut in the corner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 16 }}
              className="fixed bottom-12 left-0 z-50"
            >
              <VideoShortcutButton
                onClick={() => setView('video-preview')}
                className="w-[100px] h-[100px] flex items-center justify-center cursor-pointer"
              />
            </motion.div>
          </motion.div>
        ) : null}
        
      </AnimatePresence>
      
    </div>
  );
}
