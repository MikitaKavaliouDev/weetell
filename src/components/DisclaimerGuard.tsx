'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface DisclaimerGuardProps {
  children: React.ReactNode;
}

export function DisclaimerGuard({ children }: DisclaimerGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const disclaimerAccepted = sessionStorage.getItem('disclaimerAccepted');
    
    if (pathname !== '/' && disclaimerAccepted !== 'true') {
      router.replace('/');
    }
  }, [pathname, router]);

  return <>{children}</>;
}
