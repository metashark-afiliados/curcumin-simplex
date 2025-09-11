// .docs-espejo/components/layout/SectionRenderer.md
/**
 * @file SectionRenderer.md
 * @description Documento espejo para el componente dinámico SectionRenderer.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: SectionRenderer (Fábrica de Secciones)

## 1. Rol Estratégico

El `SectionRenderer` es un **Componente Fábrica Dinámico**. Su única responsabilidad es actuar como un intermediario inteligente entre una configuración de layout (un array de nombres de sección) y la librería de componentes de UI.

Es la pieza clave que permite la arquitectura de "Configuración sobre Código" para el ensamblaje de páginas. Cumple rigurosamente con el **Principio Abierto/Cerrado**: se pueden añadir nuevas secciones al sistema sin modificar una sola línea de código de este componente.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Servidor** síncrono y puro.

1.  **Recepción de Props:** Recibe `sectionName` (ej. "Hero"), el `dictionary` completo y el `locale`.
2.  **Consulta al Registro:** Utiliza `sectionName` como clave para buscar en la SSoT de secciones (`sectionsConfig`). De este registro obtiene dos datos vitales:
    *   El componente React a renderizar (ej. el componente `Hero`).
    *   La clave del diccionario donde residen los datos de esa sección (ej. `"hero"`).
3.  **Extracción de Datos:** Accede al `dictionary` usando la `dictionaryKey` obtenida para extraer el objeto de props específico para el componente.
4.  **Renderizado Dinámico:** Si tanto la configuración como los datos existen, renderiza el `ComponentToRender` obtenido del registro, pasándole las `props` extraídas.

Este diseño desacopla completamente al `SectionRenderer` de cualquier componente de sección específico, convirtiéndolo en un motor de renderizado universal y altamente mantenible.

## 3. Contrato de API (`Props`)

-   `sectionName: SectionName`: El nombre de la sección a renderizar, validado por un tipo `enum`.
-   `dictionary: Dictionary`: El objeto de diccionario completo para el `locale` actual.
-   `locale: string`: El `locale` actual, pasado a los componentes de sección que lo necesiten.

## 4. Zona de Melhorias Futuras

1.  **Carga Diferida de Componentes (`Lazy Loading`):** Para optimizar el tamaño inicial del bundle, se podría modificar el registro (`sectionsConfig`) para usar `React.lazy()` y envolver el `SectionRenderer` en un `<Suspense>` en la página que lo consume.
2.  **Mapeo de Props Avanzado:** Implementar un sistema más sofisticado para mapear los datos del diccionario a las props del componente, en lugar del actual sistema de propagación (`...`), lo que podría ofrecer un tipado aún más estricto.
3.  **Registro de Secciones en CMS:** En una evolución futura, el `sectionsConfig` podría ser generado dinámicamente a partir de los datos de un Headless CMS, permitiendo añadir nuevos tipos de sección sin necesidad de un despliegue.
// .docs-espejo/components/layout/SectionRenderer.md