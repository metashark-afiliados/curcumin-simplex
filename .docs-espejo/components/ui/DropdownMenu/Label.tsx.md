// .docs-espejo/components/ui/DropdownMenu/Label.tsx.md
/**
 * @file Label.tsx.md
 * @description Documento espejo y SSoT conceptual para el componente Label del DropdownMenu.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente `Label`

## 1. Rol Estratégico

El aparato `Label.tsx` es un **componente de presentación atómico y no interactivo**. Su única y exclusiva responsabilidad es renderizar un título o etiqueta para un grupo de `Item`s dentro del `DropdownMenu`.

Su propósito es semántico y organizativo. Ayuda a estructurar visualmente menús largos o complejos, mejorando la usabilidad al agrupar acciones relacionadas bajo un encabezado claro. A diferencia de un `Item`, no está diseñado para ser clickeado.

## 2. Arquitectura y Flujo de Ejecución

1.  **Naturaleza:** Es un Componente Cliente (`"use client"`) para mantener la consistencia con el sistema `DropdownMenu`.
2.  **Renderizado:** Renderiza un `div` simple que envuelve a sus `children` (típicamente, una cadena de texto).
3.  **Estilo:** Utiliza `twMerge` para aplicar un conjunto de estilos de Tailwind CSS que lo diferencian visualmente de un `Item` (texto más pequeño, en mayúsculas, color atenuado).
4.  **Extensibilidad:** Acepta y fusiona una prop `className` para permitir la personalización de su apariencia.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `children: React.ReactNode`
    *   Hereda todos los atributos de un `HTMLDivElement`, incluyendo `className`.
*   **Salidas:**
    *   Un único elemento JSX `<div ... />`.

## 4. Zona de Melhorias Futuras

1.  **Con Icono:** Podría añadirse una prop opcional `icon: LucideIconName` para mostrar un pequeño icono a la izquierda de la etiqueta, permitiendo una mayor jerarquía visual en menús muy complejos.
2.  **Renderizado Condicional:** Podría aceptar una prop `show: boolean` para ser renderizado condicionalmente, aunque esta lógica generalmente es mejor manejarla en el componente padre que consume el `Label`.

// .docs-espejo/components/ui/DropdownMenu/Label.tsx.md