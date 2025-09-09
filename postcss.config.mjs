// postcss.config.mjs
/**
 * @file postcss.config.mjs
 * @description Archivo de configuración para PostCSS.
 * @description_es Este archivo es el punto de entrada para el procesamiento de CSS.
 *               Su única responsabilidad es registrar el plugin de Tailwind CSS,
 *               que escanea el código fuente, procesa las directivas de Tailwind
 *               (@theme, @apply, etc.) y genera el archivo CSS final.
 * @version 2.0.0
 * @see https://tailwindcss.com/docs/installation
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
// postcss.config.mjs
