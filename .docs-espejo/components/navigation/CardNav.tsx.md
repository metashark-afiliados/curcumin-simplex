// .docs-espejo/components/navigation/CardNav.tsx.md
/\*\*

- @file .docs-espejo/components/navigation/CardNav.tsx.md
- @description Documento Espejo para el aparato CardNav.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto Conceptual: Aparato CardNav

## 1. Rol Estratégico

El `CardNav` es el componente de navegación principal para las landings de campaña. Su rol es proporcionar una experiencia de navegación premium y altamente interactiva que refuerce la identidad de marca moderna y tecnológica del producto. Combina la funcionalidad de una barra de navegación estándar con una animación de tarjetas distintiva para presentar los enlaces de sub-navegación.

## 2. Arquitectura y Flujo de Ejecución

- **Tipo:** Componente Cliente (`"use client"`). La gestión del estado del menú (abierto/cerrado) y el control de las animaciones con GSAP requieren ejecución en el navegador.
- **Estado Interno:** El componente gestiona internamente dos estados principales:
  1.  `isHamburgerOpen`: Controla el estado visual del icono de la hamburguesa.
  2.  `isExpanded`: Controla el estado lógico del menú (desplegado o no), que a su vez determina la visibilidad del contenido de las tarjetas.
- **Motor de Animación (GSAP):** La lógica de animación se encapsula dentro de un `useLayoutEffect`. Se crea una `timeline` de GSAP que se almacena en una `ref`. Esta timeline pre-calcula las animaciones de cambio de altura del contenedor principal y la aparición escalonada de las tarjetas.
- **Flujo de Interacción:**
  1.  El usuario hace clic en el menú de hamburguesa, invocando `toggleMenu`.
  2.  `toggleMenu` comprueba el estado `isExpanded`.
  3.  Si está cerrado, reproduce la `timeline` de GSAP hacia adelante (`tl.play()`).
  4.  Si está abierto, reproduce la `timeline` en reversa (`tl.reverse()`).
  5.  Los hooks `useState` actualizan el estado, provocando que React vuelva a renderizar el componente con las clases y atributos ARIA correctos.

## 3. Contrato de API (Post-Naturalización)

| Prop        | Tipo       | Requerido | Descripción                                                                                  |
| :---------- | :--------- | :-------- | :------------------------------------------------------------------------------------------- |
| `logo`      | `object`   | Sí        | Objeto que contiene `src` y `alt` para la imagen del logo, proveniente del diccionario i18n. |
| `items`     | `object[]` | Sí        | Array de objetos de navegación, cada uno con `label` y `links`, desde el diccionario i18n.   |
| `ctaButton` | `object`   | Sí        | Objeto con `label` y `href` para el botón de llamada a la acción, desde el diccionario i18n. |

## 4. Zona de Melhorias Futuras

1.  **Variantes de Estilo Semánticas:** Añadir una prop `variant: 'primary' | 'secondary'` que aplique conjuntos predefinidos de clases de tema en lugar de depender de un único estilo.
2.  **Cierre en Navegación (SPA):** Si se usa con `next/link` para navegación interna, el menú debería cerrarse automáticamente después de hacer clic en un enlace.
3.  **Accesibilidad Mejorada del Foco:** Implementar una "trampa de foco" (`focus trap`) cuando el menú está abierto para que los usuarios de teclado no puedan salir del menú con la tecla `Tab`.
4.  **Animación de Entrada del Componente:** Añadir una animación de entrada para el propio `CardNav` cuando la página se carga por primera vez.
    // .docs-espejo/components/navigation/CardNav.tsx.md
