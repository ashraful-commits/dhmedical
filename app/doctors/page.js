import { Stethoscope, HelpCircle } from "lucide-react";
import PageHead from "@/components/PageHead";
import Catalog from "@/components/Catalog";
import { BASE_URL, getFaqSchema } from "@/lib/seoHelper";

export const metadata = {
  title: "বিশেষজ্ঞ ডাক্তার সিরিয়াল ও অ্যাপয়েন্টমেন্ট | মেডিসিন, নিউরো, কার্ডিওলজি ডাক্তার বাংলাদেশ",
  description:
    "বাংলাদেশের সেরা বিশেষজ্ঞ ডাক্তারদের চেম্বার ও সিরিয়াল বুকিং। মেডিসিন, হৃদরোগ, নিউরো মেডিসিন, অর্থোপেডিক, শিশু ও গাইনি ডাক্তারদের সময়সূচি ও ফি। DocTime ও Praava Health স্টাইল দ্রুততম সেবা।",
  keywords: [
    "doctor serial bd",
    "dockter",
    "dakdar",
    "medicin",
    "medicine specialist doctor bd",
    "cardiologist doctor dhaka",
    "neuro medicine specialist bangladesh",
    "ডাক্তার সিরিয়াল ঢাকা",
    "বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট",
    "online doctor appointment bd",
    "doctime",
  ],
  alternates: {
    canonical: `${BASE_URL}/doctors`,
  },
  openGraph: {
    title: "বিশেষজ্ঞ ডাক্তার খুঁজুন ও সিরিয়াল নিন — D H Medical Support",
    description: "মেডিসিন, হৃদরোগ, নিউরো, অর্থোপেডিক সহ সকল বিভাগের বিশেষজ্ঞ ডাক্তারদের সিরিয়াল।",
    url: `${BASE_URL}/doctors`,
    images: [{ url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&h=630&fit=crop" }],
  },
};

const DOCTOR_FAQS = [
  {
    q: "ডাক্তারের সিরিয়াল কীভাবে বুকিং করব?",
    a: "নিচের ডাক্তার তালিকা থেকে আপনার কাঙ্ক্ষিত ডাক্তারের পাশে 'সিরিয়াল নিন' বাটনে ক্লিক করুন অথবা 'অ্যাপয়েন্টমেন্ট' ফর্মে রোগীর নাম ও মোবাইল নম্বর পূরণ করে সাবমিট করুন।",
  },
  {
    q: "মেডিসিন বা বিশেষজ্ঞ ডাক্তারদের ভিজিট ফি কত?",
    a: "অধিকাংশ বিশেষজ্ঞ অধ্যাপকদের ভিজিট ফি ১,০০০ টাকা থেকে ২,০০০ টাকার মধ্যে নির্ধারিত থাকে। ফি এর পরিমাণ সরাসরি ডাক্তার কার্ডে উল্লেখ রয়েছে।",
  },
  {
    q: "সিরিয়াল কনফার্মেশন কীভাবে পাব?",
    a: "বুকিং সাবমিট করার সাথে সাথে একটি ইউনিক ট্র্যাকিং আইডি (DH-APT-...) পাওয়া যায়। এছাড়া আমাদের কো-অর্ডিনেটর রোগী বা স্বজনের মোবাইলে ফোন করে চেম্বার ও রুম নম্বর নিশ্চিত করেন।",
  },
];

export default function Doctors({ searchParams }) {
  const faqSchema = getFaqSchema(DOCTOR_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHead
        Icon={Stethoscope}
        title="ডাক্তার ও মেডিসিন বিশেষজ্ঞ খুঁজুন"
        sub="বিভাগ, রোগ বা ডাক্তারের নাম দিয়ে তাৎক্ষণিক খুঁজুন এবং ১-ক্লিকে চেম্বার সিরিয়াল বুক করুন।"
      />
      <Catalog kind="doctors" q0={searchParams.q || ""} sp0={searchParams.sp || ""} />

      <div className="wrap max-w-4xl pb-10">
        <section className="card p-6 border border-slate-200 space-y-4">
          <h2 className="text-xl font-black text-navy flex items-center gap-2">
            <HelpCircle size={22} className="text-blue" /> সাধারণ জিজ্ঞাসাবলী — ডাক্তার অ্যাপয়েন্টমেন্ট
          </h2>
          <div className="space-y-3">
            {DOCTOR_FAQS.map((faq, i) => (
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
