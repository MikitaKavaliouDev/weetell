'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore, Locale } from '@/stores/useAssessmentStore';
import CartoonGlobe from '@/components/molecules/CartoonGlobe';
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

  // Positions for bubbles around the center: [top, left, rotateTail]
  const positions = [
    { top: '10%', left: '10%', tail: 'bottom-right', color: '#FFB74D' },  // Top Left (Orange/Yellow ish)
    { top: '15%', right: '10%', tail: 'bottom-left', color: '#E57373' },  // Top Right (Reddish)
    { bottom: '20%', left: '5%', tail: 'top-right', color: '#4DB6AC' },   // Bottom Left (Teal)
    { bottom: '20%', right: '5%', tail: 'top-left', color: '#F06292' },   // Bottom Right (Pinkish)
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
                <CartoonGlobe />
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
                        className="absolute w-20 h-16 rounded-[40%] shadow-md flex items-center justify-center cursor-pointer z-20 overflow-visible"
                        style={{
                            top: pos.top,
                            bottom: pos.bottom,
                            left: pos.left,
                            right: pos.right,
                            backgroundColor: pos.color || '#fff', 
                        }}
                    >
                        {/* Bubble Tail */}
                        <div 
                            className="absolute w-4 h-4"
                            style={{
                                backgroundColor: 'inherit',
                                ...(pos.tail === 'bottom-right' && { bottom: -2, right: 10, transform: 'rotate(45deg)' }),
                                ...(pos.tail === 'bottom-left' && { bottom: -2, left: 10, transform: 'rotate(45deg)' }),
                                ...(pos.tail === 'top-right' && { top: -2, right: 10, transform: 'rotate(45deg)' }),
                                ...(pos.tail === 'top-left' && { top: -2, left: 10, transform: 'rotate(45deg)' }),
                            }}
                        />

                        {/* Content (Flag) */}
                        <span className="text-3xl relative z-10 filter drop-shadow-sm">
                            {locale.flag}
                        </span>
                    </motion.button>
                );
            })}
        </div>
      </div>
    </div>
  );
}
