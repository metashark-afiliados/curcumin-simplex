// src/middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador de pipeline para el middleware.
 *              Refactorizado para eliminar los manejadores de placeholder
 *              (auth, geoip) del pipeline activo, simplificando el flujo de
 *              ejecución solo a la lógica actualmente implementada (i18n).
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse, type NextRequest } from "next/server";
import { isMiddlewareEnabled } from "@/config/deployment.config";
import { i18nHandler } from "@/middleware/handlers/i18n/index";
// import { authHandler } from "@/middleware/handlers/auth/index"; // Eliminado
// import { geoIpHandler } from "@/middleware/handlers/geoip/index"; // Eliminado
import { clientLogger } from "@/lib/logging";

// El pipeline ahora solo contiene los manejadores que están activos.
const handlers = [i18nHandler];

export async function middleware(request: NextRequest) {
  if (!isMiddlewareEnabled) {
    return NextResponse.next();
  }

  clientLogger.info(
    `[Middleware] Pipeline iniciado para: ${request.nextUrl.pathname}`
  );

  try {
    for (const handler of handlers) {
      const result = await handler(request);
      if (result) {
        clientLogger.info(
          `[Middleware] Pipeline terminado por handler. Status: ${result.status}`
        );
        return result;
      }
    }

    clientLogger.info(
      `[Middleware] Pipeline completado. Pasando al renderizador de Next.js.`
    );
    return NextResponse.next();
  } catch (error) {
    clientLogger.error(
      `[Middleware] Error no controlado en el pipeline de handlers.`,
      {
        pathname: request.nextUrl.pathname,
        error: error instanceof Error ? error.message : String(error),
      }
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: isMiddlewareEnabled
    ? ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
    : [],
};
// src/middleware.ts
