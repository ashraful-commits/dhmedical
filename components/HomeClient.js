"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Search,
  Ambulance,
  Stethoscope,
  Building2,
  Users,
  ShieldCheck,
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Eye as EyeIcon,
  Pill,
  Activity,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  MapPin,
  Video,
  CalendarCheck,
  FileSpreadsheet,
  Check,
  ChevronRight,
  Star,
  ShieldAlert,
  Quote,
  Thermometer,
  Droplets,
  Droplet,
} from "lucide-react";
import { motion } from "framer-motion";
import { GsapFadeIn, GsapStagger } from "@/components/GsapAnimation";
import PartnerHospitalsCarousel from "@/components/PartnerHospitalsCarousel";
import DynamicForm from "@/components/DynamicForm";
import { DocTimeWavePattern, ClinicalDotGrid } from "@/components/MedicalPatterns";
import { SITE, AMBULANCE_TYPES_DATA, imageFallback } from "@/lib/site";
import { insuranceFields } from "@/lib/forms";
import { useLanguage } from "@/context/LanguageContext";
import {
  DOCTOR_EXPERIENCE,
  DOCTOR_SPECIALTIES,
  HOME_SPECIALTIES,
  HEALTH_PLANS,
  INSURANCE_GUIDE,
  INSURANCE_STEPS,
  pick,
} from "@/lib/i18nData";

// DocTime 15-Specialty Clinical Area Definitions
const SPECIALTIES_15 = [
  { name: "General Physician", sub: "Primary Care Physician", bn: "সাধারণ স্বাস্থ্য ও মেডিসিন", query: "Medicine", icon: Stethoscope },
  { name: "Pediatrics", sub: "Child Health Care", bn: "শিশুরোগ বিশেষজ্ঞ", query: "Pediatrics", icon: Baby },
  { name: "Gynae & Obs", sub: "Women's Health Care", bn: "মহিলা ও প্রসূতিরোগ", query: "Gynecology", icon: Activity },
  { name: "Dermatology", sub: "Skin, Hair & Sexual Health", bn: "চর্ম, যৌন ও এলার্জি", query: "Medicine", icon: Sparkles },
  { name: "Internal Medicine", sub: "General Health & Medicine", bn: "ইন্টারনাল মেডিসিন", query: "Medicine", icon: Pill },
  { name: "Endocrinology", sub: "Diabetes, Thyroid & Hormone", bn: "ডায়াবেটিস ও হরমোন", query: "Medicine", icon: Activity },
  { name: "Neurology", sub: "Brain, Spine & Nerve", bn: "ব্রেইন ও নিউরোলজি", query: "Neuro Medicine", icon: Brain },
  { name: "Gastroenterology", sub: "Stomach, Liver & Gut", bn: "গ্যাস্ট্রো ও পরিপাকতন্ত্র", query: "Medicine", icon: HeartPulse },
  { name: "Cardiology", sub: "Heart Disease & Vascular", bn: "হৃদরোগ ও কার্ডিওলজি", query: "Cardiology", icon: HeartPulse },
  { name: "Urology", sub: "Urinary Bladder & Kidney", bn: "কিডনি ও ইউরোলজি", query: "Surgery", icon: Activity },
  { name: "Food & Nutrition", sub: "Healthy Diet Guidance", bn: "পুষ্টি ও ডায়েট চার্ট", query: "Medicine", icon: Pill },
  { name: "Dentistry", sub: "Teeth, Gum & Oral Care", bn: "দাঁত ও মুখগহ্বর", query: "Surgery", icon: Sparkles },
  { name: "Psychiatry", sub: "Mental & Emotional Health", bn: "মানসিক রোগ ও বিষণ্নতা", query: "Neuro Medicine", icon: Brain },
  { name: "Psychology", sub: "Counseling & Therapy", bn: "কাউন্সেলিং ও সাইকোলজি", query: "Neuro Medicine", icon: Users },
  { name: "Orthopedics", sub: "Bone, Muscle & Joint Care", bn: "হাড়, বাতব্যথা ও জয়েন্ট", query: "Orthopedics", icon: Bone },
];

// DocTime Common Health Concerns (Symptom Finder)
const HEALTH_CONCERNS = [
  { title: "Fever, Cold/Flu, Allergy", bn: "জ্বর, সর্দি, কাশি ও অ্যালার্জি", count: "48 Doctors", query: "Medicine", icon: Thermometer },
  { title: "Child Health & Diseases", bn: "শিশুর জ্বর, পেটব্যথা ও বমি", count: "32 Doctors", query: "Pediatrics", icon: Baby },
  { title: "Period & Gyne Issues", bn: "মাসিকের সমস্যা ও গর্ভকালীন যত্ন", count: "36 Doctors", query: "Gynecology", icon: HeartPulse },
  { title: "Skin, Acne & Hair Fall", bn: "ব্রণ, চুল পড়া ও চুলকানি", count: "29 Doctors", query: "Medicine", icon: Sparkles },
  { title: "Acidity, Gas & Diarrhea", bn: "গ্যাস, বুকজ্বালা ও বদহজম", count: "41 Doctors", query: "Medicine", icon: Activity },
  { title: "Diabetes & High BP", bn: "ডায়াবেটিস, প্রেসার ও থাইরয়েড", count: "35 Doctors", query: "Cardiology", icon: Droplets },
  { title: "Urine Infection or Pain", bn: "প্রস্রাবে জ্বালাপোড়া ও ইনফেকশন", count: "22 Doctors", query: "Medicine", icon: Droplet },
  { title: "Back Pain & Joint Ache", bn: "কোমর, হাঁটু ও জয়েন্ট ব্যথা", count: "25 Doctors", query: "Orthopedics", icon: Bone },
];

// DocTime Featured Verified Specialist Doctors
const DOCTORS_FEATURED = [
  {
    name: "Asst. Prof. Dr. Md. Zahidul Islam",
    degree: "MBBS, BCS (Health), MD (Pediatrics)",
    specialty: "Child Specialist",
    bmdc: "BMDC Reg: A-48291",
    exp: "12+ Yrs Experience",
    fee: "500",
    oldFee: "700",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Dr. Tahmina Hoque Pinki",
    degree: "MBBS, MCPS (Gynae & Obs), FCPS",
    specialty: "Gynecologist & Obstetrician",
    bmdc: "BMDC Reg: A-52114",
    exp: "10+ Yrs Experience",
    fee: "1,050",
    oldFee: "1,200",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Dr. Maria Seraj",
    degree: "MBBS, BCS (Health), MCPS (Dermatology)",
    specialty: "Dermatologist & Skin Specialist",
    bmdc: "BMDC Reg: A-61340",
    exp: "9+ Yrs Experience",
    fee: "550",
    oldFee: "750",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Assoc. Prof. Dr. Md. Zillur Rahman",
    degree: "MBBS, BCS (Health), FCPS (Psychiatry)",
    specialty: "Psychiatrist & Neuro Specialist",
    bmdc: "BMDC Reg: A-39201",
    exp: "15+ Yrs Experience",
    fee: "1,050",
    oldFee: "1,500",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80",
  },
];

export default function HomeClient({ initialReviews = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sampleLocation, setSampleLocation] = useState("");
  const [locationSaved, setLocationSaved] = useState(false);
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      {/* 1. TOP CENTERED SEARCH BAR (DocTime Benchmark) */}
      <section className="pt-10 pb-3 border-b border-slate-100 bg-white sm:pb-4">
        <div className="wrap max-w-5xl">
          <form action="/doctors" method="GET" className="grid grid-cols-1 gap-2 border border-slate-200 bg-white p-2 shadow-card sm:grid-cols-[1fr_1fr_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                name="q"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                aria-label={t("search_placeholder")}
                className="h-12 w-full border border-slate-200 bg-white pl-10 pr-3 text-sm text-ink-dark placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                name="location"
                type="text"
                value={sampleLocation}
                onChange={(e) => setSampleLocation(e.target.value)}
                placeholder={t("diag_location_placeholder")}
                aria-label={t("diag_location_placeholder")}
                className="h-12 w-full border border-slate-200 bg-white pl-10 pr-3 text-sm text-ink-dark placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
              />
            </div>
            <button
              type="submit"
              className="btn-primary !min-h-[48px] !w-full !px-0 sm:!w-14"
              aria-label={t("search_btn")}
            >
              <Search size={20} />
              <span className="sr-only">{t("search_btn")}</span>
            </button>
          </form>

          {/* Quick Search Tag Pills */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{t("popular_label")}</span>
            {(lang === "bn"
              ? ["মেডিসিন", "শিশুরোগ", "মহিলা ও প্রসূতি", "আইসিইউ অ্যাম্বুলেন্স", "অক্সিজেন", "চর্মরোগ", "রক্ত পরীক্ষা"]
              : ["General Physician", "Pediatrics", "Gynae & Obs", "ICU Ambulance", "Oxygen", "Dermatology", "Blood Test"]
            ).map((tag, i) => {
              const query = ["Medicine", "Pediatrics", "Gynecology", "ICU Ambulance", "Oxygen", "Medicine", "Blood Test"][i];
              return (
                <Link
                  key={tag}
                  href={`/doctors?q=${encodeURIComponent(query)}`}
                  className="rounded-none bg-slate-100 hover:bg-care-50 hover:text-care-deep px-3 py-1 font-medium text-slate-600 transition-colors whitespace-nowrap"
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. DOCTIME-STYLE HERO BANNER CAROUSEL */}
      <section className="pb-10 pt-2 sm:pb-14 sm:pt-4">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-r from-surface via-white to-brand-50/70 px-6 pb-6 pt-4 sm:px-10 sm:pb-10 sm:pt-6 lg:px-12 lg:pb-12 lg:pt-8 shadow-clean">
            {/* Subtle Clinical Dot Grid Pattern */}
            <ClinicalDotGrid className="opacity-40" />

            {/* DocTime Signature Flowing Wave Lines */}
            <div className="absolute -top-10 -right-20 w-[620px] h-[340px] pointer-events-none">
              <DocTimeWavePattern className="w-full h-full opacity-45" />
            </div>
            <div className="absolute -bottom-20 -left-20 w-[450px] h-[280px] pointer-events-none rotate-180">
              <DocTimeWavePattern className="w-full h-full opacity-30" />
            </div>
            <div className="pointer-events-none absolute -left-10 top-8 h-28 w-28 rounded-full bg-care/20 blur-2xl" />
            <div className="pointer-events-none absolute bottom-6 right-1/4 h-16 w-16 rounded-full bg-care/25 blur-xl" />

            {/* Subtle decorative medical cross watermark */}
            <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none text-brand">
              <svg width="340" height="340" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
              </svg>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 lg:items-center relative z-10">
              {/* Left Column: Heading, Trust Badges, and Action Button */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-care-deep shadow-sm border border-care-200">
                  <span className="h-3.5 w-[3px] rounded-sm bg-care-dark" />
                  <span>{t("hero_badge")}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark leading-[1.2] tracking-tight">
                  {t("hero_title")}
                </h1>

                <p className={`leading-relaxed text-slate-600 ${lang === "bn" ? "max-w-xl text-base sm:text-lg" : "max-w-2xl text-sm sm:text-base"}`}>
                  {t("hero_sub")}
                </p>

                {/* DocTime Trust Bullet Points */}
                <div className="space-y-3.5 text-sm sm:text-base font-semibold text-ink-dark pt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-care-deep text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{t("hero_trust_1")}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-care-deep text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{t("hero_trust_2")}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-care-deep text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{t("hero_trust_3")}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-care-deep text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{t("hero_trust_4")}</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href="/appointment"
                    className="btn-primary !min-h-[48px] !px-7 text-sm font-bold shadow-md"
                  >
                    <span>{t("hero_cta_doctor")}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/ambulance"
                    className="btn-outline !min-h-[48px] !px-6 text-sm font-bold !border-brand/40 !text-brand hover:!bg-brand-50"
                  >
                    <Ambulance size={18} />
                    <span>{t("hero_cta_ambulance")}</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: High Trust Verified Doctor Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/60 p-3 shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80"
                    alt="DH Medical Support BMDC Doctors Team"
                    onError={imageFallback("doctor")}
                    className="h-72 sm:h-80 w-full object-cover rounded-xl"
                  />

                  {/* Overlaid Trust Floating Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-100 bg-white/95 p-3 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-3.5">
                    <div className="min-w-0">
                      <span className="block text-[11px] font-bold uppercase text-slate-400">
                        {lang === "bn" ? "বিশ্বস্ত নেটওয়ার্ক" : "Trusted Network"}
                      </span>
                      <p className="break-words text-sm font-black leading-snug text-care-deep">
                        {lang === "bn" ? "৮,২০,০০০+ রোগী সেবা পেয়েছেন" : "820,000+ Patients Served"}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 bg-care-50 px-2.5 py-1 text-[11px] font-bold text-care-deep sm:text-sm">
                      <ShieldCheck size={14} /> {lang === "bn" ? "BMDC যাচাইকৃত" : "BMDC Verified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="-mx-6 -mb-6 mt-8 flex flex-col gap-5 border-t border-white/20 bg-brand px-6 py-5 text-white sm:-mx-10 sm:-mb-10 sm:px-10 lg:-mx-12 lg:-mb-12 lg:flex-row lg:items-center lg:justify-between lg:px-12">
              <div className="flex min-w-0 flex-wrap items-center gap-5">
                <div className="flex shrink-0 -space-x-3">
                  {DOCTORS_FEATURED.slice(0, 4).map((doc) => (
                    <img
                      key={doc.name}
                      src={doc.img}
                      alt={doc.name}
                      onError={imageFallback("doctor")}
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <p className="min-w-0 break-words text-sm font-black leading-snug">{t("hero_floating_badge")}</p>
              </div>
              <div className="flex min-w-0 items-start gap-2 text-sm font-semibold leading-snug text-white/90">
                <Star size={15} className="mt-0.5 shrink-0 fill-white text-white" />
                <span className="min-w-0 break-words">{t("hero_trust_2")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 CORE SERVICE PILLARS (DocTime Layout) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="wrap">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pillar 1: Live Video Consultation */}
            <Link
              href="/appointment"
              className="group rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-clean hover:border-brand hover:bg-brand hover:text-white hover:shadow-hover transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors mb-4">
                <Video size={24} />
              </div>
              <h3 className="text-base font-bold text-ink-dark group-hover:text-white transition-colors">
                {t("srv_video_title")}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-slate-500 group-hover:text-white/85 leading-relaxed">
                {t("srv_video_desc")}
              </p>
            </Link>

            {/* Pillar 2: Emergency Ambulance */}
            <Link
              href="/ambulance"
              className="group rounded-2xl border border-brand bg-brand p-5 text-white shadow-hover transition-all sm:p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-white transition-colors mb-4">
                <Ambulance size={24} />
              </div>
              <h3 className="text-base font-bold text-white">
                {t("srv_amb_title")}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-white/85 leading-relaxed">
                {t("srv_amb_desc")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white">
                <span>{t("concerns_view_all")}</span>
                <ArrowRight size={13} />
              </span>
            </Link>

            {/* Pillar 3: Diagnostic Tests */}
            <Link
              href="/appointment#diagnostic"
              className="group rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-clean hover:border-brand hover:bg-brand hover:text-white hover:shadow-hover transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors mb-4">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="text-base font-bold text-ink-dark group-hover:text-white transition-colors">
                {t("srv_diag_title")}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-slate-500 group-hover:text-white/85 leading-relaxed">
                {t("srv_diag_desc")}
              </p>
            </Link>

            {/* Pillar 4: Corporate & Expat Healthcare */}
            <Link
              href="/family-care"
              className="group rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-clean hover:border-brand hover:bg-brand hover:text-white hover:shadow-hover transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-base font-bold text-ink-dark group-hover:text-white transition-colors">
                {t("srv_family_title")}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-slate-500 group-hover:text-white/85 leading-relaxed">
                {t("srv_family_desc")}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ALTERNATING ZIG-ZAG SPLIT SECTIONS */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-brand-50/50 to-care-50/30">
        <div className="wrap space-y-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 h-20 w-20 bg-care-200" />
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&auto=format&fit=crop&q=80"
                alt={t("srv_video_title")}
                onError={imageFallback("doctor")}
                className="relative h-72 w-full object-cover shadow-card sm:h-96"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-care-deep uppercase tracking-wider block mb-1">
                {t("hero_badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark">
                {t("srv_video_title")}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-500 leading-relaxed">
                {t("srv_video_desc")}
              </p>
              <ul className="mt-5 space-y-3.5 text-sm sm:text-base font-semibold text-ink-dark">
                <li className="flex items-start gap-2"><Check size={15} className="mt-1 text-care-deep shrink-0" /> {t("hero_trust_1")}</li>
                <li className="flex items-start gap-2"><Check size={15} className="mt-1 text-care-deep shrink-0" /> {t("hero_trust_3")}</li>
              </ul>
              <Link href="/appointment" className="btn-primary mt-6 !min-h-[46px]">
                <span>{t("hero_cta_doctor")}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-bold text-care-deep uppercase tracking-wider block mb-1">
                {t("hero_badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark">
                {t("srv_amb_title")}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-500 leading-relaxed">
                {t("srv_amb_desc")}
              </p>
              <ul className="mt-5 space-y-3.5 text-sm sm:text-base font-semibold text-ink-dark">
                <li className="flex items-start gap-2"><Check size={15} className="mt-1 text-care-deep shrink-0" /> {t("hero_trust_4")}</li>
                <li className="flex items-start gap-2"><Check size={15} className="mt-1 text-care-deep shrink-0" /> {t("hero_trust_2")}</li>
              </ul>
              <Link href="/ambulance" className="btn-primary mt-6 !min-h-[46px]">
                <span>{t("hero_cta_ambulance")}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="absolute -bottom-4 -left-4 h-20 w-20 bg-brand-200" />
              <img
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=900&auto=format&fit=crop&q=80"
                alt={t("srv_amb_title")}
                onError={imageFallback("doctor")}
                className="relative h-72 w-full object-cover shadow-card sm:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. AVAILABLE SPECIALTIES GRID (DocTime 15-Specialty Grid from Screenshot) */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-white">
        <ClinicalDotGrid className="opacity-30" />
        <div className="wrap relative z-10">
          <div className="text-center sm:text-left mb-8 sm:mb-10">
            <span className="text-sm font-bold text-care-deep uppercase tracking-wider block mb-1">
              {t("sp_title")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark">
              {t("sp_heading")}
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mt-2">
              {t("sp_sub")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {SPECIALTIES_15.map((sp, i) => {
              const IconComponent = sp.icon;
              return (
                <motion.div
                  key={sp.name}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={`/doctors?sp=${encodeURIComponent(sp.query)}`}
                    className="behance-card group"
                  >
                    <div className="behance-icon">
                      <IconComponent size={30} />
                    </div>
                    <h4 className="min-w-0 break-words text-center text-lg font-bold text-ink-dark transition-colors duration-300">
                      {lang === "bn" ? sp.bn : sp.name}
                    </h4>
                    <p className="mt-1 min-w-0 break-words text-center text-base text-slate-500 transition-colors duration-300">
                      {lang === "bn" ? HOME_SPECIALTIES[i]?.subBn || sp.sub : sp.sub}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COMMON HEALTH CONCERNS (Symptom Finder from Screenshot) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-care-50/50 via-white to-brand-50/30">
        <div className="wrap">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark">
                {t("concerns_heading")}
              </h2>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mt-2">
                {t("concerns_sub")}
              </p>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1 text-sm sm:text-base font-bold text-brand hover:underline"
            >
              <span>{t("concerns_view_all")}</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {HEALTH_CONCERNS.map((item) => (
              <Link
                key={item.title}
                href={`/doctors?q=${encodeURIComponent(item.query)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand hover:bg-brand-50/40 hover:shadow-hover"
              >
                <div className="relative mb-4 grid h-32 w-full place-items-center overflow-hidden border border-slate-200/70 bg-brand-50/25">
                  <div className="absolute -right-6 -top-6 h-20 w-20 bg-care/15" />
                  <div className="relative grid h-20 w-20 place-items-center bg-white text-brand shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-white">
                    <item.icon size={40} strokeWidth={1.8} />
                  </div>
                </div>
                <h4 className="text-lg font-bold leading-snug text-ink-dark transition-colors group-hover:text-brand">
                  {lang === "bn" ? item.bn : item.title}
                </h4>
                <p className="mt-1 text-base text-slate-500">{lang === "bn" ? item.title : item.bn}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-base font-bold text-care-deep">
                  <span>{item.count.split(" ")[0]} {t("home_available")}</span>
                  <ChevronRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AVAILABLE SPECIALIST DOCTORS (DocTime Doctor Cards from Screenshot) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="wrap">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark">
                  {t("doc_heading")}
                </h2>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-sm font-bold text-brand">
                  {t("doc_online")}
                </span>
              </div>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mt-2">
                {t("doc_sub")}
              </p>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1 text-sm sm:text-base font-bold text-brand hover:underline"
            >
              <span>{t("view_all")}</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DOCTORS_FEATURED.slice(0, 3).map((doc) => (
              <motion.div
                key={doc.name}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.99 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-clean hover:border-brand hover:bg-brand-50/40 hover:shadow-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden rounded-xl bg-slate-100 aspect-square mb-4">
                    <img
                      src={doc.img}
                      alt={`${doc.name} — DH Medical Support verified doctor`}
                      onError={imageFallback("doctor")}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <h3 className="text-base font-bold text-ink-dark line-clamp-1">{doc.name}</h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{doc.degree}</p>

                  <div className="mt-4 inline-block rounded-none bg-care-50 px-2 py-0.5 text-sm font-bold text-care-deep">
                    {lang === "bn" ? DOCTOR_SPECIALTIES[doc.specialty] || doc.specialty : doc.specialty}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-2">
                    <span className="text-sm">{doc.bmdc}</span>
                    <span className="font-semibold text-slate-700">
                      {lang === "bn" ? DOCTOR_EXPERIENCE[doc.exp] || doc.exp : doc.exp}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-400">{t("doc_fee_label")}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-slate-400 line-through">৳{doc.oldFee}</span>
                      <span className="text-base font-black text-ink-dark">৳{doc.fee}</span>
                    </div>
                  </div>

                  <Link
                    href={`/appointment?doctor=${encodeURIComponent(doc.name)}`}
                    className="btn-primary w-full !min-h-[40px] !px-3 text-sm font-bold inline-flex items-center justify-center gap-1.5"
                  >
                    <CalendarCheck size={15} />
                    <span>{t("doc_see_btn")}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & 3-COLUMN CONTENT GRID */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-surface via-white to-brand-50/30">
        <div className="wrap">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark mb-8 sm:mb-10">
            {t("nav_feedback")}
          </h2>
          {initialReviews.length > 0 && (
            <div className="grid gap-7 md:grid-cols-2">
              {initialReviews.slice(0, 2).map((review, i) => (
                <div key={review._id || i} className="border border-slate-200 bg-white p-6 shadow-clean">
                  <Quote size={40} className={i === 0 ? "text-brand" : "text-slate-300"} />
                  <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed line-clamp-5">
                    {review.comment}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-base font-black text-ink-dark">{review.name}</p>
                      <p className="text-sm text-slate-500">{review.service}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-care-deep">
                      {Array.from({ length: review.rating || 5 }).map((_, s) => (
                        <Star key={s} size={13} className="fill-care-deep" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {INSURANCE_GUIDE.map((item, i) => {
              const Icon = [ShieldCheck, HeartPulse, Activity][i];
              return (
                <div key={pick(item.title, lang)} className="border border-slate-200 bg-white p-5 shadow-clean transition-all hover:border-brand hover:shadow-hover">
                  <div className="relative grid h-32 w-full place-items-center overflow-hidden bg-brand-50/60">
                    <div className="absolute -bottom-8 -left-8 h-20 w-20 bg-care/25" />
                    <Icon size={44} strokeWidth={1.6} className="relative text-brand" />
                  </div>
                  <h3 className="mt-4 text-base font-black text-ink-dark">{pick(item.title, lang)}</h3>
                  <p className="mt-2.5 text-sm text-slate-500">{pick(item.type, lang)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">{pick(item.detail, lang)}</p>
                  <Link
                    href="/family-care"
                    aria-label={pick(item.title, lang)}
                    className="mt-4 grid h-10 w-10 place-items-center rounded-full bg-brand text-white transition-transform hover:scale-105"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/family-care" className="btn-primary">
              <span>{t("plans_compare")}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. HEALTH CARE AND PROTECT PLANS (DocTime Plans from Screenshot) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-sm font-bold text-care-deep uppercase tracking-wider block mb-1">
              {t("plans_sub")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark">
              {t("plans_heading")}
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mt-2">
              {t("plans_desc")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HEALTH_PLANS.map((plan) => (
              <motion.div
                key={pick(plan.name, lang)}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.99 }}
                className={`relative rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all ${plan.popular
                  ? "border-brand bg-white shadow-card ring-2 ring-brand/10"
                  : "border-slate-200 bg-white shadow-clean hover:border-slate-300"
                  }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-none bg-care-deep px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-ink-dark">{pick(plan.name, lang)}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-ink-dark">৳{plan.price}</span>
                    <span className="text-sm text-slate-500">{pick(plan.period, lang)}</span>
                  </div>
                  <span className="text-sm font-semibold text-care-deep block mt-1">{pick(plan.target, lang)}</span>

                  <div className="my-5 border-t border-slate-100" />

                  <ul className="space-y-3.5 text-sm sm:text-base text-slate-600">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} className="text-care-deep shrink-0 mt-1" strokeWidth={2.5} />
                        <span>{pick(feat, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/family-care?plan=${encodeURIComponent(pick(plan.name, lang))}`}
                    className={`w-full text-sm font-bold justify-center ${plan.popular ? "btn-primary" : "btn-primary !bg-brand hover:!bg-brand-dark"
                      }`}
                  >
                    {t("plans_subscribe")}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-care-200 bg-care-50/70 shadow-none">
            <div className="grid lg:grid-cols-12">
              <div className="p-6 sm:p-8 lg:col-span-7">
                <span className="text-sm font-bold text-care-deep uppercase tracking-wider block mb-1">
                  বাংলাদেশের বীমা গাইড
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-ink-dark">
                  বীমা পরিকল্পনা কীভাবে কাজ করে?
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed">
                  সরকারি স্বাস্থ্য বীমা, বেসরকারি হেলথ পলিসি বা জীবন বীমার হেলথ রাইডার — মূল ধাপ একই। নিচের তথ্যগুলো জানলে ক্লেইম ও নবায়ন সহজ হয়।
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {INSURANCE_STEPS.map((step) => (
                    <div key={pick(step.n, lang)} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <span className="text-sm font-black text-brand">{pick(step.n, lang)}</span>
                      <p className="mt-1 text-sm font-bold text-brand">{pick(step.title, lang)}</p>
                      <p className="mt-1 text-sm sm:text-base leading-relaxed text-slate-500">{pick(step.text, lang)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  {INSURANCE_GUIDE.map((item) => (
                    <details key={pick(item.title, lang)} className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                        <span>
                          <span className="block text-sm font-black text-brand">{pick(item.title, lang)}</span>
                          <span className="mt-1 block text-sm font-semibold text-brand">{pick(item.type, lang)}</span>
                        </span>
                        <ChevronRight size={16} className="mt-1 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-2 border-t border-slate-100 pt-2 text-sm sm:text-base leading-relaxed text-slate-600">{pick(item.detail, lang)}</p>
                      <p className="mt-2.5 text-sm sm:text-base font-semibold text-emerald-700">{pick(item.note, lang)}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 bg-white p-5 sm:p-6 lg:col-span-5 lg:border-l lg:border-t-0">
                <div className="mb-4 flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-brand">নমুনা বীমা আবেদন ফর্ম</h4>
                    <p className="mt-1 text-sm text-slate-500">
                      নতুন পলিসি, ক্লেইম, নবায়ন বা সদস্য যোগ — যেকোনো একটি বেছে নিন।
                    </p>
                  </div>
                </div>
                <DynamicForm
                  type="insuranceRequests"
                  fields={insuranceFields}
                  submit="বীমা সহায়তা চাই"
                  success="আপনার বীমা আবেদন পৌঁছে গেছে। আমাদের কো-অর্ডিনেটর শীঘ্রই ফোন বা WhatsApp-এ যোগাযোগ করবেন।"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/family-care"
              className="btn-outline !min-h-[42px] !px-8 text-sm font-bold !border-brand/30 !text-brand hover:!bg-brand-50 inline-flex items-center gap-1.5"
            >
              <span>{t("plans_compare")}</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. HOME DIAGNOSTIC SERVICE (Doorstep Sample Collection from Screenshot) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-brand-50/40 to-care-50/20">
        <div className="wrap">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-clean">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Features and Location Input */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-sm font-bold text-care-deep uppercase tracking-wider block">
                  {t("diag_badge")}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark">
                  {t("diag_heading")}
                </h2>
                <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
                  {t("diag_sub")}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand shrink-0">
                      <Clock size={16} />
                    </div>
                    <span>{t("diag_f1")}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <span>{t("diag_f2")}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-700">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand shrink-0">
                      <FileSpreadsheet size={16} />
                    </div>
                    <span>{t("diag_f3")}</span>
                  </div>
                </div>

                {/* Interactive Location Finder */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-base font-bold text-ink-dark">
                    <MapPin size={15} className="text-brand" />
                    <span>{lang === "bn" ? "স্যাম্পল কালেকশন এরিয়া পরীক্ষক" : "Sample Collection Area Checker"}</span>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={sampleLocation}
                      onChange={(e) => {
                        setSampleLocation(e.target.value);
                        setLocationSaved(false);
                      }}
                      placeholder={t("diag_location_placeholder")}
                      className="search-input !h-11 min-w-0 !text-sm !bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (sampleLocation.trim()) setLocationSaved(true);
                      }}
                      className="btn-primary !min-h-[44px] !px-3 text-sm shrink-0 inline-flex w-full items-center justify-center gap-1.5 sm:w-auto"
                    >
                      <span>{t("diag_location_btn")}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  {locationSaved && (
                    <p className="text-sm font-bold text-brand bg-brand-50 rounded-lg p-2 flex items-center gap-1.5">
                      <CheckCircle2 size={15} />
                      <span>{lang === "bn" ? `সেবা উপলব্ধ! আমাদের টিম ${sampleLocation}-এ নমুনা সংগ্রহ করতে প্রস্তুত।` : `Service available in ${sampleLocation}! Our certified team is ready.`}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Lab Tech Photo Visual */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
                    alt="Doorstep sample collection by DH Medical Support"
                    onError={imageFallback("doctor")}
                    className="h-64 sm:h-72 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EMERGENCY AMBULANCE DISPATCH QUICK BOOKING (DH Medical's Core Superpower) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-t border-slate-100">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-10">
            <div>
              <span className="text-sm font-bold text-care-deep uppercase tracking-wider block mb-1">
                {t("fleet_badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark">
                {t("fleet_heading")}
              </h2>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mt-2">
                {t("fleet_sub")}
              </p>
            </div>
            <Link
              href="/ambulance"
              className="btn-primary !min-h-[42px] !px-6 text-sm font-bold self-start sm:self-auto inline-flex items-center gap-1.5"
            >
              <Ambulance size={16} />
              <span>{t("fleet_view_all")}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AMBULANCE_TYPES_DATA.slice(0, 4).map((amb) => (
              <motion.div
                key={amb.key}
                whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
                whileTap={{ scale: 0.99 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-clean hover:border-brand/40 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-none bg-care-50 px-2 py-0.5 text-[10.5px] font-bold text-care-deep">
                      {amb.badge}
                    </span>
                    <span className="text-sm font-bold text-slate-500">{amb.eta}</span>
                  </div>

                  <h3 className="text-base font-bold text-ink-dark">{amb.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{amb.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">{t("fleet_base_fare")}</span>
                    <b className="text-base font-black text-ink-dark">৳{amb.baseFare.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}</b>
                  </div>
                  <Link
                    href={`/ambulance?type=${encodeURIComponent(amb.key)}`}
                    className="btn-primary !min-h-[36px] !px-3.5 !py-1 text-sm font-bold"
                  >
                    {t("fleet_book_now")}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PARTNER HOSPITALS & CLINICS DEDICATED CONTROLLED CAROUSEL (NOT SCROLL EVERYWHERE) */}
      <PartnerHospitalsCarousel />

      {/* 11. ARE YOU A QUALIFIED DOCTOR OR AMBULANCE OWNER? (DocTime Style from Screenshot) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-surface via-white to-brand-50/30">
        <div className="wrap">
          <div className="relative border border-brand bg-brand p-6 text-white shadow-hover sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Doctor Visual */}
              <div className="relative lg:col-span-5">
                <div className="relative mx-auto max-w-md border-4 border-white/30 bg-white shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop&q=80"
                    alt="Doctor joining the DH Medical Support network"
                    onError={imageFallback("doctor")}
                    className="h-64 w-full object-cover sm:h-80"
                  />
                  <div className="absolute -bottom-4 left-4 flex items-center gap-2 border border-brand-100 bg-white px-3 py-2 text-sm font-bold text-brand shadow-card">
                    <ShieldCheck size={15} />
                    {t("footer_bmdc_badge")}
                  </div>
                </div>
              </div>

              {/* Text & Action */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-sm font-bold text-care-200 uppercase tracking-wider block">
                  {lang === "bn" ? "স্বাস্থ্য নেটওয়ার্কে যুক্ত হোন" : "Join The Healthcare Network"}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black !text-white">
                  {t("partner_join_title")}
                </h2>
                <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
                  {t("partner_join_sub")}
                </p>

                <div className="space-y-2 text-sm sm:text-base font-medium text-white/90 pt-1">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-care-200 shrink-0" strokeWidth={2.5} />
                    <span>BMDC verified onboarding process with autonomous medical consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-care-200 shrink-0" strokeWidth={2.5} />
                    <span>24/7 dedicated technical coordination desk for doctors and ambulance drivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-care-200 shrink-0" strokeWidth={2.5} />
                    <span>Timely verified settlements directly to your bank account</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap gap-3">
                  <Link
                    href="/partner"
                    className="btn bg-white text-brand hover:bg-care-50 !min-h-[44px] !px-6 text-sm font-bold inline-flex items-center gap-1.5"
                  >
                    <span>{t("partner_join_doc")}</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/partner#ambulance"
                    className="btn border border-white/50 text-white hover:bg-white/15 !min-h-[44px] !px-6 text-sm font-bold inline-flex items-center gap-1.5"
                  >
                    <span>{t("partner_join_amb")}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. 24/7 HOTLINE EMERGENCY BAR */}
      <section className="relative overflow-hidden border-y border-brand-100 bg-white py-10 sm:py-14">
        <div className="absolute -top-16 -right-16 w-[520px] h-[220px] pointer-events-none opacity-20">
          <DocTimeWavePattern className="w-full h-full text-brand" />
        </div>
        <div className="wrap relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-ink-dark">
              {t("hotline_heading")}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {t("hotline_sub")}
            </p>
          </div>
          <a
            href={SITE.tel}
            className="btn-primary !min-h-[46px] !px-7 font-black text-sm shrink-0 inline-flex items-center gap-2"
          >
            <Phone size={18} />
            <span>{t("hotline_call_btn")} {SITE.phone}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
