// src/middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador de pipeline para el middleware.
 *              Refactorizado para hacer que el objeto `config` sea estático,
 *              resolviendo un error crítico de build de Next.js, mientras se
 *              mantiene la lógica de activación condicional dentro de la función.
 * @version 9.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse, type NextRequest } from "next/server";
import { i18nHandler } from "@/middleware/handlers/i18n/index";

const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET || "vercel";
const isMiddlewareEnabled = deployTarget === "vercel";

const handlers = [i18nHandler];

export async function middleware(request: NextRequest) {
  // <<-- CORRECCIÓN: La lógica condicional se mueve aquí.
  // Si el middleware está deshabilitado por el target de despliegue,
  // se sale inmediatamente.
  if (!isMiddlewareEnabled) {
    return NextResponse.next();
  }

  const originalPathname = request.nextUrl.pathname;

  try {
    for (const handler of handlers) {
      const result = await handler(request);
      if (result) {
        console.log(
          `[Middleware] Handler actuó en "${originalPathname}". Redirigiendo a "${result.headers.get("location")}". Status: ${result.status}`
        );
        return result;
      }
    }

    return NextResponse.next();
  } catch (error) {
    const errorDetails = error instanceof Error ? error.message : String(error);
    console.error(
      `[Middleware] Error no controlado en el pipeline para ${originalPathname}.`,
      { error: errorDetails }
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const config = {
  // <<-- CORRECCIÓN: El matcher ahora es estático y declarativo.
  // El compilador de Next.js puede procesarlo sin errores.
  matcher: ["/((?!api|_next/static|_next/image|img|.*\\..*).*)"],
};
// src/middleware.ts
