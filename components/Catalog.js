"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Phone, Building2, User } from "lucide-react";
import { SITE, SPECIALTIES, spBn } from "@/lib/site";

export default function Catalog({ kind, q0 = "", sp0 = "" }) {
  const [q, setQ] = useState(q0);
  const [sp, setSp] = useState(sp0);
  const [items, setItems] = useState(null);

  useEffect(() => {
    const t = setTimeout(async () => {
      const p = new URLSearchParams({ q, ...(sp && { specialty: sp }) });
      try { const r = await fetch(`/api/${kind}?${p}`); setItems((await r.json()).items || []); } catch { setItems([]); }
    }, 250);
    return () => clearTimeout(t);
  }, [q, sp, kind]);

  const doc = kind === "doctors";
  return (
    <div className="wrap py-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue" size={20} />
        <input className="input !pl-12" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={doc ? "ডাক্তার বা হাসপাতালের নাম লিখুন" : "হাসপাতাল বা এলাকার নাম লিখুন"} aria-label="খুঁজুন" />
      </div>
      {doc && (
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2">
          {[{ key: "", bn: "সব" }, ...SPECIALTIES].map((s) => (
            <button key={s.key} onClick={() => setSp(s.key)} className={`chip shrink-0 ${sp === s.key ? "chip-on" : ""}`}>{s.bn}</button>
          ))}
        </div>
      )}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items === null && [1, 2, 3].map((i) => <div key={i} className="card h-36 animate-pulse bg-blue-soft/50" />)}
        {items?.map((d) => (
          <article key={d._id} className="card flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {(d.photo || d.logo) ? <img src={d.photo || d.logo} alt="" className="h-16 w-16 rounded-xl object-cover" /> : <span className="grid h-16 w-16 place-items-center rounded-xl bg-blue-soft text-blue">{doc ? <User /> : <Building2 />}</span>}
              <div className="min-w-0">
                <h3 className="font-head text-lg font-bold leading-tight">{d.name}</h3>
                {doc ? <p className="text-sm text-slate-600">{d.degree}</p> : <p className="text-sm text-slate-600">{d.address}</p>}
              </div>
            </div>
            {doc ? (
              <ul className="space-y-0.5 text-sm text-slate-700">
                {d.specialty && <li><b className="text-navy">বিভাগ:</b> {spBn(d.specialty)}</li>}
                {d.hospital && <li><b className="text-navy">হাসপাতাল:</b> {d.hospital}</li>}
                {d.schedule && <li><b className="text-navy">সময়:</b> {d.schedule}</li>}
                {d.fee && <li><b className="text-navy">ফি:</b> {d.fee}</li>}
              </ul>
            ) : d.services ? <p className="text-sm text-slate-700">{d.services}</p> : null}
            <div className="mt-auto flex gap-2">
              {doc && <Link href={`/appointment?doctor=${encodeURIComponent(d.name)}&hospital=${encodeURIComponent(d.hospital || "")}&sp=${encodeURIComponent(d.specialty || "")}`} className="btn btn-red flex-1 !px-3">অ্যাপয়েন্টমেন্ট</Link>}
              {!doc && <Link href={`/appointment?hospital=${encodeURIComponent(d.name)}`} className="btn btn-red flex-1 !px-3">সমন্বয় চাই</Link>}
              <a href={d.phone ? `tel:${d.phone}` : SITE.tel} className="btn btn-line !px-4" aria-label="কল করুন"><Phone size={18} /></a>
            </div>
          </article>
        ))}
      </div>
      {items?.length === 0 && (
        <div className="card mt-4 text-center">
          <p className="font-semibold text-navy">কিছু পাওয়া যায়নি।</p>
          <p className="mt-1 text-slate-600">আপনার প্রয়োজন বলুন, আমরা সঠিক {doc ? "ডাক্তার" : "হাসপাতাল"} খুঁজে দেব।</p>
          <a href={SITE.tel} className="btn btn-red mt-4"><Phone size={18} />{SITE.phone}</a>
        </div>
      )}
    </div>
  );
}
