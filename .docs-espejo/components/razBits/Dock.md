// /.docs-espejo/components/razBits/Dock.md
/**
 * @file /.docs-espejo/components/razBits/Dock.md
 * @description Documento Espejo y SSoT conceptual para el aparato Dock.tsx.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.1
 * @date 2025-09-10
 */
# Manifiesto Conceptual: Dock (razBits)

## 1. Rol Estratégico y Propósito

El componente `Dock` es un elemento de UI interactivo, catalogado bajo el dominio `razBits`, que proporciona una navegación compacta y visualmente atractiva con efectos de magnificación al pasar el ratón y etiquetas flotantes. Su propósito estratégico es ofrecer una interfaz de usuario premium para colecciones de ítems navegables o funcionales, ideal para dashboards, lanzadores de aplicaciones o menús contextuales avanzados. Su integración en `curcumin-simplex` se ha realizado siguiendo el estricto Protocolo de Naturalización.

## 2. Arquitectura y Flujo de Ejecución

El `Dock` es un componente cliente (`"use client"`) construido con `framer-motion` para sus animaciones. Su arquitectura interna se compone de un componente principal `Dock` que orquesta la lógica y el renderizado, y tres sub-componentes co-ubicados (`DockItem`, `DockLabel`, `DockIcon`) que manejan la presentación y las interacciones individuales.

1.  **Estado y Animación**: Utiliza `useMotionValue` y `useSpring` de `framer-motion` para controlar la posición del ratón y aplicar animaciones de resorte para el efecto de magnificación y la expansión del panel.
2.  **Configuración Validada**: Recibe un objeto `config` opcional que se valida con `DockConfigSchema` (Zod) para establecer propiedades como `distance`, `magnification`, `panelHeight`, etc., asegurando la integridad de la configuración.
3.  **Ítems Dinámicos**: Acepta un array de `DockItemData`, donde cada objeto define un `icon` (ReactNode), `label` (ReactNode) y un `onClick` handler. Esto permite una gran flexibilidad en el contenido de cada ítem.
4.  **Estilo Semántico**: Todos los estilos visuales se han naturalizado para utilizar clases de Tailwind CSS basadas en el sistema de diseño del proyecto (`bg-background`, `border-muted`, `text-foreground`), eliminando cualquier estilo hardcodeado.
5.  **Observabilidad**: Se integra `clientLogger` en los componentes `Dock`, `DockItem`, `DockLabel` y `DockIcon` para proporcionar trazas detalladas de su ciclo de vida y eventos, facilitando la depuración en desarrollo.
6.  **Accesibilidad**: Implementa atributos ARIA (`role="toolbar"`, `aria-label`, `role="button"`, `aria-haspopup`, `role="tooltip"`) para mejorar la accesibilidad para usuarios de tecnologías de asistencia.
7.  **Responsabilidad Única**: El componente principal `Dock` se encarga de la orquestación y el cálculo de movimientos del ratón, mientras que `DockItem` maneja la lógica de un ítem individual (tamaño, hover) y `DockLabel`/`DockIcon` son componentes de presentación puros para sus respectivos contenidos.

## 3. Contrato de API (Props)

```typescript
interface DockProps {
  /**
   * @param items Un array de objetos DockItemData que representan los elementos del Dock.
   *              Cada ítem requiere un `icon` (React.ReactNode), `label` (React.ReactNode) y `onClick` handler.
   */
  items: DockItemData[];
  /**
   * @param className Clases CSS adicionales para aplicar al contenedor principal del Dock.
   *                  Utiliza `tailwind-merge` para una fusión inteligente de clases.
   */
  className?: string;
  /**
   * @param config Objeto de configuración validado por Zod para personalizar el comportamiento y los estilos.
   *               Define propiedades como `distance`, `panelHeight`, `baseItemSize`, `dockHeight`, `magnification`.
   */
  config?: z.infer<typeof DockConfigSchema>;
  /**
   * @param spring Opciones de configuración para la animación de resorte (magnificación).
   *                Se le asigna un valor por defecto para suavidad: `{ mass: 0.1, stiffness: 150, damping: 12 }`.
   */
  spring?: SpringOptions;
}

// DockItemData, DockLabelProps, DockIconProps se definen internamente.
4. Zona de Mejoras Futuras
Internacionalización de aria-label: Aunque los label son React.ReactNode, el aria-label del botón principal del Dock podría ser internacionalizado a través del dock.i18n.json.
Control de Estado Externo: Proporcionar una opción para controlar el estado de isHovered desde fuera del componente Dock, permitiendo integraciones más complejas o la pausa programática de efectos.
Variantes de Estilo del Dock: Añadir variantes de estilo predefinidas (ej. variant="glass" | "solid") para el Dock, encapsulando conjuntos de clases de Tailwind para diferentes apariencias.
Eventos Personalizados: Emitir eventos personalizados al hacer clic en un ítem del Dock para una mayor observabilidad o integración con sistemas de tracking avanzados.
Tematización Fina de Sub-componentes: Si se requiriera, externalizar partes del esquema de Zod para permitir una tematización más granular de DockItem o DockLabel (ej. colores de borde en hover, tamaños de fuente específicos).
// /.docs-espejo/components/razBits/Dock.md