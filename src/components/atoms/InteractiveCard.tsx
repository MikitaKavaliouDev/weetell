'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface InteractiveCardProps {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
  className?: string;
}

export default function InteractiveCard({
  children,
  onClick,
  selected = false,
  className,
}: InteractiveCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: selected 
          ? '0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 8px 10px -6px rgba(59, 130, 246, 0.1)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        borderColor: selected ? 'var(--wee-blue)' : 'var(--light-grey)',
      }}
      className={clsx(
        "cursor-pointer rounded-3xl p-6 transition-all duration-300 border-2 bg-white relative overflow-hidden",
        className
      )}
    >
      {selected && (
         <motion.div 
            layoutId="selected-glow"
            className="absolute inset-0 bg-blue-50/50 pointer-events-none" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
         />
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
