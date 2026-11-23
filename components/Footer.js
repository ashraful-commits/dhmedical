"use client";
import Link from "next/link";
import { Phone, MapPin, Ambulance, Stethoscope, ShieldCheck, HeartPulse, ExternalLink } from "lucide-react";
import Logo from "./Logo";
import { SITE, SPECIALTIES, DISTRICTS } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#F8FAFC] text-ink-light">
      {/* Upper Main Footer Grid */}
      <div className="wrap grid gap-10 py-12 md:grid-cols-12">
        {/* Brand & Hotline Column */}
        <div className="space-y-4 md:col-span-4">
          <Logo />
          <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-sm">
            {t("footer_tagline")}. {t("footer_desc")}
          </p>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-clean space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t("footer_hotline_label")}
            </span>
            <a
              href={SITE.tel}
              className="inline-flex items-center gap-2 text-xl font-black text-brand hover:text-brand-dark transition-colors"
            >
              <Phone size={20} className="text-brand shrink-0" />
              <span>{SITE.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck size={16} className="text-brand" />
            <span>{t("footer_bmdc_badge")}</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3 md:col-span-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink-dark">
            {t("footer_main_services")}
          </h4>
          <ul className="space-y-2 text-xs font-medium text-slate-600">
            <li>
              <Link href="/appointment" className="hover:text-brand transition-colors block py-0.5">
                {t("nav_consultation")}
              </Link>
            </li>
            <li>
              <Link href="/ambulance" className="hover:text-brand transition-colors block py-0.5">
                {t("nav_ambulance")}
              </Link>
            </li>
            <li>
              <Link href="/appointment#diagnostic" className="hover:text-brand transition-colors block py-0.5">
                {t("nav_diagnostic")}
              </Link>
            </li>
            <li>
              <Link href="/family-care" className="hover:text-brand transition-colors block py-0.5">
                {t("nav_plans")}
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-brand font-bold text-brand transition-colors block py-0.5">
                {t("nav_track")}
              </Link>
            </li>
            <li>
              <Link href="/hospitals" className="hover:text-brand transition-colors block py-0.5">
                {t("nav_hospitals")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Clinical Specialties Column */}
        <div className="space-y-3 md:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink-dark">
            {t("footer_specialties")}
          </h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-medium text-slate-600">
            {SPECIALTIES.map((s) => (
              <Link
                key={s.key}
                href={`/doctors?sp=${encodeURIComponent(s.key)}`}
                className="hover:text-brand transition-colors truncate py-0.5"
              >
                {lang === "bn" ? s.bn : s.name}
              </Link>
            ))}
          </div>
        </div>

        {/* For Partners & App Column */}
        <div className="space-y-3 md:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink-dark">
            {t("footer_partner_menu")}
          </h4>
          <ul className="space-y-2 text-xs font-medium text-slate-600">
            <li>
              <Link href="/partner" className="hover:text-brand transition-colors block py-0.5">
                {t("nav_join_doctor")}
              </Link>
            </li>
            <li>
              <Link href="/partner#ambulance" className="hover:text-brand transition-colors block py-0.5">
                {t("nav_join_ambulance")}
              </Link>
            </li>
            <li>
              <Link href="/feedback" className="hover:text-brand transition-colors block py-0.5">
                {t("nav_feedback")}
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-slate-400 hover:text-brand transition-colors block py-0.5">
                {t("nav_admin")}
              </Link>
            </li>
          </ul>

          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
              {lang === "bn" ? "সারাদেশে ৬৪ জেলায় কভারেজ" : "Coverage Across 64 Districts"}
            </span>
            <div className="flex flex-wrap gap-1 text-[10.5px]">
              {DISTRICTS.slice(0, 8).map((d) => (
                <span key={d} className="rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-slate-600">
                  {d}
                </span>
              ))}
              <span className="rounded-md bg-brand-50 text-brand px-1.5 py-0.5 font-bold">
                {lang === "bn" ? "+৫৬ জেলা" : "+56 Districts"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-slate-200/80 bg-white py-4">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} D H Medical Support. Central Healthcare & Ambulance Coordination Platform Bangladesh.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/ambulance" className="hover:text-brand transition-colors">{t("nav_ambulance")}</Link>
            <Link href="/appointment" className="hover:text-brand transition-colors">{t("nav_consultation")}</Link>
            <Link href="/family-care" className="hover:text-brand transition-colors">{t("nav_plans")}</Link>
            <Link href="/track" className="hover:text-brand transition-colors text-brand font-bold">{t("nav_track")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
