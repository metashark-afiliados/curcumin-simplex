// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

/**
 * @file playwright.config.ts
 * @description Configuración de Playwright para las pruebas End-to-End.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // --- Directorio específico para pruebas E2E ---
  testDir: "./tests/e2e",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
  },
});
// playwright.config.ts
