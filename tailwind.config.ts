// tailwind.config.ts
/**
 * @file tailwind.config.ts
 * @description Manifiesto de Configuración para Tailwind CSS v4.
 *              Versión corregida con la importación de tipo correcta.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { Config } from "tailwindcss"; // <<-- SOLUCIÓN: Importación correcta

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};

export default config;
// tailwind.config.ts
