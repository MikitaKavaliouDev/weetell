import Image from "next/image";


export default function WeetellLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/WEEtell_Logo.svg"
      alt="Weetell Logo"
      width={120}
      height={40}
      className={className}
    />
  );
}
