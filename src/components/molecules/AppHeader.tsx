'use client';

import WeetellLogo from './WeetellLogo';
import SettingsMenu from './SettingsMenu';

interface AppHeaderProps {
  onBack?: () => void;
  onHome?: () => void;
  onMobile?: () => void;
  className?: string;
}

export default function AppHeader({ onBack, onHome, onMobile, className = "" }: AppHeaderProps) {
  return (
    <header className={`sticky top-0 bg-white/95 backdrop-blur-sm flex justify-between items-center px-4  z-[100] w-full border-b border-transparent transition-all ${className}`}>
      <div className="flex items-center gap-4">
        <WeetellLogo />
      </div>
      <div className="flex items-center gap-2">
        <SettingsMenu
          onBack={onBack}
          onHome={onHome}
          onMobile={onMobile}
        />
      </div>
    </header>
  );
}
