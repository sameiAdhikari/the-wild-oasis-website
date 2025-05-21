"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const active = searchParams.get("capacity") || "all";

  function handleClick(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params}`, { scroll: false });
  }
  return (
    <div className="flex border border-primary-800">
      <Button params="all" active={active} onClick={() => handleClick("all")}>
        all cabins
      </Button>
      <Button
        params="small"
        active={active}
        onClick={() => handleClick("small")}
      >
        1&mdash;3
      </Button>
      <Button
        params="medium"
        active={active}
        onClick={() => handleClick("medium")}
      >
        4&mdash;7
      </Button>
      <Button
        params="large"
        active={active}
        onClick={() => handleClick("large")}
      >
        more than 8
      </Button>
    </div>
  );
}

export default Filter;
