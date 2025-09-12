// frontend/next.config.ts
/**
 * @file next.config.ts
 * @description Manifiesto de Configuración y SSoT para Next.js. Este archivo es el
 *              "Cerebro de Compilación" del proyecto. Implementa nuestra arquitectura
 *              de despliegue dual, generando una salida diferente según el valor de
 *              la variable de entorno `NEXT_PUBLIC_DEPLOY_TARGET`.
 * @version 13.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { NextConfig } from "next";

// --- Log de Observabilidad de Compilación ---
console.log(
  "\x1b[36m%s\x1b[0m",
  "🔄 [NextConfig] Iniciando configuración del manifiesto de compilación de Next.js..."
);

// --- Lógica de Arquitectura de Despliegue Dual ---
const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET || "vercel";
const isStaticExport = deployTarget === "hostinger";

console.info(
  `\x1b[34m[NextConfig] 🎯 Objetivo de despliegue detectado: '${deployTarget}'.\x1b[0m`
);
console.info(
  `\x1b[34m[NextConfig]    - Exportación Estática (output: 'export'): ${isStaticExport ? "ACTIVADA" : "DESACTIVADA"}\x1b[0m`
);
console.info(
  `\x1b[34m[NextConfig]    - Cabeceras de Seguridad Dinámicas (headers): ${!isStaticExport ? "ACTIVADAS" : "DESACTIVADAS"}\x1b[0m`
);

/**
 * @function getDynamicHeaders
 * @description Genera las cabeceras de seguridad HTTP. Solo se utiliza en despliegues dinámicos.
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
 * @description El objeto de configuración final para Next.js.
 */
const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  headers: isStaticExport ? undefined : getDynamicHeaders,

  eslint: {
    ignoreDuringBuilds: false,
  },

  images: {
    // La optimización de imágenes de Next.js no es compatible con 'next export'.
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
// frontend/next.config.ts
