import React from 'react';

export const ArztAuskunftLogo = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Arzt-Auskunft"
  >
    {/* Stylized Logo Icon (Abstract Caduceus/Medical Cross combination) */}
    <circle cx="20" cy="20" r="18" stroke="#2563eb" strokeWidth="2.5" />
    <path d="M20 8 V32 M12 16 H28" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M14 28 C14 28 17 24 20 24 C23 24 26 28 26 28" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    
    {/* Text Logo */}
    <text x="45" y="26" fontSize="20" fontWeight="700" fill="#2563eb" fontFamily="sans-serif">
      Arzt-Auskunft
    </text>
  </svg>
);

export const SearchIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const MenuIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#2563eb"
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

export const HausarztIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="20" cy="20" r="20" className="fill-blue-100" />
    <path d="M20 28V16M14 22L20 16L26 22" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="18.5" y="21" width="3" height="3" fill="#2563eb" rx="0.5"/>
  </svg>
);

// Simplified specialized icons to match the style
export const GeneralPracticeIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
     <circle cx="20" cy="20" r="20" fill="#DBEAFE"/>
     {/* House shape */}
     <path d="M12 22 L20 14 L28 22 V30 H12 V22 Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
     {/* Cross */}
     <path d="M20 20 V26 M17 23 H23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const GynecologyIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#DBEAFE"/>
    <circle cx="20" cy="18" r="6" stroke="#2563EB" strokeWidth="2.5"/>
    <path d="M20 24 V32 M16 29 H24" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const OrthopedicsIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#DBEAFE"/>
    {/* Bone joint simplified */}
    <path d="M15 16 C15 13 18 13 20 16 C22 13 25 13 25 16 V18 C25 21 22 22 20 24" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M15 28 C15 31 18 31 20 28 C22 31 25 31 25 28 V26 C25 23 22 22 20 20" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="1.5" fill="#2563EB"/>
  </svg>
);
