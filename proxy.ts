import { NextResponse, type NextRequest } from "next/server";
import { isAllowedHost, requestHost } from "@/lib/hosts";
import { applyHeaders } from "@/lib/security-headers";

export function proxy(request: NextRequest) {
  const host = requestHost(request.headers.get("host"));
  const path = request.nextUrl.pathname;

  if (!isAllowedHost(host, path)) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  applyHeaders(response.headers, nonce);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|avif|gif|svg|ico|woff2?)$).*)",
  ],
};
