// frontend/next.config.ts
/**
 * @file next.config.ts
 * @description Manifiesto de Configuración y SSoT para Next.js. Este archivo es el
 *              "Cerebro de Compilación" del proyecto. Esta versión está optimizada
 *              exclusivamente para despliegues en Vercel, eliminando la lógica de
 *              despliegue dual para estabilizar el build y maximizar el rendimiento.
 * @version 14.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { NextConfig } from "next";

// --- Log de Observabilidad de Compilación ---
console.log(
  "\x1b[36m%s\x1b[0m",
  "🔄 [NextConfig] Iniciando configuración del manifiesto de compilación de Next.js..."
);
console.info(
  `\x1b[34m[NextConfig] 🎯 Objetivo de despliegue: 'vercel' (configuración unificada).\x1b[0m`
);
console.info(
  `\x1b[34m[NextConfig]    - Optimización de Imágenes: ACTIVADA.\x1b[0m`
);
console.info(
  `\x1b[34m[NextConfig]    - Cabeceras de Seguridad: ACTIVADAS.\x1b[0m`
);

/**
 * @function getDynamicHeaders
 * @description Genera las cabeceras de seguridad HTTP para todos los despliegues.
 * @returns {Promise<Array<object>>} Configuración de cabeceras para Next.js.
 */
async function getDynamicHeaders() {
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src * data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
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
 * @description El objeto de configuración final para Next.js, optimizado para Vercel.
 */
const nextConfig: NextConfig = {
  // `output` se deja sin definir; Vercel gestiona esto automáticamente.
  // `headers` se aplica incondicionalmente para máxima seguridad.
  headers: getDynamicHeaders,

  eslint: {
    ignoreDuringBuilds: false,
  },

  // La optimización de imágenes se reactiva al eliminar la clave `images`.
  // Next.js/Vercel usarán la optimización por defecto.
  // Si se necesita permitir dominios externos, se añadirá la clave `remotePatterns`.

  trailingSlash: false,
};

export default nextConfig;
// frontend/next.config.ts
