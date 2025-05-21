import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  const cabins = await getCabins();
  if (!cabins.length) return null;

  let displayFilter;
  if (filter === "all") displayFilter = cabins;

  if (filter === "small")
    displayFilter = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    displayFilter = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );

  if (filter === "large")
    displayFilter = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayFilter.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
