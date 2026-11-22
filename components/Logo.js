export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5 leading-none select-none">
      {/* Signature Sapphire Cross-Stethoscope Badge */}
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform ${
        light
          ? "bg-white text-brand shadow-sm"
          : "bg-brand text-white shadow-sm"
      }`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4v16m-8-8h16" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-head text-xl font-black tracking-tight ${
            light ? "text-white" : "text-brand"
          }`}>
            D·H
          </span>
          <span className={`text-[13px] font-black tracking-wider uppercase font-head ${
            light ? "text-white" : "text-ink-dark"
          }`}>
            Medical
          </span>
        </div>
        <span className={`text-[9.5px] font-bold tracking-widest uppercase mt-0.5 ${
          light ? "text-brand-100" : "text-slate-400"
        }`}>
          Healthcare Platform
        </span>
      </div>
    </div>
  );
}
