import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // 只处理 /_next/static 请求
  if (pathname.startsWith("/_next/static")) {
    // 检查文件是否存在于当前部署
    const originResponse = await fetch(url, {
      method: "HEAD",
      headers: req.headers,
    });

    // 如果当前部署不存在 (404)，转发到备用域名
    if (originResponse.status === 404) {
      const backupDomain = "https://bjak.my";
      url.href = backupDomain + pathname;
      return NextResponse.rewrite(url); // 或使用 .redirect()
    }
  }

  return NextResponse.next();
}
