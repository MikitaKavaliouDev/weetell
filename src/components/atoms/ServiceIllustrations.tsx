import React from 'react';

export const WeeHeaderLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" fill="none" className={className}>
    <text x="0" y="32" fontSize="40" fontWeight="bold" fill="#3b82f6" fontFamily="cursive" style={{ fontStyle: 'italic' }}>
      Wee
    </text>
  </svg>
);

export const MenuBurgerIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="4" y1="6" x2="20" y2="6" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    <line x1="4" y1="12" x2="20" y2="12" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    <line x1="4" y1="18" x2="20" y2="18" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const BedIllustration = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 160" fill="none" className={className}>
    {/* Bed Frame */}
    <path d="M40 80 L160 80 L180 140 H20 L40 80" fill="#d97706" />
    <path d="M20 100 V140 M180 100 V130" stroke="#d97706" strokeWidth="10" strokeLinecap="round" />
    <rect x="25" y="100" width="150" height="20" fill="#b45309" rx="5" />

    {/* Bed Legs */}
    <path d="M40 140 V155 M160 140 V150" stroke="#b45309" strokeWidth="12" strokeLinecap="round" />

    {/* Mattress/Sheets */}
    <path d="M30 80 L170 80 L160 130 H40 L30 80" fill="#3b82f6" opacity="0.9" />
    <path d="M30 80 Q100 70 170 80 V100 H30 V80" fill="#60a5fa" />
    
    {/* Pillow */}
    <ellipse cx="140" cy="70" rx="30" ry="15" fill="#fef3c7" transform="rotate(-15 140 70)" />
    
    {/* Filter Texture Overlay */}
    <filter id="texture">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
      <feComposite operator="in" in2="SourceGraphic" />
    </filter>
    <rect width="100%" height="100%" filter="url(#texture)" opacity="0.4"/>
  </svg>
);

// BedWithMapIllustration removed as we are using the png image now

export const VideoPlayIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 40" fill="none" className={className}>
    <rect x="2" y="2" width="56" height="36" rx="4" stroke="#eab308" strokeWidth="3" fill="none" />
    <path d="M25 12 L40 20 L25 28 V12" fill="#eab308" stroke="#eab308" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="1.5" fill="#eab308"/>
    <circle cx="8" cy="20" r="1.5" fill="#eab308"/>
    <circle cx="8" cy="32" r="1.5" fill="#eab308"/>
    <circle cx="52" cy="8" r="1.5" fill="#eab308"/>
    <circle cx="52" cy="20" r="1.5" fill="#eab308"/>
    <circle cx="52" cy="32" r="1.5" fill="#eab308"/>
  </svg>
);
