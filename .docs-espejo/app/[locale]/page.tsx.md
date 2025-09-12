# /.docs-espejo/app/[locale]/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de inicio.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Orquestador de la Página de Inicio

## 1. Rol Estratégico

Este aparato (`page.tsx`) es el **orquestador de contenido para la página de inicio del portal**. Su única responsabilidad es obtener los datos de contenido y ensamblar las secciones de UI correspondientes en el orden correcto.

Funciona como el "director de escena" de la página más importante del sitio, definiendo qué componentes se muestran y qué datos se les proporciona, pero sin involucrarse en la lógica de presentación de dichos componentes.

## 2. Arquitectura y Flujo de Ejecución

1.  **Obtención de Datos (Servidor):** Como Componente de Servidor `async`, invoca a `getDictionary` para obtener el objeto de contenido completo para el `locale` solicitado.
2.  **Renderizado Condicional:** El cuerpo del componente es una secuencia de expresiones condicionales. Para cada sección potencial (`heroNews`, `socialProof`, etc.), verifica si la clave de contenido correspondiente existe en el diccionario (`t.heroNews && ...`).
3.  **Delegación a Componentes de Sección:** Si la clave de contenido existe, el componente de sección correspondiente es renderizado, pasándole el objeto de contenido relevante como una única `prop` (`content={t.heroNews}`). Esto adhiere al principio de "props como objeto de contenido", simplificando el contrato entre la página y sus secciones.
4.  **Resiliencia:** Si una sección no está definida en el diccionario para un `locale` particular, simplemente se omite sin causar un error de renderizado, permitiendo lanzamientos de contenido parciales o progresivos.

## 3. Contrato de API (Props)

*   `params`: `{ locale: Locale; }` - Define el idioma del contenido a renderizar.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Layout por Configuración:** Similar al `SectionRenderer` de las campañas, el orden y la selección de secciones podrían ser definidos por un objeto de configuración en el diccionario (ej. `homePageLayout: ['heroNews', 'socialProof', ...]`), haciendo la estructura de la página de inicio tan flexible como la de una campaña.
2.  **Contenido Personalizado (A/B Testing):** Se podría implementar una lógica que, basada en una cookie o parámetro de URL, cargue una versión alternativa del contenido de la página de inicio desde un archivo diferente para realizar pruebas A/B.
3.  **Streaming de Secciones con Suspense:** Envolver las secciones más pesadas (ej. `NewsGrid` que podría hacer una llamada a la base de datos) en `<Suspense>` para permitir el streaming de la página, mejorando el Time to First Byte (TTFB).