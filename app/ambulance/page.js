import { Ambulance, Phone, MapPin, HeartPulse, ShieldAlert, Sparkles, Clock, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
import PageHead from "@/components/PageHead";
import Text from "@/components/translated/Text";
import DynamicForm from "@/components/DynamicForm";
import { AMBULANCE_FAQS } from "@/lib/i18nData";
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
    id: "icu",
    type: { bn: "ICU অ্যাম্বুলেন্স", en: "ICU Ambulance" },
    tag: { bn: "ক্রিটিক্যাল লাইফ সাপোর্ট", en: "Critical life support" },
    desc: { bn: "ভেন্টিলেটর, ডিফিব্রিলেটর, সাকশন ও সার্বক্ষণিক দক্ষ প্যারামেডিক স্টাফ সহ।", en: "With ventilator, defibrillator, suction and trained paramedic staff available around the clock." },
    badge: { bn: "জরুরি", en: "Emergency" },
    badgeColor: "bg-brand-50 text-brand border-brand-200",
    fare: { bn: "৳৮,০০০ থেকে", en: "From ৳8,000" },
    eta: { bn: "২০-৩০ মিনিট", en: "20-30 minutes" },
  },
  {
    id: "oxygen",
    type: { bn: "অক্সিজেন অ্যাম্বুলেন্স", en: "Oxygen Ambulance" },
    tag: { bn: "শ্বাসকষ্ট ও হৃদরোগ", en: "Breathing & heart care" },
    desc: { bn: "উচ্চ ক্ষমতাসম্পন্ন সেন্ট্রাল অক্সিজেন সিলিন্ডার, ফ্লোমিটার ও মাস্ক সুবিধা।", en: "High-capacity central oxygen cylinder, flowmeter and mask facilities." },
    badge: { bn: "জনপ্রিয়", en: "Popular" },
    badgeColor: "bg-brand-50 text-brand border-brand-200",
    fare: { bn: "৳২,৫০০ থেকে", en: "From ৳2,500" },
    eta: { bn: "১৫-২০ মিনিট", en: "15-20 minutes" },
  },
  {
    id: "general",
    type: { bn: "সাধারণ AC অ্যাম্বুলেন্স", en: "General AC Ambulance" },
    tag: { bn: "হাসপাতাল স্থানান্তর", en: "Hospital transfer" },
    desc: { bn: "আরামদায়ক পেশেন্ট স্ট্রেচার, এসি সুবিধা ও রোগীর পরিবারের বসার সুব্যবস্থা।", en: "Comfortable patient stretcher, air conditioning and seating for the patient's family." },
    badge: { bn: "সাশ্রয়ী", en: "Affordable" },
    badgeColor: "bg-brand-50 text-brand border-brand-200",
    fare: { bn: "৳১,৫০০ থেকে", en: "From ৳1,500" },
    eta: { bn: "১৫-২৫ মিনিট", en: "15-25 minutes" },
  },
  {
    id: "nicu",
    type: { bn: "নবজাতক (NICU) অ্যাম্বুলেন্স", en: "Neonatal (NICU) Ambulance" },
    tag: { bn: "শিশু ও নবজাতক", en: "Child & newborn care" },
    desc: { bn: "বিশেষায়িত ইনকিউবেটর, বেবি ওয়ার্মার ও শিশু সুরক্ষা টেকনিশিয়ান টিম সহ।", en: "Specialised incubator, baby warmer and a child-care technician team." },
    badge: { bn: "বিশেষায়িত", en: "Specialised" },
    badgeColor: "bg-brand-50 text-brand border-brand-200",
    fare: { bn: "৳৯,৫০০ থেকে", en: "From ৳9,500" },
    eta: { bn: "২০-৩০ মিনিট", en: "20-30 minutes" },
  },
];

export default function AmbulancePage() {
  const faqSchema = getFaqSchema(AMBULANCE_FAQS.map((f) => ({ q: f.q.bn, a: f.a.bn })));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHead
        Icon={Ambulance}
        title={{ bn: "জরুরি অ্যাম্বুলেন্স বুকিং ও ডিসপ্যাচ", en: "Emergency Ambulance Booking & Dispatch" }}
        sub={{ bn: "সাধারণ এসি, অক্সিজেন, ICU ও নবজাতক অ্যাম্বুলেন্স — লাইভ জিপিএস লোকেশন ট্র্যাকিংসহ ১৫-২৫ মিনিটে দ্রুততম সমন্বয়।", en: "General AC, oxygen, ICU and neonatal ambulances — fastest coordination in 15-25 minutes with live GPS tracking." }}
      />

      <div className="wrap max-w-4xl space-y-8 py-10 sm:py-14 lg:py-16">
        {/* Authoritative Emergency Dispatch Callout */}
        <div className="rounded-2xl bg-brand p-6 text-white shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border border-brand-dark/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                <Text k="amb_dispatch_room" />
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black !text-white leading-tight mb-3">
              <Text k="amb_urgent" />
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
              <Text k="amb_urgent_sub" />
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
              <span className="pill"><Text k="amb_fleet_pill" /></span>
              <h2 id="fleet-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark mt-2 mb-3 flex items-center gap-2">
                <Text k="amb_fleet_title" />
              </h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AMBULANCE_TYPES.map((a) => (
              <div
                key={a.id}
                className="card card-hover flex flex-col justify-between p-4 sm:p-5 border border-slate-200"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${a.badgeColor}`}>
                      <Text value={a.badge} />
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      ETA: <Text value={a.eta} />
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-bold text-base text-brand-dark"><Text value={a.type} /></h3>
                  <p className="text-xs font-semibold text-brand mt-0.5"><Text value={a.tag} /></p>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed"><Text value={a.desc} /></p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500"><Text k="amb_fare_start" /></span>
                  <b className="text-red font-black"><Text value={a.fare} /></b>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form with GPS Location Tagging */}
        <section aria-labelledby="booking-title" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 sm:mb-8">
            <div>
              <span className="pill"><Text k="amb_request_pill" /></span>
              <h2 id="booking-title" className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark mt-2 mb-3">
                <Text k="amb_request_title" />
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mt-1">
                <Text value={{ bn: 'রোগীর বর্তমান ঠিকানা ও "📍 আমার বর্তমান লোকেশন দিন" বাটনে ক্লিক করে জিপিএস পিন ট্যাগ করুন।', en: 'Enter the patient’s current address and tap the "📍 Use my current location" button to tag the GPS pin.' }} />
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck size={15} className="text-emerald-600" />
              <span><Text k="amb_secure_data" /></span>
            </div>
          </div>

          <DynamicForm
            type="ambulance"
            fields={ambulanceFields}
            submit={{ bn: "অ্যাম্বুলেন্স বুকিং অনুরোধ নিশ্চিত করুন", en: "Confirm ambulance booking request" }}
            success={{ bn: "আপনার অ্যাম্বুলেন্স বুকিং অনুরোধ পেয়েছি! আমাদের জরুরি সমন্বয় টিম কয়েক মিনিটের মধ্যে আপনার নম্বরে কল করে ড্রাইভার পাঠিয়ে দেবে।", en: "We have received your ambulance booking request! Our emergency coordination team will call you within a few minutes and dispatch a driver." }}
          />
        </section>

        {/* SEO FAQs Accordion Section */}
        <section className="card p-5 sm:p-6 border border-slate-200/90 space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-brand">
              <HelpCircle size={18} />
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-dark mb-3">
              <Text k="amb_faq_title" />
            </h2>
          </div>

          <div className="space-y-2.5">
            {AMBULANCE_FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all open:bg-white open:shadow-subtle"
              >
                <summary className="font-bold text-sm text-brand-dark cursor-pointer list-none flex items-center justify-between">
                  <span><Text value={faq.q} /></span>
                  <span className="text-brand font-black transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                  <Text value={faq.a} />
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
