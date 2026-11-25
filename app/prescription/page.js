import { FileSpreadsheet } from "lucide-react";
import PageHead from "@/components/PageHead";
import PrescriptionStudio from "@/components/PrescriptionStudio";
import { BASE_URL } from "@/lib/seoHelper";

export const metadata = {
  title: "প্রেসক্রিপশন OCR ও ঔষধ সময়সূচি টেবিল | D H Medical Support",
  description:
    "প্রেসক্রিপশনের ছবি আপলোড করে বাংলা/ইংরেজি OCR দিয়ে ঔষধ, কোম্পানি, খাওয়ার সময় ও দিন আলাদা করুন। CSV ডাউনলোড ও বিদেশে থাকা স্বজনের সাথে শেয়ার করুন।",
  alternates: {
    canonical: `${BASE_URL}/prescription`,
  },
};

export default function PrescriptionPage({ searchParams }) {
  return (
    <>
      <PageHead
        Icon={FileSpreadsheet}
        title={{ bn: "প্রেসক্রিপশন থেকে ঔষধের সময়সূচি", en: "Medicine Schedule from Prescription" }}
        sub={{ bn: "ছবি আপলোড করুন অথবা ম্যানুয়ালি লিখুন — ডাক্তার, ঔষধ, কোম্পানি, সময় ও দিনের Excel-স্টাইল টেবিল পেয়ে যাবেন।", en: "Upload an image or type manually — get an Excel-style table of doctor, medicine, company, times and days." }}
      />
      <PrescriptionStudio shareCode={searchParams.share || ""} />
    </>
  );
}
