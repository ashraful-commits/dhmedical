"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileSpreadsheet, Ambulance, Navigation, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const items = [
    { href: "/", label: lang === "bn" ? "হোম" : "Home", Icon: Home },
    { href: "/ambulance", label: lang === "bn" ? "অ্যাম্বুলেন্স" : "Ambulance", Icon: Ambulance },
    { href: "/prescription", label: lang === "bn" ? "প্রেসক্রিপশন" : "Prescription", Icon: FileSpreadsheet },
    { href: "/track", label: lang === "bn" ? "ট্র্যাকিং" : "Track", Icon: Navigation },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 overflow-hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden shadow-[0_-4px_16px_rgba(14,165,233,0.06)]"
      aria-label="Mobile Navigation"
    >
      {items.map(({ href, label, Icon }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex min-h-[58px] flex-col items-center justify-center gap-0.5 px-0.5 text-[10px] leading-[1.1] font-bold transition-colors select-none ${
              isActive
                ? "text-brand"
                : "text-slate-600 hover:text-brand"
            }`}
          >
            <div className={`grid h-7 w-7 place-items-center rounded-lg ${
              isActive ? "bg-brand-50 text-brand" : ""
            }`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="break-words text-center">{label}</span>
          </Link>
        );
      })}

      {/* Direct Emergency Call Button */}
      <a
        href={SITE.tel}
        className="flex min-h-[58px] flex-col items-center justify-center gap-0.5 px-0.5 bg-brand text-white text-[10px] leading-[1.1] font-black transition-all active:brightness-90 select-none shadow-inner"
      >
        <Phone size={20} />
        <span className="break-words text-center">{lang === "bn" ? "জরুরি কল" : "Call 24/7"}</span>
      </a>
    </nav>
  );
}
