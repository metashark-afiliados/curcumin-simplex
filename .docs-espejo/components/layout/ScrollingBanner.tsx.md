# /.docs-espejo/components/layout/ScrollingBanner.tsx.md

/**
 * @file /.docs-espejo/components/layout/ScrollingBanner.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato ScrollingBanner.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto Conceptual: `ScrollingBanner`

## 1. Rol Estratégico y Propósito

El `ScrollingBanner` es una herramienta de **comunicación de alta visibilidad**. Su propósito estratégico es capturar la atención del usuario de manera inmediata y persistente con un mensaje clave, sin ser intrusivo. Se utiliza para generar un sentido de urgencia, anunciar ofertas por tiempo limitado o comunicar información crítica (ej. "Stock limitado", "Envío gratuito hoy").

## 2. Arquitectura y Principios Aplicados

-   **Componente Cliente:** Es un `"use client"` por necesidad, ya que depende de la librería `react-fast-marquee` que manipula el DOM para crear el efecto de desplazamiento.
-   **Desacoplamiento del Contenido:** Siguiendo la Directiva 003, el componente es puro. Recibe el `message` a través de props, haciéndolo agnóstico al contenido y completamente reutilizable.
-   **Estilo Semántico:** El color de fondo se define mediante una clase semántica (`bg-banner-alert`), cuya implementación real reside en `tailwind.config.ts`, permitiendo cambios de branding globales sin tocar el componente.

## 3. Contrato de API (Props)

| Prop      | Tipo     | Obligatorio | Descripción                                        |
| :-------- | :------- | :---------- | :------------------------------------------------- |
| `message`   | `string` | Sí          | La cadena de texto a mostrar en la marquesina.     |

## 4. Zona de Melhorias Futuras

1.  **Variantes de Estilo:** Añadir una prop `variant: 'alert' | 'info' | 'success'` que aplique diferentes combinaciones de colores e iconos, haciendo el componente más versátil para distintos tipos de mensajes.
2.  **Personalización de Icono:** Permitir pasar un componente de icono personalizado como prop para mayor flexibilidad visual.
3.  **Control de Velocidad y Dirección:** Exponer las props `speed` y `direction` de `react-fast-marquee` para poder controlarlas desde el componente padre.