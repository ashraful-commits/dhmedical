export const SITE = {
  name: "D H Medical Support",
  phone: "01625-268462",
  tel: "tel:+8801625268462",
  whatsapp: "https://wa.me/8801625268462",
  tagline: "প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা",
  sub: "Central Medical Support & Coordination Platform",
};

export const NAV = [
  { href: "/", label: "হোম" },
  { href: "/ambulance", label: "অ্যাম্বুলেন্স" },
  { href: "/track", label: "বুকিং ট্র্যাক" },
  { href: "/doctors", label: "ডাক্তার" },
  { href: "/hospitals", label: "হাসপাতাল" },
  { href: "/family-care", label: "ফ্যামিলি কেয়ার" },
  { href: "/appointment", label: "অ্যাপয়েন্টমেন্ট" },
  { href: "/partner", label: "পার্টনার হোন" },
  { href: "/feedback", label: "মতামত" },
];

export const SPECIALTIES = [
  { key: "Neuro Medicine", bn: "নিউরো মেডিসিন" },
  { key: "Cardiology", bn: "হৃদরোগ" },
  { key: "Surgery", bn: "সার্জারি" },
  { key: "Medicine", bn: "মেডিসিন" },
  { key: "Gynecology", bn: "স্ত্রীরোগ ও প্রসূতি" },
  { key: "Orthopedics", bn: "অর্থোপেডিক" },
  { key: "Pediatrics", bn: "শিশুরোগ" },
  { key: "Eye", bn: "চক্ষু" },
];

export const DISTRICTS = [
  "ঢাকা",
  "চট্টগ্রাম",
  "সিলেট",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "রংপুর",
  "ময়মনসিংহ",
  "কুমিল্লা",
  "ব্রাহ্মণবাড়িয়া",
  "বগুড়া",
  "নারায়ণগঞ্জ",
  "গাজীপুর",
];

export const AMBULANCE_TYPES_DATA = [
  {
    key: "General",
    title: "সাধারণ (General)",
    desc: "সাধারণ ও স্থিতিশীল রোগী পরিবহনের জন্য সাশ্রয়ী এসি অ্যাম্বুলেন্স।",
    badge: "সাশ্রয়ী",
    baseFare: 1500,
    eta: "১৫-২৫ মিনিট",
  },
  {
    key: "Oxygen",
    title: "অক্সিজেন (Oxygen)",
    desc: "সেন্ট্রাল অক্সিজেন সিলিন্ডার, ফ্লোমিটার ও পালস অক্সিমিটার সুবিধা।",
    badge: "জনপ্রিয়",
    baseFare: 2500,
    eta: "১৫-২০ মিনিট",
  },
  {
    key: "ICU",
    title: "ICU লাইফ সাপোর্ট",
    desc: "ভেন্টিলেটর, ডিফিব্রিলেটর, সাকশন ও দক্ষ প্যারামেডিক স্টাফ সহ।",
    badge: "জরুরি",
    baseFare: 8000,
    eta: "২০-৩০ মিনিট",
  },
  {
    key: "NICU",
    title: "নবজাতক (NICU)",
    desc: "বিশেষায়িত ইনকিউবেটর ও বেবি কেয়ার ট্রলি সহ নবজাতক পরিবহন।",
    badge: "বিশেষায়িত",
    baseFare: 9500,
    eta: "২০-৩০ মিনিট",
  },
  {
    key: "Cardiac",
    title: "কার্ডিয়াক (Cardiac)",
    desc: "হার্ট অ্যাটাক ও তীব্র হৃদরোগীর জন্য কার্ডিয়াক মনিটর ও ইমার্জেন্সি কিট।",
    badge: "গুরুত্বপূর্ণ",
    baseFare: 8500,
    eta: "১৫-২৫ মিনিট",
  },
  {
    key: "Long Distance",
    title: "দূরপাল্লার অ্যাম্বুলেন্স",
    desc: "এক জেলা থেকে অন্য জেলা বা দূরপাল্লার জরুরি রোগী পরিবহন।",
    badge: "দূরপাল্লা",
    baseFare: 4000,
    eta: "৩০-৪৫ মিনিট",
  },
];

export const spBn = (k) => SPECIALTIES.find((s) => s.key === k)?.bn || k;
