'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PUBLIC_ROUTES = ['/', '/disclaimer'];

interface DisclaimerGuardProps {
  children: React.ReactNode;
}

export function DisclaimerGuard({ children }: DisclaimerGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const disclaimerAccepted = sessionStorage.getItem('disclaimerAccepted');

    if (!PUBLIC_ROUTES.includes(pathname) && disclaimerAccepted !== 'true') {
      router.replace('/');
    } else {
      setIsInitialized(true);
    }
  }, [pathname, router]);

  if (!isInitialized && !PUBLIC_ROUTES.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
