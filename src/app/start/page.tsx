'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore, Locale } from '@/stores/useAssessmentStore';
import InteractiveGlobe from '@/components/molecules/InteractiveGlobe';
import { LOCALES } from '@/data/locales';

export default function StartPage() {
  const router = useRouter();
  const setLocale = useAssessmentStore((state) => state.setLocale);

  const handleSelect = (locale: Locale) => {
    setLocale(locale);
    router.push('/checkup?step=age');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-6 pt-16 gap-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-neutral-800"
        >
            Where are you?
        </motion.h1>
         <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-neutral-400"
        >
            Select your region to continue
        </motion.p>
      </div>

      {/* Hero Globe */}
      <div className="relative py-4 flex-1 flex items-center justify-center">
         <InteractiveGlobe />
      </div>

      {/* Flag Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm pb-8">
        {LOCALES.map((locale, index) => (
          <motion.button
            key={locale.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            onClick={() => handleSelect(locale.id)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 gap-3 group"
          >
            <span className="text-5xl filter transition-transform duration-300 group-hover:scale-110">{locale.flag}</span>
            <span className="font-bold text-neutral-600 group-hover:text-blue-500 transition-colors">{locale.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
