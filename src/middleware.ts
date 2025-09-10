// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { i18nHandler } from "@/middleware/handlers/i18n/index";
import { authHandler } from "@/middleware/handlers/auth/index";
import { geoIpHandler } from "@/middleware/handlers/geoip/index";

/**
 * @file middleware.ts
 * @description Orquestador de pipeline para el middleware.
 * @version 2.1.0
 */
const handlers = [i18nHandler, authHandler, geoIpHandler];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  for (const handler of handlers) {
    const result = await handler(request, response);
    if (result) {
      return result;
    }
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
// src/middleware.ts
