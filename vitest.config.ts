// vitest.config.ts
/**
 * @file vitest.config.ts
 * @description Configuración de Vitest para pruebas unitarias y de integración.
 *              Refactorizado para resolver los problemas de tipado de forma robusta,
 *              eliminando la necesidad de `@ts-nocheck` y asegurando la coherencia
 *              de los alias de ruta con `tsconfig.json`.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see https://vitest.dev/config/
 */
/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { defineConfig as viteDefineConfig } from "vite";
import * as path from "path";

// Configuración base de Vite para la resolución de alias, SSoT para el entorno de pruebas.
const viteConfig = viteDefineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@scripts": path.resolve(__dirname, "./scripts"),
      "@tests": path.resolve(__dirname, "./tests"),
    },
  },
});

// Configuración específica de Vitest que extiende la de Vite.
const vitestConfig = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    include: ["tests/unit/**/*.test.tsx", "tests/integration/**/*.test.tsx"],
    exclude: ["node_modules", "tests/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});

// Se fusionan ambas configuraciones para tener una configuración final completa y tipada.
export default mergeConfig(viteConfig, vitestConfig);
// vitest.config.ts
