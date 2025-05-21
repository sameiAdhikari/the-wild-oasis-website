import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
// import DateSelector from "@/app/_components/DateSelector";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `cabin ${name}` };
}

export async function generateStaticParams({ params }) {
  noStore();
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // second approach for faster load data because this has a lots of asynchronous function
  // const [cabin,settings,bookedDates] new Promise.All([getCabin(param.cabinId),getBookedDatesByCabinId(params.cabinId),getSettings()])

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
