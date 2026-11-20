import { Handshake, BadgeCheck, Camera, CreditCard, ShieldCheck, PhoneCall, CheckCircle2 } from "lucide-react";
import PageHead from "@/components/PageHead";
import DynamicForm from "@/components/DynamicForm";
import { partnerFields } from "@/lib/forms";

export const metadata = { title: "অ্যাম্বুলেন্স ড্রাইভার ও মালিক পার্টনার নিবন্ধন | D H Medical Support" };

const STEPS = [
  {
    step: "১",
    Icon: CreditCard,
    title: "তথ্য ও NID নম্বর দিন",
    desc: "আপনার নাম, মোবাইল নম্বর, NID নং ও গাড়ির রেজিস্ট্রেশন নম্বর প্রদান করুন।",
  },
  {
    step: "২",
    Icon: Camera,
    title: "NID ও লাইসেন্সের ছবি তুলুন",
    desc: "মোবাইলের ক্যামেরা দিয়ে আপনার NID কার্ডের সামনের ও পেছনের পাতার পরিষ্কার ছবি তুলুন।",
  },
  {
    step: "৩",
    Icon: ShieldCheck,
    title: "যাচাই ও অ্যাকাউন্ট চালু",
    desc: "তথ্য যাচাইয়ের পর আমাদের অ্যাডমিন টিম দ্রুত আপনার পার্টনার অ্যাকাউন্ট সক্রিয় করে নেবে।",
  },
  {
    step: "৪",
    Icon: PhoneCall,
    title: "নিয়মিত ট্রিপ পান",
    desc: "আপনার সার্ভিস এলাকার রোগীদের সঙ্গে সরাসরি যোগাযোগ করে ২৪ ঘণ্টা কাজ করার সুযোগ পাবেন।",
  },
];

const TERMS = [
  "রোগী ও তার পরিবারের সঙ্গে সর্বদা সম্মানজনক ও মানবিক ব্যবহার করতে হবে।",
  "নির্ধারিত ন্যায্য ভাড়ার বাইরে অতিরিক্ত কোনো অযৌক্তিক টাকা দাবি করা যাবে না।",
  "জরুরি অবস্থায় দ্রুততম সময়ে রোগীর লোকেশনে পৌঁছানোর সর্বোচ্চ চেষ্টা করতে হবে।",
  "রোগীর নিরাপত্তা, গোপনীয়তা ও অক্সিজেন/যন্ত্রপাতির কার্যকারিতা নিশ্চিত রাখতে হবে।",
  "কাগজপত্র (লাইসেন্স, ফিটনেস, রেজিস্ট্রেশন) সঠিক ও হালনাগাদ থাকতে হবে।",
];

export default function Partner() {
  return (
    <>
      <PageHead
        Icon={Handshake}
        title="অ্যাম্বুলেন্স ড্রাইভার ও মালিকের নিবন্ধন"
        sub="D H Medical Support পার্টনার নেটওয়ার্কে যুক্ত হয়ে নিয়মিত রোগী পান ও সম্মানিত সেবা দিন।"
      />

      <div className="wrap max-w-4xl space-y-8 py-8">
        {/* Step-by-step Onboarding Guide */}
        <section aria-labelledby="steps-title" className="rounded-2xl bg-gradient-to-br from-navy to-blue p-6 text-white shadow-lg sm:p-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-gold">
              সহজ নিবন্ধন পদ্ধতি
            </span>
            <h2 id="steps-title" className="mt-2 text-2xl font-black sm:text-3xl !text-white">
              ড্রাইভার ও মালিক যেভাবে যুক্ত হবেন
            </h2>
            <p className="mt-1 text-xs text-blue-soft sm:text-sm">
              নিচের ৪টি সহজ ধাপ অনুসরণ করে আজই আপনার অ্যাকাউন্ট খুলুন
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => {
              const I = s.Icon;
              return (
                <div key={s.step} className="rounded-xl bg-white/10 p-4 border border-white/10 backdrop-blur flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-navy font-black text-sm">
                        {s.step}
                      </span>
                      <I size={22} className="text-blue-soft" />
                    </div>
                    <h3 className="font-bold text-base text-white">{s.title}</h3>
                    <p className="mt-1 text-xs text-blue-soft leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Terms of Service */}
        <div className="card border-blue/20">
          <h2 className="font-head text-xl font-bold text-navy flex items-center gap-2">
            <CheckCircle2 className="text-green" size={22} /> চুক্তির নিয়ম ও শর্তাবলী
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
            {TERMS.map((t) => (
              <li key={t} className="flex gap-3">
                <BadgeCheck className="shrink-0 text-blue mt-0.5" size={18} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Partner Registration Form */}
        <section aria-labelledby="form-heading">
          <div className="mb-4">
            <span className="pill">নিবন্ধন ফর্ম</span>
            <h2 id="form-heading" className="text-2xl font-black text-navy mt-1">
              আপনার সঠিক তথ্য ও NID কার্ডের ছবি দিন
            </h2>
            <p className="text-sm text-slate-600">
              সবগুলো তথ্য পূরণ করুন। আপনার দেওয়া তথ্য ও ছবি আমাদের সুরক্ষিত সার্ভারে সংরক্ষিত থাকবে।
            </p>
          </div>

          <DynamicForm
            type="partners"
            fields={partnerFields}
            submit="পার্টনার অ্যাকাউন্ট নিবন্ধন সম্পন্ন করুন"
            success="আপনার নিবন্ধন ও NID ছবি সফলভাবে জমা হয়েছে! আমাদের অ্যাডমিন টিম যাচাই করার পর দ্রুত কল করে আপনার অ্যাকাউন্ট সক্রিয় করে দেবে।"
          />
        </section>
      </div>
    </>
  );
}
