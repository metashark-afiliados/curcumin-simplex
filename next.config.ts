// next.config.ts
/**
 * @file next.config.ts
 * @description Manifiesto de Configuración de Next.js.
 *              Refactorizado para ser autocontenido, integrar el chequeo de
 *              calidad de ESLint en el proceso de build y fortalecer las
 *              cabeceras de seguridad con una política de contenido (CSP) base.
 * @version 10.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { NextConfig } from "next";

// --- Lógica de Despliegue ---
const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET || "vercel";
const isStaticExport = deployTarget === "hostinger";

// Observabilidad en tiempo de build.
console.info(
  `[NextConfig] Modo de despliegue configurado para: '${deployTarget}'.`,
  { isStaticExport }
);

/**
 * @function headers
 * @description Define las cabeceras de seguridad. Solo se aplicarán en modo dinámico (Vercel).
 * @returns {Promise<Array<object>>} Configuración de cabeceras.
 */
async function headers() {
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
        // <<-- MEJORA DE SEGURIDAD: Añadido Referrer-Policy
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
        // <<-- MEJORA DE SEGURIDAD: Añadido Content-Security-Policy
        {
          key: "Content-Security-Policy",
          value: cspHeader,
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

  // <<-- MEJORA DE CALIDAD: Integración de ESLint en el build
  eslint: {
    // Ejecutar ESLint durante `next build` para atrapar errores antes del despliegue.
    ignoreDuringBuilds: false,
  },

  // Configuraciones base que se aplican en ambos modos
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
// next.config.ts