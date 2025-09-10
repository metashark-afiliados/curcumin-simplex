// src/app/[locale]/(campaigns)/layout.tsx
import { AntiCopyHandler } from "@/components/HOCs/AntiCopyHandler";
import React from "react";

/**
 * @file layout.tsx (Grupo de Campañas)
 * @description Layout compartido para todas las landing pages de campañas.
 *              Su única responsabilidad es aplicar lógica transversal como
 *              la protección anti-copia.
 * @version 2.0.0
 */
export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(
    "[Observabilidad] Aplicando layout de grupo para campañas (con AntiCopy)"
  );
  // Este layout envuelve a todas las páginas de campaña,
  // aplicando la protección de forma centralizada.
  return <AntiCopyHandler>{children}</AntiCopyHandler>;
}
// src/app/[locale]/(campaigns)/layout.tsx
