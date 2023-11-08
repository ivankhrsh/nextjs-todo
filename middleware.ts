import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  //Return to / if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to / if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log(request.url);

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ["/todos"],
};