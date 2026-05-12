'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAssessmentStore, Locale } from '@/stores/useAssessmentStore';
import { audioManager } from '@/lib/audio';

import { LOCALES } from '@/data/locales';
import AppHeader from '@/components/molecules/AppHeader';

export default function HomePage() {
  const router = useRouter();
  const setLocale = useAssessmentStore((state) => state.setLocale);
  const locale = useAssessmentStore((state) => state.locale);

  useEffect(() => {
    audioManager.playMp3('/wee_audios/wee_sounds/wee_sounds_choice/WEE_TELL_LANGUAGES_MULTI_260427.mp3');
    return () => {
      audioManager.stopNarration();
    };
  }, []);

  const handleSelect = (locale: Locale) => {
    setLocale(locale);
    audioManager.playSound('pop');
    router.push('/disclaimer');
  };

  const flagAssets: Record<Locale, string> = {
    en: '/assets/english.png',
    es: '/assets/espanol.png',
    de: '/assets/german.png',
    tr: '/assets/turkish.png',
    fr: '/assets/french.png',
  };

  const positions = [
    { top: '15%', left: '10%', tail: 'bottom-right', color: '#FFB74D' },
    { top: '15%', right: '10%', tail: 'bottom-left', color: '#E57373' },
    { bottom: '20%', left: '5%', tail: 'top-right', color: '#4DB6AC' },
    { bottom: '20%', right: '5%', tail: 'top-left', color: '#F06292' },
    { bottom: '45%', right: '1%', tail: 'top-left', color: '#F06292' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <AppHeader />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
          {/* The Globe */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10"
          >
            <Image
              src="/assets/world.png"
              alt="World"
              className="w-100 h-100 object-contain"
              width={100}
              height={100}
            />
          </motion.div>

          {/* Language Bubbles */}
          {LOCALES.map((locale, index) => {
            const pos = positions[index % positions.length];

            return (
              <motion.button
                key={locale.id}
                onClick={() => handleSelect(locale.id)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onAnimationComplete={() => audioManager.playSound('pop')}
                className="absolute w-20 h-20 flex items-center justify-center cursor-pointer z-10 overflow-hidden"
                style={{
                  top: pos.top,
                  bottom: pos.bottom,
                  left: pos.left,
                  right: pos.right,
                }}
              >
                {/* Content (Flag Image) */}
                <Image
                  src={flagAssets[locale.id]}
                  alt={locale.label}
                  className="w-20 h-20 object-contain relative z-10"
                  width={20}
                  height={20}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
