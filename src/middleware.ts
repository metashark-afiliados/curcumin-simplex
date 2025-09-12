// frontend/middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador de pipeline para el middleware de Next.js.
 *              Esta versión está consolidada para un despliegue exclusivo en Vercel,
 *              ejecutando incondicionalmente el pipeline de manejadores.
 * @version 13.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/middleware.ts.md
 */
import { NextResponse, type NextRequest } from "next/server";
import { i18nHandler } from "@/middleware/handlers/i18n/index";

// --- Pipeline de Manejadores ---
// Define la secuencia de ejecución.
const handlers = [i18nHandler];

/**
 * @function middleware
 * @description Punto de entrada para el middleware de Next.js. Itera a través
 *              de los manejadores definidos y ejecuta su lógica secuencialmente.
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @returns {Promise<NextResponse | undefined>} La respuesta, que puede ser una
 *            redirección o la continuación del pipeline (undefined).
 */
export async function middleware(request: NextRequest) {
  const originalPathname = request.nextUrl.pathname;

  for (const handler of handlers) {
    const result = handler(request);
    // Si un manejador retorna una respuesta (ej. una redirección),
    // el pipeline se detiene y se retorna esa respuesta inmediatamente.
    if (result) {
      console.log(
        `[Middleware] Handler actuó en "${originalPathname}". Finalizando pipeline.`
      );
      return result;
    }
  }

  // Si ningún manejador actuó, se permite que la petición continúe.
  return NextResponse.next();
}

/**
 * @constant config
 * @description Configuración del matcher para el middleware. Excluye rutas de API,
 *              assets estáticos de Next.js, imágenes y archivos con extensiones.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img|.*\\..*).*)"],
};
// frontend/middleware.ts
