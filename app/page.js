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
} from "lucide-react";
import Ecg from "@/components/Ecg";
import { SITE, SPECIALTIES, spBn } from "@/lib/site";
import { getList } from "@/lib/data";

export const dynamic = "force-dynamic";

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
    badgeColor: "bg-red-50 text-red border-red-100",
  },
  {
    href: "/appointment",
    Icon: Stethoscope,
    t: "বিশেষজ্ঞ ডাক্তার সিরিয়াল",
    d: "মেডিসিন, হৃদরোগ, নিউরো, সার্জারি ও শীর্ষ অধ্যাপকদের দ্রুত চেম্বার সিরিয়াল।",
    badge: "জনপ্রিয়",
    badgeColor: "bg-blue-50 text-blue border-blue-100",
  },
  {
    href: "/hospitals",
    Icon: Building2,
    t: "হাসপাতাল ভর্তি ও বেড সমন্বয়",
    d: "স্কয়ার, এভারকেয়ার, ল্যাবএইড ও জাতীয় হাসপাতালে কেবিন ও আইসিইউ সমন্বয়।",
    badge: "সমন্বয়",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    href: "/family-care",
    Icon: Users,
    t: "প্রবাসী ফ্যামিলি কেয়ার",
    d: "প্রবাসে থাকা ভাইয়ের দেশে অসুস্থ পরিবারের সার্বক্ষণিক চিকিৎসা তত্ত্বাবধান।",
    badge: "প্রবাসী বিশেষ",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    href: "/appointment",
    Icon: FileText,
    t: "ল্যাব টেস্ট ও রিপোর্ট সংগ্রহ",
    d: "বাসায় এসে রক্তের নমুনা সংগ্রহ এবং দ্রুত রিপোর্ট পরিবারের কাছে পৌঁছে দেওয়া।",
    badge: "হোম কেয়ার",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-100",
  },
  {
    href: "/family-care#insurance",
    Icon: ShieldCheck,
    t: "স্বাস্থ্য সুরক্ষা ও বীমা সহায়তা",
    d: "জরুরি চিকিৎসার ব্যয় নির্বাহে অনুমোদিত বীমা পলিসির তথ্য ও আবেদন সমন্বয়।",
    badge: "সুরক্ষা",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
];

export default async function Home() {
  const hospitals = await getList("hospitals", 8);
  const doctors = await getList("doctors", 4);
  const reviews = await getList("feedback", 3);

  return (
    <>
      {/* Handcrafted Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-dark text-white pt-8 sm:pt-14 pb-16 sm:pb-20">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Mission, Search & Primary Actions */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-white border border-white/15 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
                <span>Care Beyond Borders</span>
                <span className="text-white/40">•</span>
                <span className="text-gold">প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black leading-[1.18] !text-white tracking-tight">
                সারাদেশে দ্রুততম <span className="text-gold">মেডিকেল সহায়তা</span> ও জরুরি অ্যাম্বুলেন্স সমন্বয়
              </h1>

              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl">
                জরুরি অসুস্থতায় ১৫-২৫ মিনিটে অ্যাম্বুলেন্স, আইসিইউ বেড কিংবা বিশেষজ্ঞ ডাক্তারের সিরিয়াল—প্রবাসে থাকা ভাইয়ের পরিবার ও দেশের মানুষের আস্থার ঠিকানা।
              </p>

              {/* Smart Search Form */}
              <form action="/doctors" className="max-w-xl pt-1">
                <div className="flex gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
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
                  <button className="btn btn-gold !min-h-[44px] !px-5 text-xs sm:text-sm font-black shadow-md shrink-0">
                    খুঁজুন
                  </button>
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
                <Link
                  href="/ambulance"
                  className="btn btn-red w-full !min-h-[46px] font-black flex items-center justify-center gap-2 shadow-emergency"
                >
                  <Ambulance size={18} /> অ্যাম্বুলেন্স বুকিং
                </Link>
                <Link
                  href="/appointment"
                  className="btn bg-white text-navy hover:bg-slate-100 w-full !min-h-[46px] font-black flex items-center justify-center gap-2 shadow-card"
                >
                  <Stethoscope size={18} className="text-blue" /> ডাক্তার সিরিয়াল
                </Link>
                <Link
                  href="/family-care"
                  className="btn btn-green w-full !min-h-[46px] font-black flex items-center justify-center gap-2 shadow-sm"
                >
                  <Users size={18} /> ফ্যামিলি কেয়ার
                </Link>
              </div>
            </div>

            {/* Right Column: Live Clinical Coordination Monitor */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-6 backdrop-blur-xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      সেন্ট্রাল মেডিকেল কমান্ড মনিটর
                    </span>
                  </div>
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-gold">
                    ২৪ ঘণ্টা লাইভ
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-white/10 p-3 border border-white/10">
                    <span className="text-white/70 block text-[11px]">পৌঁছানোর সময়</span>
                    <b className="text-white text-base font-black mt-0.5 block">১৫-২৫ মিনিট</b>
                    <span className="text-emerald-300 text-[10px]">ঢাকা ও জেলা পর্যায়ে</span>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3 border border-white/10">
                    <span className="text-white/70 block text-[11px]">অ্যাম্বুলেন্স বহর</span>
                    <b className="text-white text-base font-black mt-0.5 block">১০০+ প্রস্তুত গাড়ি</b>
                    <span className="text-gold text-[10px]">ICU, NICU, অক্সিজেন</span>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3 border border-white/10">
                    <span className="text-white/70 block text-[11px]">স্পেশালিস্ট নেটওয়ার্ক</span>
                    <b className="text-white text-base font-black mt-0.5 block">১৪+ বিভাগ</b>
                    <span className="text-blue-200 text-[10px]">মেডিসিন, হৃদরোগ, নিউরো</span>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3 border border-white/10">
                    <span className="text-white/70 block text-[11px]">হাসপাতাল পার্টনার</span>
                    <b className="text-white text-base font-black mt-0.5 block">৮+ শীর্ষ হাসপাতাল</b>
                    <span className="text-emerald-300 text-[10px]">স্কয়ার, এভারকেয়ার, ল্যাবএইড</span>
                  </div>
                </div>

                {/* Direct Emergency Dispatch Button */}
                <div className="pt-2">
                  <a
                    href={SITE.tel}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-red to-rose-600 text-white font-black hover:brightness-105 transition-all shadow-emergency"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone size={18} className="animate-pulse" />
                      <div className="text-left leading-tight">
                        <span className="text-[10px] block opacity-85">জরুরি প্রয়োজনে সরাসরি কল করুন</span>
                        <span className="text-base font-black tracking-wide">{SITE.phone}</span>
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/20 px-2 py-1 text-[11px] font-bold">
                      কল দিন →
                    </span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/70 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-400" /> সরকারি ও BMDC নিবন্ধিত
                  </span>
                  <Link href="/track" className="text-gold hover:underline font-semibold">
                    বুকিং ট্র্যাক করুন →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
        <Ecg className="absolute inset-x-0 bottom-0 h-10 w-full opacity-60 pointer-events-none" />
      </section>

      {/* Emergency Strip (High-Conversion Float Banner) */}
      <div className="wrap -mt-7 relative z-20">
        <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-hover flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-50 text-red">
              <Ambulance size={26} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-red animate-ping" />
                <b className="font-head text-base sm:text-lg text-navy-dark">খুব বেশি জরুরি অবস্থায় আছেন?</b>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                দেরি না করে সরাসরি আমাদের জরুরি হটলাইনে কল দিন — আমাদের কোঅর্ডিনেটর সাথে সাথে গাড়ি পাঠাবে।
              </p>
            </div>
          </div>

          <a
            href={SITE.tel}
            className="btn btn-red shrink-0 !min-h-[44px] !px-5 text-sm font-black flex items-center gap-2 shadow-emergency w-full sm:w-auto justify-center"
          >
            <Phone size={16} className="animate-pulse" />
            কল করুন {SITE.phone}
          </a>
        </div>
      </div>

      {/* Comprehensive Services Section */}
      <section className="wrap mt-14" aria-labelledby="svc">
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ href, Icon, t, d, badge, badgeColor }) => (
            <Link
              key={t}
              href={href}
              className="card card-hover flex flex-col justify-between group !p-5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue group-hover:bg-blue group-hover:text-white transition-colors duration-200">
                    <Icon size={22} />
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${badgeColor}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="font-head text-base font-bold text-navy-dark group-hover:text-blue transition-colors">
                  {t}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {d}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue">
                <span>বিস্তারিত দেখুন ও বুক করুন</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
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

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SPECIALTIES.map((s) => {
            const I = SP_ICON[s.key] || Stethoscope;
            return (
              <Link
                key={s.key}
                href={`/doctors?sp=${encodeURIComponent(s.key)}`}
                className="card card-hover flex flex-col items-center gap-2.5 !p-4 text-center group"
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
        </div>
      </section>

      {/* Featured Doctors Section */}
      {doctors.length > 0 && (
        <section className="wrap mt-16" aria-labelledby="feat-doc">
          <div className="flex items-end justify-between">
            <div>
              <span className="pill">স্পেশালিস্ট কনসালট্যান্ট</span>
              <h2 id="feat-doc" className="text-2xl sm:text-3xl font-black text-navy-dark mt-1.5">
                জনপ্রিয় বিশেষজ্ঞ ডাক্তার
              </h2>
            </div>
            <Link href="/doctors" className="font-bold text-xs text-blue hover:underline flex items-center gap-1">
              সব ডাক্তার ({doctors.length}+) <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d) => (
              <article key={d._id} className="card card-hover flex flex-col justify-between !p-4">
                <div>
                  <div className="flex items-center gap-3">
                    {d.photo ? (
                      <img src={d.photo} alt={d.name} className="h-16 w-16 rounded-xl object-cover border border-slate-200" />
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
      <section className="mt-16 bg-gradient-to-br from-emerald-800 via-emerald-700 to-navy-dark text-white">
        <div className="wrap grid gap-8 py-12 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-gold">
              <Sparkles size={13} /> DH FAMILY CARE
            </span>
            <h2 className="!text-white text-3xl sm:text-4xl font-black leading-tight">
              প্রবাসে আপনি, দেশে আপনার পরিবারের পাশে আমরা
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
              বিদেশে কর্মরত অবস্থায় পরিবারের চিকিৎসার চিন্তা থেকে মুক্তি পেতে ফ্যামিলি কেয়ার মেম্বারশিপ ও স্বাস্থ্য বীমা সমন্বয় সহায়তা।
            </p>
            <div className="pt-2">
              <Link href="/family-care" className="btn btn-gold text-sm font-black shadow-md">
                আজই মেম্বারশিপ নিন →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 border border-white/15 backdrop-blur-md space-y-3 text-xs sm:text-sm">
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

      {/* Partner Hospitals Showcase */}
      {hospitals.length > 0 && (
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
            {hospitals.map((h) => (
              <Link
                key={h._id}
                href={`/hospitals?q=${encodeURIComponent(h.name)}`}
                className="card card-hover flex w-48 shrink-0 flex-col items-center gap-2.5 !p-4 text-center group"
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
      {reviews.length > 0 && (
        <section className="wrap mt-16" aria-labelledby="reviews-sec">
          <div className="flex items-end justify-between">
            <div>
              <span className="pill">প্রবাসীদের পর্যালোচনা</span>
              <h2 id="reviews-sec" className="text-2xl sm:text-3xl font-black text-navy-dark mt-1.5">
                সেবাগ্রহীতাদের বাস্তব অভিজ্ঞতা
              </h2>
            </div>
            <Link href="/feedback" className="font-bold text-xs text-blue hover:underline flex items-center gap-1">
              সব রিভিউ ({reviews.length}+) <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {reviews.map((r) => (
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
