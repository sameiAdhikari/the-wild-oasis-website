"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function FilterBooking() {
  const [filter, setFilter] = useState("");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  function handleSubmit(e) {
    setFilter(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("booking", e.target.value);
    router.replace(`${pathName}?${params}`, { scroll: false });
  }
  console.log(filter);
  return (
    <div className="flex align-middle h-full">
      <p className="text-xl mr-3">filter</p>
      <form onSubmit={handleSubmit}>
        <select
          value={filter}
          onChange={(e) => handleSubmit(e)}
          className="bg-yellow-800 text-yellow-200 rounded-md p-2 "
        >
          <option value="all">All</option>
          <option value="past">Sort by past</option>
          <option value="upcoming">Sort by upcoming</option>
        </select>
      </form>
    </div>
  );
}

export default FilterBooking;
