'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { Calendar, MapPin, Star, MoreHorizontal } from 'lucide-react';
import { DOCTORS } from '@/data/doctors';

export default function ResultsPage() {
  const router = useRouter();
  const symptoms = useAssessmentStore((state) => state.symptoms);

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-12 pb-20">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
                Found {DOCTORS.length} Specialists
            </h1>
            <p className="text-neutral-500 text-sm">
                Based on your {symptoms.length} symptoms
            </p>
          </div>
          <button className="p-2 bg-white rounded-full border border-slate-100 shadow-sm">
            <MoreHorizontal size={20} className="text-neutral-400" />
          </button>
        </motion.div>

        {/* Doctor List */}
        <div className="space-y-5">
          {DOCTORS.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-5 rounded-3xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group"
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

              {/* Action Buttons */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                  <button className="py-2.5 rounded-xl text-sm font-semibold text-neutral-600 bg-slate-50 hover:bg-slate-100 transition-colors">
                    View Profile
                  </button>
                  <button 
                     onClick={() => router.push('/results/service')}
                     className="py-2.5 rounded-xl text-sm font-semibold text-white bg-neutral-900 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Calendar size={14} />
                    Book Visit
                  </button>
              </div>
            </motion.div>
          ))}
        </div>

         {/* Disclaimer */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center px-6"
        >
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                Information provided is for preliminary triage only. In emergencies, always contact local emergency services immediately.
            </p>
        </motion.div>
      </div>
    </div>
  );
}
