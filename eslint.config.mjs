// eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description Manifiesto de Configuración y SSoT para ESLint ("Flat Config").
 *              Refactorizado a un estándar de élite para ser holístico,
 *              integrando ordenamiento de importaciones, reglas de accesibilidad,
 *              configuración granular para TypeScript y una integración perfecta con Prettier.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // 1. Ignorados Globales
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

  // 2. Configuración Base de Next.js
  ...compat.extends("next/core-web-vitals"),

  // 3. Configuración de Ordenamiento de Importaciones y Accesibilidad (A11y)
  {
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
      "jsx-a11y": eslintPluginJsxA11y,
    },
    rules: {
      ...eslintPluginJsxA11y.configs.recommended.rules,
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // 4. Configuración Específica para TypeScript y React Hooks
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": eslintPluginReactHooks,
      "@typescript-eslint": typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...typescriptPlugin.configs["eslint-recommended"].rules,
      ...typescriptPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 5. Integración con Prettier (SIEMPRE AL FINAL)
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
// eslint.config.mjs
