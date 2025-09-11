// postcss.config.mjs
/**
 * @file postcss.config.mjs
 * @description Manifiesto de Configuración y SSoT para el pipeline de PostCSS.
 *              Este aparato es el punto de entrada para todo el procesamiento de CSS
 *              del proyecto.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/postcss.config.md
 * @see https://tailwindcss.com/docs/installation/using-postcss
 */

/**
 * @type {import('postcss-load-config').Config}
 * @description Configuración de PostCSS.
 * @property {object} plugins - Define los plugins que se ejecutarán y su orden.
 * @property {object} plugins.['@tailwindcss/postcss'] - El único plugin necesario
 *           para un proyecto con Tailwind CSS v4. Este plugin se encarga de:
 *           1. Leer `tailwind.config.ts` para saber qué archivos escanear.
 *           2. Escanear los archivos de contenido en busca de clases de Tailwind.
 *           3. Procesar el CSS de entrada (ej. `globals.css`) para resolver las
 *              directivas `@theme`, `@layer`, `@apply`, etc.
 *           4. Generar el CSS final optimizado.
 *           5. Aplicar prefijos de proveedor (autoprefixer está incluido).
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
// postcss.config.mjs
