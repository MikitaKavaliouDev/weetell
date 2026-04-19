'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import type { ActionDecision as ActionDecisionType } from '@/stores/useAssessmentStore';
import { Clock, Stethoscope, Home, GraduationCap } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import { useEffect } from 'react';

interface ActionDecisionProps {
  onNext: () => void;
}

type Locale = 'en' | 'de' | 'es' | 'tr';

const translations = {
  header: {
    en: "What's the next step?",
    de: "Was möchten Sie tun?",
    es: "¿Cuál es el siguiente paso?",
    tr: "Sonraki adım ne olacak?",
  },
  waitMonitor: {
    title: {
      en: 'Wait & Monitor',
      de: 'Abwarten & Beobachten',
      es: 'Esperar y Monitorear',
      tr: 'Bekle ve İzle',
    },
    description: {
      en: 'Home care instructions & video guide',
      de: 'Hauspflege-Anleitung & Video',
      es: 'Instrucciones de cuidado en casa y video',
      tr: 'Ev bakımı talimatları ve video',
    },
  },
  seeDoctor: {
    title: {
      en: 'See a Doctor',
      de: 'Arzt aufsuchen',
      es: 'Ver a un Médico',
      tr: 'Doktora Görün',
    },
    description: {
      en: 'Find medical help nearby',
      de: 'Medizinische Hilfe in der Nähe finden',
      es: 'Encuentre ayuda médica cercana',
      tr: 'Yakında tıbbi yardım bulun',
    },
  },
} as const;

function t(locale: Locale): {
  header: string;
  waitMonitorTitle: string;
  waitMonitorDescription: string;
  seeDoctorTitle: string;
  seeDoctorDescription: string;
} {
  return {
    header: translations.header[locale],
    waitMonitorTitle: translations.waitMonitor.title[locale],
    waitMonitorDescription: translations.waitMonitor.description[locale],
    seeDoctorTitle: translations.seeDoctor.title[locale],
    seeDoctorDescription: translations.seeDoctor.description[locale],
  };
}

export default function ActionDecision({ onNext }: ActionDecisionProps) {
  const setActionDecision = useAssessmentStore((state) => state.setActionDecision);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);

  const currentLocale = locale as Locale;
  const str = t(currentLocale);

  useEffect(() => {
    setCurrentSubtitle(str.header);
    audioManager.narrate(str.header, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, str.header, setCurrentSubtitle]);

  const handleSelect = (decision: ActionDecisionType) => {
    audioManager.playSound('success');
    setActionDecision(decision);
    setTimeout(onNext, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4 pb-8 px-6">
      <h2 className="text-2xl font-bold text-[#4a4a40] mb-8 text-center">
        {str.header}
      </h2>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* Wait / Home Care Option */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('wait')}
          className="cursor-pointer bg-white border-2 border-[#10B981] rounded-3xl p-6 flex items-center gap-5 shadow-sm"
        >
          <div className="w-16 h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center">
            <Home className="w-8 h-8 text-[#10B981]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#10B981]">{str.waitMonitorTitle}</h3>
            {showTextLabels && <p className="text-sm text-neutral-500 mt-1">
              {str.waitMonitorDescription}
            </p>}
          </div>
          <Clock className="w-6 h-6 text-[#10B981]" />
        </motion.div>

        {/* Doctor Option */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('doctor')}
          className="cursor-pointer bg-white border-2 border-[#EF4444] rounded-3xl p-6 flex items-center gap-5 shadow-sm"
        >
          <div className="w-16 h-16 bg-[#EF4444]/10 rounded-2xl flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-[#EF4444]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#EF4444]">{str.seeDoctorTitle}</h3>
            {showTextLabels && <p className="text-sm text-neutral-500 mt-1">
              {str.seeDoctorDescription}
            </p>}
          </div>
          <GraduationCap className="w-6 h-6 text-[#EF4444]" />
        </motion.div>
      </div>
    </div>
  );
}
