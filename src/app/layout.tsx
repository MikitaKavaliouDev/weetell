import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weetell Digital Health",
  description: "A digital health symptom checker.",
};

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { AlertCircle } from 'lucide-react';
import SubtitleOverlay from '@/components/molecules/SubtitleOverlay';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Visual medical disclaimer present on all screens per FR1 and Compliance */}
        <div className="bg-amber-100 text-amber-800 px-4 py-2 text-xs flex items-center justify-center text-center font-medium z-50 relative">
          <AlertCircle size={16} className="mr-2 inline-block shrink-0" />
          <span>Non-diagnostic educational tool. Not a substitute for professional medical advice.</span>
        </div>
        
        <NuqsAdapter>{children}</NuqsAdapter>
        
        {/* Foundational layout for deaf/hard-of-hearing text subtitle support */}
        <SubtitleOverlay />
      </body>
    </html>
  );
}
