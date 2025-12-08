'use client';

import { motion } from 'framer-motion';
import InteractiveCard from '@/components/atoms/InteractiveCard';
import { Building2, Map, Pill, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SERVICES = [
  { id: 'telehealth', label: 'Telehealth', icon: Video, color: 'text-blue-500', bg: 'bg-blue-100' },
  { id: 'hospital', label: 'Hospital', icon: Building2, color: 'text-red-500', bg: 'bg-red-100' },
  { id: 'pharmacy', label: 'Pharmacy', icon: Pill, color: 'text-green-500', bg: 'bg-green-100' },
  { id: 'map', label: 'Find on Map', icon: Map, color: 'text-purple-500', bg: 'bg-purple-100' },
];

export default function ServicePage() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    if (id === 'map') {
      router.push('/results/map');
    } else {
      // Mock booking flow
      alert(`Selected ${id}. This would open the booking flow.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-16 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-neutral-800">
          Choose Service
        </h1>
        <p className="text-neutral-500">
          How would you like to proceed?
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {SERVICES.map((service, index) => (
          <InteractiveCard
            key={service.id}
            onClick={() => handleSelect(service.id)}
            className="flex flex-col items-center justify-center gap-3 py-6 h-40"
          >
            <div className={`p-4 rounded-full ${service.bg} ${service.color}`}>
              <service.icon size={32} />
            </div>
            <span className="font-semibold text-neutral-700">
              {service.label}
            </span>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}
