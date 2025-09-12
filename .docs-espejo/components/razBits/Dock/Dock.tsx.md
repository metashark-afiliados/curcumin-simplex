// .docs-espejo/components/razBits/Dock/Dock.tsx.md
/**
 * @file Dock.tsx.md
 * @description Documento Espejo para el componente Dock naturalizado.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente Dock

## 1. Rol Estratégico y Propósito

El componente `Dock` es un aparato de UI de alto impacto visual, naturalizado desde una fuente externa para servir como un lanzador de acciones o una barra de navegación secundaria. Su propósito estratégico es ofrecer una experiencia de usuario (UX) "premium" y memorable, utilizando micro-interacciones (magnificación al `hover`) para deleitar al usuario y proporcionar un acceso rápido a funciones clave.

En el contexto de `curcumin-simplex`, se prevé su uso en el `DevHeader` como un menú de herramientas visualmente atractivo.

## 2. Arquitectura y Flujo de Ejecución

El `Dock` sigue un patrón de **composición y delegación de estado**:

1.  **Orquestador (`Dock.tsx`):**
    *   Es el componente principal y el único que se exporta por defecto.
    *   Gestiona el estado global del `hover` sobre el contenedor del dock y la posición del cursor (`mouseX`).
    *   Mapea el array de `items` recibido por `props` para renderizar múltiples `DockItem`.
    *   Pasa el estado (`mouseX`) y la configuración a cada `DockItem`.

2.  **Componente Atómico (`DockItem.tsx`):**
    *   Renderiza un único icono interactivo.
    *   Utiliza el hook `useTransform` de `framer-motion` para calcular su tamaño dinámicamente en función de su distancia al `mouseX`.
    *   Utiliza `useSpring` para una animación de magnificación suave.
    *   Gestiona su propio estado de `hover` local (`isHovered`).
    *   Utiliza `React.cloneElement` para inyectar la prop `isHovered` a sus hijos directos (`DockIcon` y `DockLabel`), permitiéndoles reaccionar.

3.  **Sub-componentes de Presentación (`DockIcon`, `DockLabel`):**
    *   `DockIcon`: Contenedor simple para el icono.
    *   `DockLabel`: Renderiza la etiqueta flotante y utiliza `AnimatePresence` de `framer-motion` para animar su aparición/desaparición basándose en la prop `isHovered` que recibe de su padre `DockItem`.

## 3. Contrato de API (Props)

El contrato principal es la prop `items` del componente `Dock`.

```typescript
type DockItemData = {
  icon: React.ReactNode;   // El icono a mostrar
  label: React.ReactNode;  // La etiqueta flotante
  onClick: () => void;     // La acción al hacer clic
  className?: string;      // Clases opcionales
};

interface DockProps {
  items: DockItemData[];
  config?: z.infer<typeof DockConfigSchema>; // Configuración de comportamiento
  // ...otras props
}