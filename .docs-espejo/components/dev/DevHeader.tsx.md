// .docs-espejo/components/dev/DevHeader.tsx.md
/**
 * @file DevHeader.tsx.md
 * @description Documento espejo y SSoT conceptual para el componente DevHeader.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Componente DevHeader

## 1. Rol Estratégico

El aparato `DevHeader.tsx` es el componente de **identidad visual y navegación fundamental** para el Developer Command Center (DCC). Su propósito es doble:

1.  **Orientación:** Informa visualmente al desarrollador que se encuentra en un entorno de herramientas de desarrollo, diferenciándolo claramente de la UI de producción.
2.  **Navegación Primaria:** Proporciona un punto de anclaje constante y predecible para regresar al dashboard principal del DCC (`/dev`), actuando como el "botón de inicio" del entorno de desarrollo.

Es un Server Component, lo que le permite obtener su propio contenido de texto del sistema de i18n de forma asíncrona.

## 2. Arquitectura y Flujo de Ejecución

1.  **Entrada:** Recibe una única prop `locale` para saber qué diccionario de idioma cargar.
2.  **Obtención de Datos:** Invoca a `getDictionary(locale)` para obtener el diccionario completo.
3.  **Procesamiento de Contenido:**
    *   Extrae su fragmento de contenido específico (la clave `devHeader`).
    *   **Lógica de Resiliencia:** Verifica si el contenido fue encontrado. Si no, utiliza un texto de fallback para el título, evitando un error y proveyendo feedback.
4.  **Renderizado:**
    *   Renderiza una estructura de `header` con un `Container` para mantener la consistencia del layout.
    *   El título se muestra dentro de un `Link` de Next.js que apunta a la ruta `devDashboard`, obtenida de la SSoT de navegación (`routes.devDashboard.path`).

## 3. Contrato de API

*   **Entradas (Props):**
    *   `locale: Locale`
*   **Salidas:**
    *   Un elemento JSX `<header>...</header>`.

## 4. Zona de Melhorias Futuras

1.  **Selector de Locale Específico de Dev:** Se podría añadir un `LanguageSwitcher` a este header para permitir al desarrollador cambiar el idioma del DCC independientemente del idioma del portal principal.
2.  **Indicador de Estado del Build:** El header podría mostrar un pequeño indicador (un punto de color) que refleje el estado del último build (exitoso, fallido), obteniendo esta información de una API interna o un archivo de estado.
3.  **Acceso Rápido a Documentación:** Se podría añadir un botón que enlace directamente al directorio `/.docs/` del proyecto, facilitando el acceso a los manifiestos y directivas.

// .docs-espejo/components/dev/DevHeader.tsx.md