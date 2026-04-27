'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

interface DisclaimerGuardProps {
  children: React.ReactNode;
}

export function DisclaimerGuard({ children }: DisclaimerGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);

  useEffect(() => {
    // Clear state and force start from beginning on refresh
    sessionStorage.removeItem('disclaimerAccepted');
    resetAssessment();
    
    // If we are not at the index, force redirect
    if (window.location.pathname !== '/') {
      router.replace('/');
    }
  }, [resetAssessment, router]); // Runs once on mount (stable deps)

  useEffect(() => {
    const disclaimerAccepted = sessionStorage.getItem('disclaimerAccepted');
    
    if (pathname !== '/' && disclaimerAccepted !== 'true') {
      router.replace('/');
    }
  }, [pathname, router]);

  return <>{children}</>;
}
