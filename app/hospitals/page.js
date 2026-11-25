import { Building2, HelpCircle } from "lucide-react";
import PageHead from "@/components/PageHead";
import Text from "@/components/translated/Text";
import Catalog from "@/components/Catalog";
import { HOSPITAL_FAQS } from "@/lib/i18nData";
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

export default function Hospitals({ searchParams }) {
  const faqSchema = getFaqSchema(HOSPITAL_FAQS.map((f) => ({ q: f.q.bn, a: f.a.bn })));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHead
        Icon={Building2}
        title={{ bn: "হাসপাতাল, বেড সংখ্যা ও ফ্লোর ডিরেক্টরি", en: "Hospitals, Bed Counts & Floor Directory" }}
        sub={{ bn: "ভর্তি, কেবিন, ICU ও পরীক্ষা — কয়তলায় কোন রুম আছে ও ফ্রি ম্যাপ ডিরেকশন সহ।", en: "Admission, cabins, ICU and tests — with room-by-floor details and free map directions." }}
      />
      <Catalog kind="hospitals" q0={searchParams.q || ""} />

      <div className="wrap max-w-4xl pb-10 sm:pb-14 lg:pb-16">
        <section className="card p-5 sm:p-6 border border-slate-200 space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand flex items-center gap-2 mb-3">
            <HelpCircle size={22} className="text-brand" /> <Text k="hospitals_faq_title" />
          </h2>
          <div className="space-y-3">
            {HOSPITAL_FAQS.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all open:bg-white open:shadow-sm">
                <summary className="font-bold text-brand cursor-pointer list-none flex items-center justify-between">
                  <span><Text value={faq.q} /></span>
                  <span className="text-brand font-black transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-2"><Text value={faq.a} /></p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
