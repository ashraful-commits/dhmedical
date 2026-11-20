import { CalendarCheck } from "lucide-react";
import PageHead from "@/components/PageHead";
import DynamicForm from "@/components/DynamicForm";
import { appointmentFields } from "@/lib/forms";
export const metadata = { title: "ডাক্তারের অ্যাপয়েন্টমেন্ট | D H Medical Support" };

export default function Appointment({ searchParams: s }) {
  const initial = { doctorName: s.doctor || "", hospitalName: s.hospital || "", specialty: s.sp || "" };
  return (
    <>
      <PageHead Icon={CalendarCheck} title="ডাক্তারের অ্যাপয়েন্টমেন্ট" sub="তথ্য দিন, আমরা সিরিয়াল নিশ্চিত করে আপনাকে জানাব।" />
      <div className="wrap max-w-3xl py-6"><DynamicForm type="appointments" fields={appointmentFields} initial={initial} submit="অ্যাপয়েন্টমেন্ট অনুরোধ পাঠান" /></div>
    </>
  );
}
