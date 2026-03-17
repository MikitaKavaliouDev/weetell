'use client';

import { useQueryState } from 'nuqs';
import { Suspense, useState } from 'react';
import AgeSelection from '@/components/organisms/AgeSelection';
import WeetellLogo from '@/components/molecules/WeetellLogo';
import { Menu, ArrowLeft, Home, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SettingsMenu from '@/components/molecules/SettingsMenu';
import QRCodeModal from '@/components/molecules/QRCodeModal';

// Step components
import BodyMapSelection from '@/components/organisms/BodyMapSelection';
import SymptomSelection from '@/components/organisms/SymptomSelection';
import SeveritySelection from '@/components/organisms/SeveritySelection';
import ActionDecision from '@/components/organisms/ActionDecision';
import UrgencySelection from '@/components/organisms/UrgencySelection';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

const STEPS = {
  AGE: 'age',
  BODY: 'body',
  SYMPTOM: 'symptom',
  SEVERITY: 'severity',
  ACTION: 'action',
  URGENCY: 'urgency',
  RESULTS: 'results',
};

function CheckupWizard() {
  const [step, setStep] = useQueryState('step', { defaultValue: STEPS.AGE });
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();
  const actionDecision = useAssessmentStore((state) => state.actionDecision);
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);

  const handleRestart = () => {
    resetAssessment();
    router.push('/start');
  };

  useEffect(() => {
    if (step === STEPS.RESULTS) {
      router.push('/results');
    }
  }, [step, router]);

  const handleActionNext = () => {
    if (actionDecision === 'wait') {
      router.push('/results/home-care');
    } else {
      setStep(STEPS.URGENCY);
    }
  };

  const renderStep = () => {
    switch (step) {
      case STEPS.AGE:
        return <AgeSelection onNext={() => setStep(STEPS.BODY)} />;
      case STEPS.BODY:
        return <BodyMapSelection onNext={() => setStep(STEPS.SYMPTOM)} />;
      case STEPS.SYMPTOM:
        return <SymptomSelection onNext={() => setStep(STEPS.SEVERITY)} />;
      case STEPS.SEVERITY:
        return <SeveritySelection onNext={() => setStep(STEPS.ACTION)} />;
      case STEPS.ACTION:
        return <ActionDecision onNext={handleActionNext} />;
      case STEPS.URGENCY:
        return <UrgencySelection onNext={() => setStep(STEPS.RESULTS)} />;
      case STEPS.RESULTS:
        return <div className="flex justify-center p-10">Taking you to results...</div>;
      default:
        // Fallback or 404
        return (
          <div className="text-center p-10">
            <h2 className="text-xl">Step not implemented yet: {step}</h2>
            <button onClick={() => setStep(STEPS.AGE)} className="mt-4 text-blue-500 underline">Restart</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
       {/* Header */}
       <div className="flex justify-between items-center px-6 pt-8 pb-4">
          <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="text-neutral-400 hover:text-neutral-600 transition-colors">
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
              <button className="text-yellow-500 hover:text-yellow-600 transition-colors">
                  <Menu size={32} strokeWidth={3} />
              </button>
          </div>
        </div>

        <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />

       <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center p-6">
         {renderStep()}
       </div>
    </div>
  );
}

export default function CheckupPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <CheckupWizard />
    </Suspense>
  );
}
