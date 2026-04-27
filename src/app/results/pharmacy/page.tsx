'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Info, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useEffect } from 'react';
import { audioManager } from '@/lib/audio';
import WeetellLogo from '@/components/molecules/WeetellLogo';

export default function PharmacyPage() {
  const router = useRouter();
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const narrative = locale === 'de'
      ? 'Ihr Apotheker kann Sie zu altersgerechten Medikamenten beraten.'
      : locale === 'es'
      ? 'Su farmacéutico puede asesorarle sobre medicamentos apropiados para la edad.'
      : locale === 'tr'
      ? 'Eczacınız yaşa uygun ilaçlar konusunda size tavsiyede bulunabilir.'
      : 'Your pharmacist can advise you on age-appropriate medications.';
    setCurrentSubtitle(narrative);
    audioManager.narrate(narrative, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <header className="fixed top-0 bg-white/95 backdrop-blur-sm flex justify-between items-center gap-4 py-4 mb-8 z-50">
        <button onClick={() => router.back()} className="w-12 h-12 rounded-full flex items-center justify-center border border-neutral-100 shadow-sm transition-colors hover:bg-neutral-50">
          <ArrowLeft size={24} />
        </button>
        
        <WeetellLogo className="shrink-0" />
        <h1 className="text-2xl font-bold text-neutral-800 flex-1">
          {locale === 'de' ? 'Apotheker-Beratung' : locale === 'es' ? 'Consejo de Farmacia' : locale === 'tr' ? 'Eczane Danışmanlığı' : 'Pharmacy Advice'}
        </h1>
      </header>

      <div className="flex-1 max-w-md mx-auto w-full space-y-8 mt-20">
        {/* Main Illustration */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-[#6B8E23]/10 rounded-full flex items-center justify-center relative">
            <Image src="/assets/chemist_icon.svg" alt="Pharmacy" fill className="object-contain p-8" />
          </div>
        </div>

        {/* Guidance Points */}
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl flex gap-4">
            <MessageCircle className="text-[#6B8E23] shrink-0" />
            <p className="text-sm text-neutral-600">
              {locale === 'de'
                ? 'Fragen Sie Ihren Apotheker nach der richtigen Dosierung basierend auf dem Gewicht Ihres Kindes.'
                : locale === 'es'
                ? 'Pregunte a su farmacéutico la dosis correcta según el peso de su hijo.'
                : locale === 'tr'
                ? 'Çocuğunuzun kilosuna göre doğru dozu eczacınıza sorun.'
                : 'Ask your pharmacist for the correct dosage based on your child\'s weight.'}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl flex gap-4">
            <Info className="text-[#6B8E23] shrink-0" />
            <p className="text-sm text-neutral-600">
              {locale === 'de'
                ? 'Apotheker können Fiebersäfte oder Zäpfchen empfehlen, die für das Alter Ihres Kindes geeignet sind.'
                : locale === 'es'
                ? 'Los farmacéuticos pueden recomendar jarabes o supositorios para la fiebre adecuados para la edad de su hijo.'
                : locale === 'tr'
                ? 'Eczacılar çocuğunuzun yaşına uygun ateş şurubu veya fitil önerebilir.'
                : 'Pharmacists can recommend fever syrups or suppositories suitable for your child\'s age.'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = 'https://www.arzt-auskunft.de/?form=fs1'}
          className="w-full bg-[#6B8E23] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold shadow-lg shadow-green-900/20"
        >
          <MapPin size={20} />
          {locale === 'de' ? 'Apotheke finden' : locale === 'es' ? 'Encontrar una Farmacia' : locale === 'tr' ? 'Eczane Bul' : 'Find a Pharmacy'}
        </motion.button>
      </div>
    </div>
  );
}
