import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, decodeJwt } from "jose";

const JWT_SECRET = process.env.JWT_SECRET; 

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("accessToken")?.value;

    if (pathname === "/auth/login") {
      return NextResponse.next();
    }

    if (!token) {
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
      return NextResponse.next();
    }

    let role: string | undefined;
    try {
      if (JWT_SECRET) {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        role = (payload.role as string)?.toUpperCase();
      } else {
        const payload = decodeJwt(token);
        role = (payload.role as string)?.toUpperCase();
      }
    } catch (decodeError) {
      console.error("[Middleware] Token invalid:", decodeError);
      const res = NextResponse.redirect(new URL("/auth/login", request.url));
      res.cookies.delete("accessToken"); 
      return res;
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.error("[Middleware] Unexpected error:", e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
