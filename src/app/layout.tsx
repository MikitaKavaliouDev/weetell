import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weetell Digital Health",
  description: "A digital health symptom checker.",
};

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SubtitleOverlay from '@/components/molecules/SubtitleOverlay';
import DisclaimerBanner from '@/components/molecules/DisclaimerBanner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Visual medical disclaimer conditionally rendered */}
        <DisclaimerBanner />
        
        <NuqsAdapter>{children}</NuqsAdapter>
        
        {/* Foundational layout for deaf/hard-of-hearing text subtitle support */}
        <SubtitleOverlay />
      </body>
    </html>
  );
}
