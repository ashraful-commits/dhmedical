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
} from "lucide-react";

const PHONE = "(\\+?88)?01[3-9][0-9]{8}";

function Label({ f }) {
  return (
    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
      {f.label}
      {f.required && <span className="text-red font-black"> *</span>}
    </span>
  );
}

function Upload({ f, val, set }) {
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
      if (!r.ok) throw new Error(d.error || "আপলোড ব্যর্থ হয়েছে");
      set(f.name, d.url);
    } catch (x) {
      setErr(x.message || "আপলোড ব্যর্থ হয়েছে");
    }
    setBusy(false);
    e.target.value = "";
  }

  return (
    <div>
      <Label f={f} />
      {val ? (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
          <img src={val} alt="" className="h-20 w-20 rounded-xl object-cover border border-slate-300 shadow-inner shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 size={13} /> ছবি সফলভাবে যুক্ত হয়েছে
            </span>
            <p className="text-[11px] text-slate-500 truncate mt-1">লিংক: {val}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label className="btn btn-navy !min-h-[30px] !px-2.5 !py-1 text-xs cursor-pointer flex items-center gap-1 font-bold">
                <Camera size={13} className="text-gold" /> রি-শট নিন
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
                <UploadCloud size={13} className="text-blue" /> গ্যালারি
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
                মুছুন
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-blue/30 bg-blue-soft/20 p-4 transition-all hover:bg-blue-soft/30">
          {busy ? (
            <div className="flex flex-col items-center justify-center py-4 gap-2 text-center">
              <Loader2 className="animate-spin text-blue" size={30} />
              <p className="text-xs font-bold text-navy">ছবি ক্লাউডিনারিতে আপলোড হচ্ছে, অপেক্ষা করুন…</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-600 text-center">
                নিচের যেকোনো একটি বেছে নিন (ক্যামেরা দিয়ে সরাসরি ছবি তুলুন অথবা গ্যালারি থেকে সিলেক্ট করুন):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Camera Option */}
                <label className="flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-navy-dark cursor-pointer transition-transform active:scale-95">
                  <Camera size={18} className="text-gold" />
                  <span>ক্যামেরা দিয়ে ছবি তুলুন</span>
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
                <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-blue/30 bg-white px-4 py-3 text-xs font-bold text-navy shadow-sm hover:bg-blue-soft/40 cursor-pointer transition-transform active:scale-95">
                  <UploadCloud size={18} className="text-blue" />
                  <span>গ্যালারি থেকে আপলোড</span>
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
                JPG, PNG বা WEBP (সর্বোচ্চ ৫ MB)
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
  const [getting, setGetting] = useState(false);
  const [geoError, setGeoError] = useState("");

  function detectLocation() {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGeoError("আপনার ব্রাউজারে লোকেশন সার্ভিস সমর্থিত নয়");
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
        setGeoError("লোকেশন শনাক্ত করা যায়নি (" + err.message + ")। ফোনের জিপিএস চালু করুন।");
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
            placeholder="গুগল ম্যাপ লিংক বা জিপিএস অবস্থান"
            value={val || ""}
            onChange={(e) => set(f.name, e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={detectLocation}
          disabled={getting}
          className="btn btn-navy shrink-0 !min-h-[42px] !px-4 text-xs font-bold flex items-center justify-center gap-1.5"
        >
          {getting ? (
            <>
              <Loader2 className="animate-spin" size={15} /> অবস্থান খুঁজছি…
            </>
          ) : (
            <>
              <MapPin size={15} className="text-gold" /> আমার বর্তমান লোকেশন দিন
            </>
          )}
        </button>
      </div>

      {val && (
        <div className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={14} />
          <span>লোকেশন চিহ্নিত হয়েছে:</span>
          <a
            href={val}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue flex items-center gap-0.5"
          >
            ম্যাপে অবস্থান খুলুন <ExternalLink size={11} />
          </a>
        </div>
      )}
      {geoError && <p role="alert" className="mt-1 text-xs font-semibold text-red">{geoError}</p>}
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
  const [v, setV] = useState(initial);
  const [st, setSt] = useState({ s: "idle" });
  const set = (k, val) => setV((p) => ({ ...p, [k]: val }));

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
      if (!r.ok) throw new Error(d.error || "ত্রুটি হয়েছে");
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
        <p className="mt-3 font-head text-2xl font-bold text-navy">ধন্যবাদ!</p>
        <p className="mt-1 text-base text-slate-600 max-w-md mx-auto">{success}</p>

        {st.bookingId && (
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-navy to-blue-dark text-white shadow-lg max-w-sm mx-auto">
            <span className="text-xs text-gold font-bold block">আপনার ট্র্যাকিং বুকিং আইডি</span>
            <span className="text-2xl font-black text-white tracking-widest block mt-1">
              {st.bookingId}
            </span>
            <p className="text-[11px] text-blue-soft mt-1">আইডিটি লিখে রাখুন অথবা নিচের বাটনে চাপ দিয়ে লাইভ স্ট্যাটাস দেখুন</p>
            <a
              href={`/track?id=${st.bookingId}`}
              className="btn btn-gold w-full mt-3 font-black !min-h-[38px] !text-xs"
            >
              লাইভ অগ্রগতি ট্র্যাক করুন ➔
            </a>
          </div>
        )}

        <button className="btn btn-line mt-3 !px-6" onClick={() => setSt({ s: "idle" })}>
          আরেকটি অনুরোধ পাঠান
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

      {fields.map((f) => {
        const val = v[f.name];
        const wide =
          f.full || ["textarea", "checks", "radio", "agree", "rating", "image", "location"].includes(f.type)
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
              <option value="">নির্বাচন করুন</option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          );
        } else if (f.type === "checks") {
          ctl = (
            <div className="flex flex-wrap gap-2">
              {f.options.map((o) => {
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
                    {o}
                  </button>
                );
              })}
            </div>
          );
        } else if (f.type === "radio") {
          ctl = (
            <div className="flex flex-wrap gap-2" role="radiogroup">
              {f.options.map((o) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={val === o}
                  key={o}
                  className={`chip ${val === o ? "chip-on" : ""}`}
                  onClick={() => set(f.name, o)}
                >
                  {o}
                </button>
              ))}
            </div>
          );
        } else if (f.type === "rating") {
          ctl = (
            <div className="flex gap-1" role="radiogroup" aria-label="রেটিং">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  role="radio"
                  aria-checked={val === n}
                  aria-label={`${n} তারা`}
                  onClick={() => set(f.name, n)}
                  className="grid h-12 w-12 place-items-center"
                >
                  <Star
                    size={34}
                    className={n <= (val || 0) ? "fill-gold text-gold" : "text-slate-300"}
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
        } else if (f.type === "agree") {
          return (
            <label
              key={f.name}
              className={`flex items-start gap-3 rounded-xl bg-blue-soft/50 p-3 text-sm ${wide}`}
            >
              <input
                type="checkbox"
                required={f.required}
                checked={!!val}
                onChange={(e) => set(f.name, e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-navy"
              />
              <span className="font-medium text-navy">{f.label}</span>
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
        <div className="sm:col-span-2 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-white p-4 sm:p-5 border border-blue-100 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-navy-dark block text-sm">
              আনুমানিক প্রারম্ভিক ভাড়া:{" "}
              <b className="text-red font-black text-base">
                {v.ambulanceType === "ICU"
                  ? "৳৮,০০০"
                  : v.ambulanceType === "NICU"
                    ? "৳৯,৫০০"
                    : v.ambulanceType === "Cardiac"
                      ? "৳৮,৫০০"
                      : v.ambulanceType === "Oxygen"
                        ? "৳২,৫০০"
                        : v.ambulanceType === "Long Distance"
                          ? "৳৪,০০০ (প্রতি কিমি ৳৬৫)"
                          : "৳১,৫০০"}
              </b>
            </span>
            <span className="text-slate-500 block mt-1">
              {v.ambulanceType === "ICU"
                ? "ভেন্টিলেটর, মনিটর ও প্যারামেডিক সহ"
                : v.ambulanceType === "NICU"
                  ? "ইনকিউবেটর ও বেবি সাপোর্ট ট্রলি সহ"
                  : v.ambulanceType === "Oxygen"
                    ? "সেন্ট্রাল অক্সিজেন ও মাস্ক সহ"
                    : "সাশ্রয়ী এসি অ্যাম্বুলেন্স"}
            </span>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="text-slate-500 block text-[11px]">গাড়ি পৌঁছানোর সম্ভাব্য সময়:</span>
            <span className="font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full inline-block mt-1">
              ১৫-২৫ মিনিট (ঢাকা ও জেলা শহর)
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
            পাঠানো হচ্ছে…
          </>
        ) : (
          submit
        )}
      </button>
    </form>
  );
}
