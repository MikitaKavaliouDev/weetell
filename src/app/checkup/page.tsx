'use client';

import { useQueryState } from 'nuqs';
import { Suspense, useState } from 'react';
import AgeSelection from '@/components/organisms/AgeSelection';
import WeetellLogo from '@/components/molecules/WeetellLogo';
import { ArrowLeft, Home, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SettingsMenu from '@/components/molecules/SettingsMenu';
import QRCodeModal from '@/components/molecules/QRCodeModal';

// Step components
import BodyMapSelection from '@/components/organisms/BodyMapSelection';
import DetailedBodySelection from '@/components/organisms/DetailedBodySelection';
import SeveritySelection from '@/components/organisms/SeveritySelection';
import UrgencySelection from '@/components/organisms/UrgencySelection';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

const STEPS = {
  AGE: 'age',
  BODY: 'body',
  DETAILED: 'detailed',
  SEVERITY: 'severity',
  URGENCY: 'urgency',
  RESULTS: 'results',
};

function CheckupWizard() {
  const [step, setStep] = useQueryState('step', { defaultValue: STEPS.AGE });
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);
  const locale = useAssessmentStore((state) => state.locale);

  const handleRestart = () => {
    resetAssessment();
    router.push('/start');
  };

  const handleBack = () => {
    switch (step) {
      case STEPS.BODY:
        setStep(STEPS.AGE);
        break;
      case STEPS.DETAILED:
        setStep(STEPS.BODY);
        break;
      case STEPS.SEVERITY:
        setStep(STEPS.DETAILED);
        break;
      case STEPS.URGENCY:
        setStep(STEPS.SEVERITY);
        break;
      case STEPS.RESULTS:
        setStep(STEPS.URGENCY);
        break;
      case STEPS.AGE:
      default:
        router.push('/start');
        break;
    }
  };

  useEffect(() => {
    if (step === STEPS.RESULTS) {
      router.push('/results');
    }
  }, [step, router]);

  const renderStep = () => {
    switch (step) {
      case STEPS.AGE:
        return <AgeSelection onNext={() => setStep(STEPS.BODY)} />;
      case STEPS.BODY:
        return <BodyMapSelection onNext={() => setStep(STEPS.DETAILED)} />;
      case STEPS.DETAILED:
        return <DetailedBodySelection onNext={() => setStep(STEPS.SEVERITY)} />;
      case STEPS.SEVERITY:
        return <SeveritySelection onNext={() => setStep(STEPS.URGENCY)} />;
      case STEPS.URGENCY:
        return <UrgencySelection onNext={() => setStep(STEPS.RESULTS)} />;
      case STEPS.RESULTS:
        return <div className="flex justify-center p-10">{locale === 'de' ? 'Weiterleitung zu den Ergebnissen...' : locale === 'es' ? 'Llevándote a los resultados...' : locale === 'tr' ? 'Sonuçlara yönlendiriyorum...' : 'Taking you to results...'}</div>;
      default:
        // Fallback or 404
        return (
          <div className="text-center p-10">
            <h2 className="text-xl">{locale === 'de' ? 'Schritt noch nicht implementiert: ' : locale === 'es' ? 'Paso aún no implementado: ' : locale === 'tr' ? 'Adım henüz uygulanmadı: ' : 'Step not implemented yet: '}{step}</h2>
            <button onClick={() => setStep(STEPS.AGE)} className="mt-4 text-blue-500 underline">{locale === 'de' ? 'Neustart' : locale === 'es' ? 'Reiniciar' : locale === 'tr' ? 'Yeniden Başla' : 'Restart'}</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
       {/* Header */}
       <div className="flex justify-between items-center px-6 pt-8 pb-4 z-10">
          <div className="flex items-center gap-4">
              <button onClick={handleBack} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                  <ArrowLeft size={32} strokeWidth={2.5} />
              </button>
              <WeetellLogo />
              <button onClick={handleRestart} className="text-neutral-400 hover:text-neutral-600 transition-colors" title="Restart">
                  <Home size={28} strokeWidth={2.5} />
              </button>
          </div>
          <div className="flex items-center gap-2">
              <button onClick={() => setShowQR(true)} className="text-neutral-400 hover:text-neutral-600 transition-colors" title="Open on Mobile">
                  <Smartphone size={28} strokeWidth={2.5} />
              </button>
              <SettingsMenu />
             
          </div>
        </div>

        <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />

       <div className="w-full max-w-2xl mx-auto pt-[50px] flex-1 flex flex-col p-6 relative">
         {renderStep()}
       </div>
    </div>
  );
}

export default function CheckupPage() {
  const locale = useAssessmentStore((state) => state.locale);
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">{locale === 'de' ? 'Wird geladen...' : locale === 'es' ? 'Cargando...' : locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}</div>}>
      <CheckupWizard />
    </Suspense>
  );
}
