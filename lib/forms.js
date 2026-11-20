// Field definitions for DynamicForm (labels follow the printed D H Medical Support forms)
const AMB = ["সাধারণ", "অক্সিজেন", "ICU", "নবজাতক"];
const YN = ["হ্যাঁ", "না"];
const SP = ["Neuro Medicine", "Cardiology", "Surgery", "Medicine", "Gynecology", "Orthopedics", "Pediatrics", "Eye"];

export const appointmentFields = [
  { name: "date", label: "তারিখ", type: "date" },
  { name: "time", label: "সময়", type: "time" },
  { name: "patientName", label: "রোগীর নাম", required: true },
  { name: "mobile", label: "মোবাইল নং", type: "tel", required: true },
  { name: "specialty", label: "বিভাগ", type: "select", options: SP },
  { name: "doctorName", label: "ডাক্তারের নাম" },
  { name: "hospitalName", label: "হাসপাতালের নাম", full: true },
  { name: "note", label: "বিশেষ নির্দেশনা", type: "textarea" },
];

export const ambulanceFields = [
  { name: "date", label: "তারিখ", type: "date" },
  { name: "patientName", label: "রোগীর নাম", required: true },
  { name: "mobile", label: "যোগাযোগের মোবাইল নম্বর", type: "tel", required: true },
  { name: "address", label: "বর্তমান ঠিকানা (যেখান থেকে রোগী তুলবেন)", required: true },
  { name: "location", label: "রোগীর বর্তমান লোকেশন ট্যাগ করুন (GPS / Live Map)", type: "location", full: true },
  { name: "destination", label: "গন্তব্য হাসপাতাল / স্থান", required: true, full: true },
  { name: "ambulanceType", label: "অ্যাম্বুলেন্সের ধরন", type: "radio", options: AMB },
  { name: "note", label: "বিশেষ নির্দেশনা (যেমন: ভেন্টিলেটর, অক্সিজেন সিলিন্ডার লাগবে কিনা)", type: "textarea" },
];

export const membershipFields = [
  { name: "name", label: "আপনার নাম (প্রবাসী)", required: true },
  { name: "country", label: "বর্তমান দেশ" },
  { name: "mobile", label: "আপনার নম্বর (WhatsApp/IMO)", type: "tel" },
  { name: "familyName", label: "দেশে পরিবারের সদস্যের নাম" },
  { name: "familyMobile", label: "পরিবারের সদস্যের মোবাইল", type: "tel", required: true },
  { name: "district", label: "জেলা" },
  { name: "plan", label: "কোন সেবা চান?", type: "radio", options: ["ফ্যামিলি কেয়ার মেম্বারশিপ", "মেম্বারশিপ + বীমা পলিসি"] },
  { name: "note", label: "অন্যান্য তথ্য", type: "textarea" },
];

export const partnerFields = [
  { name: "name", label: "নাম (মালিক/ড্রাইভার)", required: true },
  { name: "fatherName", label: "পিতার নাম" },
  { name: "mobile", label: "মোবাইল নম্বর", type: "tel", required: true },
  { name: "nid", label: "জাতীয় পরিচয়পত্র (NID) নম্বর", required: true },
  { name: "nidFrontPhoto", label: "জাতীয় পরিচয়পত্রের সামনের ছবি (NID Front)", type: "image", required: true },
  { name: "nidBackPhoto", label: "জাতীয় পরিচয়পত্রের পেছনের ছবি (NID Back)", type: "image", required: true },
  { name: "drivingLicensePhoto", label: "ড্রাইভিং লাইসেন্সের ছবি (ক্যামেরা দিয়ে তুলুন)", type: "image" },
  { name: "photo", label: "ড্রাইভার/মালিকের নিজের ছবি (সম্প্রতি তোলা)", type: "image" },
  { name: "address", label: "বর্তমান ঠিকানা / স্ট্যান্ডের ঠিকানা", full: true },
  { name: "district", label: "জেলা" },
  { name: "upazila", label: "উপজেলা" },
  { name: "location", label: "অ্যাম্বুলেন্স স্ট্যান্ড / গ্যারেজের জিপিএস লোকেশন", type: "location" },
  { name: "regNo", label: "গাড়ির রেজিস্ট্রেশন নম্বর (যেমন: ঢাকা মেট্রো-ছ-...) ", required: true },
  { name: "model", label: "গাড়ির মডেল ও বছর" },
  { name: "ownerName", label: "গাড়ির মালিকের নাম" },
  { name: "vehiclePhoto", label: "অ্যাম্বুলেন্সের ছবি (সামনে বা পাশের ছবি)", type: "image" },
  { name: "vehicleTypes", label: "অ্যাম্বুলেন্সের ধরন", type: "checks", options: [...AMB, "অন্যান্য"] },
  { name: "serviceAreas", label: "সার্ভিস এলাকা", type: "checks", options: ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "ময়মনসিংহ", "রংপুর", "সারা বাংলাদেশ"] },
  { name: "perKmRate", label: "প্রতি কিমি আনুমানিক ভাড়া (টাকা)", type: "number" },
  { name: "dhakaRate", label: "ঢাকায় যাতায়াত প্যাকেজ ভাড়া (টাকা)", type: "number" },
  { name: "is24h", label: "২৪ ঘণ্টা জরুরি সার্ভিস প্রদান করেন?", type: "radio", options: YN },
  { name: "extra", label: "অতিরিক্ত সুবিধা / যন্ত্রপাতি (যেমন: ভেন্টিলেটর, অক্সিজেন)" },
  { name: "docsHave", label: "আপনার কাছে প্রস্তুত কাগজপত্র", type: "checks", options: ["ড্রাইভিং লাইসেন্স", "গাড়ির রেজিস্ট্রেশন", "ফিটনেস সার্টিফিকেট", "ইন্সুরেন্স"] },
  { name: "agree", type: "agree", required: true, label: "আমি অঙ্গীকার করছি যে, আমি D H MEDICAL SUPPORT-এর নিয়ম মেনে সততা ও দক্ষতার সাথে কাজ করব এবং রোগীর নিরাপত্তা, সম্মান ও সেবার মান বজায় রাখব।" },
];

export const feedbackFields = [
  { name: "rating", label: "সেবার মান", type: "rating", required: true },
  { name: "service", label: "কোন সেবা নিয়েছেন?", type: "select", options: ["অ্যাম্বুলেন্স", "ডাক্তার অ্যাপয়েন্টমেন্ট", "হাসপাতাল সমন্বয়", "ফ্যামিলি কেয়ার", "অন্যান্য"] },
  { name: "name", label: "আপনার নাম (ঐচ্ছিক)" },
  { name: "comment", label: "মন্তব্য", type: "textarea" },
];

export const doctorFields = [
  { name: "name", label: "ডাক্তারের নাম", required: true },
  { name: "specialty", label: "বিভাগ", type: "select", options: SP },
  { name: "degree", label: "ডিগ্রি ও পদবী" },
  { name: "hospital", label: "হাসপাতাল / চেম্বার" },
  { name: "fee", label: "ভিজিট ফি" },
  { name: "schedule", label: "রোগী দেখার সময়সূচি" },
  { name: "photo", label: "ডাক্তারের ছবি", type: "image" },
];

export const hospitalFields = [
  { name: "name", label: "হাসপাতালের নাম", required: true },
  { name: "address", label: "মেডিকেলের সম্পূর্ণ ঠিকানা", required: true },
  { name: "totalBeds", label: "কত বেডের মেডিকেল (যেমন: ৪২৫ বেড, ৫০টি ICU, ৯০ কেবিন)" },
  { name: "phone", label: "জরুরি হেল্পলাইন / ফোন নম্বর" },
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
