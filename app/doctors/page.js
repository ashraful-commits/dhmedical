import Link from "next/link";
import { Stethoscope, HelpCircle, MessageCircle, Phone, Users } from "lucide-react";
import PageHead from "@/components/PageHead";
import Text from "@/components/translated/Text";
import Catalog from "@/components/Catalog";
import { DOCTOR_FAQS, translateText } from "@/lib/i18nData";
import { BASE_URL, getFaqSchema } from "@/lib/seoHelper";
import { SITE, SPECIALTIES } from "@/lib/site";
import { doctorData } from "@/lib/seedData";

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

export default function Doctors({ searchParams }) {
  const faqSchema = getFaqSchema(DOCTOR_FAQS.map((f) => ({ q: f.q.bn, a: f.a.bn })));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHead
        Icon={Stethoscope}
        title={{ bn: "ডাক্তার ও মেডিসিন বিশেষজ্ঞ খুঁজুন", en: "Find Doctors & Medicine Specialists" }}
        sub={{ bn: "বিভাগ, রোগ বা ডাক্তারের নাম দিয়ে তাৎক্ষণিক খুঁজুন এবং ১-ক্লিকে চেম্বার সিরিয়াল বুক করুন।", en: "Search instantly by specialty, condition or doctor name and book a chamber serial in one click." }}
      />
      <section className="wrap mt-8 space-y-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="card border border-slate-200 p-5 sm:p-6 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="pill"><Text value={{ bn: "বিশেষজ্ঞ ডাক্তার ডাইরেক্টরি", en: "Specialist Doctor Directory" }} /></span>
                <h2 className="mt-1 mb-3 text-2xl sm:text-3xl lg:text-4xl font-black text-brand">
                  <Text value={{ bn: `বিভাগ অনুযায়ী ${doctorData.length} জন ডাক্তারের তথ্য`, en: `${doctorData.length} doctors by specialty` }} />
                </h2>
                <p className="mt-1 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl"><Text value={{ bn: "নিচের নামগুলো দেখে সরাসরি সিরিয়াল বা লাইভ কনসালটেশন চাইতে পারেন।", en: "Browse the names below to request a serial or a live consultation." }} /></p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand">
                <Users size={14} /> <Text value={{ bn: `${SPECIALTIES.length} টি বিভাগ`, en: `${SPECIALTIES.length} specialties` }} />
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {SPECIALTIES.map((s) => {
                const doctors = doctorData.filter((d) => d.specialty === s.key);
                if (!doctors.length) return null;
                return (
                  <div key={s.key} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-black text-brand"><Text value={{ bn: s.bn, en: s.name }} /></h3>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-brand border border-brand/15">
                        <Text value={{ bn: `${doctors.length} জন`, en: `${doctors.length} doctors` }} />
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {doctors.map((d) => (
                        <Link
                          key={d.name}
                          href={`/appointment?doctor=${encodeURIComponent(d.name)}&sp=${encodeURIComponent(s.key)}`}
                          className="rounded-lg bg-white border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand hover:text-brand"
                        >
                          <Text value={{ bn: d.name, en: d.nameEn || translateText(d.name, "en") }} />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="card border border-brand/20 bg-gradient-to-br from-[#4B93F5] via-brand to-[#0F63CC] p-5 sm:p-6 text-white lg:col-span-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold">
              <MessageCircle size={14} /> <Text value={{ bn: "লাইভ ডাক্তার টক", en: "Live Doctor Talk" }} />
            </span>
            <h3 className="mt-3 text-xl font-black !text-white"><Text value={{ bn: "এখনই কথা বলুন", en: "Talk now" }} /></h3>
            <p className="mt-1 text-sm sm:text-base text-slate-100/85 leading-relaxed max-w-2xl">
              <Text value={{ bn: "কোন ডাক্তারের সাথে কথা বলবেন নিশ্চিত না? আমাদের কো-অর্ডিনেটর আপনার লক্ষণ শুনে সঠিক বিশেষজ্ঞের সাথে সংযোগ করবেন।", en: "Not sure which doctor to speak to? Our coordinator will listen to your symptoms and connect you with the right specialist." }} />
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold w-full !min-h-[40px] !text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={14} /> <Text value={{ bn: "WhatsApp-এ লাইভ চ্যাট", en: "Live chat on WhatsApp" }} />
              </a>
              <a
                href={SITE.tel}
                className="btn w-full !min-h-[40px] !text-xs border border-white/25 bg-white/10 text-white flex items-center justify-center gap-1.5 hover:bg-white/20"
              >
                <Phone size={14} /> {SITE.phone}
              </a>
            </div>
            <p className="mt-3 text-[10px] text-slate-100/70"><Text value={{ bn: "BMDC-রেজিস্টার্ড ডাক্তার ও কো-অর্ডিনেটর নেটওয়ার্ক।", en: "Network of BMDC-registered doctors and coordinators." }} /></p>
          </aside>
        </div>
      </section>

      <Catalog kind="doctors" q0={searchParams.q || ""} sp0={searchParams.sp || ""} />

      <div className="wrap max-w-4xl pb-10 sm:pb-14 lg:pb-16">
        <section className="card p-5 sm:p-6 border border-slate-200 space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand flex items-center gap-2 mb-3">
            <HelpCircle size={22} className="text-brand" /> <Text k="doctors_faq_title" />
          </h2>
          <div className="space-y-3">
            {DOCTOR_FAQS.map((faq, i) => (
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
