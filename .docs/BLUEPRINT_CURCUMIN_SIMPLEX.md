// /.docs/BLUEPRINT_CURCUMIN_SIMPLEX.md
/**
 * @file /.docs/BLUEPRINT_CURCUMIN_SIMPLEX.md
 * @description Blueprint Arquitectónico Definitivo y SSoT para el proyecto Curcumin Simplex.
 *              Consolida todas las decisiones de arquitectura, funcionalidad y configuración.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Blueprint Definitivo v2.0: Curcumin Simplex

## 1. Visión y Filosofía

`Curcumin Simplex` es un **activo digital estático, de alto rendimiento y configurable**. Su arquitectura está diseñada bajo la filosofía de **"Simplicidad Estática y Control Centralizado"**. El proyecto se genera como un sitio estático puro (SSG), optimizado para velocidad, seguridad y bajo coste de hosting, donde la estructura, el contenido y la apariencia son controlados desde un único archivo de configuración (`.env`).

## 2. Principios Arquitectónicos Fundamentales

-   **Generación de Sitio Estático (SSG-First):** El proyecto se compila a HTML, CSS y JS puros. No existe un backend en tiempo de ejecución.
-   **Configuración Soberana vía `.env`:** El archivo `.env` es la SSoT que controla:
    1.  **Internacionalización (i18n-B):** El idioma completo del sitio.
    2.  **Layout (Plug and Play):** Qué secciones se muestran y en qué orden.
    3.  **Theming:** El tema de colores y personalizaciones visuales.
-   **Arquitectura "Lego":** La UI se construye a partir de **componentes de presentación puros y nivelados**, que no tienen lógica interna y reciben todo su contenido y configuración a través de `props`. Son piezas intercambiables y reutilizables.
-   **Calidad por Contrato:** La integridad del proyecto se garantiza en tiempo de build mediante la validación de contratos de datos (`Zod schemas`) para el contenido y la configuración.

---

## 3. Arquitectura de Configuración Centralizada (El Motor)

El corazón del proyecto reside en el directorio `src/lib/` y el archivo `.env`.

-   **`.env`:** El panel de control.
    -   `NEXT_PUBLIC_SITE_LOCALE`: Define el idioma (ej. "es-ES").
    -   `SECTION_*`: Controla la visibilidad y orden de cada componente de sección (ej. `SECTION_Hero="visible,1"`).
    -   `THEME_PRESET` y `CUSTOM_COLOR_*`: Definen la apariencia visual.

-   **`src/lib/config/`:** Orquestadores que leen el `.env` y lo transforman en datos estructurados y validados para la aplicación.
    -   `theme.config.ts`: Procesa las variables de tema.
    -   `sections.config.ts`: Procesa las variables de las secciones.

-   **`src/lib/i18n.ts`:** Carga el diccionario de contenido (`.json`) correspondiente al `locale` definido en el `.env`.

-   **`src/lib/schemas/`:** Guardianes de la integridad. Contienen los `Zod schemas` que validan que el contenido de los `.json` y la configuración sean correctos. Un fallo aquí detiene el build, previniendo errores en producción.

---

## 4. Anatomía de la Aplicación (El Flujo de Renderizado)

1.  **`src/app/layout.tsx` (El Chasis):**
    *   Es un Server Component.
    *   Invoca a `getDictionary()` y a los orquestadores de configuración.
    *   Inyecta las variables de tema CSS en el `<head>`.
    *   Renderiza los componentes de layout (`Header`, `Footer`, `ScrollingBanner`), pasándoles como `props` el contenido y la configuración necesarios.

2.  **`src/app/page.tsx` (El Ensamblador "Lego"):**
    *   Es un Server Component.
    *   Importa el array `activeSections` desde `sections.config.ts`.
    *   Importa el diccionario de contenido con `getDictionary()`.
    *   **Lógica de Renderizado Condicional:** Itera sobre el array `activeSections`. Para cada sección activa, renderiza el componente correspondiente (ej. `Hero`, `BenefitsSection`), pasándole las `props` (textos, datos) desde el diccionario.
    *   Esto crea una página cuyo layout es completamente dinámico en tiempo de build, basado en la configuración del `.env`.

---

## 5. Inventario de Componentes "Lego" (Las Piezas)

El directorio `src/components/` contiene todas las piezas de UI, organizadas semánticamente. **Todos** los componentes deben adherirse a la **Directiva 003: Manifiesto de Calidad de Componentes**, lo que significa que son puros, documentados y están estilizados semánticamente.

-   **Layout:** `Header`, `Footer`, `ScrollingBanner`, etc.
-   **Sections:** `Hero`, `BenefitsSection`, `IngredientAnalysis`, `TestimonialGrid`, etc.
-   **UI/Atómicos:** `Button`, `Container`, etc.

---

## 6. Roadmap de Nivelación y Ensamblaje

El proceso de desarrollo sigue un ciclo disciplinado:

1.  **Nivelar un Componente:** Tomar un componente del inventario (ej. `ThumbnailCarousel.tsx`).
2.  **Refactorizar a la Pureza:** Aplicar la **Directiva 003** para convertirlo en un componente "Lego" puro.
3.  **Actualizar Contratos:** Añadir sus claves de texto requeridas al `i18n.schema.ts` y al `es-ES.json` como `.optional()`.
4.  **Añadir al Panel de Control:** Añadir su variable de control al `.env` (ej. `SECTION_ThumbnailCarousel="visible,5"`).
5.  **Registrar en el Ensamblador:** Añadir su nombre al array `sectionNames` en `sections.config.ts` y al `switch` de renderizado en `page.tsx`.
6.  **Repetir:** Continuar el ciclo hasta que todos los componentes del inventario estén nivelados e integrados.

Este Blueprint asegura que el resultado final sea un sitio web robusto, mantenible y extremadamente performante, con una arquitectura clara que separa la configuración, el contenido y la presentación.

// /.docs/BLUEPRINT_CURCUMIN_SIMPLEX.md