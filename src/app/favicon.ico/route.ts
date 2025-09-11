// src/app/favicon.ico/route.ts
/**
 * @file route.ts
 * @description Manejador de ruta para favicon.ico.
 *              Evita que esta petición sea capturada por rutas dinámicas,
 *              resolviendo un error 500 en las páginas de campaña.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { NextResponse } from "next/server";

export async function GET() {
  // En el futuro, podríamos servir un icono real aquí.
  // Por ahora, devolvemos una respuesta vacía exitosa.
  return new NextResponse(null, { status: 204 });
}
// src/app/favicon.ico/route.ts
