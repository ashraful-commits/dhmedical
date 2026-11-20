export default function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-2 leading-none">
      <svg viewBox="0 0 70 44" className="h-9 w-14 shrink-0" aria-hidden="true">
        <path d="M6 22C2 8 22 2 30 14" fill="none" stroke="#E11D2E" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M24 10h8v8h8v8h-8v8h-8v-8h-8v-8h8z" fill="#1E63D6" />
        <path d="M2 30h14l4-6 5 12 5-18 4 12h34" fill="none" stroke={light ? "#fff" : "#12347F"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="flex flex-col gap-1">
        <b className="font-head text-2xl font-extrabold text-red">D·H</b>
        <b className={`text-[11px] font-extrabold tracking-wide ${light ? "text-white" : "text-navy"}`}>MEDICAL SUPPORT</b>
      </span>
    </span>
  );
}
