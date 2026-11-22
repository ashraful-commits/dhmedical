import Link from "next/link";
import { Phone, MapPin, Ambulance, Stethoscope, HeartPulse, ShieldCheck } from "lucide-react";
import Logo from "./Logo";
import { NAV, SITE, SPECIALTIES, DISTRICTS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-dark text-blue-soft border-t-2 border-gold/40">
      <div className="wrap grid gap-8 py-10 md:grid-cols-4">
        {/* Brand & Hotline */}
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-3 font-head text-base text-white">{SITE.tagline}</p>
          <div className="mt-4 rounded-xl bg-white/10 p-3 border border-white/15">
            <span className="text-[11px] text-gold font-bold block uppercase tracking-wider">২৪ ঘণ্টা জরুরি হটলাইন</span>
            <a href={SITE.tel} className="mt-1 inline-flex items-center gap-2 text-xl font-black text-white hover:text-gold transition-colors">
              <Phone size={20} className="text-red animate-pulse" />
              {SITE.phone}
            </a>
          </div>
          <p className="mt-3 text-xs text-white/70">
            প্রবাসে থাকা পরিবারের নির্ভরযোগ্য মেডিকেল কো-অর্ডিনেশন পার্টনার।
          </p>
        </div>

        {/* Quick Menu */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 border-b border-white/15 pb-1">প্রধান পেজসমূহ</h4>
          <ul className="space-y-1.5 text-xs">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white hover:underline transition-colors block py-0.5">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Specialist Doctor Search Links for SEO */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 border-b border-white/15 pb-1">ডাক্তার বিশেষজ্ঞ বিভাগ</h4>
          <ul className="grid grid-cols-1 gap-1 text-xs">
            {SPECIALTIES.map((s) => (
              <li key={s.key}>
                <Link
                  href={`/doctors?sp=${encodeURIComponent(s.key)}`}
                  className="hover:text-white hover:underline transition-colors block py-0.5 text-white/80"
                >
                  {s.bn} বিশেষজ্ঞ
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 64 Districts Ambulance & Medical Coverage for SEO */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 border-b border-white/15 pb-1 flex items-center gap-1.5">
            <MapPin size={14} className="text-red" /> জেলা কভারেজ নেটওয়ার্ক
          </h4>
          <p className="text-[11px] text-white/70 mb-2">
            ঢাকা, চট্টগ্রাম, সিলেট, কুমিল্লা সহ বাংলাদেশের সকল জেলায় জরুরি অ্যাম্বুলেন্স ও রোগী স্থানান্তর সেবা চালু আছে।
          </p>
          <div className="flex flex-wrap gap-1 text-[11px]">
            {DISTRICTS.map((d) => (
              <Link
                key={d}
                href={`/hospitals?district=${encodeURIComponent(d)}`}
                className="rounded bg-white/10 hover:bg-white/20 px-1.5 py-0.5 text-white/90 transition-colors"
              >
                {d}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bangladesh Nationwide Disclaimer & Legal */}
      <div className="border-t border-white/10 bg-navy-dark/80 py-4">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} D H Medical Support · Bangladesh Central Healthcare Coordination Platform.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/ambulance" className="hover:text-white">জরুরি এম্বুলেন্স</Link>
            <Link href="/doctors" className="hover:text-white">ডাক্তার সিরিয়াল</Link>
            <Link href="/hospitals" className="hover:text-white">হাসপাতাল বেড</Link>
            <Link href="/admin" className="text-white/40 hover:text-white underline">
              অ্যাডমিন পোর্টাল
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
