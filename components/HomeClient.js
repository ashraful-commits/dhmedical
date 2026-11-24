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
  FileSpreadsheet,
  Check,
  ChevronRight,
  Star,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { GsapFadeIn, GsapStagger } from "@/components/GsapAnimation";
import PartnerHospitalsCarousel from "@/components/PartnerHospitalsCarousel";
import DynamicForm from "@/components/DynamicForm";
import { DocTimeWavePattern, ClinicalDotGrid } from "@/components/MedicalPatterns";
import { SITE, AMBULANCE_TYPES_DATA } from "@/lib/site";
import { insuranceFields } from "@/lib/forms";
import { useLanguage } from "@/context/LanguageContext";

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
  { title: "Fever, Cold/Flu, Allergy", bn: "জ্বর, সর্দি, কাশি ও অ্যালার্জি", count: "48 Doctors", query: "Medicine" },
  { title: "Child Health & Diseases", bn: "শিশুর জ্বর, পেটব্যথা ও বমি", count: "32 Doctors", query: "Pediatrics" },
  { title: "Period & Gyne Issues", bn: "মাসিকের সমস্যা ও গর্ভকালীন যত্ন", count: "36 Doctors", query: "Gynecology" },
  { title: "Skin, Acne & Hair Fall", bn: "ব্রণ, চুল পড়া ও চুলকানি", count: "29 Doctors", query: "Medicine" },
  { title: "Acidity, Gas & Diarrhea", bn: "গ্যাস, বুকজ্বালা ও বদহজম", count: "41 Doctors", query: "Medicine" },
  { title: "Diabetes & High BP", bn: "ডায়াবেটিস, প্রেসার ও থাইরয়েড", count: "35 Doctors", query: "Cardiology" },
  { title: "Urine Infection or Pain", bn: "প্রস্রাবে জ্বালাপোড়া ও ইনফেকশন", count: "22 Doctors", query: "Medicine" },
  { title: "Back Pain & Joint Ache", bn: "কোমর, হাঁটু ও জয়েন্ট ব্যথা", count: "25 Doctors", query: "Orthopedics" },
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
    img: "https://images.unsplash.com/photo-1594824813583-4a1c1d8ff895?w=400&auto=format&fit=crop&q=80",
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

// DocTime Health Care & Protect Plans
const HEALTH_PLANS = [
  {
    name: "Jotno (যত্ন)",
    price: "1,000+",
    period: "/monthly",
    target: "1 Person",
    features: [
      "Free 2 consultations with BMDC General Physician",
      "5% discount on Specialist Doctor consultation",
      "Digital Health Record & Prescription Vault",
    ],
  },
  {
    name: "Astha (আস্থা)",
    price: "1,500+",
    period: "/monthly",
    target: "1 Person",
    popular: true,
    features: [
      "Free 4 consultations with BMDC General Physician",
      "10% discount on Specialist Doctor consultation",
      "Free Home Diagnostic sample collection coordination",
      "Digital Health Record & Prescription Vault",
    ],
  },
  {
    name: "Aponjon (আপনজন)",
    price: "2,500+",
    period: "/monthly",
    target: "For 4 persons (Family)",
    features: [
      "Free 6 consultations with BMDC General Physician",
      "10% discount on Specialist Doctor consultation",
      "Full family coverage under 1 single subscription",
      "Annual health checkup coordination",
    ],
  },
  {
    name: "Momota (মমতা - প্রবাসী ও মা-বাবা কেয়ার)",
    price: "3,500+",
    period: "/monthly",
    target: "For Parents & Elders",
    features: [
      "Free 6 consultations with BMDC General Physician",
      "Monthly 2 scheduled online health screening calls for parents",
      "Doorstep Medicine & Lab Test Coordination",
      "Dedicated Care Officer for Expatriate Families",
    ],
  },
];

const INSURANCE_GUIDE = [
  {
    title: "সরকারি স্বাস্থ্য বীমা (Shasthya Bima)",
    type: "জেলা/উপজেলা ভিত্তিক সামাজিক স্বাস্থ্য সুরক্ষা",
    detail: "কম প্রিমিয়ামে পরিবারের জন্য হাসপাতাল চিকিৎসা ও চিকিৎসা খরচে সহায়তা পাওয়া যায়। নিবন্ধন সাধারণত উপজেলা/জেলা অফিস বা নির্ধারিত ব্যাংকের মাধ্যমে হয়।",
    note: "প্রয়োজন: NID, জন্ম নিবন্ধন, ঠিকানা প্রমাণ ও পরিবারের সদস্যদের তথ্য।",
  },
  {
    title: "বেসরকারি হেলথ পলিসি (Jotno, Astha, Aponjon, Momota)",
    type: "মাসিক/বার্ষিক প্রিমিয়াম, নেটওয়ার্ক হাসপাতালে ক্যাশলেস বা রিইম্বার্সমেন্ট",
    detail: "পলিসিতে সাধারণত ওয়েটিং পিরিয়ড, বছরের সর্বোচ্চ কভারেজ, রুম ভাড়ার সীমা ও বাদ দেওয়া রোগের তালিকা থাকে। অসুস্থ হওয়ার আগে পলিসি নেওয়া ভালো।",
    note: "প্রয়োজন: পলিসি নম্বর, NID, পূর্বের চিকিৎসা ইতিহাস ও মনোনীত হাসপাতালের তালিকা।",
  },
  {
    title: "জীবন বীমার হেলথ রাইডার",
    type: "মূল জীবন বীমার সাথে অতিরিক্ত স্বাস্থ্য কভারেজ",
    detail: "হাসপাতালে ভর্তি, অস্ত্রোপচার ও গুরুতর অসুস্থতায় নির্ধারিত পরিমাণ টাকা পাওয়া যায়। কভারেজ শর্ত ভিন্ন হয়, তাই পলিসি ডকুমেন্ট পড়ে নিন।",
    note: "প্রয়োজন: মূল পলিসি, রাইডার স্লিপ, প্রিমিয়াম রিসিট ও ক্লেইম ফর্ম।",
  },
];

const INSURANCE_STEPS = [
  { n: "০১", title: "পলিসি তুলুন", text: "প্রিমিয়াম, ওয়েটিং পিরিয়ড, কভারেজ সীমা ও পরিবারের কতজন অন্তর্ভুক্ত হবেন দেখুন।" },
  { n: "০২", title: "নিবন্ধন করুন", text: "NID/জন্ম নিবন্ধন ও স্বাস্থ্য তথ্য দিয়ে আবেদন জমা দিন।" },
  { n: "০৩", title: "চিকিৎসা নিন", text: "নেটওয়ার্ক হাসপাতালে ক্যাশলেস অথবা বিল সংরক্ষণ করে রিইম্বার্সমেন্ট চান।" },
  { n: "০৪", title: "ক্লেইম ও নবায়ন", text: "বিল, প্রেসক্রিপশন ও ডিসচার্জ সামারি সহ ক্লেইম করে পলিসি সময়মতো নবায়ন করুন।" },
];

export default function HomeClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sampleLocation, setSampleLocation] = useState("");
  const [locationSaved, setLocationSaved] = useState(false);
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      {/* 1. TOP CENTERED SEARCH BAR (DocTime Benchmark) */}
      <section className="pt-6 pb-4 border-b border-slate-100 bg-white">
        <div className="wrap max-w-4xl">
          <form action="/doctors" method="GET" className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              name="q"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search_placeholder")}
              aria-label="Search Medical Services"
              className="search-input !h-14 !pl-12 !pr-28 !text-base !rounded-2xl shadow-sm"
            />
            <button
              type="submit"
              className="btn-primary absolute right-2 top-2 !min-h-[40px] !px-5 text-sm"
            >
              {t("search_btn")}
            </button>
          </form>

          {/* Quick Search Tag Pills */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
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
                  className="rounded-full bg-slate-100 hover:bg-care-50 hover:text-care px-3 py-1 font-medium text-slate-600 transition-colors whitespace-nowrap"
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. DOCTIME-STYLE HERO BANNER CAROUSEL */}
      <section className="py-6 sm:py-8">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-3xl border border-[#D0E2F9] bg-gradient-to-r from-[#EEF4FC] via-[#F4F8FD] to-[#E5F0FA] p-6 sm:p-10 lg:p-12 shadow-clean">
            {/* Subtle Clinical Dot Grid Pattern */}
            <ClinicalDotGrid className="opacity-40" />

            {/* DocTime Signature Flowing Wave Lines */}
            <div className="absolute -top-10 -right-20 w-[620px] h-[340px] pointer-events-none">
              <DocTimeWavePattern className="w-full h-full opacity-45" />
            </div>
            <div className="absolute -bottom-20 -left-20 w-[450px] h-[280px] pointer-events-none rotate-180">
              <DocTimeWavePattern className="w-full h-full opacity-30" />
            </div>

            {/* Subtle decorative medical cross watermark */}
            <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none text-brand">
              <svg width="340" height="340" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
              </svg>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 lg:items-center relative z-10">
              {/* Left Column: Heading, Trust Badges, and Action Button */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-care shadow-sm border border-care-100">
                  <span className="h-2 w-2 rounded-full bg-care animate-ping" />
                  <span>{t("hero_badge")}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink-dark leading-[1.2] tracking-tight">
                  {t("hero_title")}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {t("hero_sub")}
                </p>

                {/* DocTime Trust Bullet Points */}
                <div className="space-y-2.5 text-xs sm:text-sm font-semibold text-ink-dark pt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-care text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{t("hero_trust_1")}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-care text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{t("hero_trust_2")}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-care text-white shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{t("hero_trust_3")}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="grid h-5 w-5 place-items-center rounded-full bg-care text-white shrink-0">
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
                <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3 shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80"
                    alt="DH Medical Support BMDC Doctors Team"
                    className="h-72 sm:h-80 w-full object-cover rounded-xl"
                  />

                  {/* Overlaid Trust Floating Pill */}
                  <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 p-3.5 shadow-lg backdrop-blur-md border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">Trusted Network</span>
                      <p className="text-sm font-black text-care">820,000+ Patients Served</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-care-50 px-2.5 py-1 text-xs font-bold text-care">
                      <ShieldCheck size={14} /> BMDC Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 CORE SERVICE PILLARS (DocTime Layout) */}
      <section className="py-6">
        <div className="wrap">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pillar 1: Live Video Consultation */}
            <Link
              href="/appointment"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-clean hover:border-brand/50 hover:shadow-hover transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors mb-4">
                <Video size={24} />
              </div>
              <h3 className="text-base font-bold text-ink-dark group-hover:text-brand transition-colors">
                {t("srv_video_title")}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                {t("srv_video_desc")}
              </p>
            </Link>

            {/* Pillar 2: Emergency Ambulance */}
            <Link
              href="/ambulance"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-clean hover:border-brand/50 hover:shadow-hover transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors mb-4">
                <Ambulance size={24} />
              </div>
              <h3 className="text-base font-bold text-ink-dark group-hover:text-brand transition-colors">
                {t("srv_amb_title")}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                {t("srv_amb_desc")}
              </p>
            </Link>

            {/* Pillar 3: Diagnostic Tests */}
            <Link
              href="/appointment#diagnostic"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-clean hover:border-brand/50 hover:shadow-hover transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors mb-4">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="text-base font-bold text-ink-dark group-hover:text-brand transition-colors">
                {t("srv_diag_title")}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                {t("srv_diag_desc")}
              </p>
            </Link>

            {/* Pillar 4: Corporate & Expat Healthcare */}
            <Link
              href="/family-care"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-clean hover:border-brand/50 hover:shadow-hover transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-base font-bold text-ink-dark group-hover:text-brand transition-colors">
                {t("srv_family_title")}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                {t("srv_family_desc")}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. AVAILABLE SPECIALTIES GRID (DocTime 15-Specialty Grid from Screenshot) */}
      <section className="relative overflow-hidden py-12 bg-[#F8FAFC]">
        <ClinicalDotGrid className="opacity-30" />
        <div className="wrap relative z-10">
          <div className="text-center sm:text-left mb-8">
            <span className="text-xs font-bold text-care uppercase tracking-wider block mb-1">
              {t("sp_title")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-ink-dark">
              {t("sp_heading")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t("sp_sub")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {SPECIALTIES_15.map((sp) => {
              const IconComponent = sp.icon;
              return (
                <motion.div
                  key={sp.name}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={`/doctors?sp=${encodeURIComponent(sp.query)}`}
                    className="category-card group flex flex-col items-center justify-center min-h-[140px] h-full"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300 mb-2.5">
                      <IconComponent size={22} />
                    </div>
                    <h4 className="text-sm font-bold text-ink-dark group-hover:text-brand transition-colors duration-300 text-center">
                      {lang === "bn" ? sp.bn : sp.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 text-center">{sp.sub}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COMMON HEALTH CONCERNS (Symptom Finder from Screenshot) */}
      <section className="py-12 bg-white">
        <div className="wrap">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink-dark">
                {t("concerns_heading")}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t("concerns_sub")}
              </p>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand hover:underline"
            >
              <span>{t("concerns_view_all")}</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {HEALTH_CONCERNS.map((item) => (
              <Link
                key={item.title}
                href={`/doctors?q=${encodeURIComponent(item.query)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-brand/50 hover:shadow-hover transition-all"
              >
                <div className="h-24 w-full rounded-xl bg-gradient-to-br from-care-50 via-care-100/40 to-slate-100 flex items-center justify-center p-3 mb-3 text-care">
                  <HeartPulse size={32} className="group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-ink-dark group-hover:text-brand transition-colors leading-snug">
                  {lang === "bn" ? item.bn : item.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">{lang === "bn" ? item.title : item.bn}</p>
                <span className="text-[10px] font-bold text-care mt-2 inline-flex items-center gap-0.5">
                  <span>{item.count} {lang === "bn" ? "উপলব্ধ" : "available"}</span>
                  <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AVAILABLE SPECIALIST DOCTORS (DocTime Doctor Cards from Screenshot) */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="wrap">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-ink-dark">
                  {t("doc_heading")}
                </h2>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand">
                  {t("doc_online")}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t("doc_sub")}
              </p>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand hover:underline"
            >
              <span>View All</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DOCTORS_FEATURED.map((doc) => (
              <motion.div
                key={doc.name}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.99 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-clean hover:shadow-card hover:border-brand/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden rounded-xl bg-slate-100 aspect-square mb-4">
                    <img
                      src={doc.img}
                      alt={doc.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <h3 className="text-sm font-bold text-ink-dark line-clamp-1">{doc.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{doc.degree}</p>

                  <div className="mt-2.5 inline-block rounded-md bg-care-50 px-2 py-0.5 text-[11px] font-bold text-care">
                    {doc.specialty}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
                    <span className="text-[10.5px]">{doc.bmdc}</span>
                    <span className="font-semibold text-slate-700">{doc.exp}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400">{t("doc_fee_label")}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 line-through">৳{doc.oldFee}</span>
                      <span className="text-base font-black text-ink-dark">৳{doc.fee}</span>
                    </div>
                  </div>

                  <Link
                    href={`/appointment?doctor=${encodeURIComponent(doc.name)}`}
                    className="btn-outline w-full !min-h-[40px] text-xs font-bold !border-brand/40 !text-brand hover:!bg-brand hover:!text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Video size={15} />
                    <span>{t("doc_see_btn")}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HEALTH CARE AND PROTECT PLANS (DocTime Plans from Screenshot) */}
      <section className="py-14 bg-white">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-care uppercase tracking-wider block mb-1">
              {t("plans_sub")}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-ink-dark">
              {t("plans_heading")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              {t("plans_desc")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HEALTH_PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.99 }}
                className={`relative rounded-3xl border p-6 flex flex-col justify-between transition-all ${plan.popular
                  ? "border-brand bg-white shadow-card ring-2 ring-brand/10"
                  : "border-slate-200 bg-white shadow-clean hover:border-slate-300"
                  }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-care px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-ink-dark">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-ink-dark">৳{plan.price}</span>
                    <span className="text-xs text-slate-500">{plan.period}</span>
                  </div>
                  <span className="text-xs font-semibold text-care block mt-0.5">{plan.target}</span>

                  <div className="my-5 border-t border-slate-100" />

                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} className="text-care shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/family-care?plan=${encodeURIComponent(plan.name)}`}
                    className={`w-full text-xs font-bold justify-center ${plan.popular ? "btn-primary" : "btn-primary !bg-brand hover:!bg-brand-dark"
                      }`}
                  >
                    {t("plans_subscribe")}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC] shadow-clean">
            <div className="grid lg:grid-cols-12">
              <div className="p-6 sm:p-8 lg:col-span-7">
                <span className="text-xs font-bold text-care uppercase tracking-wider block mb-1">
                  বাংলাদেশের বীমা গাইড
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-ink-dark">
                  বীমা পরিকল্পনা কীভাবে কাজ করে?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  সরকারি স্বাস্থ্য বীমা, বেসরকারি হেলথ পলিসি বা জীবন বীমার হেলথ রাইডার — মূল ধাপ একই। নিচের তথ্যগুলো জানলে ক্লেইম ও নবায়ন সহজ হয়।
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {INSURANCE_STEPS.map((step) => (
                    <div key={step.n} className="rounded-2xl border border-slate-200 bg-white p-3.5">
                      <span className="text-[11px] font-black text-brand">{step.n}</span>
                      <p className="mt-0.5 text-sm font-bold text-navy">{step.title}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{step.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  {INSURANCE_GUIDE.map((item) => (
                    <details key={item.title} className="group rounded-2xl border border-slate-200 bg-white p-4 open:shadow-sm">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                        <span>
                          <span className="block text-sm font-black text-navy">{item.title}</span>
                          <span className="mt-0.5 block text-[11px] font-semibold text-brand">{item.type}</span>
                        </span>
                        <ChevronRight size={16} className="mt-1 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-2 border-t border-slate-100 pt-2 text-[11px] leading-relaxed text-slate-600">{item.detail}</p>
                      <p className="mt-1.5 text-[11px] font-semibold text-emerald-700">{item.note}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 bg-white p-4 sm:p-6 lg:col-span-5 lg:border-l lg:border-t-0">
                <div className="mb-4 flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-navy">নমুনা বীমা আবেদন ফর্ম</h4>
                    <p className="mt-0.5 text-[11px] text-slate-500">
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
              className="btn-outline !min-h-[42px] !px-8 text-xs font-bold !border-brand/30 !text-brand hover:!bg-brand-50 inline-flex items-center gap-1.5"
            >
              <span>{t("plans_compare")}</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. HOME DIAGNOSTIC SERVICE (Doorstep Sample Collection from Screenshot) */}
      <section className="py-14 bg-[#F8FAFC]">
        <div className="wrap">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-clean">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Features and Location Input */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-care uppercase tracking-wider block">
                  {t("diag_badge")}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-ink-dark">
                  {t("diag_heading")}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {t("diag_sub")}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand shrink-0">
                      <Clock size={16} />
                    </div>
                    <span>{t("diag_f1")}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <span>{t("diag_f2")}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand shrink-0">
                      <FileSpreadsheet size={16} />
                    </div>
                    <span>{t("diag_f3")}</span>
                  </div>
                </div>

                {/* Interactive Location Finder */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-ink-dark">
                    <MapPin size={15} className="text-brand" />
                    <span>{lang === "bn" ? "স্যাম্পল কালেকশন এরিয়া পরীক্ষক" : "Sample Collection Area Checker"}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={sampleLocation}
                      onChange={(e) => {
                        setSampleLocation(e.target.value);
                        setLocationSaved(false);
                      }}
                      placeholder={t("diag_location_placeholder")}
                      className="search-input !h-11 !text-xs !bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (sampleLocation.trim()) setLocationSaved(true);
                      }}
                      className="btn-primary !min-h-[44px] !px-4 text-xs shrink-0 inline-flex items-center gap-1.5"
                    >
                      <span>{t("diag_location_btn")}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  {locationSaved && (
                    <p className="text-xs font-bold text-brand bg-brand-50 rounded-lg p-2 flex items-center gap-1.5">
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
                    alt="Doorstep Sample Collection DH Medical"
                    className="h-64 sm:h-72 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EMERGENCY AMBULANCE DISPATCH QUICK BOOKING (DH Medical's Core Superpower) */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-care uppercase tracking-wider block mb-1">
                {t("fleet_badge")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink-dark">
                {t("fleet_heading")}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t("fleet_sub")}
              </p>
            </div>
            <Link
              href="/ambulance"
              className="btn-primary !min-h-[42px] !px-6 text-xs font-bold self-start sm:self-auto inline-flex items-center gap-1.5"
            >
              <Ambulance size={16} />
              <span>{t("fleet_view_all")}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AMBULANCE_TYPES_DATA.slice(0, 4).map((amb) => (
              <motion.div
                key={amb.key}
                whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
                whileTap={{ scale: 0.99 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-clean hover:border-brand/40 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-md bg-care-50 px-2 py-0.5 text-[10.5px] font-bold text-care">
                      {amb.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">{amb.eta}</span>
                  </div>

                  <h3 className="text-base font-bold text-ink-dark">{amb.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{amb.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">{t("fleet_base_fare")}</span>
                    <b className="text-sm font-black text-ink-dark">৳{amb.baseFare.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}</b>
                  </div>
                  <Link
                    href={`/ambulance?type=${encodeURIComponent(amb.key)}`}
                    className="btn-primary !min-h-[36px] !px-3.5 !py-1 text-xs font-bold"
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
      <section className="py-14 bg-[#F8FAFC]">
        <div className="wrap">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-clean">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Doctor Visual */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop&q=80"
                    alt="Join DH Medical Doctor Network"
                    className="h-72 w-full object-cover"
                  />
                </div>
              </div>

              {/* Text & Action */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-brand uppercase tracking-wider block">
                  {lang === "bn" ? "স্বাস্থ্য নেটওয়ার্কে যুক্ত হোন" : "Join The Healthcare Network"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-ink-dark">
                  {t("partner_join_title")}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {t("partner_join_sub")}
                </p>

                <div className="space-y-2 text-xs font-medium text-slate-600 pt-1">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-care shrink-0" strokeWidth={2.5} />
                    <span>BMDC verified onboarding process with autonomous medical consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-care shrink-0" strokeWidth={2.5} />
                    <span>24/7 dedicated technical coordination desk for doctors and ambulance drivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-care shrink-0" strokeWidth={2.5} />
                    <span>Timely verified settlements directly to your bank account</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap gap-3">
                  <Link
                    href="/partner"
                    className="btn-primary !min-h-[44px] !px-6 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <span>{t("partner_join_doc")}</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/partner#ambulance"
                    className="btn-outline !min-h-[44px] !px-6 text-xs font-bold !border-brand/30 !text-brand hover:!bg-brand-50 inline-flex items-center gap-1.5"
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
      <section className="relative overflow-hidden py-8 bg-brand text-white">
        <div className="absolute -top-16 -right-16 w-[520px] h-[220px] pointer-events-none opacity-20">
          <DocTimeWavePattern className="w-full h-full text-white" />
        </div>
        <div className="wrap relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-black !text-white text-white">
              {t("hotline_heading")}
            </h3>
            <p className="text-xs !text-white/95 text-white/95 mt-0.5">
              {t("hotline_sub")}
            </p>
          </div>
          <a
            href={SITE.tel}
            className="btn bg-white text-care hover:bg-care hover:text-white !min-h-[46px] !px-7 font-black text-sm shrink-0 shadow-lg inline-flex items-center gap-2 border border-care/20 transition-all"
          >
            <Phone size={18} />
            <span>{t("hotline_call_btn")} {SITE.phone}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
