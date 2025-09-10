// tests/unit/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Componente: Button", () => {
  it("Renderiza un elemento <button> por defecto", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe("BUTTON");
  });

  it("Renderiza un elemento <a> cuando se pasa la prop 'href'", () => {
    render(<Button href="/test-path">Click Me</Button>);
    const linkElement = screen.getByRole("link", { name: /click me/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A");
    expect(linkElement).toHaveAttribute("href", "/test-path");
  });

  it("Aplica correctamente las clases de variante y tamaño", () => {
    render(
      <Button variant="success" size="lg">
        Success
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /success/i });
    expect(buttonElement).toHaveClass("bg-success");
    expect(buttonElement).toHaveClass("h-11"); // 'lg' size
  });

  it("Está deshabilitado cuando se pasa la prop 'disabled'", () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole("button", { name: /disabled/i });
    expect(buttonElement).toBeDisabled();
  });
});
// tests/unit/Button.test.tsx
