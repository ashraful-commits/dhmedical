const AMB = ["General", "Oxygen", "ICU", "NICU", "Cardiac", "Long Distance"];
const COND = ["সাধারণ", "জরুরি", "অক্সিজেন", "ICU", "নবজাতক", "ক্রিটিক্যাল"];
const YN = ["হ্যাঁ", "না"];
const SP = ["Neuro Medicine", "Cardiology", "Surgery", "Medicine", "Gynecology", "Orthopedics", "Pediatrics", "Eye"];
const DISTRICTS = ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "ময়মনসিংহ", "রংপুর", "কুমিল্লা", "ব্রাহ্মণবাড়িয়া"];

export const appointmentFields = [
  { name: "patientName", label: "রোগীর নাম", required: true },
  { name: "mobile", label: "যোগাযোগের মোবাইল নম্বর", type: "tel", required: true },
  { name: "date", label: "পছন্দের তারিখ", type: "date" },
  { name: "time", label: "পছন্দের সময়", type: "time" },
  { name: "specialty", label: "চিকিৎসা বিভাগ", type: "select", options: SP },
  { name: "doctorName", label: "নির্দিষ্ট ডাক্তারের নাম (যদি থাকে)" },
  { name: "hospitalName", label: "হাসপাতাল বা চেম্বার", full: true },
  { name: "note", label: "রোগীর সমস্যা / বিশেষ নির্দেশনা", type: "textarea", full: true },
];

export const ambulanceFields = [
  { name: "patientName", label: "রোগীর নাম", required: true },
  { name: "mobile", label: "যোগাযোগের সক্রিয় মোবাইল নম্বর", type: "tel", required: true },
  { name: "patientCondition", label: "রোগীর বর্তমান শারীরিক অবস্থা", type: "select", options: COND, required: true },
  { name: "ambulanceType", label: "অ্যাম্বুলেন্সের ধরন", type: "select", options: AMB, required: true },
  { name: "address", label: "পিকআপ ঠিকানা (যেখান থেকে রোগী তুলবেন)", required: true },
  { name: "location", label: "রোগীর বর্তমান লাইভ লোকেশন (GPS / Map Link)", type: "location" },
  { name: "destination", label: "গন্তব্য হাসপাতাল বা ঠিকানা", required: true, full: true },
  { name: "whenNeeded", label: "কখন অ্যাম্বুলেন্স প্রয়োজন?", type: "radio", options: ["এখনই জরুরি", "নির্দিষ্ট তারিখ ও সময়"] },
  { name: "passengers", label: "রোগীর সাথে কতজন স্বজন যাবেন?", type: "number" },
  { name: "note", label: "অন্যান্য প্রয়োজনীয় সরঞ্জাম বা বিশেষ নির্দেশনা", type: "textarea", full: true },
];

export const membershipFields = [
  { name: "name", label: "আপনার নাম (প্রবাসী)", required: true },
  { name: "country", label: "বর্তমান দেশ (যেমন: সৌদি আরব, ইউএই, কাতার)" },
  { name: "mobile", label: "আপনার WhatsApp/IMO মোবাইল নম্বর", type: "tel" },
  { name: "familyName", label: "বাংলাদেশে পরিবারের প্রধান অভিভাবকের নাম" },
  { name: "familyMobile", label: "দেশে পরিবারের সদস্যের মোবাইল", type: "tel", required: true },
  { name: "district", label: "জেলা", type: "select", options: DISTRICTS },
  { name: "plan", label: "কোন সেবা প্যাকেজ চান?", type: "radio", options: ["ফ্যামিলি কেয়ার মেম্বারশিপ", "মেম্বারশিপ + বীমা পলিসি সহায়তা"] },
  { name: "note", label: "পরিবারের স্বাস্থ্য সংক্রান্ত বিশেষ তথ্য", type: "textarea", full: true },
];

export const partnerFields = [
  { name: "name", label: "নাম (মালিক/ড্রাইভার)", required: true },
  { name: "fatherName", label: "পিতার নাম" },
  { name: "mobile", label: "মোবাইল নম্বর", type: "tel", required: true },
  { name: "nid", label: "জাতীয় পরিচয়পত্র (NID) নম্বর", required: true },
  { name: "nidFrontPhoto", label: "জাতীয় পরিচয়পত্রের সামনের ছবি (NID Front)", type: "image", required: true },
  { name: "nidBackPhoto", label: "জাতীয় পরিচয়পত্রের পেছনের ছবি (NID Back)", type: "image", required: true },
  { name: "drivingLicensePhoto", label: "ড্রাইভিং লাইসেন্সের ছবি (ক্যামেরা দিয়ে তুলুন)", type: "image" },
  { name: "photo", label: "ড্রাইভার/মালিকের নিজের ছবি", type: "image" },
  { name: "address", label: "স্ট্যান্ড বা বর্তমান গ্যারেজের ঠিকানা", full: true },
  { name: "district", label: "জেলা", type: "select", options: DISTRICTS },
  { name: "location", label: "অ্যাম্বুলেন্স স্ট্যান্ডের জিপিএস লোকেশন", type: "location" },
  { name: "regNo", label: "গাড়ির রেজিস্ট্রেশন নম্বর (যেমন: ঢাকা মেট্রো-ছ-...)", required: true },
  { name: "model", label: "গাড়ির মডেল ও বছর" },
  { name: "ownerName", label: "গাড়ির মূল মালিকের নাম" },
  { name: "vehiclePhoto", label: "অ্যাম্বুলেন্সের ছবি", type: "image" },
  { name: "vehicleTypes", label: "অ্যাম্বুলেন্সের ধরন", type: "checks", options: [...AMB, "অন্যান্য"] },
  { name: "serviceAreas", label: "সার্ভিস এলাকা", type: "checks", options: ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "ময়মনসিংহ", "রংপুর", "সারা বাংলাদেশ"] },
  { name: "perKmRate", label: "প্রতি কিমি আনুমানিক ভাড়া (টাকা)", type: "number" },
  { name: "dhakaRate", label: "ঢাকায় লোকাল প্যাকেজ ভাড়া (টাকা)", type: "number" },
  { name: "is24h", label: "২৪ ঘণ্টা জরুরি সার্ভিস প্রদান করেন?", type: "radio", options: YN },
  { name: "extra", label: "অতিরিক্ত সুবিধা / যন্ত্রপাতি" },
  { name: "docsHave", label: "আপনার কাছে প্রস্তুত কাগজপত্র", type: "checks", options: ["ড্রাইভিং লাইসেন্স", "গাড়ির রেজিস্ট্রেশন", "ফিটনেস সার্টিফিকেট", "ইন্সুরেন্স"] },
  { name: "agree", type: "agree", required: true, label: "আমি অঙ্গীকার করছি যে, আমি D H MEDICAL SUPPORT-এর নিয়ম মেনে সততা ও দক্ষতার সাথে কাজ করব এবং রোগীর নিরাপত্তা, সম্মান ও সেবার মান বজায় রাখব।" },
];

export const feedbackFields = [
  { name: "rating", label: "সেবার মান", type: "rating", required: true },
  { name: "service", label: "কোন সেবা নিয়েছেন?", type: "select", options: ["অ্যাম্বুলেন্স", "ডাক্তার অ্যাপয়েন্টমেন্ট", "হাসপাতাল সমন্বয়", "ফ্যামিলি কেয়ার", "অন্যান্য"] },
  { name: "name", label: "আপনার নাম (ঐচ্ছিক)" },
  { name: "comment", label: "আপনার মূল্যবান মন্তব্য ও অভিজ্ঞতা", type: "textarea", full: true },
];

export const doctorFields = [
  { name: "name", label: "ডাক্তারের নাম", required: true },
  { name: "specialty", label: "বিভাগ", type: "select", options: SP },
  { name: "degree", label: "ডিগ্রি ও পদবী" },
  { name: "hospital", label: "হাসপাতাল / চেম্বার" },
  { name: "district", label: "জেলা", type: "select", options: DISTRICTS },
  { name: "bmdcReg", label: "BMDC রেজি. নং (যদি থাকে)" },
  { name: "fee", label: "ভিজিট ফি" },
  { name: "schedule", label: "রোগী দেখার সময়সূচি" },
  { name: "photo", label: "ডাক্তারের ছবি", type: "image" },
];

export const hospitalFields = [
  { name: "name", label: "হাসপাতালের নাম", required: true },
  { name: "district", label: "জেলা", type: "select", options: DISTRICTS },
  { name: "address", label: "মেডিকেলের সম্পূর্ণ ঠিকানা", required: true },
  { name: "totalBeds", label: "কত বেডের মেডিকেল (যেমন: ৪২৫ বেড, ৫০টি ICU, ৯০ কেবিন)" },
  { name: "phone", label: "জরুরি হেল্পলাইন / ফোন নম্বর" },
  { name: "emergencyPhone", label: "অ্যাম্বুলেন্স রিসেপশন ফোন" },
  { name: "services", label: "প্রধান সেবাসমূহ (কমা দিয়ে লিখুন)", full: true },
  { name: "floorGuide", label: "কয়তলায় কোন রুম আছে (ফ্লোর ও রুম নম্বর গাইডলাইন)", type: "textarea", full: true },
  { name: "logo", label: "হাসপাতালের লোগো / ছবি", type: "image" },
];

export const FORMS = {
  appointments: appointmentFields,
  ambulance: ambulanceFields,
  memberships: membershipFields,
  partners: partnerFields,
  feedback: feedbackFields,
  doctors: doctorFields,
  hospitals: hospitalFields,
};
