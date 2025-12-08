'use client';

import { motion } from 'framer-motion';

export default function InteractiveGlobe() {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      <motion.div
        className="relative w-full h-full rounded-full shadow-2xl bg-gradient-to-tr from-blue-600 via-blue-400 to-cyan-300 overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl transform -translate-y-4" />
        
        {/* Globe Grid Lines */}
        <div className="absolute inset-0 opacity-20 text-white">
           <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
             <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.5" fill="none" />
             {/* Longitude Lines */}
             <path d="M50 1 Q 75 50 50 99" fill="none" stroke="currentColor" strokeWidth="0.2" />
             <path d="M50 1 Q 25 50 50 99" fill="none" stroke="currentColor" strokeWidth="0.2" />
             <path d="M50 1 Q 90 50 50 99" fill="none" stroke="currentColor" strokeWidth="0.2" />
             <path d="M50 1 Q 10 50 50 99" fill="none" stroke="currentColor" strokeWidth="0.2" />
             
             {/* Latitude Lines */}
             <path d="M1 50 H 99" fill="none" stroke="currentColor" strokeWidth="0.2" />
             <path d="M5 30 Q 50 35 95 30" fill="none" stroke="currentColor" strokeWidth="0.2" />
             <path d="M5 70 Q 50 75 95 70" fill="none" stroke="currentColor" strokeWidth="0.2" />
           </svg>
        </div>

        {/* Continents - Spinning */}
        <motion.div 
            className="absolute inset-0 opacity-80"
            animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 2px, transparent 2.5px)',
                backgroundSize: '24px 24px',
            }}
        />
        
        {/* Shine */}
        <div className="absolute top-4 left-4 w-1/2 h-1/2 bg-white/20 blur-2xl rounded-full" />
      </motion.div>
      
      {/* Shadow underneath */}
      <div className="absolute -bottom-8 w-40 h-8 bg-blue-900/20 blur-xl rounded-[100%]" />
    </div>
  );
}
