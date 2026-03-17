'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, CheckCircle, Clock, Thermometer, Droplets, X, Pill, AlertTriangle, Phone } from 'lucide-react';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import VideoPlayer from '@/components/molecules/VideoPlayer';

export default function HomeCarePage() {
  const router = useRouter();
  const severity = useAssessmentStore((state) => state.severity);
  const locale = useAssessmentStore((state) => state.locale);
  const [showVideo, setShowVideo] = useState(false);

  const careTips = [
    { icon: Thermometer, title: 'Monitor Temperature', titleDe: 'Temperatur messen', desc: 'Check temperature every 4 hours', descDe: 'Temperatur alle 4 Stunden messen' },
    { icon: Droplets, title: 'Stay Hydrated', titleDe: 'Flüssigkeit geben', desc: 'Give plenty of fluids', descDe: 'Kind mit Flüssigkeiten versorgen' },
    { icon: Clock, title: 'Rest', titleDe: 'Ruhe', desc: 'Ensure adequate sleep and rest', descDe: 'Für ausreichend Ruhe sorgen' },
    { icon: CheckCircle, title: 'Medication', titleDe: 'Medikamente', desc: 'Use fever reducer if needed', descDe: 'Fiebersenkende Medikamente bei Bedarf' },
  ];

  const warningSigns = [
    { text: 'Stiff neck or severe headache', textDe: 'Nackensteife oder starke Kopfschmerzen' },
    { text: 'Difficulty breathing', textDe: 'Atemnot' },
    { text: 'Rash that doesn\'t fade', textDe: 'Ausschlag, der nicht verblasst' },
    { text: 'Seizures or convulsions', textDe: 'Krampfanfälle' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
              >
                <X size={24} />
              </button>
              <VideoPlayer
                src="/videos/fever-guide.mp4"
                locale={locale}
                onEnded={() => setShowVideo(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#10B981] rounded-b-[40px] px-6 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => router.back()} 
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white">Home Care Guide</h1>
        </div>
        <p className="text-white/80">Fever monitoring & treatment</p>
      </div>

      <div className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-sm mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Current Fever</p>
              <p className="text-4xl font-bold text-[#EF4444]">
                {severity ? `${severity}°C` : '--'}
              </p>
            </div>
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <Thermometer className="w-8 h-8 text-[#EF4444]" />
            </div>
          </div>
        </motion.div>

        <h2 className="text-lg font-bold text-neutral-800 mb-4">{locale === 'de' ? 'Pflegeanleitung' : 'Care Instructions'}</h2>
        <div className="space-y-3 mb-6">
          {careTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center">
                <tip.icon className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-800">{locale === 'de' ? tip.titleDe : tip.title}</h3>
                <p className="text-sm text-neutral-500">{locale === 'de' ? tip.descDe : tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Warning Signs Section */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-amber-800">{locale === 'de' ? 'Warnzeichen - Arzt rufen' : 'Warning Signs - Seek Medical Help'}</h3>
          </div>
          <ul className="space-y-2">
            {warningSigns.map((warning) => (
              <li key={warning.text} className="flex items-start gap-2 text-sm text-amber-900">
                <span className="text-amber-600 mt-0.5">•</span>
                {locale === 'de' ? warning.textDe : warning.text}
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push('/results')}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl py-2 text-sm font-medium transition-colors"
          >
            <Phone size={16} />
            {locale === 'de' ? 'Jetzt Arzt suchen' : 'Find a Doctor Now'}
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowVideo(true)}
          className="w-full bg-[#10B981] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold shadow-lg shadow-green-500/30"
        >
          <Play fill="currentColor" size={20} />
          Watch Care Video
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/results/pharmacy')}
          className="w-full mt-4 bg-white border-2 border-[#6B8E23] text-[#6B8E23] rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold"
        >
          <Pill size={20} />
          {locale === 'de' ? 'Apotheken-Beratung' : 'Pharmacy Advice'}
        </motion.button>

        <button
          onClick={() => router.push('/checkup?step=age')}
          className="w-full mt-4 text-neutral-500 text-sm"
        >
          Re-assess symptoms
        </button>
      </div>
    </div>
  );
}
