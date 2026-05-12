'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function RefreshRedirect({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Detect fresh page loads (hard refresh or direct URL navigation)
    // so they always land on the language selection page.
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const navType = (navEntries[0] as PerformanceNavigationTiming).type;
      // 'navigate' = new page load, 'reload' = refresh
      // 'back_forward' = history navigation — allow those
      if (navType !== 'back_forward' && pathname !== '/') {
        router.replace('/');
      }
    }
    // Intentionally empty deps — run only on mount (fresh page load)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
