'use client';

import { motion } from 'framer-motion';

export default function ThermometerSVG() {
  return (
    <svg viewBox="0 0 100 100" className="w-[80px] h-[80px] drop-shadow-sm overflow-visible">
       <defs>
        <filter id="therm-rough-edge">
             <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
             <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </defs>
      <motion.g
        stroke="#4a4a40"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#therm-rough-edge)"
        transform="rotate(-45 50 50)" 
      >
        {/* Main Body */}
        <path d="M 40 20 L 40 70 A 10 10 0 0 0 60 70 L 60 20 A 10 10 0 0 0 40 20 Z" />
        {/* Inner Liquid Line */}
        <path d="M 50 25 L 50 65" strokeWidth="2" />
        {/* Bulb Fill */}
        <circle cx="50" cy="70" r="6" fill="#4a4a40" stroke="none" />
         {/* Markings */}
        <line x1="42" y1="30" x2="48" y2="30" strokeWidth="2" />
        <line x1="42" y1="40" x2="48" y2="40" strokeWidth="2" />
        <line x1="42" y1="50" x2="48" y2="50" strokeWidth="2" />
      </motion.g>
    </svg>
  );
}
