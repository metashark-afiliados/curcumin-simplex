// RUTA: src/components/sections/GuaranteeSection.tsx
/**
 * @file Sección de Garantía
 * @description Muestra una sección destacada con un sello de garantía, un título
 * y un texto descriptivo. Ideal para reforzar la confianza del cliente.
 * El contenido y la imagen del sello se pasan como props.
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface GuaranteeSectionProps {
  title: string;
  text: string;
  imageUrl: string;
}

export function GuaranteeSection({
  title,
  text,
  imageUrl,
}: GuaranteeSectionProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8 border-2 border-brand-success rounded-lg shadow-lg bg-green-50/50">
          <div className="flex-shrink-0">
            <Image
              src={imageUrl}
              alt="Selo de Garantia"
              width={150}
              height={150}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-text-dark">{title}</h2>
            <p className="mt-4 text-brand-text-light">{text}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// --- MEJORAS FUTURAS ---
// 1. **Color de borde dinámico**: La clase `border-brand-success` está hardcodeada.
//    Se podría pasar una prop `variant` o `borderColor` para hacer el componente
//    más versátil y adaptable a diferentes tipos de garantías (ej. "Garantía de Satisfacción"
//    en verde, "Garantía de Seguridad" en azul).
// 2. **Animación al hacer scroll**: Aplicar una animación sutil (ej. el sello "cae" en su lugar)
//    cuando la sección entra en el viewport podría hacerla más llamativa.

// RUTA: src/components/sections/GuaranteeSection.tsx
