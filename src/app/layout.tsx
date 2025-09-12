// frontend/src/app/layout.tsx
/**
 * @file layout.tsx (Raíz)
 * @description Layout raíz de la aplicación. Es el componente servidor que define
 *              la estructura <html> y <body> principal. Como RSC, es `async`
 *              para cumplir con el contrato del App Router de Next.js.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/layout.tsx.md
 */
import React from "react";
import { Inter, Poppins } from "next/font/google";
import { type Locale } from "@/lib/i18n.config";
import "@/app/globals.css";

// --- CONFIGURACIÓN DE FUENTES GLOBALES ---
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

// --- TIPOS Y CONTRATOS ---
interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

// --- LAYOUT RAÍZ ---
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps): Promise<React.ReactElement> {
  // La observabilidad a este nivel tan alto usualmente no es necesaria,
  // pero se mantiene por consistencia.
  console.log(
    `[Observabilidad] Renderizando RootLayout para locale: ${params.locale}`
  );

  return (
    <html
      lang={params.locale}
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
// frontend/src/app/layout.tsx
