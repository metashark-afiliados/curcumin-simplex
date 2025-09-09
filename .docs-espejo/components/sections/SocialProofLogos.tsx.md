# /.docs-espejo/components/sections/SocialProofLogos.tsx.md

/**
 * @file /.docs-espejo/components/sections/SocialProofLogos.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato SocialProofLogos.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto Conceptual: `SocialProofLogos`

## 1. Rol Estratégico y Propósito

`SocialProofLogos` es una herramienta de **credibilidad instantánea**. Su propósito es reducir la fricción y el escepticismo inicial del usuario mostrando logotipos de entidades reconocidas (medios de comunicación, certificaciones, socios tecnológicos). Este reconocimiento de patrones ("He visto ese logo antes") genera una transferencia de confianza hacia el producto, incluso antes de que el usuario haya leído los beneficios en detalle.

## 2. Arquitectura y Principios Aplicados

-   **Componente Cliente:** Es `"use client"` por su dependencia de `react-fast-marquee`, que requiere acceso al DOM para sus animaciones.
-   **Integración Semántica con el Tema:** La propiedad `gradientColor` se ha refactorizado para utilizar `hsl(var(--background))`. Esto asegura que el efecto de desvanecimiento siempre coincida con el color de fondo del tema, creando una integración visual perfecta y eliminando estilos hardcodeados.
-   **Accesibilidad Mejorada:** El componente ahora se renderiza dentro de una etiqueta `<section>` con un `aria-labelledby` que apunta al `id` del `<h2>`. Esto proporciona un contexto claro a los lectores de pantalla, explicando qué representa la tira de logos.
-   **Contenido Desacoplado:** Recibe tanto el `title` como la lista de `logos` por props, adhiriéndose a la arquitectura i18n-B y al principio de componentes de presentación puros.

## 3. Contrato de API (Props)

| Prop    | Tipo                                | Obligatorio | Descripción                                                              |
| :------ | :---------------------------------- | :---------- | :----------------------------------------------------------------------- |
| `title` | `string`                            | Sí          | El título que precede a la tira de logos (ej. "Con la confianza de..."). |
| `logos` | `Array<{src: string, alt: string}>` | Sí          | Un array de objetos, cada uno representando un logo a mostrar.           |

## 4. Zona de Melhorias Futuras

1.  **Logos Clicables:** Añadir una propiedad opcional `href` a la interfaz `Logo` para que cada logo pueda enlazar a la fuente original (ej. el artículo de prensa o la página de certificación), aumentando aún más la credibilidad.
2.  **Efectos de Hover Avanzados:** En lugar de solo cambiar la opacidad, el `hover` podría eliminar el `grayscale` para mostrar el logo a color, creando un efecto más dinámico.
3.  **Variantes de Layout:** Crear una variante `variant: 'marquee' | 'grid'` para permitir mostrar los logos en una cuadrícula estática en lugar de una marquesina, para casos de uso donde se requiera menos movimiento.