import Link from "next/link";
import { Phone, MapPin, Ambulance, Stethoscope, ShieldCheck, HeartPulse, ExternalLink } from "lucide-react";
import Logo from "./Logo";
import { SITE, SPECIALTIES, DISTRICTS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#F8FAFC] text-ink-light">
      {/* Upper Main Footer Grid */}
      <div className="wrap grid gap-10 py-12 md:grid-cols-12">
        {/* Brand & Hotline Column */}
        <div className="space-y-4 md:col-span-4">
          <Logo />
          <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-sm">
            {SITE.tagline}. ২৪ ঘণ্টা জরুরি অ্যাম্বুলেন্স ডিসপ্যাচ, বিশেষজ্ঞ ডাক্তার সিরিয়াল ও হোম ডায়াগনস্টিক সাপোর্ট।
          </p>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-clean space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              ২৪ ঘণ্টা সেন্ট্রাল জরুরি হটলাইন
            </span>
            <a
              href={SITE.tel}
              className="inline-flex items-center gap-2 text-xl font-black text-brand hover:text-brand-dark transition-colors"
            >
              <Phone size={20} className="text-brand shrink-0" />
              <span>{SITE.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck size={16} className="text-brand" />
            <span>BMDC অনুমোদিত ডাক্তার ও অনুমোদিত এম্বুলেন্স বহর</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3 md:col-span-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink-dark">
            প্রধান সেবা
          </h4>
          <ul className="space-y-2 text-xs font-medium text-slate-600">
            <li>
              <Link href="/appointment" className="hover:text-brand transition-colors block py-0.5">
                ডাক্তার কনসালটেশন
              </Link>
            </li>
            <li>
              <Link href="/ambulance" className="hover:text-brand transition-colors block py-0.5">
                জরুরি অ্যাম্বুলেন্স ২৪/৭
              </Link>
            </li>
            <li>
              <Link href="/appointment#diagnostic" className="hover:text-brand transition-colors block py-0.5">
                হোম ডায়াগনস্টিক টেস্ট
              </Link>
            </li>
            <li>
              <Link href="/family-care" className="hover:text-brand transition-colors block py-0.5">
                ফ্যামিলি হেলথ প্ল্যান
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-brand font-bold text-brand transition-colors block py-0.5">
                লাইভ বুকিং ট্র্যাকিং
              </Link>
            </li>
            <li>
              <Link href="/hospitals" className="hover:text-brand transition-colors block py-0.5">
                হাসপাতাল ও ICU বেড
              </Link>
            </li>
          </ul>
        </div>

        {/* Clinical Specialties Column */}
        <div className="space-y-3 md:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink-dark">
            বিশেষজ্ঞ ডাক্তার বিভাগ
          </h4>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-medium text-slate-600">
            {SPECIALTIES.map((s) => (
              <Link
                key={s.key}
                href={`/doctors?sp=${encodeURIComponent(s.key)}`}
                className="hover:text-brand transition-colors truncate py-0.5"
              >
                {s.bn}
              </Link>
            ))}
          </div>
        </div>

        {/* For Partners & App Column */}
        <div className="space-y-3 md:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-ink-dark">
            পার্টনার ও হেল্পডেস্ক
          </h4>
          <ul className="space-y-2 text-xs font-medium text-slate-600">
            <li>
              <Link href="/partner" className="hover:text-brand transition-colors block py-0.5">
                ডাক্তার হিসেবে যুক্ত হোন (Join as Doctor)
              </Link>
            </li>
            <li>
              <Link href="/partner#ambulance" className="hover:text-brand transition-colors block py-0.5">
                অ্যাম্বুলেন্স পার্টনার রেজিস্ট্রেশন
              </Link>
            </li>
            <li>
              <Link href="/feedback" className="hover:text-brand transition-colors block py-0.5">
                মতামত ও অভিযোগ (Feedback)
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-slate-400 hover:text-brand transition-colors block py-0.5">
                অ্যাডমিন লগইন পোর্টাল
              </Link>
            </li>
          </ul>

          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
              সারাদেশে ৬৪ জেলায় কভারেজ
            </span>
            <div className="flex flex-wrap gap-1 text-[10.5px]">
              {DISTRICTS.slice(0, 8).map((d) => (
                <span key={d} className="rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-slate-600">
                  {d}
                </span>
              ))}
              <span className="rounded-md bg-brand-50 text-brand px-1.5 py-0.5 font-bold">
                +৫৬ জেলা
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-slate-200/80 bg-white py-4">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} D H Medical Support. Central Healthcare & Ambulance Coordination Platform Bangladesh.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/ambulance" className="hover:text-brand transition-colors">অ্যাম্বুলেন্স</Link>
            <Link href="/appointment" className="hover:text-brand transition-colors">ডাক্তার</Link>
            <Link href="/family-care" className="hover:text-brand transition-colors">ফ্যামিলি কেয়ার</Link>
            <Link href="/track" className="hover:text-brand transition-colors text-brand font-bold">ট্র্যাক করুন</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
