// src/middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador de pipeline para el middleware. Su lógica es dual,
 *              activándose completamente para despliegues dinámicos (Vercel) y
 *              desactivándose para exportaciones estáticas (Hostinger), controlado
 *              por la variable de entorno NEXT_PUBLIC_DEPLOY_TARGET.
 *              Refactorizado para añadir logs de observabilidad en tiempo de compilación.
 * @version 11.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse, type NextRequest } from "next/server";
import { i18nHandler } from "@/middleware/handlers/i18n/index";

// --- Log de Observabilidad de Compilación ---
// Este log se imprime en la terminal cuando Next.js carga este archivo para compilarlo.
console.log(
  "\x1b[35m%s\x1b[0m",
  "📦 [Middleware] Archivo cargado por el compilador de Next.js. Iniciando preparación para el Edge..."
);

// --- Interruptor de Arquitectura Dual (SSoT de Configuración) ---
// Lee la variable de entorno para determinar el objetivo de despliegue.
const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET || "vercel";
// El middleware SÓLO debe ejecutarse en un entorno de servidor dinámico.
const isMiddlewareEnabled = deployTarget === "vercel";

// --- Pipeline de Manejadores ---
// Define la secuencia de manejadores a ejecutar. Actualmente solo i18n.
const handlers = [i18nHandler];

/**
 * @function middleware
 * @description Punto de entrada para el middleware de Next.js.
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @returns {Promise<NextResponse>} La respuesta, que puede ser una redirección o la continuación del pipeline.
 */
export async function middleware(request: NextRequest) {
  // --- Guarda de Seguridad de Despliegue ---
  // Si el objetivo es 'hostinger' (o cualquier cosa que no sea 'vercel'),
  // el middleware se desactiva por completo y no consume recursos.
  if (!isMiddlewareEnabled) {
    return NextResponse.next();
  }

  const originalPathname = request.nextUrl.pathname;

  try {
    // --- Ejecución del Pipeline ---
    for (const handler of handlers) {
      const result = await handler(request);
      // Si un manejador devuelve una respuesta (ej. una redirección),
      // el pipeline se detiene y se retorna esa respuesta.
      if (result) {
        console.log(
          `[Middleware] Handler actuó en "${originalPathname}". Redirigiendo a "${result.headers.get("location")}". Status: ${result.status}`
        );
        return result;
      }
    }

    // Si ningún manejador actuó, se continúa con la petición normal.
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

// Este log confirma que la configuración del matcher también ha sido procesada.
console.log(
  "\x1b[35m%s\x1b[0m",
  "   - [Middleware] Matcher de rutas configurado. El middleware se ejecutará en las rutas correspondientes."
);
