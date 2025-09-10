// src/components/layout/CampaignThemeProvider.tsx
/**
 * @file CampaignThemeProvider.tsx
 * @description Componente cliente responsable de inyectar las variables de CSS
 *              del tema de una campaña específica en el documento.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import type { CampaignData } from "@/lib/i18n/campaign.i18n";

/**
 * @interface CampaignThemeProviderProps
 * @description Define las props para el CampaignThemeProvider.
 * @property {CampaignData['theme']} theme - El objeto de tema extraído del theme.json de la campaña.
 * @property {React.ReactNode} children - Los componentes hijos que serán renderizados.
 */
interface CampaignThemeProviderProps {
  theme: CampaignData["theme"];
  children: React.ReactNode;
}

/**
 * @constant STYLE_ELEMENT_ID
 * @description Un ID único para la etiqueta <style> que inyectaremos. Esto nos
 *              permite encontrarla y removerla de forma segura durante la limpieza del efecto.
 */
const STYLE_ELEMENT_ID = "campaign-theme-styles";

/**
 * @component CampaignThemeProvider
 * @description Este componente no renderiza ningún DOM visible. Su único propósito es
 *              aplicar un efecto secundario: generar y aplicar los estilos de la campaña.
 *              Utiliza `useEffect` para manipular el DOM del lado del cliente, que es la
 *              práctica correcta en el App Router de Next.js.
 * @param {CampaignThemeProviderProps} props - Las propiedades del componente.
 * @returns {React.ReactElement} Retorna los hijos sin ninguna envoltura adicional.
 */
export function CampaignThemeProvider({
  theme,
  children,
}: CampaignThemeProviderProps): React.ReactElement {
  console.log("[Observabilidad] Aplicando tema de campaña específico.");

  useEffect(() => {
    const cssVariables: string[] = [];

    // Genera las variables de color si están definidas en el tema
    if (theme.colors) {
      for (const [key, value] of Object.entries(theme.colors)) {
        cssVariables.push(`--${key}: ${value};`);
      }
    }

    // Genera las variables de fuente si están definidas en el tema
    if (theme.fonts) {
      for (const [key, value] of Object.entries(theme.fonts)) {
        cssVariables.push(`--font-${key}: ${value};`);
      }
    }

    // Si no hay variables que aplicar, no hacemos nada.
    if (cssVariables.length === 0) {
      return;
    }

    // Construye la regla CSS completa
    const styleRule = `:root { ${cssVariables.join(" ")} }`;

    // Busca si ya existe una etiqueta de estilo de tema para evitar duplicados
    let styleElement = document.getElementById(STYLE_ELEMENT_ID);

    // Si no existe, la crea y la añade al <head>
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = STYLE_ELEMENT_ID;
      document.head.appendChild(styleElement);
    }

    // Aplica las nuevas reglas de estilo
    styleElement.innerHTML = styleRule;

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    // Es crucial para remover los estilos de la campaña al navegar a otra página.
    return () => {
      const existingStyleElement = document.getElementById(STYLE_ELEMENT_ID);
      if (existingStyleElement) {
        existingStyleElement.remove();
        console.log("[Observabilidad] Tema de campaña removido.");
      }
    };
  }, [theme]); // El efecto se re-ejecuta solo si el objeto 'theme' cambia.

  return <>{children}</>;
}
// src/components/layout/CampaignThemeProvider.tsx
