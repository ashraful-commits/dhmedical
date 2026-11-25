"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Phone,
  Building2,
  User,
  MapPin,
  Bed,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Ambulance,
  CalendarCheck,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, translateText, CATALOG_TAGS, TOP_SERVICE_MATCHES } from "@/lib/i18nData";
import { SITE, SPECIALTIES, spLabel, imageFallback } from "@/lib/site";

const TOP_MATCH_META = {
  ambulance: { ctaLink: "/ambulance", hotline: true, color: "from-red-600 via-rose-600 to-red-700" },
  medicine: { ctaLink: "/appointment?sp=Medicine", hotline: false, color: "from-[#4B93F5] via-brand to-[#0F63CC]" },
  doctor: { ctaLink: "/appointment", hotline: false, color: "from-[#0A4FA6] via-brand to-[#4B93F5]" },
  hospital: { ctaLink: "/hospitals", hotline: true, color: "from-brand via-slate-800 to-brand-deep" },
  icu: { ctaLink: "/ambulance", hotline: true, color: "from-[#0A4FA6] via-brand to-[#4B93F5]" },
  oxygen: { ctaLink: "/ambulance", hotline: true, color: "from-[#4B93F5] via-brand to-[#0F63CC]" },
};

function getTopServiceMatch(query) {
  if (!query) return null;
  const s = String(query).trim().toLowerCase();

  if (/ambolence|ambulence|ambulance|এম্বুলেন্স|অ্যাম্বুলেন্স|gari|গাড়ি|জরুরি গাড়ি/i.test(s)) return "ambulance";
  if (/medicin|medicine|ঔষধ|মেডিসিন|অভ্যন্তরীণ রোগ|প্রেসক্রিপশন/i.test(s)) return "medicine";
  if (/dockter|dakdar|doctor|ডাক্তার|daktar|সিরিয়াল|চেম্বার/i.test(s)) return "doctor";
  if (/hospatal|aspatal|hospital|হাসপাতাল|bed|বেড|কেবিন|ভর্তি/i.test(s)) return "hospital";
  if (/icu|আইসিইউ|লাইফ সাপোর্ট|ভেন্টিলেটর/i.test(s)) return "icu";
  if (/oxygen|অক্সিজেন|oxigen|oxyzen|শ্বাসকষ্ট/i.test(s)) return "oxygen";

  return null;
}

export default function Catalog({ kind, q0 = "", sp0 = "" }) {
  const { lang, t } = useLanguage();
  const loc = (value) => (value && typeof value === "object" && !Array.isArray(value) ? pick(value, lang) : value);
  const dataText = (item, key) => translateText(item?.[`${key}En`] ?? item?.[key], lang);
  const [q, setQ] = useState(q0);
  const [sp, setSp] = useState(sp0);
  const [items, setItems] = useState(null);
  const [openFloorId, setOpenFloorId] = useState(null);

  useEffect(() => {
    const t = setTimeout(async () => {
      const p = new URLSearchParams({ q, ...(sp && { specialty: sp }) });
      try {
        const r = await fetch(`/api/${kind}?${p}`);
        setItems((await r.json()).items || []);
      } catch {
        setItems([]);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q, sp, kind]);

  const doc = kind === "doctors";
  const topMatchKey = getTopServiceMatch(q);
  const topMatch = topMatchKey ? { ...TOP_SERVICE_MATCHES[topMatchKey], ...TOP_MATCH_META[topMatchKey] } : null;

  function toggleFloor(id) {
    setOpenFloorId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="wrap py-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand" size={20} />
        <input
          className="input !pl-12 w-full"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={
            doc
              ? loc({ bn: "ডাক্তার, মেডিসিন বা হাসপাতালের নাম লিখুন (যেমন: medicin, ambolence, icu)", en: "Search doctor, medicine or hospital name (e.g. medicin, ambolence, icu)" })
              : loc({ bn: "হাসপাতালের নাম, এলাকা বা সেবার নাম লিখুন (যেমন: evercare, bed, icu)", en: "Search hospital name, area or service (e.g. evercare, bed, icu)" })
          }
          aria-label={t("cat_search_aria")}
        />
      </div>

      {/* Quick Search Chips */}
      <div className="-mx-4 mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 pb-1 text-xs">
        <span className="text-slate-500 font-semibold shrink-0">{t("cat_popular")}</span>
        {CATALOG_TAGS.map((tag) => (
          <button
            key={tag.val}
            type="button"
            onClick={() => setQ(tag.val)}
            className="rounded-full bg-slate-100 hover:bg-slate-100 text-brand px-2.5 py-1 font-medium transition-colors shrink-0"
          >
            #{loc(tag.label)}
          </button>
        ))}
      </div>

      {doc && (
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto no-scrollbar px-4 pb-2">
          {[{ key: "", label: { bn: "সব", en: "All" } }, ...SPECIALTIES.map((s) => ({ key: s.key, label: { bn: s.bn, en: s.name } }))].map((s) => (
            <button
              key={s.key}
              onClick={() => setSp(s.key)}
              className={`chip shrink-0 ${sp === s.key ? "chip-on" : ""}`}
            >
              {loc(s.label)}
            </button>
          ))}
        </div>
      )}

      {/* TOP SERVICE MATCH BANNER (Displays first when matching any healthcare service) */}
      {topMatch && (
        <div className="mt-5 rounded-2xl bg-brand p-5 text-white shadow-card animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                <Sparkles size={14} /> {loc(topMatch.badge)}
              </span>
              <h3 className="text-xl sm:text-2xl font-black !text-white mt-1.5">
                {loc(topMatch.title)}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
                {loc(topMatch.desc)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href={topMatch.ctaLink}
                className="btn bg-white text-brand font-black !min-h-[40px] !px-4 text-xs shadow-sm hover:bg-slate-50 flex items-center gap-1.5"
              >
                {loc(topMatch.ctaText)} <ArrowRight size={14} />
              </Link>
              {topMatch.hotline && (
                <a
                  href={SITE.tel}
                  className="btn bg-white/10 text-white font-black !min-h-[40px] !px-4 text-xs border border-white/20 hover:bg-white/20 flex items-center gap-1.5"
                >
                  <Phone size={14} /> {SITE.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items === null &&
          [1, 2, 3].map((i) => <div key={i} className="card h-40 animate-pulse bg-slate-100/50" />)}

        {items?.map((d) => {
          const isFloorOpen = openFloorId === d._id;
          const rawFloorGuide = lang === "en" && d.floorGuideEn ? d.floorGuideEn : d.floorGuide;
          const floorList = Array.isArray(rawFloorGuide)
            ? rawFloorGuide
            : typeof rawFloorGuide === "string"
            ? rawFloorGuide.split("\n").filter(Boolean)
            : [];

          const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            d.name + " " + (d.address || "")
          )}`;

          return (
            <article
              key={d._id}
              className="card flex flex-col justify-between gap-3 border border-slate-200 transition-shadow hover:shadow-md"
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-3">
                  {d.photo || d.logo ? (
                    <img
                      src={d.photo || d.logo}
                      alt={`${dataText(d, "name")} — DH Medical Support listing`}
                      onError={imageFallback(doc ? "doctor" : "hospital")}
                      className="h-16 w-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <span className="grid h-16 w-16 place-items-center rounded-xl bg-slate-100 text-brand shrink-0">
                      {doc ? <User size={28} /> : <Building2 size={28} />}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-head text-lg font-bold leading-tight text-brand">{dataText(d, "name")}</h3>
                    {doc ? (
                      <p className="text-xs text-slate-600 mt-0.5">{dataText(d, "degree")}</p>
                    ) : (
                      <div className="mt-1 flex items-start gap-1 text-xs text-slate-600">
                        <MapPin size={13} className="shrink-0 text-red mt-0.5" />
                        <span className="line-clamp-2">{dataText(d, "address")}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Doctor details */}
                {doc && (
                  <ul className="mt-3 space-y-1 text-xs text-slate-700 border-t border-slate-100 pt-2.5">
                    {d.specialty && (
                      <li>
                        <b className="text-brand">{t("cat_specialty")}</b> {spLabel(d.specialty, lang)}
                      </li>
                    )}
                    {d.hospital && (
                      <li>
                        <b className="text-brand">{t("cat_hospital")}</b> {dataText(d, "hospital")}
                      </li>
                    )}
                    {d.schedule && (
                      <li>
                        <b className="text-brand">{t("cat_schedule")}</b> {dataText(d, "schedule")}
                      </li>
                    )}
                    {d.fee && (
                      <li>
                        <b className="text-brand">{t("cat_fee")}</b>{" "}
                        <span className="font-bold text-red">{dataText(d, "fee")}</span>
                      </li>
                    )}
                  </ul>
                )}

                {/* Hospital details: Bed count, Free Map, Floor directory */}
                {!doc && (
                  <div className="mt-3 space-y-2 border-t border-slate-100 pt-2.5 text-xs">
                    {/* Bed capacity badge */}
                    {d.totalBeds && (
                      <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 font-bold text-emerald-800 border border-emerald-200">
                        <Bed size={15} className="text-emerald-600 shrink-0" />
                        <span>{t("cat_beds")} {dataText(d, "totalBeds")}</span>
                      </div>
                    )}

                    {/* Services list */}
                    {d.services && (
                      <p className="text-slate-600 leading-relaxed">
                        <b className="text-brand">{t("cat_services")}</b> {dataText(d, "services")}
                      </p>
                    )}

                    {/* Free Google Maps directions button */}
                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={d.mapUrl || mapSearchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-brand font-bold hover:underline"
                      >
                        <MapPin size={13} className="text-red" />
                        {t("cat_map")} <ExternalLink size={11} />
                      </a>
                    </div>

                    {/* Floor & Room Directory (কয়তলায় কোন রুম আছে) */}
                    {floorList.length > 0 && (
                      <div className="rounded-xl border border-brand/20 bg-slate-100/30 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleFloor(d._id)}
                          className="flex w-full items-center justify-between p-2.5 text-xs font-bold text-brand hover:bg-slate-100/60 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Layers size={14} className="text-brand" />
                            {t("cat_floor")}
                          </span>
                          {isFloorOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {isFloorOpen && (
                          <div className="border-t border-brand/15 bg-white p-3 space-y-1.5 animate-fadeIn">
                            {floorList.map((floor, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 border-b border-slate-100 pb-1 last:border-0 last:pb-0"
                              >
                                <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-brand text-[10px] font-bold text-white mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="text-[11px] text-slate-700 leading-tight">
                                  {translateText(floor, lang)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex gap-2 pt-2 border-t border-slate-100">
                {doc && (
                  <Link
                    href={`/appointment?doctor=${encodeURIComponent(
                      d.name
                    )}&hospital=${encodeURIComponent(d.hospital || "")}&sp=${encodeURIComponent(
                      d.specialty || ""
                    )}`}
                    className="btn-primary flex-1 !min-h-[38px] !px-3 text-xs font-bold"
                  >
                    {t("cat_appointment")}
                  </Link>
                )}
                {!doc && (
                  <Link
                    href={`/appointment?hospital=${encodeURIComponent(d.name)}`}
                    className="btn-primary flex-1 !min-h-[38px] !px-3 text-xs font-bold"
                  >
                    {t("cat_admission")}
                  </Link>
                )}
                <a
                  href={d.phone ? `tel:${d.phone}` : SITE.tel}
                  className="btn-outline !min-h-[38px] !px-3.5 !text-brand"
                  aria-label={t("cat_call")}
                  title={t("cat_call")}
                >
                  <Phone size={16} />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {items?.length === 0 && (
        <div className="card mt-6 text-center py-10">
          <p className="text-lg font-bold text-ink-dark">{t("cat_empty_title")}</p>
          <p className="mt-1 text-sm text-slate-600">{t("cat_empty_sub")}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href={SITE.tel} className="btn-primary inline-flex items-center gap-2">
              <Phone size={18} />
              {t("cat_hotline")} {SITE.phone}
            </a>
            <Link href="/ambulance" className="btn-outline !border-brand/40 !text-brand hover:!bg-brand-50">
              {t("cat_amb_booking")}
            </Link>
            <Link href="/appointment" className="btn-outline">
              {t("cat_apt")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
