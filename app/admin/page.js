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
  Eye,
  X,
  UploadCloud,
  ChevronDown,
  MapPin,
} from "lucide-react";
import DynamicForm from "@/components/DynamicForm";
import { FORMS } from "@/lib/forms";
import { SPECIALTIES } from "@/lib/site";

const TABS = [
  { id: "appointments", label: "অ্যাপয়েন্টমেন্ট", Icon: CalendarCheck },
  { id: "ambulance", label: "অ্যাম্বুলেন্স বুকিং", Icon: Ambulance },
  { id: "memberships", label: "ফ্যামিলি কেয়ার", Icon: ShieldCheck },
  { id: "partners", label: "পার্টনার অ্যাম্বুলেন্স", Icon: Users },
  { id: "doctors", label: "ডাক্তার তালিকা", Icon: Stethoscope },
  { id: "hospitals", label: "হাসপাতাল তালিকা", Icon: Building2 },
  { id: "feedback", label: "গ্রাহক মতামত", Icon: MessageSquareHeart },
];

const STATUS_META = {
  new: { label: "নতুন", cls: "bg-blue-100 text-blue-800 border-blue-300" },
  contacted: { label: "যোগাযোগ হয়েছে", cls: "bg-amber-100 text-amber-800 border-amber-300" },
  done: { label: "সম্পন্ন", cls: "bg-green-100 text-green-800 border-green-300" },
  cancelled: { label: "বাতিল", cls: "bg-rose-100 text-rose-800 border-rose-300" },
};

export default function Admin() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("appointments");
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  const H = { "x-admin-key": key };

  const load = useCallback(
    async (k = key, currentTab = tab, q = search, st = statusFilter) => {
      setLoading(true);
      try {
        const p = new URLSearchParams();
        if (q) p.set("q", q);
        if (st && st !== "all") p.set("status", st);
        const url = `/api/${currentTab}${p.toString() ? "?" + p.toString() : ""}`;
        const r = await fetch(url, { headers: { "x-admin-key": k } });
        if (r.status === 401) {
          setAuthed(false);
          setErr("ভুল অ্যাডমিন কী। সঠিক পাসওয়ার্ড দিন।");
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
    const k = sessionStorage.getItem("dh-admin") || "dhadmin123";
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

  async function handleSearch(e) {
    e.preventDefault();
    load(key, tab, search, statusFilter);
  }

  async function setStatus(id, newStatus) {
    try {
      const r = await fetch(`/api/${tab}`, {
        method: "PATCH",
        headers: { ...H, "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (r.ok) load(key, tab, search, statusFilter);
    } catch (e) {
      alert("আপডেট ব্যর্থ হয়েছে");
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
    sessionStorage.removeItem("dh-admin");
    setAuthed(false);
    setKey("");
  }

  if (!authed) {
    return (
      <div className="wrap max-w-md py-16">
        <form
          className="card space-y-5 rounded-2xl border border-blue/20 p-6 shadow-xl"
          onSubmit={(e) => {
            e.preventDefault();
            sessionStorage.setItem("dh-admin", key);
            load(key);
          }}
        >
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-soft text-navy">
              <ShieldCheck size={36} />
            </div>
            <h1 className="mt-3 text-2xl font-black text-navy">D H Medical সাপোর্ট</h1>
            <p className="text-sm text-slate-600">অ্যাডমিন কন্ট্রোল প্যানেল লগইন</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-navy">অ্যাডমিন পাসওয়ার্ড / Key</label>
            <input
              className="input w-full"
              type="password"
              placeholder="Admin key লিখুন"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
            <p className="mt-1.5 text-xs text-slate-500">
              ডিফল্ট কী: <code className="rounded bg-slate-100 px-1 py-0.5 font-bold text-blue">dhadmin123</code>
            </p>
          </div>

          {err && <p role="alert" className="rounded-lg bg-red/10 p-2.5 text-sm font-semibold text-red">{err}</p>}

          <button className="btn btn-navy w-full py-3 text-base font-bold shadow-md">
            লগইন করুন
          </button>
        </form>
      </div>
    );
  }

  const isCatalog = tab === "doctors" || tab === "hospitals";

  return (
    <div className="wrap max-w-7xl py-6">
      {/* Top Admin Header Bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-navy via-navy to-blue-dark p-5 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <ShieldCheck size={14} className="text-gold" /> অ্যাডমিন পোর্টাল (সম্পূর্ণ কার্যকর)
          </span>
          <h1 className="mt-1 text-2xl font-black sm:text-3xl">D H Medical Support ড্যাশবোর্ড</h1>
          <p className="text-xs text-blue-soft">রিয়েল-টাইম ডেটাবেজ (MongoDB Atlas) ও ক্লাউডিনারি ফাইল স্টোরেজ পরিচালিত</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="btn btn-gold !min-h-[40px] !px-4 !py-2 text-xs font-bold"
            title="সবগুলো টেবিলে রিয়েল স্যাম্পল ডেটা লোড করুন"
          >
            <RefreshCw size={14} className={seeding ? "animate-spin" : ""} />
            {seeding ? "লোড হচ্ছে…" : "স্যাম্পল ডেটা সিড করুন"}
          </button>
          <button
            onClick={logout}
            className="btn bg-white/15 !min-h-[40px] !px-3 !py-2 text-xs font-semibold text-white hover:bg-white/25"
          >
            <LogOut size={14} /> বের হন
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
              }}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                on
                  ? "bg-navy text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-blue-soft/50 border border-slate-200"
              }`}
            >
              <I size={18} className={on ? "text-gold" : "text-blue"} />
              {t.label}
              {counts[t.id] != null && (
                <span className={`rounded-full px-2 py-0.5 text-xs ${on ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {counts[t.id]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Action / Search / Filter Bar */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="search"
            className="input !pl-10 !h-11 w-full"
            placeholder={`${TABS.find((t) => t.id === tab)?.label || ""} অনুসন্ধান করুন…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {!isCatalog && tab !== "feedback" && (
            <select
              className="input !h-11 !py-1 text-sm font-semibold"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">সব স্ট্যাটাস</option>
              <option value="new">নতুন (New)</option>
              <option value="contacted">যোগাযোগ হয়েছে (Contacted)</option>
              <option value="done">সম্পন্ন (Done)</option>
              <option value="cancelled">বাতিল (Cancelled)</option>
            </select>
          )}

          {isCatalog && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-red !h-11 !px-4 text-sm font-bold"
            >
              <Plus size={18} />
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

      {/* Add Form (for Doctors & Hospitals) */}
      {isCatalog && showAddForm && (
        <div className="mb-8 rounded-2xl border-2 border-dashed border-blue/40 bg-blue-soft/20 p-5 shadow-inner">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-navy">
              নতুন {tab === "doctors" ? "ডাক্তার" : "হাসপাতাল"} এন্ট্রি করুন (ক্লাউডিনারি ফটো আপলোডসহ)
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

      {/* Edit Modal / Drawer */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-bold text-navy">তথ্য সম্পাদনা করুন</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>
            <form onSubmit={saveEdit} className="space-y-4 text-sm">
              <div>
                <label className="block font-bold text-navy">নাম</label>
                <input
                  className="input mt-1 w-full"
                  value={editingItem.name || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  required
                />
              </div>

              {tab === "doctors" && (
                <>
                  <div>
                    <label className="block font-bold text-navy">বিভাগ (Specialty)</label>
                    <select
                      className="input mt-1 w-full"
                      value={editingItem.specialty || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, specialty: e.target.value })}
                    >
                      <option value="">নির্বাচন করুন</option>
                      {SPECIALTIES.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.bn} ({s.key})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-navy">ডিগ্রি / পদবী</label>
                    <input
                      className="input mt-1 w-full"
                      value={editingItem.degree || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy">হাসপাতাল / চেম্বার</label>
                    <input
                      className="input mt-1 w-full"
                      value={editingItem.hospital || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, hospital: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-navy">ভিজিট ফি</label>
                      <input
                        className="input mt-1 w-full"
                        value={editingItem.fee || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, fee: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-navy">রোগী দেখার সময়</label>
                      <input
                        className="input mt-1 w-full"
                        value={editingItem.schedule || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, schedule: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-navy">ছবির URL</label>
                    <input
                      className="input mt-1 w-full"
                      value={editingItem.photo || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, photo: e.target.value })}
                    />
                  </div>
                </>
              )}

              {tab === "hospitals" && (
                <>
                  <div>
                    <label className="block font-bold text-navy">ঠিকানা</label>
                    <input
                      className="input mt-1 w-full"
                      value={editingItem.address || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy">যোগাযোগের ফোন নম্বর</label>
                    <input
                      className="input mt-1 w-full"
                      value={editingItem.phone || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy">সেবাসমূহ</label>
                    <textarea
                      rows={3}
                      className="input mt-1 w-full"
                      value={editingItem.services || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, services: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy">লোগোর URL</label>
                    <input
                      className="input mt-1 w-full"
                      value={editingItem.logo || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, logo: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={editingItem.active !== false}
                  onChange={(e) => setEditingItem({ ...editingItem, active: e.target.checked })}
                  className="h-4 w-4 accent-navy"
                />
                <label htmlFor="activeCheck" className="font-bold text-navy">
                  ওয়েবসাইটে সক্রিয় প্রদর্শন করুন
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="btn btn-line !h-10 !px-4"
                >
                  বাতিল
                </button>
                <button type="submit" className="btn btn-navy !h-10 !px-6">
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content Record Listing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>মোট {items.length} টি রেকর্ড পাওয়া গেছে</span>
          {loading && <span className="font-semibold text-blue">লোড হচ্ছে…</span>}
        </div>

        {items.length === 0 && !loading && (
          <div className="card text-center py-12">
            <p className="text-lg font-bold text-navy">কোনো রেকর্ড পাওয়া যায়নি</p>
            <p className="mt-1 text-sm text-slate-500">
              আপনি উপরে &quot;স্যাম্পল ডেটা সিড করুন&quot; বাটনে ক্লিক করে রিয়েল ডেটা লোড করতে পারেন।
            </p>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="btn btn-gold mt-4 mx-auto text-sm font-bold"
            >
              <RefreshCw size={14} className={seeding ? "animate-spin" : ""} />
              এখনই স্যাম্পল ডেটা লোড করুন
            </button>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => {
            const meta = STATUS_META[item.status] || STATUS_META.new;

            return (
              <article
                key={item._id}
                className="card flex flex-col justify-between border border-slate-200 transition-shadow hover:shadow-md"
              >
                <div>
                  {/* Card Header with Badges */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      {(item.photo || item.logo || item.vehiclePhoto) ? (
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
                        <h2 className="font-head text-base font-bold text-navy leading-tight truncate">
                          {item.name || item.patientName || `আইডি: ${item._id.slice(-6)}`}
                        </h2>
                        {item.specialty && (
                          <span className="inline-block mt-0.5 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                            {item.specialty}
                          </span>
                        )}
                        {item.ambulanceType && (
                          <span className="inline-block mt-0.5 rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red">
                            ধরন: {item.ambulanceType}
                          </span>
                        )}
                        {item.plan && (
                          <span className="inline-block mt-0.5 rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                            প্ল্যান: {item.plan}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {item.status && (
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${meta.cls}`}
                        >
                          {meta.label}
                        </span>
                      )}
                      {typeof item.active === "boolean" && (
                        <button
                          onClick={() => toggleActive(item)}
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            item.active
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                          }`}
                        >
                          {item.active ? "✓ সক্রিয়" : "✗ নিষ্ক্রিয়"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Card Detail Fields */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                    {item.mobile && (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-navy">মোবাইল:</span>
                        <a
                          href={`tel:${item.mobile}`}
                          className="font-bold text-blue hover:underline flex items-center gap-1"
                        >
                          <Phone size={12} /> {item.mobile}
                        </a>
                      </div>
                    )}
                    {item.familyMobile && (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-navy">পরিবারের মোবাইল:</span>
                        <a
                          href={`tel:${item.familyMobile}`}
                          className="font-bold text-blue hover:underline flex items-center gap-1"
                        >
                          <Phone size={12} /> {item.familyMobile}
                        </a>
                      </div>
                    )}
                    {item.country && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">প্রবাসের দেশ:</span>
                        <span>{item.country}</span>
                      </div>
                    )}
                    {item.familyName && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">পরিবারের সদস্য:</span>
                        <span>{item.familyName}</span>
                      </div>
                    )}
                    {item.doctorName && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">অনুরোধকৃত ডাক্তার:</span>
                        <span className="font-medium text-navy">{item.doctorName}</span>
                      </div>
                    )}
                    {item.hospitalName && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">হাসপাতাল:</span>
                        <span>{item.hospitalName}</span>
                      </div>
                    )}
                    {item.hospital && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">হাসপাতাল:</span>
                        <span>{item.hospital}</span>
                      </div>
                    )}
                    {item.degree && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">ডিগ্রি:</span>
                        <span className="text-right">{item.degree}</span>
                      </div>
                    )}
                    {item.fee && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">ভিজিট ফি:</span>
                        <span className="font-bold text-red">{item.fee}</span>
                      </div>
                    )}
                    {item.schedule && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">সময়সূচি:</span>
                        <span>{item.schedule}</span>
                      </div>
                    )}
                    {item.address && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">ঠিকানা / পিকআপ:</span>
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
                          <MapPin size={12} className="text-red" /> গুগল ম্যাপে দেখুন <ExternalLink size={11} />
                        </a>
                      </div>
                    )}
                    {item.regNo && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">রেজিস্ট্রেশন নং:</span>
                        <span className="font-bold">{item.regNo}</span>
                      </div>
                    )}
                    {item.vehicleTypes && Array.isArray(item.vehicleTypes) && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-navy">যানবাহন:</span>
                        <span>{item.vehicleTypes.join(", ")}</span>
                      </div>
                    )}
                    {item.services && (
                      <div>
                        <span className="font-semibold text-navy">সেবাসমূহ:</span>
                        <p className="mt-0.5 line-clamp-2 text-slate-600">{item.services}</p>
                      </div>
                    )}
                    {item.rating && (
                      <div className="flex items-center gap-1 text-gold font-bold">
                        <span>রেটিং: {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</span>
                        <span className="text-slate-600 font-normal">({item.service || "সাধারণ"})</span>
                      </div>
                    )}
                    {item.comment && (
                      <div className="rounded-lg bg-slate-50 p-2 text-slate-700 italic border border-slate-100">
                        &quot;{item.comment}&quot;
                      </div>
                    )}
                    {item.note && (
                      <div className="rounded-lg bg-amber-50/60 p-2 text-amber-900 border border-amber-200/50">
                        <b>নোট:</b> {item.note}
                      </div>
                    )}
                    {(item.nidFrontPhoto || item.nidBackPhoto || item.drivingLicensePhoto) && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="block font-bold text-navy mb-1.5">যাচাইকরণের কাগজপত্র ও NID:</span>
                        <div className="flex flex-wrap gap-2">
                          {item.nidFrontPhoto && (
                            <a href={item.nidFrontPhoto} target="_blank" rel="noreferrer" className="group text-center">
                              <img src={item.nidFrontPhoto} alt="NID Front" className="h-14 w-20 object-cover rounded border border-slate-300 group-hover:opacity-80" />
                              <span className="block text-[10px] font-bold text-blue mt-0.5">NID Front</span>
                            </a>
                          )}
                          {item.nidBackPhoto && (
                            <a href={item.nidBackPhoto} target="_blank" rel="noreferrer" className="group text-center">
                              <img src={item.nidBackPhoto} alt="NID Back" className="h-14 w-20 object-cover rounded border border-slate-300 group-hover:opacity-80" />
                              <span className="block text-[10px] font-bold text-blue mt-0.5">NID Back</span>
                            </a>
                          )}
                          {item.drivingLicensePhoto && (
                            <a href={item.drivingLicensePhoto} target="_blank" rel="noreferrer" className="group text-center">
                              <img src={item.drivingLicensePhoto} alt="Driving License" className="h-14 w-20 object-cover rounded border border-slate-300 group-hover:opacity-80" />
                              <span className="block text-[10px] font-bold text-blue mt-0.5">লাইসেন্স</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                    {item.date && (
                      <div className="flex justify-between text-slate-500">
                        <span>তারিখ / সময়:</span>
                        <span>{item.date} {item.time || ""}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    {item.status && (
                      <select
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-blue/30"
                        value={item.status}
                        onChange={(e) => setStatus(item._id, e.target.value)}
                      >
                        <option value="new">নতুন (New)</option>
                        <option value="contacted">যোগাযোগ হয়েছে</option>
                        <option value="done">সম্পন্ন (Done)</option>
                        <option value="cancelled">বাতিল (Cancelled)</option>
                      </select>
                    )}

                    {isCatalog && (
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex items-center gap-1 rounded-lg border border-blue/30 bg-blue-soft/50 px-2.5 py-1 text-xs font-semibold text-navy hover:bg-blue-soft"
                      >
                        <Edit2 size={13} /> সম্পাদনা
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {item.mobile && (
                      <a
                        href={`tel:${item.mobile}`}
                        className="btn btn-green !min-h-[32px] !px-3 !py-1 text-xs font-bold"
                      >
                        <Phone size={13} /> কল দিন
                      </a>
                    )}
                    <button
                      onClick={() => del(item._id)}
                      className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
