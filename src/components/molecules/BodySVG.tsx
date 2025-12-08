'use client';

import { motion } from 'framer-motion';

interface BodySVGProps {
  view: 'front' | 'back';
  ageGroup: 'baby' | 'child' | null;
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
const ZONES = [
  { id: 'head', d: 'M150 40 C 90 40 80 100 85 130 C 85 160 215 160 215 130 C 220 100 210 40 150 40 Z' },
  { id: 'chest', d: 'M120 162 L 180 162 L 180 220 L 120 220 Z' },
  { id: 'stomach', d: 'M120 220 L 180 220 L 180 280 L 120 280 Z' },
  { id: 'arms', d: 'M120 162 Q 90 170 70 200 Q 50 230 55 250 L 75 250 Q 85 240 95 210 L 95 210 L 120 190 Z M180 162 Q 210 170 230 200 Q 250 230 245 250 L 225 250 Q 215 240 205 210 L 205 210 L 180 190 Z' },
  { id: 'legs', d: 'M120 280 L 180 280 L 180 290 L 195 380 L 225 380 L 220 360 L 205 280 L 205 280 L 95 280 L 95 280 L 80 360 L 75 380 L 105 380 L 120 290 Z' }
];

export default function BodySVG({ view, ageGroup, selectedPart, onPartClick }: BodySVGProps) {
  // We ignore 'view' and 'ageGroup' for the visual match as per screenshot (which shows one generic child)
  // If needed, we could swap paths based on them later.
  
  return (
    <svg viewBox="0 0 300 420" className="w-full h-full max-h-[70vh] drop-shadow-sm overflow-visible">
      <defs>
        <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. The Main Clean Silhouette (Visual) */}
      <motion.path
        d={SILHOUETTE_PATH}
        fill="#ffffff"
        stroke="#eab308" // Tailwind yellow-500
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* 2. Interactive Zones (Invisible but clickable) */}
      {ZONES.map((zone) => {
        const isSelected = selectedPart === zone.id;
        return (
          <motion.path
            key={zone.id}
            d={zone.d}
            onClick={() => onPartClick(zone.id)}
            fill={isSelected ? '#3b82f6' : 'transparent'} // Blue highlight when selected, otherwise transparent
            stroke="none"
            initial={false}
            animate={{ 
              opacity: isSelected ? 0.3 : 0, // Visible overlap when selected
            }}
            whileHover={{ 
              opacity: 0.2,
              fill: '#3b82f6',
              cursor: 'pointer'
            }}
            transition={{ duration: 0.2 }}
          />
        );
      })}
    </svg>
  );
}
