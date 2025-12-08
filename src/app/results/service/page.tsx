'use client';

import { WeeHeaderLogo, MenuBurgerIcon, VideoPlayIcon } from '@/components/atoms/ServiceIllustrations';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ServicePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
       {/* Header */}
       <header className="flex justify-between items-center mb-12">
           <WeeHeaderLogo className="w-24 h-12" />
           <button className="p-2">
               <MenuBurgerIcon className="w-8 h-8" />
           </button>
       </header>

       {/* Main Content - Centered Illustration */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="flex-1 flex flex-col items-center justify-center relative"
       >
          <div className="relative w-full max-w-[320px] h-auto aspect-square">
            <Image 
              src="/bed_with_geo.png" 
              alt="Bed with map location" 
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 opacity-50" />
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
