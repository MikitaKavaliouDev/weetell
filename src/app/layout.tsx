import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weetell Digital Health",
  description: "A digital health symptom checker.",
};

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SubtitleOverlay from '@/components/molecules/SubtitleOverlay';
import SoundToggle from '@/components/molecules/SoundToggle';
import { DisclaimerGuard } from '@/components/DisclaimerGuard';
import { RefreshRedirect } from '@/components/RefreshRedirect';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Visual medical disclaimer conditionally rendered */}
       
        
        <NuqsAdapter><DisclaimerGuard><RefreshRedirect>{children}</RefreshRedirect></DisclaimerGuard></NuqsAdapter>
        
        {/* Foundational layout for deaf/hard-of-hearing text subtitle support */}
        <SubtitleOverlay />
        <SoundToggle />
      </body>
    </html>
  );
}
