// tailwind.config.ts
import type { Config } from "tailwindcss";

/**
 * @file tailwind.config.ts
 * @description Configuración de Tailwind CSS v4 para Curcumin Simplex.
 * @version 2.0.0
 * @see https://tailwindcss.com/docs/configuration
 * @description_es Este archivo sigue las mejores prácticas de Tailwind CSS v4.
 *               La configuración del tema (colores, fuentes, etc.) ha sido
 *               movida a `src/app/globals.css` y se gestiona a través de la
 *               directiva `@theme` para un enfoque "CSS-first". Este archivo
 *               solo define las rutas de contenido.
 */
const config: Config = {
  // En Tailwind CSS v4, la detección de contenido es en gran parte automática.
  // La clave `content` se mantiene por claridad y para asegurar la inclusión
  // explícita de todos los archivos relevantes.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // La sección `theme` se ha eliminado intencionadamente.
  // La SSoT para el sistema de diseño ahora reside en `src/app/globals.css`
  // bajo la directiva `@theme`.
  plugins: [
    // Aquí se registrarían plugins si fueran necesarios.
  ],
};
export default config;
// tailwind.config.ts
