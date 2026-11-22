export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5 leading-none select-none group">
      {/* Handcrafted Medical Emblem Badge */}
      <div className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${
        light
          ? "bg-white/10 text-white border border-white/20 shadow-inner"
          : "bg-gradient-to-br from-navy via-navy to-blue text-white shadow-sm"
      }`}>
        {/* Crisp Medical Cross with Pulse Heartbeat */}
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4v16m-8-8h16" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
          <path d="M3 12h3.5l2-4 3.5 8 2.5-6 1.5 2H21" stroke="#FFD21F" strokeWidth="2.2" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red ring-2 ring-white animate-pulse" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-head text-xl font-black tracking-tight text-red">
            D·H
          </span>
          <span className={`text-[13px] font-black tracking-wider uppercase font-head ${
            light ? "text-white" : "text-navy"
          }`}>
            Medical
          </span>
        </div>
        <span className={`text-[9.5px] font-bold tracking-widest uppercase mt-0.5 ${
          light ? "text-blue-100" : "text-slate-500"
        }`}>
          Support & Coordination
        </span>
      </div>
    </div>
  );
}
