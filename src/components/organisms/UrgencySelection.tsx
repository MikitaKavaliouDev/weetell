'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import type { UrgencyLevel } from '@/stores/useAssessmentStore';
import { Clock, AlertTriangle, Siren, GraduationCap } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import { useEffect } from 'react';

interface UrgencySelectionProps {
  onNext: () => void;
}

export default function UrgencySelection({ onNext }: UrgencySelectionProps) {
  const setUrgencyLevel = useAssessmentStore((state) => state.setUrgencyLevel);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);

  useEffect(() => {
    const subtitle = locale === 'de' ? 'Wie dringend ist es?' : 'How urgent is it?';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const handleSelect = (level: UrgencyLevel) => {
    audioManager.playSound('success');
    setUrgencyLevel(level);
    setTimeout(onNext, 300);
  };

  const urgencyOptions: { level: UrgencyLevel; icon: typeof Clock; color: string; bgColor: string; title: string; desc: string }[] = [
    {
      level: 'routine',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: locale === 'de' ? 'Routine' : 'Routine',
      desc: locale === 'de' ? 'Termin in den nächsten Tagen' : 'Appointment within days',
    },
    {
      level: 'urgent',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      title: locale === 'de' ? 'Dringend' : 'Urgent',
      desc: locale === 'de' ? 'Heute noch behandeln lassen' : 'Seek care today',
    },
    {
      level: 'emergency',
      icon: Siren,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      title: locale === 'de' ? 'Notfall' : 'Emergency',
      desc: locale === 'de' ? 'Sofortige medizinische Hilfe' : 'Immediate medical attention',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4 pb-8 px-6">
      <h2 className="text-2xl font-bold text-[#4a4a40] mb-8 text-center">
        {locale === 'de' ? 'Wie dringend ist es?' : 'How urgent is it?'}
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {urgencyOptions.map((option) => (
          <motion.div
            key={option.level}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(option.level)}
            className={`cursor-pointer bg-white border-2 ${option.level === 'emergency' ? 'border-red-500' : option.level === 'urgent' ? 'border-amber-500' : 'border-blue-500'} rounded-3xl p-5 flex items-center gap-4 shadow-sm`}
          >
            <div className={`w-14 h-14 ${option.bgColor} rounded-2xl flex items-center justify-center`}>
              <option.icon className={`w-7 h-7 ${option.color}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${option.color}`}>{option.title}</h3>
              {showTextLabels && <p className="text-sm text-neutral-500 mt-0.5">{option.desc}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
