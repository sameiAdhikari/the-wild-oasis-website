// "use client";

import Image from "next/image";
import { auth } from "../_lib/Auth";
import { getBookings } from "../_lib/data-service";
import { supabase } from "../_lib/supabase";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteReservation from "./DeleteReservation";
import { format, isPast, isToday } from "date-fns";
import { formatDistanceFromNow } from "./ReservationCard";
import FilterBooking from "./FilterBooking";
// eslint ignore next line
async function HomeAccount() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);
  return (
    <div>
      <div className="flex align-middle justify-between">
        <p className="text-3xl mb-3 text-yellow-700">
          {" "}
          your histry of reservations
        </p>
        {/* <FilterBooking /> */}
      </div>
      {bookings.map((booking) => (
        <List booking={booking} key={booking.id} />
      ))}
    </div>
  );
}

async function List({ booking }) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    guestId,
    created_at,
    cabinId,
  } = booking;

  const { data: cabin } = await supabase
    .from("Cabins")
    .select("*")
    .eq("id", cabinId);
  return (
    <div className="flex border border-primary-800 mb-3">
      <div className="relative h-32 aspect-square">
        <Image
          src={cabin[0].image}
          fill
          alt={`Cabin ${cabin[0].name}`}
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {cabin[0].name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* <div className="flex flex-col align-middle border-l border-primary-800 w-[100px]">
          {!isPast(new Date(startDate)) ? (
            <>
              <Link
                href={`/account/reservations/edit/${id}`}
                className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
              >
                <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
                <span className="mt-1">Edit</span>
              </Link>
              <DeleteReservation
                //  onDelete={onDelete}
                bookingId={id}
              />
            </>
          ) : null}
        </div> */}
    </div>
  );
}

export default HomeAccount;
