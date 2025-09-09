// eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description Configuración de ESLint en formato "Flat Config".
 * @description_es Este archivo es el guardián de la calidad estática del código.
 *               Define las reglas de linting para asegurar un estilo de código
 *               consistente y prevenir errores comunes, extendiendo la configuración
 *               recomendada por Next.js.
 * @version 2.0.0
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Boilerplate necesario para obtener la ruta del directorio actual en módulos ES.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Herramienta de compatibilidad para poder usar configuraciones en formato legacy.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extiende las configuraciones base de Next.js:
  // - `next/core-web-vitals`: Reglas esenciales para rendimiento y buenas prácticas.
  // - `next/typescript`: Reglas específicas para proyectos con TypeScript.
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Objeto de configuración para ignorar archivos y directorios.
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
// eslint.config.mjs