"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, HeartPulse, ShieldCheck, Ambulance, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Clinical Trust Bar */}
      <div className="bg-navy-dark text-white text-[11px] font-medium py-1.5 border-b border-white/10 hidden sm:block">
        <div className="wrap flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              ২৪/৭ ইমার্জেন্সি কন্ট্রোল রুম সক্রিয়
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">সারা বাংলাদেশে ১৫-২৫ মিনিটে অ্যাম্বুলেন্স পৌঁছায়</span>
          </div>

          <div className="flex items-center gap-4 text-white/80">
            <Link href="/track" className="hover:text-gold transition-colors font-semibold">
              লাইভ বুকিং ট্র্যাকিং
            </Link>
            <span className="text-white/40">|</span>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <MessageCircle size={12} /> WhatsApp সাপোর্ট
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-subtle transition-all">
        <div className="wrap flex h-16 items-center justify-between">
          <Link href="/" aria-label="D H Medical Support হোম" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="প্রধান মেনু">
            {NAV.slice(1).map((n) => {
              const isActive = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-lg px-3 py-1.5 text-[14px] font-bold transition-all duration-150 ${
                    isActive
                      ? "text-blue bg-blue-50"
                      : "text-slate-700 hover:text-navy hover:bg-slate-100/70"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}

            {/* Hotline Call Button */}
            <div className="ml-3 pl-3 border-l border-slate-200 flex items-center gap-2">
              <a
                href={SITE.tel}
                className="btn btn-red !min-h-[40px] !px-4 !py-1.5 text-xs font-black shadow-sm flex items-center gap-1.5"
              >
                <Phone size={14} className="animate-pulse" />
                <span>{SITE.phone}</span>
              </a>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE.tel}
              aria-label="জরুরি কল"
              className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red font-bold"
            >
              <Phone size={18} />
            </a>
            <button
              className="grid h-10 w-10 place-items-center rounded-xl text-navy hover:bg-slate-100 transition-colors"
              aria-label="মেনু"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden shadow-xl animate-fadeIn" aria-label="মোবাইল মেনু">
            <div className="grid gap-1 pb-3 border-b border-slate-100">
              {NAV.map((n) => {
                const isActive = pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-base font-bold transition-colors ${
                      isActive ? "bg-blue-50 text-blue" : "text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <a
                href={SITE.tel}
                className="btn btn-red w-full !min-h-[42px] font-bold flex items-center justify-center gap-1.5"
              >
                <Phone size={15} /> কল করুন
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn-green w-full !min-h-[42px] font-bold flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
