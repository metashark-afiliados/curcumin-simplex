# /.docs-espejo/components/sections/ThumbnailCarousel.tsx.md

/**
 * @file /.docs-espejo/components/sections/ThumbnailCarousel.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato ThumbnailCarousel.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto Conceptual: `ThumbnailCarousel`

## 1. Rol Estratégico y Propósito

El `ThumbnailCarousel` es una pieza central de la **narrativa visual** de la página. Su propósito es actuar como un "video teaser" sin el coste de rendimiento de cargar un video real. Muestra imágenes de alta calidad del producto, sus resultados o su estilo de vida asociado de una manera dinámica y atractiva.

Estratégicamente, su función es:
1.  **Demostrar Valor Visualmente:** Comunica los beneficios y la calidad del producto de una forma que el texto no puede.
2.  **Generar Interés y Deseo:** Las imágenes atractivas y el movimiento sutil incitan a la curiosidad.
3.  **Actuar como un Fuerte CTA Visual:** El prominente botón de "play" superpuesto es una llamada a la acción irresistible que dirige al usuario hacia el siguiente paso del funnel de conversión.

## 2. Arquitectura y Principios Aplicados

-   **Animación Declarativa (Framer Motion):** La lógica de animación se ha refactorizado para usar `AnimatePresence` de Framer Motion. Esto es superior a un `setInterval` manual porque:
    -   Es **declarativo:** Se describe el estado final (`opacity: 1`) y Framer Motion se encarga de la transición.
    -   Es más **performante:** Utiliza animaciones CSS optimizadas y puede aprovechar la aceleración por hardware.
    -   Gestiona el **ciclo de vida** de los componentes (entrada y salida) de forma elegante, ideal para un carrusel.
-   **Componente Cliente (`"use client"`):** La interactividad (manejo de estado con `useState`) y las animaciones cliente (`useEffect`, Framer Motion) requieren que este sea un componente cliente.
-   **Alineación con Theming y Componentes Atómicos:** El componente ha sido nivelado para consumir exclusivamente estilos y componentes de nuestra SSoT (el `Button` nivelado, colores semánticos como `border-foreground/10`), asegurando consistencia visual y mantenibilidad.
-   **Optimización de Imágenes (`next/image`):** Utiliza `next/image` con la prop `sizes` para asegurar que se cargue la imagen del tamaño más adecuado para el viewport del usuario, y `priority` para la primera imagen, optimizando los Core Web Vitals.

## 3. Contrato de API (Props)

| Prop         | Tipo                                | Obligatorio | Por Defecto | Descripción                                                   |
| :----------- | :---------------------------------- | :---------- | :---------- | :------------------------------------------------------------ |
| `thumbnails` | `Array<{src: string, alt: string}>` | Sí          | -           | Un array de objetos, cada uno representando una imagen.       |
| `affiliateUrl` | `string`                          | Sí          | -           | La URL a la que enlazará el botón de play.                    |
| `interval`   | `number`                          | No          | `5000`      | El tiempo en milisegundos entre cada transición de imagen.    |

## 4. Zona de Melhorias Futuras

1.  **Controles Manuales:** Añadir botones de "siguiente" y "anterior" para que el usuario pueda navegar manualmente por el carrusel, dándole más control.
2.  **Indicadores de Progreso:** Añadir "puntos" o una barra de progreso que muestre qué imagen está activa y cuánto falta para la siguiente transición.
3.  **Integración con Lightbox:** Al hacer clic en las imágenes (fuera del botón de play), se podría abrir una galería de tipo "lightbox" que muestre las imágenes en un tamaño mayor.
4.  **Carga de Video Real:** El clic en el botón de "play" podría, en lugar de navegar, abrir un modal que contenga un video de YouTube o Vimeo, cargándolo solo bajo demanda para no afectar el rendimiento inicial.