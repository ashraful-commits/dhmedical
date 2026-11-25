"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Phone, ArrowRight, Navigation } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, DISTRICT_QUICK_SEARCHES } from "@/lib/i18nData";
import { DISTRICT_GROUPS, findDistricts, findLocations, SITE } from "@/lib/site";

const DIVISION_EN = {
  "ঢাকা বিভাগ": "Dhaka Division",
  "চট্টগ্রাম বিভাগ": "Chattogram Division",
  "রাজশাহী বিভাগ": "Rajshahi Division",
  "খুলনা বিভাগ": "Khulna Division",
  "বরিশাল বিভাগ": "Barishal Division",
  "সিলেট বিভাগ": "Sylhet Division",
  "রংপুর বিভাগ": "Rangpur Division",
  "ময়মনসিংহ বিভাগ": "Mymensingh Division",
};

export default function DistrictExplorer({ initialQ = "" }) {
  const { lang } = useLanguage();
  const loc = (value) => (value && typeof value === "object" && !Array.isArray(value) ? pick(value, lang) : value);
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
            placeholder={loc({ bn: "জেলা, উপজেলা, থানা বা গ্রাম লিখুন — যেমন Comilla, কুমিল্লা, চান্দিনা", en: "Search district, upazila, thana or village — e.g. Comilla, Cumilla, Chandina" })}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label={loc({ bn: "জেলা বা এলাকা খুঁজুন", en: "Search district or area" })}
          />
        </div>

        <div className="-mx-1 mt-3 flex flex-wrap gap-1.5">
          {DISTRICT_QUICK_SEARCHES.map((s) => (
            <button
              key={s.en}
              type="button"
              onClick={() => setQ(loc(s))}
              className={`chip ${q === loc(s) ? "chip-on" : ""}`}
            >
              {loc(s)}
            </button>
          ))}
        </div>

        {q.trim() && (
          <p className="mt-3 text-xs font-semibold text-slate-500">
            {locations.length || districts.length
              ? loc({ bn: `${locations.length || districts.length} টি ফলাফল পাওয়া গেছে`, en: `${locations.length || districts.length} results found` })
              : loc({ bn: "কোনো ফলাফল পাওয়া যায়নি। বাংলা বা ইংরেজি নাম দিয়ে চেষ্টা করুন।", en: "No results found. Try a Bangla or English name." })}
          </p>
        )}
      </section>

      {selected && (
        <section className="card border border-brand/20 bg-gradient-to-br from-brand-50/70 via-white to-white p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white px-3 py-1 text-[11px] font-bold">
                <MapPin size={13} /> {loc({ bn: "নির্বাচিত এলাকা", en: "Selected area" })}
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-brand">
                {lang === "en" ? selected.districtEn || selected.district : selected.district}
                {selected.upazila ? ` › ${lang === "en" ? selected.upazilaEn || selected.upazila : selected.upazila}` : ""}
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {lang === "en" ? selected.district || selected.districtEn : selected.districtEn || selected.district}
                {selected.upazilaEn ? ` › ${lang === "en" ? selected.upazila || selected.upazilaEn : selected.upazilaEn}` : ""} · {lang === "en" ? DIVISION_EN[selected.division] || selected.division : selected.division}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/ambulance?district=${encodeURIComponent(selected.district)}`}
                className="btn btn-red !min-h-[38px] !px-4 !text-xs flex items-center gap-1.5"
              >
                <Phone size={14} /> {loc({ bn: "অ্যাম্বুলেন্স চাই", en: "Need Ambulance" })}
              </Link>
              <Link
                href={`/doctors?q=${encodeURIComponent(selected.district)}`}
                className="btn btn-primary !min-h-[38px] !px-4 !text-xs flex items-center gap-1.5"
              >
                {loc({ bn: "ডাক্তার খুঁজুন", en: "Find Doctors" })} <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {selected.upazilas?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-500">
                {loc({ bn: "উপজেলা", en: "Upazilas" })} ({selected.upazilas.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.upazilas.map((u) => (
                  <button
                    key={u.name}
                    type="button"
                    onClick={() => setQ(lang === "en" ? u.en || u.name : u.name)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-600 hover:border-brand hover:text-brand"
                  >
                    {lang === "en" ? u.en || u.name : u.name}
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
                    {loc({ bn: "থানা / পুলিশ স্টেশন", en: "Thana / Police Station" })}
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
                    {loc({ bn: "গ্রাম / এলাকা", en: "Village / Area" })}
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
                    {lang === "en" ? loc.districtEn || loc.district : loc.district} › {lang === "en" ? loc.upazilaEn || loc.upazila : loc.upazila}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                    {lang === "en" ? loc.district || loc.districtEn : loc.districtEn || loc.district} › {lang === "en" ? loc.upazila || loc.upazilaEn : loc.upazilaEn || loc.upazila} · {lang === "en" ? DIVISION_EN[loc.division] || loc.division : loc.division}
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
              <h3 className="text-sm font-black text-brand">{lang === "en" ? DIVISION_EN[group.division] || group.division : group.division}</h3>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{group.districts.length} {loc({ bn: "জেলা", en: "districts" })}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.districts.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => selectDistrict(d, group.division)}
                    className="chip hover:chip-on"
                    title={`${d.en} — ${d.upazilas.length} ${loc({ bn: "উপজেলা", en: "upazilas" })}`}
                  >
                    {lang === "en" ? d.en : d.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-brand p-5 text-white">
        <div>
          <p className="font-head text-lg font-black">{loc({ bn: "আপনার এলাকায় দ্রুত মেডিকেল সহায়তা চাই?", en: "Need fast medical support in your area?" })}</p>
          <p className="text-xs text-slate-100/80 mt-1">{loc({ bn: "২৪ ঘণ্টা হটলাইনে কল করুন বা অনলাইন ফর্ম পূরণ করুন।", en: "Call our 24-hour hotline or fill out the online form." })}</p>
        </div>
        <a href={SITE.tel} className="btn btn-gold !min-h-[40px] !px-5 !text-xs font-black flex items-center gap-1.5">
          <Phone size={14} /> {SITE.phone}
        </a>
      </section>
    </div>
  );
}
