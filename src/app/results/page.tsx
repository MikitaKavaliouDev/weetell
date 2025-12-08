'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import { Calendar, MapPin, Phone, Star } from 'lucide-react';
import { DOCTORS } from '@/data/doctors';

export default function ResultsPage() {
  const router = useRouter();
  const symptoms = useAssessmentStore((state) => state.symptoms);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 p-6 pt-16">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            Recommended Care
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Based on {symptoms.length} symptoms
          </p>
        </motion.div>

        <div className="space-y-4">
          {DOCTORS.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-neutral-800 rounded-full flex items-center justify-center text-3xl shadow-inner">
                {doc.image}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200">{doc.name}</h3>
                    <p className="text-sm text-wee-blue font-medium">{doc.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-bold bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                    <Star size={14} fill="currentColor" />
                    {doc.rating}
                  </div>
                </div>
                
                <div className="mt-3 flex gap-4 text-sm text-neutral-500">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {doc.distance}</span>
                  <button 
                    onClick={() => router.push('/results/service')}
                    className="ml-auto bg-wee-blue text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-1"
                  >
                    <Calendar size={12} />
                    Book
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl text-sm text-yellow-800 dark:text-yellow-200 flex gap-3"
        >
            <span className="text-2xl">⚠️</span>
            <p>
                This is a demo triage tool. If this is a medical emergency, please call 112 immediately.
            </p>
        </motion.div>
      </div>
    </div>
  );
}
