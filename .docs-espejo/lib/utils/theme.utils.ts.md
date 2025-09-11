# /.docs-espejo/lib/utils/theme.utils.ts.md
/**
 * @file .docs-espejo/lib/utils/theme.utils.ts.md
 * @description Documento espejo para el aparato de utilidades de tema.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Orquestador de Estilos Dinámicos

## 1. Rol Estratégico

El aparato `theme.utils.ts` es el **motor de inyección de temas** del proyecto. Su única responsabilidad es traducir objetos de configuración de JavaScript (que definen los tokens de diseño de un tema) en una cadena de texto CSS que declara variables CSS. Esta cadena se inyecta directamente en el DOM, permitiendo que la UI se adapte dinámicamente al tema global o a un tema de campaña específico sin recargar la página y evitando el FOUC (Flash of Unstyled Content).

## 2. Arquitectura y Flujo de Ejecución

La arquitectura se basa en el principio DRY (Don't Repeat Yourself) y la Responsabilidad Única.

1.  **Entrada:** Recibe un objeto de tema (`ThemeObject`) que se adhiere a un contrato estricto (con claves opcionales como `colors`, `fonts`, `rgbColors`).
2.  **Procesamiento (Función Privada):** La función `generateCssVariablesFromThemeObject` itera sobre las claves del objeto y construye una lista de declaraciones de variables CSS (ej. `--primary: 220 60% 26%;`).
3.  **Salida:** Devuelve una única cadena de texto CSS envuelta en un selector `:root { ... }`, lista para ser inyectada en una etiqueta `<style>`.

El aparato expone dos funciones públicas que actúan como puntos de entrada específicos:
*   `generateThemeVariablesStyle`: Para el tema global (`GLOBAL_DESIGN_TOKENS`).
*   `generateCampaignThemeVariablesStyle`: Para un tema de campaña variable.

## 3. Contrato de API

### `generateThemeVariablesStyle()`
*   **Entrada:** Ninguna.
*   **Salida:** `string | null` - La cadena CSS para el tema global.

### `generateCampaignThemeVariablesStyle(theme: CampaignTheme)`
*   **Entrada:** Un objeto `CampaignTheme`.
*   **Salida:** `string | null` - La cadena CSS para el tema de la campaña.

## 4. Zona de Melhorias Futuras

1.  **Procesamiento de Tokens Genérico:** La función `generateCssVariablesFromThemeObject` podría refactorizarse para ser completamente agnóstica a las claves del tema (eliminar los `if` para `colors`, `fonts`, etc.) e iterar de forma más genérica, haciéndola más extensible a nuevos tipos de tokens (ej. `spacing`, `shadows`) sin necesidad de modificar el código.
2.  **Soporte para Múltiples Selectores:** Añadir un parámetro opcional para cambiar el selector de `":root"` a otro (ej. un `className` específico), permitiendo temas por sección.
3.  **Generación de Fallbacks:** La función podría generar automáticamente valores de fallback para las variables CSS.
4.  **Integración con Validador:** Podría aceptar un schema de Zod como argumento para validar el objeto de tema entrante en tiempo de ejecución, aumentando la robustez.