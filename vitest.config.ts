// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * @file vitest.config.ts
 * @description Configuración de Vitest para las pruebas unitarias y de integración.
 * @version 2.0.0
 * @see https://vitest.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    // Directorio de pruebas unitarias y de integración
    include: ["tests/unit/**/*.test.tsx", "tests/integration/**/*.test.tsx"],
    // Excluir explícitamente las pruebas E2E
    exclude: ["node_modules", "tests/e2e/**"],
  },
  // --- RESOLUCIÓN DE ALIAS PARA COINCIDIR CON TSCONFIG ---
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
// vitest.config.ts
