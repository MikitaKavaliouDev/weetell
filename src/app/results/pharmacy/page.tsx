'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MapPin, Check } from 'lucide-react';
import Image from 'next/image';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useEffect } from 'react';
import { audioManager } from '@/lib/audio';
import WeetellLogo from '@/components/molecules/WeetellLogo';

const CHECKLIST_ITEMS = [
  {
    en: 'Stay calm and observe your child.',
    de: 'Bleib ruhig und beobachte dein Kind.',
    es: 'Mantén la calma y observa a tu hijo.',
    tr: 'Sakin kalın ve çocuğunuzu gözlemleyin.',
  },
  {
    en: 'Pay attention to whether they are drinking and responsive.',
    de: 'Achte darauf, ob sie trinken und reagieren.',
    es: 'Presta atención a si están bebiendo y responden.',
    tr: 'Çocuğunuzun sıvı alıp almadığına ve tepki verip vermediğine dikkat edin.',
  },
  {
    en: 'Give fluids and ensure rest.',
    de: 'Gib Flüssigkeit und sorge für Ruhe.',
    es: 'Dale líquidos y asegúrate de que descanse.',
    tr: 'Sıvı verin ve dinlenmesini sağlayın.',
  },
  {
    en: 'High fever is not automatically serious.',
    de: 'Hohes Fieber ist nicht automatisch schlimm.',
    es: 'La fiebre alta no es automáticamente grave.',
    tr: 'Yüksek ateş her zaman tehlikeli değildir.',
  },
  {
    en: 'Always measure the temperature at the same location.',
    de: 'Miss das Fieber immer an derselben Stelle.',
    es: 'Mide siempre la temperatura en el mismo lugar.',
    tr: 'Ateşi her zaman aynı yerden ölçün.',
  },
  {
    en: 'Reduce the fever if your child is distressed.',
    de: 'Senke das Fieber, wenn dein Kind leidet.',
    es: 'Reduce la fiebre si tu hijo está molesto.',
    tr: 'Çocuğunuz rahatsızlık çekiyorsa ateşi düşürün.',
  },
  {
    en: 'Seek help if your instincts tell you something isn\'t right.',
    de: 'Hole Hilfe, wenn dein Gefühl dir sagt, dass etwas nicht stimmt.',
    es: 'Busca ayuda si tu instinto te dice que algo no está bien.',
    tr: 'İçgüdüleriniz size bir şeylerin yolunda olmadığını söylüyorsa yardım alın.',
  },
];

export default function PharmacyPage() {
  const router = useRouter();
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);

  useEffect(() => {
    const narrative = locale === 'de'
      ? 'Lass uns eine Apotheke in deiner Nähe finden.'
      : locale === 'es'
      ? 'Busquemos una farmacia cerca de ti.'
      : locale === 'tr'
      ? 'Yakınınızda bir eczane bulalım.'
      : 'Let\'s find a pharmacy near you.';
    setCurrentSubtitle(narrative);
    audioManager.playLanguageAudio('find_pharmacy', locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const logoBack = () => {
    audioManager.playSound('click');
    router.push('/checkup?step=age');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <header className="fixed top-0 bg-white/95 backdrop-blur-sm flex justify-between items-center gap-4 py-4 mb-8 z-50">
        <WeetellLogo onClick={logoBack} />
        <h1 className="text-2xl font-bold text-neutral-800 flex-1">
          {locale === 'de' ? 'Apotheker-Beratung' : locale === 'es' ? 'Consejo de Farmacia' : locale === 'tr' ? 'Eczane Danışmanlığı' : 'Pharmacy Advice'}
        </h1>
      </header>

      <div className="flex-1 max-w-md mx-auto w-full space-y-6 mt-20">
        {/* Main Illustration */}
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-[#6B8E23]/10 rounded-full flex items-center justify-center relative">
            <Image 
              src="/assets/chemist_icon.svg" 
              alt="Pharmacy" 
              fill 
              sizes="128px"
              className="object-contain p-8" 
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-neutral-800 text-lg mb-3">
            {locale === 'de' ? 'Was zu tun ist' : locale === 'es' ? 'Qué hacer' : locale === 'tr' ? 'Yapılacaklar' : 'What to do'}
          </h2>
          {CHECKLIST_ITEMS.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6B8E23]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={14} className="text-[#6B8E23]" strokeWidth={3} />
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {locale === 'de' ? item.de : locale === 'es' ? item.es : locale === 'tr' ? item.tr : item.en}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = 'https://www.arzt-auskunft.de/?form=fs4'}
          className="w-full bg-[#6B8E23] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold shadow-lg shadow-green-900/20"
        >
          <MapPin size={20} />
          {locale === 'de' ? 'Apotheke finden' : locale === 'es' ? 'Encontrar una Farmacia' : locale === 'tr' ? 'Eczane Bul' : 'Find a Pharmacy'}
        </motion.button>
      </div>
    </div>
  );
}
