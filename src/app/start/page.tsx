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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 p-6 gap-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-neutral-800 dark:text-neutral-200"
      >
        Where are you?
      </motion.h1>

      <InteractiveGlobe />

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {LOCALES.map((locale, index) => (
          <motion.button
            key={locale.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            onClick={() => handleSelect(locale.id)}
            whileHover={{ scale: 1.05, backgroundColor: 'var(--light-blue)' }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-wee-blue transition-colors bg-white dark:bg-neutral-900"
          >
            <span className="text-4xl mb-2">{locale.flag}</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">{locale.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
