// frontend/src/app/[locale]/(portal)/[...not_found]/page.tsx
/**
 * @file page.tsx (Not Found Catcher)
 * @description Página 404 personalizada para el grupo de rutas del portal.
 *              Captura todas las rutas no coincidentes dentro del portal
 *              y muestra un mensaje de error amigable, manteniendo el layout
 *              global (Header/Footer).
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFoundCatchAll() {
  console.log("[Observabilidad] Renderizando página 404 del Portal");

  return (
    <Container className="flex flex-col items-center justify-center text-center py-24">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-foreground">
        Página No Encontrada
      </h2>
      <p className="mt-4 text-muted-foreground">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Button href="/" className="mt-8">
        Volver al Inicio
      </Button>
    </Container>
  );
}
// frontend/src/app/[locale]/(portal)/[...not_found]/page.tsx
