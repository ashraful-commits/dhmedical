"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-blue/15 bg-white/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" aria-label="D H Medical Support হোম" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="প্রধান মেনু">
          {NAV.slice(1).map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-3 py-2 text-[15px] font-semibold text-navy hover:bg-blue-soft">{n.label}</Link>
          ))}
          <a href={SITE.tel} className="btn btn-red ml-2 !min-h-[42px] !px-4 !py-2"><Phone size={16} />{SITE.phone}</a>
        </nav>
        <button className="grid h-12 w-12 place-items-center rounded-full text-navy lg:hidden" aria-label="মেনু" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-blue/15 bg-white px-4 pb-4 lg:hidden" aria-label="মোবাইল মেনু">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-blue/10 py-3.5 text-lg font-semibold text-navy">{n.label}</Link>
          ))}
          <a href={SITE.tel} className="btn btn-red mt-4 w-full"><Phone size={18} />কল করুন {SITE.phone}</a>
        </nav>
      )}
    </header>
  );
}
