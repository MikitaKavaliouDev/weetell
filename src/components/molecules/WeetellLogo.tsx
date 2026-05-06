'use client';

import Image from "next/image";

interface WeetellLogoProps {
  className?: string;
  onClick?: () => void;
}

export default function WeetellLogo({ className, onClick }: WeetellLogoProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="bg-transparent border-none p-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        aria-label="Go back"
      >
        <Image
          src="/assets/WEEtell_WEE_LOGO.svg"
          alt="Weetell Logo"
          width={100}
          height={48}
          className={`${className} object-contain`}
        />
      </button>
    );
  }

  return (
    <Image
      src="/assets/WEEtell_WEE_LOGO.svg"
      alt="Weetell Logo"
      width={100}
      height={48}
      className={`${className} object-contain`}
    />
  );
}
