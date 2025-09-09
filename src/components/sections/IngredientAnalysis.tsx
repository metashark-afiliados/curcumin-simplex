// RUTA: src/components/sections/IngredientAnalysis.tsx
/**
 * @file Sección de Análisis de Ingredientes
 * @description Muestra una cuadrícula (grid) donde cada celda detalla un ingrediente
 * clave del producto, con su nombre y descripción. Ayuda a construir credibilidad
 * y a educar al usuario sobre la fórmula.
 *
 * @TODOS: Mantener estos comentarios de documentación en futuros snapshots.
 */
import { Container } from "@/components/ui/Container";

interface Ingredient {
  name: string;
  description: string;
}

interface IngredientAnalysisProps {
  title: string;
  ingredients: Ingredient[];
}

export function IngredientAnalysis({
  title,
  ingredients,
}: IngredientAnalysisProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-brand-text-dark mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="p-6 border border-gray-200 rounded-lg shadow-sm text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-brand-header-blue mb-2">
                {ingredient.name}
              </h3>
              <p className="text-brand-text-light">{ingredient.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// --- MEJORAS FUTURAS ---
// 1. **Iconos por Ingrediente**: Se podría añadir una propiedad `icon` a la interfaz `Ingredient`
//    para mostrar un icono representativo (ej. una hoja para un ingrediente botánico)
//    encima del nombre, haciendo la sección más visual y fácil de escanear.
// 2. **Modal con más información**: Al hacer clic en un ingrediente, se podría abrir un
//    modal (diálogo) que muestre información más detallada, como estudios científicos
//    relacionados, dosis recomendada o país de origen.

// RUTA: src/components/sections/IngredientAnalysis.tsx
