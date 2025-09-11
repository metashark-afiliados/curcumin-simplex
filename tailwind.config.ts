// tailwind.config.ts
/**
 * @file tailwind.config.ts
 * @description Manifiesto de Configuración para Tailwind CSS v4.
 *              Refactorizado para definir con precisión las rutas de contenido
 *              del App Router y para documentar su rol arquitectónico.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see src/app/globals.css
 * @see https://tailwindcss.com/docs/configuration
 */
import type { Config } from "tailwindcss";

/**
 * @constant config
 * @description Configuración de Tailwind CSS para el proyecto curcumin-simplex.
 * @property {string[]} content - Define los patrones glob para que Tailwind
 *                                escanee los archivos en busca de clases de utilidad.
 *                                En v4, esta es la principal responsabilidad de este archivo.
 *                                La configuración de tema (`theme`) se gestiona en `globals.css`.
 * @property {any[]} plugins - Array para registrar plugins de Tailwind.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}", // <<-- MEJORA: Se añade `lib` para hooks que puedan generar clases
  ],
  plugins: [],
};

export default config;
// tailwind.config.ts
