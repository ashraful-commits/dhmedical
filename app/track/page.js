"use client";
import { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  Ambulance,
  User,
  Phone,
  MapPin,
  CalendarCheck,
  ShieldCheck,
  AlertCircle,
  Car,
  Navigation,
  MessageCircle,
} from "lucide-react";
import PageHead from "@/components/PageHead";
import { SITE } from "@/lib/site";

const TRACKING_STEPS_AMB = [
  { key: "requested", title: "অনুরোধ গ্রহণ", desc: "বুকিং অনুরোধ গ্রহণ করা হয়েছে, অফিস থেকে যাচাই চলছে।" },
  { key: "confirmed", title: "বুকিং নিশ্চিত", desc: "রোগীর অবস্থা ও গন্তব্য অনুযায়ী গাড়ি কনফার্ম করা হয়েছে।" },
  { key: "driver_assigned", title: "ড্রাইভার বরাদ্দ", desc: "চালক ও নির্দিষ্ট অ্যাম্বুলেন্স গাড়ি প্রস্তুত করা হয়েছে।" },
  { key: "on_the_way", title: "চালক রওনা হয়েছেন", desc: "চালক আপনার পিকআপ ঠিকানার উদ্দেশ্যে রওনা দিয়েছেন।" },
  { key: "picked_up", title: "রোগী তোলা হয়েছে", desc: "রোগীকে গাড়িতে তোলা হয়েছে এবং হাসপাতালের পথে যাত্রা শুরু।" },
  { key: "completed", title: "যাত্রা সম্পন্ন", desc: "রোগীকে নিরাপদে গন্তব্য হাসপাতালে পৌঁছে দেওয়া হয়েছে।" },
];

export default function TrackPage({ searchParams }) {
  const [query, setQuery] = useState(searchParams?.id || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchBooking(idToSearch = query) {
    if (!idToSearch.trim()) return;
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/track?q=${encodeURIComponent(idToSearch.trim())}`);
      const json = await res.json();
      if (!res.ok || !json.found) {
        throw new Error(json.error || "বুকিং পাওয়া যায়নি। সঠিক আইডি লিখুন।");
      }
      setData(json);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (searchParams?.id) {
      searchBooking(searchParams.id);
    }
  }, [searchParams?.id]); // eslint-disable-line

  const currentStepIndex = data?.booking?.trackingStatus
    ? TRACKING_STEPS_AMB.findIndex((s) => s.key === data.booking.trackingStatus)
    : 0;

  return (
    <>
      <PageHead
        Icon={Navigation}
        title="লাইভ বুকিং ট্র্যাকিং"
        sub="আপনার বুকিং আইডি বা মোবাইল নম্বর দিয়ে অ্যাম্বুলেন্স ও অ্যাপয়েন্টমেন্টের লাইভ অগ্রগতি জানুন।"
      />

      <div className="wrap max-w-3xl py-8 space-y-6">
        {/* Search Box */}
        <div className="card border border-blue/30 shadow-md p-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchBooking();
            }}
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                className="input !pl-10 w-full"
                placeholder="বুকিং আইডি (যেমন: DH-AMB-10023) বা মোবাইল নম্বর লিখুন"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-navy shrink-0 !px-6 font-bold" disabled={loading}>
              {loading ? "খোঁজা হচ্ছে…" : "ট্র্যাক করুন"}
            </button>
          </form>

          {error && (
            <p role="alert" className="mt-3 flex items-center gap-1.5 text-xs font-bold text-red">
              <AlertCircle size={15} /> {error}
            </p>
          )}
        </div>

        {/* Tracking Details View */}
        {data?.found && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Status Banner */}
            <div className="rounded-2xl bg-gradient-to-br from-navy to-blue-dark p-5 text-white shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-gold">
                  {data.type === "ambulance" ? "অ্যাম্বুলেন্স বুকিং" : "ডাক্তার অ্যাপয়েন্টমেন্ট"}
                </span>
                <h2 className="mt-2 text-2xl font-black !text-white tracking-wide">
                  আইডি: {data.booking.bookingId}
                </h2>
                <p className="text-xs text-blue-soft mt-0.5">
                  রোগী: <b className="text-white">{data.booking.patientName}</b> | যোগাযোগ: {data.booking.mobile}
                </p>
              </div>

              <div className="text-right sm:text-right">
                <span className="inline-block rounded-xl bg-gold/90 px-3 py-1 text-xs font-black text-navy uppercase">
                  {data.booking.trackingStatus === "completed"
                    ? "সম্পন্ন (Completed)"
                    : data.booking.trackingStatus === "driver_assigned"
                    ? "ড্রাইভার বরাদ্দ"
                    : data.booking.trackingStatus === "on_the_way"
                    ? "অন দ্য ওয়ে"
                    : data.booking.trackingStatus === "confirmed"
                    ? "নিশ্চিত"
                    : "যাচাই চলছে"}
                </span>
                {data.booking.eta && (
                  <p className="mt-1 text-xs text-gold font-bold">পৌঁছানোর সময়: {data.booking.eta}</p>
                )}
              </div>
            </div>

            {/* Stepper Progress Timeline */}
            {data.type === "ambulance" && (
              <div className="card p-6 border border-slate-200">
                <h3 className="font-bold text-base text-navy mb-6 flex items-center gap-2">
                  <Clock className="text-blue" size={18} /> সেবার অগ্রগতি টাইমলাইন
                </h3>

                <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 ml-3">
                  {TRACKING_STEPS_AMB.map((step, idx) => {
                    const isDone = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step.key} className="relative">
                        <span
                          className={`absolute -left-[31px] top-0 grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                            isDone
                              ? "bg-green text-white shadow-md ring-4 ring-green/20"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {isDone ? "✓" : idx + 1}
                        </span>

                        <div className="min-w-0">
                          <h4
                            className={`text-sm font-bold ${
                              isCurrent ? "text-blue" : isDone ? "text-navy" : "text-slate-400"
                            }`}
                          >
                            {step.title} {isCurrent && "(বর্তমান অবস্থা)"}
                          </h4>
                          <p className="mt-0.5 text-xs text-slate-600">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Driver & Ambulance Details (if assigned) */}
            {data.type === "ambulance" && (data.booking.driverName || data.booking.vehicleRegNo) && (
              <div className="card border-2 border-green/30 bg-green-50/20 p-5">
                <div className="flex items-center gap-3 border-b border-green/20 pb-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-green text-white">
                    <Car size={24} />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-green-700">বরাদ্দকৃত গাড়ি ও চালক</span>
                    <h4 className="text-base font-black text-navy">{data.booking.driverName || "নির্ধারিত চালক"}</h4>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">গাড়ির নম্বর:</span>
                    <b className="text-navy">{data.booking.vehicleRegNo || "প্রস্তুত হচ্ছে"}</b>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">অ্যাম্বুলেন্স ক্যাটাগরি:</span>
                    <b className="text-navy">{data.booking.ambulanceType}</b>
                  </div>
                  {data.booking.driverMobile && (
                    <div className="flex justify-between py-1 border-b border-slate-100 sm:col-span-2 items-center">
                      <span className="text-slate-600">চালকের মোবাইল:</span>
                      <a
                        href={`tel:${data.booking.driverMobile}`}
                        className="btn btn-green !min-h-[30px] !px-3 !py-1 text-xs font-bold flex items-center gap-1"
                      >
                        <Phone size={12} /> কল দিন ({data.booking.driverMobile})
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Appointment Specific Confirmation Details */}
            {data.type === "appointment" && (
              <div className="card border-blue/30 p-5 space-y-3 text-xs">
                <h4 className="text-sm font-bold text-navy flex items-center gap-1.5">
                  <CalendarCheck size={16} className="text-blue" /> অ্যাপয়েন্টমেন্ট নিশ্চিতকরণ বিবরণ
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-600">ডাক্তার:</span>
                    <b className="text-navy">{data.booking.doctorName || "নির্ধারিত কনসালট্যান্ট"}</b>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-600">বিভাগ:</span>
                    <b className="text-navy">{data.booking.specialty}</b>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-600">হাসপাতাল:</span>
                    <b className="text-navy">{data.booking.hospitalName}</b>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-600">তারিখ ও সময়:</span>
                    <b className="text-navy">{data.booking.date} ({data.booking.time || "বিকালে"})</b>
                  </div>
                  {data.booking.serialNo && (
                    <div className="flex justify-between py-1 border-b sm:col-span-2">
                      <span className="text-slate-600">সিরিয়াল নম্বর:</span>
                      <span className="rounded bg-gold/30 px-2 py-0.5 font-black text-navy">
                        {data.booking.serialNo}
                      </span>
                    </div>
                  )}
                  {data.booking.roomNo && (
                    <div className="flex justify-between py-1 border-b sm:col-span-2">
                      <span className="text-slate-600">চেম্বার রুম নম্বর:</span>
                      <b className="text-navy">{data.booking.roomNo}</b>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Live Support & Assistance */}
            <div className="rounded-2xl bg-blue-soft/50 p-4 border border-blue/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-center sm:text-left">
                <b className="text-navy text-sm block">জরুরি কোনো পরিবর্তন বা সাহায্য প্রয়োজন?</b>
                <span className="text-slate-600">আমাদের ২৪ ঘণ্টা হটলাইনে যোগাযোগ করুন</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={SITE.tel} className="btn btn-red !min-h-[36px] !px-3 font-bold">
                  <Phone size={13} /> {SITE.phone}
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-green !min-h-[36px] !px-3 font-bold"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
