<!-- .docs-espejo/app/[locale]/(campaigns)/layout.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/(campaigns)/layout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el Layout de Campañas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: `CampaignLayout`

## 1. Rol Estratégico

El `CampaignLayout` es la **"Cáscara de Conversión"** de la aplicación. Su propósito es crear un entorno hermético y optimizado para las landing pages, eliminando toda la navegación y elementos estructurales del portal principal (`Header`, `Footer`) que podrían distraer al usuario del único objetivo: la conversión.

## 2. Arquitectura y Flujo de Ejecución

1.  **Aislamiento Estructural:** A diferencia del `PortalLayout`, este layout renderiza un `div` simple en lugar de una estructura compleja. Esto garantiza que ningún elemento global se filtre en las páginas de campaña.
2.  **Seguridad de Contenido:** Envuelve todo su contenido (`children`) en el High-Order Component `AntiCopyHandler`. Este componente del lado del cliente añade `event listeners` para deshabilitar el clic derecho, añadiendo una capa de protección al contenido de marketing.
3.  **Herencia de Layout:** Al estar en un Route Group `(campaigns)`, Next.js lo aplica automáticamente a todas las páginas bajo ese directorio, como `(campaigns)/[campaignId]/page.tsx`.

## 3. Contrato de API

*   **Entradas (`props`):**
    *   `children`: El `page.tsx` de la campaña activa.

## 4. Zona de Melhorias Futuras

*   **Inyección de Scripts de Campaña:** Este layout podría ser el lugar ideal para inyectar scripts de tracking específicos de campañas (como píxeles de Facebook o TikTok) que no son necesarios en el portal principal.
*   **Gestión de "Exit Intent":** Integrar un HOC o un hook que gestione la lógica de "exit-intent popups" para capturar a los usuarios que intentan abandonar la página.
<!-- .docs-espejo/app/[locale]/(campaigns)/layout.tsx.md -->