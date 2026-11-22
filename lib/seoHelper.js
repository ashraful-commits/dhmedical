/**
 * Comprehensive SEO & Medical Search Engine Helper for D H Medical Support
 * Optimized for full Bangladesh reach (Google, Bing, Social Media, Voice Search).
 */

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dh-medical.vercel.app";

export const MASTER_SEO_KEYWORDS = [
  // Primary English keywords
  "ambulance service bangladesh",
  "ambulance service dhaka",
  "icu ambulance bd",
  "oxygen ambulance rent",
  "ambulance number bangladesh",
  "emergency ambulance 24/7",
  "ac ambulance rent dhaka",
  "long distance ambulance bd",
  "doctor appointment bangladesh",
  "specialist doctor serial bd",
  "online doctor serial dhaka",
  "medicine specialist doctor bd",
  "cardiologist doctor dhaka",
  "neuro medicine specialist bangladesh",
  "gynecologist serial dhaka",
  "orthopedic doctor serial bd",
  "pediatrician doctor bangladesh",
  "hospital bed availability dhaka",
  "hospital list bangladesh",
  "emergency hospital near me",
  "evercare hospital bed",
  "square hospital dhaka doctor list",
  "united hospital dhaka serial",
  "dhaka medical college hospital serial",
  "home diagnostic test bd",
  "blood test sample collection home",
  "probashi family healthcare bangladesh",
  "probashi medical care",
  "dh medical support",
  "dh medical",
  "praava health alternative bd",
  "doctime doctor alternative bangladesh",

  // Primary Bengali keywords (বাংলা কিওয়ার্ড)
  "জরুরি এম্বুলেন্স সার্ভিস ঢাকা",
  "এম্বুলেন্স ভাড়া বাংলাদেশ",
  "আইসিইউ এম্বুলেন্স ঢাকা",
  "অক্সিজেন এম্বুলেন্স সার্ভিস",
  "নবজাতক এম্বুলেন্স",
  "২৪ ঘণ্টা এম্বুলেন্স হটলাইন",
  "ডাক্তার সিরিয়াল ঢাকা",
  "বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট",
  "মেডিসিন ডাক্তার ঢাকা",
  "হৃদরোগ বিশেষজ্ঞ ডাক্তার",
  "নিউরো মেডিসিন বিশেষজ্ঞ",
  "শিশুরোগ বিশেষজ্ঞ সিরিয়াল",
  "গাইনি ডাক্তার সিরিয়াল",
  "অর্থোপেডিক বিশেষজ্ঞ পঙ্গু হাসপাতাল",
  "হাসপাতাল বেড বুকিং",
  "আইসিইউ বেড খালি আছে ঢাকা",
  "বাংলাদেশের সেরা হাসপাতাল",
  "প্রবাসী পরিবার চিকিৎসা সহায়তা",
  "প্রবাসী ভাইদের জন্য ফ্যামিলি কেয়ার",

  // Phonetic / Banglish / Common Misspellings (যেমন: medicin, ambolence, dockter, dakdar)
  "ambolence",
  "ambulence",
  "ambolens",
  "embulens",
  "ambulens",
  "dockter",
  "dakdar",
  "daktar",
  "medicin",
  "madisin",
  "hospatal",
  "aspatal",
  "apointment",
  "sereal",
  "sirial",
  "emargency",
  "imergency",
  "oxigen",
  "oxyzen",
  "cardio",
  "neuro",
];

/**
 * Phonetic & Smart Medical Synonym Dictionary
 * Expands searches like 'medicin', 'ambolence', 'dockter' into high-relevance matches.
 */
export const SYNONYM_MAP = {
  // Medicine variations
  medicin: ["Medicine", "মেডিসিন", "ঔষধ", "ডাক্তার", "প্রেসক্রিপশন"],
  medicine: ["Medicine", "মেডিসিন", "ঔষধ", "ডাক্তার"],
  madisin: ["Medicine", "মেডিসিন", "ঔষধ"],
  ঔষধ: ["Medicine", "মেডিসিন", "ফার্মেসি"],
  মেডিসিন: ["Medicine", "ঔষধ", "অভ্যন্তরীণ রোগ"],

  // Ambulance variations
  ambolence: ["ambulance", "অ্যাম্বুলেন্স", "এম্বুলেন্স", "জরুরি গাড়ি", "ICU", "Oxygen"],
  ambulence: ["ambulance", "অ্যাম্বুলেন্স", "এম্বুলেন্স", "ICU"],
  ambolens: ["ambulance", "অ্যাম্বুলেন্স", "এম্বুলেন্স"],
  ambulance: ["ambulance", "অ্যাম্বুলেন্স", "এম্বুলেন্স", "ICU", "Oxygen"],
  এম্বুলেন্স: ["ambulance", "অ্যাম্বুলেন্স", "ICU", "Oxygen"],
  অ্যাম্বুলেন্স: ["ambulance", "এম্বুলেন্স", "ICU", "Oxygen"],
  গাড়ি: ["ambulance", "অ্যাম্বুলেন্স"],

  // Doctor variations
  dockter: ["doctor", "ডাক্তার", "কনসালট্যান্ট", "সিরিয়াল", "বিশেষজ্ঞ"],
  dakdar: ["doctor", "ডাক্তার", "কনসালট্যান্ট", "সিরিয়াল"],
  daktar: ["doctor", "ডাক্তার", "কনসালট্যান্ট", "সিরিয়াল"],
  doctor: ["doctor", "ডাক্তার", "কনসালট্যান্ট", "সিরিয়াল", "বিশেষজ্ঞ"],
  ডাক্তার: ["doctor", "কনসালট্যান্ট", "সিরিয়াল", "বিশেষজ্ঞ"],

  // Hospital variations
  hospatal: ["hospital", "হাসপাতাল", "বেড", "ICU", "কেবিন"],
  aspatal: ["hospital", "হাসপাতাল", "বেড", "কেবিন"],
  hospital: ["hospital", "হাসপাতাল", "বেড", "ICU", "কেবিন"],
  হাসপাতাল: ["hospital", "বেড", "ICU", "কেবিন"],
  bed: ["hospital", "হাসপাতাল", "বেড", "ICU", "কেবিন"],
  বেড: ["hospital", "হাসপাতাল", "বেড", "ICU", "কেবিন"],

  // ICU / Critical care
  icu: ["ICU", "আইসিইউ", "লাইফ সাপোর্ট", "ভেন্টিলেটর", "ক্রিটিক্যাল কেয়ার"],
  আইসিইউ: ["ICU", "লাইফ সাপোর্ট", "ভেন্টিলেটর"],

  // Oxygen
  oxygen: ["Oxygen", "অক্সিজেন", "সিলিন্ডার", "শ্বাসকষ্ট"],
  অক্সিজেন: ["Oxygen", "সিলিন্ডার", "শ্বাসকষ্ট"],
  oxigen: ["Oxygen", "অক্সিজেন"],
  oxyzen: ["Oxygen", "অক্সিজেন"],

  // Heart / Cardiology
  heart: ["Cardiology", "হৃদরোগ", "কার্ডিওলজি", "হার্ট"],
  কার্ডিও: ["Cardiology", "হৃদরোগ"],
  হার্ট: ["Cardiology", "হৃদরোগ"],

  // Brain / Neuro
  brain: ["Neuro Medicine", "নিউরো মেডিসিন", "মস্তিষ্ক", "স্ট্রোক"],
  নিউরো: ["Neuro Medicine", "নিউরো মেডিসিন", "স্ট্রোক"],

  // Baby / Child
  baby: ["Pediatrics", "শিশুরোগ", "নবজাতক", "NICU"],
  shishu: ["Pediatrics", "শিশুরোগ", "নবজাতক", "NICU"],
  শিশু: ["Pediatrics", "শিশুরোগ", "নবজাতক", "NICU"],
};

/**
 * Expand search query to include phonetic variants and synonyms
 */
export function expandSearchQuery(query) {
  if (!query) return [];
  const clean = String(query).trim().toLowerCase();
  const tokens = clean.split(/\s+/).filter(Boolean);
  const terms = new Set([clean, ...tokens]);

  for (const token of tokens) {
    if (SYNONYM_MAP[token]) {
      for (const syn of SYNONYM_MAP[token]) {
        terms.add(syn);
      }
    }
  }

  // Also check if any key in SYNONYM_MAP is contained in clean
  for (const [key, synonyms] of Object.entries(SYNONYM_MAP)) {
    if (clean.includes(key) || key.includes(clean)) {
      for (const syn of synonyms) {
        terms.add(syn);
      }
    }
  }

  return Array.from(terms);
}

/**
 * Global Schema.org JSON-LD Structured Data
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "EmergencyService", "MedicalOrganization"],
        "@id": `${BASE_URL}/#organization`,
        name: "D H Medical Support (ডি এইচ মেডিকেল সাপোর্ট)",
        alternateName: ["DH Medical", "DH Medical Support Bangladesh", "ডি এইচ মেডিকেল"],
        url: BASE_URL,
        logo: `${BASE_URL}/dh-logo.svg`,
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80",
        description: "বাংলাদেশের কেন্দ্রীয় মেডিকেল সহায়তা ও জরুরি অ্যাম্বুলেন্স সমন্বয় প্ল্যাটফর্ম। ২৪ ঘণ্টা অ্যাম্বুলেন্স, বিশেষজ্ঞ ডাক্তার সিরিয়াল, হাসপাতাল ভর্তি ও প্রবাসী পরিবার কেয়ার।",
        telephone: "+8801625268462",
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+8801625268462",
            contactType: "emergency",
            areaServed: "BD",
            availableLanguage: ["bn", "en"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "D H Medical Support Center, Dhaka",
          addressLocality: "Dhaka",
          addressRegion: "Dhaka Division",
          postalCode: "1207",
          addressCountry: "BD",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 23.8103,
          longitude: 90.4125,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        priceRange: "৳৳",
        areaServed: [
          {
            "@type": "Country",
            name: "Bangladesh",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Medical Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "জরুরি অ্যাম্বুলেন্স সার্ভিস (Emergency Ambulance Service)",
                description: "সাধারণ, অক্সিজেন, ICU, NICU ও দূরপাল্লার অ্যাম্বুলেন্স বুকিং।",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "বিশেষজ্ঞ ডাক্তার সিরিয়াল (Doctor Appointment Booking)",
                description: "মেডিসিন, হৃদরোগ, নিউরো, সার্জারি, শিশু ও গাইনি ডাক্তার সিরিয়াল।",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "হাসপাতাল ভর্তি ও আইসিইউ সমন্বয় (Hospital Coordination)",
                description: "স্কয়ার, এভারকেয়ার, ল্যাবএইড ও জাতীয় হাসপাতালের বেড সমন্বয়।",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "প্রবাসী ফ্যামিলি কেয়ার (DH Family Care)",
                description: "প্রবাসীদের পরিবারে সার্বক্ষণিক চিকিৎসা সহায়তা ও হেলথ ফলোআপ।",
              },
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1280",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "D H Medical Support",
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
        inLanguage: "bn-BD",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/doctors?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

/**
 * FAQ Schema Generator for Rich Snippets on SERP
 */
export function getFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
