# /.docs-espejo/app/[locale]/(dev)/dev/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/(dev)/dev/page.tsx.md
 * @description Documento espejo para la página principal del Developer Command Center.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Portal de Herramientas de Desarrollo

## 1. Rol Estratégico

La página `DevDashboardPage` es el **punto de entrada y el directorio principal** del Developer Command Center (DCC). Su función es presentar al desarrollador un resumen claro y accesible de todas las herramientas de desarrollo disponibles en el proyecto, actuando como un portal de navegación interno.

Su diseño se basa en tarjetas interactivas, donde cada tarjeta representa una herramienta (ej. "Component Canvas", "Campaign Simulator") y sirve como un enlace directo a ella.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un **React Server Component (RSC)** asíncrono.

1.  **Recepción de Contexto:** Recibe el `locale` de la URL como una promesa en sus `params`.
2.  **Resolución de Parámetros:** Resuelve la promesa `params` con `await` para obtener el `locale` actual.
3.  **Obtención de Contenido:** Invoca a `getDictionary(locale)` para cargar el contenido textual de la página (títulos, descripciones de las tarjetas). Incluye manejo de errores robusto para el caso de que el diccionario falle en cargar.
4.  **Generación de Rutas:** Construye una estructura de datos (`devToolsConfig`) que mapea la información estática de cada herramienta (clave, icono) con la ruta dinámica generada por el manifiesto de navegación `routes`.
5.  **Renderizado de la UI:**
    *   Renderiza un encabezado con el título y subtítulo obtenidos del diccionario.
    *   Itera sobre `devToolsConfig` y, para cada herramienta, renderiza un componente `Link` estilizado como una tarjeta. El contenido de la tarjeta (nombre, descripción) se extrae del diccionario, asegurando la internacionalización completa.

## 3. Contrato de API

### Props de Entrada

*   `params: { locale: Locale }`: El objeto de parámetros de la ruta.

## 4. Zona de Melhorias Futuras

1.  **Descubrimiento Dinámico de Herramientas:** En lugar de tener `devToolsConfig` harcodeado, se podría crear un "Registro de Herramientas" similar al `ComponentRegistry`, y esta página leería ese registro para renderizar las tarjetas dinámicamente.
2.  **Indicadores de Estado:** Cada tarjeta podría mostrar un indicador de estado (ej. un punto verde o rojo) basado en el resultado de una prueba de salud rápida para esa herramienta, proporcionando feedback visual inmediato.
3.  **Accesos Directos:** Podría incluir una sección de "Acciones Rápidas" o "Enlaces Frecuentes" basada en el historial de navegación del desarrollador (usando `localStorage`).