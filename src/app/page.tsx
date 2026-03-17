'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/start');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
        className="relative z-10 flex items-center"
      >
        {/* Large "Wee" Text - Brand Blue */}
        <h1 className="text-[120px] leading-none font-bold text-wee-blue tracking-tighter drop-shadow-sm">
          Wee
        </h1>
      </motion.div>
    </div>
  );
}
