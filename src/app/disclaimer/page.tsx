'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { audioManager } from '@/lib/audio';
import { ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';

export default function DisclaimerPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const locale = useAssessmentStore((state) => state.locale);
  const isSoundEnabled = useAssessmentStore((state) => state.isSoundEnabled);

  useEffect(() => {
    audioManager.playLanguageAudio('disclaimer_text', locale);
  }, [locale]);

  const handleBack = () => {
    audioManager.playSound('click');
    router.push('/');
  };

  const handleContinue = () => {
    if (!accepted) return;
    sessionStorage.setItem('disclaimerAccepted', 'true');
    audioManager.setEnabled(isSoundEnabled);
    audioManager.playSound('click');
    router.push('/checkup?step=age');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white relative px-6">
      <div className="w-full pt-6 pb-2">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={24} className="text-neutral-800" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        <div className="flex items-center justify-center relative w-full mb-6">
          <button type="button" onClick={handleBack} className="bg-transparent border-none p-0 cursor-pointer">
            <Image
              src="/assets/WEE_child_logo.svg"
              alt="Weetell"
              width={300}
              height={200}
              priority
            />
          </button>
        </div>

        <div
          className="flex items-start gap-4 mb-4 cursor-pointer w-full px-2"
          onClick={() => setAccepted(!accepted)}
        >
          <div className="pt-1 shrink-0">
            <div
              className={`w-7 h-7 border-[3px] border-neutral-800 rounded-md flex items-center justify-center transition-colors bg-white`}
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
                Bunun teşhis koymaya yönelik olmayan bir eğitim aracı olduğunu anlıyorum.<br />
                <br />
                Profesyonel tıbbi tavsiyenin yerine geçmez.
              </>
            ) : locale === 'fr' ? (
              <>
                Je comprends qu'il s'agit d'un<br />
                outil éducatif non diagnostique.<br />
                <br />
                Ne remplace pas un avis<br />
                médical professionnel.
              </>
            ) : (
              <>
                I understand this is a<br />
                non-diagnostic educational tool.<br />
                <br />
                Not a substitute for<br />
                professional medical advice.
              </>
            )}
          </p>
        </div>

        <button
          disabled={!accepted}
          onClick={handleContinue}
          className={`w-full max-w-[280px] py-4 rounded-full font-bold text-2xl transition-all ${
            accepted
              ? 'bg-wee-yellow text-wee-black shadow-md hover:scale-[1.02] active:scale-95'
              : 'bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed'
          }`}
        >
          {locale === 'de' ? 'Weiter' : locale === 'es' ? 'Continuar' : locale === 'tr' ? 'Devam' : locale === 'fr' ? 'Continuer' : 'Continue'}
        </button>
      </motion.div>
    </div>
  );
}
