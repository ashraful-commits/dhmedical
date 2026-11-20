export const SITE = {
  name: "D H Medical Support",
  phone: "01625-268462",
  tel: "tel:+8801625268462",
  tagline: "প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা",
  sub: "Family Medical Support & Coordination",
};

export const NAV = [
  { href: "/", label: "হোম" },
  { href: "/doctors", label: "ডাক্তার" },
  { href: "/ambulance", label: "অ্যাম্বুলেন্স" },
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
export const spBn = (k) => SPECIALTIES.find((s) => s.key === k)?.bn || k;
