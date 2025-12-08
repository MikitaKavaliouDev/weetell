'use client';

import { motion } from 'framer-motion';

export default function FeverChildSVG() {
  return (
    <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-sm overflow-visible">
      <defs>
         <filter id="fever-texture-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
            <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="composite" />
            </feMerge>
        </filter>
        <filter id="fever-rough-edge">
             <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
             <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
        <filter id="red-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      {/* Head Outline */}
      <motion.path
        d="M 60 40 
           C 40 40 20 60 20 100 
           C 20 140 40 160 60 170
           C 80 180 120 180 140 170
           C 160 160 180 140 180 100
           C 180 60 160 40 140 40
           C 120 20 80 20 60 40 Z"
        fill="none"
        stroke="#4a4a40"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#fever-rough-edge)"
      />

       {/* Ears */}
       <motion.path
        d="M 20 100 C 10 90 0 100 0 110 C 0 125 10 135 20 125"
        fill="none"
        stroke="#4a4a40"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#fever-rough-edge)"
      />
      <motion.path
        d="M 180 100 C 190 90 200 100 200 110 C 200 125 190 135 180 125"
        fill="none"
        stroke="#4a4a40"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#fever-rough-edge)"
      />

      {/* Shoulders / Torso */}
      <motion.path
        d="M 60 170 
           C 60 170 40 190 30 200
           C 20 210 20 250 20 250"
        fill="none"
        stroke="#4a4a40"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#fever-rough-edge)"
      />
      <motion.path
         d="M 140 170 
           C 140 170 160 190 170 200
           C 180 210 180 250 180 250"
        fill="none"
        stroke="#4a4a40"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#fever-rough-edge)"
      />
      
      {/* Arms hints */}
      <motion.path
         d="M 50 250 L 50 210"
         fill="none"
         stroke="#4a4a40"
         strokeWidth="4"
         strokeLinecap="round"
         filter="url(#fever-rough-edge)"
         strokeDasharray="1 5"
      />
       <motion.path
         d="M 150 250 L 150 210"
         fill="none"
         stroke="#4a4a40"
         strokeWidth="4"
         strokeLinecap="round"
         filter="url(#fever-rough-edge)"
         strokeDasharray="1 5"
      />


      {/* Fever/Red Forehead Patch */}
      <motion.path
        d="M 50 70 
           Q 100 50 150 70
           Q 150 90 100 95
           Q 50 90 50 70 Z"
        fill="#ef4444" 
        fillOpacity="0.6"
        stroke="none"
        filter="url(#fever-texture-noise)"
      />
      {/* Hair strands over forehead */}
      <motion.path
        d="M 60 60 Q 70 80 80 60
           M 90 60 Q 100 80 110 60
           M 120 60 Q 130 80 140 60"
        fill="none"
        stroke="#4a4a40"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#fever-rough-edge)"
      />

      {/* Face Features */}
      {/* Eyebrows (Sad/Worried) */}
      <path d="M 60 110 Q 70 100 80 110" stroke="#4a4a40" strokeWidth="4" fill="none" strokeLinecap="round" filter="url(#fever-rough-edge)" />
      <path d="M 120 110 Q 130 100 140 110" stroke="#4a4a40" strokeWidth="4" fill="none" strokeLinecap="round" filter="url(#fever-rough-edge)" />

      {/* Eyes */}
      <circle cx="70" cy="125" r="4" fill="#4a4a40" filter="url(#fever-rough-edge)" />
      <circle cx="130" cy="125" r="4" fill="#4a4a40" filter="url(#fever-rough-edge)" />

      {/* Nose */}
      <path d="M 95 135 Q 100 140 105 135" stroke="#4a4a40" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#fever-rough-edge)" />

      {/* Mouth (Sad) */}
      <path d="M 85 155 Q 100 145 115 155" stroke="#4a4a40" strokeWidth="4" fill="none" strokeLinecap="round" filter="url(#fever-rough-edge)" />

    </svg>
  );
}
