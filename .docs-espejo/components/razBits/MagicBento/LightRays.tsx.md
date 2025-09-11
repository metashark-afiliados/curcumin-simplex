// .docs-espejo/components/backgrounds/LightRays.tsx.md
/\*\*

- @file .docs-espejo/components/backgrounds/LightRays.tsx.md
- @description Documento Espejo para el aparato LightRays.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto Conceptual: Aparato LightRays

## 1. Rol Estratégico

El `LightRays` es un componente de fondo (background) puramente estético. Su función es crear un ambiente visual dinámico e inmersivo. No contiene lógica de negocio ni contenido textual. Su rol es elevar la percepción de la marca, asociándola con una estética moderna, tecnológica y premium.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura ha sido atomizada para una máxima separación de conceptos (PRU):

- **Hook `useLightRays` (El Cerebro):**
  - **Tipo:** Custom Hook de React.
  - **Responsabilidad:** Contiene TODA la lógica compleja: inicialización del renderer de `ogl`, compilación de shaders de GLSL, bucle de animación (`requestAnimationFrame`), gestión de eventos (`resize`, `mousemove`), y la lógica del `IntersectionObserver` para optimización de rendimiento.
  - **Entrada:** Acepta la `ref` al elemento contenedor y el objeto de configuración.
  - **Salida:** No devuelve nada. Su propósito es aplicar efectos secundarios al DOM (inyectar y dibujar en el canvas).

- **Componente `LightRays` (El Cuerpo):**
  - **Tipo:** Componente Cliente de Presentación Puro.
  - **Responsabilidad:** Su única función es renderizar un `<div>` y pasar su `ref` al hook `useLightRays`.
  - **Flujo:**
    1.  El componente se renderiza y crea una `ref` con `useRef`.
    2.  Renderiza un `div` y le asigna la `ref`.
    3.  Invoca al hook `useLightRays`, pasándole la `ref` y el objeto de configuración.
    4.  El hook toma el control del `div` para realizar el renderizado de WebGL.

## 3. Contrato de API

| Prop        | Tipo              | Requerido | Descripción                                                                                                                                    |
| :---------- | :---------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `config`    | `LightRaysConfig` | No        | Un objeto que contiene todas las opciones de personalización para los rayos de luz. Si no se proporciona, se utilizan los valores por defecto. |
| `className` | `string`          | No        | Clases de CSS adicionales para el `div` contenedor.                                                                                            |

## 4. Zona de Melhorias Futuras

1.  **Presets de Configuración:** Crear presets de configuración predefinidos (ej. `'calm-aurora'`, `'techno-pulse'`) que se puedan pasar a través de una prop `preset` para una personalización rápida y temática.
2.  **Integración con Controles de UI:** Desarrollar un componente de depuración (ej. usando `leva` o `dat.gui`) que permita modificar los parámetros de `useLightRays` en tiempo real para facilitar el ajuste fino del efecto visual.
3.  **Shaders Dinámicos:** Permitir pasar fragmentos de código de shader (GLSL) como props para personalizar el efecto visual a un nivel aún más profundo.
4.  **Sincronización de Audio:** Añadir la capacidad de sincronizar la animación (ej. la propiedad `pulsating`) con una fuente de audio externa utilizando el `Web Audio API`.
    // .docs-espejo/components/backgrounds/LightRays.tsx.md
