import { Ambulance, Phone, MapPin, HeartPulse, ShieldAlert, Sparkles, Clock, CheckCircle2, HelpCircle } from "lucide-react";
import PageHead from "@/components/PageHead";
import DynamicForm from "@/components/DynamicForm";
import { ambulanceFields } from "@/lib/forms";
import { SITE } from "@/lib/site";
import { BASE_URL, getFaqSchema } from "@/lib/seoHelper";

export const metadata = {
  title: "জরুরি অ্যাম্বুলেন্স বুকিং ও ভাড়া | ICU, অক্সিজেন ও এসি অ্যাম্বুলেন্স সার্ভিস বাংলাদেশ",
  description:
    "ঢাকা ও সারা দেশে ২৪ ঘণ্টা জরুরি এম্বুলেন্স সেবা। সাধারণ এসি, অক্সিজেন, আইসিইউ (ICU), নবজাতক (NICU) ও দূরপাল্লার অ্যাম্বুলেন্স বুকিং। লাইভ জিপিএস লোকেশন ও সম্ভাব্য ভাড়া। হটলাইন: 01625-268462।",
  keywords: [
    "ambulance service bangladesh",
    "ambulance service dhaka",
    "জরুরি এম্বুলেন্স ঢাকা",
    "icu ambulance bd",
    "oxygen ambulance rent",
    "ambolence",
    "ambulence",
    "এম্বুলেন্স ভাড়া",
    "emergency ambulance 24/7",
    "24 hour ambulance hotline",
    "ambulance near me",
  ],
  alternates: {
    canonical: `${BASE_URL}/ambulance`,
  },
  openGraph: {
    title: "জরুরি অ্যাম্বুলেন্স বুকিং — D H Medical Support",
    description: "১৫-২৫ মিনিটের মধ্যে দ্রুততম সময়ে অ্যাম্বুলেন্স পৌঁছাবে। হটলাইন: 01625-268462।",
    url: `${BASE_URL}/ambulance`,
    images: [{ url: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=1200&h=630&fit=crop" }],
  },
};

const AMBULANCE_TYPES = [
  {
    type: "ICU অ্যাম্বুলেন্স",
    tag: "ক্রিটিক্যাল কেয়ার",
    desc: "লাইফ সাপোর্ট ভেন্টিলেটর, ডিফিব্রিলেটর, সাকশন ও সার্বক্ষণিক দক্ষ প্যারামেডিক সহ।",
    badge: "জরুরি",
  },
  {
    type: "অক্সিজেন অ্যাম্বুলেন্স",
    tag: "শ্বাসকষ্ট ও হার্ট",
    desc: "উচ্চ ক্ষমতাসম্পন্ন সেন্ট্রাল অক্সিজেন সিলিন্ডার, ফ্লোমিটার ও মাস্ক সুবিধা।",
    badge: "জনপ্রিয়",
  },
  {
    type: "সাধারণ AC অ্যাম্বুলেন্স",
    tag: "হাসপাতাল স্থানান্তর",
    desc: "আরামদায়ক স্ট্রেচার, এসি সুবিধা ও রোগীর পরিবারের বসার সুব্যবস্থা।",
    badge: "সাশ্রয়ী",
  },
  {
    type: "নবজাতক (NICU) অ্যাম্বুলেন্স",
    tag: "শিশু ও নবজাতক",
    desc: "ইনকিউবেটর, বেবি ওয়ার্মার ও বিশেষায়িত নবজাতক সুরক্ষা ব্যবস্থা।",
    badge: "বিশেষায়িত",
  },
];

const FAQS = [
  {
    q: "জরুরি অ্যাম্বুলেন্স কত দ্রুত রোগীর কাছে পৌঁছাবে?",
    a: "অনলাইন বুকিং বা হটলাইনে (01625-268462) কল করার সাথে সাথে আমাদের নিকটতম অ্যাম্বুলেন্স রওনা হয় এবং ১৫ থেকে ২৫ মিনিটের মধ্যে পৌঁছে যায়।",
  },
  {
    q: "অ্যাম্বুলেন্সের প্রাথমিক ভাড়া কত?",
    a: "ঢাকার ভেতরে সাধারণ এসি অ্যাম্বুলেন্স ১৫০০ টাকা, অক্সিজেন অ্যাম্বুলেন্স ২৫০০ টাকা এবং আইসিইউ (ICU) লাইফ সাপোর্ট অ্যাম্বুলেন্স ৮০০০ টাকা থেকে শুরু। দূরপাল্লার ক্ষেত্রে প্রতি কিমি ৬৫ টাকা হারে নির্ধারিত হয়।",
  },
  {
    q: "আইসিইউ অ্যাম্বুলেন্সে কি ডাক্তার বা প্যারামেডিক থাকে?",
    a: "হ্যাঁ, আমাদের প্রতিটি ICU ও কার্ডিয়াক অ্যাম্বুলেন্সে ভেন্টিলেটর, সাকশন, মনিটর সহ প্রশিক্ষিত জরুরি প্যারামেডিক উপস্থিত থাকে।",
  },
  {
    q: "ঢাকার বাইরে জেলা পর্যায়ে কি দূরপাল্লার অ্যাম্বুলেন্স পাওয়া যায়?",
    a: "হ্যাঁ, ঢাকা থেকে চট্টগ্রাম, সিলেট, রাজশাহী, খুলনা, কুমিল্লা, বরিশাল সহ বাংলাদেশের ৬৪ জেলাতেই দূরপাল্লার রোগী পরিবহনে আমাদের অ্যাম্বুলেন্স ২৪ ঘণ্টা নিয়োজিত।",
  },
];

export default function AmbulancePage() {
  const faqSchema = getFaqSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHead
        Icon={Ambulance}
        title="জরুরি অ্যাম্বুলেন্স বুকিং"
        sub="সাধারণ, অক্সিজেন, ICU ও নবজাতক অ্যাম্বুলেন্স — লাইভ জিপিএস লোকেশন ট্র্যাকিংসহ দ্রুততম সময়ে সমন্বয়।"
      />

      <div className="wrap max-w-4xl space-y-8 py-8">
        {/* Emergency Call Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-red-dark via-red to-rose-600 p-5 text-white shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
              <Clock size={14} /> ২৪ ঘণ্টা জরুরি সার্ভিস
            </span>
            <h2 className="mt-1 text-2xl font-black !text-white">খুব বেশি জরুরি অবস্থা?</h2>
            <p className="text-sm text-white/90">দেরি না করে সরাসরি আমাদের জরুরি হটলাইনে কল দিন</p>
          </div>
          <a
            href={SITE.tel}
            className="btn bg-white text-red font-black text-lg !py-3 !px-6 shadow-md hover:bg-slate-50 shrink-0 flex items-center justify-center gap-2"
          >
            <Phone size={22} className="animate-pulse" />
            {SITE.phone}
          </a>
        </div>

        {/* Fleet Grid */}
        <section aria-labelledby="fleet-title">
          <h2 id="fleet-title" className="text-2xl font-black text-navy mb-4 flex items-center gap-2">
            <Ambulance className="text-red" size={24} /> আমাদের অ্যাম্বুলেন্স বহর
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AMBULANCE_TYPES.map((a) => (
              <div key={a.type} className="card !p-4 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-red/10 px-2 py-0.5 text-xs font-bold text-red">
                      {a.badge}
                    </span>
                  </div>
                  <h3 className="mt-2 font-bold text-base text-navy">{a.type}</h3>
                  <p className="mt-1 text-xs font-semibold text-blue">{a.tag}</p>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form with GPS Location Tagging */}
        <section aria-labelledby="booking-title" className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="pill">অনলাইন রিকুয়েস্ট</span>
              <h2 id="booking-title" className="text-2xl font-black text-navy mt-1">
                অ্যাম্বুলেন্সের জন্য তথ্য দিন
              </h2>
              <p className="text-sm text-slate-600">
                নিচে রোগীর বর্তমান ঠিকানা ও <b>&quot;📍 আমার বর্তমান লোকেশন দিন&quot;</b> বাটনে ক্লিক করে জিপিএস ম্যাপ লিংক ট্যাগ করুন।
              </p>
            </div>
          </div>

          <DynamicForm
            type="ambulance"
            fields={ambulanceFields}
            submit="অ্যাম্বুলেন্স বুকিং অনুরোধ পাঠান"
            success="আপনার অ্যাম্বুলেন্স বুকিং অনুরোধ পেয়েছি! আমাদের জরুরি সমন্বয় টিম কয়েক মিনিটের মধ্যে আপনার নম্বরে কল করে ড্রাইভার পাঠিয়ে দেবে।"
          />
        </section>

        {/* SEO FAQs Accordion Section */}
        <section className="card p-6 border border-slate-200 space-y-4">
          <h2 className="text-xl font-black text-navy flex items-center gap-2">
            <HelpCircle size={22} className="text-blue" /> সাধারণ জিজ্ঞাসাবলী (FAQ) — অ্যাম্বুলেন্স সার্ভিস
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
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
