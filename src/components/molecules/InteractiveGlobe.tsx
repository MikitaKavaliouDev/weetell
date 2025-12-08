'use client';

import { motion } from 'framer-motion';

export default function InteractiveGlobe() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <motion.div
        className="relative w-full h-full rounded-full bg-light-blue overflow-hidden shadow-inner"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Globe Grid Lines (Simplified) */}
        <svg viewBox="0 0 100 100" className="opacity-50 text-wee-blue">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M50 2 A 48 48 0 0 1 50 98" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M2 50 H 98" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M10 30 H 90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M10 70 H 90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {/* Continents (Abstract) */}
          <motion.path
            d="M30 30 Q 50 10 70 30 T 90 50 T 70 70 T 30 70 T 10 50 T 30 30"
            fill="currentColor"
            animate={{
              x: [-20, 20, -20],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear"
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
