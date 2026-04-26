'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArztAuskunftLogo, MenuIcon, SearchIcon, GeneralPracticeIcon, GynecologyIcon, OrthopedicsIcon } from '@/components/atoms/ResultsIcons';
import { DOCTORS } from '@/data/doctors';
import { Star, MapPin, ArrowLeft } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Dynamic Header Background */}
      <div className={`sticky top-0 transition-all duration-500 ease-in-out ${showResults ? 'bg-white shadow-sm' : 'bg-[#E6F0FF] rounded-b-[40px]'} relative z-20`}>
    <div className="max-w-md mx-auto px-6 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-neutral-500 hover:bg-slate-50 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <ArztAuskunftLogo className="h-8 w-auto" />
            </div>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
                <MenuIcon className="w-5 h-5" />
            </button>
        </header>

            <AnimatePresence>
                {!showResults && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                         {/* Hero Content */}
                        <div className="text-center space-y-4 pb-8">
                            <h2 className="text-[#2563eb] text-xs font-bold tracking-wider uppercase">
                                DIE ARZT-AUSKUNFT DER STIFTUNG GESUNDHEIT
                            </h2>
                            <h1 className="text-3xl font-bold text-neutral-900 leading-tight">
                                Finden Sie Ärzte <br/>in Ihrer Nähe
                            </h1>
                        </div>

                        {/* Search Button (Large) */}
                        <div className="pb-12">
                            <button 
                                onClick={handleSearch}
                                className="w-full bg-[#3454D1] hover:bg-[#2a44ad] text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
                            >
                                <SearchIcon className="w-6 h-6 text-white" />
                                Arzt suchen
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Compact Search Bar (Shown when results are active) */}
             <AnimatePresence>
                {showResults && (
                     <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pb-4"
                     >
                        <div className="flex gap-3">
                            <div className="flex-1 bg-slate-100 rounded-xl px-4 py-3 flex items-center gap-3 text-neutral-500">
                                <SearchIcon className="w-5 h-5" />
                                <span className="text-sm">Filter results...</span>
                            </div>
                            <button onClick={() => setShowResults(false)} className="text-sm font-medium text-blue-600 px-2">
                                Clear
                            </button>
                        </div>
                     </motion.div>
                )}
             </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#FAFAFA] relative z-10">
        <div className="max-w-md mx-auto px-6 pt-16 pb-8">
            <AnimatePresence mode="wait">
                {!showResults ? (
                     /* OFT GESUCHT SECTION */
                    <motion.div 
                        key="categories"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <h3 className="text-xl font-bold text-neutral-900 mb-6">
                            Oft gesucht
                        </h3>

                        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                            <CategoryCard 
                                onClick={handleSearch}
                                icon={<GeneralPracticeIcon className="w-12 h-12" />}
                                label="Hausärzte"
                            />
                            <CategoryCard 
                                onClick={handleSearch}
                                icon={<GynecologyIcon className="w-12 h-12" />}
                                label="Gynäkologen"
                            />
                            <CategoryCard 
                                onClick={handleSearch}
                                icon={<OrthopedicsIcon className="w-12 h-12" />}
                                label="Orthopäden"
                            />
                            <div className="w-2 shrink-0" />
                        </div>
                    </motion.div>
                ) : (
                    /* RESULTS LIST SECTION */
                    <motion.div 
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="space-y-4"
                    >
                         <h3 className="text-sm font-semibold text-neutral-500 mb-4 px-1">
                            {DOCTORS.length} Specialists found
                        </h3>

                        {DOCTORS.map((doc, index) => (
                             <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => window.location.href = 'https://www.arzt-auskunft.de/?form=fs1'}
                                className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
                              >
                                <div className="flex gap-5">
                                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                                    {doc.image}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                      <h3 className="font-bold text-lg text-neutral-800 truncate pr-2">{doc.name}</h3>
                                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-1 rounded-lg shrink-0">
                                          <Star size={12} fill="currentColor" />
                                          {doc.rating}
                                      </div>
                                    </div>
                                    
                                    <p className="text-sm text-blue-500 font-medium mb-3">{doc.specialty}</p>
                  
                                    <div className="flex items-center gap-4 text-xs text-neutral-400">
                                      <span className="flex items-center gap-1"><MapPin size={12} /> {doc.distance}</span>
                                      <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                                      <span className="text-green-500 font-medium">Available Today</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center justify-center bg-white rounded-2xl p-4 w-32 h-32 shrink-0 shadow-sm border border-slate-100"
        >
            <div className="mb-3">
                {icon}
            </div>
            <span className="text-xs font-bold text-neutral-800">{label}</span>
        </motion.button>
    )
}
