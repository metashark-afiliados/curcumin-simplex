// tests/integration/Header.test.tsx
/**
 * @file Header.test.tsx
 * @description Test de integración para el Header.
 *              Actualizado para alinearse con el nuevo contrato de props
 *              y la sintaxis de importación por defecto del Header.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 *
 * @changelog
 * - v2.1.0: Corregido el error de importación TS2614, cambiando a
 *   una importación por defecto para el componente Header.
 */
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header"; // <<-- CORRECCIÓN APLICADA

// Mock de las props de i18n para simular el contenido que recibiría el componente.
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
  // Se añade un mock para el diccionario de desarrollo para completar el contrato de props.
  devDictionary: {
    devToolsGroup: "DEV TOOLS",
    campaignPagesGroup: "CAMPAIGN PAGES",
    // ... (resto de claves del devRouteMenu)
  },
};

describe("Componente de Sección: Header", () => {
  it("Renderiza el logo, la navegación y el botón CTA correctamente", () => {
    // @ts-ignore - Ignoramos el resto de las props de devDictionary por brevedad en el test
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