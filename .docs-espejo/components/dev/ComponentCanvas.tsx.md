// .docs-espejo/components/dev/ComponentCanvas.tsx.md
/**
 * @file ComponentCanvas.tsx.md
 * @description Documento espejo para el orquestador del Dev Component Canvas.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Orquestador del Canvas de Componentes

## 1. Rol Estratégico

El aparato `ComponentCanvas.tsx` es el **Orquestador Central** del entorno de visualización de componentes. Su única responsabilidad es gestionar el flujo de datos y delegar el renderizado a componentes de presentación especializados. No contiene lógica de UI propia, adhiriéndose estrictamente al Principio de Responsabilidad Única.

Actúa como el "cerebro" que une la capa de datos (`ComponentLoader`) con la capa de vista (`ComponentCanvasHeader`, `ComponentMetadataPanel` y el propio componente a renderizar).

## 2. Arquitectura y Flujo de Ejecución

Como Server Component, su ciclo de vida es lineal y se ejecuta en el servidor durante el renderizado de la ruta `/dev/components/[componentName]`.

1.  **Recepción de Props:** Recibe `componentName` y `locale` desde la página que lo invoca.
2.  **Invocación del Loader:** Llama a la función `loadComponentAndProps(componentName, locale)` y espera la resolución de la promesa.
3.  **Manejo de Errores:** Si la promesa del loader es rechazada, `ComponentCanvas` captura el error y renderiza una interfaz de error informativa para el desarrollador, previniendo un crash de la página.
4.  **Delegación a Hijos de Presentación:** Si la carga es exitosa, desestructura el resultado (`ComponentToRender`, `componentProps`, etc.) y lo pasa como props a los componentes de presentación puros:
    *   `ComponentCanvasHeader`: Para renderizar el título.
    *   `ComponentMetadataPanel`: Para mostrar la información de depuración.
    *   `ComponentToRender`: El componente dinámico cargado, al cual se le inyectan sus `componentProps`.
5.  **Renderizado Final:** Ensambla estos componentes de presentación dentro de una estructura de layout base y devuelve el JSX final.

## 3. Contrato de API (`Props`)

-   `componentName?: string`: El identificador clave del componente a cargar, tal como está definido en `ComponentRegistry`. Es opcional para manejar el caso en que la ruta se visite sin un componente específico.
-   `locale: string`: El locale actual, necesario para que el `ComponentLoader` obtenga el contenido i18n correcto.

## 4. Zona de Melhorias Futuras

1.  **Renderizado de Múltiples Estados:** Añadir controles (ej. un dropdown) a la UI del Canvas que permitan al desarrollador visualizar el componente en diferentes estados (ej. "default", "hover", "disabled") pasándole diferentes conjuntos de props.
2.  **Editor de Props en Vivo:** Integrar una librería como `react-json-view` en el `ComponentMetadataPanel` para permitir la edición en vivo de las `componentProps` y ver los cambios reflejados en el componente renderizado en tiempo real.
3.  **Selector de Temas/Variantes:** Añadir un selector que permita al `ComponentCanvas` solicitar al `ComponentLoader` los datos de una variante de campaña específica, facilitando el testeo visual de un componente bajo diferentes temas.
// .docs-espejo/components/dev/ComponentCanvas.tsx.md