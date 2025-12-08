'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArztAuskunftLogo, MenuIcon, SearchIcon, GeneralPracticeIcon, GynecologyIcon, OrthopedicsIcon } from '@/components/atoms/ResultsIcons';

export default function ResultsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-[#E6F0FF] pb-12 rounded-b-[40px] relative z-10">
        <div className="max-w-md mx-auto px-6 pt-6">
            {/* Header */}
            <header className="flex justify-between items-center mb-16">
                <ArztAuskunftLogo className="h-10 w-auto" />
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <MenuIcon className="w-6 h-6" />
                </button>
            </header>

            {/* Hero Content */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <h2 className="text-[#2563eb] text-sm font-bold tracking-wider uppercase">
                    DIE ARZT-AUSKUNFT DER STIFTUNG GESUNDHEIT
                </h2>
                <h1 className="text-4xl font-bold text-neutral-900 leading-tight">
                    Finden Sie Ärzte <br/>in Ihrer Nähe
                </h1>
            </motion.div>

            {/* Search Button */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-12"
            >
                <button 
                    onClick={() => {}} // Placeholder for search functionality
                    className="w-full bg-[#3454D1] hover:bg-[#2a44ad] text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                >
                    <SearchIcon className="w-6 h-6 text-white" />
                    Arzt suchen
                </button>
            </motion.div>
        </div>
      </div>

      {/* Often Searched Section */}
      <div className="bg-[#FAFAFA] flex-1 pt-12">
        <div className="max-w-md mx-auto px-6">
            <h3 className="text-xl font-bold text-neutral-900 mb-6">
                Oft gesucht
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                <CategoryCard 
                    icon={<GeneralPracticeIcon className="w-12 h-12" />}
                    label="Hausärzte"
                />
                <CategoryCard 
                    icon={<GynecologyIcon className="w-12 h-12" />}
                    label="Gynäkologen"
                />
                 <CategoryCard 
                    icon={<OrthopedicsIcon className="w-12 h-12" />}
                    label="Orthopäden"
                />
                 {/* Invisible spacer for padding right in scroll */}
                 <div className="w-2 shrink-0" />
            </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center bg-white rounded-2xl p-4 w-32 h-32 shrink-0 shadow-sm border border-slate-100"
        >
            <div className="mb-3">
                {icon}
            </div>
            <span className="text-xs font-bold text-neutral-800">{label}</span>
        </motion.button>
    )
}
