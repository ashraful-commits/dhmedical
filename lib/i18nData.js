import { DISTRICT_GROUPS } from "./districts";
import { ROW_FIELDS } from "./prescriptions";

export const DISTRICT_EN = Object.fromEntries(
  DISTRICT_GROUPS.flatMap((group) => group.districts.map((d) => [d.name, d.en]))
);

export function pick(pair, lang = "bn") {
  if (pair == null) return "";
  if (typeof pair === "string" || typeof pair === "number") return pair;
  return pair[lang] ?? pair.bn ?? pair.en ?? "";
}

const TEXT_EN = {
  সাধারণ: "General",
  জরুরি: "Emergency",
  অক্সিজেন: "Oxygen",
  নবজাতক: "Neonatal",
  ক্রিটিক্যাল: "Critical",
  হ্যাঁ: "Yes",
  না: "No",
  "Jotno (যত্ন)": "Jotno (Care)",
  "Astha (আস্থা)": "Astha (Trust)",
  "Aponjon (আপনজন)": "Aponjon (Dear One)",
  "Momota (মমতা)": "Momota (Affection)",
  "সরকারি স্বাস্থ্য বীমা": "Government Health Insurance",
  অন্যান্য: "Other",
  "নতুন পলিসির আবেদন": "New Policy Application",
  "ক্লেইম সহায়তা": "Claim Assistance",
  "পলিসি নবায়ন": "Policy Renewal",
  "সদস্য যোগ/বাদ": "Add / Remove Member",
  "এখনই জরুরি": "Urgent Now",
  "নির্দিষ্ট তারিখ ও সময়": "Specific Date & Time",
  "ফ্যামিলি কেয়ার মেম্বারশিপ": "Family Care Membership",
  "মেম্বারশিপ + বীমা পলিসি সহায়তা": "Membership + Insurance Policy Assistance",
  "সারা বাংলাদেশ": "All Over Bangladesh",
  "ড্রাইভিং লাইসেন্স": "Driving Licence",
  "গাড়ির রেজিস্ট্রেশন": "Vehicle Registration",
  "ফিটনেস সার্টিফিকেট": "Fitness Certificate",
  ইন্সুরেন্স: "Insurance",
  "রোগীর নাম": "Patient Name",
  "যোগাযোগের মোবাইল নম্বর": "Contact Mobile Number",
  "যোগাযোগের সক্রিয় মোবাইল নম্বর": "Active Contact Mobile Number",
  "পছন্দের তারিখ": "Preferred Date",
  "পছন্দের সময়": "Preferred Time",
  "চিকিৎসা বিভাগ": "Medical Specialty",
  "নির্দিষ্ট ডাক্তারের নাম (যদি থাকে)": "Specific Doctor Name (if any)",
  "হাসপাতাল বা চেম্বার": "Hospital or Chamber",
  "রোগীর সমস্যা / বিশেষ নির্দেশনা": "Patient Problem / Special Instructions",
  "রোগীর বর্তমান শারীরিক অবস্থা": "Current Physical Condition",
  "অ্যাম্বুলেন্সের ধরন": "Ambulance Type",
  "পিকআপ ঠিকানা (যেখান থেকে রোগী তুলবেন)": "Pickup Address (where to collect the patient)",
  "রোগীর বর্তমান লাইভ লোকেশন (GPS / Map Link)": "Patient's Live Location (GPS / Map Link)",
  "গন্তব্য হাসপাতাল বা ঠিকানা": "Destination Hospital or Address",
  "কখন অ্যাম্বুলেন্স প্রয়োজন?": "When is the ambulance needed?",
  "রোগীর সাথে কতজন স্বজন যাবেন?": "How many relatives will travel with the patient?",
  "অন্যান্য প্রয়োজনীয় সরঞ্জাম বা বিশেষ নির্দেশনা": "Other Required Equipment or Special Instructions",
  "আপনার নাম (প্রবাসী)": "Your Name (Expatriate)",
  "বর্তমান দেশ (যেমন: সৌদি আরব, ইউএই, কাতার)": "Current Country (e.g. Saudi Arabia, UAE, Qatar)",
  "আপনার WhatsApp/IMO মোবাইল নম্বর": "Your WhatsApp/IMO Mobile Number",
  "বাংলাদেশে পরিবারের প্রধান অভিভাবকের নাম": "Name of Main Guardian in Bangladesh",
  "দেশে পরিবারের সদস্যের মোবাইল": "Mobile Number of Family Member in Bangladesh",
  "জেলা / উপজেলা": "District / Upazila",
  "কোন সেবা প্যাকেজ চান?": "Which service package do you want?",
  "পরিবারের স্বাস্থ্য সংক্রান্ত বিশেষ তথ্য": "Special Health Information About Your Family",
  "নাম (মালিক/ড্রাইভার)": "Name (Owner / Driver)",
  "পিতার নাম": "Father's Name",
  "মোবাইল নম্বর": "Mobile Number",
  "জাতীয় পরিচয়পত্র (NID) নম্বর": "National ID (NID) Number",
  "জাতীয় পরিচয়পত্রের সামনের ছবি (NID Front)": "Front Photo of National ID (NID Front)",
  "জাতীয় পরিচয়পত্রের পেছনের ছবি (NID Back)": "Back Photo of National ID (NID Back)",
  "ড্রাইভিং লাইসেন্সের ছবি (ক্যামেরা দিয়ে তুলুন)": "Driving Licence Photo (take with camera)",
  "ড্রাইভার/মালিকের নিজের ছবি": "Driver / Owner Photo",
  "স্ট্যান্ড বা বর্তমান গ্যারেজের ঠিকানা": "Stand or Current Garage Address",
  "অ্যাম্বুলেন্স স্ট্যান্ডের জিপিএস লোকেশন": "GPS Location of Ambulance Stand",
  "গাড়ির রেজিস্ট্রেশন নম্বর (যেমন: ঢাকা মেট্রো-ছ-...)": "Vehicle Registration Number (e.g. Dhaka Metro-GA-...)",
  "গাড়ির মডেল ও বছর": "Vehicle Model & Year",
  "গাড়ির মূল মালিকের নাম": "Registered Owner Name",
  "অ্যাম্বুলেন্সের ছবি": "Ambulance Photo",
  "সার্ভিস এলাকা": "Service Areas",
  "প্রতি কিমি আনুমানিক ভাড়া (টাকা)": "Estimated Fare Per Km (Taka)",
  "ঢাকায় লোকাল প্যাকেজ ভাড়া (টাকা)": "Local Dhaka Package Fare (Taka)",
  "২৪ ঘণ্টা জরুরি সার্ভিস প্রদান করেন?": "Do you provide 24-hour emergency service?",
  "অতিরিক্ত সুবিধা / যন্ত্রপাতি": "Additional Facilities / Equipment",
  "আপনার কাছে প্রস্তুত কাগজপত্র": "Prepared Documents",
  "আমি অঙ্গীকার করছি যে, আমি D H MEDICAL SUPPORT-এর নিয়ম মেনে সততা ও দক্ষতার সাথে কাজ করব এবং রোগীর নিরাপত্তা, সম্মান ও সেবার মান বজায় রাখব।": "I pledge to follow D H MEDICAL SUPPORT rules and work with honesty and competence while maintaining patient safety, dignity and service quality.",
  "সেবার মান": "Service Quality",
  "কোন সেবা নিয়েছেন?": "Which service did you use?",
  অ্যাম্বুলেন্স: "Ambulance",
  "ডাক্তার অ্যাপয়েন্টমেন্ট": "Doctor Appointment",
  "হাসপাতাল সমন্বয়": "Hospital Coordination",
  "ফ্যামিলি কেয়ার": "Family Care",
  "আপনার নাম (ঐচ্ছিক)": "Your Name (Optional)",
  "আপনার মূল্যবান মন্তব্য ও অভিজ্ঞতা": "Your Valuable Comment & Experience",
  "ডাক্তারের নাম": "Doctor's Name",
  বিভাগ: "Specialty",
  "ডিগ্রি ও পদবী": "Degree & Designation",
  "হাসপাতাল / চেম্বার": "Hospital / Chamber",
  "BMDC রেজি. নং (যদি থাকে)": "BMDC Reg. No (if any)",
  "ভিজিট ফি": "Visit Fee",
  "রোগী দেখার সময়সূচি": "Patient Schedule",
  "ডাক্তারের ছবি": "Doctor's Photo",
  "হাসপাতালের নাম": "Hospital Name",
  "মেডিকেলের সম্পূর্ণ ঠিকানা": "Full Address of Medical Facility",
  "কত বেডের মেডিকেল (যেমন: ৪২৫ বেড, ৫০টি ICU, ৯০ কেবিন)": "How many beds (e.g. 425 beds, 50 ICU, 90 cabins)",
  "জরুরি হেল্পলাইন / ফোন নম্বর": "Emergency Helpline / Phone Number",
  "অ্যাম্বুলেন্স রিসেপশন ফোন": "Ambulance Reception Phone",
  "প্রধান সেবাসমূহ (কমা দিয়ে লিখুন)": "Core Services (comma separated)",
  "কয়তলায় কোন রুম আছে (ফ্লোর ও রুম নম্বর গাইডলাইন)": "Which room is on which floor (floor & room number guide)",
  "হাসপাতালের লোগো / ছবি": "Hospital Logo / Photo",
  "আপনি কী চান?": "What do you need?",
  "আবেদনকারীর নাম": "Applicant Name",
  "পলিসি / বীমার ধরন": "Policy / Insurance Type",
  "বিদ্যমান পলিসি নম্বর (যদি থাকে)": "Existing Policy Number (if any)",
  "কতজন সদস্য অন্তর্ভুক্ত করবেন?": "How many members to include?",
  "বিবরণ / আপনার প্রশ্ন": "Details / Your Question",
};

export function translateText(text, lang = "bn") {
  if (lang === "bn" || text == null) return text;
  return TEXT_EN[text] ?? DISTRICT_EN[text] ?? text;
}

export function translateFormField(field, lang = "bn") {
  return {
    ...field,
    label: translateText(field.label, lang),
    ...(field.options
      ? {
          optionLabels: field.options.map((option) => translateText(option, lang)),
        }
      : {}),
  };
}

export const PRESCRIPTION_FIELD_LABELS = Object.fromEntries(
  ROW_FIELDS.map((field) => [
    field.key,
    {
      bn: field.label,
      en: {
        doctor: "Doctor",
        medicine: "Medicine",
        manufacturer: "Company",
        timing: "Timing",
        days: "Days",
      }[field.key],
    },
  ])
);

export const AMBULANCE_PAGE_TYPES = [
  {
    type: { bn: "ICU অ্যাম্বুলেন্স", en: "ICU Ambulance" },
    tag: { bn: "ক্রিটিক্যাল লাইফ সাপোর্ট", en: "Critical Life Support" },
    desc: { bn: "ভেন্টিলেটর, ডিফিব্রিলেটর, সাকশন ও সার্বক্ষণিক দক্ষ প্যারামেডিক স্টাফ সহ।", en: "With ventilator, defibrillator, suction and trained paramedic staff around the clock." },
    badge: { bn: "জরুরি", en: "Emergency" },
    fare: { bn: "৳৮,০০০ থেকে", en: "From ৳8,000" },
    eta: { bn: "২০-৩০ মিনিট", en: "20-30 minutes" },
  },
  {
    type: { bn: "অক্সিজেন অ্যাম্বুলেন্স", en: "Oxygen Ambulance" },
    tag: { bn: "শ্বাসকষ্ট ও হৃদরোগ", en: "Breathing & Heart Care" },
    desc: { bn: "উচ্চ ক্ষমতাসম্পন্ন সেন্ট্রাল অক্সিজেন সিলিন্ডার, ফ্লোমিটার ও মাস্ক সুবিধা।", en: "High-capacity central oxygen cylinder, flowmeter and mask facilities." },
    badge: { bn: "জনপ্রিয়", en: "Popular" },
    fare: { bn: "৳২,৫০০ থেকে", en: "From ৳2,500" },
    eta: { bn: "১৫-২০ মিনিট", en: "15-20 minutes" },
  },
  {
    type: { bn: "সাধারণ AC অ্যাম্বুলেন্স", en: "General AC Ambulance" },
    tag: { bn: "হাসপাতাল স্থানান্তর", en: "Hospital Transfer" },
    desc: { bn: "আরামদায়ক পেশেন্ট স্ট্রেচার, এসি সুবিধা ও রোগীর পরিবারের বসার সুব্যবস্থা।", en: "Comfortable patient stretcher, air conditioning and seating for the family." },
    badge: { bn: "সাশ্রয়ী", en: "Affordable" },
    fare: { bn: "৳১,৫০০ থেকে", en: "From ৳1,500" },
    eta: { bn: "১৫-২৫ মিনিট", en: "15-25 minutes" },
  },
  {
    type: { bn: "নবজাতক (NICU) অ্যাম্বুলেন্স", en: "Neonatal (NICU) Ambulance" },
    tag: { bn: "শিশু ও নবজাতক", en: "Child & Newborn Care" },
    desc: { bn: "বিশেষায়িত ইনকিউবেটর, বেবি ওয়ার্মার ও শিশু সুরক্ষা টেকনিশিয়ান টিম সহ।", en: "With specialized incubator, baby warmer and neonatal care technician team." },
    badge: { bn: "বিশেষায়িত", en: "Specialized" },
    fare: { bn: "৳৯,৫০০ থেকে", en: "From ৳9,500" },
    eta: { bn: "২০-৩০ মিনিট", en: "20-30 minutes" },
  },
];

export const AMBULANCE_FAQS = [
  {
    q: { bn: "জরুরি অ্যাম্বুলেন্স কত দ্রুত রোগীর কাছে পৌঁছাবে?", en: "How quickly will an emergency ambulance reach the patient?" },
    a: { bn: "অনলাইন বুকিং বা হটলাইনে (01625-268462) কল করার সাথে সাথে আমাদের নিকটতম অ্যাম্বুলেন্স রওনা হয় এবং ১৫ থেকে ২৫ মিনিটের মধ্যে পৌঁছে যায়।", en: "As soon as you book online or call the hotline (01625-268462), our nearest ambulance starts moving and reaches within 15 to 25 minutes." },
  },
  {
    q: { bn: "অ্যাম্বুলেন্সের প্রাথমিক ভাড়া কত?", en: "What is the starting fare?" },
    a: { bn: "ঢাকার ভেতরে সাধারণ এসি অ্যাম্বুলেন্স ১৫০০ টাকা, অক্সিজেন অ্যাম্বুলেন্স ২৫০০ টাকা এবং আইসিইউ (ICU) লাইফ সাপোর্ট অ্যাম্বুলেন্স ৮০০০ টাকা থেকে শুরু। দূরপাল্লার ক্ষেত্রে প্রতি কিমি ৬৫ টাকা হারে নির্ধারিত হয়।", en: "Within Dhaka, a general AC ambulance starts at ৳1,500, oxygen at ৳2,500 and ICU life support at ৳8,000. Long-distance trips are calculated at ৳65 per km." },
  },
  {
    q: { bn: "আইসিইউ অ্যাম্বুলেন্সে কি ডাক্তার বা প্যারামেডিক থাকে?", en: "Is there a doctor or paramedic in the ICU ambulance?" },
    a: { bn: "হ্যাঁ, আমাদের প্রতিটি ICU ও কার্ডিয়াক অ্যাম্বুলেন্সে ভেন্টিলেটর, সাকশন, মনিটর সহ প্রশিক্ষিত জরুরি প্যারামেডিক উপস্থিত থাকে।", en: "Yes. Every ICU and cardiac ambulance has a trained emergency paramedic with ventilator, suction and monitoring equipment." },
  },
  {
    q: { bn: "ঢাকার বাইরে জেলা পর্যায়ে কি দূরপাল্লার অ্যাম্বুলেন্স পাওয়া যায়?", en: "Are long-distance ambulances available outside Dhaka?" },
    a: { bn: "হ্যাঁ, ঢাকা থেকে চট্টগ্রাম, সিলেট, রাজশাহী, খুলনা, কুমিল্লা, বরিশাল সহ বাংলাদেশের ৬৪ জেলাতেই দূরপাল্লার রোগী পরিবহনে আমাদের অ্যাম্বুলেন্স ২৪ ঘণ্টা নিয়োজিত।", en: "Yes. Our ambulances are available 24 hours for long-distance patient transfer across all 64 districts, including Chattogram, Sylhet, Rajshahi, Khulna, Cumilla and Barishal." },
  },
];

export const DOCTOR_FAQS = [
  {
    q: { bn: "ডাক্তারের সিরিয়াল কীভাবে বুকিং করব?", en: "How do I book a doctor's serial?" },
    a: { bn: "নিচের ডাক্তার তালিকা থেকে আপনার কাঙ্ক্ষিত ডাক্তারের পাশে 'সিরিয়াল নিন' বাটনে ক্লিক করুন অথবা 'অ্যাপয়েন্টমেন্ট' ফর্মে রোগীর নাম ও মোবাইল নম্বর পূরণ করে সাবমিট করুন।", en: "Click the serial button beside your preferred doctor in the list below, or fill in the patient name and mobile number in the appointment form and submit it." },
  },
  {
    q: { bn: "মেডিসিন বা বিশেষজ্ঞ ডাক্তারদের ভিজিট ফি কত?", en: "What is the consultation fee?" },
    a: { bn: "অধিকাংশ বিশেষজ্ঞ অধ্যাপকদের ভিজিট ফি ১,০০০ টাকা থেকে ২,০০০ টাকার মধ্যে নির্ধারিত থাকে। ফি এর পরিমাণ সরাসরি ডাক্তার কার্ডে উল্লেখ রয়েছে।", en: "Most specialist professors charge between ৳1,000 and ৳2,000. The exact fee is shown on each doctor card." },
  },
  {
    q: { bn: "সিরিয়াল কনফার্মেশন কীভাবে পাব?", en: "How will I get serial confirmation?" },
    a: { bn: "বুকিং সাবমিট করার সাথে সাথে একটি ইউনিক ট্র্যাকিং আইডি (DH-APT-...) পাওয়া যায়। এছাড়া আমাদের কো-অর্ডিনেটর রোগী বা স্বজনের মোবাইলে ফোন করে চেম্বার ও রুম নম্বর নিশ্চিত করেন।", en: "You receive a unique tracking ID (DH-APT-...) immediately after submission. Our coordinator also calls the patient or relative to confirm the chamber and room number." },
  },
];

export const HOSPITAL_FAQS = [
  {
    q: { bn: "হাসপাতালে জরুরি বেড বা আইসিইউ (ICU) পাওয়ার উপায় কী?", en: "How can I get an emergency bed or ICU?" },
    a: { bn: "আমাদের ২৪ ঘণ্টা হটলাইনে (01625-268462) কল করলে আমাদের টিম স্কয়ার, এভারকেয়ার, ল্যাবএইড, ইউনাইটেড সহ শীর্ষ হাসপাতালে তাৎক্ষণিক খালি বেড ও আইসিইউ কনফার্ম করে দেয়।", en: "Call our 24-hour hotline (01625-268462) and our team will confirm available beds and ICU at top hospitals including Square, Evercare, Labaid and United." },
  },
  {
    q: { bn: "হাসপাতালের ফ্লোর ডিরেক্টরি (কয়তলায় কোন রুম) কীভাবে দেখব?", en: "How do I view the hospital floor directory?" },
    a: { bn: "প্রতিটি হাসপাতালের কার্ডে 'কয়তলায় কোন রুম আছে (ফ্লোর ডিরেক্টরি)' অপশনে ক্লিক করলে নিচতলা থেকে সর্বোচ্চ তলা পর্যন্ত ওটি, ল্যাব, আইসিইউ ও কেবিন রুম নম্বর দেখতে পাবেন।", en: "Click the floor directory option on any hospital card to see OT, lab, ICU and cabin room numbers from the ground floor to the top floor." },
  },
];

export const FAMILY_PROBLEMS = [
  { bn: "দেশে থাকা মা-বাবা বা পরিবারের কেউ হঠাৎ মধ্যরাতে অসুস্থ হলে কার কাছে যাবেন?", en: "Who do you call if a parent or family member back home suddenly falls ill at midnight?" },
  { bn: "নিজে প্রবাসে অসুস্থ হয়ে দেশে ফিরলে এয়ারপোর্ট থেকে চিকিৎসা ও দেখাশোনার লোক নেই।", en: "If you fall ill abroad and return home, there is no one to receive you at the airport and arrange care." },
  { bn: "হাসপাতালে বেড পাওয়া, আইসিইউ বুকিং কিংবা সঠিক বিশেষজ্ঞ ডাক্তারের সিরিয়াল সমন্বয়ের অভাব।", en: "No support to find a hospital bed, book ICU or coordinate the right specialist appointment." },
  { bn: "চিকিৎসা ব্যয় নির্বাহে বীমা পলিসির সঠিক দিকনির্দেশনা ও ক্লেইম সহায়তার জটিলতা।", en: "Confusion about insurance policy guidance and claim support for medical expenses." },
];

export const FAMILY_SOLUTIONS = [
  { bn: "২৪ ঘণ্টা ডেডিকেটেড কেয়ার ম্যানেজার — একটি কলেই জরুরি অ্যাম্বুলেন্স ও ডাক্তার প্রেরণ।", en: "A 24-hour dedicated care manager — one call dispatches an ambulance and doctor." },
  { bn: "শীর্ষ হাসপাতালে সরাসরি ভর্তি, আইসিইউ বেড সংরক্ষণ ও নিয়মিত কেস ফলোআপ।", en: "Direct admission at top hospitals, ICU bed reservation and regular case follow-up." },
  { bn: "প্রবাসে থাকা সদস্যকে রোগীর শারীরিক অবস্থা ও প্রেসক্রিপশন নিয়মিত আপডেট দেওয়া।", en: "Regular updates on the patient's condition and prescription for family members abroad." },
  { bn: "অনুমোদিত স্বাস্থ্য বীমা পলিসি তথ্য, আবেদন ও ক্লেইম আদায়ে সার্বক্ষণিক পরামর্শ।", en: "Round-the-clock guidance on approved health policies, applications and claims." },
  { bn: "প্রবাস ফেরত ভাইদের জন্য এয়ারপোর্ট রিসিভ ও চিকিৎসা সমন্বয় সহায়তা।", en: "Airport reception and medical coordination for family members returning from abroad." },
];

export const MEMBERSHIP_BENEFITS = [
  { bn: "২৪ ঘণ্টার জরুরি মেডিকেল হটলাইন সাপোর্ট", en: "24-hour emergency medical hotline support" },
  { bn: "অগ্রাধিকার ভিত্তিতে অ্যাম্বুলেন্স ডিসপ্যাচ ও ডিসকাউন্ট", en: "Priority ambulance dispatch and discount" },
  { bn: "শীর্ষ হাসপাতালে ভর্তি ও কেস ফলোআপ", en: "Admission and case follow-up at top hospitals" },
  { bn: "পরিবারের মনোনীত সদস্যের সঙ্গে সার্বক্ষণিক লিয়াজোঁ", en: "Round-the-clock liaison with your nominated family member" },
  { bn: "ল্যাব টেস্ট ও ওষুধ সংগ্রহের হোম ডেলিভারি সমন্বয়", en: "Home delivery coordination for lab tests and medicines" },
];

export const INSURANCE_BENEFITS = [
  { bn: "হাসপাতাল ভর্তি ও অপারেশন ব্যয়ের ক্যাশলেস কভারেজ", en: "Cashless coverage for hospital admission and surgery" },
  { bn: "দুর্ঘটনাজনিত জরুরি চিকিৎসা ও আইসিইউ সুরক্ষা", en: "Emergency accident care and ICU protection" },
  { bn: "প্রবাসী ও বাংলাদেশে থাকা পরিবারের সদস্যদের জন্য প্রযোজ্য", en: "Applicable to expatriates and family members in Bangladesh" },
  { bn: "বীমা ক্লেইম প্রসেসিং ও ডকুমেন্টেশনে শতভাগ সহায়তা", en: "Full assistance with claim processing and documentation" },
];

export const TRUST_PILLARS = [
  { bn: "বিশ্বাসযোগ্য সেবা", en: "Trusted Care" },
  { bn: "২৪/৭ জরুরি সহায়তা", en: "24/7 Emergency Help" },
  { bn: "হাসপাতাল সমন্বয়", en: "Hospital Coordination" },
  { bn: "স্বচ্ছ প্রক্রিয়া", en: "Transparent Process" },
  { bn: "পরিবারের পাশে", en: "Beside Your Family" },
].map((item, i) => ({
  ...item,
  d: [
    { bn: "প্রবাসীদের বিশ্বস্ত স্বাস্থ্য সহচর", en: "A trusted health companion for expatriates" },
    { bn: "দিন-রাত সার্বক্ষণিক সক্রিয় সাপোর্ট", en: "Active support day and night" },
    { bn: "দেশের শীর্ষ হাসপাতালের সাথে পার্টনারশিপ", en: "Partnership with leading hospitals" },
    { bn: "কোনো গোপন চার্জ বা বাড়তি ফি নেই", en: "No hidden charges or extra fees" },
    { bn: "আন্তরিক মমতায় সার্বক্ষণিক তত্ত্বাবধান", en: "Compassionate round-the-clock supervision" },
  ][i],
}));

export const PARTNER_STEPS = [
  {
    step: { bn: "১", en: "1" },
    title: { bn: "তথ্য ও NID নম্বর দিন", en: "Provide Details & NID Number" },
    desc: { bn: "আপনার নাম, মোবাইল নম্বর, NID নং ও গাড়ির রেজিস্ট্রেশন নম্বর প্রদান করুন।", en: "Provide your name, mobile number, NID number and vehicle registration number." },
  },
  {
    step: { bn: "২", en: "2" },
    title: { bn: "NID ও লাইসেন্সের ছবি তুলুন", en: "Take NID & Licence Photos" },
    desc: { bn: "মোবাইলের ক্যামেরা দিয়ে আপনার NID কার্ডের সামনের ও পেছনের পাতার পরিষ্কার ছবি তুলুন।", en: "Use your phone camera to take clear photos of both sides of your NID card." },
  },
  {
    step: { bn: "৩", en: "3" },
    title: { bn: "যাচাই ও অ্যাকাউন্ট চালু", en: "Verification & Activation" },
    desc: { bn: "তথ্য যাচাইয়ের পর আমাদের অ্যাডমিন টিম দ্রুত আপনার পার্টনার অ্যাকাউন্ট সক্রিয় করে নেবে।", en: "After verification, our admin team will quickly activate your partner account." },
  },
  {
    step: { bn: "৪", en: "4" },
    title: { bn: "নিয়মিত ট্রিপ পান", en: "Get Regular Trips" },
    desc: { bn: "আপনার সার্ভিস এলাকার রোগীদের সঙ্গে সরাসরি যোগাযোগ করে ২৪ ঘণ্টা কাজ করার সুযোগ পাবেন।", en: "Connect directly with patients in your service area and get 24-hour work opportunities." },
  },
];

export const PARTNER_TERMS = [
  { bn: "রোগী ও তার পরিবারের সঙ্গে সর্বদা সম্মানজনক ও মানবিক ব্যবহার করতে হবে।", en: "Always treat patients and their families with respect and humanity." },
  { bn: "নির্ধারিত ন্যায্য ভাড়ার বাইরে অতিরিক্ত কোনো অযৌক্তিক টাকা দাবি করা যাবে না।", en: "Do not demand any unfair extra payment beyond the agreed fare." },
  { bn: "জরুরি অবস্থায় দ্রুততম সময়ে রোগীর লোকেশনে পৌঁছানোর সর্বোচ্চ চেষ্টা করতে হবে।", en: "Make every effort to reach the patient as quickly as possible in an emergency." },
  { bn: "রোগীর নিরাপত্তা, গোপনীয়তা ও অক্সিজেন/যন্ত্রপাতির কার্যকারিতা নিশ্চিত রাখতে হবে।", en: "Ensure patient safety, privacy and the proper working of oxygen and equipment." },
  { bn: "কাগজপত্র (লাইসেন্স, ফিটনেস, রেজিস্ট্রেশন) সঠিক ও হালনাগাদ থাকতে হবে।", en: "Keep licence, fitness and registration documents valid and up to date." },
];

export const TRACKING_STEPS_AMB = [
  { key: "requested", title: { bn: "অনুরোধ গ্রহণ", en: "Request Received" }, desc: { bn: "বুকিং অনুরোধ গ্রহণ করা হয়েছে, অফিস থেকে যাচাই চলছে।", en: "Booking request received and office verification is in progress." } },
  { key: "confirmed", title: { bn: "বুকিং নিশ্চিত", en: "Booking Confirmed" }, desc: { bn: "রোগীর অবস্থা ও গন্তব্য অনুযায়ী গাড়ি কনফার্ম করা হয়েছে।", en: "Vehicle confirmed based on the patient's condition and destination." } },
  { key: "driver_assigned", title: { bn: "ড্রাইভার বরাদ্দ", en: "Driver Assigned" }, desc: { bn: "চালক ও নির্দিষ্ট অ্যাম্বুলেন্স গাড়ি প্রস্তুত করা হয়েছে।", en: "Driver and the assigned ambulance are ready." } },
  { key: "on_the_way", title: { bn: "চালক রওনা হয়েছেন", en: "Driver On The Way" }, desc: { bn: "চালক আপনার পিকআপ ঠিকানার উদ্দেশ্যে রওনা দিয়েছেন।", en: "The driver has started toward your pickup address." } },
  { key: "picked_up", title: { bn: "রোগী তোলা হয়েছে", en: "Patient Picked Up" }, desc: { bn: "রোগীকে গাড়িতে তোলা হয়েছে এবং হাসপাতালের পথে যাত্রা শুরু।", en: "The patient has been picked up and the journey to hospital has begun." } },
  { key: "completed", title: { bn: "যাত্রা সম্পন্ন", en: "Journey Completed" }, desc: { bn: "রোগীকে নিরাপদে গন্তব্য হাসপাতালে পৌঁছে দেওয়া হয়েছে।", en: "The patient has been safely delivered to the destination hospital." } },
];

export const SAMPLE_TRACK_IDS = [
  { id: "DH-AMB-20261120-001", label: { bn: "ICU অ্যাম্বুলেন্স (নিশ্চিত)", en: "ICU Ambulance (Confirmed)" } },
  { id: "DH-AMB-20261119-003", label: { bn: "সাধারণ অ্যাম্বুলেন্স (সম্পন্ন)", en: "General Ambulance (Completed)" } },
  { id: "DH-APT-20261122-001", label: { bn: "ডাক্তার সিরিয়াল (গাইনি)", en: "Doctor Serial (Gynecology)" } },
  { id: "01712345678", label: { bn: "মোবাইল নম্বর দ্বারা ট্র্যাক", en: "Track by Mobile Number" } },
];

export const CATALOG_TAGS = [
  { label: { bn: "মেডিসিন", en: "Medicine" }, val: "medicin" },
  { label: { bn: "অ্যাম্বুলেন্স", en: "Ambulance" }, val: "ambolence" },
  { label: { bn: "ডাক্তার সিরিয়াল", en: "Doctor Serial" }, val: "dockter" },
  { label: { bn: "ICU কেয়ার", en: "ICU Care" }, val: "icu" },
  { label: { bn: "অক্সিজেন", en: "Oxygen" }, val: "oxygen" },
  { label: { bn: "হৃদরোগ", en: "Heart Care" }, val: "cardio" },
  { label: { bn: "হাসপাতাল বেড", en: "Hospital Bed" }, val: "hospatal" },
];

export const TOP_SERVICE_MATCHES = {
  ambulance: {
    title: { bn: "🚨 জরুরি অ্যাম্বুলেন্স সার্ভিস (AC, অক্সিজেন, ICU, NICU)", en: "🚨 Emergency Ambulance Service (AC, Oxygen, ICU, NICU)" },
    desc: { bn: "সারা দেশে ১৫-২৫ মিনিটের মধ্যে দ্রুততম সময়ে অ্যাম্বুলেন্স প্রেরণ। লাইভ জিপিএস ট্র্যাকিং ও সাশ্রয়ী ভাড়া।", en: "Fastest ambulance dispatch across Bangladesh within 15-25 minutes, with live GPS tracking and affordable fares." },
    ctaText: { bn: "অনলাইনে অ্যাম্বুলেন্স বুক করুন", en: "Book Ambulance Online" },
    badge: { bn: "জরুরি সেবা শীর্ষ ম্যাচ", en: "Top Match: Emergency Service" },
  },
  medicine: {
    title: { bn: "💊 মেডিসিন ও স্পেশালিস্ট কনসালটেশন সার্ভিস", en: "💊 Medicine & Specialist Consultation" },
    desc: { bn: "একুশে পদকপ্রাপ্ত অধ্যাপক ও সিনিয়র মেডিসিন কনসালট্যান্টদের চেম্বার সিরিয়াল, প্রেসক্রিপশন ও ফলোআপ সহায়তা।", en: "Chamber serials, prescriptions and follow-up support from senior medicine consultants and professors." },
    ctaText: { bn: "মেডিসিন ডাক্তার সিরিয়াল নিন", en: "Book a Medicine Specialist" },
    badge: { bn: "মেডিসিন সেবা শীর্ষ ম্যাচ", en: "Top Match: Medicine" },
  },
  doctor: {
    title: { bn: "🩺 বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট ও সিরিয়াল বুকিং", en: "🩺 Specialist Doctor Appointment & Serial Booking" },
    desc: { bn: "নিউরো, হৃদরোগ, মেডিসিন, সার্জারি, শিশু ও গাইনি বিভাগের শীর্ষ অধ্যাপকদের নিশ্চিত সিরিয়াল ও রুম তথ্য।", en: "Confirmed serials and room details for top professors in neuro, cardiology, medicine, surgery, pediatrics and gynecology." },
    ctaText: { bn: "সরাসরি সিরিয়াল বুক করুন", en: "Book a Serial Now" },
    badge: { bn: "ডাক্তার সেবা শীর্ষ ম্যাচ", en: "Top Match: Doctor" },
  },
  hospital: {
    title: { bn: "🏥 হাসপাতাল ভর্তি, কেবিন ও আইসিইউ (ICU) সমন্বয়", en: "🏥 Hospital Admission, Cabin & ICU Coordination" },
    desc: { bn: "এভারকেয়ার, স্কয়ার, ল্যাবএইড, ইউনাইটেড সহ শীর্ষ হাসপাতালের খালি বেড অনুসন্ধান ও কয়তলায় কোন রুম আছে গাইড।", en: "Find available beds and floor-wise room details at top hospitals including Evercare, Square, Labaid and United." },
    ctaText: { bn: "হাসপাতাল তালিকা ও বেড দেখুন", en: "View Hospitals & Beds" },
    badge: { bn: "হাসপাতাল শীর্ষ ম্যাচ", en: "Top Match: Hospital" },
  },
  icu: {
    title: { bn: "⚡ জরুরি ICU লাইফ সাপোর্ট অ্যাম্বুলেন্স ও বেড সমন্বয়", en: "⚡ Emergency ICU Life Support & Bed Coordination" },
    desc: { bn: "ভেন্টিলেটর ও সার্বক্ষণিক প্যারামেডিক সহ ক্রিটיק্যাল কেয়ার অ্যাম্বুলেন্স এবং হাসপাতালে সরাসরি ICU কেবিন বুকিং।", en: "Critical care ambulance with ventilator and paramedic, plus direct ICU cabin booking at hospitals." },
    ctaText: { bn: "ICU অ্যাম্বুলেন্স বুক করুন", en: "Book ICU Ambulance" },
    badge: { bn: "ICU লাইফ সাপোর্ট ম্যাচ", en: "ICU Life Support Match" },
  },
  oxygen: {
    title: { bn: "💨 সেন্ট্রাল অক্সিজেন অ্যাম্বুলেন্স ও শ্বাসকষ্ট জরুরি কেয়ার", en: "💨 Central Oxygen Ambulance & Emergency Breathing Care" },
    desc: { bn: "হাই-ফ্লো সেন্ট্রাল অক্সিজেন সিলিন্ডার, ফ্লোমিটার ও মাস্ক সহ দ্রুততম অ্যাম্বুলেন্স সেবা।", en: "Fastest ambulance service with high-flow central oxygen cylinder, flowmeter and mask." },
    ctaText: { bn: "অক্সিজেন অ্যাম্বুলেন্স নিন", en: "Get Oxygen Ambulance" },
    badge: { bn: "অক্সিজেন সেবা ম্যাচ", en: "Oxygen Service Match" },
  },
};

export const HOME_SPECIALTIES = [
  ["General Physician", "Primary Care Physician", "সাধারণ স্বাস্থ্য ও মেডিসিন", "প্রাথমিক স্বাস্থ্য সেবা"],
  ["Pediatrics", "Child Health Care", "শিশুরোগ বিশেষজ্ঞ", "শিশু স্বাস্থ্য সেবা"],
  ["Gynae & Obs", "Women's Health Care", "মহিলা ও প্রসূতিরোগ", "নারী স্বাস্থ্য সেবা"],
  ["Dermatology", "Skin, Hair & Sexual Health", "চর্ম, যৌন ও এলার্জি", "ত্বক, চুল ও যৌন স্বাস্থ্য"],
  ["Internal Medicine", "General Health & Medicine", "ইন্টারনাল মেডিসিন", "সাধারণ স্বাস্থ্য ও মেডিসিন"],
  ["Endocrinology", "Diabetes, Thyroid & Hormone", "ডায়াবেটিস ও হরমোন", "ডায়াবেটিস, থাইরয়েড ও হরমোন"],
  ["Neurology", "Brain, Spine & Nerve", "ব্রেইন ও নিউরোলজি", "মস্তিষ্ক, মেরুদণ্ড ও স্নায়ু"],
  ["Gastroenterology", "Stomach, Liver & Gut", "গ্যাস্ট্রো ও পরিপাকতন্ত্র", "পেট, যকৃত ও পরিপাকতন্ত্র"],
  ["Cardiology", "Heart Disease & Vascular", "হৃদরোগ ও কার্ডিওলজি", "হৃদরোগ ও রক্তনালী"],
  ["Urology", "Urinary Bladder & Kidney", "কিডনি ও ইউরোলজি", "মূত্রাশয় ও কিডনি"],
  ["Food & Nutrition", "Healthy Diet Guidance", "পুষ্টি ও ডায়েট চার্ট", "স্বাস্থ্যকর খাদ্য পরামর্শ"],
  ["Dentistry", "Teeth, Gum & Oral Care", "দাঁত ও মুখগহ্বর", "দাঁত, মাড়ি ও মুখ স্বাস্থ্য"],
  ["Psychiatry", "Mental & Emotional Health", "মানসিক রোগ ও বিষণ্নতা", "মানসিক ও আবেগ স্বাস্থ্য"],
  ["Psychology", "Counseling & Therapy", "কাউন্সেলিং ও সাইকোলজি", "কাউন্সেলিং ও থেরাপি"],
  ["Orthopedics", "Bone, Muscle & Joint Care", "হাড়, বাতব্যথা ও জয়েন্ট", "হাড়, পেশী ও জয়েন্ট"],
].map(([name, sub, bn, subBn]) => ({ name, sub, bn, subBn }));

export const HEALTH_CONCERNS = [
  ["Fever, Cold/Flu, Allergy", "জ্বর, সর্দি, কাশি ও অ্যালার্জি", "48", "৪৮"],
  ["Child Health & Diseases", "শিশুর জ্বর, পেটব্যথা ও বমি", "32", "৩২"],
  ["Period & Gyne Issues", "মাসিকের সমস্যা ও গর্ভকালীন যত্ন", "36", "৩৬"],
  ["Skin, Acne & Hair Fall", "ব্রণ, চুল পড়া ও চুলকানি", "29", "২৯"],
  ["Acidity, Gas & Diarrhea", "গ্যাস, বুকজ্বালা ও বদহজম", "41", "৪১"],
  ["Diabetes & High BP", "ডায়াবেটিস, প্রেসার ও থাইরয়েড", "35", "৩৫"],
  ["Urine Infection or Pain", "প্রস্রাবে জ্বালাপোড়া ও ইনফেকশন", "22", "২২"],
  ["Back Pain & Joint Ache", "কোমর, হাঁটু ও জয়েন্ট ব্যথা", "25", "২৫"],
].map(([title, bn, count, countBn]) => ({ title, bn, count, countBn }));

export const DOCTOR_SPECIALTIES = {
  "Child Specialist": "শিশু বিশেষজ্ঞ",
  "Gynecologist & Obstetrician": "স্ত্রী ও প্রসূতি বিশেষজ্ঞ",
  "Dermatologist & Skin Specialist": "চর্ম বিশেষজ্ঞ",
  "Psychiatrist & Neuro Specialist": "মানসিক ও নিউরো বিশেষজ্ঞ",
};

export const DOCTOR_EXPERIENCE = {
  "12+ Yrs Experience": "১২+ বছরের অভিজ্ঞতা",
  "10+ Yrs Experience": "১০+ বছরের অভিজ্ঞতা",
  "9+ Yrs Experience": "৯+ বছরের অভিজ্ঞতা",
  "15+ Yrs Experience": "১৫+ বছরের অভিজ্ঞতা",
};

export const HEALTH_PLANS = [
  {
    name: { bn: "Jotno (যত্ন)", en: "Jotno (Care)" },
    price: "1,000+",
    period: { bn: "/মাসিক", en: "/monthly" },
    target: { bn: "১ জন", en: "1 Person" },
    features: [
      { bn: "BMDC সাধারণ চিকিৎসকের সাথে ২টি ফ্রি পরামর্শ", en: "Free 2 consultations with BMDC General Physician" },
      { bn: "বিশেষজ্ঞ পরামর্শে ৫% ছাড়", en: "5% discount on Specialist Doctor consultation" },
      { bn: "ডিজিটাল স্বাস্থ্য রেকর্ড ও প্রেসক্রিপশন ভল্ট", en: "Digital Health Record & Prescription Vault" },
    ],
  },
  {
    name: { bn: "Astha (আস্থা)", en: "Astha (Trust)" },
    price: "1,500+",
    period: { bn: "/মাসিক", en: "/monthly" },
    target: { bn: "১ জন", en: "1 Person" },
    popular: true,
    features: [
      { bn: "BMDC সাধারণ চিকিৎসকের সাথে ৪টি ফ্রি পরামর্শ", en: "Free 4 consultations with BMDC General Physician" },
      { bn: "বিশেষজ্ঞ পরামর্শে ১০% ছাড়", en: "10% discount on Specialist Doctor consultation" },
      { bn: "বাসায় নমুনা সংগ্রহের ফ্রি সমন্বয়", en: "Free Home Diagnostic sample collection coordination" },
      { bn: "ডিজিটাল স্বাস্থ্য রেকর্ড ও প্রেসক্রিপশন ভল্ট", en: "Digital Health Record & Prescription Vault" },
    ],
  },
  {
    name: { bn: "Aponjon (আপনজন)", en: "Aponjon (Family)" },
    price: "2,500+",
    period: { bn: "/মাসিক", en: "/monthly" },
    target: { bn: "৪ জনের জন্য (পরিবার)", en: "For 4 persons (Family)" },
    features: [
      { bn: "BMDC সাধারণ চিকিৎসকের সাথে ৬টি ফ্রি পরামর্শ", en: "Free 6 consultations with BMDC General Physician" },
      { bn: "বিশেষজ্ঞ পরামর্শে ১০% ছাড়", en: "10% discount on Specialist Doctor consultation" },
      { bn: "এক সাবস্ক্রিপশনে পুরো পরিবার কভারেজ", en: "Full family coverage under 1 single subscription" },
      { bn: "বার্ষিক স্বাস্থ্য পরীক্ষার সমন্বয়", en: "Annual health checkup coordination" },
    ],
  },
  {
    name: { bn: "Momota (মমতা - প্রবাসী ও মা-বাবা কেয়ার)", en: "Momota (Parents & Expatriate Care)" },
    price: "3,500+",
    period: { bn: "/মাসিক", en: "/monthly" },
    target: { bn: "মা-বাবা ও বয়োবৃদ্ধদের জন্য", en: "For Parents & Elders" },
    features: [
      { bn: "BMDC সাধারণ চিকিৎসকের সাথে ৬টি ফ্রি পরামর্শ", en: "Free 6 consultations with BMDC General Physician" },
      { bn: "মা-বাবার জন্য মাসে ২টি নির্ধারিত অনলাইন স্বাস্থ্য কল", en: "Monthly 2 scheduled online health screening calls for parents" },
      { bn: "বাসায় ওষুধ ও ল্যাব টেস্ট সমন্বয়", en: "Doorstep Medicine & Lab Test Coordination" },
      { bn: "প্রবাসী পরিবারের জন্য ডেডিকেটেড কেয়ার অফিসার", en: "Dedicated Care Officer for Expatriate Families" },
    ],
  },
];

export const INSURANCE_GUIDE = [
  {
    title: { bn: "সরকারি স্বাস্থ্য বীমা (Shasthya Bima)", en: "Government Health Insurance (Shasthya Bima)" },
    type: { bn: "জেলা/উপজেলা ভিত্তিক সামাজিক স্বাস্থ্য সুরক্ষা", en: "District/upazila-based social health protection" },
    detail: { bn: "কম প্রিমিয়ামে পরিবারের জন্য হাসপাতাল চিকিৎসা ও চিকিৎসা খরচে সহায়তা পাওয়া যায়। নিবন্ধন সাধারণত উপজেলা/জেলা অফিস বা নির্ধারিত ব্যাংকের মাধ্যমে হয়।", en: "Low-premium hospital and medical expense support for families. Registration is usually done through upazila/district offices or designated banks." },
    note: { bn: "প্রয়োজন: NID, জন্ম নিবন্ধন, ঠিকানা প্রমাণ ও পরিবারের সদস্যদের তথ্য।", en: "Required: NID, birth registration, address proof and family member details." },
  },
  {
    title: { bn: "বেসরকারি হেলথ পলিসি (Jotno, Astha, Aponjon, Momota)", en: "Private Health Policy (Jotno, Astha, Aponjon, Momota)" },
    type: { bn: "মাসিক/বার্ষিক প্রিমিয়াম, নেটওয়ার্ক হাসপাতালে ক্যাশলেস বা রিইম্বার্সমেন্ট", en: "Monthly/annual premium, cashless or reimbursement at network hospitals" },
    detail: { bn: "পলিসিতে সাধারণত ওয়েটিং পিরিয়ড, বছরের সর্বোচ্চ কভারেজ, রুম ভাড়ার সীমা ও বাদ দেওয়া রোগের তালিকা থাকে। অসুস্থ হওয়ার আগে পলিসি নেওয়া ভালো।", en: "Policies usually include waiting periods, annual coverage limits, room rent limits and exclusions. It is best to buy before becoming ill." },
    note: { bn: "প্রয়োজন: পলিসি নম্বর, NID, পূর্বের চিকিৎসা ইতিহাস ও মনোনীত হাসপাতালের তালিকা।", en: "Required: policy number, NID, medical history and nominated hospital list." },
  },
  {
    title: { bn: "জীবন বীমার হেল� রাইডার", en: "Health Rider with Life Insurance" },
    type: { bn: "মূল জীবন বীমার সাথে অতিরিক্ত স্বাস্থ্য কভারেজ", en: "Additional health coverage with a main life policy" },
    detail: { bn: "হাসপাতালে ভর্তি, অস্ত্রোপচার ও গুরুতর অসুস্থতায় নির্ধারিত পরিমাণ টাকা পাওয়া যায়। কভারেজ শর্ত ভিন্ন হয়, তাই পলিসি ডকুমেন্ট পড়ে নিন।", en: "Fixed benefits are available for hospital admission, surgery and critical illness. Coverage terms vary, so read the policy document." },
    note: { bn: "প্রয়োজন: মূল পলিসি, রাইডার স্লিপ, প্রিমিয়াম রিসিট ও ক্লেইম ফর্ম।", en: "Required: main policy, rider slip, premium receipt and claim form." },
  },
];

export const INSURANCE_STEPS = [
  {
    n: { bn: "০১", en: "01" },
    title: { bn: "পলিসি তুলুন", en: "Compare Policies" },
    text: { bn: "প্রিমিয়াম, ওয়েটিং পিরিয়ড, কভারেজ সীমা ও পরিবারের কতজন অন্তর্ভুক্ত হবেন দেখুন।", en: "Compare premium, waiting period, coverage limits and how many family members are included." },
  },
  {
    n: { bn: "০২", en: "02" },
    title: { bn: "নিবন্ধন করুন", en: "Register" },
    text: { bn: "NID/জন্ম নিবন্ধন ও স্বাস্থ্য তথ্য দিয়ে আবেদন জমা দিন।", en: "Submit your application with NID/birth registration and health information." },
  },
  {
    n: { bn: "০৩", en: "03" },
    title: { bn: "চিকিৎসা নিন", en: "Get Treatment" },
    text: { bn: "নেটওয়ার্ক হাসপাতালে ক্যাশলেস অথবা বিল সংরক্ষণ করে রিইম্বার্সমেন্ট চান।", en: "Use cashless treatment at a network hospital or keep bills for reimbursement." },
  },
  {
    n: { bn: "০৪", en: "04" },
    title: { bn: "ক্লেইম ও নবায়ন", en: "Claim & Renew" },
    text: { bn: "বিল, প্রেসক্রিপশন ও ডিসচার্জ সামারি সহ ক্লেইম করে পলিসি সময়মতো নবায়ন করুন।", en: "Claim with bills, prescriptions and discharge summary, then renew on time." },
  },
];

export const DISTRICT_QUICK_SEARCHES = [
  { bn: "কুমিল্লা", en: "Cumilla" },
  { bn: "Comilla", en: "Comilla" },
  { bn: "Cumilla", en: "Cumilla" },
  { bn: "ঢাকা", en: "Dhaka" },
  { bn: "চট্টগ্রাম", en: "Chattogram" },
  { bn: "সিলেট", en: "Sylhet" },
  { bn: "রাজশাহী", en: "Rajshahi" },
  { bn: "খুলনা", en: "Khulna" },
];
