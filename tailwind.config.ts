// tailwind.config.ts
/**
 * @file tailwind.config.ts
 * @description Manifiesto de Configuración para Tailwind CSS v4.
 *              Versión corregida que importa y aplica explícitamente el tipo `Config`
 *              para garantizar la seguridad de tipos y la validación estática de la
 *              configuración, aprovechando la corrección en `tsconfig.json`.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { Config } from "tailwindcss"; // <<-- SOLUCIÓN: Importación explícita del tipo.

const config: Config = {
  // Define los archivos que Tailwind escaneará en busca de clases.
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Actualmente no se utilizan plugins, pero la clave está aquí para futuras extensiones.
  plugins: [],
};

export default config;
// tailwind.config.ts
