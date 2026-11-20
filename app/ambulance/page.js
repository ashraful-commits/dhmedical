import { Ambulance, Phone, MapPin, HeartPulse, ShieldAlert, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import PageHead from "@/components/PageHead";
import DynamicForm from "@/components/DynamicForm";
import { ambulanceFields } from "@/lib/forms";
import { SITE } from "@/lib/site";

export const metadata = { title: "জরুরি অ্যাম্বুলেন্স বুকিং | D H Medical Support" };

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

export default function AmbulancePage() {
  return (
    <>
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
      </div>
    </>
  );
}
