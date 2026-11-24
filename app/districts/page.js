import { MapPin } from "lucide-react";
import PageHead from "@/components/PageHead";
import DistrictExplorer from "@/components/DistrictExplorer";
import { BASE_URL } from "@/lib/seoHelper";

export const metadata = {
  title: "সারা বাংলাদেশ ৬৪ জেলা ও এলাকা গাইড | জেলা, উপজেলা, থানা খুঁজুন",
  description:
    "কুমিল্লা/কমিল্লা সহ সারা বাংলাদেশের ৬৪ জেলা, উপজেলা, থানা ও গ্রাম খুঁজুন। আপনার এলাকায় অ্যাম্বুলেন্স, ডাক্তার ও হাসপাতাল সহায়তা পান।",
  alternates: {
    canonical: `${BASE_URL}/districts`,
  },
};

export default function DistrictsPage({ searchParams }) {
  return (
    <>
      <PageHead
        Icon={MapPin}
        title="জেলা ও এলাকা খুঁজুন"
        sub="লিখুন অথবা নিচ থেকে জেলা বেছে নিন — কুমিল্লা, চট্টগ্রাম, ঢাকা বা যেকোনো উপজেলা/গ্রাম খুঁজে পাবেন।"
      />
      <DistrictExplorer initialQ={searchParams.q || ""} />
    </>
  );
}
