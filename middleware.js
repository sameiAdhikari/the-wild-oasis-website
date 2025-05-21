import { auth } from "@/app/_lib/Auth";
// import { NextResponse } from "next/server";
// export function middleware(request) {
//   return NextResponse.redirect(new URL("/about", request.url));
// }

export const middleware = auth; // important make sure a function with a name of middleware is exported from a file of middleware.js

//basically this config is required to know for which route this middleware code should be execute
export const config = {
  matcher: ["/account"],
};
