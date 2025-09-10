// .docs-espejo/components/ui/FadeIn.tsx.md
/\*\*

- @file .docs-espejo/components/ui/FadeIn.tsx.md
- @description Documento Espejo para el aparato de animación FadeIn.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto Conceptual: Aparato FadeIn

## 1. Rol Estratégico

El `FadeIn` es un componente de UI atómico cuya única responsabilidad es **orquestar una animación de entrada para sus elementos hijos**. Su propósito estratégico es mejorar la experiencia del usuario introduciendo contenido de forma suave y escalonada a medida que el usuario se desplaza por la página. Esto evita la aparición brusca de elementos y crea una sensación de fluidez y profesionalismo.

## 2. Arquitectura y Flujo de Ejecución

- **Tipo:** Componente Cliente (`"use client"`). Las animaciones y la detección de visibilidad en el viewport son intrínsecamente operaciones del lado del cliente.
- **Motor de Animación:** Utiliza la librería `framer-motion`, que es el estándar del proyecto para animaciones complejas, garantizando consistencia y rendimiento.
- **Flujo de Ejecución:**
  1.  El componente se renderiza como un `motion.div` que envuelve a sus `children`.
  2.  Se le asignan variantes de animación predefinidas (`hidden` y `visible`).
  3.  `framer-motion` se encarga de detectar cuándo el componente entra en el viewport del usuario (`whileInView`).
  4.  Al entrar en el viewport, `framer-motion` transiciona automáticamente el componente del estado `initial="hidden"` al estado `whileInView="visible"`.
  5.  La prop `viewport={{ once: true }}` asegura que la animación solo se ejecute una vez por cada renderizado del componente.

## 3. Contrato de API

| Prop        | Tipo              | Requerido | Descripción                                                          |
| :---------- | :---------------- | :-------- | :------------------------------------------------------------------- |
| `children`  | `React.ReactNode` | Sí        | Los elementos JSX que serán animados.                                |
| `className` | `string`          | No        | Clases de CSS adicionales para aplicar al elemento `div` contenedor. |

## 4. Zona de Melhorias Futuras

1.  **Dirección de Animación Personalizable:** Añadir una prop `direction: 'up' | 'down' | 'left' | 'right'` para controlar la dirección desde la que aparece el contenido.
2.  **Duración y Retraso Configurables:** Exponer las props `duration` y `delay` para permitir un control más fino sobre el timing de la animación desde el componente padre.
3.  **Animaciones Escalonadas (`staggerChildren`):** Crear un componente `FadeInStagger` que, al envolver varios `FadeIn`, pueda orquestar animaciones de entrada escalonadas para sus hijos, creando efectos de cascada.
4.  **Umbral de Visibilidad Configurable:** Exponer la prop `amount` del `viewport` de `framer-motion` para controlar qué porcentaje del elemento debe ser visible antes de que se dispare la animación.
    // .docs-espejo/components/ui/FadeIn.tsx.md
