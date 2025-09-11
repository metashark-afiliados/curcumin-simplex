// .docs-espejo/components/razBits/MagicBento/MagicBento.tsx.md
/\*\*

- @file .docs-espejo/components/razBits/MagicBento/MagicBento.tsx.md
- @description Documento Espejo para el ecosistema de aparatos MagicBento.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto Conceptual: Ecosistema de Aparatos MagicBento

## 1. Rol Estratégico

El ecosistema `MagicBento` es un conjunto de aparatos que trabajan en conjunto para renderizar una cuadrícula de contenido altamente interactiva. Su rol es capturar la atención del usuario y comunicar información de forma visualmente espectacular, sirviendo como una pieza central en páginas de alto impacto.

## 2. Arquitectura y Flujo de Ejecución (Atomizada)

- **Hook `useBentoGridInteraction` (El Cerebro):**
  - **Responsabilidad:** Gestiona toda la lógica de efectos e interacciones. Inicializa y controla GSAP, los listeners de eventos del ratón, y la lógica del spotlight global.
  - **Entrada:** Una `ref` a la cuadrícula y el objeto de configuración.
  - **Salida:** Devuelve las `refs` y los manejadores de eventos que los componentes hijos necesitarán.

- **Componente `BentoCard` (El Músculo):**
  - **Responsabilidad:** Renderiza una única tarjeta de la cuadrícula. Es un componente de presentación puro.
  - **Entrada:** Recibe el contenido de la tarjeta (título, descripción) y las `props` de interacción (como `ref`) del hook.

- **Componente `MagicBento` (El Orquestador):**
  - **Responsabilidad:** Ensambla la sección. Obtiene los datos del diccionario, llama al hook `useBentoGridInteraction` para inicializar la lógica, y luego mapea los datos para renderizar la cuadrícula de componentes `BentoCard`.

## 3. Contrato de API

| Prop      | Tipo                       | Requerido | Descripción                                                                                  |
| :-------- | :------------------------- | :-------- | :------------------------------------------------------------------------------------------- |
| `content` | `Dictionary['magicBento']` | Sí        | El objeto completo de contenido y configuración desde el diccionario i18n, validado por Zod. |

## 4. Zona de Melhorias Futuras

1.  **Layouts de Cuadrícula Dinámicos:** Permitir que la estructura de la cuadrícula (ej. qué tarjeta ocupa más espacio) sea definida en el `i18n.json` en lugar de en el CSS.
2.  **Contenido Personalizado por Tarjeta:** Permitir que cada tarjeta en la cuadrícula renderice `children` personalizados en lugar de la estructura fija de título/descripción.
3.  **Efectos Configurables por Tarjeta:** Extender el schema para permitir que cada tarjeta individual pueda sobreescribir la configuración de efectos globales (ej. deshabilitar el tilt solo para una tarjeta).
    // .docs-espejo/components/razBits/MagicBento/MagicBento.tsx.md
