'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { audioManager } from '@/lib/audio';
import { Volume2, VolumeX, Check } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();
  const[accepted, setAccepted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const handleStart = () => {
    if (!accepted) return;
    audioManager.setEnabled(audioEnabled);
    audioManager.playSound('success');
    audioManager.narrate('Welcome to Weetell', 'en');
    router.push('/start');
  };

  const toggleAudio = (state: boolean) => {
    setAudioEnabled(state);
    audioManager.setEnabled(state);
    if (state) {
      audioManager.playSound('click');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Logo Area */}
        <div className="flex items-center justify-center mb-16 relative w-full">
          <h1 
            className="text-[100px] leading-none font-bold text-[#0088cc] tracking-tighter pr-12" 
            style={{ fontFamily: 'cursive, sans-serif', fontStyle: 'italic' }}
          >
            Wee
          </h1>
          <div className="absolute right-12 top-2">
            <div className="bg-[#ffcc00] text-white rounded-3xl px-4 py-1.5 text-2xl font-bold relative">
              child
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 left-2 w-4 h-4 bg-[#ffcc00] transform rotate-45 rounded-sm -z-10 translate-y-1 -translate-x-1"></div>
            </div>
          </div>
        </div>

        {/* Checkbox Area */}
        <div 
          className="flex items-start gap-4 mb-16 cursor-pointer w-full px-2"
          onClick={() => setAccepted(!accepted)}
        >
          <div className="pt-1 shrink-0">
            <div className={`w-7 h-7 border-[3px] border-neutral-800 rounded-md flex items-center justify-center transition-colors ${accepted ? 'bg-white' : 'bg-white'}`}>
              {accepted && <Check size={20} className="text-neutral-800" strokeWidth={4} />}
            </div>
          </div>
          <p className="text-neutral-800 text-[15px] leading-relaxed font-medium">
            I understand this is a<br />
            non-diagnostic educational tool.<br />
            <br />
            Not a substitute for<br />
            professional medical advice.
          </p>
        </div>

        {/* Button */}
        <button
          disabled={!accepted}
          onClick={handleStart}
          className={`w-full max-w-[280px] py-4 rounded-full font-bold text-2xl transition-all ${
            accepted
              ? 'bg-[#ffcc00] text-[#0088cc] shadow-md hover:scale-[1.02] active:scale-95'
              : 'bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </motion.div>

      {/* Audio Controls */}
      <div className="absolute bottom-10 left-10 flex gap-4">
        <button 
          onClick={() => toggleAudio(true)}
          className="transition-transform hover:scale-110"
        >
          <Volume2 
            size={32} 
            className={audioEnabled ? "text-[#0088cc]" : "text-neutral-300"} 
            strokeWidth={3}
          />
        </button>
        <button 
          onClick={() => toggleAudio(false)}
          className="transition-transform hover:scale-110"
        >
          <VolumeX 
            size={32} 
            className={!audioEnabled ? "text-[#ffcc00]" : "text-neutral-300"} 
            strokeWidth={3}
          />
        </button>
      </div>
    </div>
  );
}