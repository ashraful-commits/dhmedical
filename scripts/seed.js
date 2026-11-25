import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";
import fs from "fs";
import path from "path";

function loadEnv() {
  const envPath = fs.existsSync(".env.local") ? ".env.local" : ".env.example";
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Ashraful:Ashraful@mern.sho5qfe.mongodb.net/dh";

const doctorData = [
  {
    name: "অধ্যাপক ডা. কাজী দ্বীন মোহাম্মদ",
    specialty: "Neuro Medicine",
    degree: "MBBS, FCPS (Medicine), MD (Neurology), Fellow (USA)",
    hospital: "ন্যাশনাল ইনস্টিটিউট অব নিউরোসায়েন্সেস ও হাসপাতাল, ঢাকা",
    fee: "৳১,৫০০",
    schedule: "শনিবার - বুধবার (বিকাল ৫:০০ - রাত ৯:০০)",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ডা. মো. বদরুল আলম",
    specialty: "Neuro Medicine",
    degree: "MBBS, MD (Neurology), FACP (USA)",
    hospital: "স্কয়ার হাসপাতাল লিমিটেড, ঢাকা",
    fee: "৳১,২০০",
    schedule: "রবিবার - বৃহস্পতিবার (বিকাল ৪:০০ - রাত ৮:০০)",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "অধ্যাপক ডা. এম এ বাকি",
    specialty: "Cardiology",
    degree: "MBBS, FCPS, MD (Cardiology), FACC (USA)",
    hospital: "জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল, ঢাকা",
    fee: "৳১,৫০০",
    schedule: "শনিবার - বৃহস্পতিবার (বিকাল ৫:০০ - রাত ৮:০০)",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ডা. শামসুন নাহার",
    specialty: "Cardiology",
    degree: "MBBS, D-Card (DU), FCPS (Cardiology)",
    hospital: "ইউনাইটেড হাসপাতাল লিমিটেড, ঢাকা",
    fee: "৳১,২০০",
    schedule: "সোম, মঙ্গল ও বৃহস্পতিবার (বিকাল ৫:৩০ - রাত ৮:৩০)",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "অধ্যাপক ডা. এবিএম আব্দুল্লাহ",
    specialty: "Medicine",
    degree: "MBBS, MRCP (UK), FRCP (Edin), একুশে পদকপ্রাপ্ত",
    hospital: "সেন্ট্রাল হাসপাতাল / বঙ্গবন্ধু শেখ মুজিব মেডিক্যাল বিশ্ববিদ্যালয়",
    fee: "৳২,০০০",
    schedule: "শনিবার - বুধবার (বিকাল ৪:০০ - রাত ৮:০০)",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ডা. আহমেদ জামান",
    specialty: "Medicine",
    degree: "MBBS, FCPS (Internal Medicine), MACP (USA)",
    hospital: "ল্যাবএইড স্পেশালাইজড হাসপাতাল, ধানমন্ডি",
    fee: "৳১,২০০",
    schedule: "প্রতিদিন (বিকাল ৫:০০ - রাত ৯:০০)",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "অধ্যাপক ডা. রওশন আরা বেগম",
    specialty: "Gynecology",
    degree: "MBBS, FCPS (Gynae & Obs), MS (Obs & Gynae)",
    hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল / পপুলার ডায়াগনস্টিক",
    fee: "৳১,৫০০",
    schedule: "শনিবার, সোমবার ও বুধবার (বিকাল ৫:০০ - রাত ৮:০০)",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ডা. সুলতানা রাজিয়া",
    specialty: "Gynecology",
    degree: "MBBS, DGO, FCPS (Obs & Gynae)",
    hospital: "ইবনে সিনা স্পেশালাইজড হাসপাতাল, ধানমন্ডি",
    fee: "৳১,০০০",
    schedule: "রবিবার - বৃহস্পতিবার (সন্ধ্যা ৬:০০ - রাত ৯:০০)",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "অধ্যাপক ডা. আর আর কৈরী",
    specialty: "Orthopedics",
    degree: "MBBS, MS (Ortho), FICS, ফেলো (সিঙ্গাপুর ও থাইল্যান্ড)",
    hospital: "জাতীয় অর্থোপেডিক হাসপাতাল ও পুনর্বাসন প্রতিষ্ঠান (পঙ্গু হাসপাতাল)",
    fee: "৳১,৫০০",
    schedule: "শনিবার, রবিবার ও বুধবার (বিকাল ৫:০০ - রাত ৮:০০)",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ডা. মো. তরিকুল ইসলাম",
    specialty: "Orthopedics",
    degree: "MBBS, D-Ortho, FCPS (Orthopedic Surgery)",
    hospital: "এভারকেয়ার হাসপাতাল, ঢাকা",
    fee: "৳১,২০০",
    schedule: "শনিবার - বৃহস্পতিবার (বিকাল ৪:৩০ - রাত ৮:৩০)",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "অধ্যাপক ডা. মনজুর হোসেন",
    specialty: "Pediatrics",
    degree: "MBBS, DCH, FCPS (Pediatrics), MD (Child Health)",
    hospital: "বাংলাদেশ শিশু স্বাস্থ্য ইনস্টিটিউট ও ঢাকা শিশু হাসপাতাল",
    fee: "৳১,২০০",
    schedule: "প্রতিদিন (বিকাল ৫:০০ - রাত ৮:০০)",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ডা. নাজনীন পারভীন",
    specialty: "Pediatrics",
    degree: "MBBS, FCPS (Pediatrics), Fellow Neonatology",
    hospital: "স্কয়ার হাসপাতাল লিমিটেড, ঢাকা",
    fee: "৳১,০০০",
    schedule: "শনিবার - বুধবার (সকাল ১০:০০ - দুপুর ১:০০)",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "অধ্যাপক ডা. সারওয়ার আলম",
    specialty: "Surgery",
    degree: "MBBS, FCPS (Surgery), FRCS (Glasgow)",
    hospital: "বারডেম জেনারেল হাসপাতাল, ঢাকা",
    fee: "৳১,৫০০",
    schedule: "শনিবার - বুধবার (বিকাল ৫:০০ - রাত ৮:০০)",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "অধ্যাপক ডা. মোদাচ্ছের আলী",
    specialty: "Eye",
    degree: "MBBS, FCPS (Ophthalmology), FICS",
    hospital: "জাতীয় চক্ষু বিজ্ঞান ইনস্টিটিউট ও হাসপাতাল, ঢাকা",
    fee: "৳১,২০০",
    schedule: "রবিবার - বুধবার (বিকাল ৫:০০ - রাত ৮:০০)",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80",
    active: true,
  },
];

const hospitalData = [
  {
    name: "এভারকেয়ার হসপিটাল ঢাকা (Evercare)",
    address: "প্লট ৮১, ব্লক ই, বসুন্ধরা আবাসিক এলাকা, ঢাকা-১২২৯",
    phone: "01713-047461",
    services: "২৪ ঘণ্টা জরুরি বিভাগ, বিশ্বমানের ICU/CCU, আধুনিক ক্যাথল্যাব, ট্রমা সেন্টার, নিউরো ও কার্ডিয়াক সার্জারি, এয়ার অ্যাম্বুলেন্স সমন্বয়",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "স্কয়ার হাসপাতাল লিমিটেড (Square)",
    address: "১৮/এফ পশ্চিম পান্থপথ, ঢাকা-১২০৫",
    phone: "01713-377775",
    services: "২৪ ঘণ্টা ইমার্জেন্সি, আইসিইউ, এনআইসিইউ, আধুনিক ডায়াগনস্টিক, অনকোলজি, কিডনি ডায়ালাইসিস, উন্নত ল্যাবরেটরি",
    logo: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ইউনাইটেড হাসপাতাল লিমিটেড (United)",
    address: "প্লট ১৫, রোড ৭১, গুলশান-২, ঢাকা-১২১২",
    phone: "01914-001234",
    services: "কার্ডিয়াক সেন্টার, নিউরোসায়েন্স, অর্থোপেডিকস ও জয়েন্ট রিপ্লেসমেন্ট, নেফ্রোলজি, জরুরি সেবা ও অ্যাম্বুলেন্স",
    logo: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=300&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ল্যাবএইড স্পেশালাইজড হাসপাতাল (Labaid)",
    address: "বাড়ি ১, রোড ৪, ধানমন্ডি, ঢাকা-১২০৫",
    phone: "01713-333337",
    services: "কার্ডিয়াক কেয়ার, কিডনি ট্রান্সপ্লান্ট ও ডায়ালাইসিস, গ্যাস্ট্রোএন্টারোলজি, সার্বক্ষণিক ল্যাব ও আধুনিক ইমেজিং",
    logo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=300&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল",
    address: "শেরেবাংলা নগর, ঢাকা-১২০৭",
    phone: "01712-456789",
    services: "সরকারি বিশেষায়িত হৃদরোগ চিকিৎসা, ২৪ ঘণ্টা সিসিইউ, এনজিওগ্রাম ও রিং পরানো, ওপেন হার্ট সার্জারি, সাশ্রয়ী চিকিৎসা",
    logo: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "ইবনে সিনা স্পেশালাইজড হাসপাতাল",
    address: "বাড়ি ৬৮, রোড ১৫/এ, ধানমন্ডি, ঢাকা-১২০৯",
    phone: "01711-654321",
    services: "২৪ ঘণ্টা ইমার্জেন্সি ও ফার্মেসি, আইসিইউ, এইচডিইউ, এনআইসিইউ, জেনারেল ও ল্যাপারোস্কোপিক সার্জারি, উন্নত প্যাথলজি",
    logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "পপুলার ডায়াগনস্টিক সেন্টার ও হাসপাতাল",
    address: "বাড়ি ১১, রোড ২, ধানমন্ডি, ঢাকা-১২০৫",
    phone: "01755-667788",
    services: "আধুনিক ডিজিটাল এক্স-রে, ১.৫T এমআরআই, ১২৮ স্লাইস সিটি স্ক্যান, সব ধরণের রক্ত পরীক্ষা, স্পেশাল কনসালট্যান্ট চেম্বার",
    logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&auto=format&fit=crop&q=80",
    active: true,
  },
  {
    name: "বারডেম জেনারেল হাসপাতাল (BIRDEM)",
    address: "১২২ কাজী নজরুল ইসলাম এভিনিউ, শাহবাগ, ঢাকা",
    phone: "01819-234567",
    services: "ডায়াবেটিস ও হরমোন চিকিৎসা, এন্ডোক্রাইনোলজি, আইসিইউ, নেফ্রোলজি, অঙ্গ পুনর্বাসন, বিশেষায়িত ল্যাব",
    logo: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&auto=format&fit=crop&q=80",
    active: true,
  },
];

const ambulanceData = [
  {
    date: "2026-11-20",
    patientName: "মো. রফিকুল ইসলাম",
    mobile: "01712345678",
    address: "মিরপুর-১০, ঢাকা",
    destination: "ঢাকা মেডিকেল কলেজ হাসপাতাল (DMCH)",
    ambulanceType: "ICU",
    note: "রোগী স্ট্রোক করেছেন, লাইফ সাপোর্ট ও ভেন্টিলেটর যুক্ত অ্যাম্বুলেন্স প্রয়োজন।",
    status: "contacted",
  },
  {
    date: "2026-11-20",
    patientName: "বেগম জাহানারা",
    mobile: "01819876543",
    address: "উত্তরা সেক্টর ৭, ঢাকা",
    destination: "এভারকেয়ার হসপিটাল ঢাকা",
    ambulanceType: "অক্সিজেন",
    note: "হৃদরোগের রোগী, একটানা উচ্চ প্রবাহ অক্সিজেন প্রয়োজন।",
    status: "new",
  },
  {
    date: "2026-11-19",
    patientName: "আব্দুল মোতালেব",
    mobile: "01911223344",
    address: "কান্দিরপাড়, কুমিল্লা",
    destination: "স্কয়ার হাসপাতাল, ঢাকা",
    ambulanceType: "সাধারণ",
    note: "হাসপাতালে ভর্তির জন্য ঢাকা স্থানান্তর।",
    status: "done",
  },
  {
    date: "2026-11-18",
    patientName: "শিশু আরাফাত (নবজাতক)",
    mobile: "01625268462",
    address: "সিলেট ওসমানী মেডিকেল এলাকা",
    destination: "ঢাকা শিশু হাসপাতাল",
    ambulanceType: "নবজাতক",
    note: "ইনকিউবেটর ও শিশু বিশেষজ্ঞ টেকনিশিয়ান টিম দরকার ছিল। সফলভাবে পৌঁছানো হয়েছে।",
    status: "done",
  },
];

const appointmentData = [
  {
    date: "2026-11-22",
    time: "17:30",
    patientName: "মোছা. পারভীন আক্তার",
    mobile: "01711002233",
    specialty: "Gynecology",
    doctorName: "অধ্যাপক ডা. রওশন আরা বেগম",
    hospitalName: "পপুলার ডায়াগনস্টিক সেন্টার, ধানমন্ডি",
    note: "নিয়মিত চেকআপ ও আল্ট্রাসনোগ্রাম রিপোর্ট দেখাতে চান।",
    status: "contacted",
  },
  {
    date: "2026-11-23",
    time: "18:00",
    patientName: "হাজী মোহাম্মদ হারুনুর রশীদ",
    mobile: "01819998877",
    specialty: "Cardiology",
    doctorName: "অধ্যাপক ডা. এম এ বাকি",
    hospitalName: "জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল, ঢাকা",
    note: "বুকে ব্যথা ও উচ্চ রক্তচাপের ফলোআপ।",
    status: "new",
  },
  {
    date: "2026-11-21",
    time: "16:00",
    patientName: "মো. শাহ আলম",
    mobile: "01912334455",
    specialty: "Neuro Medicine",
    doctorName: "অধ্যাপক ডা. কাজী দ্বীন মোহাম্মদ",
    hospitalName: "ন্যাশনাল ইনস্টিটিউট অব নিউরোসায়েন্সেস",
    note: "মাথাব্যথা ও অনিদ্রা সমস্যা।",
    status: "done",
  },
];

const membershipData = [
  {
    name: "মো. তারেক রহমান (রিয়াদ, সৌদি আরব)",
    country: "সৌদি আরব",
    mobile: "01712998877",
    familyName: "মো. আবদুর রহমান (বাবা)",
    familyMobile: "01715443322",
    district: "সিলেট সদর",
    plan: "ফ্যামিলি কেয়ার মেম্বারশিপ",
    note: "বাবার বয়স ৬৮ বছর, ডায়াবেটিস ও হার্টের রোগী। দেশে জরুরি যেকোনো প্রয়োজনে সার্বক্ষণিক পাশে থাকার অনুরোধ।",
    status: "contacted",
  },
  {
    name: "কামরুল হাসান (দুবাই, সংযুক্ত আরব আমিরাত)",
    country: "সংযুক্ত আরব আমিরাত",
    mobile: "01819001122",
    familyName: "রোকেয়া বেগম (মা)",
    familyMobile: "01818776655",
    district: "কুমিল্লা সদর দক্ষিণ",
    plan: "মেম্বারশিপ + বীমা পলিসি",
    note: "পরিবারের চিকিৎসা ব্যয় কভারেজের জন্য বীমা পলিসি যুক্ত করতে চান।",
    status: "new",
  },
  {
    name: "মাহবুবুল হক (দোহা, কাতার)",
    country: "কাতার",
    mobile: "01914332211",
    familyName: "নাসিমা আক্তার (স্ত্রী ও দুই সন্তান)",
    familyMobile: "01913887766",
    district: "ব্রাহ্মণবাড়িয়া",
    plan: "ফ্যামিলি কেয়ার মেম্বারশিপ",
    note: "সদস্যপদ সক্রিয় করা হয়েছে এবং স্থানীয় কেয়ার কো-অর্ডিনেটর নিযুক্ত করা হয়েছে।",
    status: "done",
  },
];

const partnerData = [
  {
    name: "মো. আব্দুল জলিল",
    fatherName: "মরহুম হাজী করিম বকশ",
    mobile: "01718112233",
    nid: "19822691234567890",
    address: "শ্যামলী রিং রোড, ঢাকা",
    district: "ঢাকা",
    upazila: "মোহাম্মদপুর",
    ownerName: "মো. আব্দুল জলিল",
    regNo: "ঢাকা মেট্রো-ছ-৭১-৪৫৬৭",
    vehicleTypes: ["ICU", "অক্সিজেন", "সাধারণ"],
    model: "টয়োটা হাইয়েস ২০২০",
    serviceAreas: ["ঢাকা", "সারা বাংলাদেশ"],
    perKmRate: "৬৫",
    dhakaRate: "৩,৫০০",
    is24h: "হ্যাঁ",
    extra: "ভেন্টিলেটর, ডিফিব্রিলেটর, সাকশন মেশিন, এসি ও সার্বক্ষণিক ডাক্তার/প্যারামেডিক প্রস্তুত থাকে।",
    docsHave: ["ড্রাইভিং লাইসেন্স", "গাড়ির রেজিস্ট্রেশন", "ফিটনেস সার্টিফিকেট", "ইন্সুরেন্স"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    vehiclePhoto: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&auto=format&fit=crop&q=80",
    agree: true,
    status: "done",
  },
  {
    name: "মো. খোরশেদ আলম",
    fatherName: "মো. নুরুল ইসলাম",
    mobile: "01815223344",
    nid: "19892695555667788",
    address: "জিইসি মোড়, চট্টগ্রাম",
    district: "চট্টগ্রাম",
    upazila: "পাঁচলাইশ",
    ownerName: "আলম ব্রাদার্স এম্বুলেন্স",
    regNo: "চট্ট মেট্রো-ছ-১২-৩৪৫৬",
    vehicleTypes: ["অক্সিজেন", "সাধারণ"],
    model: "হাইয়েস গ্র্যান্ড কেবিন ২০১৮",
    serviceAreas: ["চট্টগ্রাম", "সারা বাংলাদেশ"],
    perKmRate: "৬০",
    dhakaRate: "১৫,০০০",
    is24h: "হ্যাঁ",
    extra: "ডাবল সিলিন্ডার সেন্ট্রাল অক্সিজেন ও স্ট্রেচার ট্রলি।",
    docsHave: ["ড্রাইভিং লাইসেন্স", "গাড়ির রেজিস্ট্রেশন", "ফিটনেস সার্টিফিকেট"],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    agree: true,
    status: "contacted",
  },
];

const feedbackData = [
  {
    name: "জসিম উদ্দিন (রিয়াদ প্রবাসী)",
    service: "অ্যাম্বুলেন্স",
    rating: 5,
    comment: "রাত ২টায় মায়ের হার্ট অ্যাটাকের খবর পাই। আমি সৌদি আরবে দিশেহারা হয়ে পড়েছিলাম। D H Medical Support-এ কল করার পর মাত্র ২০ মিনিটের মধ্যে অক্সিজেনসহ অ্যাম্বুলেন্স পৌঁছে যায় এবং হাসপাতালে ভর্তি নিশ্চিত করে। অসংখ্য ধন্যবাদ!",
  },
  {
    name: "ফাতেমা সুলতানা",
    service: "ডাক্তার অ্যাপয়েন্টমেন্ট",
    rating: 5,
    comment: "নিউরো মেডিসিনের বিখ্যাত অধ্যাপকের সিরিয়াল পাচ্ছিলাম না ৩ মাস ধরে। এই প্ল্যাটফর্মের মাধ্যমে দ্রুততম সময়ে সিরিয়াল পেয়েছি। সার্ভিস অত্যন্ত আন্তরিক ও পেশাদার।",
  },
  {
    name: "মো. নুরুল ইসলাম (মালয়েশিয়া প্রবাসী)",
    service: "ফ্যামিলি কেয়ার",
    rating: 5,
    comment: "DH Family Care মেম্বারশিপ নেওয়ার পর থেকে আমার দুশ্চিন্তা অনেক কমে গেছে। বাবার রক্ত পরীক্ষা ও রিপোর্ট কালেকশন সবকিছু তাদের টিম নিজে দাঁড়িয়ে করিয়ে দিয়েছে।",
  },
  {
    name: "ইঞ্জিনিয়ার শাহেদ হাসান",
    service: "হাসপাতাল সমন্বয়",
    rating: 5,
    comment: "জরুরি অবস্থায় ICU বেড খালি পাওয়া খুবই কঠিন ছিল। D H Medical Support টিম স্কয়ার হাসপাতালে ভর্তি ও কেস ফলোআপ করে বড় ধরণের সাহায্য করেছে।",
  },
  {
    name: "রুমানা আফরোজ",
    service: "অ্যাম্বুলেন্স",
    rating: 5,
    comment: "কুমিল্লা থেকে ঢাকায় রোগীকে আনার জন্য তাদের সাথে যোগাযোগ করি। অ্যাম্বুলেন্স ড্রাইভার অত্যন্ত দক্ষ ও সতর্ক ছিলেন। নির্ধারিত ভাড়ার বাইরে এক টাকাও বেশি চাননি।",
  },
];

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log("Connected successfully to Atlas!");

  const models = {
    doctors: mongoose.models.doctors || mongoose.model("doctors", new mongoose.Schema({}, { strict: false, timestamps: true })),
    hospitals: mongoose.models.hospitals || mongoose.model("hospitals", new mongoose.Schema({}, { strict: false, timestamps: true })),
    ambulance: mongoose.models.ambulance || mongoose.model("ambulance", new mongoose.Schema({}, { strict: false, timestamps: true })),
    appointments: mongoose.models.appointments || mongoose.model("appointments", new mongoose.Schema({}, { strict: false, timestamps: true })),
    memberships: mongoose.models.memberships || mongoose.model("memberships", new mongoose.Schema({}, { strict: false, timestamps: true })),
    partners: mongoose.models.partners || mongoose.model("partners", new mongoose.Schema({}, { strict: false, timestamps: true })),
    feedback: mongoose.models.feedback || mongoose.model("feedback", new mongoose.Schema({}, { strict: false, timestamps: true })),
  };

  // Clear existing and insert comprehensive real data
  await models.doctors.deleteMany({});
  await models.doctors.insertMany(doctorData);
  console.log(`✓ Inserted ${doctorData.length} doctors`);

  await models.hospitals.deleteMany({});
  await models.hospitals.insertMany(hospitalData);
  console.log(`✓ Inserted ${hospitalData.length} hospitals`);

  await models.ambulance.deleteMany({});
  await models.ambulance.insertMany(ambulanceData);
  console.log(`✓ Inserted ${ambulanceData.length} ambulance requests`);

  await models.appointments.deleteMany({});
  await models.appointments.insertMany(appointmentData);
  console.log(`✓ Inserted ${appointmentData.length} appointments`);

  await models.memberships.deleteMany({});
  await models.memberships.insertMany(membershipData);
  console.log(`✓ Inserted ${membershipData.length} memberships`);

  await models.partners.deleteMany({});
  await models.partners.insertMany(partnerData);
  console.log(`✓ Inserted ${partnerData.length} ambulance partners`);

  await models.feedback.deleteMany({});
  await models.feedback.insertMany(feedbackData);
  console.log(`✓ Inserted ${feedbackData.length} feedback testimonials`);

  console.log("All collections seeded successfully in MongoDB Atlas!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
