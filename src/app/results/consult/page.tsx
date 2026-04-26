'use client';

import { WeeHeaderLogo, MenuBurgerIcon, VideoPlayIcon } from '@/components/atoms/ServiceIllustrations';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

const TRANSLATIONS = {
  waitingRoom: {
    en: 'Waiting Room',
    de: 'Wartebereich',
    es: 'Sala de Espera',
    tr: 'Bekleme Odası',
    fr: 'Salle d\'attente',
  },
  doctor: {
    en: 'Doctor',
    de: 'Arzt',
    es: 'Médico',
    tr: 'Doktor',
    fr: 'Médecin',
  },
} as const;

export default function ConsultPage() {
  const router = useRouter();
  const locale = useAssessmentStore((state) => state.locale);

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
       {/* Header */}
       <header className="sticky top-0 bg-white/95 backdrop-blur-sm flex justify-between items-center py-4 mb-12 z-50">
           <div className="flex items-center gap-4">
               <button onClick={() => router.back()} className="p-2 text-neutral-500 hover:text-neutral-800 transition-colors">
                   <ArrowLeft size={32} strokeWidth={2.5} />
               </button>
               <WeeHeaderLogo className="w-24 h-12" />
           </div>
           <button className="p-2">
               <MenuBurgerIcon className="w-8 h-8" />
           </button>
       </header>

       {/* Main Content */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex-1 flex items-center justify-center gap-6"
       >
          {/* Chair/Waiting Button */}
          <button className="w-40 h-40 rounded-full border-[6px] border-[#E8A530] bg-[#FFF8E6] flex items-center justify-center p-6 hover:scale-105 transition-transform overflow-hidden">
            <div className="relative w-full h-full">
                <Image 
                    src="/chair.png" 
                    alt={TRANSLATIONS.waitingRoom[locale]} 
                    fill
                    className="object-contain"
                />
            </div>
          </button>

          {/* Doctor Button */}
          <button 
            onClick={() => window.location.href = 'https://www.arzt-auskunft.de/?form=fs1'}
            className="w-40 h-40 rounded-full flex items-center justify-center p-0 hover:scale-105 transition-transform overflow-hidden"
          >
             <div className="relative w-full h-full">
                 <Image 
                     src="/doctor.png" 
                     alt={TRANSLATIONS.doctor[locale]} 
                     fill
                     className="object-contain"
                 />
             </div>
          </button>
       </motion.div>

       {/* Footer / Controls */}
       <div className="mt-12">
            <button className="hover:opacity-80 transition-opacity">
                <VideoPlayIcon className="w-16 h-10" />
            </button>
       </div>
    </div>
  );
}
