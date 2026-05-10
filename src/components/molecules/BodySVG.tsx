'use client';

import { motion } from 'framer-motion';

interface BodySVGProps {
  view: 'front' | 'back';
  ageGroup: 'baby' | 'child' | 'teen' | null;
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
}

// A continuous silhouette for the "Cute Child" look (Gold outline, white fill)
// Coordinates are approximated to match a cartoon toddler/child
const SILHOUETTE_PATH = `
  M 150 40 
  C 185 40 215 65 215 100 
  C 215 105 220 105 225 105 
  C 235 105 235 125 225 125 
  C 220 125 215 125 215 130 
  C 215 150 190 160 180 162
  Q 210 170 230 200
  Q 250 230 245 250
  Q 240 260 225 250
  Q 215 240 210 210
  L 205 210
  L 205 280
  L 220 360
  Q 225 380 195 380
  L 180 290
  L 120 290
  L 105 380
  Q 75 380 80 360
  L 95 280
  L 95 210
  L 90 210
  Q 85 240 75 250
  Q 60 260 55 250
  Q 50 230 70 200
  Q 90 170 120 162
  C 110 160 85 150 85 130 
  C 85 125 80 125 75 125 
  C 65 125 65 105 75 105 
  C 80 105 85 105 85 100 
  C 85 65 115 40 150 40 
  Z
`;

// simplified zones that lay over the body for clicking

const FRONT_ZONES = [
  { id: 'head', d: 'M150 40 C 90 40 80 100 85 130 C 85 160 215 160 215 130 C 220 100 210 40 150 40 Z' },
  { id: 'chest', d: 'M120 162 L 180 162 L 180 220 L 120 220 Z' },
  { id: 'stomach', d: 'M120 220 L 180 220 L 180 280 L 120 280 Z' },
  { id: 'arms', d: 'M120 162 Q 90 170 70 200 Q 50 230 55 250 L 75 250 Q 85 240 95 210 L 95 210 L 120 190 Z M180 162 Q 210 170 230 200 Q 250 230 245 250 L 225 250 Q 215 240 205 210 L 205 210 L 180 190 Z' },
  { id: 'legs', d: 'M120 280 L 180 280 L 180 290 L 195 380 L 225 380 L 220 360 L 205 280 L 205 280 L 95 280 L 95 280 L 80 360 L 75 380 L 105 380 L 120 290 Z' },
  { id: 'skin', d: 'M120 162 L 180 162 L 180 280 L 120 280 Z' },
];

const BACK_ZONES = [
  { id: 'head', d: 'M150 40 C 90 40 80 100 85 130 C 85 160 215 160 215 130 C 220 100 210 40 150 40 Z' },
  { id: 'back', d: 'M120 162 L 180 162 L 180 280 L 120 280 Z' },
  { id: 'arms', d: 'M120 162 Q 90 170 70 200 Q 50 230 55 250 L 75 250 Q 85 240 95 210 L 95 210 L 120 190 Z M180 162 Q 210 170 230 200 Q 250 230 245 250 L 225 250 Q 215 240 205 210 L 205 210 L 180 190 Z' },
  { id: 'legs', d: 'M120 280 L 180 280 L 180 290 L 195 380 L 225 380 L 220 360 L 205 280 L 205 280 L 95 280 L 95 280 L 80 360 L 75 380 L 105 380 L 120 290 Z' },
  { id: 'skin', d: 'M85 130 C 85 100 115 40 150 40 C 185 40 215 100 215 130 C 215 160 85 160 85 130 Z M120 162 L 180 162 L 180 280 L 120 280 Z' },
];

export default function BodySVG({ view, ageGroup, selectedPart, onPartClick }: BodySVGProps) {
  const zones = view === 'back' ? BACK_ZONES : FRONT_ZONES;
  
  return (
    <svg viewBox="0 0 300 420" className="w-[80%] max-h-[60vh] drop-shadow-sm overflow-visible mx-auto">
      <defs>
         <filter id="texture-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
            <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="composite" />
            </feMerge>
        </filter>
        <filter id="rough-edge">
             <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
             <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>

      {/* 1. The Main Clean Silhouette (Visual) - Dark Charcoal with Rough Edges */}
      <motion.path
        d={SILHOUETTE_PATH}
        fill="none"
        stroke="#4a4a40" // Dark charcoal/olive tone
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#rough-edge)"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      
      {/* Texture Overlay Pass */}
      <motion.path
        d={SILHOUETTE_PATH}
        fill="none"
        stroke="#4a4a40"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#texture-noise)"
        className="opacity-50"
      />

      {/* 2. Interactive Zones (Invisible but clickable) */}
      {zones.map((zone) => {
        const isSelected = selectedPart === zone.id;
        return (
          <motion.path
            key={zone.id}
            d={zone.d}
            onClick={() => onPartClick(zone.id)}
            fill="#3b82f6"
            stroke="none"
            initial={false}
            animate={{ 
              opacity: isSelected ? 0.3 : 0, 
            }}
            whileHover={{ 
              opacity: 0.2,
              cursor: 'pointer'
            }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </svg>
  );
}
