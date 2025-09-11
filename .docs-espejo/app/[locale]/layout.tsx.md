// .docs-espejo/app/[locale]/layout.tsx.md
/**
 * @file layout.tsx.md
 * @description Documento espejo para el layout principal internacionalizado.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Layout Raíz Internacionalizado

## 1. Rol Estratégico

Este aparato es el **esqueleto fundamental** para todas las páginas públicas del portal (`/store`, `/about`, `/`, etc.). Sus responsabilidades estratégicas son triples:

1.  **Definir la Estructura Visual Global:** Renderiza los componentes persistentes como el `Header`, `Footer` y `ScrollingBanner`, asegurando una experiencia de usuario consistente en todo el portal.
2.  **Actuar como Punto de Entrada de i18n:** Recibe el parámetro `[locale]` de la URL, lo que le permite cargar y distribuir el diccionario de contenido correcto a todos sus componentes hijos.
3.  **Ser el Inyector de la SSoT de Diseño:** Su rol más crítico es consumir la configuración de `src/config/branding.config.ts` y **inyectar dinámicamente** todos los tokens de diseño (colores, fuentes) como variables CSS globales. Esto convierte al layout en el único responsable de aplicar el tema visual por defecto del portal.

## 2. Arquitectura y Flujo de Ejecución

Como Server Component, su lógica se ejecuta en tiempo de build (para SSG):

1.  **Recepción de Parámetros:** Next.js le pasa los `params`, que contienen el `locale` de la ruta actual.
2.  **Generación de Estilos:** Invoca al helper `generateThemeVariablesStyle()` para obtener una cadena de texto CSS que contiene todas las variables de diseño globales (ej. `--primary: 220 60% 26%;`).
3.  **Carga de Contenido:** Invoca a `getDictionary(locale)` para cargar el contenido textual correspondiente al idioma.
4.  **Renderizado y Ensamblaje:**
    *   Renderiza la estructura base `<html>` y `<body>`, incluyendo las clases de las fuentes (`next/font`).
    *   Inyecta la cadena de estilos CSS dentro de una etiqueta `<style>`, haciendo que las variables de diseño estén disponibles para `globals.css` y todos los componentes anidados.
    *   Renderiza los componentes de layout (`Header`, `Footer`, etc.), pasándoles el contenido i18n correspondiente desde el diccionario cargado.
    *   Finalmente, renderiza `{children}`, que corresponde al contenido específico de la página que se está visitando.

## 3. Contrato de API (`Props`)

-   `children: React.ReactNode`: El contenido de la página específica que se renderizará dentro de la plantilla del layout.
-   `params: { locale: Locale }`: Un objeto que contiene el `locale` extraído del segmento de la URL, validado contra nuestra SSoT de i18n.

## 4. Zona de Melhorias Futuras

1.  **Selector de Tema de Usuario:** Implementar una lógica que lea una cookie de preferencia de tema (ej. `theme="high-contrast"`) y cargue un conjunto diferente de tokens de diseño, permitiendo la personalización por parte del usuario.
2.  **Integración con `CampaignThemeProvider`:** Analizar la coexistencia con el `CampaignThemeProvider`. El `LocaleLayout` establece el tema base del portal. Cuando se navega a una página de campaña, el `CampaignThemeProvider` inyectará sus propios estilos, que por la especificidad de la cascada de CSS, sobreescribirán las variables base, logrando el theming por campaña de forma natural.
3.  **Carga de Scripts de Terceros:** Centralizar aquí la lógica para inyectar scripts globales (ej. Google Tag Manager) basándose en el consentimiento de cookies.
4.  **Context Provider para el Portal:** Si el portal crece en complejidad, este layout sería el lugar ideal para inicializar un Context Provider global que comparta estado entre diferentes páginas del portal (ej. estado del carrito de compras).
// .docs-espejo/app/[locale]/layout.tsx.md