// .docs-espejo/components/ui/DropdownMenu/Content.tsx.md
/**
 * @file Content.tsx.md
 * @description Documento espejo y SSoT conceptual para el panel de contenido del DropdownMenu.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente `Content`

## 1. Rol Estratégico

El aparato `Content.tsx` es el **componente de presentación visual** que contiene los items del menú (`<Item>`, `<Separator>`, etc.). Su única responsabilidad es renderizar este panel y sus hijos cuando el menú está abierto, y no renderizar nada cuando está cerrado. Es el contenedor "desplegable" del sistema.

Utiliza `framer-motion` y `AnimatePresence` para gestionar las animaciones de entrada y salida, proporcionando una experiencia de usuario fluida y profesional.

## 2. Arquitectura y Flujo de Ejecución

1.  **Consumo de Contexto:** Utiliza el hook `useDropdownMenuContext` para obtener el estado `isOpen` y la función `setIsOpen`.
2.  **Accesibilidad de Teclado:** Implementa un `useEffect` que añade un listener de eventos `keydown` al `document`. Si el menú está abierto (`isOpen`) y el usuario presiona la tecla `Escape`, invoca `setIsOpen(false)` para cerrar el menú. El `useEffect` incluye una función de limpieza para remover el listener cuando el componente se desmonta, previniendo fugas de memoria.
3.  **Renderizado Condicional y Animación:**
    *   Utiliza el componente `<AnimatePresence>` de `framer-motion` para habilitar animaciones de salida.
    *   Dentro de `AnimatePresence`, renderiza el panel (`<motion.div>`) solo si `isOpen` es `true`.
    *   El `<motion.div>` tiene definidas las `variants` para la animación (estados `initial`, `animate`, `exit`) que crean el efecto de aparición/desaparición con escalado y fundido.
4.  **Estilo y Posicionamiento:** El panel se posiciona de forma `absolute` respecto a su contenedor padre (`Menu.tsx`, que tiene `position: relative`). La prop `align` permite controlar si el menú se alinea a la izquierda (`start`) o a la derecha (`end`) del `Trigger`.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `children: React.ReactNode`
    *   `className?: string`
    *   `align?: 'start' | 'end'`
*   **Salidas:**
    *   Un elemento JSX `<motion.div>...</motion.div>` o `null`.

## 4. Zona de Melhorias Futuras

1.  **Gestión de Foco:** Para una accesibilidad de élite, al abrirse el menú, el foco del teclado debería moverse programáticamente al primer item interactivo dentro del `Content`. Al cerrarse, el foco debería regresar al `Trigger`. Esto requeriría una lógica de estado más compleja, posiblemente gestionada en el `Menu.tsx` y compartida vía contexto.
2.  **Posicionamiento Dinámico (Portales):** Para evitar problemas de `z-index` y `overflow` en UIs complejas, el `Content` podría ser renderizado dentro de un Portal de React, desvinculándolo del flujo del DOM del `Trigger` y posicionándolo de forma más fiable en la parte superior del `body`.
3.  **Detección de Click Externo:** Implementar un `useEffect` adicional que detecte si el usuario hace clic fuera del panel del menú para cerrarlo automáticamente.

// .docs-espejo/components/ui/DropdownMenu/Content.tsx.md