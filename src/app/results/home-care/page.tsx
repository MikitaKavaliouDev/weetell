'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, CheckCircle, Clock, Thermometer, Droplets, X } from 'lucide-react';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import VideoPlayer from '@/components/molecules/VideoPlayer';

export default function HomeCarePage() {
  const router = useRouter();
  const severity = useAssessmentStore((state) => state.severity);
  const locale = useAssessmentStore((state) => state.locale);
  const [showVideo, setShowVideo] = useState(false);

  const careTips = [
    { icon: Thermometer, title: 'Monitor Temperature', desc: 'Check temperature every 4 hours' },
    { icon: Droplets, title: 'Stay Hydrated', desc: 'Give plenty of fluids' },
    { icon: Clock, title: 'Rest', desc: 'Ensure adequate sleep and rest' },
    { icon: CheckCircle, title: 'Medication', desc: 'Use fever reducer if needed' },
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

        <h2 className="text-lg font-bold text-neutral-800 mb-4">Care Instructions</h2>
        <div className="space-y-3 mb-8">
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
                <h3 className="font-bold text-neutral-800">{tip.title}</h3>
                <p className="text-sm text-neutral-500">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
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
