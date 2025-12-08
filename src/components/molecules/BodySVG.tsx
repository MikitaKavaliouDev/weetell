'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface BodySVGProps {
  view: 'front' | 'back';
  ageGroup: 'baby' | 'child' | null;
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
}

// Improved body paths for a softer, more "illustration" feel
const BODY_PARTS = [
  // Head: Smoother circle/oval
  { id: 'head', d: 'M150 40 C 130 40 115 55 115 80 C 115 105 130 120 150 120 C 170 120 185 105 185 80 C 185 55 170 40 150 40 Z' },
  
  // Chest/Torso: Rounded rect
  { id: 'chest', d: 'M120 125 C 110 125 110 135 105 150 L 105 190 C 105 195 110 200 120 200 L 180 200 C 190 200 195 195 195 190 L 195 150 C 190 135 190 125 180 125 Z' },
  
  // Stomach/Lower Torso
  { id: 'stomach', d: 'M105 205 L 105 240 C 105 250 110 260 120 260 L 180 260 C 190 260 195 250 195 240 L 195 205 Z' },
  
  // Legs: Rounded with gap
  { id: 'legs', d: 'M120 265 L 115 350 C 115 360 125 365 135 360 L 145 280 L 155 280 L 165 360 C 175 365 185 360 185 350 L 180 265 Z' },
  
  // Arms: Relaxed at sides
  { id: 'arms', d: 'M100 130 C 90 130 80 135 70 160 L 60 200 C 60 210 70 215 80 210 L 95 180 L 100 150 Z  M200 130 C 210 130 220 135 230 160 L 240 200 C 240 210 230 215 220 210 L 205 180 L 200 150 Z' }
];

export default function BodySVG({ view, ageGroup, selectedPart, onPartClick }: BodySVGProps) {
  return (
    <svg viewBox="0 0 300 400" className="w-full h-full max-h-[60vh] drop-shadow-2xl overflow-visible">
      <defs>
        <filter id="glow-selected" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>

      {/* Base Body Shadow/Outline */}
      {/* <path d="..." fill="#f1f5f9" /> could go here for a full outline */}

      {BODY_PARTS.map((part) => {
        const isSelected = selectedPart === part.id;
        return (
          <motion.path
            key={part.id}
            d={part.d}
            id={part.id}
            onClick={() => onPartClick(part.id)}
            fill={isSelected ? 'var(--wee-blue)' : 'url(#bodyGradient)'}
            stroke={isSelected ? 'var(--wee-blue-dark)' : '#cbd5e1'}
            strokeWidth={isSelected ? '0' : '2'}
            whileHover={{ 
              scale: 1.05,
              fill: isSelected ? 'var(--wee-blue)' : 'var(--soft-blue)',
              stroke: 'var(--wee-blue)',
              cursor: 'pointer'
            }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300 ease-out origin-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                filter: isSelected ? 'drop-shadow(0px 10px 20px rgba(59, 130, 246, 0.4))' : 'none'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        );
      })}
    </svg>
  );
}
