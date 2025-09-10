// src/app/layout.tsx
/**
 * @file layout.tsx (Raíz)
 * @description Layout raíz no enrutable. Define la estructura HTML base.
 * @version 1.0.0
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // El atributo lang será establecido por el layout anidado que sí tiene
    // acceso al parámetro [locale].
    <html>
      <body>{children}</body>
    </html>
  );
}
// src/app/layout.tsx
