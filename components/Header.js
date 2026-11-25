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
      if (e.target?.closest?.("[data-more-trigger]")) return;
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[1000] border-b border-brand-100 bg-white/95 backdrop-blur-md shadow-[0_2px_16px_-4px_rgba(22,120,242,0.16)]">
      <div className="flex h-7 items-center justify-center bg-gradient-to-r from-[#4B93F5] via-brand to-[#0F63CC] px-3 text-center text-[10px] font-bold text-white sm:h-8 sm:text-xs">
        <a href={SITE.tel} className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <Phone size={12} className="animate-pulse" />
          <span>{t("announcement")}</span>
          <span className="hidden sm:inline">({SITE.phone})</span>
        </a>
      </div>
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-2 px-4 sm:h-[72px] sm:gap-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="DH Medical Support Home"
          onClick={() => setOpen(false)}
          className="shrink-0 justify-self-start transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <Logo compact />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex lg:justify-self-center" aria-label="Main Navigation">
          <Link
            href="/appointment"
            className={`group flex items-center gap-1.5 rounded-lg px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
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
            className={`group flex items-center gap-1.5 rounded-lg px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all relative ${
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
            className="flex items-center gap-1.5 rounded-lg px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold text-slate-700 hover:text-brand hover:bg-brand-50/70 whitespace-nowrap shrink-0 transition-all"
          >
            <FileSpreadsheet size={16} className="text-brand" />
            <span className="whitespace-nowrap">{t("nav_diagnostic")}</span>
          </Link>

          <Link
            href="/family-care"
            className={`group flex items-center gap-1.5 rounded-lg px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
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
            className={`flex items-center gap-1.5 rounded-lg px-2.5 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
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

        </nav>

        {/* Right CTA / Language Switcher / Emergency Phone */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 lg:justify-self-end">
          <div className="relative shrink-0" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              aria-label={t("nav_more")}
              data-more-trigger
              className={`inline-flex min-h-[38px] items-center gap-1 border border-brand bg-brand px-2.5 py-2 text-[13px] font-bold whitespace-nowrap text-white shadow-sm transition-all hover:bg-brand-dark ${
                moreOpen ? "ring-2 ring-brand/25" : ""
              }`}
            >
              <Globe size={16} />
              <span>{t("nav_more") || (lang === "bn" ? "অন্যান্য" : "More")}</span>
              <ChevronDown
                size={14}
                className={`text-white transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {moreOpen && (
              <div data-more-panel className="fixed right-4 top-[92px] z-[1200] w-72 max-w-[calc(100vw-2rem)] animate-fadeIn border border-slate-200/90 bg-white p-2.5 shadow-2xl sm:right-6 sm:top-[104px]">
                <div className="mb-1 border-b border-slate-100 px-3 py-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    {t("nav_additional_services")}
                  </span>
                </div>

                {[
                  { href: "/hospitals", label: t("nav_hospitals"), note: t("nav_hospitals_note"), Icon: Building2 },
                  { href: "/partner", label: t("nav_join_doctor"), note: t("nav_partner_note"), Icon: Award },
                  { href: "/partner#ambulance", label: t("nav_join_ambulance"), note: t("nav_ambulance_partner_note"), Icon: Ambulance },
                  { href: "/districts", label: t("nav_districts"), note: t("nav_districts_note"), Icon: MapPin },
                  { href: "/prescription", label: t("nav_prescription"), note: t("nav_prescription_note"), Icon: FileSpreadsheet },
                  { href: "/feedback", label: t("nav_feedback"), note: t("nav_feedback_note"), Icon: Users },
                ].map(({ href, label, note, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMoreOpen(false)}
                    className="group flex items-center gap-3 p-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand"
                  >
                    <span className="grid h-8 w-8 place-items-center bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-ink-dark group-hover:text-brand">{label}</span>
                      <span className="block truncate text-[11px] text-slate-400">{note}</span>
                    </span>
                  </Link>
                ))}

                <div className="my-1.5 border-t border-slate-100" />
                <Link
                  href="/admin"
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 p-2 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-50 hover:text-brand"
                >
                  <ShieldCheck size={15} />
                  <span>{t("nav_admin")}</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/feedback"
            className="btn-primary hidden !min-h-[38px] !px-4 !text-xs xl:inline-flex"
          >
            <MessageCircle size={15} />
            <span>{t("nav_feedback")}</span>
          </Link>

          {/* i18n Language Toggle Pill */}
          <div className="hidden sm:flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200/90 shadow-inner shrink-0">
            <button
              onClick={() => setLang("bn")}
              className={`rounded-lg px-2 py-1 text-xs font-bold transition-all whitespace-nowrap sm:px-2.5 ${
                lang === "bn"
                  ? "bg-brand text-white shadow-sm"
                  : "text-slate-600 hover:text-ink-dark"
              }`}
              title={t("header_view_bn")}
            >
              বাং
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-lg px-2 py-1 text-xs font-bold transition-all whitespace-nowrap sm:px-2.5 ${
                lang === "en"
                  ? "bg-brand text-white shadow-sm"
                  : "text-slate-600 hover:text-ink-dark"
              }`}
              title={t("header_view_en")}
            >
              EN
            </button>
          </div>

          {/* Mobile Animated Hamburger Button */}
          <button
            className={`grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-lg border transition-all lg:hidden ${
              open
                ? "border-brand bg-brand text-white shadow-sm"
                : "border-slate-200 bg-white text-ink-dark hover:bg-slate-50"
            }`}
            aria-label={t("nav_more")}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER: COMPLETE LUXURY HEALTHCARE DESIGN */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[92px] z-[1050] bg-slate-900/40 backdrop-blur-sm lg:hidden animate-fadeIn sm:top-[104px]">
          <div className="h-full overflow-y-auto bg-white border-t border-slate-100 px-4 py-5 shadow-2xl flex flex-col justify-between max-w-lg mx-auto">
            
            <div className="space-y-4">
              {/* Top Row: Language Toggle + Emergency Hotline Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Globe size={15} className="text-brand" />
                  <span>{t("header_language")}</span>
                </div>
                <div className="flex items-center rounded-lg bg-white p-0.5 border border-slate-200 shadow-sm">
                  <button
                    onClick={() => setLang("bn")}
                    className={`rounded-lg px-2 py-1 text-xs font-bold transition-all ${
                      lang === "bn" ? "bg-brand text-white" : "text-slate-600"
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`rounded-lg px-2 py-1 text-xs font-bold transition-all ${
                      lang === "en" ? "bg-brand text-white" : "text-slate-600"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* 1. Emergency Quick Callout Banner at Top of Mobile Menu */}
              <div className="rounded-2xl bg-gradient-to-br from-[#4B93F5] via-brand to-[#0F63CC] p-4 text-white shadow-card">
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
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
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
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
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
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
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
                    <div className="min-w-0 flex-1">
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
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
