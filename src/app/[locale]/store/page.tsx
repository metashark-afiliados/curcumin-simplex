// src/app/[locale]/store/page.tsx
/**
 * @file page.tsx (Store)
 * @description Página de la tienda del portal Global Fitwell.
 *              Corregida con acceso correcto a datos y mejoras de UI.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";

interface StorePageProps {
  params: { locale: string };
}

export default async function StorePage({ params }: StorePageProps) {
  console.log(
    `[Observabilidad] Renderizando StorePage para el locale: ${params.locale}`
  );
  const t = await getDictionary(params.locale);
  const content = t.storePage;

  if (!content) {
    console.warn(
      `[StorePage] Contenido para el locale '${params.locale}' no encontrado.`
    );
    return (
      <PageHeader
        title="Contenido no disponible"
        subtitle="La tienda no está disponible en este idioma."
      />
    );
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 p-6 bg-muted/20 rounded-lg h-fit">
            <h2 className="text-lg font-bold text-primary mb-4">
              {content.filters.categoryTitle}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {content.filters.categories.map((cat) => (
                <li
                  key={cat.label}
                  className="flex justify-between items-center"
                >
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    {cat.label}
                  </a>
                  <span className="text-xs bg-background/50 px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {content.products.map((product) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="block group"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg border border-muted bg-muted/20 h-full flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
                    <div className="relative w-full h-56 bg-background/50">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-md font-bold text-primary flex-grow">
                        {product.name}
                      </h3>
                      <p className="mt-4 text-lg font-semibold text-foreground">
                        {new Intl.NumberFormat(params.locale, {
                          style: "currency",
                          currency: "EUR",
                        }).format(product.price)}
                      </p>
                      {/* <<-- CORRECCIÓN: Se usa un div estilizado en lugar de Button con prop 'as' -->> */}
                      <div className="mt-4 w-full h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium bg-secondary text-secondary-foreground">
                        Ver Detalles
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </Container>
    </>
  );
}
// src/app/[locale]/store/page.tsx
