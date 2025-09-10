// src/app/[locale]/layout.tsx
/**
 * @file layout.tsx (Principal con Locale)
 * @description Layout principal para todas las rutas internacionalizadas.
 *              Refactorizado para incluir `generateStaticParams` y resolver
 *              errores de tipado estático de rutas en Next.js.
 * @version 4.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollingBanner } from "@/components/layout/ScrollingBanner";
import { getDictionary } from "@/lib/i18n";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/**
 * @function generateStaticParams
 * @description Informa a Next.js de todas las rutas de `locale` que deben ser
 *              generadas estáticamente en tiempo de build. Esta función es la
 *              SSoT para los locales soportados y es crucial para la correcta
 *              generación de tipos de ruta.
 * @returns {Promise<{ locale: string }[]>} Un array de objetos con los parámetros.
 */
export async function generateStaticParams() {
  const locales = ["es-ES", "pt-BR", "en-US", "it-IT"];
  return locales.map((locale) => ({ locale }));
}

/**
 * @interface LocaleLayoutProps
 * @description Define el contrato de props para el layout, asegurando que
 *              los `params` contengan el `locale`.
 */
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

/**
 * @function generateMetadata
 * @description Genera los metadatos de la página dinámicamente según el `locale`.
 * @param {LocaleLayoutProps} props - Las props que contienen los `params`.
 * @returns {Promise<Metadata>} El objeto de metadatos para la página.
 */
export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const t = await getDictionary(params.locale);
  return {
    title: { default: t.metadata.title, template: `%s | ${t.metadata.title}` },
    description: t.metadata.description,
  };
}

/**
 * @component LocaleLayout
 * @description El componente de layout principal que envuelve todas las páginas
 *              internacionalizadas.
 * @param {Readonly<LocaleLayoutProps>} props - Las props del layout.
 * @returns {Promise<React.ReactElement>} El elemento JSX del layout.
 */
export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const t = await getDictionary(params.locale);
  console.log(
    `[Observabilidad] Renderizando LocaleLayout para: ${params.locale}`
  );

  return (
    <html lang={params.locale} className={inter.variable}>
      <body className="font-sans antialiased">
        <ScrollingBanner message={t.scrollingBanner.message} />
        <Header
          campaignPills={t.header.campaignPills}
          ctaButton={t.header.ctaButton}
          logoUrl={t.header.logoUrl}
          logoAlt={t.header.logoAlt}
        />
        <main>{children}</main>
        <Footer
          copyright={t.footer.copyright}
          links={t.footer.links}
          disclaimer={t.footer.disclaimer}
        />
      </body>
    </html>
  );
}
// src/app/[locale]/layout.tsx
