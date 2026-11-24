"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  bn: {
    // Top Nav
    nav_consultation: "ডাক্তার",
    nav_ambulance: "অ্যাম্বুলেন্স ২৪/৭",
    nav_diagnostic: "হোম ডায়াগনস্টিক",
    nav_plans: "হেলথ প্ল্যান",
    nav_track: "ট্র্যাকিং",
    nav_more: "আরো সেবা",
    nav_hospitals: "হাসপাতাল ও বেড",
    nav_join_doctor: "ডাক্তার হিসেবে যুক্ত হোন",
    nav_join_ambulance: "অ্যাম্বুলেন্স পার্টনার",
    nav_feedback: "ফিডব্যাক ও সাপোর্ট",
    nav_admin: "অ্যাডমিন পোর্টাল",
    nav_call: "জরুরি কল",
    nav_book_amb: "অ্যাম্বুলেন্স বুক",
    
    // Top Search Bar
    search_placeholder: "ডাক্তারের নাম, বিশেষজ্ঞ বিভাগ, অ্যাম্বুলেন্স বা টেস্ট খুঁজুন...",
    search_btn: "খুঁজুন",
    popular_label: "জনপ্রিয়:",
    
    // Hero Banner
    hero_badge: "বাংলাদেশের এক নম্বর সেন্ট্রাল মেডিকেল ও অ্যাম্বুলেন্স নেটওয়ার্ক",
    hero_title: "১৮০০+ বিশেষজ্ঞ ডাক্তার ও জরুরি অ্যাম্বুলেন্স ডিসপ্যাচ",
    hero_sub: "প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা। ঘরে বসেই ১০ মিনিটে BMDC রেজিস্টার্ড ডাক্তারের ভিডিও পরামর্শ এবং জরুরি মুহূর্তে ১৫-২৫ মিনিটে দ্রুততম এম্বুলেন্স সেবা।",
    hero_trust_1: "সকল ডাক্তার BMDC অনুমোদিত ও অভিজ্ঞ কনসালট্যান্ট",
    hero_trust_2: "৮২,০০০+ রোগীর গড় সন্তুষ্টি রেটিং ৪.৯/৫",
    hero_trust_3: "সারাদেশে ৩৭+ বিশেষায়িত চিকিৎসা বিভাগে সেবা",
    hero_trust_4: "৬৪ জেলায় ১৫-২৫ মিনিটে দ্রুততম অ্যাম্বুলেন্স প্রেরণ",
    hero_cta_doctor: "ডাক্তার পরামর্শ নিন",
    hero_cta_ambulance: "অ্যাম্বুলেন্স বুক করুন",
    hero_floating_badge: "৮২০,০০০+ পরিবার আশ্রিত",
    
    // 4 Service Pillars
    srv_video_title: "লাইভ ভিডিও কনসালটেশন",
    srv_video_desc: "ঘরে বসেই অভিজ্ঞ বিশেষজ্ঞ ডাক্তারের সরাসরি ভিডিও পরামর্শ বা চেম্বার সিরিয়াল নিন।",
    srv_amb_title: "জরুরি অ্যাম্বুলেন্স ২৪/৭",
    srv_amb_desc: "সাধারণ এসি, অক্সিজেন, আইসিইউ ও নবজাতক অ্যাম্বুলেন্স ১৫-২৫ মিনিটে পৌঁছায়।",
    srv_diag_title: "হোম ডায়াগনস্টিক টেস্ট",
    srv_diag_desc: "ল্যাব টেকনোলজিস্ট বাসায় এসে রক্তের স্যাম্পল নেবেন এবং ২৪ ঘণ্টায় ডিজিটাল রিপোর্ট।",
    srv_family_title: "প্রবাসী ও ফ্যামিলি কেয়ার",
    srv_family_desc: "প্রবাসে থাকা ভাইয়ের দেশে অসুস্থ পরিবারের সার্বক্ষণিক চিকিৎসা তত্ত্বাবধান ও সুরক্ষা।",
    
    // Specialties
    sp_title: "Available specialties",
    sp_heading: "৩৬+ বিশেষায়িত ক্লিনিক্যাল বিভাগ",
    sp_sub: "যে কোনো স্বাস্থ্য সমস্যায় অভিজ্ঞ বিশেষজ্ঞ ডাক্তারের সরাসরি পরামর্শ নিন",
    
    // Common Concerns
    concerns_title: "Common Health Concerns",
    concerns_heading: "সাধারণ স্বাস্থ্য সমস্যা অনুযায়ী ডাক্তার নির্বাচন",
    concerns_view_all: "সব দেখুন",
    
    // Available Doctors
    doc_heading: "Available Doctors",
    doc_online: "৩৮০ জন ডাক্তার এখন অনলাইনে",
    doc_sub: "BMDC অনুমোদিত অভিজ্ঞ চিকিৎসকদের সিরিয়াল ও তাত্ক্ষণিক ভিডিও কল",
    doc_see_btn: "ডাক্তার দেখান",
    doc_fee_label: "ভিজিট ফি",

    // Common Concerns
    concerns_title: "Common Health Concerns",
    concerns_heading: "সাধারণ স্বাস্থ্য সমস্যা অনুযায়ী ডাক্তার নির্বাচন",
    concerns_sub: "আপনার সমস্যা অনুযায়ী উপযুক্ত বিশেষজ্ঞ ডাক্তার খুঁজে নিন",
    concerns_view_all: "সব দেখুন",

    // Hotline
    hotline_heading: "জরুরি প্রয়োজনে আমাদের মেডিকেল টিম ২৪ ঘণ্টা প্রস্তুত",
    hotline_sub: "অ্যাম্বুলেন্স, আইসিইউ বেড বা বিশেষজ্ঞ ডাক্তার সিরিয়ালের যে কোনো জরুরি সহায়তায় কল করুন",
    hotline_call_btn: "কল করুন",

    // Partner Join
    partner_join_title: "আপনি কি একজন রেজিস্টার্ড ডাক্তার বা অ্যাম্বুলেন্স মালিক?",
    partner_join_sub: "বাংলাদেশের শীর্ষস্থানীয় মেডিকেল ও জরুরি নেটওয়ার্কে যুক্ত হোন। আপনার চেম্বার বা অ্যাম্বুলেন্স বহর সংযুক্ত করুন।",
    partner_join_doc: "ডাক্তার হিসেবে যুক্ত হোন",
    partner_join_amb: "অ্যাম্বুলেন্স পার্টনার",
    
    // Protect Plans
    plans_sub: "Healthcare Subscription",
    plans_heading: "ডিএইচ মেডিকেল হেলথ কেয়ার ও প্রটেক্ট প্ল্যান",
    plans_desc: "প্রবাসী পরিবার ও বয়োবৃদ্ধ মা-বাবার জন্য ৳১,০০০+ মাসিক স্বাস্থ্য সাবস্ক্রিপশন ও বীমা গাইড",
    plans_compare: "সকল প্যাকেজের তুলনামূলক বিবরণী দেখুন",
    plans_subscribe: "সাবস্ক্রাইব করুন",
    
    // Home Diagnostic
    diag_badge: "Home Diagnostic Service",
    diag_heading: "বাসার ঠিকানায় রক্তের নমুনা সংগ্রহ (Doorstep Sample)",
    diag_sub: "সহজ টেস্ট বুকিং, দক্ষ টেকনোলজিস্ট এবং ১২-২৪ ঘণ্টার ভেতর ডিজিটাল টেস্ট রিপোর্ট।",
    diag_f1: "বাসা বা অফিস থেকে দ্রুত ও সুবিধাজনক টেস্ট বুকিং",
    diag_f2: "প্রশিক্ষিত মেডিকেল ল্যাব টেকনোলজিস্ট দ্বারা নমুনা সংগ্রহ",
    diag_f3: "ডিজিটাল রিপোর্ট আপনার অ্যাপ ও হোয়াটসঅ্যাপে পৌঁছে দেওয়া",
    diag_location_placeholder: "আপনার এলাকা লিখুন (যেমন: ধানমন্ডি, মিরপুর, উত্তরা, সিলেট...)",
    diag_location_btn: "লোকেশন কনফার্ম করুন",
    
    // Emergency Fleet
    fleet_badge: "24/7 Nationwide Emergency",
    fleet_heading: "সারাদেশে দ্রুততম জরুরি অ্যাম্বুলেন্স বহর",
    fleet_sub: "১৫-২৫ মিনিটে পৌঁছায় সাধারণ এসি, অক্সিজেন, ICU ও নবজাতক (NICU) লাইফ সাপোর্ট গাড়ি",
    fleet_view_all: "সম্পূর্ণ অ্যাম্বুলেন্স তালিকা",
    fleet_base_fare: "বেস ভাড়া",
    fleet_book_now: "বুক করুন",
    
    // Partner Hospitals
    hosp_badge: "Partner Network",
    hosp_heading: "আমাদের পার্টনার হাসপাতাল ও ক্লিনিক",
    hosp_sub: "জরুরি মুহূর্তে আইসিইউ, সিসিইউ, কেবিন ও বিশেষজ্ঞ ডাক্তার সিরিয়াল সমন্বয়",
    hosp_view_all: "সব হাসপাতাল",
    hosp_view_bed: "বেড দেখুন",
    
    // Footer
    footer_tagline: "প্রবাসে আপনি, দেশে পরিবারের পাশে আমরা",
    footer_desc: "২৪ ঘণ্টা জরুরি অ্যাম্বুলেন্স ডিসপ্যাচ, বিশেষজ্ঞ ডাক্তার সিরিয়াল ও হোম ডায়াগনস্টিক সাপোর্ট।",
    footer_hotline_label: "২৪ ঘণ্টা সেন্ট্রাল জরুরি হটলাইন",
    footer_bmdc_badge: "BMDC অনুমোদিত ডাক্তার ও অনুমোদিত অ্যাম্বুলেন্স বহর",
    footer_main_services: "প্রধান সেবা",
    footer_specialties: "বিশেষজ্ঞ বিভাগ",
    footer_partner_menu: "পার্টনার ও হেল্পডেস্ক",
  },
  
  en: {
    // Top Nav
    nav_consultation: "Doctor",
    nav_ambulance: "Ambulance 24/7",
    nav_diagnostic: "Home Diagnostic",
    nav_plans: "Health Plans",
    nav_track: "Tracking",
    nav_more: "More",
    nav_hospitals: "Hospital & ICU Bed",
    nav_join_doctor: "Join as a Doctor",
    nav_join_ambulance: "Ambulance Partner",
    nav_feedback: "Feedback & Support",
    nav_admin: "Admin Portal",
    nav_call: "Emergency Call",
    nav_book_amb: "Book Ambulance",
    
    // Top Search Bar
    search_placeholder: "Search by doctor name/specialty, ambulance or diagnostic test...",
    search_btn: "Search",
    popular_label: "Popular:",
    
    // Hero Banner
    hero_badge: "No. 1 Healthcare & Ambulance Coordination App in Bangladesh",
    hero_title: "1800+ Specialist Doctors & Emergency Ambulance Dispatch",
    hero_sub: "Care Beyond Borders — 24/7 video consultation with BMDC verified doctors and fastest 15-25 minute emergency ambulance dispatch across Bangladesh.",
    hero_trust_1: "All Doctors are BMDC Verified & Reputed Specialists",
    hero_trust_2: "Our doctors are rated 4.9 on average across 82,000+ consults",
    hero_trust_3: "Providing Care Across 37+ Clinical Departments nationwide",
    hero_trust_4: "Fastest Emergency Ambulance Dispatch in 64 Districts",
    hero_cta_doctor: "Consult a Doctor Now",
    hero_cta_ambulance: "Book Ambulance 24/7",
    hero_floating_badge: "820,000+ Patients Served",
    
    // 4 Service Pillars
    srv_video_title: "Live Video Consultation",
    srv_video_desc: "Get instant video consultation with top specialists or schedule your chamber appointment.",
    srv_amb_title: "Emergency Ambulance 24/7",
    srv_amb_desc: "Oxygen, ICU, NICU & AC fleet dispatched across 64 districts in 15-25 minutes.",
    srv_diag_title: "Home Diagnostic Tests",
    srv_diag_desc: "Certified phlebotomists collect blood/urine sample from your doorstep. Fast reports.",
    srv_family_title: "Expatriate & Family Care",
    srv_family_desc: "Comprehensive healthcare and emergency protection for your loved ones in Bangladesh.",
    
    // Specialties
    sp_title: "Available specialties",
    sp_heading: "Explore Doctors from 36+ clinical areas",
    sp_sub: "Consult verified specialists for any health concern anytime, anywhere",
    
    // Common Concerns
    concerns_title: "Common Health Concerns",
    concerns_heading: "Find specialist doctors based on your health symptoms",
    concerns_view_all: "View All",
    
    // Available Doctors
    doc_heading: "Available Doctors",
    doc_online: "380 Doctors Online Now",
    doc_sub: "Schedule or video-call a BMDC-verified specialist instantly",
    doc_see_btn: "See Doctor Now",
    doc_fee_label: "Consultation Fee",

    // Common Concerns
    concerns_title: "Common Health Concerns",
    concerns_heading: "Find specialist doctors based on your health symptoms",
    concerns_sub: "Find the right specialist doctor based on your health symptoms",
    concerns_view_all: "View All",

    // Hotline
    hotline_heading: "Our Medical Team is Ready 24 Hours for Emergency Support",
    hotline_sub: "Call for any urgent assistance — ambulance, ICU bed, or specialist consultation",
    hotline_call_btn: "Call Now",

    // Partner Join
    partner_join_title: "Are You A Qualified Doctor or Ambulance Partner?",
    partner_join_sub: "Join Bangladesh's premier healthcare and emergency network. Connect your chamber or ambulance fleet.",
    partner_join_doc: "Join as Doctor",
    partner_join_amb: "Ambulance Partner",
    
    // Protect Plans
    plans_sub: "Healthcare Subscription",
    plans_heading: "DH Medical Health Care and Protect Plans",
    plans_desc: "Health subscriptions from ৳1,000+/month plus insurance guidance for expatriate families and aging parents",
    plans_compare: "See comparison with all packages",
    plans_subscribe: "Subscribe Now",
    
    // Home Diagnostic
    diag_badge: "Home Diagnostic Service",
    diag_heading: "Sample collection at your Doorstep",
    diag_sub: "Convenient test booking, certified phlebotomists and digital reports within 12-24 hours.",
    diag_f1: "Faster and convenient tests booking from home or office",
    diag_f2: "Certified healthcare professionals safely collect samples",
    diag_f3: "Digital report delivered to your phone & WhatsApp within 24 hours",
    diag_location_placeholder: "Enter your area (e.g. Dhanmondi, Uttara, Mirpur, Sylhet...)",
    diag_location_btn: "Confirm Location",
    
    // Emergency Fleet
    fleet_badge: "24/7 Nationwide Emergency",
    fleet_heading: "Fastest Emergency Ambulance Fleet",
    fleet_sub: "General AC, Oxygen, ICU and NICU life support ambulances dispatched in 15-25 minutes",
    fleet_view_all: "Full Ambulance Fleet",
    fleet_base_fare: "Base Fare",
    fleet_book_now: "Book Now",
    
    // Partner Hospitals
    hosp_badge: "Partner Network",
    hosp_heading: "Our Partner Hospitals & Clinics",
    hosp_sub: "Instant ICU, CCU, VIP cabin bed coordination and top professor serials",
    hosp_view_all: "All Hospitals",
    hosp_view_bed: "View Beds",
    
    // Footer
    footer_tagline: "Care Beyond Borders — With Your Family in Bangladesh",
    footer_desc: "24/7 emergency ambulance dispatch, specialist doctor appointments and home diagnostics.",
    footer_hotline_label: "24-Hour Central Emergency Hotline",
    footer_bmdc_badge: "BMDC Verified Doctors & Certified Emergency Fleet",
    footer_main_services: "Core Services",
    footer_specialties: "Clinical Specialties",
    footer_partner_menu: "Partners & Helpdesk",
  },
};

const LanguageContext = createContext({
  lang: "bn",
  setLang: () => {},
  t: (k) => k,
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("bn");

  // Load language preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dh_lang");
      if (saved === "en" || saved === "bn") {
        setLangState(saved);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("dh_lang", newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      // Ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "bn" ? "en" : "bn");
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations["bn"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "bn",
      setLang: () => {},
      toggleLang: () => {},
      t: (k) => translations["bn"]?.[k] || k,
    };
  }
  return context;
}
