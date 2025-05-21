import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// this function always return a Response.json or error etc.
export async function GET(request, { params }) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "nothing found" });
  }
}

// we can't give our own name of the function it has to be explicit with http method/nowaday we don't use much we have a server actions instead of custome endpoint creation
// export async function POST() {}
// export async function PATCH() {}
// export async function DELETE() {}
