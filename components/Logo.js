export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-3 select-none group transition-transform hover:scale-[1.02] active:scale-[0.99]">
      {/* Freestanding Signature Medical Icon (No Solid Background Box) */}
      <svg
        viewBox="0 0 48 48"
        className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:rotate-3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Freestanding Rounded Medical Cross in Signature Sapphire */}
        <path
          d="M20 6h8c1.657 0 3 1.343 3 3v8h8c1.657 0 3 1.343 3 3v8c0 1.657-1.343 3-3 3h-8v8c0 1.657-1.343 3-3 3h-8c-1.657 0-3-1.343-3-3v-8H9c-1.657 0-3-1.343-3-3v-8c0-1.657 1.343-3 3-3h8V9c0-1.657 1.343-3 3-3z"
          fill={light ? "#FFFFFF" : "#0F52BA"}
          fillOpacity={light ? 0.95 : 1}
        />

        {/* Dynamic White/Care Heartbeat Pulse across the Cross */}
        <path
          d="M8 24h9l2.4-6.5 4.2 13 3.6-9 2.2 4H40"
          stroke={light ? "#0F52BA" : "#FFFFFF"}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Compassionate Lovable Rose Heart Node ("নিজের পরিবারের মতো ভালোবাসা") */}
        <circle
          cx="28"
          cy="15"
          r="3"
          fill="#FF5E7E"
          stroke={light ? "#0F52BA" : "#FFFFFF"}
          strokeWidth="1.5"
        />
      </svg>

      {/* Prominent, Larger Premium Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1 leading-none">
          <span
            className={`font-head text-xl sm:text-[22px] font-black tracking-tight ${
              light ? "text-white" : "text-brand"
            }`}
          >
            DH
          </span>
          <span
            className={`font-head text-xl sm:text-[22px] font-black tracking-tight ${
              light ? "text-white/95" : "text-ink-dark"
            }`}
          >
            Medical
          </span>
          <span
            className={`font-head text-xl sm:text-[22px] font-black tracking-tight ${
              light ? "text-rose-200" : "text-love"
            }`}
          >
            Support
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1 leading-none">
          <span
            className={`text-[9.5px] font-bold tracking-widest uppercase ${
              light ? "text-white/80" : "text-slate-400"
            }`}
          >
            Healthcare Network
          </span>
          <span className="h-1 w-1 rounded-full bg-love shrink-0" />
          <span
            className={`text-[9.5px] font-bold ${
              light ? "text-rose-200" : "text-love"
            }`}
          >
            24/7 Care
          </span>
        </div>
      </div>
    </div>
  );
}
