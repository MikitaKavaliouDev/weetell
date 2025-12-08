import { motion } from 'framer-motion';

interface BodyPartIllustrationProps {
  part: string | null;
}

const COMMON_PROPS = {
    fill: "none",
    stroke: "#4a4a40",
    strokeWidth: "6",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    filter: "url(#rough-edge)"
};

const TEXTURE_PROPS = {
    ...COMMON_PROPS,
    filter: "url(#texture-noise)",
    className: "opacity-50"
};

export default function BodyPartIllustration({ part }: BodyPartIllustrationProps) {
  
  const getPath = (part: string) => {
      switch(part) {
          case 'head':
              return "M 100 80 C 100 80 100 150 150 150 C 200 150 200 80 200 80 C 200 80 220 180 220 180 Q 225 210 200 230 Q 150 250 100 230 Q 75 210 80 180 Z"; // Rough head shape
          case 'chest':
              return "M 80 80 L 220 80 L 210 220 L 90 220 Z"; // Rough torso
          case 'stomach':
               return "M 90 80 L 210 80 L 210 220 L 90 220 Z"; 
          case 'arms':
               return "M 50 50 Q 150 300 150 50"; // Just a rough arm
          case 'legs':
               return "M 110 50 L 110 250 M 190 50 L 190 250";
          default:
              return "";
      }
  };

  // Improved paths for specific parts ("Zoomed In" look)
  // These coordinates map to a 300x300 box roughly
  const PATHS: Record<string, string> = {
      head: "M150 50 C 90 50 80 120 85 160 C 85 190 120 220 150 220 C 180 220 215 190 215 160 C 220 120 210 50 150 50 Z M 110 140 Q 150 140 190 140 M 150 160 L 150 170 M 130 190 Q 150 200 170 190",
      chest: "M 80 80 L 100 60 L 200 60 L 220 80 L 210 220 L 90 220 Z M 150 80 L 150 220 M 110 100 L 130 100",
      stomach: "M 90 50 L 210 50 L 200 200 Q 150 220 100 200 Z M 150 120 Q 160 120 160 130 Q 160 140 150 140 Q 140 140 140 130 Q 140 120 150 120",
      arms: "M 50 200 Q 80 100 100 50 L 140 60 Q 120 110 80 210 Z M 250 200 Q 220 100 200 50 L 160 60 Q 180 110 220 210 Z",
      legs: "M 100 50 L 100 250 L 140 250 L 140 100 L 160 100 L 160 250 L 200 250 L 200 50 Z"
  };
  
  const path = PATHS[part || ''] || PATHS.head; // Fallback to head if null

  return (
    <svg viewBox="0 0 300 300" className="w-[80%] max-h-[50vh] drop-shadow-sm overflow-visible mx-auto pointer-events-none">
      <defs>
         <filter id="texture-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
            <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="composite" />
            </feMerge>
        </filter>
        <filter id="rough-edge">
             <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
             <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>

      {/* Main Path */}
      <motion.path
        d={path}
        {...COMMON_PROPS}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      
      {/* Texture Overlay */}
      <motion.path
        d={path}
        {...TEXTURE_PROPS}
      />
    </svg>
  );
}
