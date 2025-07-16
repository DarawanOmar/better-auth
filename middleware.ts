import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );
  console.log("pathname => ", pathname);

  if (pathname !== "/sign-in" && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (pathname === "/sign-in" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname === "/sign-up" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|manifest\\.webmanifest|static|.*\\..*).*)",
  ],
};
