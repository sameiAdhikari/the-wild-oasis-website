"use client";

import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/data-service";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }) {
  const [optimisticState, optimisticDelete] = useOptimistic(
    bookings,
    (CurBookings, bookingId) => {
      return CurBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
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
