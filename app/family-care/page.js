import { Users, ShieldCheck, AlertCircle, CheckCircle2, Handshake, Clock, Building2, Lock, HeartPulse, Sparkles, PhoneCall, ArrowRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import DynamicForm from "@/components/DynamicForm";
import { membershipFields } from "@/lib/forms";
import { BASE_URL } from "@/lib/seoHelper";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "DH Family Care – প্রবাসীর পরিবারের চিকিৎসা ও স্বাস্থ্য সুরক্ষা | D H Medical Support",
  description:
    "প্রবাসে আপনি, দেশে আপনার পরিবারের পাশে আমরা। প্রবাসীদের মা-বাবা ও পরিবারের সার্বক্ষণিক চিকিৎসা সমন্বয়, জরুরি অ্যাম্বুলেন্স, ওষুধ সংগ্রহ ও বীমা সহায়তা।",
  keywords: [
    "প্রবাসী পরিবার সেবা",
    "probashi medical support",
    "probashi family health bangladesh",
    "dh family care",
    "প্রবাসী ভাইদের জন্য চিকিৎসা সেবা",
  ],
  alternates: {
    canonical: `${BASE_URL}/family-care`,
  },
};

const PROBLEMS = [
  "দেশে থাকা মা-বাবা বা পরিবারের কেউ হঠাৎ মধ্যরাতে অসুস্থ হলে কার কাছে যাবেন?",
  "নিজে প্রবাসে অসুস্থ হয়ে দেশে ফিরলে এয়ারপোর্ট থেকে চিকিৎসা ও দেখাশোনার লোক নেই।",
  "হাসপাতালে বেড পাওয়া, আইসিইউ বুকিং কিংবা সঠিক বিশেষজ্ঞ ডাক্তারের সিরিয়াল সমন্বয়ের অভাব।",
  "চিকিৎসা ব্যয় নির্বাহে বীমা পলিসির সঠিক দিকনির্দেশনা ও ক্লেইম সহায়তার জটিলতা।",
];

const SOLUTIONS = [
  "২৪ ঘণ্টা ডেডিকেটেড কেয়ার ম্যানেজার — একটি কলেই জরুরি অ্যাম্বুলেন্স ও ডাক্তার প্রেরণ।",
  "শীর্ষ হাসপাতালে সরাসরি ভর্তি, আইসিইউ বেড সংরক্ষণ ও নিয়মিত কেস ফলোআপ।",
  "প্রবাসে থাকা সদস্যকে রোগীর শারীরিক অবস্থা ও প্রেসক্রিপশন নিয়মিত আপডেট দেওয়া।",
  "অনুমোদিত স্বাস্থ্য বীমা পলিসি তথ্য, আবেদন ও ক্লেইম আদায়ে সার্বক্ষণিক পরামর্শ।",
  "প্রবাস ফেরত ভাইদের জন্য এয়ারপোর্ট রিসিভ ও চিকিৎসা সমন্বয় সহায়তা।",
];

const MEMBERSHIP_BENEFITS = [
  "২৪ ঘণ্টার জরুরি মেডিকেল হটলাইন সাপোর্ট",
  "অগ্রাধিকার ভিত্তিতে অ্যাম্বুলেন্স ডিসপ্যাচ ও ডিসকাউন্ট",
  "শীর্ষ হাসপাতালে ভর্তি ও কেস ফলোআপ",
  "পরিবারের মনোনীত সদস্যের সঙ্গে সার্বক্ষণিক লিয়াজোঁ",
  "ল্যাব টেস্ট ও ওষুধ সংগ্রহের হোম ডেলিভারি সমন্বয়",
];

const INSURANCE_BENEFITS = [
  "হাসপাতাল ভর্তি ও অপারেশন ব্যয়ের ক্যাশলেস কভারেজ",
  "দুর্ঘটনাজনিত জরুরি চিকিৎসা ও আইসিইউ সুরক্ষা",
  "প্রবাসী ও বাংলাদেশে থাকা পরিবারের সদস্যদের জন্য প্রযোজ্য",
  "বীমা ক্লেইম প্রসেসিং ও ডকুমেন্টেশনে শতভাগ সহায়তা",
];

const TRUST_PILLARS = [
  { Icon: Handshake, t: "বিশ্বাসযোগ্য সেবা", d: "প্রবাসীদের বিশ্বস্ত স্বাস্থ্য সহচর" },
  { Icon: Clock, t: "২৪/৭ জরুরি সহায়তা", d: "দিন-রাত সার্বক্ষণিক সক্রিয় সাপোর্ট" },
  { Icon: Building2, t: "হাসপাতাল সমন্বয়", d: "দেশের শীর্ষ হাসপাতালের সাথে পার্টনারশিপ" },
  { Icon: Lock, t: "স্বচ্ছ প্রক্রিয়া", d: "কোনো গোপন চার্জ বা বাড়তি ফি নেই" },
  { Icon: HeartPulse, t: "পরিবারের পাশে", d: "আন্তরিক মমতায় সার্বক্ষণিক তত্ত্বাবধান" },
];

export default function FamilyCare() {
  return (
    <>
      <PageHead
        Icon={Users}
        title="DH Family Care — প্রবাসী পরিবার সুরক্ষা"
        sub="প্রবাসে আপনি, দেশে আপনার পরিবারের পাশে আমরা। প্রবাসীদের মা-বাবা ও সন্তানের সার্বক্ষণিক চিকিৎসা সুরক্ষা ও জরুরি সমন্বয় ব্যবস্থা।"
      />

      <div className="wrap space-y-10 py-8 max-w-4xl">
        {/* Dignified Problem & Solution Split */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Real Problems */}
          <section className="card border-rose-200 bg-gradient-to-b from-rose-50/40 to-white p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-100 text-rose-700">
                <AlertCircle size={18} />
              </span>
              <h2 className="font-head text-lg font-bold text-navy-dark">
                প্রবাসীদের বাস্তব দুশ্চিন্তাসমূহ
              </h2>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {PROBLEMS.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-200 text-[11px] font-bold text-rose-800 mt-0.5">
                    ✕
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* D H Solution */}
          <section className="card border-emerald-200 bg-gradient-to-b from-emerald-50/40 to-white p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={18} />
              </span>
              <h2 className="font-head text-lg font-bold text-navy-dark">
                আমাদের নিশ্চিত সমাধান
              </h2>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {SOLUTIONS.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="shrink-0 text-emerald-600 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Membership vs Insurance Cards */}
        <div className="grid gap-6 md:grid-cols-2" id="insurance">
          {/* Card 1: Family Care Membership */}
          <section className="card border-2 border-emerald-500/40 p-6 flex flex-col justify-between shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              সর্বাধিক জনপ্রিয়
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Users size={22} />
                </span>
                <div>
                  <h3 className="font-head text-xl font-bold text-navy-dark">
                    Family Care Membership
                  </h3>
                  <p className="text-xs text-slate-500">সার্বক্ষণিক সেবা-সমন্বয় মেম্বারশিপ</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2 mb-4 leading-relaxed">
                দেশে পরিবারের যেকোনো জরুরি শারীরিক সমস্যায় তাৎক্ষণিক সমন্বয়কারী হিসেবে আমাদের টিম পাশে দাঁড়াবে।
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                {MEMBERSHIP_BENEFITS.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-600 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <a href="#join" className="btn btn-green w-full text-xs font-bold">
                মেম্বারশিপের আবেদন করুন
              </a>
            </div>
          </section>

          {/* Card 2: Insurance Policy Guidance */}
          <section className="card border border-purple-200 p-6 flex flex-col justify-between shadow-card bg-gradient-to-b from-purple-50/20 to-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-100 text-purple-700">
                  <ShieldCheck size={22} />
                </span>
                <div>
                  <h3 className="font-head text-xl font-bold text-navy-dark">
                    Health Insurance Policy
                  </h3>
                  <p className="text-xs text-slate-500">অনুমোদিত স্বাস্থ্য বীমা সুবিধা</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2 mb-4 leading-relaxed">
                হাসপাতালে বড় ধরণের চিকিৎসার আর্থিক ঝুঁকি এড়াতে বিশ্বস্ত বীমা পলিসির নির্বাচন ও ক্লেইম পরামর্শ।
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                {INSURANCE_BENEFITS.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="shrink-0 text-purple-600 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <a href="#join" className="btn btn-navy w-full text-xs font-bold">
                বীমা তথ্য ও আবেদন সহায়তা চান
              </a>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                *বীমা কভারেজ সংশ্লিষ্ট অনুমোদিত ইন্সুরেন্স কোম্পানির শর্তানুযায়ী প্রযোজ্য।
              </p>
            </div>
          </section>
        </div>

        {/* Trust Pillars */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {TRUST_PILLARS.map(({ Icon, t, d }) => (
            <div key={t} className="card !p-3.5 text-center flex flex-col items-center justify-center border border-slate-200">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue mb-1.5">
                <Icon size={20} />
              </span>
              <b className="text-xs font-bold text-navy-dark block">{t}</b>
              <span className="text-[10px] text-slate-500 mt-0.5 leading-tight">{d}</span>
            </div>
          ))}
        </div>

        {/* Member Application Form */}
        <section id="join" className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
              <ShieldCheck size={28} />
            </span>
            <div>
              <span className="pill">সদস্যপদ নিবন্ধন</span>
              <h2 className="text-xl sm:text-2xl font-black text-navy-dark mt-1">
                আজই আপনার পরিবারের জন্য সদস্য হোন
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                নিচের ফর্মটি পূরণ করুন — আমাদের প্রবাসী কেয়ার সমন্বয়কারী সরাসরি আপনার নম্বরে যোগাযোগ করবেন।
              </p>
            </div>
          </div>

          <DynamicForm
            type="memberships"
            fields={membershipFields}
            submit="মেম্বারশিপের অনুরোধ পাঠান"
            success="আপনার মেম্বারশিপের তথ্য পেয়েছি! আমাদের টিম দ্রুত প্রবাসী ভাই বা দেশে পরিবারের সাথে যোগাযোগ করবে।"
          />
        </section>
      </div>
    </>
  );
}
