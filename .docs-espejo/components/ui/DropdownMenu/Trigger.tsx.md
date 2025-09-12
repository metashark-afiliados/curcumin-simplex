// .docs-espejo/components/ui/DropdownMenu/Trigger.tsx.md
/**
 * @file Trigger.tsx.md
 * @description Documento espejo y SSoT conceptual para el componente activador del DropdownMenu.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente `Trigger`

## 1. Rol Estratégico

El aparato `Trigger.tsx` es el **componente interactivo** que controla la visibilidad del panel del `DropdownMenu`. Su única responsabilidad es actuar como el "botón" que el usuario clica para abrir y cerrar el menú.

Su característica arquitectónica más importante es la implementación del patrón **`asChild`**, que le confiere una flexibilidad extrema. Permite que cualquier otro componente (un `<Button>` de nuestra UI, un `Link` de Next.js, etc.) se convierta en el activador del menú, heredando la funcionalidad de `Trigger` sin perder su propia apariencia y comportamiento.

## 2. Arquitectura y Flujo de Ejecución

1.  **Consumo de Contexto:** Utiliza el hook `useDropdownMenuContext` para obtener acceso al estado `isOpen` y a la función `setIsOpen` desde el componente `Menu` padre.
2.  **Patrón `asChild`:**
    *   **Si `asChild` es `false` (por defecto):** El componente renderiza un elemento `<button>` estándar. Envuelve a sus `children` y les aplica las `props` de accesibilidad (`aria-*`) y el manejador de eventos `onClick`.
    *   **Si `asChild` es `true`:**
        *   Utiliza `React.cloneElement` sobre su único `child`.
        *   Inyecta de forma segura las `props` de accesibilidad y el `onClick` en el hijo.
        *   La lógica de `onClick` está diseñada para **fusionar comportamientos**: primero ejecuta la función `onClick` original del hijo (si existe) y luego ejecuta la lógica propia del `Trigger` (llamar a `setIsOpen`).
3.  **Manejo de Eventos:** El manejador `onClick` simplemente invierte el valor booleano del estado `isOpen` a través de `setIsOpen`.

## 3. Contrato de API

*   **Entradas (Props):**
    *   `children: React.ReactNode`
    *   `asChild?: boolean`
*   **Salidas:**
    *   Un elemento JSX que es o un `<button>` o el `child` clonado.

## 4. Zona de Melhorias Futuras

1.  **Manejo de Teclado (Accesibilidad):** Se podría mejorar para que al presionar `Enter` o `Espacio` en el `Trigger` también se abra el menú, además de manejar las flechas de dirección para navegar entre los items cuando el menú está abierto (aunque esta última parte podría ser responsabilidad de `Content.tsx`).
2.  **Integración con `useId`:** Para una accesibilidad aún más robusta, el `Trigger` podría generar un ID único con `React.useId` y pasarlo a través del contexto para que el `Content` pueda usarlo en su atributo `aria-labelledby`, creando una asociación explícita.

// .docs-espejo/components/ui/DropdownMenu/Trigger.tsx.md