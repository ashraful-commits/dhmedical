"use client";

import { HeartPulse } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Loading() {
  const { lang } = useLanguage();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-20">
      <div className="relative flex flex-col items-center gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[#0A4FA6] text-white shadow-[0_8px_20px_rgba(22,120,242,0.22)] animate-heart-pulse">
          <HeartPulse size={28} />
        </div>
        <span className="text-xs font-bold text-slate-500 animate-pulse">
          {lang === "bn" ? "লোড হচ্ছে..." : "Loading..."}
        </span>
      </div>
    </div>
  );
}
