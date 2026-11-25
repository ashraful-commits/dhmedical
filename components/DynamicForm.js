"use client";
import { useState } from "react";
import {
  Camera,
  CheckCircle2,
  Loader2,
  Star,
  MapPin,
  X,
  UploadCloud,
  ExternalLink,
  Search,
} from "lucide-react";
import { findDistricts, findLocations, imageFallback } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import { pick, translateText } from "@/lib/i18nData";

const PHONE = "(\\+?88)?01[3-9][0-9]{8}";

function localize(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value)) return pick(value, lang);
  return typeof value === "string" ? translateText(value, lang) : value;
}

function Label({ f }) {
  const { lang } = useLanguage();
  return (
    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
      {localize(f.label, lang)}
      {f.required && <span className="text-red font-black"> *</span>}
    </span>
  );
}

function Upload({ f, val, set }) {
  const { lang } = useLanguage();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function pick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || (lang === "bn" ? "আপলোড ব্যর্থ হয়েছে" : "Upload failed"));
      set(f.name, d.url);
    } catch (x) {
      setErr(x.message || (lang === "bn" ? "আপলোড ব্যর্থ হয়েছে" : "Upload failed"));
    }
    setBusy(false);
    e.target.value = "";
  }

  return (
    <div>
      <Label f={f} />
      {val ? (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
          <img src={val} alt={lang === "bn" ? "আপলোড করা ছবি" : "Uploaded preview"} onError={imageFallback("document")} className="h-20 w-20 rounded-xl object-cover border border-slate-300 shadow-inner shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 size={13} /> {lang === "bn" ? "ছবি সফলভাবে যুক্ত হয়েছে" : "Photo added successfully"}
            </span>
            <p className="text-[11px] text-slate-500 truncate mt-1">{lang === "bn" ? "লিংক" : "Link"}: {val}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label className="btn btn-primary !min-h-[30px] !px-2.5 !py-1 text-xs cursor-pointer flex items-center gap-1 font-bold">
                <Camera size={13} className="text-gold" /> {lang === "bn" ? "রি-শট নিন" : "Retake"}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="sr-only"
                  onChange={pick}
                  disabled={busy}
                />
              </label>
              <label className="btn btn-line !min-h-[30px] !px-2.5 !py-1 text-xs cursor-pointer flex items-center gap-1 font-bold">
                <UploadCloud size={13} className="text-brand" /> {lang === "bn" ? "গ্যালারি" : "Gallery"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={pick}
                  disabled={busy}
                />
              </label>
              <button
                type="button"
                onClick={() => set(f.name, "")}
                className="text-xs font-bold text-rose-600 hover:underline px-1"
              >
                {lang === "bn" ? "মুছুন" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-brand/30 bg-slate-100/20 p-4 transition-all hover:bg-slate-100/30">
          {busy ? (
            <div className="flex flex-col items-center justify-center py-4 gap-2 text-center">
              <Loader2 className="animate-spin text-brand" size={30} />
              <p className="text-xs font-bold text-brand">{lang === "bn" ? "ছবি ক্লাউডিনারিতে আপলোড হচ্ছে, অপেক্ষা করুন…" : "Uploading photo to the cloud, please wait…"}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-600 text-center">
                {lang === "bn"
                  ? "নিচের যেকোনো একটি বেছে নিন (ক্যামেরা দিয়ে সরাসরি ছবি তুলুন অথবা গ্যালারি থেকে সিলেক্ট করুন):"
                  : "Choose one option below (take a photo with the camera or select from your gallery):"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Camera Option */}
                <label className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-dark cursor-pointer transition-transform active:scale-95">
                  <Camera size={18} className="text-gold" />
                  <span>{lang === "bn" ? "ক্যামেরা দিয়ে ছবি তুলুন" : "Take a photo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="sr-only"
                    onChange={pick}
                    disabled={busy}
                  />
                </label>

                {/* 2. Gallery / File Upload Option */}
                <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-brand/30 bg-white px-4 py-3 text-xs font-bold text-brand shadow-sm hover:bg-slate-100/40 cursor-pointer transition-transform active:scale-95">
                  <UploadCloud size={18} className="text-brand" />
                  <span>{lang === "bn" ? "গ্যালারি থেকে আপলোড" : "Upload from gallery"}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={pick}
                    disabled={busy}
                  />
                </label>
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                {lang === "bn" ? "JPG, PNG বা WEBP (সর্বোচ্চ ৫ MB)" : "JPG, PNG or WEBP (maximum 5 MB)"}
              </p>
            </div>
          )}
        </div>
      )}
      {err && <p role="alert" className="mt-1.5 text-xs font-semibold text-red">{err}</p>}
    </div>
  );
}

function LocationPicker({ f, val, set }) {
  const { lang } = useLanguage();
  const [getting, setGetting] = useState(false);
  const [geoError, setGeoError] = useState("");

  function detectLocation() {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGeoError(lang === "bn" ? "আপনার ব্রাউজারে লোকেশন সার্ভিস সমর্থিত নয়" : "Location services are not supported in your browser");
      return;
    }
    setGetting(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const link = `https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        set(f.name, link);
        setGetting(false);
      },
      (err) => {
        setGeoError(
          lang === "bn"
            ? "লোকেশন শনাক্ত করা যায়নি (" + err.message + ")। ফোনের জিপিএস চালু করুন।"
            : "Could not detect location (" + err.message + "). Please enable GPS on your device."
        );
        setGetting(false);
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }

  return (
    <div>
      <Label f={f} />
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            className="input !pl-10 w-full"
            placeholder={lang === "bn" ? "গুগল ম্যাপ লিংক বা জিপিএস অবস্থান" : "Google Maps link or GPS location"}
            value={val || ""}
            onChange={(e) => set(f.name, e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={detectLocation}
          disabled={getting}
          className="btn btn-primary shrink-0 !min-h-[42px] !px-4 text-xs font-bold flex items-center justify-center gap-1.5"
        >
          {getting ? (
            <>
              <Loader2 className="animate-spin" size={15} /> {lang === "bn" ? "অবস্থান খুঁজছি…" : "Detecting location…"}
            </>
          ) : (
            <>
              <MapPin size={15} className="text-gold" /> {lang === "bn" ? "আমার বর্তমান লোকেশন দিন" : "Use my current location"}
            </>
          )}
        </button>
      </div>

      {val && (
        <div className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={14} />
          <span>{lang === "bn" ? "লোকেশন চিহ্নিত হয়েছে:" : "Location detected:"}</span>
          <a
            href={val}
            target="_blank"
            rel="noreferrer"
            className="underline text-brand flex items-center gap-0.5"
          >
            {lang === "bn" ? "ম্যাপে অবস্থান খুলুন" : "Open in Maps"} <ExternalLink size={11} />
          </a>
        </div>
      )}
      {geoError && <p role="alert" className="mt-1 text-xs font-semibold text-red">{geoError}</p>}
    </div>
  );
}

function DistrictPicker({ f, val, set }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState(val || "");
  const selected = findDistricts(String(val || "").split("—")[0].trim())[0];
  const showResults = query && query !== val;
  const districts = showResults ? findDistricts(query).slice(0, 8) : [];
  const locations = showResults ? findLocations(query).slice(0, 8) : [];

  function choose(text) {
    set(f.name, text);
    setQuery(text);
  }

  return (
    <div>
      <Label f={f} />
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          className="input !pl-10 w-full"
          placeholder={lang === "bn" ? "জেলা, উপজেলা বা গ্রাম লিখুন (যেমন: Comilla)" : "Enter district, upazila or village (e.g. Comilla)"}
          value={query}
          required={f.required}
          onChange={(e) => {
            setQuery(e.target.value);
            set(f.name, e.target.value);
          }}
        />
      </div>

      {showResults && (districts.length > 0 || locations.length > 0) && (
        <div className="mt-2 max-h-56 overflow-y-auto no-scrollbar rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
          {districts.map((d) => (
            <button
              key={`d-${d.name}`}
              type="button"
              onClick={() => choose(d.name)}
              className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-brand hover:bg-brand-50"
            >
              <span>{d.name} <span className="font-medium text-slate-400">({d.en})</span></span>
              <span className="shrink-0 text-[10px] font-semibold text-brand">
                {d.upazilas.length} {lang === "bn" ? "উপজেলা" : "upazilas"}
              </span>
            </button>
          ))}
          {locations.map((l, i) => (
            <button
              key={`l-${l.district}-${l.upazila}-${i}`}
              type="button"
              onClick={() =>
                choose(`${l.district} — ${l.upazila}${l.matchedVillages[0] ? ` (${l.matchedVillages[0]})` : ""}`)
              }
              className="block w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-brand-50 hover:text-brand"
            >
              {l.district} › {l.upazila} {l.matchedVillages[0] ? `› ${l.matchedVillages[0]}` : ""}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="mt-2 rounded-xl bg-slate-50 p-2.5">
          <p className="mb-1.5 text-[11px] font-bold text-slate-500">
            {lang === "bn" ? selected.name : selected.en} ({lang === "bn" ? selected.en : selected.name}) — {selected.upazilas.length} {lang === "bn" ? "উপজেলা" : "upazilas"}
          </p>
          <div className="flex flex-wrap gap-1">
            {selected.upazilas.map((u) => (
              <button
                key={u.name}
                type="button"
                onClick={() => choose(`${selected.name} — ${u.name}`)}
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10.5px] font-semibold text-slate-600 hover:border-brand hover:text-brand"
              >
                {u.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DynamicForm({
  type,
  fields,
  submit = "জমা দিন",
  headers = {},
  initial = {},
  onDone,
  success = "আপনার তথ্য পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
}) {
  const { lang } = useLanguage();
  const [v, setV] = useState(initial);
  const [st, setSt] = useState({ s: "idle" });
  const set = (k, val) => setV((p) => ({ ...p, [k]: val }));
  const formFields = fields.map((f) => ({
    ...f,
    label: localize(f.label, lang),
    optionLabels: f.optionLabels || f.options?.map((o) => localize(o, lang)),
  }));
  const fareByType = {
    ICU: {
      bn: "৳৮,০০০",
      en: "৳8,000",
      descBn: "ভেন্টিলেটর, মনিটর ও প্যারামেডিক সহ",
      descEn: "With ventilator, monitor and paramedic support",
    },
    NICU: {
      bn: "৳৯,৫০০",
      en: "৳9,500",
      descBn: "ইনকিউবেটর ও বেবি সাপোর্ট ট্রলি সহ",
      descEn: "With incubator and baby support trolley",
    },
    Cardiac: {
      bn: "৳৮,৫০০",
      en: "৳8,500",
      descBn: "কার্ডিয়াক মনিটর ও জরুরি কিট সহ",
      descEn: "With cardiac monitor and emergency kit",
    },
    Oxygen: {
      bn: "৳২,৫০০",
      en: "৳2,500",
      descBn: "সেন্ট্রাল অক্সিজেন ও মাস্ক সহ",
      descEn: "With central oxygen and mask",
    },
    "Long Distance": {
      bn: "৳৪,০০০ (প্রতি কিমি ৳৬৫)",
      en: "৳4,000 (৳65 per km)",
      descBn: "দূরপাল্লার রোগী পরিবহন",
      descEn: "Long distance patient transfer",
    },
    General: {
      bn: "৳১,৫০০",
      en: "৳1,500",
      descBn: "সাশ্রয়ী এসি অ্যাম্বুলেন্স",
      descEn: "Affordable AC ambulance",
    },
  };
  const fare = fareByType[v.ambulanceType] || fareByType.General;

  async function onSubmit(e) {
    e.preventDefault();
    setSt({ s: "loading" });
    try {
      const r = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(v),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || (lang === "bn" ? "ত্রুটি হয়েছে" : "Something went wrong"));
      setSt({ s: "ok", bookingId: d.bookingId || null });
      setV(initial);
      onDone?.();
    } catch (x) {
      setSt({ s: "err", m: x.message });
    }
  }

  if (st.s === "ok")
    return (
      <div className="card text-center py-8" role="status">
        <CheckCircle2 size={48} className="mx-auto text-green" />
        <p className="mt-3 font-head text-2xl font-bold text-brand">{lang === "bn" ? "ধন্যবাদ!" : "Thank you!"}</p>
        <p className="mt-1 text-base text-slate-600 max-w-md mx-auto">{localize(success, lang)}</p>

        {st.bookingId && (
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-[#4B93F5] via-brand to-[#0F63CC] text-white shadow-lg max-w-sm mx-auto">
            <span className="text-xs text-gold font-bold block">{lang === "bn" ? "আপনার ট্র্যাকিং বুকিং আইডি" : "Your tracking booking ID"}</span>
            <span className="block mt-1 break-all text-xl font-black text-white tracking-normal sm:text-2xl sm:tracking-widest">
              {st.bookingId}
            </span>
            <p className="text-[11px] text-slate-100 mt-1">
              {lang === "bn"
                ? "আইডিটি লিখে রাখুন অথবা নিচের বাটনে চাপ দিয়ে লাইভ স্ট্যাটাস দেখুন"
                : "Save this ID or tap the button below to see live status"}
            </p>
            <a
              href={`/track?id=${st.bookingId}`}
              className="btn btn-gold w-full mt-3 font-black !min-h-[38px] !text-xs"
            >
              {lang === "bn" ? "লাইভ অগ্রগতি ট্র্যাক করুন ➔" : "Track live progress ➔"}
            </a>
          </div>
        )}

        <button className="btn btn-line mt-3 !px-6" onClick={() => setSt({ s: "idle" })}>
          {lang === "bn" ? "আরেকটি অনুরোধ পাঠান" : "Send another request"}
        </button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="card border border-slate-200/90 shadow-card bg-white p-6 sm:p-8 rounded-2xl grid gap-5 sm:grid-cols-2">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={v.website || ""}
        onChange={(e) => set("website", e.target.value)}
        aria-hidden="true"
      />

      {formFields.map((f) => {
        const val = v[f.name];
        const wide =
          f.full || ["textarea", "checks", "radio", "agree", "rating", "image", "location", "district"].includes(f.type)
            ? f.type === "image"
              ? ""
              : "sm:col-span-2"
            : "";

        let ctl;
        const common = {
          required: f.required,
          value: val ?? "",
          onChange: (e) => set(f.name, e.target.value),
          className: "input w-full",
          id: f.name,
        };

        if (f.type === "textarea") {
          ctl = <textarea rows={3} {...common} />;
        } else if (f.type === "select") {
          ctl = (
            <select {...common}>
              <option value="">{lang === "bn" ? "নির্বাচন করুন" : "Select"}</option>
              {f.options.map((o, idx) => (
                <option key={o} value={o}>
                  {f.optionLabels?.[idx] ?? localize(o, lang)}
                </option>
              ))}
            </select>
          );
        } else if (f.type === "checks") {
          ctl = (
            <div className="flex flex-wrap gap-2">
              {f.options.map((o, idx) => {
                const on = (val || []).includes(o);
                return (
                  <button
                    type="button"
                    key={o}
                    aria-pressed={on}
                    className={`chip ${on ? "chip-on" : ""}`}
                    onClick={() =>
                      set(f.name, on ? val.filter((x) => x !== o) : [...(val || []), o])
                    }
                  >
                    {f.optionLabels?.[idx] ?? localize(o, lang)}
                  </button>
                  );
                })}
              </div>
            );
          } else if (f.type === "radio") {
          ctl = (
            <div className="flex flex-wrap gap-2" role="radiogroup">
              {f.options.map((o, idx) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={val === o}
                  key={o}
                  className={`chip ${val === o ? "chip-on" : ""}`}
                  onClick={() => set(f.name, o)}
                >
                  {f.optionLabels?.[idx] ?? localize(o, lang)}
                </button>
              ))}
            </div>
          );
        } else if (f.type === "rating") {
          ctl = (
            <div className="flex flex-wrap justify-center gap-1" role="radiogroup" aria-label={lang === "bn" ? "রেটিং" : "Rating"}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  role="radio"
                  aria-checked={val === n}
                  aria-label={`${n} ${lang === "bn" ? "তারা" : "stars"}`}
                  onClick={() => set(f.name, n)}
                  className="grid h-10 w-10 place-items-center sm:h-12 sm:w-12"
                >
                  <Star
                    className={`h-7 w-7 sm:h-[34px] sm:w-[34px] ${
                      n <= (val || 0) ? "fill-gold text-gold" : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          );
        } else if (f.type === "image") {
          return (
            <div key={f.name} className={wide}>
              <Upload f={f} val={val} set={set} />
            </div>
          );
        } else if (f.type === "location") {
          return (
            <div key={f.name} className={wide}>
              <LocationPicker f={f} val={val} set={set} />
            </div>
          );
        } else if (f.type === "district") {
          return (
            <div key={f.name} className={wide}>
              <DistrictPicker f={f} val={val} set={set} />
            </div>
          );
        } else if (f.type === "agree") {
          return (
            <label
              key={f.name}
              className={`flex items-start gap-3 rounded-xl bg-slate-100/50 p-3 text-sm ${wide}`}
            >
              <input
                type="checkbox"
                required={f.required}
                checked={!!val}
                onChange={(e) => set(f.name, e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-brand"
              />
              <span className="font-medium text-brand">{f.label}</span>
            </label>
          );
        } else {
          ctl = (
            <input
              type={f.type || "text"}
              inputMode={f.type === "tel" ? "tel" : f.type === "number" ? "numeric" : undefined}
              pattern={f.type === "tel" ? PHONE : undefined}
              title={f.type === "tel" ? "01XXXXXXXXX" : undefined}
              {...common}
            />
          );
        }

        return (
          <div key={f.name} className={wide}>
            <label htmlFor={f.name}>
              <Label f={f} />
            </label>
            {ctl}
          </div>
        );
      })}

      {type === "ambulance" && (
        <div className="sm:col-span-2 rounded-2xl bg-gradient-to-r from-slate-50 via-slate-50 to-white p-4 sm:p-5 border border-slate-100 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-brand-dark block text-sm">
              {lang === "bn" ? "আনুমানিক প্রারম্ভিক ভাড়া:" : "Estimated starting fare:"}{" "}
              <b className="text-red font-black text-base">{lang === "bn" ? fare.bn : fare.en}</b>
            </span>
            <span className="text-slate-500 block mt-1">{lang === "bn" ? fare.descBn : fare.descEn}</span>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="text-slate-500 block text-[11px]">
              {lang === "bn" ? "গাড়ি পৌঁছানোর সম্ভাব্য সময়:" : "Estimated arrival time:"}
            </span>
            <span className="font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full inline-block mt-1">
              {lang === "bn" ? "১৫-২৫ মিনিট (ঢাকা ও জেলা শহর)" : "15-25 minutes (Dhaka and district towns)"}
            </span>
          </div>
        </div>
      )}

      {st.s === "err" && (
        <p role="alert" className="rounded-lg bg-red/10 p-3 text-sm font-semibold text-red-dark sm:col-span-2">
          {st.m}
        </p>
      )}

      <button className="btn btn-red sm:col-span-2 py-3 text-base font-bold shadow-md" disabled={st.s === "loading"}>
        {st.s === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            {lang === "bn" ? "পাঠানো হচ্ছে…" : "Submitting…"}
          </>
        ) : (
          localize(submit, lang)
        )}
      </button>
    </form>
  );
}
