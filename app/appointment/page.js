import { CalendarCheck } from "lucide-react";
import PageHead from "@/components/PageHead";
import DynamicForm from "@/components/DynamicForm";
import { appointmentFields } from "@/lib/forms";
import { BASE_URL } from "@/lib/seoHelper";

export const metadata = {
  title: "ডাক্তারের অ্যাপয়েন্টমেন্ট ও সিরিয়াল বুকিং | D H Medical Support",
  description:
    "মেডিসিন, হৃদরোগ, নিউরো, সার্জারি, শিশু ও গাইনি বিশেষজ্ঞ ডাক্তারদের অ্যাপয়েন্টমেন্ট সিরিয়াল নিন। দ্রুত নিশ্চিতকরণ কোড ও সময়সূচি।",
  keywords: [
    "doctor appointment bangladesh",
    "doctor serial bd",
    "ডাক্তার অ্যাপয়েন্টমেন্ট",
    "ডাক্তারের সিরিয়াল",
    "dockter serial",
    "medicin appointment",
  ],
  alternates: {
    canonical: `${BASE_URL}/appointment`,
  },
};

export default function Appointment({ searchParams: s }) {
  const initial = { doctorName: s.doctor || "", hospitalName: s.hospital || "", specialty: s.sp || "" };
  return (
    <>
      <PageHead Icon={CalendarCheck} title="ডাক্তারের অ্যাপয়েন্টমেন্ট" sub="তথ্য দিন, আমরা সিরিয়াল নিশ্চিত করে আপনাকে জানাব।" />
      <div className="wrap max-w-3xl py-10 sm:py-14 lg:py-16">
        <DynamicForm type="appointments" fields={appointmentFields} initial={initial} submit="অ্যাপয়েন্টমেন্ট অনুরোধ পাঠান" />
      </div>
    </>
  );
}
