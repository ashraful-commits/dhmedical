"use client";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, ShieldCheck, ExternalLink, Globe, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { SITE, SPECIALTIES, DISTRICTS } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import { DISTRICT_EN } from "@/lib/i18nData";

export default function Footer() {
  const { lang, t } = useLanguage();

  const social = [
    { Icon: Globe, href: SITE.whatsapp, label: "Web" },
    { Icon: MessageCircle, href: SITE.whatsapp, label: "WhatsApp" },
    { Icon: Phone, href: SITE.tel, label: "Phone" },
  ];

  return (
    <footer className="mt-20 bg-brand text-white">
      <div className="wrap grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm font-medium leading-relaxed text-white/85">
            {t("footer_tagline")}. {t("footer_desc")}
          </p>
          <div className="flex items-center gap-2">
            {social.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="grid h-9 w-9 place-items-center border border-white/30 text-white transition-colors hover:bg-white hover:text-brand"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-white/85">
            <ShieldCheck size={16} />
            <span>{t("footer_bmdc_badge")}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            {t("footer_hotline_label")}
          </h4>
          <a
            href={SITE.tel}
            className="inline-flex items-center gap-2 text-xl font-black text-white hover:text-care-200 transition-colors"
          >
            <Phone size={20} className="shrink-0" />
            <span>{SITE.phone}</span>
          </a>
          <div className="space-y-2 text-xs font-medium text-white/85">
            <p className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>{t("footer_desc")}</span>
            </p>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
              <MessageCircle size={14} className="shrink-0" />
              <span>{t("nav_feedback")}</span>
              <ExternalLink size={12} />
            </a>
          </div>
          <ul className="space-y-2 text-xs font-medium text-white/85">
            <li><Link href="/appointment" className="hover:text-white transition-colors block py-0.5">{t("nav_consultation")}</Link></li>
            <li><Link href="/ambulance" className="hover:text-white transition-colors block py-0.5">{t("nav_ambulance")}</Link></li>
            <li><Link href="/appointment#diagnostic" className="hover:text-white transition-colors block py-0.5">{t("nav_diagnostic")}</Link></li>
            <li><Link href="/family-care" className="hover:text-white transition-colors block py-0.5">{t("nav_plans")}</Link></li>
            <li><Link href="/prescription" className="hover:text-white transition-colors block py-0.5">{t("nav_prescription")}</Link></li>
            <li><Link href="/track" className="hover:text-white font-bold transition-colors block py-0.5">{t("nav_track")}</Link></li>
            <li><Link href="/hospitals" className="hover:text-white transition-colors block py-0.5">{t("nav_hospitals")}</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            {t("footer_specialties")}
          </h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-medium text-white/85">
            {SPECIALTIES.map((s) => (
              <Link
                key={s.key}
                href={`/doctors?sp=${encodeURIComponent(s.key)}`}
                className="hover:text-white transition-colors truncate py-0.5"
              >
                {lang === "bn" ? s.bn : s.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/20 pt-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-2">
              {t("footer_partner_menu")}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-white/85">
              <li><Link href="/partner" className="hover:text-white transition-colors block py-0.5">{t("nav_join_doctor")}</Link></li>
              <li><Link href="/partner#ambulance" className="hover:text-white transition-colors block py-0.5">{t("nav_join_ambulance")}</Link></li>
              <li><Link href="/feedback" className="hover:text-white transition-colors block py-0.5">{t("nav_feedback")}</Link></li>
              <li><Link href="/admin" className="text-white/60 hover:text-white transition-colors block py-0.5">{t("nav_admin")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            {t("plans_subscribe")}
          </h4>
          <form className="flex items-stretch border border-white/40 bg-white/10">
            <input
              type="email"
              required
              aria-label={t("plans_subscribe")}
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-xs text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              className="grid w-12 place-items-center bg-white text-brand transition-colors hover:bg-care-100"
              aria-label={t("plans_subscribe")}
            >
              <ArrowRight size={17} />
            </button>
          </form>
          <div>
            <span className="text-[11px] font-bold text-white/80 block mb-2">
              {t("footer_coverage")}
            </span>
            <div className="flex flex-wrap gap-1">
              {DISTRICTS.slice(0, 18).map((d) => (
                <Link
                  key={d}
                  href={`/districts?q=${encodeURIComponent(d)}`}
                  className="border border-white/25 px-1.5 py-0.5 text-[10.5px] text-white/85 hover:bg-white hover:text-brand"
                >
                  {lang === "bn" ? d : DISTRICT_EN[d] || d}
                </Link>
              ))}
            </div>
            <Link
              href="/districts"
              className="mt-3 inline-block text-[11px] font-bold text-white hover:underline"
            >
              {t("footer_find_district")} →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 bg-brand-dark py-4">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-white/80">
          <p>
            © {new Date().getFullYear()} D H Medical Support. Central Healthcare & Ambulance Coordination Platform Bangladesh.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/ambulance" className="hover:text-white transition-colors">{t("nav_ambulance")}</Link>
            <Link href="/appointment" className="hover:text-white transition-colors">{t("nav_consultation")}</Link>
            <Link href="/family-care" className="hover:text-white transition-colors">{t("nav_plans")}</Link>
            <Link href="/track" className="hover:text-white transition-colors font-bold">{t("nav_track")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
