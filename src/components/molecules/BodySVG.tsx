'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface BodySVGProps {
  view: 'front' | 'back';
  ageGroup: 'baby' | 'child' | null;
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
}

const BODY_PARTS = [
  { id: 'head', d: 'M130 50 A 30 30 0 1 1 170 50 A 30 30 0 1 1 130 50' },
  { id: 'chest', d: 'M115 85 C 100 85 90 90 90 110 L 90 150 L 210 150 L 210 110 C 210 90 200 85 185 85 Z' },
  { id: 'stomach', d: 'M90 155 L 90 200 L 210 200 L 210 155 Z' },
  { id: 'legs', d: 'M90 205 L 90 350 L 140 350 L 140 230 L 160 230 L 160 350 L 210 350 L 210 205 Z' },
  { id: 'arms', d: 'M70 110 L 40 160 L 60 170 L 85 120 Z M230 110 L 260 160 L 240 170 L 215 120 Z' } // Split path for arms
];

export default function BodySVG({ view, ageGroup, selectedPart, onPartClick }: BodySVGProps) {
  // Simple "programmer art" body implementation
  // In a real app, these paths would be detailed vector assets per view/age.
  
  return (
    <svg viewBox="0 0 300 400" className="w-full h-full max-h-[60vh] drop-shadow-xl">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {BODY_PARTS.map((part) => {
        const isSelected = selectedPart === part.id;
        return (
          <motion.path
            key={part.id}
            d={part.d}
            id={part.id}
            onClick={() => onPartClick(part.id)}
            fill={isSelected ? '#3b82f6' : '#ffffff'}
            stroke={isSelected ? '#2563eb' : '#e5e7eb'}
            strokeWidth="3"
            whileHover={{ 
              fill: isSelected ? '#3b82f6' : '#dbeafe', 
              scale: 1.02,
              filter: "url(#glow)" 
            }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ transformOrigin: 'center' }}
          />
        );
      })}
    </svg>
  );
}
