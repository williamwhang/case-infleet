import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasValidSession } from "@/lib/session";

const isAuthDisabledInDev =
  process.env.NODE_ENV !== "production" &&
  process.env.DISABLE_AUTH_IN_DEV === "true";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth/")
  ) {
    return NextResponse.next();
  }

  if (isAuthDisabledInDev) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session")?.value;

  if (await hasValidSession(token)) {
    return NextResponse.next();
  }

  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("session");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|fonts/|images/|assets/).*)",
  ],
};
