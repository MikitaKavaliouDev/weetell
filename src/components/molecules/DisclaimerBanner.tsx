'use client';

import { usePathname } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function DisclaimerBanner() {
  const pathname = usePathname();

  // Hide the disclaimer on the main landing page
  if (pathname === '/') {
    return null;
  }

  return (
    <div className="bg-amber-100 text-amber-800 px-4 py-2 text-xs flex items-center justify-center text-center font-medium z-50 relative">
      <AlertCircle size={16} className="mr-2 inline-block shrink-0" />
      <span>Non-diagnostic educational tool. Not a substitute for professional medical advice.</span>
    </div>
  );
}
