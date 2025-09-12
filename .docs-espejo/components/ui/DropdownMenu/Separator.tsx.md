// .docs-espejo/components/ui/DropdownMenu/Separator.tsx.md
/**
 * @file Separator.tsx.md
 * @description Documento espejo y SSoT conceptual para el componente Separator.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente `Separator`

## 1. Rol Estratégico

El aparato `Separator.tsx` es un **componente de presentación atómico y puramente visual**. Su única y exclusiva responsabilidad es renderizar una línea horizontal para crear una separación visual entre grupos de `Item`s dentro del panel de `Content` del `DropdownMenu`.

Su rol es mejorar la organización visual y la usabilidad del menú, agrupando acciones relacionadas y haciendo la interfaz más escaneable.

## 2. Arquitectura y Flujo de Ejecución

1.  **Naturaleza:** Es un Componente Cliente (`"use client"`) para mantener la consistencia con el resto del sistema `DropdownMenu`, aunque no tiene interactividad propia.
2.  **Renderizado:** Renderiza un `div` simple.
3.  **Estilo:** Utiliza `twMerge` para aplicar clases de Tailwind CSS que le dan su apariencia (margen vertical, altura de 1px, color de fondo).
4.  **Accesibilidad:** Incluye `role="separator"` para comunicar su propósito semántico a las tecnologías de asistencia.
5.  **Extensibilidad:** Acepta y fusiona una prop `className`, permitiendo sobreescribir sus estilos si es necesario.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `className?: string` (y todos los demás atributos de un `HTMLDivElement`)
*   **Salidas:**
    *   Un único elemento JSX `<div role="separator" ... />`.

## 4. Zona de Melhorias Futuras

1.  **Orientación Vertical:** El componente podría extenderse para aceptar una prop `orientation: 'horizontal' | 'vertical'` y aplicar estilos diferentes para funcionar como un separador vertical, aumentando su reutilización en otros contextos de UI.
2.  **Variantes de Estilo:** Podrían añadirse variantes (ej. `variant: 'default' | 'dashed'`) para cambiar fácilmente su apariencia sin necesidad de pasar clases personalizadas.

// .docs-espejo/components/ui/DropdownMenu/Separator.tsx.md