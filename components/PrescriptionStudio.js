"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Camera,
  Check,
  Clock,
  Copy,
  Download,
  FileSpreadsheet,
  Link2,
  Loader2,
  Plus,
  Share2,
  Trash2,
  UploadCloud,
  User,
  Users,
} from "lucide-react";
import { parsePrescriptionText, rowsToCsv, EMPTY_ROW, ROW_FIELDS } from "@/lib/prescriptions";
import { SITE, imageFallback } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import { PRESCRIPTION_FIELD_LABELS } from "@/lib/i18nData";

const FIELD_ICONS = {
  doctor: User,
  medicine: FileSpreadsheet,
  manufacturer: Users,
  timing: Clock,
  days: Clock,
};

export default function PrescriptionStudio({ shareCode = "" }) {
  const { lang } = useLanguage();
  const tr = (bnText, enText) => (lang === "bn" ? bnText : enText);
  const [rows, setRows] = useState([{ ...EMPTY_ROW }]);
  const [rawText, setRawText] = useState("");
  const [patient, setPatient] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [msgKind, setMsgKind] = useState("info");
  const [code, setCode] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const doctorName = useMemo(() => rows.find((r) => r.doctor?.trim())?.doctor || "", [rows]);
  const filledRows = useMemo(() => rows.filter((r) => r.medicine?.trim()), [rows]);
  const fieldLabels = ROW_FIELDS.map((f) => ({
    ...f,
    label: PRESCRIPTION_FIELD_LABELS[f.key]?.[lang] || f.label,
  }));

  function say(text, kind = "info") {
    setMessage(text);
    setMsgKind(kind);
  }

  useEffect(() => {
    setMessage("");
  }, [lang]);

  useEffect(() => {
    if (!shareCode) return;
    let live = true;
    setBusy(true);
    say(tr("শেয়ার করা প্রেসক্রিপশন লোড হচ্ছে…", "Loading the shared prescription…"));
    fetch(`/api/prescriptions?code=${encodeURIComponent(shareCode)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!live) return;
        if (d.rows?.length) {
          setRows(d.rows);
          setCode(d.code || shareCode);
          setPatient(d.patient || "");
          say(tr("প্রেসক্রিপশন লোড হয়েছে। এখন সম্পাদনা বা ডাউনলোড করতে পারেন।", "Prescription loaded. You can now edit or download it."));
        } else {
          say(d.error || tr("প্রেসক্রিপশন পাওয়া যায়নি", "Prescription not found"), "warn");
        }
      })
      .catch(() => live && say(tr("প্রেসক্রিপশন লোড করা যায়নি", "Could not load the prescription"), "warn"))
      .finally(() => live && setBusy(false));
    return () => {
      live = false;
    };
  }, [shareCode, lang]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  async function scanFile(file) {
    if (!file) return;
    setBusy(true);
    setProgress(0);
    say(tr("ছবি পড়া হচ্ছে… প্রথমবার মডেল ডাউনলোড হতে কিছুক্ষণ লাগতে পারে।", "Reading the image… The first run may take a while to download the model."));
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));

    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("ben+eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round((m.progress || 0) * 100));
          }
        },
      });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      const text = String(data?.text || "");
      setRawText(text);
      setRows(parsePrescriptionText(text));
      say(
        text.trim()
          ? tr("OCR সম্পন্ন। নিচের টেবিল যাচাই করে প্রয়োজনীয় জায়গা সম্পাদনা করুন।", "OCR complete. Verify the table below and edit where needed.")
          : tr("ছবি থেকে লেখা শনাক্ত করা যায়নি। নিচে ম্যানুয়ালি তথ্য দিন।", "No text was detected in the image. Please enter the details manually below."),
        text.trim() ? "info" : "warn"
      );
    } catch (e) {
      say(
        tr("OCR চালানো যায়নি (", "Could not run OCR (") + (e.message || tr("অজানা ত্রুটি", "unknown error")) + tr(")। নিচে ম্যানুয়ালি তথ্য দিন।", "). Please enter the details manually below."),
        "warn"
      );
    }
    setBusy(false);
    setProgress(0);
  }

  function updateCell(index, key, value) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [key]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { ...EMPTY_ROW, doctor: doctorName }]);
  }

  function removeRow(index) {
    setRows((prev) => (prev.length === 1 ? [{ ...EMPTY_ROW }] : prev.filter((_, i) => i !== index)));
  }

  function downloadCsv() {
    if (!filledRows.length) {
      say(tr("CSV ডাউনলোড করতে কমপক্ষে একটি ঔষধ যোগ করুন", "Add at least one medicine to download a CSV"), "warn");
      return;
    }
    const blob = new Blob([rowsToCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prescription-${code || "new"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function createShareLink() {
    if (!filledRows.length) {
      say(tr("শেয়ার করতে কমপক্ষে একটি ঔষধ যোগ করুন", "Add at least one medicine to create a share link"), "warn");
      return;
    }
    setBusy(true);
    say(tr("শেয়ার লিংক তৈরি হচ্ছে…", "Creating the share link…"));
    try {
      const r = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor: doctorName,
          patient,
          rows: filledRows,
          source: rawText ? "ocr" : "manual",
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || tr("শেয়ার করা যায়নি", "Could not create the share link"));
      const url = `${window.location.origin}/prescription?share=${d.code}`;
      setCode(d.code);
      setShareUrl(url);
      say(tr("লিংক তৈরি হয়েছে। আপনার স্বজনের সাথে পাঠান।", "Link created. Send it to your loved one."));
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    } catch (e) {
      say(e.message || tr("শেয়ার করা যায়নি", "Could not create the share link"), "warn");
    }
    setBusy(false);
  }

  async function copyLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="wrap py-8 space-y-6">
      <section className="card border border-slate-200 p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="max-w-2xl">
            <span className="pill">{tr("প্রেসক্রিপশন → টেবিল", "Prescription → Table")}</span>
            <h2 className="mt-1 text-lg sm:text-2xl font-black text-brand">
              {tr("ছবি আপলোড করুন, সময়সূচি তৈরি করে আত্মীয়দের পাঠান", "Upload a photo, build a schedule and share it with family")}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
              {tr(
                "ডাক্তারের লেখা প্রেসক্রিপশনের ছবি দিন। স্থানীয় OCR বাংলা ও ইংরেজি পড়ে ঔষধ, কোম্পানি, খাওয়ার সময় ও দিন আলাদা করে দেবে। ভুল হলে নিচের টেবিলে ঠিক করে নিন।",
                "Upload a photo of the doctor's handwritten prescription. Local OCR reads Bangla and English and separates medicine, company, timing and days. Correct anything in the table below."
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="btn btn-primary !min-h-[42px] !px-4 !text-xs flex items-center gap-1.5 cursor-pointer">
              <Camera size={15} className="text-gold" /> {tr("ক্যামেরা থেকে তুলুন", "Take a photo")}
              <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => scanFile(e.target.files?.[0])} />
            </label>
            <label className="btn btn-outline !min-h-[42px] !px-4 !text-xs flex items-center gap-1.5 cursor-pointer">
              <UploadCloud size={15} className="text-brand" /> {tr("গ্যালারি থেকে আপলোড", "Upload from gallery")}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => scanFile(e.target.files?.[0])} />
            </label>
          </div>
        </div>

        {busy && (
          <div className="mt-5">
            <div className="flex items-center gap-2 text-xs font-bold text-brand">
              <Loader2 size={15} className="animate-spin" /> {tr("কাজ চলছে…", "Working…")} {progress ? `${progress}%` : ""}
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progress || 12}%` }} />
            </div>
          </div>
        )}

        {message && (
          <p role="status" className={`mt-4 rounded-xl px-3 py-2 text-xs font-semibold ${msgKind === "warn" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-700"}`}>
            {message}
          </p>
        )}

        {imageUrl && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <img src={imageUrl} alt={tr("আপলোড করা প্রেসক্রিপশন", "Uploaded prescription preview")} onError={imageFallback("document")} className="h-24 w-20 rounded-lg border border-slate-200 object-cover" />
            <div>
              <p className="text-xs font-bold text-brand">{tr("আপলোড করা প্রেসক্রিপশন", "Uploaded prescription")}</p>
              <p className="mt-1 text-[11px] text-slate-500">{tr("প্রয়োজনে নতুন ছবি আপলোড করুন বা নিচের টেবিল সম্পাদনা করুন।", "Upload a new photo if needed or edit the table below.")}</p>
            </div>
          </div>
        )}
      </section>

      <section className="card border border-slate-200 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">{tr("রোগীর নাম (ঐচ্ছিক)", "Patient name (optional)")}</span>
            <input className="input w-full" value={patient} onChange={(e) => setPatient(e.target.value)} placeholder={tr("যেমন: আব্দুল করিম", "e.g. Abdul Karim")} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">{tr("ডাক্তারের নাম", "Doctor's name")}</span>
            <input
              className="input w-full"
              value={doctorName}
              onChange={(e) => {
                const name = e.target.value;
                setRows((prev) => prev.map((r) => ({ ...r, doctor: name })));
              }}
              placeholder={tr("OCR না পড়লে লিখুন", "Enter manually if OCR misses it")}
            />
          </label>
        </div>

        <details className="mt-5 group rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
          <summary className="cursor-pointer list-none text-xs font-black text-brand flex items-center justify-between">
            {tr("OCR টেক্সট দেখুন / ম্যানুয়ালি লিখুন", "View OCR text / Enter manually")}
            <span className="text-brand transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="mt-3 space-y-2">
            <textarea
              rows={6}
              className="input w-full font-mono text-xs"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={tr("যেমন:\nDr. Ahmed Zaman\nTab Napa 500mg\nAfter meal, morning and night\nSquare Pharmaceuticals Ltd", "Example:\nDr. Ahmed Zaman\nTab Napa 500mg\nAfter meal, morning and night\nSquare Pharmaceuticals Ltd")}
            />
            <button
              type="button"
              onClick={() => setRows(parsePrescriptionText(rawText))}
              className="btn btn-line !min-h-[34px] !px-3 !text-xs font-bold"
            >
              {tr("টেক্সট থেকে টেবিল তৈরি করুন", "Build table from text")}
            </button>
          </div>
        </details>
      </section>

      <section className="card border border-slate-200 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-brand">{tr("ঔষধের সময়সূচি টেবিল", "Medicine schedule table")}</h3>
            <p className="mt-0.5 text-[11px] text-slate-500">{tr("প্রতি ঘরে ক্লিক করে সম্পাদনা করুন।", "Click any cell to edit it.")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={addRow} className="btn btn-line !min-h-[36px] !px-3 !text-xs flex items-center gap-1.5">
              <Plus size={14} /> {tr("নতুন ঔষধ", "New medicine")}
            </button>
            <button type="button" onClick={downloadCsv} className="btn btn-primary !min-h-[36px] !px-3 !text-xs flex items-center gap-1.5">
              <Download size={14} /> CSV / Excel
            </button>
            <button type="button" onClick={createShareLink} disabled={busy} className="btn btn-red !min-h-[36px] !px-3 !text-xs flex items-center gap-1.5">
              <Share2 size={14} /> {tr("শেয়ার লিংক", "Share link")}
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[560px] border-collapse text-sm sm:min-w-[760px]">
            <thead>
              <tr className="bg-slate-100 text-left text-[11px] uppercase tracking-wider text-slate-500">
                {fieldLabels.map((f) => {
                  const Icon = FIELD_ICONS[f.key];
                  return (
                    <th key={f.key} className="border border-slate-200 px-3 py-2">
                      <span className="inline-flex items-center gap-1.5"><Icon size={13} /> {f.label}</span>
                    </th>
                  );
                })}
                <th className="border border-slate-200 px-3 py-2">{tr("অ্যাকশন", "Action")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {fieldLabels.map((f) => (
                    <td key={f.key} className="border border-slate-200 p-1.5">
                      <input
                        className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-xs text-brand outline-none focus:border-brand focus:bg-white"
                        value={row[f.key] || ""}
                        onChange={(e) => updateCell(i, f.key, e.target.value)}
                        placeholder={f.label}
                      />
                    </td>
                  ))}
                  <td className="border border-slate-200 p-1.5 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      aria-label={tr("সারি মুছুন", "Delete row")}
                      className="inline-grid h-8 w-8 place-items-center rounded-lg text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {shareUrl && (
        <section className="card border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700">
                <Check size={15} /> {tr("লিংক প্রস্তুত", "Link ready")}
              </span>
              <h3 className="mt-1 text-base font-black text-brand">{tr("বিদেশে থাকা স্বজনের সাথে পাঠান", "Send to a loved one abroad")}</h3>
              <p className="mt-1 text-[11px] text-slate-500">{tr("কোড:", "Code:")} <b className="text-brand">{code}</b> — {tr("যেকেউ এই লিংক খুলে টেবিল দেখতে ও ডাউনলোড করতে পারবেন।", "Anyone with this link can view and download the table.")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={copyLink} className="btn btn-primary !min-h-[38px] !px-3 !text-xs flex items-center gap-1.5">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? tr("কপি হয়েছে", "Copied") : tr("লিংক কপি", "Copy link")}
              </button>
              <a href={shareUrl} target="_blank" rel="noreferrer" className="btn btn-line !min-h-[38px] !px-3 !text-xs flex items-center gap-1.5">
                <Link2 size={14} /> লিংক খুলুন
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-brand p-5 text-white">
        <div>
          <p className="font-head text-lg font-black">OCR ছাড়াও সাহায্য চাই?</p>
          <p className="text-xs text-slate-100/80 mt-1">কো-অর্ডিনেটর আপনার প্রেসক্রিপশন পড়ে টেবিল তৈরি করে দিতে পারেন।</p>
        </div>
        <a href={SITE.tel} className="btn btn-gold !min-h-[40px] !px-5 !text-xs font-black">হটলাইন: {SITE.phone}</a>
      </section>
    </div>
  );
}
