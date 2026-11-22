"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown, Ambulance, Stethoscope, FileText, Users, Search, ShieldCheck } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" aria-label="DH Medical Support Home" onClick={() => setOpen(false)} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop Navigation (DocTime benchmark) */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
          <Link
            href="/appointment"
            className={`rounded-lg px-3 py-1.5 text-[14px] font-semibold transition-colors ${pathname === "/appointment" || pathname === "/doctors"
              ? "bg-brand-50 text-brand font-bold"
              : "text-slate-700 hover:text-ink-dark hover:bg-slate-50"
              }`}
          >
            Consultation
          </Link>

          <Link
            href="/ambulance"
            className={`rounded-lg px-3 py-1.5 text-[14px] font-semibold transition-colors ${pathname === "/ambulance"
              ? "bg-brand-50 text-brand font-bold"
              : "text-slate-700 hover:text-ink-dark hover:bg-slate-50"
              }`}
          >
            Ambulance 24/7
          </Link>

          <Link
            href="/appointment#diagnostic"
            className="rounded-lg px-3 py-1.5 text-[14px] font-semibold text-slate-700 hover:text-ink-dark hover:bg-slate-50 transition-colors"
          >
            Home Diagnostic
          </Link>

          <Link
            href="/family-care"
            className={`rounded-lg px-3 py-1.5 text-[14px] font-semibold transition-colors ${pathname === "/family-care"
              ? "bg-brand-50 text-brand font-bold"
              : "text-slate-700 hover:text-ink-dark hover:bg-slate-50"
              }`}
          >
            Health Plans
          </Link>

          <Link
            href="/track"
            className={`rounded-lg px-3 py-1.5 text-[14px] font-semibold transition-colors ${pathname === "/track"
              ? "bg-brand-50 text-brand font-bold"
              : "text-slate-700 hover:text-ink-dark hover:bg-slate-50"
              }`}
          >
            Booking Track
          </Link>

          {/* More Dropdown (DocTime style) */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[14px] font-semibold text-slate-700 hover:text-ink-dark hover:bg-slate-50 transition-colors"
              aria-expanded={moreOpen}
            >
              <span>More</span>
              <ChevronDown size={14} className={`transition-transform duration-150 ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl animate-fadeIn">
                <Link
                  href="/hospitals"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand"
                >
                  <FileText size={15} />
                  <span>Hospital Directory</span>
                </Link>
                <Link
                  href="/partner"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand"
                >
                  <Stethoscope size={15} />
                  <span>Join as a Doctor</span>
                </Link>
                <Link
                  href="/partner#ambulance"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand"
                >
                  <Ambulance size={15} />
                  <span>Ambulance Partner</span>
                </Link>
                <div className="my-1 border-t border-slate-100" />
                <Link
                  href="/feedback"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand"
                >
                  <Users size={15} />
                  <span>Contact & Feedback</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                >
                  <ShieldCheck size={15} />
                  <span>Admin Secure Portal</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Button (DocTime signature solid sapphire button) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={SITE.tel}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand transition-colors"
          >
            <Phone size={14} className="text-brand" />
            <span>{SITE.phone}</span>
          </a>

          <Link
            href="/ambulance"
            className="btn-primary !min-h-[40px] !px-4 !py-1 text-xs font-bold tracking-tight shadow-sm"
          >
            <span>Book Ambulance &gt;</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-ink-dark lg:hidden hover:bg-slate-50 transition-colors"
            aria-label="Navigation Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Toggle Menu</span>
            <div className="w-4 h-3.5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-ink-dark transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`h-0.5 w-full bg-ink-dark transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-ink-dark transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden shadow-lg animate-fadeIn">
          <div className="grid gap-1 pb-3 text-sm">
            <Link
              href="/appointment"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2.5 font-bold text-slate-700 hover:bg-brand-50 hover:text-brand"
            >
              Doctor Consultation
            </Link>
            <Link
              href="/ambulance"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2.5 font-bold text-slate-700 hover:bg-brand-50 hover:text-brand"
            >
              Ambulance 24/7 (জরুরি এম্বুলেন্স)
            </Link>
            <Link
              href="/appointment#diagnostic"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2.5 font-bold text-slate-700 hover:bg-brand-50 hover:text-brand"
            >
              Home Diagnostic Tests
            </Link>
            <Link
              href="/family-care"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2.5 font-bold text-slate-700 hover:bg-brand-50 hover:text-brand"
            >
              Health Care & Protect Plans
            </Link>
            <Link
              href="/track"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2.5 font-bold text-brand bg-brand-50"
            >
              Track Order / Booking
            </Link>
            <Link
              href="/hospitals"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2.5 font-semibold text-slate-600 hover:bg-slate-50"
            >
              Hospital Directory & ICU Bed
            </Link>
            <Link
              href="/partner"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2.5 font-semibold text-slate-600 hover:bg-slate-50"
            >
              Join as Doctor / Partner
            </Link>
          </div>
          <div className="pt-3 border-t border-slate-100">
            <a href={SITE.tel} className="btn-primary w-full text-xs font-bold justify-center">
              <Phone size={14} /> Call Hotline {SITE.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
