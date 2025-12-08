'use client';

import { useQueryState } from 'nuqs';
import { Suspense } from 'react';
import AgeSelection from '@/components/organisms/AgeSelection';

// Step components (will add more as implemented)
import BodyMapSelection from '@/components/organisms/BodyMapSelection';
import SymptomSelection from '@/components/organisms/SymptomSelection';
import SeveritySelection from '@/components/organisms/SeveritySelection';

const STEPS = {
  AGE: 'age',
  BODY: 'body',
  SYMPTOM: 'symptom',
  SEVERITY: 'severity',
  RESULTS: 'results',
};

function CheckupWizard() {
  const [step, setStep] = useQueryState('step', { defaultValue: STEPS.AGE });

  const renderStep = () => {
    switch (step) {
      case STEPS.AGE:
        return <AgeSelection onNext={() => setStep(STEPS.BODY)} />;
      case STEPS.SYMPTOM:
        return <SymptomSelection onNext={() => setStep(STEPS.SEVERITY)} />;
      case STEPS.SEVERITY:
        return <SeveritySelection onNext={() => setStep(STEPS.RESULTS)} />;
      case STEPS.RESULTS:
        // Redirect to results page
        if (typeof window !== 'undefined') {
             window.location.href = '/results'; 
             // using window.location for hard nav or router.push in useEffect
        }
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
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 p-6 flex flex-col pt-16">
       <div className="w-full max-w-2xl mx-auto h-full flex-1 flex flex-col justify-center">
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
