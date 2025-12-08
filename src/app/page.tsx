'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Logo from '@/components/atoms/Logo';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/start');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.1, 1],
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
          ease: "backOut",
          times: [0, 0.6, 1]
        }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <Logo className="w-48 h-auto text-wee-blue" />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            className="absolute -top-12 -right-12 bg-light-blue text-wee-blue px-4 py-2 rounded-2xl rounded-bl-none shadow-sm"
          >
            <span className="font-bold text-lg">Weetell?</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
