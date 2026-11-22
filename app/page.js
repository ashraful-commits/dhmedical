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
  { href: "/appointment", Icon: Stethoscope, t: "ডাক্তার অ্যাপয়েন্টমেন্ট", d: "সঠিক ডাক্তারের সিরিয়াল ও সময় ঠিক করে দিই" },
  { href: "/ambulance", Icon: Ambulance, t: "অ্যাম্বুলেন্স বুকিং", d: "সাধারণ, অক্সিজেন, ICU ও নবজাতক অ্যাম্বুলেন্স" },
  { href: "/hospitals", Icon: Building2, t: "হাসপাতাল সমন্বয়", d: "ভর্তি, কেবিন/ICU ও কেস ফলোআপ" },
  { href: "/appointment", Icon: FileText, t: "পরীক্ষা ও রিপোর্ট সংগ্রহ", d: "মেডিকেল পরীক্ষা করিয়ে রিপোর্ট পরিবারের কাছে পৌঁছে দিই" },
  { href: "/family-care", Icon: Users, t: "ফ্যামিলি কেয়ার মেম্বারশিপ", d: "প্রবাসীর পরিবারের জন্য ২৪ ঘণ্টার সহায়তা" },
  { href: "/family-care#insurance", Icon: ShieldCheck, t: "বীমা পলিসি সহায়তা", d: "অনুমোদিত বীমা পলিসির তথ্য ও আবেদন সহায়তা" },
];

export default async function Home() {
  const hospitals = await getList("hospitals", 8);
  const doctors = await getList("doctors", 4);
  const reviews = await getList("feedback", 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-blue text-white">
        <div className="wrap pb-14 pt-8 sm:pt-14">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
            <HeartPulse size={16} className="text-gold" />Care Beyond Borders
          </p>
          <h1 className="mt-4 max-w-3xl !text-white text-[2rem] font-extrabold leading-tight sm:text-5xl">
            {SITE.tagline}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-blue-soft">
            দেশে পরিবারের কেউ অসুস্থ হলে ডাক্তার, হাসপাতাল ও অ্যাম্বুলেন্স — সব সমন্বয় আমরা করি। আপনি নিশ্চিন্তে থাকুন।
          </p>
          <form action="/doctors" className="mt-6 max-w-xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue" size={20} />
                <input
                  name="q"
                  type="search"
                  placeholder="ডাক্তার, এম্বুলেন্স বা মেডিসিন খুঁজুন (যেমন: medicin, ambolence, icu)"
                  aria-label="খুঁজুন"
                  className="input !rounded-full !pl-12 !text-navy placeholder:text-slate-400"
                />
              </div>
              <button className="btn btn-gold !px-6 font-bold shadow-md">খুঁজুন</button>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-blue-soft">
              <span className="font-semibold text-white/80">জনপ্রিয় সার্চ:</span>
              <Link href="/doctors?q=medicin" className="rounded-full bg-white/15 px-2.5 py-0.5 hover:bg-white/30 text-white transition-colors">#medicin</Link>
              <Link href="/doctors?q=ambolence" className="rounded-full bg-white/15 px-2.5 py-0.5 hover:bg-white/30 text-white transition-colors">#ambolence</Link>
              <Link href="/doctors?q=dockter" className="rounded-full bg-white/15 px-2.5 py-0.5 hover:bg-white/30 text-white transition-colors">#dockter</Link>
              <Link href="/doctors?q=icu" className="rounded-full bg-white/15 px-2.5 py-0.5 hover:bg-white/30 text-white transition-colors">#ICU</Link>
              <Link href="/doctors?q=oxygen" className="rounded-full bg-white/15 px-2.5 py-0.5 hover:bg-white/30 text-white transition-colors">#oxygen</Link>
            </div>
          </form>
          <div className="mt-5 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            <Link href="/ambulance" className="btn btn-red">
              <Ambulance size={20} />অ্যাম্বুলেন্স
            </Link>
            <Link href="/appointment" className="btn bg-white text-navy">
              <Stethoscope size={20} />অ্যাপয়েন্টমেন্ট
            </Link>
            <Link href="/family-care" className="btn btn-green">
              <Users size={20} />ফ্যামিলি কেয়ার
            </Link>
          </div>
        </div>
        <Ecg className="absolute inset-x-0 bottom-0 h-10 w-full opacity-70" />
      </section>

      {/* Emergency strip */}
      <div className="wrap -mt-5 relative z-10">
        <a href={SITE.tel} className="flex items-center justify-between gap-3 rounded-2xl bg-red px-5 py-4 text-white shadow-lg">
          <span>
            <b className="block font-head text-lg">জরুরি অবস্থায় কল করুন</b>
            <span className="text-sm opacity-90">২৪ ঘণ্টা সাপোর্ট</span>
          </span>
          <span className="flex items-center gap-2 text-xl font-extrabold sm:text-2xl">
            <Phone />{SITE.phone}
          </span>
        </a>
      </div>

      {/* Services */}
      <section className="wrap mt-12" aria-labelledby="svc">
        <h2 id="svc" className="pill">আমাদের সেবা সমূহ</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ href, Icon, t, d }) => (
            <Link key={t} href={href} className="card flex items-start gap-4 hover:border-blue">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-soft text-navy">
                <Icon />
              </span>
              <span>
                <b className="block font-head text-lg text-navy">{t}</b>
                <span className="text-slate-600">{d}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Specialties */}
      <section className="wrap mt-14" aria-labelledby="sp">
        <div className="flex items-end justify-between">
          <h2 id="sp" className="text-3xl font-extrabold">বিশেষজ্ঞ ডাক্তার বিভাগ</h2>
          <Link href="/doctors" className="font-semibold text-blue">সব দেখুন</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SPECIALTIES.map((s) => {
            const I = SP_ICON[s.key];
            return (
              <Link
                key={s.key}
                href={`/doctors?sp=${encodeURIComponent(s.key)}`}
                className="card flex flex-col items-center gap-2 !p-4 text-center hover:border-blue"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-blue-soft text-navy">
                  <I />
                </span>
                <b className="text-navy">{s.bn}</b>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Doctors Section */}
      {doctors.length > 0 && (
        <section className="wrap mt-14" aria-labelledby="feat-doc">
          <div className="flex items-end justify-between">
            <div>
              <span className="pill">স্পেশালিস্ট কনসালট্যান্ট</span>
              <h2 id="feat-doc" className="text-3xl font-extrabold mt-1">জনপ্রিয় বিশেষজ্ঞ ডাক্তার</h2>
            </div>
            <Link href="/doctors" className="font-semibold text-blue">সব ডাক্তার ({doctors.length}+)</Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d) => (
              <article key={d._id} className="card flex flex-col justify-between !p-4">
                <div>
                  <div className="flex items-center gap-3">
                    {d.photo ? (
                      <img src={d.photo} alt={d.name} className="h-16 w-16 rounded-xl object-cover border border-slate-100" />
                    ) : (
                      <span className="grid h-16 w-16 place-items-center rounded-xl bg-blue-soft text-blue">
                        <Stethoscope />
                      </span>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-head text-base font-bold leading-tight text-navy truncate">{d.name}</h3>
                      <p className="text-xs text-blue font-semibold mt-0.5">{spBn(d.specialty)}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-600 line-clamp-2">{d.degree}</p>
                  <p className="mt-1 text-xs font-medium text-slate-700 line-clamp-1">{d.hospital}</p>
                  {d.fee && <p className="mt-1 text-xs font-bold text-red">ফি: {d.fee}</p>}
                </div>
                <Link
                  href={`/appointment?doctor=${encodeURIComponent(d.name)}&hospital=${encodeURIComponent(d.hospital || "")}&sp=${encodeURIComponent(d.specialty || "")}`}
                  className="btn btn-red mt-4 w-full !min-h-[36px] !py-1 text-xs font-bold"
                >
                  <CalendarCheck size={14} /> সিরিয়াল নিন
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Family Care Banner */}
      <section className="mt-14 bg-gradient-to-br from-green-dark to-green text-white">
        <div className="wrap grid gap-6 py-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-semibold text-gold">DH FAMILY CARE</p>
            <h2 className="mt-1 !text-white text-3xl font-extrabold">দূরত্ব নয়, এখন আমরা আছি আপনার পাশে</h2>
            <p className="mt-3 text-lg text-white/90">
              ফ্যামিলি কেয়ার মেম্বারশিপ ও অনুমোদিত বীমা পলিসি একসাথে — প্রবাসীর পরিবারের জন্য একটি নির্ভরযোগ্য সুরক্ষা ব্যবস্থা।
            </p>
            <Link href="/family-care" className="btn btn-gold mt-5 text-lg">আজই সদস্য হোন</Link>
          </div>
          <ul className="space-y-2 rounded-2xl bg-white/10 p-5">
            {["২৪ ঘণ্টার জরুরি কল সাপোর্ট", "অ্যাম্বুলেন্স বুকিং সমন্বয়", "হাসপাতাল যোগাযোগ ও কেস ফলোআপ", "পরিবারের সঙ্গে নিয়মিত যোগাযোগ"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <BadgeCheck className="shrink-0 text-gold" />{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partner Hospitals */}
      {hospitals.length > 0 && (
        <section className="wrap mt-14" aria-labelledby="hs">
          <div className="flex items-end justify-between">
            <h2 id="hs" className="text-3xl font-extrabold">আমাদের পার্টনার হাসপাতাল</h2>
            <Link href="/hospitals" className="font-semibold text-blue">সব দেখুন</Link>
          </div>
          <div className="-mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-2">
            {hospitals.map((h) => (
              <Link
                key={h._id}
                href={`/hospitals?q=${encodeURIComponent(h.name)}`}
                className="card flex w-44 shrink-0 flex-col items-center gap-2 !p-4 text-center hover:border-blue"
              >
                {h.logo ? (
                  <img src={h.logo} alt="" className="h-14 w-14 rounded-lg object-contain" />
                ) : (
                  <Building2 className="text-blue" size={40} />
                )}
                <b className="text-xs leading-tight text-navy mt-1 line-clamp-2">{h.name}</b>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      {reviews.length > 0 && (
        <section className="wrap mt-14" aria-labelledby="reviews-sec">
          <div className="flex items-end justify-between">
            <div>
              <span className="pill">প্রবাসীদের পর্যালোচনা</span>
              <h2 id="reviews-sec" className="text-3xl font-extrabold mt-1">সেবাগ্রহীতাদের বাস্তব অভিজ্ঞতা</h2>
            </div>
            <Link href="/feedback" className="font-semibold text-blue">সব রিভিউ</Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
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
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <b className="text-xs font-bold text-navy">{r.name}</b>
                  <span className="text-[11px] text-blue font-semibold">{r.service}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Ambulance Partner CTA */}
      <section className="wrap mt-14">
        <div className="card flex flex-col items-start gap-4 border-red/30 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-red text-white">
              <Ambulance size={30} />
            </span>
            <div>
              <h3 className="font-head text-xl font-bold">অ্যাম্বুলেন্স মালিক বা ড্রাইভার?</h3>
              <p className="text-slate-600">আমাদের পার্টনার নেটওয়ার্কে যুক্ত হয়ে নিয়মিত রোগী পান।</p>
            </div>
          </div>
          <Link href="/partner" className="btn btn-navy">পার্টনার হোন</Link>
        </div>
      </section>
    </>
  );
}
