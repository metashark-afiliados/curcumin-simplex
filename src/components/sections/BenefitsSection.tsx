// RUTA: src/components/sections/BenefitsSection.tsx
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface BenefitsSectionProps {
  title: string;
  subtitle: string;
  benefits: string[];
}

export function BenefitsSection({
  title,
  subtitle,
  benefits,
}: BenefitsSectionProps) {
  return (
    <div className="py-16 bg-white">
      <Container className="text-center">
        <h2 className="text-3xl font-bold text-brand-text-dark tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-lg text-brand-text-light max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 text-left max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-4">
              <CheckCircle2 className="h-7 w-7 text-brand-success flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-brand-text-dark">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
// RUTA: src/components/sections/BenefitsSection.tsx
