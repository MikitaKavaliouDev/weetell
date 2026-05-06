'use client';

import WeetellLogo from './WeetellLogo';
import SettingsMenu from './SettingsMenu';
import { useRouter } from 'next/navigation';

interface AppHeaderProps {
  onBack?: () => void;
  onHome?: () => void;
  onMobile?: () => void;
  className?: string;
}

export default function AppHeader({ onBack, onHome, onMobile, className = "" }: AppHeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    if (onBack) {
      onBack();
    } else if (onHome) {
      onHome();
    } else {
      // Default behavior if no specific handler is provided
      // If we are not on the home page, we can try to go back
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        router.back();
      }
    }
  };

  return (
    <header className={`fixed top-0 bg-white/95 backdrop-blur-sm flex justify-between items-center px-4  z-[100] w-full border-b border-transparent transition-all ${className}`}>
      <div className="flex items-center gap-2">
        <WeetellLogo onClick={handleLogoClick} />
      </div>
      <div className="flex items-center gap-2">
        <SettingsMenu
          onHome={onHome}
          onMobile={onMobile}
        />
      </div>
    </header>
  );
}
