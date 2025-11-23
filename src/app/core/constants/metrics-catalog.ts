/**
 * Catálogo de métricas antropométricas y corporales
 * Basado en los IDs de metricsCatalogId del API
 */

export interface MetricCatalog {
  id: number;
  name: string;
  unit: string;
  category: 'antropometric' | 'circumference' | 'skinfold' | 'calculated';
  description?: string;
}

export const METRICS_CATALOG: MetricCatalog[] = [
  // Métricas básicas
  { id: 1, name: 'Peso', unit: 'kg', category: 'antropometric', description: 'Peso corporal' },
  { id: 2, name: 'Talla', unit: 'cm', category: 'antropometric', description: 'Estatura' },
  
  // Calculadas automáticamente (no se envían, se reciben)
  { id: 3, name: 'Peso ideal', unit: 'kg', category: 'calculated' },
  { id: 4, name: 'Peso ajustado', unit: 'kg', category: 'calculated' },
  { id: 5, name: 'Peso teórico', unit: 'kg', category: 'calculated' },
  
  // Circunferencias
  { id: 6, name: 'Cintura', unit: 'cm', category: 'circumference', description: 'Circunferencia de cintura' },
  { id: 7, name: 'Cadera', unit: 'cm', category: 'circumference', description: 'Circunferencia de cadera' },
  { id: 8, name: 'Cuello', unit: 'cm', category: 'circumference', description: 'Circunferencia de cuello' },
  { id: 9, name: 'Brazo', unit: 'cm', category: 'circumference', description: 'Circunferencia de brazo' },
  { id: 10, name: 'Brazo corregido', unit: 'cm', category: 'circumference' },
  { id: 11, name: 'Pantorrilla', unit: 'cm', category: 'circumference' },
  { id: 12, name: 'Muslo', unit: 'cm', category: 'circumference' },
  { id: 13, name: 'Antebrazo', unit: 'cm', category: 'circumference' },
  { id: 14, name: 'Abdomen', unit: 'cm', category: 'circumference' },
  
  // Pliegues cutáneos
  { id: 15, name: 'Pliegue tricipital', unit: 'mm', category: 'skinfold' },
  { id: 16, name: 'Pliegue bicipital', unit: 'mm', category: 'skinfold' },
  { id: 17, name: 'Pliegue subescapular', unit: 'mm', category: 'skinfold' },
  { id: 18, name: 'Pliegue suprailiaco', unit: 'mm', category: 'skinfold' },
  { id: 19, name: 'Pliegue abdominal', unit: 'mm', category: 'skinfold' },
  { id: 20, name: 'Pliegue muslo', unit: 'mm', category: 'skinfold' },
  
  // Áreas calculadas
  { id: 21, name: 'Área muscular del brazo', unit: 'cm²', category: 'calculated' },
  { id: 22, name: 'Pliegue pectoral', unit: 'mm', category: 'skinfold' },
  { id: 23, name: 'Pliegue axilar', unit: 'mm', category: 'skinfold' }
];

/**
 * Tipos de indicadores de salud
 */
export interface IndicatorType {
  id: number;
  name: string;
  unit: string;
  description?: string;
}

export const INDICATOR_TYPES: IndicatorType[] = [
  { id: 1, name: 'IMC', unit: 'kg/m²', description: 'Índice de Masa Corporal' },
  { id: 2, name: 'ICC', unit: '', description: 'Índice Cintura-Cadera' },
  { id: 3, name: 'Porcentaje de grasa corporal', unit: '%', description: 'Estimación de composición corporal' },
  { id: 4, name: 'Masa magra', unit: 'kg', description: 'Peso de tejido no graso' },
  { id: 5, name: 'Índice cintura-talla', unit: '', description: 'Riesgo cardiovascular' }
];

/**
 * Niveles de actividad física
 */
export interface PhysicalActivity {
  id: number;
  name: string;
  factor: number;
  description: string;
}

export const PHYSICAL_ACTIVITIES: PhysicalActivity[] = [
  { id: 1, name: 'Sedentario', factor: 1.2, description: 'Poco o ningún ejercicio' },
  { id: 2, name: 'Ligero', factor: 1.375, description: 'Ejercicio ligero 1-3 días/semana' },
  { id: 3, name: 'Moderado', factor: 1.55, description: 'Ejercicio moderado 3-5 días/semana' },
  { id: 4, name: 'Activo', factor: 1.725, description: 'Ejercicio intenso 6-7 días/semana' },
  { id: 5, name: 'Muy activo', factor: 1.9, description: 'Ejercicio muy intenso, trabajo físico' }
];

/**
 * Categorías de notas clínicas
 */
export interface NoteCategory {
  id: number;
  name: string;
  color: string;
}

export const NOTE_CATEGORIES: NoteCategory[] = [
  { id: 1, name: 'Observación general', color: '#2196F3' },
  { id: 2, name: 'Síntomas', color: '#FF9800' },
  { id: 3, name: 'Diagnóstico', color: '#4CAF50' },
  { id: 4, name: 'Tratamiento', color: '#9C27B0' },
  { id: 5, name: 'Seguimiento', color: '#00BCD4' }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getMetricById(id: number): MetricCatalog | undefined {
  return METRICS_CATALOG.find(m => m.id === id);
}

export function getIndicatorById(id: number): IndicatorType | undefined {
  return INDICATOR_TYPES.find(i => i.id === id);
}

export function getPhysicalActivityById(id: number): PhysicalActivity | undefined {
  return PHYSICAL_ACTIVITIES.find(p => p.id === id);
}

export function getNoteCategoryById(id: number): NoteCategory | undefined {
  return NOTE_CATEGORIES.find(n => n.id === id);
}

export function getMetricsByCategory(category: MetricCatalog['category']): MetricCatalog[] {
  return METRICS_CATALOG.filter(m => m.category === category);
}
