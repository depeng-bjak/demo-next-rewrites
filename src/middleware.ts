import { NextResponse } from "next/server";
import { CUSTOM_HEADER } from "./constants";

export default async function middleware(request: Request) {
  if (request.headers.get(CUSTOM_HEADER)) {
    return NextResponse.next();
  }

  const url = new URL(request.url);

  // Redirect old paths
  if (url.pathname.startsWith("/_next/static/")) {
    // test if resource exists on current build
    const resource = await fetch(url, {
      headers: {
        [CUSTOM_HEADER]: "true",
      },
    });

    if (resource.status === 200) {
      return NextResponse.next();
    }

    // proxy to bjak.my
    const proxyUrl = new URL("https://bjak.my");
    proxyUrl.pathname = url.pathname;
    return NextResponse.rewrite(proxyUrl);
  }
}
