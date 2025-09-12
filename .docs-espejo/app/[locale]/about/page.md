# /.docs-espejo/app/[locale]/about/page.tsx.md
/**
 * @file page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página "Acerca de Nosotros".
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Página de Contenido Estático (Arquetipo "About")

## 1. Rol Estratégico

Este aparato (`about/page.tsx`) sirve como el **arquetipo para todas las páginas de contenido textual estático** del portal (ej. "Política de Privacidad", "Términos de Servicio"). Su propósito es presentar información de formato largo de una manera clara, legible y optimizada para SEO.

Estas páginas son cruciales para construir la confianza del usuario y para enviar señales de E-E-A-T (Experience, Expertise, Authoritativeness, and Trust) a los motores de búsqueda.

## 2. Arquitectura y Flujo de Ejecución

1.  **Obtención de Datos (Servidor):** Como Componente de Servidor `async`, obtiene el diccionario de contenido para el `locale` actual a través de `getDictionary`.
2.  **Selección de Contenido:** Accede a la clave específica para esta página (ej. `t.aboutPage`). Implementa una guarda de seguridad para manejar el caso en que el contenido para un `locale` específico no exista.
3.  **Renderizado de Layout:** Utiliza componentes de UI atómicos y reutilizables:
    *   `PageHeader`: Para renderizar el título y subtítulo de forma consistente en todas las páginas de contenido.
    *   `TextSection`: Un componente de layout especializado que aplica el padding vertical estándar y, crucialmente, los estilos de `prose` de Tailwind para formatear automáticamente el contenido textual (márgenes, espaciado de párrafos, estilos de `h2`, etc.), garantizando una legibilidad óptima.
4.  **Renderizado de Contenido Dinámico:** Itera sobre el array `content` del diccionario y renderiza elementos `<h2 />` o `<p />` según la propiedad `type` de cada bloque.

## 3. Contrato de API (Props)

*   `params`: `{ locale: Locale; }` - Define el idioma del contenido a renderizar.

## 4. Zona de Melhorias Futuras (Registro de Valor)

1.  **Renderizador de Markdown:** En lugar de un array de objetos JSON, el `content` podría ser una única cadena de texto en formato Markdown. La página podría usar una librería como `react-markdown` para renderizarlo, dando más flexibilidad a los editores de contenido.
2.  **Tabla de Contenidos Automática:** Se podría generar una tabla de contenidos dinámica a partir de los bloques `h2`, que se mostraría en una barra lateral para facilitar la navegación en documentos largos.
3.  **Metadatos de Última Actualización:** El diccionario podría incluir una fecha de `lastUpdated`, y la página podría mostrar un mensaje como "Última actualización: [fecha]" para aumentar la confianza.