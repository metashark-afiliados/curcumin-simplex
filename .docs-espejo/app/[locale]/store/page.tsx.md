# /.docs-espejo/app/[locale]/store/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/store/page.tsx.md
 * @description Documento espejo para la página de la tienda.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Escaparate de Productos

## 1. Rol Estratégico

La `StorePage` es el **centro de comercio del portal**. Su propósito es presentar el catálogo de productos de Global Fitwell de una manera limpia, organizada y visualmente atractiva. Actúa como un orquestador de componentes de UI más pequeños y especializados (`ProductFilters`, `ProductGrid`, `LightRays`), ensamblándolos para crear una experiencia de compra cohesiva.

## 2. Arquitectura y Flujo de Ejecución

Este aparato es un **React Server Component (RSC)** asíncrono.

1.  **Recepción de Contexto:** Recibe el `locale` de la URL como una promesa en sus `params`.
2.  **Resolución de Parámetros:** Resuelve la promesa `params` con `await` para obtener el `locale` actual.
3.  **Obtención de Contenido:** Invoca a `getDictionary(locale)` para cargar todo el contenido de la página, incluyendo los datos de los filtros, la lista de productos y la configuración para el efecto visual `LightRays`.
4.  **Manejo de Contenido (Guardia):** Verifica si el contenido para `storePage` existe en el diccionario. Si no existe, renderiza un estado de fallback controlado para evitar una página rota.
5.  **Ensamblaje de la UI:**
    *   Renderiza el efecto de fondo `LightRays`, pasándole su configuración específica.
    *   Renderiza el `PageHeader` con el título y subtítulo de la tienda.
    *   Implementa un layout de cuadrícula (`grid`) para posicionar la barra lateral de filtros y la cuadrícula de productos.
    *   Renderiza `ProductFilters`, pasándole únicamente el fragmento del diccionario que necesita (`content.filters`).
    *   Renderiza `ProductGrid`, pasándole la lista de productos (`content.products`) y el `locale` para el formato de moneda.

## 3. Contrato de API

### Props de Entrada

*   `params: { locale: Locale }`: El objeto de parámetros de la ruta.

## 4. Zona de Melhorias Futuras

1.  **Estado de Filtros en URL:** La lógica de filtrado (actualmente no implementada) debería gestionar su estado a través de parámetros de búsqueda en la URL (ej. `?category=nutricion`). Esto permitiría compartir enlaces a vistas filtradas y mejora el SEO.
2.  **Paginación:** Para catálogos grandes, se debería implementar una lógica de paginación, ya sea por scroll infinito o con botones de paginación clásicos.
3.  **Fetching de Productos Dinámico:** En lugar de obtener los productos desde un archivo JSON estático, la página debería hacer fetching de los datos desde una API o base de datos, permitiendo un catálogo dinámico.
4.  **Componentes de Esqueleto (Skeleton Loading):** Mientras los productos se cargan, se podrían mostrar componentes de esqueleto para mejorar la percepción de rendimiento.