export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5 leading-none select-none group">
      {/* Signature Medical Shield + Cross + Heartbeat Emblem */}
      <div
        className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-300 group-hover:scale-105 ${
          light
            ? "bg-white text-brand shadow-md"
            : "bg-brand text-white shadow-[0_4px_12px_rgba(15,82,186,0.25)]"
        }`}
      >
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Medical Cross Geometry */}
          <rect x="13" y="5" width="6" height="22" rx="3" fill="currentColor" fillOpacity="0.25" />
          <rect x="5" y="13" width="22" height="6" rx="3" fill="currentColor" fillOpacity="0.25" />

          {/* Dynamic Vital Lifeline (ECG / Pulse) */}
          <path
            d="M6 16h4.5l2.2-4.5 3.6 9 2.7-6 1.8 2.5H26"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Vital Core Dot */}
          <circle cx="16" cy="16" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Modern Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-head text-xl font-black tracking-tight ${
              light ? "text-white" : "text-brand"
            }`}
          >
            D·H
          </span>
          <span
            className={`font-head text-[13.5px] font-black tracking-wider uppercase ${
              light ? "text-white" : "text-ink-dark"
            }`}
          >
            Medical
          </span>
        </div>
        <span
          className={`text-[9.5px] font-bold tracking-widest uppercase mt-0.5 ${
            light ? "text-brand-100" : "text-slate-400"
          }`}
        >
          Healthcare Platform
        </span>
      </div>
    </div>
  );
}
