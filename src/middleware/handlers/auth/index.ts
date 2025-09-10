// src/middleware/handlers/auth/index.ts
import { NextResponse, type NextRequest } from "next/server";

/**
 * @file /middleware/handlers/auth/index.ts
 * @description Manejador de middleware para la autenticación (actualmente desactivado).
 * @version 1.0.0
 */
const AUTH_ENABLED = false;

export async function authHandler(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse | void> {
  if (!AUTH_ENABLED) {
    // Si la autenticación no está activada, simplemente pasamos al siguiente manejador.
    return;
  }

  // Lógica futura:
  // 1. Verificar si el usuario tiene una sesión activa (ej. leer cookie de Supabase).
  // 2. Comprobar si la ruta a la que accede requiere autenticación (usando `routes` de navigation.ts).
  // 3. Si es una ruta protegida y no hay sesión, redirigir a /login.
  // 4. Si es una ruta de "guest" (login) y ya hay sesión, redirigir a /dashboard.
  console.log("Manejador de Auth ejecutado (lógica por implementar)");
}
// src/middleware/handlers/auth/index.ts
