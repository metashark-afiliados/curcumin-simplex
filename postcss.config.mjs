// postcss.config.mjs
/**
 * @file postcss.config.mjs
 * @description Manifiesto de Configuración y SSoT para el pipeline de PostCSS.
 *              Refactorizado para incluir la directiva de tipo JSDoc,
 *              mejorando la seguridad de tipos y la experiencia del desarrollador (DX).
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/postcss.config.mjs.md
 * @see https://tailwindcss.com/docs/installation/using-postcss
 */

/** @type {import('postcss').Config} */
const config = {
  plugins: {
    /**
     * @plugin @tailwindcss/postcss
     * @description Plugin de PostCSS para Tailwind CSS v4. Este plugin se encarga de:
     * 1. Leer `tailwind.config.ts` para las rutas de contenido.
     * 2. Escanear los archivos en busca de clases de Tailwind.
     * 3. Procesar las directivas CSS de Tailwind (`@theme`, `@layer`, etc.).
     * 4. Inyectar `autoprefixer` para la compatibilidad de navegadores.
     * 5. Generar el CSS final optimizado.
     */
    "@tailwindcss/postcss": {},
  },
};

export default config;
// postcss.config.mjs
