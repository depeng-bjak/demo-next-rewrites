import { NextResponse } from "next/server";

export default function middleware(request: Request) {
  const url = new URL(request.url);

  // Redirect old paths
  if (url.pathname.startsWith("/_next/static/")) {
    // proxy to bjak.my
    const proxyUrl = new URL("https://bjak.my");
    proxyUrl.pathname = url.pathname;
    return fetch(proxyUrl);
  }

  // Continue to next handler
  return NextResponse.next();
}
