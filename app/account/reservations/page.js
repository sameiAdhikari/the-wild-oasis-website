import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/Auth";
import { getBookings } from "@/app/_lib/data-service";

export const metadata = {
  title: "reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session?.user.guestId);
  const filterBookings = bookings.filter(
    (booking) => booking.status === "unconfirmed"
  );

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your upcoming reservations
      </h2>

      {filterBookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={filterBookings} />
      )}
    </div>
  );
}
