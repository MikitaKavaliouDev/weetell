import Image from "next/image";


export default function WeetellLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/assets/WEEtell_WEE_LOGO.svg"
      alt="Weetell Logo"
      width={48}
      height={48}
      className={`${className} object-contain `}
    />
  );
}
