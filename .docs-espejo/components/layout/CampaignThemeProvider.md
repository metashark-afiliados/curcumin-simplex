// .docs-espejo/components/layout/CampaignThemeProvider.md
/**
 * @file CampaignThemeProvider.md
 * @description Documento espejo para el componente CampaignThemeProvider.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: CampaignThemeProvider

## 1. Rol Estratégico

El `CampaignThemeProvider` es el **Inyector de Tema Dinámico** para el dominio de campañas. Su única y crucial responsabilidad es tomar un objeto de configuración de tema (`theme.json`) y aplicar sus variables de diseño (colores, fuentes) de manera que sobrescriban los estilos globales del portal, pero solo para la página de campaña que se está visualizando.

Este componente es la pieza clave que permite que cada sub-campaña tenga una identidad visual completamente única y soberana.

## 2. Arquitectura y Flujo de Ejecución (Server Component)

Este aparato es un **Componente de Servidor (`Server Component`)** puro y síncrono. Esta decisión arquitectónica es fundamental para el rendimiento y la experiencia de usuario.

1.  **Recepción de Props:** La `CampaignPage` (otro Server Component) le pasa el objeto `theme` que ha sido cargado desde el `theme.json` de la campaña.
2.  **Generación de Estilos en el Servidor:** Invoca a la función helper `generateCampaignThemeVariablesStyle(theme)`. Esta función, que también se ejecuta en el servidor, transforma el objeto `theme` en una cadena de texto CSS (ej. `:root { --primary: 217 91% 60%; ... }`).
3.  **Inyección en el HTML:** El componente renderiza una etiqueta `<style>` directamente en el stream de HTML que se envía al navegador. La cadena CSS generada se inserta usando `dangerouslySetInnerHTML`.
4.  **Renderizado de Hijos:** Renderiza los `children` (el resto de las secciones de la página de campaña) que ahora pueden utilizar las variables CSS de la campaña que acaban de ser inyectadas.

**Ventaja Clave:** Al ser un Server Component, todo este proceso ocurre antes de que la página llegue al navegador, **eliminando por completo el Flash of Unstyled Content (FOUC)** que ocurriría con una implementación de `useEffect` en el cliente.

## 3. Contrato de API (`Props`)

-   `theme: CampaignTheme`: El objeto de configuración del tema, validado por Zod, que contiene los colores y fuentes a aplicar.
-   `children: React.ReactNode`: Los componentes de sección de la página que deben ser renderizados dentro del contexto de este tema.

## 4. Zona de Melhorias Futuras

1.  **Indicador Visual de Tema:** En modo de desarrollo, el provider podría renderizar un pequeño `badge` en una esquina de la pantalla que indique el nombre del tema de campaña que está activo (`scientific`, `vitality`, etc.) para facilitar la depuración.
2.  **Fallback de Tema:** Implementar una lógica de fallback para que si el objeto `theme` es inválido o está incompleto, no inyecte estilos rotos y permita que el tema global del portal se aplique de forma segura.
3.  **Animación de Transición de Tema:** Para futuras aplicaciones de página única (SPA) donde se pueda cambiar de tema sin recargar la página, se podría evolucionar este componente para que gestione transiciones animadas entre paletas de colores.
// .docs-espejo/components/layout/CampaignThemeProvider.md