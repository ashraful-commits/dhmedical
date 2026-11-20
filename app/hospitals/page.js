import { Building2 } from "lucide-react";
import PageHead from "@/components/PageHead";
import Catalog from "@/components/Catalog";
export const metadata = { title: "হাসপাতাল ও ডায়াগনস্টিক | D H Medical Support" };

export default function Hospitals({ searchParams }) {
  return (<><PageHead Icon={Building2} title="হাসপাতাল ও ডায়াগনস্টিক" sub="ভর্তি, কেবিন, ICU ও পরীক্ষা — সমন্বয়ে আমরা পাশে আছি।" /><Catalog kind="hospitals" q0={searchParams.q || ""} /></>);
}
