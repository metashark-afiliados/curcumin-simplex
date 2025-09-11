// .docs-espejo/lib/utils/theme.utils.md
/**
 * @file theme.utils.md
 * @description Documento espejo para el aparato helper de gestión de temas.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Theme Utils

## 1. Rol Estratégico

El aparato `theme.utils.ts` es un **Helper de Lógica Pura** con una única responsabilidad: **transformar objetos de configuración de tema en cadenas de texto CSS ejecutables**.

Actúa como una fábrica que desacopla la *definición* de los tokens de diseño (que viven en `branding.config.ts` o en los `theme.json` de las campañas) de su *implementación* en el DOM (que es gestionada por los componentes de layout como `LocaleLayout` y `CampaignThemeProvider`).

## 2. Arquitectura y Flujo de Ejecución

La arquitectura interna se basa en el principio **DRY (Don't Repeat Yourself)**.

1.  **Función Genérica Privada (`generateCssVariablesFromThemeObject`):**
    *   Esta es la pieza central del módulo. Es una función pura que no conoce la fuente de sus datos.
    *   Recibe un objeto genérico que puede contener `colors`, `rgbColors` y `fonts`.
    *   Itera sobre las propiedades del objeto y las formatea en una sintaxis de variables CSS para el selector `:root`.
    *   Si no se generan variables, devuelve `null` para evitar la inyección de etiquetas `<style>` vacías.

2.  **Funciones Públicas (Wrappers):**
    *   **`generateThemeVariablesStyle()`:** Esta función pública no contiene lógica de formateo. Su única tarea es invocar a la función privada pasándole la SSoT de diseño global (`GLOBAL_DESIGN_TOKENS`).
    *   **`generateCampaignThemeVariablesStyle(theme)`:** Esta función pública recibe un objeto `theme` de campaña y simplemente lo pasa a la función privada para su procesamiento.

Este diseño de "worker privado, interfaces públicas" asegura que la lógica de formateo de CSS esté centralizada en un solo lugar, haciendo que el sistema sea más mantenible y menos propenso a errores.

## 3. Contrato de API (`Exports`)

-   `generateThemeVariablesStyle(): string | null`: Interfaz para obtener los estilos del tema global.
-   `generateCampaignThemeVariablesStyle(theme: CampaignTheme): string | null`: Interfaz para obtener los estilos de un tema de campaña.

## 4. Zona de Melhorias Futuras

1.  **Soporte para Anidamiento:** Extender la función `generateCssVariablesFromThemeObject` para que pueda manejar objetos de tema anidados (ej. `colors: { primary: { DEFAULT: '...', hover: '...' } }`) y generar variables CSS correspondientes (ej. `--primary: ...; --primary-hover: ...;`).
2.  **Generación de Clases de Utilidad:** El helper podría expandirse para no solo generar variables, sino también clases de utilidad completas si se necesitara un sistema de theming aún más complejo.
3.  **Validación de Tokens:** Integrar una validación con Zod dentro del helper para asegurar que los valores de los tokens (ej. colores en formato HSL) sean correctos antes de generar el CSS.
// .docs-espejo/lib/utils/theme.utils.md