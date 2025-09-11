// next.config.ts
/**
 * @file next.config.ts
 * @description Manifiesto de Configuración de Next.js.
 *              CORRECCIÓN CRÍTICA: Se ha corregido la ruta de importación del
 *              módulo de configuración para que apunte al archivo .ts fuente.
 *              Esto resuelve el error 'MODULE_NOT_FOUND' durante el proceso de
 *              compilación de Next.js.
 * @version 8.1.0
 * @author RaZ podesta - MetaShark Tech
 */
// <<-- CORRECCIÓN: Se importa el archivo .ts directamente, permitiendo que
// el sistema de build de Next.js maneje la resolución de módulos correctamente.
import { isStaticExport } from "./src/config/deployment.config";
import type { NextConfig } from "next";

/**
 * @function headers
 * @description Define las cabeceras de seguridad. Solo se aplicarán en el modo dinámico (Vercel).
 */
async function headers() {
  return [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ];
}

/**
 * @type {NextConfig}
 */
const nextConfig: NextConfig = {
  // Configuración condicional basada en el objetivo de despliegue
  output: isStaticExport ? "export" : undefined,
  headers: isStaticExport ? undefined : headers,

  // Configuraciones base que se aplican en ambos modos
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
// next.config.ts
