// .docs-espejo/components/ui/Button.tsx.md
/**
 * @file .docs-espejo/components/ui/Button.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Button.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manifiesto Conceptual: Aparato `Button`

## 1. Rol Estratégico y Propósito

El aparato `Button` es el **principal ejecutor de acciones de la interfaz de usuario**. Su rol estratégico es proporcionar un punto de interacción consistente, predecible y semánticamente claro para todas las acciones del usuario, desde la navegación simple hasta la sumisión de formularios.

Está diseñado para ser polimórfico (renderizando como `<button>` o `<a>`) y altamente configurable a través de un **sistema de variantes semánticas**, garantizando la consistencia visual y el cumplimiento del sistema de diseño en todo el proyecto.

## 2. Arquitectura y Flujo de Ejecución

El componente se basa en un sistema de props para controlar su lógica y apariencia:

1.  **Polimorfismo:** La presencia de la prop `href` discrimina si el componente debe renderizar un `Link` de Next.js (`<a>`) o un `<button>` estándar.
2.  **Sistema de Variantes:** Las props `variant` y `size` actúan como claves para consultar objetos de mapeo internos (`variants`, `sizes`). Estos objetos asocian un nombre de variante semántico (ej. `"success"`) con una cadena de clases de utilidad de Tailwind CSS.
3.  **Fusión de Estilos Robusta:** Utiliza `clsx` para combinar las clases base, las clases de la variante, las clases del tamaño y cualquier `className` adicional. El resultado se pasa a `tailwind-merge` para resolver de forma inteligente cualquier conflicto de clases, garantizando que las sobreescrituras sean predecibles.
4.  **Seguridad de Tipos:** Emplea una unión discriminada de TypeScript (`ButtonAsButton | ButtonAsLink`) para asegurar que solo se puedan pasar atributos HTML válidos a cada tipo de elemento, previniendo errores en tiempo de compilación.

## 3. Contrato de API

| Prop | Tipo | Requerido | Por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | Sí | - | El contenido del botón (texto, icono, etc.). |
| `href` | `string` | No | - | Si se provee, el componente se renderiza como un enlace `<a>`. |
| `variant` | `'default' \| 'success' \| 'accent' \| 'destructive' \| 'secondary' \| 'ghost' \| 'link'` | No | `'default'` | La variante estilística semántica del botón. |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | No | `'default'` | El tamaño predefinido del botón. |
| `className`| `string` | No | - | Clases de Tailwind para extender o modificar los estilos. |
| `...rest`| `ButtonHTML...` o `AnchorHTML...` | No | - | Cualquier otro atributo HTML válido para un `<button>` o `<a>`. |

## 4. Ejemplos de Uso

```jsx
// Botón primario por defecto
<Button>Pedir Ahora</Button>

// Botón de éxito (verde) grande
<Button variant="success" size="lg">Continuar al Pago</Button>

// Botón de acción secundaria (naranja/acento)
<Button variant="accent">Añadir al Carrito</Button>

// Botón de peligro
<Button variant="destructive">Eliminar Item</Button>

// Botón como enlace
<Button variant="link" href="/details">Ver detalles</Button>

// Botón de icono
<Button variant="ghost" size="icon"><X className="h-4 w-4" /></Button>
5. Zona de Melhorias Futuras
Estado de Carga (isLoading): Añadir una prop booleana isLoading que, al ser true, deshabilite el botón y muestre un ícono de spinner, mejorando la retroalimentación al usuario en operaciones asíncronas.
Soporte de Iconos Integrado: Implementar props iconLeft y iconRight que acepten un componente de icono y lo posicionen correctamente junto al children de texto, simplificando la creación de botones con iconos.
// .docs-espejo/components/ui/Button.tsx.md