"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeartPulse } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";

export default function PageLoader() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Initial mount loader animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Route transition top progress bar
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Top Slim Gradient Progress Bar (Sapphire to Heart Rose) */}
      {(loading || initialLoad) && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 overflow-hidden bg-slate-100">
          <div className="h-full bg-gradient-to-r from-brand via-care to-brand-light animate-top-loader shadow-[0_0_8px_rgba(225,29,72,0.6)]" />
        </div>
      )}

      {/* Elegant Initial Mount Splash Loader */}
      {initialLoad && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-500"
          style={{ opacity: initialLoad ? 1 : 0 }}
        >
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            {/* Pulsing Medical Cross Emblem */}
            <div className="relative">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[#0A4FA6] text-white shadow-[0_8px_24px_rgba(22,120,242,0.28)] animate-heart-pulse">
                <HeartPulse size={34} className="text-white" />
              </div>
              {/* Subtle Warm Rose Heart Ping */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-care opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-care"></span>
              </span>
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-head text-lg font-black tracking-tight text-ink-dark">
                D·H Medical Support
              </h3>
              <p className="text-xs font-semibold text-care flex items-center justify-center gap-1">
                <span>{t("footer_tagline")}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
