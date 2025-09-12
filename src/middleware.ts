// frontend/middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador de pipeline para el middleware de Next.js.
 *              Este aparato es el corazón de nuestra arquitectura de despliegue dual.
 *              Actúa como un interruptor maestro:
 *              - Para Vercel (dinámico): Activa el pipeline de manejadores (i18n, etc.).
 *              - Para Hostinger (estático): Se desactiva completamente para permitir el `next export`.
 *              Esta lógica está gobernada por la variable de entorno NEXT_PUBLIC_DEPLOY_TARGET.
 * @version 12.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse, type NextRequest } from "next/server";
import { i18nHandler } from "@/middleware/handlers/i18n/index";

// --- Log de Observabilidad en Tiempo de Compilación ---
// Este log se imprime en la terminal cuando Next.js compila el middleware.
console.log(
  "\x1b[35m%s\x1b[0m",
  "📦 [Middleware] Compilando orquestador para el Edge Runtime..."
);

// --- Interruptor de Arquitectura Dual (SSoT de Configuración) ---
const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET || "vercel";
const isMiddlewareEnabled = deployTarget === "vercel";

// --- Pipeline de Manejadores ---
const handlers = [i18nHandler];

/**
 * @function middleware
 * @description Punto de entrada para el middleware de Next.js.
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @returns {Promise<NextResponse>} La respuesta, que puede ser una redirección o la continuación del pipeline.
 */
export async function middleware(request: NextRequest) {
  // Guarda de seguridad principal: Desactiva toda la lógica si el objetivo es estático.
  if (!isMiddlewareEnabled) {
    return NextResponse.next();
  }

  const originalPathname = request.nextUrl.pathname;

  try {
    for (const handler of handlers) {
      const result = await handler(request);
      // Si un manejador retorna una respuesta (ej. una redirección),
      // el pipeline se detiene y se retorna esa respuesta inmediatamente.
      if (result) {
        console.log(
          `[Middleware] Handler actuó en "${originalPathname}". Redirigiendo a "${result.headers.get("location")}". Status: ${result.status}`
        );
        return result;
      }
    }
    // Si ningún manejador actuó, se permite que la petición continúe.
    return NextResponse.next();
  } catch (error) {
    const errorDetails = error instanceof Error ? error.message : String(error);
    console.error(
      `[Middleware] ERROR NO CONTROLADO en pipeline para ${originalPathname}.`,
      { error: errorDetails }
    );
    // Retornar una respuesta de error genérica para evitar que el sitio se rompa.
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * @constant config
 * @description Configuración del matcher para el middleware.
 *              Es estática y declarativa para ser compatible con el compilador de Next.js.
 *              Excluye explícitamente rutas de API, assets estáticos de Next.js,
 *              imágenes y archivos con extensiones para optimizar el rendimiento.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img|.*\\..*).*)"],
};

console.log(
  "\x1b[35m%s\x1b[0m",
  `   - [Middleware] Compilación finalizada. Modo: ${isMiddlewareEnabled ? "ACTIVADO (Vercel)" : "DESACTIVADO (Estático)"}. Matcher configurado.`
);
// frontend/middleware.ts
