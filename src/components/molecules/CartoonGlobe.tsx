import { motion } from 'framer-motion';

export default function CartoonGlobe() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
        {/* Ocean */}
        <circle cx="100" cy="100" r="95" fill="#A4D8E6" />
        
        {/* Continents - Simplified Blobs */}
        {/* North America / Europe blobish */}
        <path d="M50 60 Q 70 40 90 60 T 130 80 T 160 60 Q 170 80 160 100 T 130 130 T 90 120 T 50 140 Q 30 100 50 60" 
              fill="#86CD99" opacity="0.9" />
        
        {/* South America / Africa blobish */}
        <path d="M60 130 Q 80 150 70 180 Q 50 170 40 150 Z" fill="#86CD99" opacity="0.9" />
        <path d="M140 130 Q 160 150 150 180 Q 130 170 120 150 Z" fill="#86CD99" opacity="0.9" />

        {/* Face */}
        <g fill="#2C3E50">
          {/* Eyes */}
          <circle cx="75" cy="100" r="4" />
          <circle cx="125" cy="100" r="4" />
          
          {/* Mouth / Nose */}
          {/* Nose (small arc) */}
          <path d="M98 105 Q 100 115 95 118" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
          
          {/* Smile */}
          <path d="M80 130 Q 100 145 120 130" fill="none" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
