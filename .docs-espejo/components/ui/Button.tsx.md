# /.docs-espejo/components/ui/Button.tsx.md
/**
 * @file Button.tsx.md
 * @description Documento Espejo y SSoT conceptual para el componente Button.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Botón Polimórfico

## 1. Rol Estratégico

El aparato `Button` es un componente de UI atómico y fundamental. Su rol estratégico es proporcionar una abstracción consistente y reutilizable para todos los elementos clickables de la aplicación que tienen una acción principal.

Su diseño es **polimórfico**, lo que significa que puede renderizarse semánticamente como un `<button>` nativo o como un elemento de anclaje `<a>` (a través del `<Link>` de Next.js) si se le proporciona una prop `href`.

## 2. Arquitectura y Flujo de Ejecución

1.  **Definición de Variantes (SSoT Visual):** El componente define internamente objetos (`variants`, `sizes`) que mapean nombres de variantes semánticas (ej. "default", "accent") a clases de Tailwind CSS. Esta es la SSoT para la apariencia del botón.

2.  **Aislamiento de Props:** El componente de-estructura cuidadosamente sus props personalizadas (`variant`, `size`, `className`, `asChild`) del resto de las props (`...props`). Esto es crucial para evitar el "prop leakage", asegurando que solo los atributos HTML válidos se pasen al elemento DOM final.

3.  **Lógica Polimórfica:**
    *   **Determinación de Tipo:** Inspecciona las `props` para ver si existe una clave `href`.
    *   **Renderizado Condicional:**
        *   Si `href` existe, renderiza un componente `Link` de Next.js.
        *   Si `href` no existe, renderiza un `<button>` estándar.

4.  **Composición con `asChild` (Patrón Slot):**
    *   La prop booleana `asChild` activa el comportamiento de `Slot`.
    *   Si `asChild` es `true`, el `Button` no renderiza su propio `button` o `Link`. En su lugar, clona su único `React.ReactElement` hijo y le fusiona sus propias props (como `className`, `onClick`, etc.).
    *   Esto permite una composición de élite, como: `<Button asChild><Link href="/">Ir a Inicio</Link></Button>`. El `Link` se renderizará con los estilos del `Button`, pero conservará toda su funcionalidad de pre-carga de Next.js.

5.  **Fusión de Clases:** Utiliza `tailwind-merge` y `clsx` (a través de la utilidad `cn`) para fusionar de forma inteligente las clases base, las de variante y las pasadas externamente, permitiendo sobreescrituras predecibles.

## 3. Contrato de API (Props)

*   `variant`: `'default' | 'accent' | ...` - El estilo visual del botón.
*   `size`: `'default' | 'sm' | ...` - El tamaño del botón.
*   `href`: `string` (opcional) - Si se provee, el componente se renderiza como un enlace.
*   `asChild`: `boolean` (opcional) - Si es `true`, aplica las props a su hijo directo.
*   `...props`: Cualquier otra prop válida para un `<button>` o `<a>`.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Integración con CVA:** Migrar la lógica de variantes a la librería `class-variance-authority` (CVA) para un manejo de variantes más declarativo y escalable, que es el estándar en ecosistemas como Shadcn/UI.
2.  **Estado de Carga:** Añadir una prop `isLoading` que, cuando sea `true`, muestre un ícono de carga (spinner) dentro del botón y deshabilite la interacción, proporcionando un feedback visual claro para operaciones asíncronas.
3.  **Soporte de Iconos:** Añadir props específicas como `iconLeft` y `iconRight` que acepten un `React.ReactNode` para renderizar iconos de forma consistente al lado del texto del botón.