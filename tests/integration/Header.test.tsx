// tests/integration/Header.test.tsx
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock de las props de i18n ACTUALIZADO para usar 'campaignPills'
const mockHeaderProps = {
  campaignPills: [
    { label: "Campaña: Curcumina", href: "/campaigns/curcumina-complex" },
    { label: "Campaña: Fitwell", href: "/campaigns/global-fitwell" },
  ],
  ctaButton: "Join Now",
  logoUrl: "/img/logo.svg",
  logoAlt: "Global Fitwell Logo",
};

describe("Componente de Sección: Header", () => {
  it("Renderiza el logo, las píldoras de campaña y el botón CTA correctamente", () => {
    render(<Header {...mockHeaderProps} />);

    // Verifica el logo
    const logo = screen.getByAltText(mockHeaderProps.logoAlt);
    expect(logo).toBeInTheDocument();

    // Verifica que el enlace principal del logo apunte a la raíz
    const homeLink = screen.getByLabelText(mockHeaderProps.logoAlt);
    expect(homeLink).toHaveAttribute("href", "/");

    // Verifica las píldoras de campaña (que son enlaces)
    const curcuminaPill = screen.getByRole("link", {
      name: /Campaña: Curcumina/i,
    });
    expect(curcuminaPill).toBeInTheDocument();
    expect(curcuminaPill).toHaveAttribute(
      "href",
      "/campaigns/curcumina-complex"
    );

    // Verifica el botón de llamada a la acción
    const ctaButton = screen.getByRole("link", {
      name: mockHeaderProps.ctaButton,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/join");
  });
});
// tests/integration/Header.test.tsx
