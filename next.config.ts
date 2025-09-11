// next.config.ts
/**
 * @file next.config.ts
 * @description Manifiesto de Configuración de Next.js.
 *              Versión corregida que integra el "Heartbeat" de compilación de forma segura
 *              y garantiza la correcta definición y asignación de la función `headers`.
 * @version 12.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { NextConfig } from "next";

// --- Lógica de "Heartbeat" de Compilación (Solo en Desarrollo) ---
let heartbeat: NodeJS.Timeout | null = null;
if (
  process.env.NODE_ENV === "development" &&
  typeof process.stdout.write === "function"
) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "🔄 [NextConfig] Iniciando configuración..."
  );
  heartbeat = setInterval(() => {
    process.stdout.write(" ."); // Escribe un punto sin nueva línea para indicar progreso
  }, 2000);

  // Detener el heartbeat después de un tiempo para no saturar la consola
  setTimeout(() => {
    if (heartbeat) {
      clearInterval(heartbeat);
      process.stdout.write("\n");
    }
  }, 30000);
}

// --- Lógica de Despliegue ---
const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET || "vercel";
const isStaticExport = deployTarget === "hostinger";

console.info(
  `\x1b[34m[NextConfig] 🎯 Modo de despliegue configurado para: '${deployTarget}'. (isStaticExport: ${isStaticExport})\x1b[0m`
);

/**
 * @function headers
 * @description Define las cabeceras de seguridad. Solo se aplicarán en modo dinámico.
 * @returns {Promise<Array<object>>} Configuración de cabeceras.
 */
async function getHeaders() {
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
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
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
  // Asigna la función getHeaders solo si NO es una exportación estática.
  // De lo contrario, asigna undefined, lo cual es válido.
  headers: isStaticExport ? undefined : getHeaders,

  eslint: {
    ignoreDuringBuilds: false,
  },

  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
