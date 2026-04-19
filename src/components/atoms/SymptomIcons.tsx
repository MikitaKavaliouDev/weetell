import React from 'react';

interface SymptomIconProps {
  id: string;
  selected: boolean;
  className?: string; // Allow passing standard classNames
}

export default function SymptomIcon({ id, selected, className = '' }: SymptomIconProps) {
  const strokeColor = selected ? "#10b981" : "#d97706"; // Green if selected, Dark Gold if not
  const strokeWidth = selected ? "4" : "3";
  const strokeLineColor = "#b45309"; // Dark brown for detail lines

  // Wrapper for all icons
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`}>
      <circle cx="50" cy="50" r="45" fill="#fcd34d" stroke={strokeColor} strokeWidth={strokeWidth} />
      {children}
    </svg>
  );

  switch (id) {
    // --- HEAD ---
    case 'headache':
      return (
        <Wrapper>
           {/* Face */}
           <path d="M30 45 Q 38 40 45 45" fill="none" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
           <path d="M55 45 Q 62 40 70 45" fill="none" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
           <path d="M40 70 Q 50 60 60 70" fill="none" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
           {/* Lightning bolts */}
           <path d="M25 25 L 30 15 L 35 25 L 40 15" fill="none" stroke={strokeLineColor} strokeWidth="2" strokeLinecap="round" />
           <path d="M60 25 L 65 15 L 70 25 L 75 15" fill="none" stroke={strokeLineColor} strokeWidth="2" strokeLinecap="round" />
        </Wrapper>
      );
    case 'dizziness':
      return (
        <Wrapper>
          <path d="M40 80 Q 30 70 30 50 Q 30 30 50 25 Q 70 30 70 50 Q 70 70 60 80" fill="none" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M30 50 L 20 55" fill="none" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M45 40 Q 55 35 55 45 Q 55 55 45 55 Q 35 55 35 45 Q 35 30 50 30" fill="none" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
        </Wrapper>
      );
    case 'vision':
      return (
         <Wrapper>
            {/* Eye */}
            <path d="M25 50 Q 50 25 75 50 Q 50 75 25 50 Z" fill="white" stroke={strokeLineColor} strokeWidth="3" />
            <circle cx="50" cy="50" r="10" fill={strokeLineColor} />
            {/* Blurry lines */}
            <path d="M80 40 L 90 35" stroke={strokeLineColor} strokeWidth="2" />
            <path d="M82 50 L 92 50" stroke={strokeLineColor} strokeWidth="2" />
            <path d="M80 60 L 90 65" stroke={strokeLineColor} strokeWidth="2" />
         </Wrapper>
      );
    case 'fever':
    case 'fever_head':
      return (
        <Wrapper>
          <path d="M35 75 L 65 35 Q 70 30 65 25 Q 60 20 55 25 L 25 65" fill="white" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="65" x2="60" y2="35" stroke={strokeLineColor} strokeWidth="2" />
          {/* Heat waves */}
          <path d="M70 60 Q 75 50 70 40" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          <path d="M80 65 Q 85 55 80 45" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        </Wrapper>
      );

    // --- CHEST ---
    case 'cough':
      return (
        <Wrapper>
           {/* Open Mouth */}
           <path d="M35 50 Q 35 70 50 70 Q 65 70 65 50" fill="white" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
           {/* Air lines */}
           <path d="M70 50 L 85 45" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
           <path d="M72 60 L 87 65" stroke={strokeLineColor} strokeWidth="3" strokeLinecap="round" />
        </Wrapper>
      );
    case 'shortness_breath':
      return (
        <Wrapper>
           {/* Lungs schematic */}
           <path d="M30 40 Q 20 60 30 75 Q 45 75 45 60 L 45 40 Z" fill="white" stroke={strokeLineColor} strokeWidth="3" strokeLinejoin="round" />
           <path d="M70 40 Q 80 60 70 75 Q 55 75 55 60 L 55 40 Z" fill="white" stroke={strokeLineColor} strokeWidth="3" strokeLinejoin="round" />
           <path d="M50 30 L 50 40 M 50 40 L 45 40 M 50 40 L 55 40" stroke={strokeLineColor} strokeWidth="3" />
        </Wrapper>
      );
    case 'heart_palp':
      return (
          <Wrapper>
             <path d="M50 35 L 55 25 L 60 35 L 65 20 L 70 45 L 75 40" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
             <path d="M30 45 A 10 10 0 0 1 50 45 A 10 10 0 0 1 70 45 L 50 75 L 30 45" fill="none" stroke={strokeLineColor} strokeWidth="3" />
          </Wrapper>
      );
    case 'chest_pain':
        return (
            <Wrapper>
                <path d="M30 40 Q 50 30 70 40 L 70 70 Q 50 80 30 70 Z" fill="none" stroke={strokeLineColor} strokeWidth="3" />
                <path d="M45 50 L 55 60 M 55 50 L 45 60" stroke="#ef4444" strokeWidth="4" />
            </Wrapper>
        );

    // --- STOMACH ---
    case 'nausea':
        return (
            <Wrapper>
                <circle cx="50" cy="50" r="25" fill="#84cc16" opacity="0.5" />
                <path d="M35 55 Q 50 45 65 55" stroke={strokeLineColor} strokeWidth="3" fill="none" />
                <circle cx="40" cy="40" r="2" fill={strokeLineColor} />
                <circle cx="60" cy="40" r="2" fill={strokeLineColor} />
            </Wrapper>
        );
    case 'vomiting':
        return (
            <Wrapper>
                 <path d="M40 50 Q 50 45 60 50" stroke={strokeLineColor} strokeWidth="3" fill="none" />
                 <path d="M50 55 L 45 75 L 55 75 Z" fill="#84cc16" />
            </Wrapper>
        );
    case 'diarrhea':
        return (
            <Wrapper>
                <path d="M35 40 Q 50 30 65 40 Q 75 60 50 75 Q 25 60 35 40" fill="none" stroke={strokeLineColor} strokeWidth="3" />
                <path d="M48 30 L 48 60 L 52 60 L 52 30" fill={strokeLineColor} />
            </Wrapper>
        );
    case 'stomach_ache':
        return (
            <Wrapper>
                <circle cx="50" cy="55" r="20" fill="none" stroke={strokeLineColor} strokeWidth="3" />
                <path d="M40 55 L 50 45 L 60 55" stroke="#ef4444" strokeWidth="3" fill="none" />
            </Wrapper>
        );

    // --- LIMBS ---
    case 'leg_pain':
    case 'arm_pain':
        return (
            <Wrapper>
                <path d="M45 30 L 45 70 M 55 30 L 55 70" stroke={strokeLineColor} strokeWidth="3" />
                <path d="M35 45 L 45 50 L 35 55" stroke="#ef4444" strokeWidth="2" fill="none" />
                <path d="M65 45 L 55 50 L 65 55" stroke="#ef4444" strokeWidth="2" fill="none" />
            </Wrapper>
        );
    case 'swelling':
        return (
            <Wrapper>
                <path d="M40 30 Q 30 50 40 70" stroke={strokeLineColor} strokeWidth="3" fill="none" />
                <path d="M60 30 Q 75 50 60 70" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="4 2" />
            </Wrapper>
        );
    case 'rash_legs':
    case 'rash_arms':
        return (
            <Wrapper>
                <path d="M45 30 L 45 70 M 55 30 L 55 70" stroke={strokeLineColor} strokeWidth="3" opacity="0.3" />
                <circle cx="48" cy="40" r="2" fill="#ef4444" />
                <circle cx="52" cy="50" r="3" fill="#ef4444" />
                <circle cx="48" cy="60" r="2" fill="#ef4444" />
            </Wrapper>
        );
    case 'numbness':
        return (
            <Wrapper>
                <path d="M45 30 L 45 70" stroke={strokeLineColor} strokeWidth="3" />
                <circle cx="55" cy="40" r="1" fill={strokeLineColor} />
                <circle cx="55" cy="50" r="1" fill={strokeLineColor} />
                <circle cx="55" cy="60" r="1" fill={strokeLineColor} />
            </Wrapper>
        );

    default:
      return (
        <Wrapper>
          <text x="50" y="65" textAnchor="middle" fontSize="50" fill={strokeLineColor} fontWeight="bold">?</text>
        </Wrapper>
      );
  }
}
