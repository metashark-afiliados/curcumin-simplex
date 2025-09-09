// src/components/layout/Footer.tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface FooterProps {
  copyright: string;
  links: { label: string; href: string }[];
  disclaimer: string;
  ctaText: string;
  affiliateUrl: string;
}

export function Footer({
  copyright,
  links,
  disclaimer,
  ctaText,
  affiliateUrl,
}: FooterProps) {
  return (
    <div className="text-gray-300 pt-16 pb-10">
      <Container>
        <div className="text-center mb-12">
          <Button
            href={affiliateUrl}
            className="bg-brand-cta-buy text-brand-text-dark font-bold hover:bg-brand-cta-buy-dark shadow-lg shadow-yellow-500/30 hover:scale-110 transition-all duration-300 ease-in-out"
          >
            {ctaText}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm">{copyright}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500 border-t border-gray-700 pt-6">
          <p>{disclaimer}</p>
        </div>
      </Container>
    </div>
  );
}
