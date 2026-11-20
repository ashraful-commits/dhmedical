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
} from "lucide-react";
import { SITE, SPECIALTIES, spBn } from "@/lib/site";

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
              ? "ডাক্তার বা হাসপাতালের নাম লিখুন"
              : "হাসপাতালের নাম, এলাকা বা সেবার নাম লিখুন"
          }
          aria-label="খুঁজুন"
        />
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
                      alt=""
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
          <p className="text-lg font-bold text-navy">কিছু পাওয়া যায়নি।</p>
          <p className="mt-1 text-sm text-slate-600">
            আপনার প্রয়োজন বলুন, আমরা সঠিক {doc ? "ডাক্তার" : "হাসপাতাল"} খুঁজে দেব।
          </p>
          <a href={SITE.tel} className="btn btn-red mt-4 mx-auto inline-flex items-center gap-2">
            <Phone size={18} />
            {SITE.phone}
          </a>
        </div>
      )}
    </div>
  );
}
