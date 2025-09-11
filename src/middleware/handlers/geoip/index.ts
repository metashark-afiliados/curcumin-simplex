// src/middleware/handlers/geoip/index.ts
/**
 * @file /middleware/handlers/geoip/index.ts
 * @description Manejador de middleware para GeoIP.
 *              NOTA DE ARQUITECTURA: Este manejador se mantiene como un
 *              placeholder para la futura implementación de la lógica de
 *              GeoIP. No se exporta y no se incluye en el pipeline
 *              del middleware para evitar la ejecución de código muerto.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse, type NextRequest } from "next/server";

/*
// --- PLACEHOLDER DE LÓGICA GEOIP ---

const GEOIP_ENABLED = false;

export async function geoIpHandler(req: NextRequest): Promise<void> {
  if (!GEOIP_ENABLED) {
    return;
  }

  // NOTA TÉCNICA: El entorno de ejecución Edge de Vercel inyecta una propiedad `geo`
  // en el objeto `NextRequest` que no está en las definiciones de tipo de Next.js.
  // El casting a `any` es una solución pragmática para esta discrepancia externa.
  const country = (req as any).geo?.country ?? "unknown";

  console.log(`[Observabilidad] País detectado (GeoIP): ${country}`);

  const response = NextResponse.next();
  response.headers.set("x-country", country);
  // Devolver 'response' si este manejador se reactiva.
}
*/

// No se exporta ninguna función para asegurar que este archivo no tenga efectos secundarios.
export {};
// src/middleware/handlers/geoip/index.ts
