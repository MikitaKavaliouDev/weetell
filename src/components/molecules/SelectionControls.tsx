'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, CrossCircleIcon } from '@/components/atoms/ActionIcons';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { useEffect } from 'react';

interface SelectionControlsProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  bottomOffset?: string; // e.g. "bottom-32" or "bottom-12"
  iconSize?: number;
  color?: string;
  delay?: number;
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
  iconSize = 50,
  color = "#FFC52F", // wee-yellow
  delay = 0.5
}: SelectionControlsProps) => {
  const setMenuOpen = useAssessmentStore((state) => state.setMenuOpen);

  useEffect(() => {
    if (isVisible) {
      // Automatically close settings menu when selection controls appear
      setMenuOpen(false);
    }
  }, [isVisible, setMenuOpen]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className={`fixed ${bottomOffset} left-0 right-0 flex justify-center gap-12 z-[200] pb-4 pointer-events-none`}
        >
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCancel}
            className="w-auto h-auto rounded-full flex items-center justify-center pointer-events-auto "
            aria-label={cancelLabel}
          >
            <CrossCircleIcon size={iconSize} strokeWidth={1.5} color={color} />
          </motion.button>

          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onConfirm}
            className="w-auto h-auto rounded-full flex items-center justify-center pointer-events-auto "
            aria-label={confirmLabel}
          >
            <CheckCircleIcon size={iconSize} strokeWidth={1.5} color={color} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectionControls;
