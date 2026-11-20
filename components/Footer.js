import Link from "next/link";
import { Phone } from "lucide-react";
import Logo from "./Logo";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-dark text-blue-soft">
      <div className="wrap grid gap-8 py-10 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-3 font-head text-lg text-white">{SITE.tagline}</p>
          <a href={SITE.tel} className="mt-4 inline-flex items-center gap-2 text-xl font-bold text-white"><Phone size={20} />{SITE.phone}</a>
        </div>
        <ul className="grid grid-cols-2 gap-x-4">
          {NAV.map((n) => (<li key={n.href}><Link href={n.href} className="block py-2 hover:text-white">{n.label}</Link></li>))}
        </ul>
        <p className="text-sm leading-relaxed">
          D H Medical Support একটি চিকিৎসা সহায়তা ও সমন্বয় সেবা। আমরা নিজে চিকিৎসা প্রদান করি না; ডাক্তার, হাসপাতাল, অ্যাম্বুলেন্স ও বীমা বিষয়ে সমন্বয় ও তথ্য-সহায়তা দিই। জরুরি অবস্থায় সরাসরি কল করুন।
        </p>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} D H Medical Support · Together for a Secure Family, Anywhere in the World</div>
    </footer>
  );
}
