// .docs-espejo/components/layout/CampaignThemeProvider.tsx.md
/**
 * @file CampaignThemeProvider.tsx.md
 * @description Documento espejo para el proveedor de tema de campañas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: CampaignThemeProvider

## 1. Rol Estratégico

Este aparato es un **Inyector de Sobrescritura de Tema**. Su única y crítica responsabilidad es tomar el manifiesto de diseño de una campaña específica (`theme.json`) y aplicarlo dinámicamente al documento.

Actúa como una capa de personalización que se superpone al tema global del portal (inyectado por `LocaleLayout`). Al navegar a una página de campaña, este componente se monta, aplica los estilos únicos de la campaña; al navegar fuera, se desmonta y limpia sus propios estilos, permitiendo que el tema global del portal vuelva a ser visible. Este mecanismo es el corazón de la arquitectura de campañas visualmente soberanas.

## 2. Arquitectura y Flujo de Ejecución

Este es un **Componente Cliente (`"use client"`)** porque su función principal es manipular el DOM, una operación que solo puede ocurrir en el navegador.

1.  **Recepción de Props:** El componente recibe un objeto `theme` que contiene las claves `colors` y `fonts` definidas en el `theme.json` de la campaña activa.
2.  **Efecto Secundario (`useEffect`):** Al montarse o cuando el `theme` prop cambia, se dispara un efecto:
    *   Invoca al helper `generateCampaignThemeVariablesStyle(theme)` para transformar el objeto `theme` en una cadena de texto CSS con variables (ej. `:root { --primary: 217 91% 60%; }`).
    *   Busca en el `<head>` del documento una etiqueta `<style>` con el ID `campaign-theme-styles`.
    *   Si no la encuentra, la crea y la añade.
    *   Inserta la cadena de texto CSS generada en el contenido de la etiqueta `<style>`. Debido a la "cascada" de CSS, estas variables sobrescriben las variables globales inyectadas por `LocaleLayout`.
3.  **Limpieza (`useEffect` return):** Cuando el componente se desmonta (ej. al navegar a otra página), la función de limpieza del `useEffect` se ejecuta. Esta busca la etiqueta `<style>` por su ID y la elimina del DOM. Este paso es **crucial** para evitar que los estilos de una campaña "se filtren" a otras páginas del portal.

## 3. Contrato de API (`Props`)

-   `theme: CampaignTheme`: El objeto de tema, validado por Zod, que contiene las definiciones de `colors` y `fonts` para la campaña.
-   `children: React.ReactNode`: Los componentes hijos (típicamente las secciones de la página de campaña) que serán renderizados. Este componente no los modifica, simplemente los devuelve.

## 4. Zona de Melhorias Futuras

1.  **Transiciones de Tema Suaves:** Investigar el uso de `useTransition` de React o transiciones de CSS en las propias variables para crear un fundido suave entre el tema global y el tema de la campaña al navegar.
2.  **Validación de Tema en Cliente:** Aunque Zod valida en el build, se podría añadir una validación en desarrollo dentro del componente para alertar si un objeto de tema mal formado llega por alguna razón inesperada.
3.  **Soporte para Múltiples Temas Anidados:** Explorar un sistema más avanzado con un Context Provider si alguna vez se necesita anidar temas (ej. una sección específica dentro de una campaña con su propio micro-tema).
// .docs-espejo/components/layout/CampaignThemeProvider.tsx.md