import { NextResponse } from "next/server";
import { CUSTOM_HEADER } from "./constants";

export default async function middleware(request: Request) {
  if (request.headers.get(CUSTOM_HEADER)) {
    console.log(
      `skipping middleware for internal file proxy checks for request: ${request.method} ${request.url} with headers`,
      request.headers
    );
    return NextResponse.next();
  }

  const url = new URL(request.url);

  if (url.pathname.startsWith("/blog/") || url.pathname === "/blog") {
    const proxyUrl = new URL("https://bjak.my");
    proxyUrl.pathname = url.pathname;

    return await fetch(proxyUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  }

  // Redirect old paths
  if (url.pathname.startsWith("/_next/static/")) {
    console.log("checking if file exist in current build");
    // test if resource exists on current build
    const resource = await fetch(url, {
      method: "HEAD",
      headers: {
        [CUSTOM_HEADER]: "true",
      },
    });

    if (resource.status === 200) {
      console.log("file exist in current build");
      return NextResponse.next();
    }

    console.log("file does not exist in current build, proxying to bjak.my");
    // proxy to bjak.my
    const proxyUrl = new URL("https://web.dev.bjak.my");
    proxyUrl.pathname = url.pathname;
    return NextResponse.rewrite(proxyUrl);
  }
}
