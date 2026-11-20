import { Stethoscope } from "lucide-react";
import PageHead from "@/components/PageHead";
import Catalog from "@/components/Catalog";
export const metadata = { title: "ডাক্তার খুঁজুন | D H Medical Support" };

export default function Doctors({ searchParams }) {
  return (<><PageHead Icon={Stethoscope} title="ডাক্তার খুঁজুন" sub="বিভাগ বা নাম দিয়ে খুঁজুন, তারপর অ্যাপয়েন্টমেন্ট নিন।" /><Catalog kind="doctors" q0={searchParams.q || ""} sp0={searchParams.sp || ""} /></>);
}
