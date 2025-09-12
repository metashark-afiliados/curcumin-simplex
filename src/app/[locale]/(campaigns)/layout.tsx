// frontend/src/app/[locale]/(campaigns)/layout.tsx
/**
 * @file layout.tsx (Campaigns Group)
 * @description Layout para el grupo de rutas de campañas. Provee un entorno
 *              aislado y seguro para las landing pages de alta conversión.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/app/[locale]/(campaigns)/layout.tsx.md
 */
import React from "react";
import { AntiCopyHandler } from "@/components/HOCs/AntiCopyHandler";
import { clientLogger } from "@/lib/logging";

interface CampaignLayoutProps {
  children: React.ReactNode;
}

/**
 * @component CampaignLayout
 * @description Aplica un marco de seguridad y aislamiento a las páginas de campaña.
 * @param {CampaignLayoutProps} props Las props del layout.
 * @returns {React.ReactElement} El elemento JSX del layout de campañas.
 */
export default function CampaignLayout({
  children,
}: CampaignLayoutProps): React.ReactElement {
  clientLogger.info(
    "[CampaignLayout] Aplicando layout de aislamiento para campañas."
  );

  return (
    <AntiCopyHandler>
      <div className="campaign-wrapper">{children}</div>
    </AntiCopyHandler>
  );
}
// frontend/src/app/[locale]/(campaigns)/layout.tsx
