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
import { SPECIALTIES, DISTRICTS } from "@/lib/site";

const TABS = [
  { id: "ambulance", label: "অ্যাম্বুলেন্স বুকিং", Icon: Ambulance },
  { id: "appointments", label: "অ্যাপয়েন্টমেন্ট", Icon: CalendarCheck },
  { id: "partners", label: "পার্টনার ও গাড়ি বহর", Icon: Car },
  { id: "memberships", label: "ফ্যামিলি কেয়ার", Icon: ShieldCheck },
  { id: "accounts", label: "হিসাব ও কমিশন", Icon: DollarSign },
  { id: "doctors", label: "ডাক্তার তালিকা", Icon: Stethoscope },
  { id: "hospitals", label: "হাসপাতাল তালিকা", Icon: Building2 },
  { id: "feedback", label: "গ্রাহক মতামত", Icon: MessageSquareHeart },
  { id: "activity_logs", label: "অ্যাক্টিভিটি লগ", Icon: Activity },
];

const TRACKING_LABELS = {
  requested: { label: "অনুরোধ গৃহীত", cls: "bg-blue-100 text-blue-800 border-blue-300" },
  confirmed: { label: "বুকিং নিশ্চিত", cls: "bg-amber-100 text-amber-800 border-amber-300" },
  driver_assigned: { label: "ড্রাইভার বরাদ্দ", cls: "bg-purple-100 text-purple-800 border-purple-300" },
  on_the_way: { label: "চালক রওনা হয়েছেন", cls: "bg-indigo-100 text-indigo-800 border-indigo-300" },
  picked_up: { label: "রোগী তোলা হয়েছে", cls: "bg-cyan-100 text-cyan-800 border-cyan-300" },
  completed: { label: "সম্পন্ন", cls: "bg-green-100 text-green-800 border-green-300" },
  cancelled: { label: "বাতিল", cls: "bg-rose-100 text-rose-800 border-rose-300" },
};

export default function Admin() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("ambulance");
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [assigningBooking, setAssigningBooking] = useState(null);
  const [assignForm, setAssignForm] = useState({ driverName: "", driverMobile: "", vehicleRegNo: "", actualFare: "", eta: "১৫-২০ মিনিট" });
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

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
          setErr("অননুমোদিত অ্যাক্সেস। সঠিক পাসওয়ার্ড দিয়ে লগইন করুন।");
          setLoading(false);
          return;
        }
        const data = await r.json();
        setAuthed(true);
        setErr("");
        setItems(data.items || []);
        setCounts((prev) => ({ ...prev, [currentTab]: (data.items || []).length }));
      } catch (x) {
        setErr("ডেটা লোড করতে ব্যর্থ: " + x.message);
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
    setErr("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "লগইন ব্যর্থ হয়েছে");
      sessionStorage.setItem("dh-admin-session", data.token);
      setKey(data.token);
      setAuthed(true);
      load(data.token);
    } catch (x) {
      setErr(x.message);
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
      alert("স্ট্যাটাস আপডেট ব্যর্থ হয়েছে");
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
        alert("ড্রাইভার বরাদ্দ ব্যর্থ হয়েছে");
      }
    } catch (x) {
      alert("ত্রুটি: " + x.message);
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
      alert("স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে");
    }
  }

  async function del(id) {
    if (!confirm("আপনি কি নিশ্চিত এই রেকর্ডটি মুছে ফেলতে চান?")) return;
    try {
      const r = await fetch(`/api/${tab}?id=${id}`, { method: "DELETE", headers: H });
      if (r.ok) load(key, tab, search, statusFilter);
    } catch (e) {
      alert("মুছতে ব্যর্থ হয়েছে");
    }
  }

  async function handleSeed() {
    if (!confirm("আপনি কি ডাটাবেজে রিয়েল বাংলাদেশি স্যাম্পল ডেটা লোড করতে চান?")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const r = await fetch("/api/admin/seed", { method: "POST", headers: H });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "ব্যর্থ হয়েছে");
      setSeedMsg("✓ সফলভাবে ডাটাবেজে সব রিয়েল ডেটা লোড হয়েছে!");
      load(key, tab);
      setTimeout(() => setSeedMsg(""), 4000);
    } catch (x) {
      alert("সিড ব্যর্থ: " + x.message);
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
        alert("সংরক্ষণ ব্যর্থ হয়েছে");
      }
    } catch (x) {
      alert("ত্রুটি: " + x.message);
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
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-blue border border-blue-100">
              <ShieldCheck size={36} />
            </div>
            <h1 className="mt-3 text-2xl font-black text-navy-dark">D H Medical Support</h1>
            <p className="text-xs text-slate-500 mt-0.5">সুরক্ষিত অ্যাডমিন কন্ট্রোল প্যানেল</p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
              অ্যাডমিন সিক্রেট পাসওয়ার্ড
            </label>
            <input
              className="input w-full"
              type="password"
              placeholder="গোপন পাসওয়ার্ড লিখুন"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
            <p className="mt-1 text-[11px] text-slate-400">
              * সার্ভার-সাইড রেট লিমিটেড ও HMAC সেশন দ্বারা সুরক্ষিত
            </p>
          </div>

          {err && (
            <div role="alert" className="rounded-xl bg-red-50 border border-red-100 p-3 text-xs font-bold text-red flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              <span>{err}</span>
            </div>
          )}

          <button className="btn btn-navy w-full py-3 text-sm font-bold shadow-md" disabled={loading}>
            {loading ? "যাচাই করা হচ্ছে…" : "নিরাপদে প্রবেশ করুন"}
          </button>
        </form>
      </div>
    );
  }

  const isCatalog = tab === "doctors" || tab === "hospitals";

  return (
    <div className="wrap max-w-7xl py-6">
      {/* Top Admin Header Bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-navy-deep via-navy to-navy-dark p-6 text-white shadow-card sm:flex-row sm:items-center sm:justify-between border border-white/10">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <ShieldCheck size={14} className="text-gold" /> সেন্ট্রাল অফিস ম্যানেজমেন্ট ড্যাশবোর্ড
          </span>
          <h1 className="mt-1 text-2xl font-black sm:text-3xl">D H MEDICAL CENTRAL OPS</h1>
          <p className="text-xs text-blue-soft">রিয়েল-টাইম ডাটাবেজ, ডিসপ্যাচ ও বুকিং অগ্রগতি মনিটরিং</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="btn btn-gold !min-h-[40px] !px-4 !py-2 text-xs font-bold shadow-md"
            title="সবগুলো টেবিলে রিয়েল স্যাম্পল ডেটা লোড করুন"
          >
            <RefreshCw size={14} className={seeding ? "animate-spin" : ""} />
            {seeding ? "লোড হচ্ছে…" : "স্যাম্পল ডেটা সিড করুন"}
          </button>
          <button
            onClick={logout}
            className="btn bg-white/15 !min-h-[40px] !px-3 !py-2 text-xs font-semibold text-white hover:bg-white/25"
          >
            <LogOut size={14} /> লগআউট
          </button>
        </div>
      </div>

      {seedMsg && (
        <div className="mb-4 rounded-xl bg-green-500/10 p-3 text-sm font-bold text-green-700">
          {seedMsg}
        </div>
      )}

      {/* Tabs Selector with Icons */}
      <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2">
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
                ? "bg-navy text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-blue-soft/50 border border-slate-200"
                }`}
            >
              <I size={16} className={on ? "text-gold" : "text-blue"} />
              {t.label}
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
            placeholder="বুকিং আইডি, রোগীর নাম, মোবাইল, জেলা বা হাসপাতাল দিয়ে খুঁজুন…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {tab === "ambulance" && (
            <select
              className="input !h-11 !py-1 text-xs font-bold"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">সব ট্র্যাকিং স্ট্যাটাস</option>
              <option value="requested">অনুরোধ গৃহীত (Requested)</option>
              <option value="confirmed">বুকিং নিশ্চিত (Confirmed)</option>
              <option value="driver_assigned">ড্রাইভার বরাদ্দ (Driver Assigned)</option>
              <option value="on_the_way">চালক রওনা (On The Way)</option>
              <option value="picked_up">রোগী তোলা হয়েছে (Picked Up)</option>
              <option value="completed">সম্পন্ন (Completed)</option>
              <option value="cancelled">বাতিল (Cancelled)</option>
            </select>
          )}

          {isCatalog && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-red !h-11 !px-4 text-xs font-bold"
            >
              <Plus size={16} />
              {showAddForm ? "ফর্ম লুকান" : `নতুন ${tab === "doctors" ? "ডাক্তার" : "হাসপাতাল"} যোগ করুন`}
            </button>
          )}

          <button
            onClick={() => load(key, tab, search, statusFilter)}
            className="btn btn-line !h-11 !px-3"
            title="রিফ্রেশ"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Driver Assignment Modal */}
      {assigningBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                  <Car className="text-blue" size={20} /> অ্যাম্বুলেন্স ও ড্রাইভার বরাদ্দ করুন
                </h3>
                <span className="text-xs text-slate-500">
                  বুকিং আইডি: <b className="text-navy">{assigningBooking.bookingId}</b> | রোগী: {assigningBooking.patientName}
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
                <label className="block font-bold text-navy mb-1">ড্রাইভার / চালকের নাম</label>
                <input
                  className="input w-full"
                  required
                  placeholder="যেমন: মো. আব্দুল জলিল"
                  value={assignForm.driverName}
                  onChange={(e) => setAssignForm({ ...assignForm, driverName: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-bold text-navy mb-1">ড্রাইভারের মোবাইল নম্বর</label>
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
                <label className="block font-bold text-navy mb-1">গাড়ির রেজিস্ট্রেশন নম্বর</label>
                <input
                  className="input w-full"
                  required
                  placeholder="যেমন: ঢাকা মেট্রো-ছ-৭১-৪৫৬৭"
                  value={assignForm.vehicleRegNo}
                  onChange={(e) => setAssignForm({ ...assignForm, vehicleRegNo: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-navy mb-1">ভাড়া (টাকা)</label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="যেমন: ৩০০০"
                    value={assignForm.actualFare}
                    onChange={(e) => setAssignForm({ ...assignForm, actualFare: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1">পৌঁছানোর আনুমানিক সময়</label>
                  <input
                    className="input w-full"
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
                  বাতিল
                </button>
                <button type="submit" className="btn btn-navy !h-9 !px-6 font-bold">
                  বরাদ্দ নিশ্চিত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Form (for Doctors & Hospitals) */}
      {isCatalog && showAddForm && (
        <div className="mb-8 rounded-2xl border-2 border-dashed border-blue/40 bg-blue-soft/20 p-5 shadow-inner">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy">
              নতুন {tab === "doctors" ? "ডাক্তার" : "হাসপাতাল"} এন্ট্রি করুন
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
            submit="তালিকায় যোগ করুন"
            onDone={() => {
              setShowAddForm(false);
              load(key, tab);
            }}
            success="সফলভাবে যোগ করা হয়েছে!"
          />
        </div>
      )}

      {/* Main Content Listing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>মোট {items.length} টি রেকর্ড পাওয়া গেছে</span>
          {loading && <span className="font-semibold text-blue">লোড হচ্ছে…</span>}
        </div>

        {items.length === 0 && !loading && (
          <div className="card text-center py-12">
            <p className="text-base font-bold text-navy">কোনো রেকর্ড পাওয়া যায়নি</p>
            <p className="mt-1 text-xs text-slate-500">
              আপনি উপরে &quot;স্যাম্পল ডেটা সিড করুন&quot; বাটনে ক্লিক করে রিয়েল ডেটা লোড করতে পারেন।
            </p>
          </div>
        )}

        {/* Tabular view for Accounts */}
        {tab === "accounts" && items.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-navy font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">বুকিং আইডি</th>
                  <th className="p-3">সেবার ধরন</th>
                  <th className="p-3">রোগীর নাম</th>
                  <th className="p-3">মোট ভাড়া</th>
                  <th className="p-3">ড্রাইভার প্রাপ্য (৮০%)</th>
                  <th className="p-3">অফিস কমিশন (২০%)</th>
                  <th className="p-3">পেমেন্ট অবস্থা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((acc) => (
                  <tr key={acc._id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-blue">{acc.bookingId || "DH-AMB-001"}</td>
                    <td className="p-3">{acc.serviceType}</td>
                    <td className="p-3 font-semibold text-navy">{acc.patientName || "রোগী"}</td>
                    <td className="p-3 font-black text-navy">৳{acc.totalFare || 0}</td>
                    <td className="p-3 font-bold text-slate-600">৳{acc.partnerShare || 0}</td>
                    <td className="p-3 font-black text-green-700">৳{acc.officeCommission || 0}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${acc.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                        {acc.paymentStatus === "paid" ? "পরিশোধিত" : "বকেয়া"}
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
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-navy font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">সময়</th>
                  <th className="p-3">অ্যাডমিন ইউজার</th>
                  <th className="p-3">অ্যাকশন</th>
                  <th className="p-3">টার্গেট</th>
                  <th className="p-3">বিস্তারিত বিবরণ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-500 whitespace-nowrap">
                      {new Date(log.createdAt || Date.now()).toLocaleString("bn-BD")}
                    </td>
                    <td className="p-3 font-bold text-navy">{log.adminUser}</td>
                    <td className="p-3 font-semibold text-blue">{log.action}</td>
                    <td className="p-3 text-slate-600">{log.targetType}</td>
                    <td className="p-3 text-slate-600">{log.details || "-"}</td>
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
                            alt=""
                            className="h-14 w-14 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <span className="grid h-14 w-14 place-items-center rounded-xl bg-blue-soft text-blue font-bold shrink-0">
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
                            <span className="block text-xs font-black text-blue tracking-wide">
                              আইডি: {item.bookingId}
                            </span>
                          )}
                          <h2 className="font-head text-base font-bold text-navy leading-tight truncate">
                            {item.patientName || item.name || `আইডি: ${item._id.slice(-6)}`}
                          </h2>
                          {item.ambulanceType && (
                            <span className="inline-block mt-0.5 rounded bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red">
                              ধরন: {item.ambulanceType} ({item.patientCondition || "সাধারণ"})
                            </span>
                          )}
                          {item.specialty && (
                            <span className="inline-block mt-0.5 rounded bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-800">
                              {item.specialty}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {item.trackingStatus && (
                          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${meta.cls}`}>
                            {meta.label}
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
                            {item.active ? "✓ সক্রিয়" : "✗ নিষ্ক্রিয়"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Details Body */}
                    <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                      {item.mobile && (
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-navy">মোবাইল:</span>
                          <a
                            href={`tel:${item.mobile}`}
                            className="font-bold text-blue hover:underline flex items-center gap-1"
                          >
                            <Phone size={11} /> {item.mobile}
                          </a>
                        </div>
                      )}
                      {item.address && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-navy">পিকআপ ঠিকানা:</span>
                          <span className="text-right font-medium">{item.address}</span>
                        </div>
                      )}
                      {item.destination && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-navy">গন্তব্য:</span>
                          <span className="text-right font-bold text-navy">{item.destination}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-navy">জিপিএস অবস্থান:</span>
                          <a
                            href={item.location}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-blue hover:underline flex items-center gap-1"
                          >
                            <MapPin size={12} className="text-red" /> গুগল ম্যাপে দেখুন <ExternalLink size={10} />
                          </a>
                        </div>
                      )}

                      {/* Driver Assigned Section */}
                      {tab === "ambulance" && (item.driverName || item.vehicleRegNo) && (
                        <div className="mt-2 rounded-xl bg-purple-50/70 p-2.5 border border-purple-200/60">
                          <div className="flex items-center justify-between font-bold text-purple-950">
                            <span>বরাদ্দকৃত চালক: {item.driverName}</span>
                            <span className="text-[11px] bg-purple-200/80 px-2 py-0.5 rounded">{item.vehicleRegNo}</span>
                          </div>
                          {item.driverMobile && (
                            <div className="mt-1 flex items-center justify-between">
                              <span className="text-slate-600">চালক মোবাইল: {item.driverMobile}</span>
                              <a href={`tel:${item.driverMobile}`} className="text-blue font-bold underline flex items-center gap-0.5">
                                <Phone size={10} /> কল
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Fare and ETA */}
                      {item.estimatedFare != null && (
                        <div className="flex justify-between font-bold text-navy pt-1">
                          <span>ভাড়া:</span>
                          <span className="text-red">৳{item.actualFare || item.estimatedFare} (ETA: {item.eta || "১৫-২০ মিনিট"})</span>
                        </div>
                      )}

                      {/* NID & Docs for Partners */}
                      {(item.nidFrontPhoto || item.nidBackPhoto || item.drivingLicensePhoto) && (
                        <div className="pt-2 border-t border-slate-100">
                          <span className="block font-bold text-navy mb-1.5">যাচাইকরণের কাগজপত্র ও NID:</span>
                          <div className="flex flex-wrap gap-2">
                            {item.nidFrontPhoto && (
                              <a href={item.nidFrontPhoto} target="_blank" rel="noreferrer" className="group text-center">
                                <img src={item.nidFrontPhoto} alt="NID Front" className="h-12 w-16 object-cover rounded border" />
                                <span className="block text-[10px] font-bold text-blue">NID Front</span>
                              </a>
                            )}
                            {item.nidBackPhoto && (
                              <a href={item.nidBackPhoto} target="_blank" rel="noreferrer" className="group text-center">
                                <img src={item.nidBackPhoto} alt="NID Back" className="h-12 w-16 object-cover rounded border" />
                                <span className="block text-[10px] font-bold text-blue">NID Back</span>
                              </a>
                            )}
                            {item.drivingLicensePhoto && (
                              <a href={item.drivingLicensePhoto} target="_blank" rel="noreferrer" className="group text-center">
                                <img src={item.drivingLicensePhoto} alt="License" className="h-12 w-16 object-cover rounded border" />
                                <span className="block text-[10px] font-bold text-blue">লাইসেন্স</span>
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
                            className="btn btn-navy !min-h-[30px] !px-2.5 !py-1 text-[11px] font-bold"
                          >
                            <Car size={12} /> {item.driverName ? "ড্রাইভার পরিবর্তন" : "ড্রাইভার বরাদ্দ"}
                          </button>

                          <select
                            className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] font-bold text-navy"
                            value={item.trackingStatus || "requested"}
                            onChange={(e) => updateTracking(item._id, e.target.value)}
                          >
                            <option value="requested">অনুরোধ গৃহীত</option>
                            <option value="confirmed">বুকিং নিশ্চিত</option>
                            <option value="driver_assigned">ড্রাইভার বরাদ্দ</option>
                            <option value="on_the_way">চালক রওনা</option>
                            <option value="picked_up">রোগী তোলা হয়েছে</option>
                            <option value="completed">সম্পন্ন (Done)</option>
                            <option value="cancelled">বাতিল</option>
                          </select>
                        </>
                      )}

                      {tab === "appointments" && (
                        <select
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] font-bold text-navy"
                          value={item.trackingStatus || "requested"}
                          onChange={(e) => updateTracking(item._id, e.target.value)}
                        >
                          <option value="requested">অনুরোধ গৃহীত</option>
                          <option value="confirmed">সিরিয়াল নিশ্চিত</option>
                          <option value="completed">সম্পন্ন (Visited)</option>
                          <option value="cancelled">বাতিল</option>
                        </select>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.mobile && (
                        <a
                          href={`tel:${item.mobile}`}
                          className="btn btn-green !min-h-[30px] !px-3 !py-1 text-xs font-bold"
                        >
                          <Phone size={12} /> কল
                        </a>
                      )}
                      <button
                        onClick={() => del(item._id)}
                        className="rounded-lg p-1 text-rose-500 hover:bg-rose-50"
                        title="মুছে ফেলুন"
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
