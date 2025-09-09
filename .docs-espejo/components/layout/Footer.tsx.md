# /.docs-espejo/components/layout/Footer.tsx.md

/**
 * @file /.docs-espejo/components/layout/Footer.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato Footer.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manifiesto Conceptual: `Footer`

## 1. Rol Estratégico y Propósito

El aparato `Footer` es la **base de confianza y el cierre legal** de cada página. Su propósito estratégico es triple:

1.  **Establecer Legitimidad:** Proporciona el copyright y los enlaces a las páginas legales (`Términos y Condiciones`, `Política de Privacidad`), que son señales de confianza críticas tanto para los usuarios como para los motores de búsqueda.
2.  **Proveer Transparencia:** Muestra los descargos de responsabilidad (`disclaimers`) necesarios en la industria de los suplementos, gestionando las expectativas del usuario.
3.  **Navegación Secundaria:** Ofrece una navegación de último recurso a las secciones informativas clave.

Arquitectónicamente, es un componente de presentación puro, alineado con la estrategia de i18n-B.

## 2. Arquitectura y Principios Aplicados

-   **Componente de Presentación Puro:** `Footer` no contiene lógica de obtención de datos. Recibe todo su contenido textual a través de `props`, lo que lo hace completamente reutilizable y fácil de testear. El `RootLayout` será el responsable de alimentarlo con las traducciones obtenidas de `getDictionary`.
-   **Accesibilidad Semántica:** El uso de la etiqueta `<nav>` con un `aria-label` descriptivo ayuda a los lectores de pantalla a entender el propósito de la lista de enlaces, mejorando la accesibilidad del sitio.
-   **Diseño Responsivo (Mobile-First):** La estructura utiliza Flexbox con `flex-col` en móvil y `flex-row` en pantallas más grandes, asegurando una presentación óptima en todos los dispositivos.

## 3. Contrato de API (Props)

| Prop        | Tipo                                | Obligatorio | Descripción                                               |
| :---------- | :---------------------------------- | :---------- | :-------------------------------------------------------- |
| `copyright` | `string`                            | Sí          | La cadena de texto para el aviso de copyright.            |
| `links`     | `Array<{label: string, href: string}>` | Sí          | Un array de objetos para generar los enlaces de navegación. |
| `disclaimer`| `string`                            | Sí          | El texto completo del descargo de responsabilidad.        |

## 4. Zona de Melhorias Futuras

1.  **Año de Copyright Dinámico:** Implementar una pequeña lógica para que el año en el `copyright` se actualice automáticamente, evitando la necesidad de modificarlo manualmente cada enero.
2.  **Iconos de Redes Sociales:** Añadir una sección para mostrar iconos enlazados a los perfiles de redes sociales, aumentando los puntos de contacto con la marca.
3.  **Formulario de Suscripción a Newsletter:** Integrar un pequeño formulario para capturar correos electrónicos, convirtiendo el `Footer` en una herramienta de lead generation.
4.  **Sello de Confianza o Certificación:** Añadir un área para mostrar sellos de seguridad (ej. "SSL Secured") o certificaciones de la industria para aumentar aún más la confianza.

***