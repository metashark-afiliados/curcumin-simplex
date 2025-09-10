// src/middleware/handlers/geoip/index.ts
/**
 * @file /middleware/handlers/geoip/index.ts
 * @description Manejador de middleware para GeoIP (actualmente desactivado).
 *              Refactorizado para manejar la discrepancia de tipos de `req.geo`.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse, type NextRequest } from "next/server";

const GEOIP_ENABLED = false;

/**
 * @function geoIpHandler
 * @description Extrae la información geográfica de la solicitud.
 * @param {NextRequest} req - El objeto de la solicitud entrante.
 * @param {NextResponse} res - El objeto de la respuesta que se está construyendo.
 */
export async function geoIpHandler(
  req: NextRequest,
  res: NextResponse
): Promise<void> {
  if (!GEOIP_ENABLED) {
    return;
  }

  // NOTA TÉCNICA: El entorno de ejecución Edge de Vercel inyecta una propiedad `geo`
  // en el objeto `NextRequest`, pero las definiciones de tipo de la versión actual
  // de Next.js no la incluyen, causando un error de TypeScript.
  // Se accede a la propiedad a través de un casting a `any` para resolver el
  // error de compilación, reconociendo que la propiedad existirá en producción.
  // Esto es una solución pragmática para una discrepancia de tipos externa.
  const country = (req as any).geo?.country ?? "unknown";

  console.log(`[Observabilidad] País detectado (GeoIP): ${country}`);

  res.headers.set("x-country", country);
}
// src/middleware/handlers/geoip/index.ts
