"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/data-service";

function ReservationList({ bookings }) {
  const [optimisticState, optimisticDelete] = useOptimistic(
    bookings,
    (CurBookings, bookingId) => {
      return CurBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    // await new Promise((res) => setTimeout(res, 5000)); it just wait for 5 second to perform a second line of code
    // throw new Error();

    await deleteBooking(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticState.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
