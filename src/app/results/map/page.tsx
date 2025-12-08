'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="relative min-h-screen bg-slate-200 dark:bg-slate-900 w-full overflow-hidden">
       {/* Mock Map Background Layer */}
       <div className="absolute inset-0 opacity-20" 
            style={{ 
                backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)', 
                backgroundSize: '20px 20px' 
            }} 
       />
       
       {/* UI Overlay */}
       <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-lg flex items-center gap-3">
             <div className="bg-blue-100 text-blue-500 p-2 rounded-lg">
                <Navigation size={20} />
             </div>
             <div>
                <h3 className="font-bold">Current Location</h3>
                <p className="text-xs text-neutral-500">Berlin, Germany</p>
             </div>
          </div>
       </div>

       {/* Map Key Elements (Mock) */}
       <div className="absolute inset-0 flex items-center justify-center">
          {/* User Location Pulse */}
          <div className="relative">
             <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -inset-4 bg-blue-500 rounded-full"
             />
             <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white relative z-10" />
          </div>

          {/* Random Pins */}
          {[1,2,3].map(i => (
             <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="absolute text-red-500"
                style={{ 
                    top: `${40 + i * 10}%`, 
                    left: `${30 + i * 20}%` 
                }}
             >
                <MapPin size={32} fill="currentColor" className="drop-shadow-md" />
             </motion.div>
          ))}
       </div>
    </div>
  );
}
