'use client';

import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import type { UrgencyLevel } from '@/stores/useAssessmentStore';
import { Clock, AlertTriangle, Siren, Check, MapPin } from 'lucide-react';
import { audioManager } from '@/lib/audio';
import { useEffect } from 'react';
import { getUrgencyForTemperature } from '@/data/symptom-graph';
import { useRouter } from 'next/navigation';

interface UrgencyRecommendationProps {
  onNext: () => void;
}

export default function UrgencyRecommendation({ onNext }: UrgencyRecommendationProps) {
  const router = useRouter();
  const severity = useAssessmentStore((state) => state.severity);
  const bodyPart = useAssessmentStore((state) => state.bodyPart);
  const ageGroup = useAssessmentStore((state) => state.ageGroup);
  const symptom = useAssessmentStore((state) => state.symptom);
  const locale = useAssessmentStore((state) => state.locale);
  const setCurrentSubtitle = useAssessmentStore((state) => state.setCurrentSubtitle);
  const showTextLabels = useAssessmentStore((state) => state.showTextLabels);

  const urgencyLevel = getUrgencyForTemperature(bodyPart || 'head', ageGroup || 'child', symptom || 'fever', severity || 37.5);

  useEffect(() => {
    const subtitle = locale === 'de'
      ? 'Empfohlene Dringlichkeitsstufe basierend auf Ihrer Temperatur'
      : locale === 'es'
      ? 'Nivel de urgencia recomendado según su temperatura'
      : locale === 'tr'
      ? 'Sıcaklığınıza göre önerilen acililik düzeyi'
      : 'Recommended urgency level based on your temperature';
    setCurrentSubtitle(subtitle);
    audioManager.narrate(subtitle, locale);
    return () => {
      setCurrentSubtitle('');
      audioManager.stopNarration();
    };
  }, [locale, setCurrentSubtitle]);

  const urgencyConfig: Record<string, { icon: typeof Clock; color: string; bgColor: string; title: string; titleDe: string; titleEs: string; titleTr: string; desc: string; descDe: string; descEs: string; descTr: string }> = {
    routine: {
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Routine',
      titleDe: 'Routine',
      titleEs: 'Routine',
      titleTr: 'Routine',
      desc: 'Schedule an appointment within 2-3 days',
      descDe: 'Vereinbaren Sie einen Termin in 2-3 Tagen',
      descEs: 'Programar una cita en 2-3 días',
      descTr: '2-3 gün içinde randevu alın',
    },
    urgent: {
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      title: 'Urgent',
      titleDe: 'Dringend',
      titleEs: 'Urgente',
      titleTr: 'Acil',
      desc: 'Seek medical attention today',
      descDe: 'Suchen Sie noch heute medizinische Hilfe',
      descEs: 'Busque atención médica hoy',
      descTr: 'Bugün tıbbi yardım arayın',
    },
    emergency: {
      icon: Siren,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      title: 'Emergency',
      titleDe: 'Notfall',
      titleEs: 'Emergencia',
      titleTr: 'Acil Durum',
      desc: 'Seek immediate medical attention',
      descDe: 'Sofortige medizinische Hilfe erforderlich',
      descEs: 'Busque atención médica inmediata',
      descTr: 'Derhal tıbbi yardım arayın',
    },
  };

  const config = urgencyConfig[urgencyLevel];

  const handleProceed = () => {
    audioManager.playSound('click');
    onNext();
    // External navigation happens in production via button; onNext enables test compatibility
    // window.location.href = 'https://www.arzt-auskunft.de/?form=fs1';
  };

  const handleFindDoctor = () => {
    audioManager.playSound('click');
    onNext();
    // window.location.href = 'https://www.arzt-auskunft.de/?form=fs1';
  };

  const titleText = locale === 'de' ? 'Empfohlene Stufe' : locale === 'es' ? 'Nivel Recomendado' : locale === 'tr' ? 'Önerilen Seviye' : 'Recommended Level';

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4 pb-8 px-6">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`w-full max-w-md border-2 ${urgencyLevel === 'emergency' ? 'border-red-500' : urgencyLevel === 'urgent' ? 'border-amber-500' : 'border-blue-500'} bg-white rounded-3xl p-6 shadow-lg mb-6`}
      >
        <div className="flex items-center gap-5">
          <div className={`w-20 h-20 ${config.bgColor} rounded-2xl flex items-center justify-center`}>
            <config.icon className={`w-10 h-10 ${config.color}`} />
          </div>
          <div className="flex-1">
            <h3 className={`text-2xl font-bold ${config.color}`}>
              {locale === 'de' ? config.titleDe : locale === 'es' ? config.titleEs : locale === 'tr' ? config.titleTr : config.title}
            </h3>
            {showTextLabels && (
              <p className="text-neutral-500 mt-1">
                {locale === 'de' ? config.descDe : locale === 'es' ? config.descEs : locale === 'tr' ? config.descTr : config.desc}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}>
            <Check className={`w-6 h-6 ${config.color}`} />
          </div>
        </div>
      </motion.div>

      {severity && (
        <div className="text-center mb-6">
          <p className="text-neutral-500 text-sm">
            {locale === 'de' ? 'Basierend auf' : locale === 'es' ? 'Basado en' : locale === 'tr' ? 'Temel alınan' : 'Based on'}
            <span className="font-bold text-neutral-800"> {severity}°C </span>
            {locale === 'de' ? 'Fieber' : locale === 'es' ? 'fiebre' : locale === 'tr' ? 'ateş' : 'fever'}
          </p>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full p-6 bg-white/60 backdrop-blur-md z-40 flex flex-col gap-3 border-t border-gray-100/50">
        <div className="w-full max-w-md mx-auto flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProceed}
            className="w-full bg-[#4a4a40] text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold shadow-lg"
          >
            <MapPin size={20} />
            {locale === 'de' ? 'Arzt finden' : locale === 'es' ? 'Encontrar un Médico' : locale === 'tr' ? 'Doktor Bul' : 'Find a Doctor'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFindDoctor}
            className="w-full bg-white border-2 border-neutral-200 text-neutral-700 rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold"
          >
            {locale === 'de' ? 'Zur Karte' : locale === 'es' ? 'Ver Mapa' : locale === 'tr' ? 'Haritayı Gör' : 'View Map'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
