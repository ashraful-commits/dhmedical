export default function Ecg({ className = "", stroke = "#fff" }) {
  return (
    <svg className={`ecg ${className}`} viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 30H360l14-6 12 6h20l12-26 16 52 14-26h18l12-8 10 8H1200" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
