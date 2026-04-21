import Image from "next/image";


export default function WeetellLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/wee_logo.png"
      alt="Weetell Logo"
      width={100}
      height={40}
      className={`${className} object-contain `}
    />
  );
}
