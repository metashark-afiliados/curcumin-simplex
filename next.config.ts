// frontend/next.config.ts
/**
 * @file next.config.ts
 * @description Manifiesto de Configuración y SSoT para Next.js. Esta versión está
 *              consolidada y optimizada para un despliegue exclusivo en Vercel,
 *              eliminando toda lógica de despliegue dual.
 * @version 15.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { NextConfig } from "next";

/**
 * @function getSecurityHeaders
 * @description Genera un conjunto robusto de cabeceras de seguridad HTTP.
 *              Esta función se centraliza para mantener la consistencia y facilitar
 *              la auditoría de seguridad.
 * @returns {Promise<Array<{source: string; headers: Array<{key: string; value: string;}>}>>}
 *          La configuración de cabeceras para Next.js.
 */
async function getSecurityHeaders() {
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src * data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://it4.curcumacomplex.com;
    frame-ancestors 'none';
    connect-src *;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

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
        { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        { key: "Content-Security-Policy", value: cspHeader },
      ],
    },
  ];
}

/**
 * @type {NextConfig}
 * @description El objeto de configuración final para Next.js.
 */
const nextConfig: NextConfig = {
  // La propiedad `output` se omite intencionadamente. Vercel detecta y
  // optimiza automáticamente el tipo de salida.
  headers: getSecurityHeaders,
  eslint: {
    // Garantiza que los errores de linting fallen la compilación en producción.
    ignoreDuringBuilds: false,
  },
  // La optimización de imágenes está habilitada por defecto en Vercel.
  // No es necesario especificar `images: { unoptimized: false }`.
  trailingSlash: false,
};

export default nextConfig;
// frontend/next.config.ts
