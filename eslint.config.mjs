// eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description Manifiesto de Configuración y SSoT para ESLint ("Flat Config").
 *              CORRECCIÓN: Se ha modificado la importación de `globals` para asegurar
 *              una resolución de módulo correcta y estable.
 * @version 3.1.0
 * @author Raz Podestá - MetaShark Tech
 */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "playwright-report/**",
      ".docs-espejo/**",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];

export default eslintConfig;
// eslint.config.mjs
