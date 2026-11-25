"use client";
import { useEffect, useState, useCallback } from "react";
import {
  CalendarCheck,
  Ambulance,
  Users,
  ShieldCheck,
  MessageSquareHeart,
  Stethoscope,
  Building2,
  Trash2,
  Phone,
  Search,
  Plus,
  RefreshCw,
  LogOut,
  Edit2,
  CheckCircle2,
  Clock,
  ExternalLink,
  X,
  MapPin,
  Car,
  DollarSign,
  FileText,
  AlertTriangle,
  UserCheck,
  Navigation,
  Activity,
  Layers,
  Bed,
} from "lucide-react";
import DynamicForm from "@/components/DynamicForm";
import { FORMS } from "@/lib/forms";
import { useLanguage } from "@/context/LanguageContext";
import { pick, translateText } from "@/lib/i18nData";
import { spLabel, imageFallback } from "@/lib/site";

const pair = (bn, en) => ({ bn, en });

const TABS = [
  { id: "ambulance", label: pair("অ্যাম্বুলেন্স বুকিং", "Ambulance Bookings"), Icon: Ambulance },
  { id: "appointments", label: pair("অ্যাপয়েন্টমেন্ট", "Appointments"), Icon: CalendarCheck },
  { id: "partners", label: pair("পার্টনার ও গাড়ি বহর", "Partners & Fleet"), Icon: Car },
  { id: "memberships", label: pair("ফ্যামিলি কেয়ার", "Family Care"), Icon: ShieldCheck },
  { id: "accounts", label: pair("হিসাব ও কমিশন", "Accounts & Commission"), Icon: DollarSign },
  { id: "doctors", label: pair("ডাক্তার তালিকা", "Doctor List"), Icon: Stethoscope },
  { id: "hospitals", label: pair("হাসপাতাল তালিকা", "Hospital List"), Icon: Building2 },
  { id: "feedback", label: pair("গ্রাহক মতামত", "Customer Feedback"), Icon: MessageSquareHeart },
  { id: "activity_logs", label: pair("অ্যাক্টিভিটি লগ", "Activity Logs"), Icon: Activity },
];

const TRACKING_LABELS = {
  requested: { label: pair("অনুরোধ গৃহীত", "Request Received"), cls: "bg-slate-100 text-brand-dark border-slate-300" },
  confirmed: { label: pair("বুকিং নিশ্চিত", "Booking Confirmed"), cls: "bg-amber-100 text-amber-800 border-amber-300" },
  driver_assigned: { label: pair("ড্রাইভার বরাদ্দ", "Driver Assigned"), cls: "bg-purple-100 text-purple-800 border-purple-300" },
  on_the_way: { label: pair("চালক রওনা হয়েছেন", "Driver On The Way"), cls: "bg-slate-100 text-brand-dark border-slate-300" },
  picked_up: { label: pair("রোগী তোলা হয়েছে", "Patient Picked Up"), cls: "bg-slate-100 text-brand-dark border-brand" },
  completed: { label: pair("সম্পন্ন", "Completed"), cls: "bg-green-100 text-green-800 border-green-300" },
  cancelled: { label: pair("বাতিল", "Cancelled"), cls: "bg-rose-100 text-rose-800 border-rose-300" },
};

export default function Admin() {
  const { lang } = useLanguage();
  const loc = (value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) return pick(value, lang);
    return typeof value === "string" ? translateText(value, lang) : value;
  };
  const dataPair = (item, key, fallback = pair("", "")) => {
    const f = typeof fallback === "string" ? pair(fallback, fallback) : fallback;
    return pair(item[key] || f.bn, item[`${key}En`] || item[key] || f.en);
  };
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("ambulance");
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [assigningBooking, setAssigningBooking] = useState(null);
  const [assignForm, setAssignForm] = useState({ driverName: "", driverMobile: "", vehicleRegNo: "", actualFare: "", eta: "১৫-২০ মিনিট" });
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState(null);

  const H = { "x-admin-key": key };

  const load = useCallback(
    async (k = key, currentTab = tab, q = search, st = statusFilter) => {
      setLoading(true);
      try {
        const p = new URLSearchParams();
        if (q) p.set("q", q);
        if (st && st !== "all") p.set("trackingStatus", st);
        const url = `/api/${currentTab}${p.toString() ? "?" + p.toString() : ""}`;
        const r = await fetch(url, { headers: { "x-admin-key": k } });
        if (r.status === 401) {
          setAuthed(false);
          setErr(pair("অননুমোদিত অ্যাক্সেস। সঠিক পাসওয়ার্ড দিয়ে লগইন করুন।", "Unauthorised access. Please log in with the correct password."));
          setLoading(false);
          return;
        }
        const data = await r.json();
        setAuthed(true);
        setErr(null);
        setItems(data.items || []);
        setCounts((prev) => ({ ...prev, [currentTab]: (data.items || []).length }));
      } catch (x) {
        setErr(pair("ডেটা লোড করতে ব্যর্থ: " + x.message, "Failed to load data: " + x.message));
      }
      setLoading(false);
    },
    [tab, key, search, statusFilter]
  );

  useEffect(() => {
    const k = sessionStorage.getItem("dh-admin-session");
    if (k) {
      setKey(k);
      load(k);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (authed) {
      load(key, tab, search, statusFilter);
    }
  }, [tab, statusFilter]); // eslint-disable-line

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (lang === "en" ? "Login failed" : "লগইন ব্যর্থ হয়েছে"));
      sessionStorage.setItem("dh-admin-session", data.token);
      setKey(data.token);
      setAuthed(true);
      load(data.token);
    } catch (x) {
      setErr(pair(x.message, x.message));
    }
    setLoading(false);
  }

  async function updateTracking(id, newTracking) {
    try {
      const r = await fetch(`/api/${tab}`, {
        method: "PATCH",
        headers: { ...H, "Content-Type": "application/json" },
        body: JSON.stringify({ id, trackingStatus: newTracking }),
      });
      if (r.ok) load(key, tab, search, statusFilter);
    } catch (e) {
      alert(lang === "en" ? "Failed to update status" : "স্ট্যাটাস আপডেট ব্যর্থ হয়েছে");
    }
  }

  async function handleAssignSubmit(e) {
    e.preventDefault();
    if (!assigningBooking) return;
    try {
      const r = await fetch(`/api/ambulance`, {
        method: "PATCH",
        headers: { ...H, "Content-Type": "application/json" },
        body: JSON.stringify({
          id: assigningBooking._id,
          updates: {
            driverName: assignForm.driverName,
            driverMobile: assignForm.driverMobile,
            vehicleRegNo: assignForm.vehicleRegNo,
            actualFare: Number(assignForm.actualFare) || Number(assigningBooking.estimatedFare) || 2500,
            eta: assignForm.eta,
            trackingStatus: "driver_assigned",
            status: "contacted",
          },
        }),
      });
      if (r.ok) {
        setAssigningBooking(null);
        load(key, tab, search, statusFilter);
      } else {
        alert(lang === "en" ? "Driver assignment failed" : "ড্রাইভার বরাদ্দ ব্যর্থ হয়েছে");
      }
    } catch (x) {
      alert((lang === "en" ? "Error: " : "ত্রুটি: ") + x.message);
    }
  }

  async function toggleActive(item) {
    try {
      const r = await fetch(`/api/${tab}`, {
        method: "PATCH",
        headers: { ...H, "Content-Type": "application/json" },
        body: JSON.stringify({ id: item._id, active: !item.active }),
      });
      if (r.ok) load(key, tab, search, statusFilter);
    } catch (e) {
      alert(lang === "en" ? "Failed to change status" : "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে");
    }
  }

  async function del(id) {
    if (!confirm(lang === "en" ? "Are you sure you want to delete this record?" : "আপনি কি নিশ্চিত এই রেকর্ডটি মুছে ফেলতে চান?")) return;
    try {
      const r = await fetch(`/api/${tab}?id=${id}`, { method: "DELETE", headers: H });
      if (r.ok) load(key, tab, search, statusFilter);
    } catch (e) {
      alert(lang === "en" ? "Failed to delete" : "মুছতে ব্যর্থ হয়েছে");
    }
  }

  async function handleSeed() {
    if (!confirm(lang === "en" ? "Load real Bangladesh sample data into the database?" : "আপনি কি ডাটাবেজে রিয়েল বাংলাদেশি স্যাম্পল ডেটা লোড করতে চান?")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const r = await fetch("/api/admin/seed", { method: "POST", headers: H });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || (lang === "en" ? "Failed" : "ব্যর্থ হয়েছে"));
      setSeedMsg(pair("✓ সফলভাবে ডাটাবেজে সব রিয়েল ডেটা লোড হয়েছে!", "✓ All real sample data loaded into the database successfully!"));
      load(key, tab);
      setTimeout(() => setSeedMsg(null), 4000);
    } catch (x) {
      alert((lang === "en" ? "Seed failed: " : "সিড ব্যর্থ: ") + x.message);
    }
    setSeeding(false);
  }

  async function saveEdit(e) {
    e.preventDefault();
    try {
      const r = await fetch(`/api/${tab}`, {
        method: "PATCH",
        headers: { ...H, "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingItem._id, updates: editingItem }),
      });
      if (r.ok) {
        setEditingItem(null);
        load(key, tab, search, statusFilter);
      } else {
        alert(lang === "en" ? "Failed to save" : "সংরক্ষণ ব্যর্থ হয়েছে");
      }
    } catch (x) {
      alert((lang === "en" ? "Error: " : "ত্রুটি: ") + x.message);
    }
  }

  function logout() {
    sessionStorage.removeItem("dh-admin-session");
    setAuthed(false);
    setKey("");
  }

  // Secure Server-Side Login Form (No plain visible default keys!)
  if (!authed) {
    return (
      <div className="wrap max-w-md py-16">
        <form
          className="card space-y-5 rounded-2xl border border-slate-200/90 p-8 shadow-card bg-white"
          onSubmit={handleLogin}
        >
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 text-brand border border-slate-100">
              <ShieldCheck size={36} />
            </div>
            <h1 className="mt-3 text-2xl font-black text-brand-dark">D H Medical Support</h1>
            <p className="text-xs text-slate-500 mt-0.5">{loc(pair("সুরক্ষিত অ্যাডমিন কন্ট্রোল প্যানেল", "Secure admin control panel"))}</p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              {loc(pair("অ্যাডমিন সিক্রেট পাসওয়ার্ড", "Admin secret password"))}
            </label>
            <input
              className="input w-full"
              type="password"
              placeholder={loc(pair("গোপন পাসওয়ার্ড লিখুন", "Enter secret password"))}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
            <p className="mt-1 text-[11px] text-slate-400">
              {loc(pair("* সার্ভার-সাইড রেট লিমিটেড ও HMAC সেশন দ্বারা সুরক্ষিত", "* Protected by server-side rate limiting and HMAC sessions"))}
            </p>
          </div>

          {err && (
            <div role="alert" className="rounded-xl bg-red-50 border border-red-100 p-3 text-xs font-bold text-red flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              <span>{loc(err)}</span>
            </div>
          )}

          <button className="btn btn-primary w-full py-3 text-sm font-bold shadow-md" disabled={loading}>
            {loc(loading ? pair("যাচাই করা হচ্ছে…", "Verifying…") : pair("নিরাপদে প্রবেশ করুন", "Sign in securely"))}
          </button>
        </form>
      </div>
    );
  }

  const isCatalog = tab === "doctors" || tab === "hospitals";

  return (
    <div className="wrap max-w-7xl py-6">
      {/* Top Admin Header Bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-[#4B93F5] via-brand to-[#0F63CC] p-6 text-white shadow-card sm:flex-row sm:items-center sm:justify-between border border-white/10">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <ShieldCheck size={14} className="text-gold" /> {loc(pair("সেন্ট্রাল অফিস ম্যানেজমেন্ট ড্যাশবোর্ড", "Central Office Management Dashboard"))}
          </span>
          <h1 className="mt-1 text-2xl font-black sm:text-3xl">D H MEDICAL CENTRAL OPS</h1>
          <p className="text-xs text-slate-100">{loc(pair("রিয়েল-টাইম ডাটাবেজ, ডিসপ্যাচ ও বুকিং অগ্রগতি মনিটরিং", "Real-time database, dispatch and booking progress monitoring"))}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="btn btn-gold !min-h-[40px] !px-4 !py-2 text-xs font-bold shadow-md"
            title={loc(pair("সবগুলো টেবিলে রিয়েল স্যাম্পল ডেটা লোড করুন", "Load real sample data into all tables"))}
          >
            <RefreshCw size={14} className={seeding ? "animate-spin" : ""} />
            {loc(seeding ? pair("লোড হচ্ছে…", "Loading…") : pair("স্যাম্পল ডেটা সিড করুন", "Seed sample data"))}
          </button>
          <button
            onClick={logout}
            className="btn bg-white/15 !min-h-[40px] !px-3 !py-2 text-xs font-semibold text-white hover:bg-white/25"
          >
            <LogOut size={14} /> {loc(pair("লগআউট", "Logout"))}
          </button>
        </div>
      </div>

      {seedMsg && (
        <div className="mb-4 rounded-xl bg-green-500/10 p-3 text-sm font-bold text-green-700">
          {loc(seedMsg)}
        </div>
      )}

      {/* Tabs Selector with Icons */}
      <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto no-scrollbar px-4 pb-2">
        {TABS.map((t) => {
          const on = tab === t.id;
          const I = t.Icon;
          return (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setShowAddForm(false);
                setEditingItem(null);
                setAssigningBooking(null);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${on
                ? "bg-brand text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100/50 border border-slate-200"
                }`}
            >
              <I size={16} className={on ? "text-gold" : "text-brand"} />
              {loc(t.label)}
              {counts[t.id] != null && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${on ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {counts[t.id]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Action / Search / Filter Bar */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(key, tab, search, statusFilter);
          }}
          className="relative flex-1"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="search"
            className="input !pl-10 !h-11 w-full"
            placeholder={loc(pair("বুকিং আইডি, রোগীর নাম, মোবাইল, জেলা বা হাসপাতাল দিয়ে খুঁজুন…", "Search by booking ID, patient name, mobile, district or hospital…"))}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {tab === "ambulance" && (
            <select
              className="input !h-11 w-full min-w-0 !py-1 text-xs font-bold sm:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{loc(pair("সব ট্র্যাকিং স্ট্যাটাস", "All tracking statuses"))}</option>
              <option value="requested">{loc(pair("অনুরোধ গৃহীত", "Request Received"))}</option>
              <option value="confirmed">{loc(pair("বুকিং নিশ্চিত", "Booking Confirmed"))}</option>
              <option value="driver_assigned">{loc(pair("ড্রাইভার বরাদ্দ", "Driver Assigned"))}</option>
              <option value="on_the_way">{loc(pair("চালক রওনা", "On The Way"))}</option>
              <option value="picked_up">{loc(pair("রোগী তোলা হয়েছে", "Picked Up"))}</option>
              <option value="completed">{loc(pair("সম্পন্ন", "Completed"))}</option>
              <option value="cancelled">{loc(pair("বাতিল", "Cancelled"))}</option>
            </select>
          )}

          {isCatalog && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-red !h-11 !px-4 text-xs font-bold"
            >
              <Plus size={16} />
              {loc(showAddForm ? pair("ফর্ম লুকান", "Hide form") : pair(`নতুন ${tab === "doctors" ? "ডাক্তার" : "হাসপাতাল"} যোগ করুন`, `Add New ${tab === "doctors" ? "Doctor" : "Hospital"}`))}
            </button>
          )}

          <button
            onClick={() => load(key, tab, search, statusFilter)}
            className="btn btn-line !h-11 !px-3"
            title={loc(pair("রিফ্রেশ", "Refresh"))}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Driver Assignment Modal */}
      {assigningBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto no-scrollbar rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-bold text-brand flex items-center gap-2">
                  <Car className="text-brand" size={20} /> {loc(pair("অ্যাম্বুলেন্স ও ড্রাইভার বরাদ্দ করুন", "Assign Ambulance & Driver"))}
                </h3>
                <span className="text-xs text-slate-500">
                  {loc(pair("বুকিং আইডি", "Booking ID"))}: <b className="text-brand">{assigningBooking.bookingId}</b> | {loc(pair("রোগী", "Patient"))}: {assigningBooking.patientName}
                </span>
              </div>
              <button
                onClick={() => setAssigningBooking(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-brand mb-1">{loc(pair("ড্রাইভার / চালকের নাম", "Driver Name"))}</label>
                <input
                  className="input w-full"
                  required
                  placeholder={loc(pair("যেমন: মো. আব্দুল জলিল", "e.g. Md Abdul Jalil"))}
                  value={assignForm.driverName}
                  onChange={(e) => setAssignForm({ ...assignForm, driverName: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-bold text-brand mb-1">{loc(pair("ড্রাইভারের মোবাইল নম্বর", "Driver Mobile Number"))}</label>
                <input
                  className="input w-full"
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={assignForm.driverMobile}
                  onChange={(e) => setAssignForm({ ...assignForm, driverMobile: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-bold text-brand mb-1">{loc(pair("গাড়ির রেজিস্ট্রেশন নম্বর", "Vehicle Registration Number"))}</label>
                <input
                  className="input w-full"
                  required
                  placeholder={loc(pair("যেমন: ঢাকা মেট্রো-ছ-৭১-৪৫৬৭", "e.g. DHAKA METRO-CH-71-4567"))}
                  value={assignForm.vehicleRegNo}
                  onChange={(e) => setAssignForm({ ...assignForm, vehicleRegNo: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <label className="block font-bold text-brand mb-1">{loc(pair("ভাড়া (টাকা)", "Fare (Tk)"))}</label>
                  <input
                    type="number"
                    className="input w-full min-w-0"
                    placeholder={loc(pair("যেমন: ৩০০০", "e.g. 3000"))}
                    value={assignForm.actualFare}
                    onChange={(e) => setAssignForm({ ...assignForm, actualFare: e.target.value })}
                  />
                </div>
                <div className="min-w-0">
                  <label className="block font-bold text-brand mb-1">{loc(pair("পৌঁছানোর আনুমানিক সময়", "Estimated arrival time"))}</label>
                  <input
                    className="input w-full min-w-0"
                    value={assignForm.eta}
                    onChange={(e) => setAssignForm({ ...assignForm, eta: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setAssigningBooking(null)}
                  className="btn btn-line !h-9 !px-4"
                >
                  {loc(pair("বাতিল", "Cancel"))}
                </button>
                <button type="submit" className="btn btn-primary !h-9 !px-6 font-bold">
                  {loc(pair("বরাদ্দ নিশ্চিত করুন", "Confirm Assignment"))}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Form (for Doctors & Hospitals) */}
      {isCatalog && showAddForm && (
        <div className="mb-8 rounded-2xl border-2 border-dashed border-brand/40 bg-slate-100/20 p-5 shadow-inner">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand">
              {loc(pair(`নতুন ${tab === "doctors" ? "ডাক্তার" : "হাসপাতাল"} এন্ট্রি করুন`, `Add New ${tab === "doctors" ? "Doctor" : "Hospital"} Entry`))}
            </h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200"
            >
              <X size={20} />
            </button>
          </div>
          <DynamicForm
            key={tab}
            type={tab}
            fields={FORMS[tab]}
            headers={H}
            submit={pair("তালিকায় যোগ করুন", "Add to list")}
            onDone={() => {
              setShowAddForm(false);
              load(key, tab);
            }}
            success={pair("সফলভাবে যোগ করা হয়েছে!", "Added successfully!")}
          />
        </div>
      )}

      {/* Main Content Listing */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-slate-500">
          <span>{loc(pair(`মোট ${items.length} টি রেকর্ড পাওয়া গেছে`, `${items.length} records found`))}</span>
          {loading && <span className="font-semibold text-brand">{loc(pair("লোড হচ্ছে…", "Loading…"))}</span>}
        </div>

        {items.length === 0 && !loading && (
          <div className="card text-center py-12">
            <p className="text-base font-bold text-brand">{loc(pair("কোনো রেকর্ড পাওয়া যায়নি", "No records found"))}</p>
            <p className="mt-1 text-xs text-slate-500">
              {loc(pair('আপনি উপরে "স্যাম্পল ডেটা সিড করুন" বাটনে ক্লিক করে রিয়েল ডেটা লোড করতে পারেন।', 'Click the "Seed sample data" button above to load real data.'))}
            </p>
          </div>
        )}

        {/* Tabular view for Accounts */}
        {tab === "accounts" && items.length > 0 && (
          <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-brand font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">{loc(pair("বুকিং আইডি", "Booking ID"))}</th>
                  <th className="p-3">{loc(pair("সেবার ধরন", "Service Type"))}</th>
                  <th className="p-3">{loc(pair("রোগীর নাম", "Patient Name"))}</th>
                  <th className="p-3">{loc(pair("মোট ভাড়া", "Total Fare"))}</th>
                  <th className="p-3">{loc(pair("ড্রাইভার প্রাপ্য (৮০%)", "Driver Share (80%)"))}</th>
                  <th className="p-3">{loc(pair("অফিস কমিশন (২০%)", "Office Commission (20%)"))}</th>
                  <th className="p-3">{loc(pair("পেমেন্ট অবস্থা", "Payment Status"))}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((acc) => (
                  <tr key={acc._id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-brand">{acc.bookingId || "DH-AMB-001"}</td>
                    <td className="p-3">{loc(acc.serviceType)}</td>
                    <td className="p-3 font-semibold text-brand">{acc.patientName || loc(pair("রোগী", "Patient"))}</td>
                    <td className="p-3 font-black text-brand">৳{acc.totalFare || 0}</td>
                    <td className="p-3 font-bold text-slate-600">৳{acc.partnerShare || 0}</td>
                    <td className="p-3 font-black text-green-700">৳{acc.officeCommission || 0}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${acc.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                        {loc(acc.paymentStatus === "paid" ? pair("পরিশোধিত", "Paid") : pair("বকেয়া", "Due"))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabular view for Activity Logs */}
        {tab === "activity_logs" && items.length > 0 && (
          <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-brand font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">{loc(pair("সময়", "Time"))}</th>
                  <th className="p-3">{loc(pair("অ্যাডমিন ইউজার", "Admin User"))}</th>
                  <th className="p-3">{loc(pair("অ্যাকশন", "Action"))}</th>
                  <th className="p-3">{loc(pair("টার্গেট", "Target"))}</th>
                  <th className="p-3">{loc(pair("বিস্তারিত বিবরণ", "Details"))}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-500 whitespace-nowrap">
                      {new Date(log.createdAt || Date.now()).toLocaleString(lang === "en" ? "en-GB" : "bn-BD")}
                    </td>
                    <td className="p-3 font-bold text-brand">{loc(log.adminUser)}</td>
                    <td className="p-3 font-semibold text-brand">{loc(log.action)}</td>
                    <td className="p-3 text-slate-600">{loc(log.targetType)}</td>
                    <td className="p-3 text-slate-600">{loc(log.details || "-")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Card Grid for Bookings, Fleet, Catalog */}
        {tab !== "accounts" && tab !== "activity_logs" && (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => {
              const meta = TRACKING_LABELS[item.trackingStatus] || TRACKING_LABELS.requested;

              return (
                <article
                  key={item._id}
                  className="card flex flex-col justify-between border border-slate-200 transition-shadow hover:shadow-md"
                >
                  <div>
                    {/* Header with Badges */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        {item.photo || item.logo || item.vehiclePhoto ? (
                          <img
                            src={item.photo || item.logo || item.vehiclePhoto}
                            alt={`${item.name || item.patientName || "DH Medical Support"} profile`}
                            onError={imageFallback(
                              tab === "doctors" ? "doctor" : tab === "ambulance" ? "ambulance" : "hospital"
                            )}
                            className="h-14 w-14 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <span className="grid h-14 w-14 place-items-center rounded-xl bg-slate-100 text-brand font-bold shrink-0">
                            {tab === "doctors" ? (
                              <Stethoscope size={24} />
                            ) : tab === "hospitals" ? (
                              <Building2 size={24} />
                            ) : tab === "ambulance" ? (
                              <Ambulance size={24} />
                            ) : (
                              <Users size={24} />
                            )}
                          </span>
                        )}

                        <div className="min-w-0">
                          {item.bookingId && (
                            <span className="block text-xs font-black text-brand tracking-wide">
                              {loc(pair("আইডি", "ID"))}: {item.bookingId}
                            </span>
                          )}
                          <h2 className="font-head text-base font-bold text-brand leading-tight truncate">
                            {item.patientName || item.name || `${loc(pair("আইডি", "ID"))}: ${item._id.slice(-6)}`}
                          </h2>
                          {item.ambulanceType && (
                            <span className="inline-block mt-0.5 rounded bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red">
                              {loc(pair("ধরন", "Type"))}: {loc(item.ambulanceType)} ({loc(dataPair(item, "patientCondition", pair("সাধারণ", "General")))})
                            </span>
                          )}
                          {item.specialty && (
                            <span className="inline-block mt-0.5 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-brand-dark">
                              {spLabel(item.specialty, lang)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {item.trackingStatus && (
                          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${meta.cls}`}>
                            {loc(meta.label)}
                          </span>
                        )}
                        {typeof item.active === "boolean" && (
                          <button
                            onClick={() => toggleActive(item)}
                            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${item.active
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                              }`}
                          >
                            {loc(item.active ? pair("✓ সক্রিয়", "✓ Active") : pair("✗ নিষ্ক্রিয়", "✗ Inactive"))}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Details Body */}
                    <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                      {item.mobile && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-semibold text-brand">{loc(pair("মোবাইল", "Mobile"))}:</span>
                          <a
                            href={`tel:${item.mobile}`}
                            className="min-w-0 break-words font-bold text-brand hover:underline flex items-center gap-1"
                          >
                            <Phone size={11} /> {item.mobile}
                          </a>
                        </div>
                      )}
                      {item.address && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-semibold text-brand">{loc(pair("পিকআপ ঠিকানা", "Pickup Address"))}:</span>
                          <span className="min-w-0 break-words text-right font-medium">{loc(dataPair(item, "address"))}</span>
                        </div>
                      )}
                      {item.destination && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-semibold text-brand">{loc(pair("গন্তব্য", "Destination"))}:</span>
                          <span className="min-w-0 break-words text-right font-bold text-brand">{loc(dataPair(item, "destination"))}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-semibold text-brand">{loc(pair("জিপিএস অবস্থান", "GPS Location"))}:</span>
                          <a
                            href={item.location}
                            target="_blank"
                            rel="noreferrer"
                            className="min-w-0 break-words font-bold text-brand hover:underline flex items-center gap-1"
                          >
                            <MapPin size={12} className="text-red" /> {loc(pair("গুগল ম্যাপে দেখুন", "View on Google Map"))} <ExternalLink size={10} />
                          </a>
                        </div>
                      )}

                      {/* Driver Assigned Section */}
                      {tab === "ambulance" && (item.driverName || item.vehicleRegNo) && (
                        <div className="mt-2 rounded-xl bg-purple-50/70 p-2.5 border border-purple-200/60">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 font-bold text-purple-950">
                            <span>{loc(pair("বরাদ্দকৃত চালক", "Assigned Driver"))}: {item.driverName}</span>
                            <span className="text-[11px] bg-purple-200/80 px-2 py-0.5 rounded">{item.vehicleRegNo}</span>
                          </div>
                          {item.driverMobile && (
                            <div className="mt-1 flex items-center justify-between">
                              <span className="text-slate-600">{loc(pair("চালক মোবাইল", "Driver Mobile"))}: {item.driverMobile}</span>
                              <a href={`tel:${item.driverMobile}`} className="text-brand font-bold underline flex items-center gap-0.5">
                                <Phone size={10} /> {loc(pair("কল", "Call"))}
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Fare and ETA */}
                      {item.estimatedFare != null && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 font-bold text-brand pt-1">
                          <span>{loc(pair("ভাড়া", "Fare"))}:</span>
                          <span className="min-w-0 break-words text-right text-red">৳{item.actualFare || item.estimatedFare} ({loc(pair("ETA", "ETA"))}: {loc(dataPair(item, "eta", pair("১৫-২০ মিনিট", "15-20 minutes")))})</span>
                        </div>
                      )}

                      {/* NID & Docs for Partners */}
                      {(item.nidFrontPhoto || item.nidBackPhoto || item.drivingLicensePhoto) && (
                        <div className="pt-2 border-t border-slate-100">
                          <span className="block font-bold text-brand mb-1.5">{loc(pair("যাচাইকরণের কাগজপত্র ও NID", "Verification Documents & NID"))}:</span>
                          <div className="flex flex-wrap gap-2">
                            {item.nidFrontPhoto && (
                              <a href={item.nidFrontPhoto} target="_blank" rel="noreferrer" className="group text-center">
                                <img src={item.nidFrontPhoto} alt="NID front side" onError={imageFallback("document")} className="h-12 w-16 object-cover rounded border" />
                                <span className="block text-[10px] font-bold text-brand">NID Front</span>
                              </a>
                            )}
                            {item.nidBackPhoto && (
                              <a href={item.nidBackPhoto} target="_blank" rel="noreferrer" className="group text-center">
                                <img src={item.nidBackPhoto} alt="NID back side" onError={imageFallback("document")} className="h-12 w-16 object-cover rounded border" />
                                <span className="block text-[10px] font-bold text-brand">NID Back</span>
                              </a>
                            )}
                            {item.drivingLicensePhoto && (
                              <a href={item.drivingLicensePhoto} target="_blank" rel="noreferrer" className="group text-center">
                                <img src={item.drivingLicensePhoto} alt="Driving licence" onError={imageFallback("document")} className="h-12 w-16 object-cover rounded border" />
                                <span className="block text-[10px] font-bold text-brand">{loc(pair("লাইসেন্স", "Licence"))}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2">
                      {tab === "ambulance" && (
                        <>
                          <button
                            onClick={() => {
                              setAssigningBooking(item);
                              setAssignForm({
                                driverName: item.driverName || "",
                                driverMobile: item.driverMobile || "",
                                vehicleRegNo: item.vehicleRegNo || "",
                                actualFare: String(item.actualFare || item.estimatedFare || ""),
                                eta: item.eta || "১৫-২০ মিনিট",
                              });
                            }}
                            className="btn btn-primary !min-h-[30px] !px-2.5 !py-1 text-[11px] font-bold"
                          >
                            <Car size={12} /> {loc(item.driverName ? pair("ড্রাইভার পরিবর্তন", "Change Driver") : pair("ড্রাইভার বরাদ্দ", "Assign Driver"))}
                          </button>

                          <select
                            className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] font-bold text-brand"
                            value={item.trackingStatus || "requested"}
                            onChange={(e) => updateTracking(item._id, e.target.value)}
                          >
                            <option value="requested">{loc(pair("অনুরোধ গৃহীত", "Request Received"))}</option>
                            <option value="confirmed">{loc(pair("বুকিং নিশ্চিত", "Booking Confirmed"))}</option>
                            <option value="driver_assigned">{loc(pair("ড্রাইভার বরাদ্দ", "Driver Assigned"))}</option>
                            <option value="on_the_way">{loc(pair("চালক রওনা", "On The Way"))}</option>
                            <option value="picked_up">{loc(pair("রোগী তোলা হয়েছে", "Picked Up"))}</option>
                            <option value="completed">{loc(pair("সম্পন্ন", "Completed"))}</option>
                            <option value="cancelled">{loc(pair("বাতিল", "Cancelled"))}</option>
                          </select>
                        </>
                      )}

                      {tab === "appointments" && (
                        <select
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] font-bold text-brand"
                          value={item.trackingStatus || "requested"}
                          onChange={(e) => updateTracking(item._id, e.target.value)}
                        >
                          <option value="requested">{loc(pair("অনুরোধ গৃহীত", "Request Received"))}</option>
                          <option value="confirmed">{loc(pair("সিরিয়াল নিশ্চিত", "Serial Confirmed"))}</option>
                          <option value="completed">{loc(pair("সম্পন্ন", "Completed"))}</option>
                          <option value="cancelled">{loc(pair("বাতিল", "Cancelled"))}</option>
                        </select>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.mobile && (
                        <a
                          href={`tel:${item.mobile}`}
                          className="btn btn-green !min-h-[30px] !px-3 !py-1 text-xs font-bold"
                        >
                          <Phone size={12} /> {loc(pair("কল", "Call"))}
                        </a>
                      )}
                      <button
                        onClick={() => del(item._id)}
                        className="rounded-lg p-1 text-rose-500 hover:bg-rose-50"
                        title={loc(pair("মুছে ফেলুন", "Delete"))}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
