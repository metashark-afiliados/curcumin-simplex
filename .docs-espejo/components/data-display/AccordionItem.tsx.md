// .docs-espejo/components/data-display/AccordionItem.tsx.md
/\*\*

- @file .docs-espejo/components/data-display/AccordionItem.tsx.md
- @description Documento Espejo para el aparato AccordionItem.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto Conceptual: Aparato AccordionItem

## 1. Rol Estratégico

El `AccordionItem` es un componente de UI atómico diseñado para la **divulgación progresiva de información**. Su rol principal es gestionar la visibilidad de un bloque de contenido, permitiendo a los usuarios mostrar u ocultar detalles a demanda. Esto es fundamental para secciones como Preguntas Frecuentes (FAQ), donde se necesita presentar una gran cantidad de información de manera compacta y sin abrumar visualmente al usuario.

## 2. Arquitectura y Flujo de Ejecución

- **Tipo:** Componente Cliente (`"use client"`). La gestión de su estado de apertura (`isOpen`) y las animaciones requieren interactividad en el navegador.
- **Estado Interno:** El componente es auto-gestionado. Utiliza el hook `useState` para controlar su estado booleano `isOpen`.
- **Flujo de Interacción:**
  1.  El componente se renderiza inicialmente en su estado cerrado (o según una prop futura).
  2.  El usuario hace clic en el elemento `<button>`.
  3.  El evento `onClick` dispara el `setIsOpen`, invirtiendo el estado actual.
  4.  El cambio de estado provoca una nueva renderización.
  5.  La animación de `framer-motion` (`AnimatePresence`) gestiona una transición suave de entrada/salida para el panel de contenido.
  6.  Los atributos `aria-expanded` y `aria-controls` se actualizan dinámicamente para mantener la accesibilidad.

## 3. Contrato de API

| Prop       | Tipo              | Requerido | Descripción                                                                              |
| :--------- | :---------------- | :-------- | :--------------------------------------------------------------------------------------- |
| `title`    | `string`          | Sí        | El texto visible que actúa como encabezado del acordeón y disparador del evento de clic. |
| `children` | `React.ReactNode` | Sí        | El contenido que se mostrará u ocultará dentro del panel del acordeón.                   |

## 4. Zona de Melhorias Futuras

1.  **Componente Contenedor `Accordion`:** Crear un componente padre `Accordion` que envuelva múltiples `AccordionItem`. Este contenedor podría gestionar el estado de sus hijos para habilitar funcionalidades como "permitir solo un item abierto a la vez" o "abrir/cerrar todos".
2.  **Estado Inicial Controlable:** Añadir una prop `defaultIsOpen: boolean` para permitir que un `AccordionItem` se renderice inicialmente en estado abierto.
3.  **Componente Controlado:** Modificar la API para que opcionalmente pueda ser un componente controlado, aceptando `isOpen: boolean` y `onToggle: () => void` como props para una gestión de estado externa.
4.  **Iconos Personalizables:** Permitir pasar componentes de icono personalizados como props para los estados abierto y cerrado, en lugar de usar `ChevronDown` por defecto.
5.  **Transiciones Configurables:** Exponer las propiedades de la transición de `framer-motion` a través de las `props` para permitir una personalización más fina de la animación.
    // .docs-espejo/components/data-display/AccordionItem.tsx.md
