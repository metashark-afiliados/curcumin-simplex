// /.docs-espejo/components/dev/ComponentMetadataPanel.md
/**
 * @file /.docs-espejo/components/dev/ComponentMetadataPanel.md
 * @description Documento Espejo y SSoT conceptual para el aparato ComponentMetadataPanel.tsx.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @date 2025-09-10
 */
# Manifiesto Conceptual: ComponentMetadataPanel (Componente de Presentación)

## 1. Rol Estratégico y Propósito

`ComponentMetadataPanel` (ubicado en `src/components/dev/ComponentMetadataPanel.tsx`) es un **componente de presentación puro (`@devonly`)** que encapsula la visualización de metadatos detallados del componente y su contexto de tema dentro del `Dev Component Canvas`. Su propósito estratégico es proporcionar a los desarrolladores una **visión clara y consolidada** de cómo los tokens de diseño (colores, tipografía, breakpoints) y las props de mock están afectando la renderización del componente.

## 2. Arquitectura y Flujo de Ejecución

`ComponentMetadataPanel` es un componente React funcional simple.

1.  **Entrada de Datos**: Recibe `appliedTheme`, `componentProps` y `isMobileFirst` como `props`.
2.  **Visualización de Metadatos**: Divide la información en secciones lógicas:
    *   **Tema y Colores**: Muestra los colores del tema de campaña aplicado (`appliedTheme`) o los colores por defecto del `BRADING_SSOT_DATA`.
    *   **Tipografía**: Muestra las fuentes del tema de campaña o las fuentes por defecto del `BRADING_SSOT_DATA`.
    *   **Dimensiones y Responsividad**: Indica si el componente es Mobile-First y muestra los breakpoints de Tailwind definidos en `BRADING_SSOT_DATA`.
    *   **Props de Mock Aplicadas**: Presenta el objeto JSON completo de las props finales que se pasaron al componente, formateado para legibilidad.
3.  **Estilo Semántico**: Utiliza exclusivamente clases de Tailwind CSS (`text-foreground`, `text-muted-foreground`, `bg-secondary/30`, `border-muted/50`, `rounded-lg`) para una apariencia consistente.
4.  **Uso de `JSON.stringify`**: Formatea los objetos de datos complejos (colores, fuentes, breakpoints, props) en un formato JSON legible dentro de etiquetas `<pre>`.
5.  **Responsabilidad Única**: Su única responsabilidad es la presentación de metadatos; no contiene lógica de carga de datos ni de interacción.
6.  **Observabilidad**: No incluye `clientLogger` directamente, ya que su orquestador (`ComponentCanvas.tsx`) ya se encarga de loguear el renderizado de la página completa.

## 3. Contrato de API (Props)

```typescript
interface ComponentMetadataPanelProps {
  /**
   * @param appliedTheme El objeto de tema de campaña aplicado al componente (si aplica),
   *                     o `null` si se usa el tema global.
   */
  appliedTheme: any;
  /**
   * @param componentProps El objeto de props de mock final que se le pasó al componente.
   */
  componentProps: Record<string, any>;
  /**
   * @param isMobileFirst Un indicador booleano si el componente se considera diseñado con un enfoque Mobile-First.
   */
  isMobileFirst: boolean;
}
4. Zona de Mejoras Futuras
Interactividad de Metadatos: Permitir la edición en vivo de algunas props o valores de tema directamente desde el panel y que estos se reflejen en el componente renderizado.
Validación de Props en Tiempo Real: Mostrar alertas visuales en el panel si las componentProps aplicadas no cumplen con el esquema Zod del componente.
Enlace a Archivos de Código: Añadir un botón para abrir el archivo .tsx del componente, su .schema.ts o su .i18n.json directamente en el editor.
Visualización de Breakpoints Activos: Indicar visualmente qué breakpoint de Tailwind está activo en el momento de la visualización.
// /.docs-espejo/components/dev/ComponentMetadataPanel.md