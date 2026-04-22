'use client';

import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

export default function ToggleSwitch({ isOn, onToggle, ariaLabel }: ToggleSwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      onClick={onToggle}
      className={`
        relative w-12 h-7 rounded-full transition-colors duration-200 outline-none focus:ring-2 focus:ring-wee-blue-dark focus:ring-offset-2
        ${isOn ? 'bg-wee-blue' : 'bg-neutral-200'}
      `}
    >
      <motion.div
        animate={{
          x: isOn ? 22 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
      />
    </button>
  );
}
