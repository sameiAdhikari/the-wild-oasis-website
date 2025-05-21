import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "cabins",
};

// export const revalidate = 3600;
// export const revalidate = 0;

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl mb-5 text-accent-400 font-medium">
          Our Luxury Cabins
        </h1>
        <Filter />
      </div>

      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
