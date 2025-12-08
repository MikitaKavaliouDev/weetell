export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Refined "Wee" Logotype */}
      <path
        d="M10 20 L20 20 L25 5 L30 20 L40 20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="55" cy="20" r="5" fill="currentColor" />
      <circle cx="70" cy="20" r="5" fill="currentColor" />
    </svg>
  );
}
