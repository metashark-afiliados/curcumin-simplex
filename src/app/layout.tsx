// src/app/layout.tsx
/**
 * @file layout.tsx (Raíz)
 * @description Layout raíz definitivo. Resuelve el error de tipo RSC TS1360
 *              al esperar correctamente la prop `params`.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { type Locale } from "@/lib/i18n.config";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // <<-- SOLUCIÓN TS1360: Se espera la resolución de la Promise de `params`.
  const awaitedParams = await params;
  return (
    <html
      lang={awaitedParams.locale}
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
// src/app/layout.tsx
