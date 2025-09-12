// frontend/src/app/layout.tsx
/**
 * @file layout.tsx (Raíz)
 * @description Layout raíz definitivo.
 *              - v5.0.0: Refactorización sistémica para manejar la prop `params`
 *                asíncrona, resolviendo un error de build de Next.js.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
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

// <<-- SOLUCIÓN SISTÉMICA: La función del componente DEBE ser `async`.
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
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
