import { DISTRICTS as ALL_DISTRICTS } from "./districts";

export { DISTRICT_GROUPS, findDistricts, findLocations } from "./districts";

export const SITE = {
  name: "D H Medical Support",
  phone: "01625-268462",
  tel: "tel:+8801625268462",
  whatsapp: "https://wa.me/8801625268462",
  tagline: "প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা",
  taglineEn: "Care Beyond Borders — With Your Family in Bangladesh",
  sub: "Central Medical Support & Coordination Platform",
};

export const FALLBACK_IMAGES = {
  doctor:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
  hospital:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
  ambulance:
    "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&auto=format&fit=crop&q=80",
  document:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80",
};

export function imageFallback(kind = "hospital") {
  return (event) => {
    const img = event.currentTarget;
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "1";
    img.src = FALLBACK_IMAGES[kind] || FALLBACK_IMAGES.hospital;
  };
}

export const NAV = [
  { href: "/", label: "হোম" },
  { href: "/ambulance", label: "অ্যাম্বুলেন্স" },
  { href: "/track", label: "বুকিং ট্র্যাক" },
  { href: "/doctors", label: "ডাক্তার" },
  { href: "/hospitals", label: "হাসপাতাল" },
  { href: "/family-care", label: "ফ্যামিলি কেয়ার" },
  { href: "/districts", label: "জেলা ও এলাকা" },
  { href: "/prescription", label: "প্রেসক্রিপশন OCR" },
  { href: "/appointment", label: "অ্যাপয়েন্টমেন্ট" },
  { href: "/partner", label: "পার্টনার হোন" },
  { href: "/feedback", label: "মতামত" },
];

export const SPECIALTIES = [
  { key: "Neuro Medicine", bn: "নিউরো মেডিসিন", name: "Neuro Medicine" },
  { key: "Cardiology", bn: "হৃদরোগ", name: "Cardiology" },
  { key: "Surgery", bn: "সার্জারি", name: "Surgery" },
  { key: "Medicine", bn: "মেডিসিন", name: "Medicine" },
  { key: "Gynecology", bn: "স্ত্রীরোগ ও প্রসূতি", name: "Gynecology" },
  { key: "Orthopedics", bn: "অর্থোপেডিক", name: "Orthopedics" },
  { key: "Pediatrics", bn: "শিশুরোগ", name: "Pediatrics" },
  { key: "Eye", bn: "চক্ষু", name: "Eye Care" },
];

export const DISTRICTS = ALL_DISTRICTS;

export const AMBULANCE_TYPES_DATA = [
  {
    key: "General",
    title: "সাধারণ (General)",
    titleEn: "General AC Ambulance",
    desc: "সাধারণ ও স্থিতিশীল রোগী পরিবহনের জন্য সাশ্রয়ী এসি অ্যাম্বুলেন্স।",
    descEn: "Affordable AC ambulance for general and stable patient transfer.",
    badge: "সাশ্রয়ী",
    badgeEn: "Affordable",
    baseFare: 1500,
    eta: "১৫-২৫ মিনিট",
    etaEn: "15-25 minutes",
  },
  {
    key: "Oxygen",
    title: "অক্সিজেন (Oxygen)",
    titleEn: "Oxygen Ambulance",
    desc: "সেন্ট্রাল অক্সিজেন সিলিন্ডার, ফ্লোমিটার ও পালস অক্সিমিটার সুবিধা।",
    descEn: "Central oxygen cylinder, flowmeter and pulse oximeter facilities.",
    badge: "জনপ্রিয়",
    badgeEn: "Popular",
    baseFare: 2500,
    eta: "১৫-২০ মিনিট",
    etaEn: "15-20 minutes",
  },
  {
    key: "ICU",
    title: "ICU লাইফ সাপোর্ট",
    titleEn: "ICU Life Support",
    desc: "ভেন্টিলেটর, ডিফিব্রিলেটর, সাকশন ও দক্ষ প্যারামেডিক স্টাফ সহ।",
    descEn: "With ventilator, defibrillator, suction and trained paramedic staff.",
    badge: "জরুরি",
    badgeEn: "Emergency",
    baseFare: 8000,
    eta: "২০-৩০ মিনিট",
    etaEn: "20-30 minutes",
  },
  {
    key: "NICU",
    title: "নবজাতক (NICU)",
    titleEn: "Neonatal (NICU)",
    desc: "বিশেষায়িত ইনকিউবেটর ও বেবি কেয়ার ট্রলি সহ নবজাতক পরিবহন।",
    descEn: "Newborn transfer with specialized incubator and baby care trolley.",
    badge: "বিশেষায়িত",
    badgeEn: "Specialized",
    baseFare: 9500,
    eta: "২০-৩০ মিনিট",
    etaEn: "20-30 minutes",
  },
  {
    key: "Cardiac",
    title: "কার্ডিয়াক (Cardiac)",
    titleEn: "Cardiac Ambulance",
    desc: "হার্ট অ্যাটাক ও তীব্র হৃদরোগীর জন্য কার্ডিয়াক মনিটর ও ইমার্জেন্সি কিট।",
    descEn: "Cardiac monitor and emergency kit for heart attack and acute cardiac patients.",
    badge: "গুরুত্বপূর্ণ",
    badgeEn: "Critical",
    baseFare: 8500,
    eta: "১৫-২৫ মিনিট",
    etaEn: "15-25 minutes",
  },
  {
    key: "Long Distance",
    title: "দূরপাল্লার অ্যাম্বুলেন্স",
    titleEn: "Long Distance Ambulance",
    desc: "এক জেলা থেকে অন্য জেলা বা দূরপাল্লার জরুরি রোগী পরিবহন।",
    descEn: "Emergency patient transfer between districts or across long distances.",
    badge: "দূরপাল্লা",
    badgeEn: "Long Distance",
    baseFare: 4000,
    eta: "৩০-৪৫ মিনিট",
    etaEn: "30-45 minutes",
  },
];

export const spBn = (k) => SPECIALTIES.find((s) => s.key === k)?.bn || k;
