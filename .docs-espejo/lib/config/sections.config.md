# /.docs-espejo/lib/config/sections.config.ts.md
/**
 * @file sections.config.ts.md
 * @description Documento Espejo y SSoT conceptual para el Registro de Secciones.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: El Registro de Secciones

## 1. Rol Estratégico

Este aparato (`sections.config.ts`) es el **corazón de la arquitectura de renderizado dinámico de campañas**. Su función es actuar como un **registro centralizado** o un "mapa" que traduce identificadores de texto plano (ej. "Hero") en referencias de software concretas (el componente `Hero` importado y la clave `"hero"` del diccionario).

Es la pieza clave que permite al `SectionRenderer` ser un componente genérico y desacoplado, cumpliendo así con el **Principio Abierto/Cerrado**: para añadir una nueva sección a la aplicación, solo necesitamos modificar este archivo de configuración, sin tocar la lógica del renderizador.

## 2. Arquitectura y Flujo de Ejecución

1.  **Definición de Contratos:**
    *   `sectionNames`: Un array `as const` que sirve como SSoT para todos los nombres de sección válidos.
    *   `SectionName`: Un tipo de TypeScript derivado de `sectionNames` para garantizar la seguridad de tipos.
    *   `SectionConfigEntry`: Una interfaz que define la estructura de cada entrada del registro: el componente a renderizar y la clave para encontrar sus datos.

2.  **El Registro (`sectionsConfig`):**
    *   Es un objeto `Record<SectionName, SectionConfigEntry>` que implementa el registro. Cada clave debe ser un `SectionName` válido.

3.  **Consumo por el `SectionRenderer`:**
    *   El `SectionRenderer` recibe un `sectionName` (string) desde el `theme.json` de la campaña.
    *   Utiliza este `sectionName` como clave para buscar una entrada en `sectionsConfig`.
    *   Si la encuentra, extrae el `component` y la `dictionaryKey`.
    *   Renderiza el `component` extraído, pasándole los datos que encuentra en el diccionario global usando la `dictionaryKey`.

## 3. Contrato de API

*   **Exportación principal:** `sectionsConfig` - El objeto de registro.
*   **Exportación de tipos:** `SectionName` - El tipo unión de todos los nombres de sección válidos.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Generación Automática del Registro:** Se podría crear un script (`pnpm gen:sections`) que escanee el directorio `src/components/sections`, lea un comentario TSDoc `@dictionaryKey` en cada archivo, y genere automáticamente este archivo `sections.config.ts`. Esto automatizaría completamente el proceso de añadir nuevas secciones.
2.  **Carga Diferida (Lazy Loading):** Se podría modificar el contrato `SectionConfigEntry` para que la propiedad `component` no sea una referencia directa, sino una función de importación dinámica (ej. `() => import('@/components/sections/Hero')`). El `SectionRenderer` podría entonces usar `next/dynamic` para cargar las secciones bajo demanda, mejorando el rendimiento de carga inicial de la página.
3.  **Validación de Props en Desarrollo:** El registro podría incluir una referencia opcional al esquema Zod de las props de cada sección. En modo desarrollo, el `SectionRenderer` podría usar este esquema para validar los datos del diccionario justo antes de renderizar, detectando inconsistencias de datos de forma temprana.