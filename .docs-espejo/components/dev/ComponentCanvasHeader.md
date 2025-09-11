// /.docs-espejo/components/dev/ComponentCanvasHeader.md
/**
 * @file /.docs-espejo/components/dev/ComponentCanvasHeader.md
 * @description Documento Espejo y SSoT conceptual para el aparato ComponentCanvasHeader.tsx.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @date 2025-09-10
 */
# Manifiesto Conceptual: ComponentCanvasHeader (Componente de Presentación)

## 1. Rol Estratégico y Propósito

`ComponentCanvasHeader` (ubicado en `src/components/dev/ComponentCanvasHeader.tsx`) es un **componente de presentación puro (`@devonly`)** que encapsula la sección superior y decorativa del `Dev Component Canvas`. Su propósito estratégico es proporcionar un **marco visual profesional y una identidad clara** para el componente que se está inspeccionando, separando el área de visualización del componente de los controles y metadatos del entorno de desarrollo.

## 2. Arquitectura y Flujo de Ejecución

`ComponentCanvasHeader` es un componente React funcional simple.

1.  **Entrada de Datos**: Recibe el `componentName` (la clave del componente) y el `entryName` (el nombre amigable del componente del registro) como `props`.
2.  **Elementos Visuales**: Renderiza el `entryName` como el título principal, una descripción genérica del canvas y elementos decorativos:
    *   Un **marco de diseño** (borde punteado `border-4 border-dashed border-accent/20`) que simula una escuadra.
    *   Un **icono distintivo** (`LayoutGrid`) con un fondo resaltado (`bg-accent`) que refuerza la identidad del canvas.
3.  **Estilo Semántico**: Utiliza exclusivamente clases de Tailwind CSS basadas en el sistema de diseño del proyecto (`text-primary`, `text-muted-foreground`, `bg-background/50`, `shadow-lg`, `border-primary/50`), asegurando la coherencia visual.
4.  **Responsabilidad Única**: Su única responsabilidad es presentar la cabecera visual del canvas; no contiene lógica de carga de datos ni de interacción compleja.
5.  **Observabilidad**: No incluye `clientLogger` directamente, ya que su orquestador (`ComponentCanvas.tsx`) ya se encarga de loguear el renderizado de la página completa.

## 3. Contrato de API (Props)

```typescript
interface ComponentCanvasHeaderProps {
  /**
   * @param componentName El nombre de la clave del componente que se está visualizando (ej. "Hero").
   */
  componentName: string;
  /**
   * @param entryName El nombre amigable del componente, tal como está definido en el `ComponentRegistry` (ej. "Hero Section (Campaña)").
   */
  entryName: string;
}
4. Zona de Mejoras Futuras
Prop de Descripción Personalizada: Añadir una prop description para permitir una descripción más específica de la sección del canvas si fuera necesario para un componente particular.
Controles de Nivel de Zoom: Integrar botones o un slider en la cabecera para controlar el nivel de zoom del componente renderizado en el canvas.
Información de Versión del Componente: Mostrar la versión del componente (si se gestiona en ComponentRegistry) en la cabecera.
// /.docs-espejo/components/dev/ComponentCanvasHeader.md