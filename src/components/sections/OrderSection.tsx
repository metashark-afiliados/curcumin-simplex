// src/components/sections/OrderSection.tsx
/**
 * @file OrderSection.tsx
 * @description Sección dedicada a la conversión, que contiene el formulario de pedido.
 * @version 1.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import { OrderForm } from "@/components/ui/OrderForm";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface OrderSectionProps {
  content: Dictionary["orderForm"];
  locale: string;
}

/**
 * @component OrderSection
 * @description Renderiza la sección de pedido.
 * @param {OrderSectionProps} props Las propiedades con el contenido.
 * @returns {React.ReactElement | null} El elemento JSX de la sección.
 */
export function OrderSection({
  content,
  locale,
}: OrderSectionProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando OrderSection");

  if (!content) return null;

  return (
    <section id="order-form" className="py-16 sm:py-24 bg-secondary/20">
      <Container className="max-w-md">
        <OrderForm
          locale={locale}
          originalPrice={content.originalPrice}
          discountedPrice={content.discountedPrice}
          originalPriceLabel={content.originalPriceLabel}
          discountedPriceLabel={content.discountedPriceLabel}
          nameInputLabel={content.nameInputLabel}
          nameInputPlaceholder={content.nameInputPlaceholder}
          phoneInputLabel={content.phoneInputLabel}
          phoneInputPlaceholder={content.phoneInputPlaceholder}
          submitButtonText={content.submitButtonText}
          submitButtonLoadingText={content.submitButtonLoadingText}
        />
      </Container>
    </section>
  );
}
// src/components/sections/OrderSection.tsx
