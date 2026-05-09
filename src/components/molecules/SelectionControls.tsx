'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, CrossCircleIcon } from '@/components/atoms/ActionIcons';

interface SelectionControlsProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  bottomOffset?: string; // e.g. "bottom-32" or "bottom-12"
  iconSize?: number;
}

/**
 * SelectionControls component provides a standardized "Cancel" and "Confirm" action bar
 * for selection steps in the assessment flow.
 */
export const SelectionControls = ({
  isVisible,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm selection",
  cancelLabel = "Cancel selection",
  bottomOffset = "bottom-32",
  iconSize = 50
}: SelectionControlsProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className={`fixed ${bottomOffset} left-0 right-0 flex justify-center gap-12 z-[200] pb-4`}
        >
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCancel}
            className="w-auto h-auto rounded-full flex items-center justify-center "
            aria-label={cancelLabel}
          >
            <CrossCircleIcon size={iconSize} strokeWidth={2.5} />
          </motion.button>

          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onConfirm}
            className="w-auto h-auto  rounded-full flex items-center justify-center "
            aria-label={confirmLabel}
          >
            <CheckCircleIcon size={iconSize} strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectionControls;
