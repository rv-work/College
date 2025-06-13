import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Invalid token Error");
  }
}

export async function middleware(req: NextRequest) {

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const decoded = await verifyToken(token);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("userId", decoded.id as string);
    console.log("middle")

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
export const config = {
  matcher: ["/profile", "/my-events" , "/class/:path*", "/api/host/:path*" , "/api/event/:path*" , "/api/profile/:path*" , "/api/dsa/:path*" , "/api/source/:path*" , "/api/quize"],
};

