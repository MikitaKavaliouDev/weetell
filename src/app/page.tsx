'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { audioManager } from '@/lib/audio';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { Check } from 'lucide-react';
import Image from 'next/image';

export default function SplashPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const isSoundEnabled = useAssessmentStore((state) => state.isSoundEnabled);
  const toggleSound = useAssessmentStore((state) => state.toggleSound);
  const locale = useAssessmentStore((state) => state.locale);

  const handleStart = () => {
    if (!accepted) return;
    sessionStorage.setItem('disclaimerAccepted', 'true');
    audioManager.setEnabled(isSoundEnabled);
    audioManager.playSound('success');
    audioManager.narrate(
      locale === 'de' ? 'Willkommen bei Weetell' : locale === 'es' ? 'Bienvenido a Weetell' : locale === 'tr' ? 'Weetell\'e Hoş Geldiniz' : 'Welcome to Weetell',
      locale === 'en' ? 'en' : locale === 'de' ? 'de' : locale === 'es' ? 'es' : 'tr'
    );
    router.push('/start');
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Logo Area */}
        <div className="flex items-center justify-center relative w-full">
          <Image
            src="/assets/WEE_child_logo.svg"
            alt="Weetell"
            width={400}
            height={267}
            priority
          />
        </div>

        {/* Checkbox Area */}
        <div 
          data-testid="disclaimer-checkbox"
          className="flex items-start gap-4 mb-4 cursor-pointer w-full px-2"
          onClick={() => setAccepted(!accepted)}
        >
          <div className="pt-1 shrink-0">
            <div 
              data-testid="disclaimer-checkbox-indicator"
              className={`w-7 h-7 border-[3px] border-neutral-800 rounded-md flex items-center justify-center transition-colors ${accepted ? 'bg-white' : 'bg-white'}`}
            >
              {accepted && <Check size={20} className="text-neutral-800" strokeWidth={4} />}
            </div>
          </div>
          <p className="text-neutral-800 text-[15px] leading-relaxed font-medium">
            {locale === 'de' ? (
              <>
                Ich verstehe, dass dies ein<br />
                nicht diagnostisches Bildungswerkzeug ist.<br />
                <br />
                Kein Ersatz für<br />
                professionelle medizinische Beratung.
              </>
            ) : locale === 'es' ? (
              <>
                Entiendo que esta es una<br />
                herramienta educativa no diagnóstica.<br />
                <br />
                No sustituye el consejo<br />
                médico profesional.
              </>
            ) : locale === 'tr' ? (
              <>
                Bu eğitimsel bir araç olduğunu ve profesyonel tıbbi tavsiyenin yerine geçmediğini anlıyorum.
              </>
            ) : (
              <>
                I understand this is a<br />
                non-diagnostic educational tool.<br />
                
                Not a substitute for<br />
                professional medical advice.
              </>
            )}
          </p>
        </div>

        {/* Button */}
        <button
          data-testid="continue-button"
          disabled={!accepted}
          onClick={handleStart}
          className={`w-full max-w-[280px] py-4 rounded-full font-bold text-2xl transition-all ${
            accepted
              ? 'bg-[#ffcc00] text-[#0088cc] shadow-md hover:scale-[1.02] active:scale-95'
              : 'bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed'
          }`}
        >
          {locale === 'de' ? 'Weiter' : locale === 'es' ? 'Continuar' : locale === 'tr' ? 'Devam' : 'Continue'}
        </button>
      </motion.div>

    </div>
  );
}