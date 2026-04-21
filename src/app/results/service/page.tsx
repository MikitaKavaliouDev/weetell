'use client';

import { WeeHeaderLogo, MenuBurgerIcon, VideoPlayIcon } from '@/components/atoms/ServiceIllustrations';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

const TRANSLATIONS = {
  location: {
    en: 'Location',
    de: 'Standort',
    es: 'Ubicación',
    tr: 'Konum',
    fr: 'Emplacement',
  },
  medicine: {
    en: 'Medicine',
    de: 'Medizin',
    es: 'Medicina',
    tr: 'İlaç',
    fr: 'Médicament',
  },
} as const;

export default function ServicePage() {
  const router = useRouter();
  const locale = useAssessmentStore((state) => state.locale);

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
       {/* Header */}
       <header className="flex justify-between items-center mb-12">
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
          {/* Location Button */}
          <button 
            onClick={() => router.push('/results/consult')}
            className="w-40 h-40 rounded-full border-[6px] border-[#4A90E2] flex items-center justify-center p-8 bg-white hover:scale-105 transition-transform"
          >
            <div className="relative w-full h-full">
                <Image 
                    src="/location.png" 
                    alt={TRANSLATIONS.location[locale]} 
                    fill
                    className="object-contain"
                />
            </div>
          </button>

          {/* Medicine Button */}
          <button 
            onClick={() => router.push('/results/pharmacy')}
            className="w-40 h-40 rounded-full bg-[#6B8E23] flex items-center justify-center p-8 hover:scale-105 transition-transform"
          >
             <div className="relative w-full h-full">
                 <Image 
                     src="/medicine.png" 
                     alt={TRANSLATIONS.medicine[locale]} 
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
