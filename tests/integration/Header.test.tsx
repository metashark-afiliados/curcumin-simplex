// tests/integration/Header.test.tsx
/**
 * @file Header.test.tsx
 * @description Test de integración para el Header.
 *              Actualizado para alinearse con el nuevo contrato de props
 *              del Header rediseñado, que espera un objeto `content`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock de las props de i18n ACTUALIZADO para la nueva estructura
const mockHeaderProps = {
  content: {
    logoUrl: "/img/logo-mock.svg",
    logoAlt: "Global Fitwell Mock Logo",
    navLinks: [
      { label: "Inicio", href: "/" },
      { label: "Tienda", href: "/store" },
    ],
    ctaButton: {
      label: "Ver Campaña",
      href: "/campaigns/12157",
    },
  },
};

describe("Componente de Sección: Header", () => {
  it("Renderiza el logo, la navegación y el botón CTA correctamente", () => {
    render(<Header {...mockHeaderProps} />);

    // Verifica el logo
    const logo = screen.getByAltText(mockHeaderProps.content.logoAlt);
    expect(logo).toBeInTheDocument();

    // Verifica el enlace de "Tienda"
    const storeLink = screen.getByRole("link", {
      name: /Tienda/i,
    });
    expect(storeLink).toBeInTheDocument();
    expect(storeLink).toHaveAttribute("href", "/store");

    // Verifica el botón de llamada a la acción
    const ctaButton = screen.getByRole("link", {
      name: mockHeaderProps.content.ctaButton.label,
    });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute(
      "href",
      mockHeaderProps.content.ctaButton.href
    );
  });
});
// tests/integration/Header.test.tsx
