"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./Auth";
import { deleteBooking, getBookings, updateGuest } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("please provide a valid id");
  const updatedGuest = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { error } = await supabase
    .from("guests")
    .update(updatedGuest)
    .eq("id", session?.user?.guestId);
  // .select();
  if (error) throw new Error("Error while updating data");

  revalidatePath("/account/profile");
}

export async function createBooking(data, formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");
  const newFormData = Object.entries(formData.entries());

  const newBooking = {
    ...data,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0.1),
    extrasPrice: 0,
    totalPrice: data.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([newBooking]);
  if (error) throw new Error(error.message);
  revalidatePath(`/cabins/${data.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in, please log in !");

  const data = await getBookings(session.user.guestId);
  const allId = data.map((data) => data.id);
  if (!allId.includes(bookingId))
    throw new Error("you are not allowed to delete");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) throw new Error("Error while deleting booking!");
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const inputData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  const session = await auth();
  if (!session) throw new Error("you must be logged in!");

  const data = await getBookings(session.user.guestId);
  const allId = data.map((data) => data.id);
  const bookingId = Number(formData.get("bookingId"));
  if (!allId.includes(bookingId))
    throw new Error("you are not allowed to delete");

  const { error } = await supabase
    .from("bookings")
    .update(inputData)
    .eq("id", bookingId);
  if (error) throw new Error("Error while updating booking");

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
