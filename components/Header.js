"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Phone,
  ChevronDown,
  Ambulance,
  Stethoscope,
  Building2,
  Users,
  Search,
  ShieldCheck,
  Activity,
  FileSpreadsheet,
  Navigation,
  MapPin,
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
  HeartPulse,
  Award,
  ChevronRight,
  X,
  Menu,
  Globe,
} from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close dropdown on outside click
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
    <header className="sticky top-0 z-[100] border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(15,82,186,0.04)]">
      <div className="wrap flex h-16 sm:h-18 items-center justify-between gap-3 sm:gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="DH Medical Support Home"
          onClick={() => setOpen(false)}
          className="shrink-0 transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex" aria-label="Main Navigation">
          <Link
            href="/appointment"
            className={`group flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
              pathname === "/appointment" || pathname === "/doctors"
                ? "bg-brand text-white shadow-sm"
                : "text-slate-700 hover:text-brand hover:bg-brand-50/70"
            }`}
          >
            <Stethoscope
              size={16}
              className={pathname === "/appointment" || pathname === "/doctors" ? "text-white" : "text-brand"}
            />
            <span className="whitespace-nowrap">{t("nav_consultation")}</span>
          </Link>

          <Link
            href="/ambulance"
            className={`group flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all relative ${
              pathname === "/ambulance"
                ? "bg-brand text-white shadow-sm"
                : "text-slate-700 hover:text-brand hover:bg-brand-50/70"
            }`}
          >
            <Ambulance
              size={16}
              className={pathname === "/ambulance" ? "text-white" : "text-brand"}
            />
            <span className="whitespace-nowrap">{t("nav_ambulance")}</span>
            <span className="flex h-2 w-2 relative ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </Link>

          <Link
            href="/appointment#diagnostic"
            className="flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold text-slate-700 hover:text-brand hover:bg-brand-50/70 whitespace-nowrap shrink-0 transition-all"
          >
            <FileSpreadsheet size={16} className="text-brand" />
            <span className="whitespace-nowrap">{t("nav_diagnostic")}</span>
          </Link>

          <Link
            href="/family-care"
            className={`group flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
              pathname === "/family-care"
                ? "bg-brand text-white shadow-sm"
                : "text-slate-700 hover:text-brand hover:bg-brand-50/70"
            }`}
          >
            <HeartPulse
              size={16}
              className={pathname === "/family-care" ? "text-white" : "text-brand"}
            />
            <span className="whitespace-nowrap">{t("nav_plans")}</span>
          </Link>

          <Link
            href="/track"
            className={`flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
              pathname === "/track"
                ? "bg-brand text-white shadow-sm"
                : "text-slate-700 hover:text-brand hover:bg-brand-50/70"
            }`}
          >
            <Navigation
              size={16}
              className={pathname === "/track" ? "text-white" : "text-brand"}
            />
            <span className="whitespace-nowrap">{t("nav_track")}</span>
          </Link>

          {/* More Flyout Menu */}
          <div className="relative shrink-0" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1 rounded-xl px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
                moreOpen
                  ? "bg-brand-50 text-brand"
                  : "text-slate-700 hover:text-brand hover:bg-brand-50/70"
              }`}
              aria-expanded={moreOpen}
            >
              <span className="whitespace-nowrap">{t("nav_more")}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${moreOpen ? "rotate-180 text-brand" : "text-slate-400"}`}
              />
            </button>

            {/* Desktop Mega Flyout Card */}
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-2xl animate-fadeIn z-[200]">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    Additional Services
                  </span>
                </div>

                <Link
                  href="/hospitals"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors group"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-ink-dark group-hover:text-brand block">
                      {t("nav_hospitals")}
                    </span>
                    <span className="text-[11px] text-slate-400">বারডেম, স্কয়ার, এভারকেয়ার বেড গাইড</span>
                  </div>
                </Link>

                <Link
                  href="/partner"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors group"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                    <Award size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-ink-dark group-hover:text-brand block">
                      {t("nav_join_doctor")}
                    </span>
                    <span className="text-[11px] text-slate-400">BMDC রেজিস্টার্ড চিকিৎসক নেটওয়ার্ক</span>
                  </div>
                </Link>

                <Link
                  href="/partner#ambulance"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors group"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                    <Ambulance size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-ink-dark group-hover:text-brand block">
                      {t("nav_join_ambulance")}
                    </span>
                    <span className="text-[11px] text-slate-400">অ্যাম্বুলেন্স মালিক ও ড্রাইভার পোর্টাল</span>
                  </div>
                </Link>

                <Link
                  href="/districts"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors group"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-ink-dark group-hover:text-brand block">
                      {lang === "bn" ? "৬৪ জেলা ও এলাকা" : "64 Districts & Areas"}
                    </span>
                    <span className="text-[11px] text-slate-400">কুমিল্লা, ঢাকা, চট্টগ্রাম ও সব উপজেলা</span>
                  </div>
                </Link>

                <Link
                  href="/prescription"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors group"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                    <FileSpreadsheet size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-ink-dark group-hover:text-brand block">
                      {lang === "bn" ? "প্রেসক্রিপশন OCR" : "Prescription OCR"}
                    </span>
                    <span className="text-[11px] text-slate-400">ছবি থেকে ঔষধের টেবিল ও শেয়ার লিংক</span>
                  </div>
                </Link>

                <div className="my-1.5 border-t border-slate-100" />

                <Link
                  href="/feedback"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand transition-colors group"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-brand group-hover:text-white transition-colors">
                    <Users size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-ink-dark group-hover:text-brand block">
                      {t("nav_feedback")}
                    </span>
                    <span className="text-[11px] text-slate-400">মতামত ও সরাসরি হেল্পডেস্ক</span>
                  </div>
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2 text-xs font-semibold text-slate-400 hover:bg-slate-50 hover:text-brand transition-colors"
                >
                  <ShieldCheck size={15} />
                  <span>{t("nav_admin")}</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA / Language Switcher / Emergency Phone */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* i18n Language Toggle Pill */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200/90 shadow-inner shrink-0">
            <button
              onClick={() => setLang("bn")}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all whitespace-nowrap ${
                lang === "bn"
                  ? "bg-brand text-white shadow-sm"
                  : "text-slate-600 hover:text-ink-dark"
              }`}
              title="বাংলায় দেখুন"
            >
              বাং
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all whitespace-nowrap ${
                lang === "en"
                  ? "bg-brand text-white shadow-sm"
                  : "text-slate-600 hover:text-ink-dark"
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          <a
            href={SITE.tel}
            className="hidden xl:inline-flex items-center gap-1.5 rounded-xl bg-brand-50/80 px-3 py-2 text-xs font-bold text-brand hover:bg-brand-100 transition-colors border border-brand-100 whitespace-nowrap shrink-0"
          >
            <Phone size={14} className="text-brand animate-pulse shrink-0" />
            <span className="whitespace-nowrap">{SITE.phone}</span>
          </a>

          <Link
            href="/ambulance"
            className="btn-primary !min-h-[38px] !px-3.5 !py-1 text-xs font-bold tracking-tight shadow-sm hover:shadow-hover whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
          >
            <Ambulance size={15} className="shrink-0" />
            <span className="whitespace-nowrap">{t("nav_book_amb")}</span>
          </Link>

          {/* Mobile Animated Hamburger Button */}
          <button
            className={`grid h-10 w-10 place-items-center rounded-xl border transition-all lg:hidden ${
              open
                ? "border-brand bg-brand text-white shadow-sm"
                : "border-slate-200 bg-white text-ink-dark hover:bg-slate-50"
            }`}
            aria-label="Navigation Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER: COMPLETE LUXURY HEALTHCARE DESIGN */}
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-[150] bg-slate-900/40 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="h-full overflow-y-auto bg-white border-t border-slate-100 px-4 py-5 shadow-2xl flex flex-col justify-between max-w-lg mx-auto">
            
            <div className="space-y-4">
              {/* Top Row: Language Toggle + Emergency Hotline Header */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Globe size={15} className="text-brand" />
                  <span>ভাষা / Language:</span>
                </div>
                <div className="flex items-center rounded-xl bg-white p-0.5 border border-slate-200 shadow-sm">
                  <button
                    onClick={() => setLang("bn")}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                      lang === "bn" ? "bg-brand text-white" : "text-slate-600"
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                      lang === "en" ? "bg-brand text-white" : "text-slate-600"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* 1. Emergency Quick Callout Banner at Top of Mobile Menu */}
              <div className="rounded-2xl bg-gradient-to-br from-brand via-brand-dark to-[#082d6b] p-4 text-white shadow-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-100">
                      {lang === "bn" ? "২৪ ঘণ্টা সেন্ট্রাল হেল্পলাইন" : "24/7 Central Helpline"}
                    </span>
                  </div>
                  <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                    {lang === "bn" ? "সক্রিয়" : "ACTIVE"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <a
                    href={SITE.tel}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-white text-brand px-3 py-2.5 text-xs font-black shadow-sm active:scale-95 transition-transform"
                  >
                    <Phone size={14} />
                    <span>{t("nav_call")}</span>
                  </a>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-white/15 text-white hover:bg-white/25 px-3 py-2.5 text-xs font-bold border border-white/20 active:scale-95 transition-transform"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* 2. Structured, Rich Navigation Cards */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                  {lang === "bn" ? "প্রধান সেবাসমূহ" : "CORE SERVICES"}
                </span>

                {/* Item 1: Ambulance */}
                <Link
                  href="/ambulance"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 hover:border-brand/40 hover:bg-brand-50/50 shadow-clean transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                      <Ambulance size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-ink-dark group-hover:text-brand">
                          {t("nav_ambulance")}
                        </span>
                        <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 text-[9.5px] font-black uppercase">
                          {lang === "bn" ? "১৫-২৫ মিনিট" : "15-25 MIN"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === "bn" ? "AC, অক্সিজেন, ICU ও নবজাতক লাইফ সাপোর্ট বহর" : "AC, Oxygen, ICU & NICU life support"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-brand transition-colors shrink-0" />
                </Link>

                {/* Item 2: Doctor Consultation */}
                <Link
                  href="/appointment"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 hover:border-brand/40 hover:bg-brand-50/50 shadow-clean transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                      <Stethoscope size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-ink-dark group-hover:text-brand">
                          {t("nav_consultation")}
                        </span>
                        <span className="rounded-md bg-brand-50 text-brand px-1.5 py-0.2 text-[9.5px] font-black uppercase">
                          BMDC
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === "bn" ? "১০ মিনিটে ভিডিও কল ও প্রখ্যাত অধ্যাপকদের সিরিয়াল" : "Instant video calls & chamber serials"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-brand transition-colors shrink-0" />
                </Link>

                {/* Item 3: Home Diagnostic */}
                <Link
                  href="/appointment#diagnostic"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 hover:border-brand/40 hover:bg-brand-50/50 shadow-clean transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                      <FileSpreadsheet size={22} />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-ink-dark group-hover:text-brand block">
                        {t("nav_diagnostic")}
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === "bn" ? "বাসায় এসে রক্তের নমুনা সংগ্রহ ও ডিজিটাল রিপোর্ট" : "Doorstep sample collection & digital report"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-brand transition-colors shrink-0" />
                </Link>

                {/* Item 4: Health Plans */}
                <Link
                  href="/family-care"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 hover:border-brand/40 hover:bg-brand-50/50 shadow-clean transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors shrink-0">
                      <HeartPulse size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-ink-dark group-hover:text-brand">
                          {t("nav_plans")}
                        </span>
                        <span className="rounded-md bg-brand-50 text-brand px-1.5 py-0.2 text-[9.5px] font-black uppercase">
                          {lang === "bn" ? "৳১,০০০+/মাসিক" : "৳1,000+/MO"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lang === "bn" ? "প্রবাসী ভাই ও দেশে থাকা মা-বাবার সার্বক্ষণিক সুরক্ষা" : "Full health protection for your family back home"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-brand transition-colors shrink-0" />
                </Link>

                {/* Item 5: Track Order */}
                <Link
                  href="/track"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl border-2 border-brand/30 bg-brand-50/60 p-3.5 shadow-clean transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white shadow-sm shrink-0">
                      <Navigation size={22} />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-brand block">
                        {t("nav_track")}
                      </span>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {lang === "bn" ? "অ্যাম্বুলেন্সের লাইভ অবস্থান ও সিরিয়াল স্ট্যাটাস" : "Live ambulance location & serial status"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-brand shrink-0" />
                </Link>
              </div>

              {/* 3. Secondary Links Grid */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-2">
                  {lang === "bn" ? "অন্যান্য সেবা ও পার্টনার" : "MORE SERVICES & PARTNERS"}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/hospitals"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-ink-dark hover:border-brand/40 hover:bg-white flex items-center gap-2"
                  >
                    <Building2 size={16} className="text-brand" />
                    <span>{t("nav_hospitals")}</span>
                  </Link>

                  <Link
                    href="/partner"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-ink-dark hover:border-brand/40 hover:bg-white flex items-center gap-2"
                  >
                    <Users size={16} className="text-brand" />
                    <span>{t("nav_join_doctor")}</span>
                  </Link>

                  <Link
                    href="/districts"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-ink-dark hover:border-brand/40 hover:bg-white flex items-center gap-2"
                  >
                    <MapPin size={16} className="text-brand" />
                    <span>{lang === "bn" ? "জেলা ও এলাকা" : "Districts"}</span>
                  </Link>

                  <Link
                    href="/prescription"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-ink-dark hover:border-brand/40 hover:bg-white flex items-center gap-2"
                  >
                    <FileSpreadsheet size={16} className="text-brand" />
                    <span>{lang === "bn" ? "প্রেসক্রিপশন" : "Prescription"}</span>
                  </Link>

                  <Link
                    href="/feedback"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-ink-dark hover:border-brand/40 hover:bg-white flex items-center gap-2"
                  >
                    <MessageCircle size={16} className="text-brand" />
                    <span>{t("nav_feedback")}</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-500 hover:border-brand/40 hover:bg-white flex items-center gap-2"
                  >
                    <ShieldCheck size={16} className="text-slate-400" />
                    <span>{t("nav_admin")}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Callout in Drawer */}
            <div className="pt-6 pb-2">
              <a
                href={SITE.tel}
                className="btn-primary w-full !min-h-[48px] text-sm font-black justify-center shadow-md"
              >
                <Phone size={16} /> {lang === "bn" ? "কল করুন" : "Call Hotline"} {SITE.phone}
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
