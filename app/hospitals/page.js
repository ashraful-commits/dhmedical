import { Building2, HelpCircle } from "lucide-react";
import PageHead from "@/components/PageHead";
import Catalog from "@/components/Catalog";
import { BASE_URL, getFaqSchema } from "@/lib/seoHelper";

export const metadata = {
  title: "হাসপাতাল তালিকা, বেড সংখ্যা ও ফ্লোর ডিরেক্টরি | হাসপাতাল সমন্বয় বাংলাদেশ",
  description:
    "ঢাকা ও বাংলাদেশের শীর্ষ হাসপাতালের তালিকা, বেড সংখ্যা, আইসিইউ (ICU), সিসিইউ ও তলা ভিত্তিক রুম ডিরেক্টরি। ফ্রি গুগল ম্যাপ ডিরেকশন ও জরুরি ভর্তি সহায়তা।",
  keywords: [
    "hospital list bangladesh",
    "হাসপাতাল বেড ঢাকা",
    "icu bed availability dhaka",
    "hospatal",
    "aspatal",
    "evercare hospital bed",
    "square hospital dhaka",
    "united hospital serial",
    "dhaka medical college hospital",
    "emergency hospital near me",
  ],
  alternates: {
    canonical: `${BASE_URL}/hospitals`,
  },
  openGraph: {
    title: "হাসপাতাল তালিকা ও বেড সমন্বয় — D H Medical Support",
    description: "হাসপাতালে ভর্তি, আইসিইউ সমন্বয় ও ফ্লোর গাইড।",
    url: `${BASE_URL}/hospitals`,
    images: [{ url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=630&fit=crop" }],
  },
};

const HOSPITAL_FAQS = [
  {
    q: "হাসপাতালে জরুরি বেড বা আইসিইউ (ICU) পাওয়ার উপায় কী?",
    a: "আমাদের ২৪ ঘণ্টা হটলাইনে (01625-268462) কল করলে আমাদের টিম স্কয়ার, এভারকেয়ার, ল্যাবএইড, ইউনাইটেড সহ শীর্ষ হাসপাতালে তাৎক্ষণিক খালি বেড ও আইসিইউ কনফার্ম করে দেয়।",
  },
  {
    q: "হাসপাতালের ফ্লোর ডিরেক্টরি (কয়তলায় কোন রুম) কীভাবে দেখব?",
    a: "প্রতিটি হাসপাতালের কার্ডে 'কয়তলায় কোন রুম আছে (ফ্লোর ডিরেক্টরি)' অপশনে ক্লিক করলে নিচতলা থেকে সর্বোচ্চ তলা পর্যন্ত ওটি, ল্যাব, আইসিইউ ও কেবিন রুম নম্বর দেখতে পাবেন।",
  },
];

export default function Hospitals({ searchParams }) {
  const faqSchema = getFaqSchema(HOSPITAL_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHead
        Icon={Building2}
        title="হাসপাতাল, বেড সংখ্যা ও ফ্লোর ডিরেক্টরি"
        sub="ভর্তি, কেবিন, ICU ও পরীক্ষা — কয়তলায় কোন রুম আছে ও ফ্রি ম্যাপ ডিরেকশন সহ।"
      />
      <Catalog kind="hospitals" q0={searchParams.q || ""} />

      <div className="wrap max-w-4xl pb-10">
        <section className="card p-6 border border-slate-200 space-y-4">
          <h2 className="text-xl font-black text-navy flex items-center gap-2">
            <HelpCircle size={22} className="text-blue" /> সাধারণ জিজ্ঞাসাবলী — হাসপাতাল ও আইসিইউ সেবা
          </h2>
          <div className="space-y-3">
            {HOSPITAL_FAQS.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all open:bg-white open:shadow-sm">
                <summary className="font-bold text-navy cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-blue font-black transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
