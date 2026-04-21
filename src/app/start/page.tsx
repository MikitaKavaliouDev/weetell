'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore, Locale } from '@/stores/useAssessmentStore';

import WeetellLogo from '@/components/molecules/WeetellLogo';
import { LOCALES } from '@/data/locales';
import { Menu } from 'lucide-react';
import SettingsMenu from '@/components/molecules/SettingsMenu';

export default function StartPage() {
  const router = useRouter();
  const setLocale = useAssessmentStore((state) => state.setLocale);

  const handleSelect = (locale: Locale) => {
    setLocale(locale);
    router.push('/checkup?step=age');
  };

  const flagAssets: Record<Locale, string> = {
    en: '/assets/english.png',
   
      es: '/assets/espanol.png',
     de: '/assets/german.png',
      tr: '/assets/turkish.png',
    fr: '/assets/french.png',
  };

  const positions = [
    { top: '10%', left: '10%', tail: 'bottom-right', color: '#FFB74D' },
    { top: '15%', right: '10%', tail: 'bottom-left', color: '#E57373' },
    { bottom: '20%', left: '5%', tail: 'top-right', color: '#4DB6AC' },
      { bottom: '20%', right: '5%', tail: 'top-left', color: '#F06292' },
    { bottom: '45%', right: '1%', tail: 'top-left', color: '#F06292' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-8 z-10">
        <WeetellLogo />
        <div className="flex items-center gap-2">
            <SettingsMenu />
           
        </div>
      </div>

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
                <img 
                    src="/assets/world.png" 
                    alt="World" 
                    className="w-100 h-100 object-contain"
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
                        className="absolute w-20 h-16  flex items-center justify-center cursor-pointer z-20 overflow-visible"
                        style={{
                            top: pos.top,
                            bottom: pos.bottom,
                            left: pos.left,
                            right: pos.right,
                          
                        }}
                    >
                     

                        {/* Content (Flag Image) */}
                        <img 
                            src={flagAssets[locale.id]} 
                            alt={locale.label}
                            className="w-20 h-20 object-contain relative z-10"
                        />
                    </motion.button>
                );
            })}

            {/* Decorative Bubbles */}
           
        </div>
      </div>
    </div>
  );
}
