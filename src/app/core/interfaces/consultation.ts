//crear consulta 
export interface ConsultationNote {
  description: string;
  categoryId: number;
}

export interface MetricValue {
  metricsCatalogId: number;
  value: string;
}

export interface EnergeticExpenditure {
  physicalActivityId: number;
  reductionPercentage: string;
}

export interface CreateConsultationRequest {
  patientId: number;
  medicalRecordId: number;
  reason: string;
  notes: ConsultationNote[];
  metricValues: MetricValue[];
  energeticExpenditure: EnergeticExpenditure;
}


// ============================================
// HELPER INTERFACES (para uso en componentes)
// ============================================

// Para mostrar métricas agrupadas por categoría
export interface MetricDisplay {
  catalogId: number;
  name: string;
  value: string;
  unit: string;
  category: string;
}

// Para mostrar indicadores de salud con estado visual
export interface IndicatorDisplay {
  typeIndicatorId: number;
  name: string;
  value: string;
  rangeName: string;
  color: string;
  icon?: string;
}
