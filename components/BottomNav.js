"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, Ambulance, Users, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

const items = [
  { href: "/", label: "হোম", Icon: Home },
  { href: "/doctors", label: "ডাক্তার", Icon: Stethoscope },
  { href: "/ambulance", label: "অ্যাম্বুলেন্স", Icon: Ambulance },
  { href: "/family-care", label: "ফ্যামিলি", Icon: Users },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-blue/20 bg-white pb-[env(safe-area-inset-bottom)] md:hidden" aria-label="দ্রুত মেনু">
      {items.map(({ href, label, Icon }) => {
        const on = href === "/" ? path === "/" : path.startsWith(href);
        return (
          <Link key={href} href={href} className={`flex min-h-[60px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold ${on ? "text-red" : "text-navy"}`}>
            <Icon size={22} />{label}
          </Link>
        );
      })}
      <a href={SITE.tel} className="flex min-h-[60px] flex-col items-center justify-center gap-0.5 bg-red text-[11px] font-semibold text-white">
        <Phone size={22} />কল
      </a>
    </nav>
  );
}
