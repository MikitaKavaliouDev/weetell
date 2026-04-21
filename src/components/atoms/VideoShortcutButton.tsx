'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface VideoShortcutButtonProps {
  onClick: () => void;
  className?: string;
}

export default function VideoShortcutButton({ onClick, className }: VideoShortcutButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
    >
      <Image
        src="/assets/Play_film_button.svg"
        alt="Watch video"
        width={100}
        height={100}
        className="object-contain"
      />
    </motion.button>
  );
}