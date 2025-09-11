// tests/e2e/middleware.spec.ts
import { test, expect } from "@playwright/test";

// --- Suite de Pruebas para el Modo Vercel (Dinámico) ---
test.describe("Middleware en Modo Vercel (dinámico)", () => {
  // Aseguramos que las pruebas de este grupo usen la configuración de Vercel
  test.use({
    launchOptions: {
      env: {
        ...process.env,
        NEXT_PUBLIC_DEPLOY_TARGET: "vercel",
      },
    },
  });

  test("Debe redirigir de la raíz (/) a la ruta con locale por defecto (/es-ES/)", async ({
    page,
  }) => {
    await page.goto("/");
    // Esperamos a que la redirección se complete
    await page.waitForURL("**/es-ES/");
    await expect(page).toHaveURL("/es-ES/");
  });

  test("Debe redirigir de una ruta sin locale (/about) a su versión con locale (/es-ES/about)", async ({
    page,
  }) => {
    await page.goto("/about");
    await page.waitForURL("**/es-ES/about");
    await expect(page).toHaveURL("/es-ES/about");
  });

  test("NO debe redirigir una ruta que ya tiene un locale válido (/it-IT/store)", async ({
    page,
  }) => {
    // Usamos page.route para interceptar y verificar que no hay redirecciones
    let redirected = false;
    page.on("request", (request) => {
      if (request.isNavigationRequest() && request.redirectedFrom()) {
        redirected = true;
      }
    });

    await page.goto("/it-IT/store");
    expect(redirected).toBe(false);
    await expect(page).toHaveURL("/it-IT/store");
  });

  test("Debe ignorar las rutas de assets estáticos (favicon.ico)", async ({
    page,
  }) => {
    const response = await page.goto("/favicon.ico");
    // El matcher del middleware debe ignorar esta ruta.
    // Nuestra ruta de favicon devuelve 204.
    expect(response?.status()).toBe(204);
    await expect(page).toHaveURL("/favicon.ico");
  });

  test("Debe ignorar las rutas de assets de Next.js (/_next/)", async ({
    page,
  }) => {
    // Esta ruta no existirá, pero es para probar el matcher. Esperamos un 404.
    const response = await page.goto("/_next/static/test.css");
    expect(response?.status()).toBe(404);
    await expect(page).toHaveURL("/_next/static/test.css");
  });
});

// --- Suite de Pruebas para el Modo Hostinger (Estático) ---
test.describe("Middleware en Modo Hostinger (estático)", () => {
  // Aseguramos que las pruebas de este grupo usen la configuración de Hostinger
  test.use({
    launchOptions: {
      env: {
        ...process.env,
        NEXT_PUBLIC_DEPLOY_TARGET: "hostinger",
      },
    },
  });

  test("NO debe redirigir desde la raíz (/)", async ({ page }) => {
    let redirected = false;
    page.on("request", (request) => {
      if (request.isNavigationRequest() && request.redirectedFrom()) {
        redirected = true;
      }
    });

    await page.goto("/");
    expect(redirected).toBe(false);
    await expect(page).toHaveURL("/");
  });

  test("NO debe redirigir desde una ruta sin locale (/about)", async ({
    page,
  }) => {
    let redirected = false;
    page.on("request", (request) => {
      if (request.isNavigationRequest() && request.redirectedFrom()) {
        redirected = true;
      }
    });

    await page.goto("/about");
    expect(redirected).toBe(false);
    await expect(page).toHaveURL("/about");
  });
});

// tests/e2e/middleware.spec.ts
