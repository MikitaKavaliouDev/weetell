'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, Smartphone, Copy, Check } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export default function QRCodeModal({ isOpen, onClose, url }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  
  const currentUrl = url || typeof window !== 'undefined' ? window.location.href : 'https://weetell.app';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-wee-blue" />
                <h3 className="font-bold text-lg text-neutral-800">Open on Mobile</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center"
              >
                <X size={18} className="text-neutral-600" />
              </button>
            </div>

            <div className="flex justify-center py-4">
              <div className="p-4 bg-white rounded-2xl border-2 border-neutral-100">
                <QRCodeSVG 
                  value={currentUrl}
                  size={180}
                  level="M"
                  includeMargin={false}
                />
              </div>
            </div>

            <p className="text-center text-sm text-neutral-500 mb-4">
              Scan this QR code with your phone to continue on mobile
            </p>

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
            >
              {copied ? (
                <>
                  <Check size={18} className="text-green-600" />
                  <span className="text-green-700 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} className="text-neutral-600" />
                  <span className="text-neutral-700">Copy Link</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
