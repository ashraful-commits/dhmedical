"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Building2, Bed, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { imageFallback } from "@/lib/site";

export const PARTNER_HOSPITALS = [
  {
    name: "বারডেম জেনারেল হাসপাতাল (BIRDEM)",
    nameEn: "BIRDEM General Hospital",
    beds: "৭০০ বেড (৫০টি ICU)",
    bedsEn: "700 beds (50 ICU)",
    location: "শাহবাগ, ঢাকা",
    locationEn: "Shahbag, Dhaka",
    phone: "01713-047461",
    badge: "ডায়াবেটিস ও স্পেশালাইজড",
    badgeEn: "Diabetes & Specialized Care",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop&q=80",
    query: "বারডেম জেনারেল হাসপাতাল (BIRDEM)",
  },
  {
    name: "জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল",
    nameEn: "National Institute of Cardiovascular Diseases & Hospital",
    beds: "১২৫০ বেড (৮০টি ICU)",
    bedsEn: "1,250 beds (80 ICU)",
    location: "শেরেবাংলা নগর, ঢাকা",
    locationEn: "Sher-e-Bangla Nagar, Dhaka",
    phone: "01713-377775",
    badge: "জাতীয় রেফারাল সেন্টার",
    badgeEn: "National Referral Center",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
    query: "জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল",
  },
  {
    name: "ল্যাবএইড স্পেশালাইজড হাসপাতাল (Labaid)",
    nameEn: "Labaid Specialized Hospital",
    beds: "৩৫০ বেড (৩৫টি ICU)",
    bedsEn: "350 beds (35 ICU)",
    location: "ধানমন্ডি, ঢাকা",
    locationEn: "Dhanmondi, Dhaka",
    phone: "01713-333337",
    badge: "কার্ডিয়াক ও মাল্টিডিসিপ্লিনারি",
    badgeEn: "Cardiac & Multidisciplinary",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80",
    query: "ল্যাবএইড স্পেশালাইজড হাসপাতাল (Labaid)",
  },
  {
    name: "ইউনাইটেড হাসপাতাল লিমিটেড (United)",
    nameEn: "United Hospital Limited",
    beds: "৫০০ বেড (৫০টি CCU/ICU)",
    bedsEn: "500 beds (50 CCU/ICU)",
    location: "গুলশান-২, ঢাকা",
    locationEn: "Gulshan-2, Dhaka",
    phone: "01914-001234",
    badge: "আন্তর্জাতিক মানসম্পন্ন",
    badgeEn: "International Standard Care",
    img: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&auto=format&fit=crop&q=80",
    query: "ইউনাইটেড হাসপাতাল লিমিটেড (United)",
  },
  {
    name: "ইবনে সিনা স্পেশালাইজড হাসপাতাল",
    nameEn: "Ibn Sina Specialized Hospital",
    beds: "৩০০ বেড (৩০টি ICU)",
    bedsEn: "300 beds (30 ICU)",
    location: "ধানমন্ডি, ঢাকা",
    locationEn: "Dhanmondi, Dhaka",
    phone: "01823-039800",
    badge: "আধুনিক আইসিইউ ও ল্যাব",
    badgeEn: "Modern ICU & Lab",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80",
    query: "ইবনে সিনা স্পেশালাইজড হাসপাতাল",
  },
  {
    name: "পপুলার ডায়াগনস্টিক সেন্টার ও হাসপাতাল",
    nameEn: "Popular Diagnostic Center & Hospital",
    beds: "২৫০ বেড (২৫টি ICU)",
    bedsEn: "250 beds (25 ICU)",
    location: "শান্তিনগর / ধানমন্ডি, ঢাকা",
    locationEn: "Shantinagar / Dhanmondi, Dhaka",
    phone: "01755-691981",
    badge: "ডায়াগনস্টিক ও জরুরি কেয়ার",
    badgeEn: "Diagnostics & Emergency Care",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80",
    query: "পপুলার ডায়াগনস্টিক সেন্টার ও হাসপাতাল",
  },
  {
    name: "এভারকেয়ার হসপিটাল ঢাকা (Evercare)",
    nameEn: "Evercare Hospital Dhaka",
    beds: "৪২৫ বেড (৪০টি ICU/NICU)",
    bedsEn: "425 beds (40 ICU/NICU)",
    location: "বসুন্ধরা আবাসিক এলাকা, ঢাকা",
    locationEn: "Bashundhara Residential Area, Dhaka",
    phone: "01713-047461",
    badge: "JCI স্বীকৃত আন্তর্জাতিক হাসপাতাল",
    badgeEn: "JCI Accredited International Hospital",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
    query: "এভারকেয়ার হসপিটাল ঢাকা (Evercare)",
  },
  {
    name: "স্কয়ার হাসপাতাল লিমিটেড (Square)",
    nameEn: "Square Hospital Limited",
    beds: "৪০০ বেড (৪৫টি ICU)",
    bedsEn: "400 beds (45 ICU)",
    location: "পান্থপথ, ঢাকা",
    locationEn: "Panthapath, Dhaka",
    phone: "01713-377775",
    badge: "প্রাইম টারশিয়ারি হাসপাতাল",
    badgeEn: "Premier Tertiary Care Hospital",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop&q=80",
    query: "স্কয়ার হাসপাতাল লিমিটেড (Square)",
  },
];

export default function PartnerHospitalsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const { lang, t } = useLanguage();

  // Responsive items count
  useEffect(() => {
    function updateItems() {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    }
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const maxIndex = Math.max(0, PARTNER_HOSPITALS.length - itemsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand uppercase tracking-wider block">
                {t("hosp_badge")}
              </span>
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand">
                {PARTNER_HOSPITALS.length}+ {lang === "bn" ? "শীর্ষ হাসপাতাল" : "Top Hospitals"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink-dark mt-1">
              {t("hosp_heading")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t("hosp_sub")}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              href="/hospitals"
              className="text-xs sm:text-sm font-bold text-brand hover:underline inline-flex items-center gap-1"
            >
              <span>{t("hosp_view_all")}</span>
              <ArrowRight size={15} />
            </Link>

            {/* Carousel Control Buttons */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={handlePrev}
                 aria-label={lang === "bn" ? "আগের হাসপাতাল" : "Previous hospitals"}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-ink-dark shadow-sm hover:border-brand hover:text-brand transition-colors active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                 aria-label={lang === "bn" ? "পরবর্তী হাসপাতাল" : "Next hospitals"}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-ink-dark shadow-sm hover:border-brand hover:text-brand transition-colors active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container (No overflow scrollbars, strictly smooth controlled window) */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${(startIndex * 100) / itemsPerPage}%)`,
            }}
          >
            {PARTNER_HOSPITALS.map((hosp) => (
              <div
                key={hosp.name}
                className="px-2 shrink-0"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-clean hover:border-brand/40 hover:shadow-card transition-all h-full flex flex-col justify-between">
                  <div>
                    {/* Hospital Image Preview */}
                    <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-[16/9] mb-4">
                      <img
                        src={hosp.img}
                        alt={`${lang === "bn" ? hosp.name : hosp.nameEn} — ${lang === "bn" ? "ডিএইচ মেডিকেল সাপোর্টের পার্টনার হাসপাতাল" : "DH Medical Support partner hospital"}`}
                        onError={imageFallback("hospital")}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 rounded-lg bg-white/95 px-2.5 py-1 text-[10.5px] font-bold text-brand shadow-sm backdrop-blur-sm">
                        {lang === "bn" ? hosp.badge : hosp.badgeEn}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-ink-dark line-clamp-1">
                      {lang === "bn" ? hosp.name : hosp.nameEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span>{lang === "bn" ? hosp.location : hosp.locationEn}</span>
                    </p>

                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-brand-50/70 p-2.5 border border-brand-100/50">
                      <Bed size={16} className="text-brand shrink-0" />
                      <span className="text-xs font-bold text-brand">
                        {lang === "bn" ? hosp.beds : hosp.bedsEn}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${hosp.phone}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand"
                    >
                      <Phone size={13} className="text-brand" />
                      <span>{hosp.phone}</span>
                    </a>

                    <Link
                      href={`/hospitals?q=${encodeURIComponent(hosp.query)}`}
                      className="btn-outline !min-h-[36px] !px-3.5 !py-1 text-xs font-bold !border-brand/30 !text-brand hover:!bg-brand hover:!text-white transition-all inline-flex items-center gap-1"
                    >
                      <span>{t("hosp_view_bed")}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStartIndex(idx)}
              aria-label={lang === "bn" ? `${idx + 1} নম্বর স্লাইডে যান` : `Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                startIndex === idx
                  ? "w-7 bg-brand"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
