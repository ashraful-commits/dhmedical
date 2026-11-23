import { HeartPulse } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-20">
      <div className="relative flex flex-col items-center gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[#0B4196] text-white shadow-[0_8px_20px_rgba(15,82,186,0.25)] animate-heart-pulse">
          <HeartPulse size={28} />
        </div>
        <span className="text-xs font-bold text-slate-500 animate-pulse">
          লোড হচ্ছে...
        </span>
      </div>
    </div>
  );
}
