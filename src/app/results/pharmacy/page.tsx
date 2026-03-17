'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Info, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useEffect } from 'react';
import { audioManager } from '@/lib/audio';

export default function PharmacyPage() {
  const router = useRouter();
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const narrative = locale === 'de' 
      ? 'Ihr Apotheker kann Sie zu altersgerechten Medikamenten beraten.' 
      : 'Your pharmacist can advise you on age-appropriate medications.';
    setCurrentSubtitle(narrative);
    audioManager.playSound('narrative');
    return () => setCurrentSubtitle('');
  }, [locale, setCurrentSubtitle]);

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-12 h-12 rounded-full flex items-center justify-center border border-neutral-100 shadow-sm">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-neutral-800">Pharmacy Advice</h1>
      </header>

      <div className="flex-1 max-w-md mx-auto w-full space-y-8">
        {/* Main Illustration */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-[#6B8E23]/10 rounded-full flex items-center justify-center relative">
            <Image src="/medicine.png" alt="Pharmacy" fill className="object-contain p-8" />
          </div>
        </div>

        {/* Guidance Points */}
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl flex gap-4">
            <MessageCircle className="text-[#6B8E23] shrink-0" />
            <p className="text-sm text-neutral-600">
              {locale === 'de' 
                ? 'Fragen Sie Ihren Apotheker nach der richtigen Dosierung basierend auf dem Gewicht Ihres Kindes.' 
                : 'Ask your pharmacist for the correct dosage based on your child\'s weight.'}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl flex gap-4">
            <Info className="text-[#6B8E23] shrink-0" />
            <p className="text-sm text-neutral-600">
              {locale === 'de' 
                ? 'Apotheker können Fiebersäfte oder Zäpfchen empfehlen, die für das Alter Ihres Kindes geeignet sind.' 
                : 'Pharmacists can recommend fever syrups or suppositories suitable for your child\'s age.'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/results/map')}
          className="w-full bg-[#6B8E23] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold shadow-lg shadow-green-900/20"
        >
          <MapPin size={20} />
          {locale === 'de' ? 'Apotheke finden' : 'Find a Pharmacy'}
        </motion.button>
      </div>
    </div>
  );
}
