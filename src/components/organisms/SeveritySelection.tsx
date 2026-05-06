'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useState, useEffect } from 'react';
import VideoPlayer from '../molecules/VideoPlayer';
import VideoShortcutButton from '../atoms/VideoShortcutButton';
import { Play, X } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import { SYMPTOM_GRAPH, getVideoForTemperature } from '@/data/symptom-graph';
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

  const [selectedTempInfo, setSelectedTempInfo] = useState<{
    id: string;
    text: string;
    textDe: string;
    textEs: string;
    textTr: string;
    icon: string;
  } | null>(null);

   // Maps temperature option IDs to language audio keys
   const TEMP_AUDIO_KEYS: Record<string, string> = {
     '37.5': 'mild_temperature',
     '38.0': 'moderate_fever',
     '40.0': 'high_fever',
   };

   const temperatureOptions = [
     { 
       id: 'thermometer', 
       icon: '/assets/fever_pic_assets/thermometer.png',
       text: 'Monitor temperature every 4 hours for accuracy.',
       textDe: 'Messen Sie die Temperatur zur Genauigkeit alle 4 Stunden.',
       textEs: 'Controle la temperatura cada 4 horas para mayor precisión.',
       textTr: 'Doğruluk için her 4 saatte bir sıcaklığı ölçün.'
     },
     { 
       id: '37.5', 
       icon: '/assets/fever_pic_assets/thirty_seven_and_five_degres.png',
       text: 'A mild temperature that usually requires only observation and fluids.',
       textDe: 'Erhöhte Temperatur, die meist nur Beobachtung und Flüssigkeit erfordert.',
       textEs: 'Una temperatura leve que generalmente solo requiere observación y líquidos.',
       textTr: 'Yükselmiş vücut ısısı; genellikle sadece gözlem ve sıvı alımı gerektirir.'
     },
     { 
       id: '38.0', 
       icon: '/assets/fever_pic_assets/thirty_eight_degres.png',
       text: 'A moderate fever—ensure your child is resting and drinking plenty of water.',
       textDe: 'Mäßiges Fieber – achten Sie darauf, dass Ihr Kind ruht und viel trinkt.',
       textEs: 'Fiebre moderada: asegúrate de que tu hijo descanse y beba mucha agua.',
       textTr: 'Orta derecede ateş – çocuğunuzun dinlenmesine ve bol sıvı almasına dikkat edin.'
     },
     { 
       id: '40.0', 
       icon: '/assets/fever_pic_assets/fourty_degres.png',
       text: 'A high fever that needs close monitoring and may require medical advice.',
       textDe: 'Hohes Fieber, das engmaschig überwacht werden muss und ärztlichen Rat erfordern kann.',
       textEs: 'Fiebre alta que requiere un control cercano y puede necesitar consejo médico.',
       textTr: 'Yüksek ateş – lütfen dikkatle gözlemleyin. Doktor tavsiyesine ihtiyaç duyabilirsiniz.'
     },
   ];

  useEffect(() => {
    const subtitle = locale === 'de' ? 'Wie hoch ist das Fieber?' : locale === 'es' ? '¿Qué tan alta es la fiebre?' : locale === 'tr' ? 'Ateşiniz ne kadar yüksek?' : 'How high is the fever?';
    setCurrentSubtitle(subtitle);
    audioManager.playLanguageAudio('how_high_is_the_fever', locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handleWatchVideo = () => {
    audioManager.playSound('click');
    audioManager.playLanguageAudio('film_icon', locale);
    const filmSubtitle = locale === 'de' ? 'Film' : locale === 'es' ? 'Película' : locale === 'tr' ? 'Film' : 'Film';
    setCurrentSubtitle(filmSubtitle);
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
    audioManager.playLanguageAudio('chair_hourglass_icon', locale);
    const waitSubtitle = locale === 'de' ? 'Abwarten und beobachten?' : locale === 'es' ? '¿Esperar y observar?' : locale === 'tr' ? 'Bekleyip gözlemleyelim mi?' : 'Wait and observe?';
    setCurrentSubtitle(waitSubtitle);
    setActionDecision('wait');
    setView('home-care-choice');
  };

  const handleDoctor = () => {
    audioManager.playSound('click');
    audioManager.playLanguageAudio('doctor_icon', locale);
    const doctorSubtitle = locale === 'de' ? 'Einen Arzt in Ihrer Nähe finden?' : locale === 'es' ? '¿Encontrar un médico cerca de ti?' : locale === 'tr' ? 'Yakınınızda bir doktor bulalım mı?' : 'Find a doctor close to you?';
    setCurrentSubtitle(doctorSubtitle);
    setActionDecision('doctor');
    setView('waiting-room');
  };

  const videoUrl = getVideoForTemperature(bodyPart || 'head', ageGroup || 'child', symptom || 'fever', 38.0, locale);

  return (
    <div className="flex flex-col items-center justify-between h-full pt-4 pb-8 relative w-full overflow-hidden">
       
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

            <div className="fixed bottom-12 left-0 w-full bg-white/60 backdrop-blur-md z-40 border-t border-gray-100/50">
              <div className="flex justify-center gap-8 max-w-2xl mx-auto">
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={handleChair} 
                  className="w-20 flex flex-col items-center gap-2"
                >
                  <Image src="/assets/hourglass_green_icon.svg" alt="Wait" width={80} height={80} className="object-contain" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={handleDoctor} 
                  className="w-20 flex flex-col items-center gap-2"
                >
                  <Image src="/assets/brown_doctor_icon.svg" alt="Doctor" width={80} height={80} className="object-contain" />
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
            className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 px-6 max-w-5xl mx-auto mb-28 md:mb-0 mt-16 md:mt-0"
          >
            {/* Illustration on the Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-1/2 flex justify-center max-h-80 md:max-h-full md:justify-end"
            >
              <div className="relative w-full max-w-[300px] aspect-3/4">
                <Image 
                  src="/assets/fever_pic_assets/fever_pic_guy.png" 
                  alt="Symptom illustration" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Temperature Icons on the Right */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6">
              {/* Thermometer Line */}
              <div className="flex justify-center w-full">
                {temperatureOptions.filter(opt => opt.id === 'thermometer').map((opt) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      audioManager.playSound('click');
                      setSelectedTempInfo(opt);
                      const text = locale === 'de' ? opt.textDe : 
                                 locale === 'es' ? opt.textEs :
                                 locale === 'tr' ? opt.textTr :
                                 opt.text;
                      audioManager.narrate(text, locale);
                    }}
                  >
                    <div className="absolute inset-0 bg-amber-100/0 group-hover:bg-amber-100/30 rounded-full transition-colors duration-300" />
                    <Image 
                      src={opt.icon} 
                      alt={opt.id} 
                      width={112} 
                      height={112} 
                      className="object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all"
                    />
                  </motion.button>
                ))}
              </div>

              {/* Temperatures Line */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6">
                {temperatureOptions.filter(opt => opt.id !== 'thermometer').map((opt, idx) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      audioManager.playSound('click');
                      setSelectedTempInfo(opt);
                      const audioKey = TEMP_AUDIO_KEYS[opt.id];
                      if (audioKey) {
                        audioManager.playLanguageAudio(audioKey, locale);
                      } else {
                        const text = locale === 'de' ? opt.textDe : 
                                   locale === 'es' ? opt.textEs :
                                   locale === 'tr' ? opt.textTr :
                                   opt.text;
                        audioManager.narrate(text, locale);
                      }
                    }}
                  >
                    <div className="absolute inset-0 bg-amber-100/0 group-hover:bg-amber-100/30 rounded-full transition-colors duration-300" />
                    <Image 
                      src={opt.icon} 
                      alt={opt.id} 
                      width={112} 
                      height={112} 
                      className="object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons Layer */}
            <div className="fixed bottom-12 left-0 w-full  bg-white/60 backdrop-blur-md z-40 border-t border-gray-100/50">
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
                    <Image src="/assets/hourglass_green_icon.svg" alt="Wait" width={90}
                      height={100} className="object-contain" />
                 </motion.button>
                 
                  <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={handleDoctor} 
                   className="w-[100px]  flex items-center justify-center overflow-hidden"
                  >
                     <Image src="/assets/brown_doctor_icon.svg" alt="Nurse"  width={90}
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
                onClick={() => window.location.href = 'https://www.arzt-auskunft.de/?form=fs1'}
                className="w-1/2 max-w-40 aspect-square flex items-center justify-center"
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
                onClick={() => window.location.href = 'https://www.arzt-auskunft.de/?form=fs1'}
                className="w-1/2 max-w-40 aspect-square flex items-center justify-center"
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

      {/* Temperature Info Overlay */}
      <AnimatePresence>
        {selectedTempInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
            onClick={() => {
               setSelectedTempInfo(null);
               audioManager.stopNarration();
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative border-4 border-amber-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setSelectedTempInfo(null);
                  audioManager.stopNarration();
                }}
              >
                <X size={24} className="text-gray-400" />
              </button>
              
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center p-2 shadow-inner">
                  <Image 
                    src={selectedTempInfo?.icon || ''} 
                    alt={selectedTempInfo?.id || ''} 
                    width={80} 
                    height={80} 
                    className="object-contain"
                  />
                </div>
                
                <p className="text-2xl font-medium text-gray-800 leading-tight">
                  {locale === 'de' ? selectedTempInfo?.textDe : 
                   locale === 'es' ? selectedTempInfo?.textEs :
                   locale === 'tr' ? selectedTempInfo?.textTr :
                   selectedTempInfo?.text}
                </p>
                
                <button
                  className="mt-4 px-8 py-3 bg-amber-100 text-amber-900 font-bold rounded-2xl hover:bg-amber-200 transition-colors"
                  onClick={() => {
                    setSelectedTempInfo(null);
                    audioManager.stopNarration();
                  }}
                >
                  {locale === 'de' ? 'OK' : locale === 'es' ? 'OK' : locale === 'tr' ? 'Tamam' : 'OK'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
