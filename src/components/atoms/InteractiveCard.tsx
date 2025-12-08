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
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: selected ? '0 0 0 4px var(--wee-blue)' : '0 0 0 0px transparent',
        borderColor: selected ? 'var(--wee-blue)' : 'transparent',
      }}
      className={clsx(
        "cursor-pointer rounded-2xl p-6 transition-colors shadow-sm border-2 border-transparent",
        "bg-white dark:bg-neutral-900",
        selected ? 'ring-wee-blue' : 'hover:border-slate-200 dark:hover:border-slate-800',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
