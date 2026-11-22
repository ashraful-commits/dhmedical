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
import { SITE, SPECIALTIES, spBn } from "@/lib/site";

const POPULAR_SEARCH_TAGS = [
  { label: "মেডিসিন", val: "medicin" },
  { label: "অ্যাম্বুলেন্স", val: "ambolence" },
  { label: "ডাক্তার সিরিয়াল", val: "dockter" },
  { label: "ICU কেয়ার", val: "icu" },
  { label: "অক্সিজেন", val: "oxygen" },
  { label: "হৃদরোগ", val: "cardio" },
  { label: "হাসপাতাল বেড", val: "hospatal" },
];

function getTopServiceMatch(query) {
  if (!query) return null;
  const s = String(query).trim().toLowerCase();

  if (/ambolence|ambulence|ambulance|এম্বুলেন্স|অ্যাম্বুলেন্স|gari|গাড়ি|জরুরি গাড়ি/i.test(s)) {
    return {
      type: "ambulance",
      title: "🚨 জরুরি অ্যাম্বুলেন্স সার্ভিস (AC, অক্সিজেন, ICU, NICU)",
      desc: "সারা দেশে ১৫-২৫ মিনিটের মধ্যে দ্রুততম সময়ে অ্যাম্বুলেন্স প্রেরণ। লাইভ জিপিএস ট্র্যাকিং ও সাশ্রয়ী ভাড়া।",
      ctaText: "অনলাইনে অ্যাম্বুলেন্স বুক করুন",
      ctaLink: "/ambulance",
      hotline: true,
      color: "from-red-600 via-rose-600 to-red-700",
      badge: "জরুরি সেবা শীর্ষ ম্যাচ",
    };
  }

  if (/medicin|medicine|ঔষধ|মেডিসিন|অভ্যন্তরীণ রোগ|প্রেসক্রিপশন/i.test(s)) {
    return {
      type: "medicine",
      title: "💊 মেডিসিন ও স্পেশালিস্ট কনসালটেশন সার্ভিস",
      desc: "একুশে পদকপ্রাপ্ত অধ্যাপক ও সিনিয়র মেডিসিন কনসালট্যান্টদের চেম্বার সিরিয়াল, প্রেসক্রিপশন ও ফলোআপ সহায়তা।",
      ctaText: "মেডিসিন ডাক্তার সিরিয়াল নিন",
      ctaLink: "/appointment?sp=Medicine",
      hotline: false,
      color: "from-blue-700 via-indigo-600 to-navy",
      badge: "মেডিসিন সেবা শীর্ষ ম্যাচ",
    };
  }

  if (/dockter|dakdar|doctor|ডাক্তার|daktar|সিরিয়াল|চেম্বার/i.test(s)) {
    return {
      type: "doctor",
      title: "🩺 বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট ও সিরিয়াল বুকিং",
      desc: "নিউরো, হৃদরোগ, মেডিসিন, সার্জারি, শিশু ও গাইনি বিভাগের শীর্ষ অধ্যাপকদের নিশ্চিত সিরিয়াল ও রুম তথ্য।",
      ctaText: "সরাসরি সিরিয়াল বুক করুন",
      ctaLink: "/appointment",
      hotline: false,
      color: "from-emerald-700 via-teal-700 to-navy",
      badge: "ডাক্তার সেবা শীর্ষ ম্যাচ",
    };
  }

  if (/hospatal|aspatal|hospital|হাসপাতাল|bed|বেড|কেবিন|ভর্তি/i.test(s)) {
    return {
      type: "hospital",
      title: "🏥 হাসপাতাল ভর্তি, কেবিন ও আইসিইউ (ICU) সমন্বয়",
      desc: "এভারকেয়ার, স্কয়ার, ল্যাবএইড, ইউনাইটেড সহ শীর্ষ হাসপাতালের খালি বেড অনুসন্ধান ও কয়তলায় কোন রুম আছে গাইড।",
      ctaText: "হাসপাতাল তালিকা ও বেড দেখুন",
      ctaLink: "/hospitals",
      hotline: true,
      color: "from-navy via-slate-800 to-blue-900",
      badge: "হাসপাতাল শীর্ষ ম্যাচ",
    };
  }

  if (/icu|আইসিইউ|লাইফ সাপোর্ট|ভেন্টিলেটর/i.test(s)) {
    return {
      type: "icu",
      title: "⚡ জরুরি ICU লাইফ সাপোর্ট অ্যাম্বুলেন্স ও বেড সমন্বয়",
      desc: "ভেন্টিলেটর ও সার্বক্ষণিক প্যারামেডিক সহ ক্রিটিক্যাল কেয়ার অ্যাম্বুলেন্স এবং হাসপাতালে সরাসরি ICU কেবিন বুকিং।",
      ctaText: "ICU অ্যাম্বুলেন্স বুক করুন",
      ctaLink: "/ambulance",
      hotline: true,
      color: "from-red-700 via-rose-700 to-navy",
      badge: "ICU লাইফ সাপোর্ট ম্যাচ",
    };
  }

  if (/oxygen|অক্সিজেন|oxigen|oxyzen|শ্বাসকষ্ট/i.test(s)) {
    return {
      type: "oxygen",
      title: "💨 সেন্ট্রাল অক্সিজেন অ্যাম্বুলেন্স ও শ্বাসকষ্ট জরুরি কেয়ার",
      desc: "হাই-ফ্লো সেন্ট্রাল অক্সিজেন সিলিন্ডার, ফ্লোমিটার ও মাস্ক সহ দ্রুততম অ্যাম্বুলেন্স সেবা।",
      ctaText: "অক্সিজেন অ্যাম্বুলেন্স নিন",
      ctaLink: "/ambulance",
      hotline: true,
      color: "from-cyan-700 via-blue-700 to-navy",
      badge: "অক্সিজেন সেবা ম্যাচ",
    };
  }

  return null;
}

export default function Catalog({ kind, q0 = "", sp0 = "" }) {
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
  const topMatch = getTopServiceMatch(q);

  function toggleFloor(id) {
    setOpenFloorId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="wrap py-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue" size={20} />
        <input
          className="input !pl-12 w-full"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={
            doc
              ? "ডাক্তার, মেডিসিন বা হাসপাতালের নাম লিখুন (যেমন: medicin, ambolence, icu)"
              : "হাসপাতালের নাম, এলাকা বা সেবার নাম লিখুন (যেমন: evercare, bed, icu)"
          }
          aria-label="খুঁজুন"
        />
      </div>

      {/* Quick Search Chips */}
      <div className="-mx-4 mt-2.5 flex items-center gap-1.5 overflow-x-auto px-4 pb-1 text-xs">
        <span className="text-slate-500 font-semibold shrink-0">জনপ্রিয় সার্চ:</span>
        {POPULAR_SEARCH_TAGS.map((t) => (
          <button
            key={t.val}
            type="button"
            onClick={() => setQ(t.val)}
            className="rounded-full bg-slate-100 hover:bg-blue-soft text-navy px-2.5 py-1 font-medium transition-colors shrink-0"
          >
            #{t.label}
          </button>
        ))}
      </div>

      {doc && (
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2">
          {[{ key: "", bn: "সব" }, ...SPECIALTIES].map((s) => (
            <button
              key={s.key}
              onClick={() => setSp(s.key)}
              className={`chip shrink-0 ${sp === s.key ? "chip-on" : ""}`}
            >
              {s.bn}
            </button>
          ))}
        </div>
      )}

      {/* TOP SERVICE MATCH BANNER (Displays first when matching any healthcare service) */}
      {topMatch && (
        <div className={`mt-5 rounded-2xl bg-gradient-to-r ${topMatch.color} p-5 text-white shadow-lg animate-fadeIn`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-gold">
                <Sparkles size={14} /> {topMatch.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black !text-white mt-1.5">
                {topMatch.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
                {topMatch.desc}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href={topMatch.ctaLink}
                className="btn bg-white text-navy font-black !min-h-[40px] !px-4 text-xs shadow-md hover:bg-slate-50 flex items-center gap-1.5"
              >
                {topMatch.ctaText} <ArrowRight size={14} />
              </Link>
              {topMatch.hotline && (
                <a
                  href={SITE.tel}
                  className="btn btn-gold font-black !min-h-[40px] !px-4 text-xs shadow-md flex items-center gap-1.5"
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
          [1, 2, 3].map((i) => <div key={i} className="card h-40 animate-pulse bg-blue-soft/50" />)}

        {items?.map((d) => {
          const isFloorOpen = openFloorId === d._id;
          const floorList = Array.isArray(d.floorGuide)
            ? d.floorGuide
            : typeof d.floorGuide === "string"
            ? d.floorGuide.split("\n").filter(Boolean)
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
                      alt={d.name}
                      className="h-16 w-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <span className="grid h-16 w-16 place-items-center rounded-xl bg-blue-soft text-blue shrink-0">
                      {doc ? <User size={28} /> : <Building2 size={28} />}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-head text-lg font-bold leading-tight text-navy">{d.name}</h3>
                    {doc ? (
                      <p className="text-xs text-slate-600 mt-0.5">{d.degree}</p>
                    ) : (
                      <div className="mt-1 flex items-start gap-1 text-xs text-slate-600">
                        <MapPin size={13} className="shrink-0 text-red mt-0.5" />
                        <span className="line-clamp-2">{d.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Doctor details */}
                {doc && (
                  <ul className="mt-3 space-y-1 text-xs text-slate-700 border-t border-slate-100 pt-2.5">
                    {d.specialty && (
                      <li>
                        <b className="text-navy">বিভাগ:</b> {spBn(d.specialty)}
                      </li>
                    )}
                    {d.hospital && (
                      <li>
                        <b className="text-navy">হাসপাতাল:</b> {d.hospital}
                      </li>
                    )}
                    {d.schedule && (
                      <li>
                        <b className="text-navy">সময়সূচি:</b> {d.schedule}
                      </li>
                    )}
                    {d.fee && (
                      <li>
                        <b className="text-navy">ভিজিট ফি:</b>{" "}
                        <span className="font-bold text-red">{d.fee}</span>
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
                        <span>বেড সংখ্যা: {d.totalBeds}</span>
                      </div>
                    )}

                    {/* Services list */}
                    {d.services && (
                      <p className="text-slate-600 leading-relaxed">
                        <b className="text-navy">প্রধান সেবা:</b> {d.services}
                      </p>
                    )}

                    {/* Free Google Maps directions button */}
                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={d.mapUrl || mapSearchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue font-bold hover:underline"
                      >
                        <MapPin size={13} className="text-red" />
                        গুগল ম্যাপে লোকেশন দেখুন <ExternalLink size={11} />
                      </a>
                    </div>

                    {/* Floor & Room Directory (কয়তলায় কোন রুম আছে) */}
                    {floorList.length > 0 && (
                      <div className="rounded-xl border border-blue/20 bg-blue-soft/30 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleFloor(d._id)}
                          className="flex w-full items-center justify-between p-2.5 text-xs font-bold text-navy hover:bg-blue-soft/60 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Layers size={14} className="text-blue" />
                            কয়তলায় কোন রুম আছে (ফ্লোর ডিরেক্টরি)
                          </span>
                          {isFloorOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {isFloorOpen && (
                          <div className="border-t border-blue/15 bg-white p-3 space-y-1.5 animate-fadeIn">
                            {floorList.map((floor, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 border-b border-slate-100 pb-1 last:border-0 last:pb-0"
                              >
                                <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-navy text-[10px] font-bold text-white mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="text-[11px] text-slate-700 leading-tight">
                                  {floor}
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
                    className="btn btn-red flex-1 !min-h-[38px] !px-3 text-xs font-bold"
                  >
                    অ্যাপয়েন্টমেন্ট নিন
                  </Link>
                )}
                {!doc && (
                  <Link
                    href={`/appointment?hospital=${encodeURIComponent(d.name)}`}
                    className="btn btn-red flex-1 !min-h-[38px] !px-3 text-xs font-bold"
                  >
                    ভর্তি ও সমন্বয় চাই
                  </Link>
                )}
                <a
                  href={d.phone ? `tel:${d.phone}` : SITE.tel}
                  className="btn btn-line !min-h-[38px] !px-3.5"
                  aria-label="কল করুন"
                  title="কল করুন"
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
          <p className="text-lg font-bold text-navy">সরাসরি কোনো রেকর্ড মেলেনি।</p>
          <p className="mt-1 text-sm text-slate-600">
            আমাদের কাছে আপনার কাঙ্ক্ষিত ডাক্তার বা সেবা তাৎক্ষণিক রয়েছে। সরাসরি কল করুন:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href={SITE.tel} className="btn btn-red inline-flex items-center gap-2">
              <Phone size={18} />
              জরুরি হটলাইন {SITE.phone}
            </a>
            <Link href="/ambulance" className="btn btn-navy">
              অ্যাম্বুলেন্স বুকিং
            </Link>
            <Link href="/appointment" className="btn bg-white text-navy border border-slate-300">
              ডাক্তার অ্যাপয়েন্টমেন্ট
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
