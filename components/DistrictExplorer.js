"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Phone, ArrowRight, Navigation } from "lucide-react";
import { DISTRICT_GROUPS, findDistricts, findLocations, SITE } from "@/lib/site";

const QUICK_SEARCHES = ["কুমিল্লা", "Comilla", "Cumilla", "ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা"];

export default function DistrictExplorer({ initialQ = "" }) {
  const [q, setQ] = useState(initialQ);
  const [selected, setSelected] = useState(null);

  const locations = useMemo(() => (q.trim() ? findLocations(q).slice(0, 40) : []), [q]);
  const districts = useMemo(() => (q.trim() ? findDistricts(q).slice(0, 12) : []), [q]);

  function selectDistrict(d, division) {
    setQ(d.name);
    setSelected({
      district: d.name,
      districtEn: d.en,
      division,
      upazila: "",
      thanas: [],
      villages: [],
      upazilas: d.upazilas,
    });
  }

  function selectLocation(loc) {
    setSelected(loc);
  }

  return (
    <div className="wrap py-8 space-y-6">
      <section className="card border border-slate-200 p-5 sm:p-7">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand" size={20} />
          <input
            type="search"
            className="input !pl-12 w-full !min-h-[52px] text-base"
            placeholder="জেলা, উপজেলা, থানা বা গ্রাম লিখুন — যেমন Comilla, কুমিল্লা, চান্দিনা"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="জেলা বা এলাকা খুঁজুন"
          />
        </div>

        <div className="-mx-1 mt-3 flex flex-wrap gap-1.5">
          {QUICK_SEARCHES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQ(s)}
              className={`chip ${q === s ? "chip-on" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>

        {q.trim() && (
          <p className="mt-3 text-xs font-semibold text-slate-500">
            {locations.length || districts.length
              ? `${locations.length || districts.length} টি ফলাফল পাওয়া গেছে`
              : "কোনো ফলাফল পাওয়া যায়নি। বাংলা বা ইংরেজি নাম দিয়ে চেষ্টা করুন।"}
          </p>
        )}
      </section>

      {selected && (
        <section className="card border border-brand/20 bg-gradient-to-br from-brand-50/70 via-white to-white p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white px-3 py-1 text-[11px] font-bold">
                <MapPin size={13} /> নির্বাচিত এলাকা
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-brand">
                {selected.district}
                {selected.upazila ? ` › ${selected.upazila}` : ""}
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {selected.districtEn}
                {selected.upazilaEn ? ` › ${selected.upazilaEn}` : ""} · {selected.division}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/ambulance?district=${encodeURIComponent(selected.district)}`}
                className="btn btn-red !min-h-[38px] !px-4 !text-xs flex items-center gap-1.5"
              >
                <Phone size={14} /> অ্যাম্বুলেন্স চাই
              </Link>
              <Link
                href={`/doctors?q=${encodeURIComponent(selected.district)}`}
                className="btn btn-primary !min-h-[38px] !px-4 !text-xs flex items-center gap-1.5"
              >
                ডাক্তার খুঁজুন <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {selected.upazilas?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-500">
                উপজেলা ({selected.upazilas.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.upazilas.map((u) => (
                  <button
                    key={u.name}
                    type="button"
                    onClick={() => setQ(u.name)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-600 hover:border-brand hover:text-brand"
                  >
                    {u.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(selected.thanas?.length > 0 || selected.villages?.length > 0) && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {selected.thanas?.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-500">
                    থানা / পুলিশ স্টেশন
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.thanas.map((t) => (
                      <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selected.villages?.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-500">
                    গ্রাম / এলাকা
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.villages.map((v) => (
                      <span key={v} className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {q.trim() ? (
        <section className="grid gap-3 md:grid-cols-2">
          {locations.map((loc, i) => (
            <button
              key={`${loc.district}-${loc.upazila}-${i}`}
              type="button"
              onClick={() => selectLocation(loc)}
              className={`card border p-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-card ${
                selected?.upazila === loc.upazila && selected?.district === loc.district
                  ? "border-brand bg-brand-50/50"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-brand text-sm">
                    {loc.district} › {loc.upazila}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                    {loc.districtEn} › {loc.upazilaEn} · {loc.division}
                  </p>
                </div>
                <Navigation size={16} className="text-brand shrink-0 mt-1" />
              </div>
              <p className="mt-2 text-[11px] text-slate-500 line-clamp-2">
                {loc.villages.slice(0, 5).join(" · ")}
              </p>
            </button>
          ))}
        </section>
      ) : (
        <section className="space-y-5">
          {DISTRICT_GROUPS.map((group) => (
            <div key={group.division} className="card border border-slate-200 p-5">
              <h3 className="text-sm font-black text-brand">{group.division}</h3>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{group.districts.length} জেলা</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.districts.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => selectDistrict(d, group.division)}
                    className="chip hover:chip-on"
                    title={`${d.en} — ${d.upazilas.length} উপজেলা`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-brand p-5 text-white">
        <div>
          <p className="font-head text-lg font-black">আপনার এলাকায় দ্রুত মেডিকেল সহায়তা চাই?</p>
          <p className="text-xs text-slate-100/80 mt-1">২৪ ঘণ্টা হটলাইনে কল করুন বা অনলাইন ফর্ম পূরণ করুন।</p>
        </div>
        <a href={SITE.tel} className="btn btn-gold !min-h-[40px] !px-5 !text-xs font-black flex items-center gap-1.5">
          <Phone size={14} /> {SITE.phone}
        </a>
      </section>
    </div>
  );
}
