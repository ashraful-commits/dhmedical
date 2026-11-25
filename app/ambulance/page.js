import { Ambulance, Phone, MapPin, HeartPulse, ShieldAlert, Sparkles, Clock, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
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
    tag: "ক্রিটিক্যাল লাইফ সাপোর্ট",
    desc: "ভেন্টিলেটর, ডিফিব্রিলেটর, সাকশন ও সার্বক্ষণিক দক্ষ প্যারামেডিক স্টাফ সহ।",
    badge: "জরুরি",
    badgeColor: "bg-brand-50 text-brand border-brand-200",
    fare: "৳৮,০০০ থেকে",
    eta: "২০-৩০ মিনিট",
  },
  {
    type: "অক্সিজেন অ্যাম্বুলেন্স",
    tag: "শ্বাসকষ্ট ও হৃদরোগ",
    desc: "উচ্চ ক্ষমতাসম্পন্ন সেন্ট্রাল অক্সিজেন সিলিন্ডার, ফ্লোমিটার ও মাস্ক সুবিধা।",
    badge: "জনপ্রিয়",
    badgeColor: "bg-brand-50 text-brand border-brand-200",
    fare: "৳২,৫০০ থেকে",
    eta: "১৫-২০ মিনিট",
  },
  {
    type: "সাধারণ AC অ্যাম্বুলেন্স",
    tag: "হাসপাতাল স্থানান্তর",
    desc: "আরামদায়ক পেশেন্ট স্ট্রেচার, এসি সুবিধা ও রোগীর পরিবারের বসার সুব্যবস্থা।",
    badge: "সাশ্রয়ী",
    badgeColor: "bg-brand-50 text-brand border-brand-200",
    fare: "৳১,৫০০ থেকে",
    eta: "১৫-২৫ মিনিট",
  },
  {
    type: "নবজাতক (NICU) অ্যাম্বুলেন্স",
    tag: "শিশু ও নবজাতক",
    desc: "বিশেষায়িত ইনকিউবেটর, বেবি ওয়ার্মার ও শিশু সুরক্ষা টেকনিশিয়ান টিম সহ।",
    badge: "বিশেষায়িত",
    badgeColor: "bg-brand-50 text-brand border-brand-200",
    fare: "৳৯,৫০০ থেকে",
    eta: "২০-৩০ মিনিট",
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
        title="জরুরি অ্যাম্বুলেন্স বুকিং ও ডিসপ্যাচ"
        sub="সাধারণ এসি, অক্সিজেন, ICU ও নবজাতক অ্যাম্বুলেন্স — লাইভ জিপিএস লোকেশন ট্র্যাকিংসহ ১৫-২৫ মিনিটে দ্রুততম সমন্বয়।"
      />

      <div className="wrap max-w-4xl space-y-8 py-10 sm:py-14 lg:py-16">
        {/* Authoritative Emergency Dispatch Callout */}
        <div className="rounded-2xl bg-brand p-6 text-white shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border border-brand-dark/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                ২৪ ঘণ্টা সেন্ট্রাল ডিসপ্যাচ রুম
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black !text-white leading-tight mb-3">
              খুব বেশি জরুরি অবস্থায় আছেন?
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
              দেরি না করে সরাসরি আমাদের জরুরি হটলাইনে কল দিন — কোঅর্ডিনেটর সাথে সাথে গাড়ি পাঠিয়ে দেবে।
            </p>
          </div>

          <a
            href={SITE.tel}
            className="btn bg-white text-brand font-black text-base sm:text-lg !py-3 !px-6 shadow-md hover:bg-slate-50 shrink-0 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Phone size={22} />
            <span>{SITE.phone}</span>
          </a>
        </div>

        {/* Fleet Grid */}
        <section aria-labelledby="fleet-title" className="space-y-4">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <span className="pill">আমাদের অ্যাম্বুলেন্স বহর</span>
              <h2 id="fleet-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark mt-2 mb-3 flex items-center gap-2">
                রোগীর প্রয়োজন অনুযায়ী উপযুক্ত গাড়ি নির্বাচন করুন
              </h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AMBULANCE_TYPES.map((a) => (
              <div
                key={a.type}
                className="card card-hover flex flex-col justify-between p-4 sm:p-5 border border-slate-200"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${a.badgeColor}`}>
                      {a.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      ETA: {a.eta}
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-bold text-base text-brand-dark">{a.type}</h3>
                  <p className="text-xs font-semibold text-brand mt-0.5">{a.tag}</p>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">ভাড়া শুরু:</span>
                  <b className="text-red font-black">{a.fare}</b>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form with GPS Location Tagging */}
        <section aria-labelledby="booking-title" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 sm:mb-8">
            <div>
              <span className="pill">অনলাইন রিকুয়েস্ট</span>
              <h2 id="booking-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark mt-2 mb-3">
                অ্যাম্বুলেন্সের জন্য তথ্য পূরণ করুন
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mt-1">
                রোগীর বর্তমান ঠিকানা ও <b>&quot;📍 আমার বর্তমান লোকেশন দিন&quot;</b> বাটনে ক্লিক করে জিপিএস পিন ট্যাগ করুন।
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck size={15} className="text-emerald-600" />
              <span>১০০% তথ্যের নিরাপত্তা নিশ্চিত</span>
            </div>
          </div>

          <DynamicForm
            type="ambulance"
            fields={ambulanceFields}
            submit="অ্যাম্বুলেন্স বুকিং অনুরোধ নিশ্চিত করুন"
            success="আপনার অ্যাম্বুলেন্স বুকিং অনুরোধ পেয়েছি! আমাদের জরুরি সমন্বয় টিম কয়েক মিনিটের মধ্যে আপনার নম্বরে কল করে ড্রাইভার পাঠিয়ে দেবে।"
          />
        </section>

        {/* SEO FAQs Accordion Section */}
        <section className="card p-5 sm:p-6 border border-slate-200/90 space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-brand">
              <HelpCircle size={18} />
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark mb-3">
              সাধারণ জিজ্ঞাসাবলী (FAQ) — অ্যাম্বুলেন্স সার্ভিস
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all open:bg-white open:shadow-subtle"
              >
                <summary className="font-bold text-sm text-brand-dark cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-brand font-black transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
