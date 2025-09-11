// tailwind.config.ts
/**
 * @file tailwind.config.ts
 * @description Manifiesto de Configuración para Tailwind CSS v4.
 *              El rol de este archivo se centra en definir las rutas de contenido que serán escaneadas.
 *              ACTUALIZACIÓN: Depurada la ruta 'content' para eliminar 'pages'.
 * @version 4.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see src/app/globals.css
 * @see https://tailwindcss.com/docs/configuration
 */
import type { Config } from "tailwindcss";

/**
 * @constant config
 * @description Configuración de Tailwind CSS.
 * @property {string[]} content - Un array de patrones glob que le indican a Tailwind
 *                                qué archivos escanear en busca de clases de utilidad.
 * @property {any[]} plugins - Array para registrar plugins de Tailwind. Actualmente vacío.
 */
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};

export default config;
// tailwind.config.ts
