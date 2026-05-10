"use client";

import { useQueryState } from "nuqs";
import { Suspense, useState } from "react";
import AgeSelection from "@/components/organisms/AgeSelection";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppHeader from "@/components/molecules/AppHeader";
import QRCodeModal from "@/components/molecules/QRCodeModal";

// Step components
import BodyMapSelection from "@/components/organisms/BodyMapSelection";
import DetailedBodySelection from "@/components/organisms/DetailedBodySelection";
import SeveritySelection from "@/components/organisms/SeveritySelection";
import { useAssessmentStore } from "@/stores/useAssessmentStore";
import { audioManager } from "@/lib/audio";
const STEPS = {
  AGE: "age",
  BODY: "body",
  DETAILED: "detailed",
  SEVERITY: "severity",
  RESULTS: "results",
};

function CheckupWizard() {
  const [step, setStep] = useQueryState("step", { defaultValue: STEPS.AGE });
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);
  const locale = useAssessmentStore((state) => state.locale);

  // Stop narration is handled by individual step components in their useEffect cleanup

  const handleRestart = () => {
    audioManager.stopNarration();
    resetAssessment();
    router.push("/start");
  };

  const handleBack = () => {
    audioManager.stopNarration();
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
      case STEPS.RESULTS:
        setStep(STEPS.SEVERITY);
        break;
      case STEPS.AGE:
      default:
        router.push("/");
        break;
    }
  };

  useEffect(() => {
    if (step === STEPS.RESULTS) {
      window.location.href = 'https://www.arzt-auskunft.de/?form=fs1';
    }
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case STEPS.AGE:
        return <AgeSelection onNext={() => setStep(STEPS.BODY)} />;
      case STEPS.BODY:
        return <BodyMapSelection onNext={() => setStep(STEPS.DETAILED)} />;
      case STEPS.DETAILED:
        return <DetailedBodySelection onNext={() => setStep(STEPS.SEVERITY)} />;
      case STEPS.SEVERITY:
        return <SeveritySelection onNext={() => setStep(STEPS.RESULTS)} />;
      case STEPS.RESULTS:
        return (
          <div className="flex justify-center p-10">
            {locale === "de"
              ? "Weiterleitung zu den Ergebnissen..."
              : locale === "es"
                ? "Llevándote a los resultados..."
                : locale === "tr"
                  ? "Sonuçlara yönlendiriyorum..."
                  : "Taking you to results..."}
          </div>
        );
      default:
        // Fallback or 404
        return (
          <div className="text-center p-10">
            <h2 className="text-xl">
              {locale === "de"
                ? "Schritt noch nicht implementiert: "
                : locale === "es"
                  ? "Paso aún no implementado: "
                  : locale === "tr"
                    ? "Adım henüz uygulanmadı: "
                    : "Step not implemented yet: "}
              {step}
            </h2>
            <button
              onClick={() => setStep(STEPS.AGE)}
              className="mt-4 text-blue-500 underline"
            >
              {locale === "de"
                ? "Neustart"
                : locale === "es"
                  ? "Reiniciar"
                  : locale === "tr"
                    ? "Yeniden Başla"
                    : "Restart"}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <AppHeader
        onBack={handleBack}
        onHome={handleRestart}
        onMobile={() => setShowQR(true)}
      />

      <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />

      <div className="w-full max-w-2xl mx-auto pt-20 flex-1  flex-col p-6 pb-10 flex items-center justify-center">
        {renderStep()}
      </div>
    </div>
  );
}

export default function CheckupPage() {
  const locale = useAssessmentStore((state) => state.locale);
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          {locale === "de"
            ? "Wird geladen..."
            : locale === "es"
              ? "Cargando..."
              : locale === "tr"
                ? "Yükleniyor..."
                : "Loading..."}
        </div>
      }
    >
      <CheckupWizard />
    </Suspense>
  );
}
