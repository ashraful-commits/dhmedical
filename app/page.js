import HomeClient from "@/components/HomeClient";
import { getList } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const hospitals = await getList("hospitals", 8);
  const doctors = await getList("doctors", 4);
  const reviews = await getList("feedback", 3);

  return (
    <HomeClient
      initialDoctors={doctors}
      initialHospitals={hospitals}
      initialReviews={reviews}
    />
  );
}
