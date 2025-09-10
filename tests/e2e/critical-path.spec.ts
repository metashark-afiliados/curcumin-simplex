// tests/e2e/critical-path.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Flujo Crítico de Usuario", () => {
  test("El usuario puede ver el contenido principal y encontrar el CTA", async ({
    page,
  }) => {
    // 1. Navegar a la página de inicio
    await page.goto("http://localhost:3000/");

    // 2. Verificar que el título del Hero es visible
    // Usamos un localizador de rol para encontrar el heading principal (h1)
    const heroTitle = page.getByRole("heading", {
      name: /Redescubre Tu Vitalidad Natural/i,
    });
    await expect(heroTitle).toBeVisible({ timeout: 10000 }); // Espera hasta 10s

    // 3. Verificar que el subtítulo del Hero es visible
    const heroSubtitle = page.getByText(
      /La fórmula sinérgica diseñada para potenciar tu bienestar/i
    );
    await expect(heroSubtitle).toBeVisible();

    // 4. Localizar el botón CTA en el Header y hacer clic en él
    const headerCtaButton = page
      .getByRole("banner")
      .getByRole("link", { name: /Pedir Ahora/i });
    await expect(headerCtaButton).toBeVisible();

    // NOTA: Para una prueba real, haríamos clic y verificaríamos la nueva URL,
    // pero como es un enlace externo, solo verificamos su existencia.
    await expect(headerCtaButton).toHaveAttribute(
      "href",
      /https:\/\/example.com/
    );
  });
});
// tests/e2e/critical-path.spec.ts
