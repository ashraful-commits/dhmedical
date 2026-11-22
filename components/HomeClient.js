"use client";
import Link from "next/link";
import {
  Phone,
  Search,
  Ambulance,
  Stethoscope,
  Building2,
  FileText,
  Users,
  ShieldCheck,
  HeartPulse,
  Brain,
  Scissors,
  Baby,
  Bone,
  Eye as EyeIcon,
  Pill,
  Activity,
  Clock,
  BadgeCheck,
  Handshake,
  Star,
  Quote,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Award,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import Ecg from "@/components/Ecg";
import { GsapFadeIn, GsapStagger } from "@/components/GsapAnimation";
import { SITE, SPECIALTIES, spBn } from "@/lib/site";

const SP_ICON = {
  "Neuro Medicine": Brain,
  Cardiology: HeartPulse,
  Surgery: Scissors,
  Medicine: Pill,
  Gynecology: Activity,
  Orthopedics: Bone,
  Pediatrics: Baby,
  Eye: EyeIcon,
};

const SERVICES = [
  {
    href: "/ambulance",
    Icon: Ambulance,
    t: "জরুরি অ্যাম্বুলেন্স সার্ভিস",
    d: "সাধারণ এসি, অক্সিজেন, ICU ও নবজাতক (NICU) অ্যাম্বুলেন্স ১৫-২৫ মিনিটে পৌঁছায়।",
    badge: "২৪/৭ জরুরি",
    badgeColor: "bg-red-50 text-red border-red-200",
    img: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&auto=format&fit=crop&q=80",
  },
  {
    href: "/appointment",
    Icon: Stethoscope,
    t: "বিশেষজ্ঞ ডাক্তার সিরিয়াল",
    d: "মেডিসিন, হৃদরোগ, নিউরো, সার্জারি ও শীর্ষ অধ্যাপকদের দ্রুত চেম্বার সিরিয়াল।",
    badge: "জনপ্রিয়",
    badgeColor: "bg-blue-50 text-blue border-blue-200",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
  },
  {
    href: "/hospitals",
    Icon: Building2,
    t: "হাসপাতাল ভর্তি ও বেড সমন্বয়",
    d: "স্কয়ার, এভারকেয়ার, ল্যাবএইড ও জাতীয় হাসপাতালে কেবিন ও আইসিইউ সমন্বয়।",
    badge: "সমন্বয়",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop&q=80",
  },
  {
    href: "/family-care",
    Icon: Users,
    t: "প্রবাসী ফ্যামিলি কেয়ার",
    d: "প্রবাসে থাকা ভাইয়ের দেশে অসুস্থ পরিবারের সার্বক্ষণিক চিকিৎসা তত্ত্বাবধান।",
    badge: "প্রবাসী বিশেষ",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80",
  },
  {
    href: "/appointment",
    Icon: FileText,
    t: "ল্যাব টেস্ট ও রিপোর্ট সংগ্রহ",
    d: "বাসায় এসে রক্তের নমুনা সংগ্রহ এবং দ্রুত রিপোর্ট পরিবারের কাছে পৌঁছে দেওয়া।",
    badge: "হোম কেয়ার",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80",
  },
  {
    href: "/family-care#insurance",
    Icon: ShieldCheck,
    t: "স্বাস্থ্য সুরক্ষা ও বীমা সহায়তা",
    d: "জরুরি চিকিৎসার ব্যয় নির্বাহে অনুমোদিত বীমা পলিসির তথ্য ও আবেদন সমন্বয়।",
    badge: "সুরক্ষা",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
  },
];

export default function HomeClient({ initialDoctors, initialHospitals, initialReviews }) {
  return (
    <>
      {/* Handcrafted Hero Section with GSAP Fade-In */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-dark text-white pt-8 sm:pt-14 pb-16 sm:pb-24">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="wrap relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Mission, Search & Primary Actions */}
            <GsapFadeIn className="lg:col-span-7 space-y-5" delay={0.1} y={30}>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-white border border-white/15 backdrop-blur-md shadow-sm">
                <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
                <span>Care Beyond Borders</span>
                <span className="text-white/40">•</span>
                <span className="text-gold">প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black leading-[1.18] !text-white tracking-tight">
                সারাদেশে দ্রুততম <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-white">মেডিকেল সহায়তা</span> ও জরুরি অ্যাম্বুলেন্স সমন্বয়
              </h1>

              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl">
                জরুরি অসুস্থতায় ১৫-২৫ মিনিটে অ্যাম্বুলেন্স, আইসিইউ বেড কিংবা বিশেষজ্ঞ ডাক্তারের সিরিয়াল—প্রবাসে থাকা ভাইয়ের পরিবার ও দেশের সাধারণ মানুষের নির্ভরযোগ্য সেন্ট্রাল হেলথকেয়ার প্ল্যাটফর্ম।
              </p>

              {/* Smart Search Form */}
              <form action="/doctors" className="max-w-xl pt-1">
                <div className="flex gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg transition-all focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="q"
                      type="search"
                      placeholder="ডাক্তার, এম্বুলেন্স, মেডিসিন বা হাসপাতাল (যেমন: medicin, ambolence)"
                      aria-label="মেডিকেল সেবা খুঁজুন"
                      className="w-full bg-white text-navy font-medium text-xs sm:text-sm pl-10 pr-3 py-3 rounded-xl focus:outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-gold !min-h-[44px] !px-5 text-xs sm:text-sm font-black shadow-md shrink-0"
                  >
                    খুঁজুন
                  </motion.button>
                </div>

                {/* Popular Hashtags */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-blue-soft">
                  <span className="font-semibold text-white/70">জনপ্রিয় সার্চ:</span>
                  <Link href="/doctors?q=medicin" className="rounded-full bg-white/10 px-2.5 py-0.5 hover:bg-white/25 text-white/95 transition-colors">#medicin</Link>
                  <Link href="/doctors?q=ambolence" className="rounded-full bg-white/10 px-2.5 py-0.5 hover:bg-white/25 text-white/95 transition-colors">#ambolence</Link>
                  <Link href="/doctors?q=dockter" className="rounded-full bg-white/10 px-2.5 py-0.5 hover:bg-white/25 text-white/95 transition-colors">#dockter</Link>
                  <Link href="/doctors?q=icu" className="rounded-full bg-white/10 px-2.5 py-0.5 hover:bg-white/25 text-white/95 transition-colors">#ICU</Link>
                  <Link href="/doctors?q=oxygen" className="rounded-full bg-white/10 px-2.5 py-0.5 hover:bg-white/25 text-white/95 transition-colors">#oxygen</Link>
                </div>
              </form>

              {/* 3 Primary Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/ambulance"
                    className="btn btn-red w-full !min-h-[48px] font-black flex items-center justify-center gap-2 shadow-emergency text-sm"
                  >
                    <Ambulance size={19} /> অ্যাম্বুলেন্স বুকিং
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/appointment"
                    className="btn bg-white text-navy hover:bg-slate-100 w-full !min-h-[48px] font-black flex items-center justify-center gap-2 shadow-card text-sm"
                  >
                    <Stethoscope size={19} className="text-blue" /> ডাক্তার সিরিয়াল
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/family-care"
                    className="btn btn-green w-full !min-h-[48px] font-black flex items-center justify-center gap-2 shadow-sm text-sm"
                  >
                    <Users size={19} /> ফ্যামিলি কেয়ার
                  </Link>
                </motion.div>
              </div>
            </GsapFadeIn>

            {/* Right Column: Hero Visual & Live Emergency Coordination Monitor */}
            <GsapFadeIn className="lg:col-span-5" delay={0.25} y={40}>
              <div className="relative">
                {/* Hero Doctor & Ambulance Visual Background */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
                    alt="DH Medical Support Bangladesh"
                    className="h-56 sm:h-64 w-full object-cover brightness-[0.78]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/60 to-transparent" />
                  
                  {/* Floating Doctor Badge on Hero Image */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2 rounded-xl bg-navy/80 px-3 py-1.5 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>২৪/৭ সেন্ট্রাল কন্ট্রোল রুম</span>
                  </div>

                  {/* Floating Hotline Pill on Image */}
                  <a
                    href={SITE.tel}
                    className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-xl bg-red px-3.5 py-1.5 text-xs font-black text-white shadow-emergency hover:bg-red-dark transition-colors"
                  >
                    <Phone size={14} className="animate-pulse" /> {SITE.phone}
                  </a>
                </div>

                {/* Overlapping Command Status Card */}
                <div className="-mt-8 relative z-20 mx-3 rounded-2xl border border-white/20 bg-navy/95 p-5 backdrop-blur-xl shadow-2xl space-y-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Award size={15} className="text-gold" />
                      <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                        লাইভ ডিসপ্যাচ ও নেটওয়ার্ক
                      </span>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
                      সক্রিয়
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <span className="text-white/70 block text-[10px]">গড় পৌঁছানোর সময়</span>
                      <b className="text-white text-sm font-black mt-0.5 block">১৫-২৫ মিনিট</b>
                      <span className="text-emerald-400 text-[9.5px]">ঢাকা ও জেলা শহর</span>
                    </div>

                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <span className="text-white/70 block text-[10px]">প্রস্তুত অ্যাম্বুলেন্স বহর</span>
                      <b className="text-white text-sm font-black mt-0.5 block">১০০+ গাড়ি</b>
                      <span className="text-gold text-[9.5px]">ICU, NICU, অক্সিজেন</span>
                    </div>

                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <span className="text-white/70 block text-[10px]">বিশেষজ্ঞ ডাক্তার নেটওয়ার্ক</span>
                      <b className="text-white text-sm font-black mt-0.5 block">১৪+ বিভাগ</b>
                      <span className="text-blue-200 text-[9.5px]">মেডিসিন, হৃদরোগ, নিউরো</span>
                    </div>

                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <span className="text-white/70 block text-[10px]">পার্টনার হাসপাতাল</span>
                      <b className="text-white text-sm font-black mt-0.5 block">৮+ শীর্ষ হাসপাতাল</b>
                      <span className="text-emerald-400 text-[9.5px]">স্কয়ার, এভারকেয়ার, ল্যাবএইড</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/70 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-400" /> সরকারি ও BMDC অনুমোদিত
                    </span>
                    <Link href="/track" className="text-gold hover:underline font-bold">
                      বুকিং ট্র্যাক করুন →
                    </Link>
                  </div>
                </div>
              </div>
            </GsapFadeIn>

          </div>
        </div>
        <Ecg className="absolute inset-x-0 bottom-0 h-10 w-full opacity-60 pointer-events-none" />
      </section>

      {/* Emergency Strip (High-Conversion Floating Bar) */}
      <div className="wrap -mt-7 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-hover flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-50 text-red border border-red-100">
              <Ambulance size={26} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-red animate-ping" />
                <b className="font-head text-base sm:text-lg text-navy-dark">খুব বেশি জরুরি অবস্থায় আছেন?</b>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                দেরি না করে সরাসরি আমাদের জরুরি হটলাইনে কল দিন — কোঅর্ডিনেটর সাথে সাথে গাড়ি পাঠাবে।
              </p>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={SITE.tel}
            className="btn btn-red shrink-0 !min-h-[44px] !px-5 text-sm font-black flex items-center gap-2 shadow-emergency w-full sm:w-auto justify-center"
          >
            <Phone size={16} className="animate-pulse" />
            কল করুন {SITE.phone}
          </motion.a>
        </motion.div>
      </div>

      {/* Comprehensive Services Section with Images and Motion */}
      <section className="wrap mt-16" aria-labelledby="svc">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <span className="pill">আমাদের সমন্বিত সেবা</span>
            <h2 id="svc" className="text-2xl sm:text-3xl font-black text-navy-dark mt-1.5">
              আপনার পরিবারের স্বাস্থ্য সুরক্ষায় নির্ভরযোগ্য সমাধান
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-xs">
            প্রবাসে থাকা ভাইয়ের পরিবার এবং দেশের প্রত্যন্ত এলাকার রোগীদের পাশে সার্বক্ষণিক মেডিকেল সমন্বয়।
          </p>
        </div>

        <GsapStagger className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.15}>
          {SERVICES.map(({ href, Icon, t, d, badge, badgeColor, img }) => (
            <Link
              key={t}
              href={href}
              className="card card-hover flex flex-col justify-between group overflow-hidden !p-0 border border-slate-200"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={img}
                  alt={t}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                <span className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold border backdrop-blur-md bg-white/90 shadow-sm ${badgeColor}`}>
                  {badge}
                </span>
                <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl bg-white text-navy shadow-md">
                  <Icon size={20} className="text-blue" />
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-head text-lg font-bold text-navy-dark group-hover:text-blue transition-colors">
                    {t}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {d}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue">
                  <span>বিস্তারিত ও বুকিং</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </GsapStagger>
      </section>

      {/* Specialist Doctor Departments Grid */}
      <section className="wrap mt-16" aria-labelledby="sp">
        <div className="flex items-end justify-between">
          <div>
            <span className="pill">ডাক্তার বিভাগ</span>
            <h2 id="sp" className="text-2xl sm:text-3xl font-black text-navy-dark mt-1.5">
              বিশেষজ্ঞ কনসালট্যান্ট বিভাগ
            </h2>
          </div>
          <Link href="/doctors" className="font-bold text-xs text-blue hover:underline flex items-center gap-1">
            সব বিভাগ দেখুন <ArrowRight size={13} />
          </Link>
        </div>

        <GsapStagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" delay={0.1}>
          {SPECIALTIES.map((s) => {
            const I = SP_ICON[s.key] || Stethoscope;
            return (
              <Link
                key={s.key}
                href={`/doctors?sp=${encodeURIComponent(s.key)}`}
                className="card card-hover flex flex-col items-center gap-2.5 !p-4 text-center group border border-slate-200"
              >
                <span className="grid h-13 w-13 place-items-center rounded-2xl bg-slate-50 text-navy group-hover:bg-blue-50 group-hover:text-blue transition-colors">
                  <I size={26} />
                </span>
                <div>
                  <b className="text-sm font-bold text-navy-dark block group-hover:text-blue transition-colors">
                    {s.bn}
                  </b>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{s.key}</span>
                </div>
              </Link>
            );
          })}
        </GsapStagger>
      </section>

      {/* Featured Doctors Section */}
      {initialDoctors.length > 0 && (
        <section className="wrap mt-16" aria-labelledby="feat-doc">
          <div className="flex items-end justify-between">
            <div>
              <span className="pill">স্পেশালিস্ট কনসালট্যান্ট</span>
              <h2 id="feat-doc" className="text-2xl sm:text-3xl font-black text-navy-dark mt-1.5">
                জনপ্রিয় বিশেষজ্ঞ ডাক্তার
              </h2>
            </div>
            <Link href="/doctors" className="font-bold text-xs text-blue hover:underline flex items-center gap-1">
              সব ডাক্তার ({initialDoctors.length}+) <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {initialDoctors.map((d) => (
              <article key={d._id} className="card card-hover flex flex-col justify-between !p-4 border border-slate-200">
                <div>
                  <div className="flex items-center gap-3">
                    {d.photo ? (
                      <img src={d.photo} alt={d.name} className="h-16 w-16 rounded-xl object-cover border border-slate-200 shadow-sm" />
                    ) : (
                      <span className="grid h-16 w-16 place-items-center rounded-xl bg-blue-50 text-blue">
                        <Stethoscope size={24} />
                      </span>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-head text-base font-bold leading-tight text-navy truncate">{d.name}</h3>
                      <p className="text-xs text-blue font-semibold mt-0.5">{spBn(d.specialty)}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">{d.degree}</p>
                  <p className="mt-1 text-xs font-medium text-slate-700 line-clamp-1">{d.hospital}</p>
                  {d.fee && <p className="mt-1.5 text-xs font-black text-red">ফি: {d.fee}</p>}
                </div>
                <Link
                  href={`/appointment?doctor=${encodeURIComponent(d.name)}&hospital=${encodeURIComponent(d.hospital || "")}&sp=${encodeURIComponent(d.specialty || "")}`}
                  className="btn btn-red mt-4 w-full !min-h-[36px] !py-1 text-xs font-bold shadow-sm"
                >
                  <CalendarCheck size={14} /> সিরিয়াল নিন
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Expatriate Family Care Banner */}
      <section className="mt-16 bg-gradient-to-br from-emerald-800 via-emerald-700 to-navy-dark text-white relative overflow-hidden">
        <div className="wrap grid gap-8 py-12 md:grid-cols-12 md:items-center relative z-10">
          <div className="md:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-gold backdrop-blur-md">
              <Sparkles size={13} /> DH FAMILY CARE
            </span>
            <h2 className="!text-white text-3xl sm:text-4xl font-black leading-tight">
              প্রবাসে আপনি, দেশে আপনার পরিবারের পাশে আমরা
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
              বিদেশে কর্মরত অবস্থায় পরিবারের চিকিৎসার চিন্তা থেকে মুক্তি পেতে ফ্যামিলি কেয়ার মেম্বারশিপ ও স্বাস্থ্য বীমা সমন্বয় সহায়তা।
            </p>
            <div className="pt-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link href="/family-care" className="btn btn-gold text-sm font-black shadow-md">
                  আজই মেম্বারশিপ নিন →
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl bg-white/10 p-6 border border-white/15 backdrop-blur-md space-y-3 text-xs sm:text-sm">
            {[
              "২৪ ঘণ্টার জরুরি কল সাপোর্ট ও কেয়ার ম্যানেজার",
              "জরুরি অ্যাম্বুলেন্স প্রেরণ ও ট্র্যাকিং সমন্বয়",
              "হাসপাতালে কেবিন, আইসিইউ ও ভর্তি সহায়তা",
              "ল্যাব পরীক্ষা, প্রেসক্রিপশন ও পরিবারের সঙ্গে নিয়মিত ফলোআপ",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-gold" />
                <span className="text-white/95">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Hospitals Showcase with Bed Counts */}
      {initialHospitals.length > 0 && (
        <section className="wrap mt-16" aria-labelledby="hs">
          <div className="flex items-end justify-between">
            <div>
              <span className="pill">হাসপাতাল নেটওয়ার্ক</span>
              <h2 id="hs" className="text-2xl sm:text-3xl font-black text-navy-dark mt-1.5">
                আমাদের পার্টনার হাসপাতাল ও ক্লিনিক
              </h2>
            </div>
            <Link href="/hospitals" className="font-bold text-xs text-blue hover:underline flex items-center gap-1">
              সব হাসপাতাল <ArrowRight size={13} />
            </Link>
          </div>

          <div className="-mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2">
            {initialHospitals.map((h) => (
              <Link
                key={h._id}
                href={`/hospitals?q=${encodeURIComponent(h.name)}`}
                className="card card-hover flex w-48 shrink-0 flex-col items-center gap-2.5 !p-4 text-center group border border-slate-200"
              >
                {h.logo ? (
                  <img src={h.logo} alt={h.name} className="h-14 w-14 rounded-xl object-contain border border-slate-100 p-1" />
                ) : (
                  <span className="grid h-14 w-14 place-items-center rounded-xl bg-blue-50 text-blue">
                    <Building2 size={28} />
                  </span>
                )}
                <b className="text-xs font-bold leading-tight text-navy line-clamp-2 group-hover:text-blue transition-colors">
                  {h.name}
                </b>
                {h.totalBeds && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                    {h.totalBeds.slice(0, 15)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Real Patient & Expatriate Testimonials */}
      {initialReviews.length > 0 && (
        <section className="wrap mt-16" aria-labelledby="reviews-sec">
          <div className="flex items-end justify-between">
            <div>
              <span className="pill">প্রবাসীদের পর্যালোচনা</span>
              <h2 id="reviews-sec" className="text-2xl sm:text-3xl font-black text-navy-dark mt-1.5">
                সেবাগ্রহীতাদের বাস্তব অভিজ্ঞতা
              </h2>
            </div>
            <Link href="/feedback" className="font-bold text-xs text-blue hover:underline flex items-center gap-1">
              সব রিভিউ ({initialReviews.length}+) <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {initialReviews.map((r) => (
              <article key={r._id} className="card flex flex-col justify-between !p-5 border border-slate-200">
                <div>
                  <div className="flex text-gold mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} className={i < (r.rating || 5) ? "fill-gold text-gold" : "text-slate-300"} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-4">
                    &quot;{r.comment}&quot;
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <b className="font-bold text-navy-dark">{r.name}</b>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue">
                    {r.service}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Ambulance Partner Banner */}
      <section className="wrap mt-16 pb-12">
        <div className="card border-red/20 bg-gradient-to-r from-red-50/50 via-white to-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 !p-6 shadow-card">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-red text-white shadow-emergency">
              <Ambulance size={28} />
            </span>
            <div>
              <h3 className="font-head text-lg sm:text-xl font-bold text-navy-dark">
                অ্যাম্বুলেন্স ড্রাইভার বা গাড়ির মালিক?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                আমাদের নেটওয়ার্কে যুক্ত হয়ে নিয়মিত ট্রিপ পান। মোবাইল ক্যামেরা দিয়ে NID ও লাইসেন্স আপলোড করুন।
              </p>
            </div>
          </div>
          <Link href="/partner" className="btn btn-navy shrink-0 text-xs sm:text-sm font-bold">
            পার্টনার নিবন্ধন করুন →
          </Link>
        </div>
      </section>
    </>
  );
}
