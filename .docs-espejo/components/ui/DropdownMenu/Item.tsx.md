// .docs-espejo/components/ui/DropdownMenu/Item.tsx.md
/**
 * @file Item.tsx.md
 * @description Documento espejo y SSoT conceptual para el componente Item del DropdownMenu.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente `Item`

## 1. Rol Estratégico

El aparato `Item.tsx` es un **componente de presentación atómico**. Su única responsabilidad es renderizar la apariencia y el comportamiento visual de una opción individual dentro de un `DropdownMenu`. Está diseñado para ser el "cuerpo" de la acción, mostrando texto, iconos u otros elementos.

Estratégicamente, este componente no maneja la lógica de la acción en sí misma. Se espera que sea envuelto por un componente que proporcione la interactividad, como un `Link` de Next.js para la navegación, o que se le pase un manejador `onClick` directamente.

## 2. Arquitectura y Flujo de Ejecución

1.  **Naturaleza:** Es un Componente Cliente (`"use client"`) para mantener la consistencia con el sistema `DropdownMenu`.
2.  **Renderizado:** Renderiza un `div` que actúa como el contenedor del item.
3.  **Estilo:** Utiliza `twMerge` para aplicar un conjunto base de estilos de Tailwind CSS (padding, colores, transiciones, etc.) y permitir la sobreescritura a través de la prop `className`. Los estilos incluyen estados `hover` para proporcionar feedback visual al usuario.
4.  **Accesibilidad:**
    *   `role="menuitem"`: Comunica a las tecnologías de asistencia que este elemento es una opción dentro de un menú.
    *   `tabIndex={-1}`: Es crucial. Evita que el item sea enfocable a través de la tecla `Tab` (la navegación dentro de un menú se debe manejar con las flechas), pero permite que se le dé foco mediante programación (ej. JavaScript).

## 3. Contrato de API

*   **Entradas (Props):**
    *   `children: React.ReactNode`
    *   Hereda todos los atributos de un `HTMLDivElement`, incluyendo `className` y `onClick`.
*   **Salidas:**
    *   Un único elemento JSX `<div role="menuitem" ... />`.

## 4. Zona de Melhorias Futuras

1.  **Estado Deshabilitado (`disabled`):** Se podría añadir una prop `disabled: boolean`. Si es `true`, el componente añadiría clases de estilo para aparecer visualmente atenuado y eliminaría el comportamiento `hover` y el `cursor-pointer`, además de añadir `aria-disabled="true"`.
2.  **Variante con "Checkmark":** Se podría añadir una prop `isSelected: boolean` que, si es `true`, renderice un icono de "check" al lado del `children` para indicar que esa opción está actualmente seleccionada.
3.  **Soporte para Atajos de Teclado:** Se podría añadir una prop `shortcut: string` que renderice un `<span>` estilizado a la derecha del item para mostrar un atajo de teclado asociado a la acción (ej. "Ctrl+S").

// .docs-espejo/components/ui/DropdownMenu/Item.tsx.md