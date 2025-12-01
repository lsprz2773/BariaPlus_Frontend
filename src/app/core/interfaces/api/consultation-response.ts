export interface Consultation {
  id: number;
  date: string;
  reason: string;
  medicalRecordId: number;
  notesCount: number;
  healthIndicatorsCount: number;
  metricsCount: number;
}

export interface CalculatedIndicator {
  nameIndicator: any;
  typeIndicatorId: number;
  value: string;
  rangeId: number;
  rangeName: string;
  color: string;
}

export interface CalculatedMetric {
  nameCatalog: any;
  catalogId: number;
  value: string;
}

export interface ConsultationResponse {
  success: boolean;
  message: string;
  consultation: Consultation;
  calculatedIndicators: CalculatedIndicator[];
  calculatedMetrics: CalculatedMetric[];
}

// HELPER INTERFACES (para uso en componentes)
export interface MetricDisplay {
  catalogId: number;
  name: string;
  value: string;
  unit: string;
  category: string;
}

export interface IndicatorDisplay {
  typeIndicatorId: number;
  name: string;
  value: string;
  rangeName: string;
  color: string;
  icon?: string;
  image?: string;
}

export interface OriginalMetric {
  metricsCatalogId: number;
  nameCatalog?: string;
  value: string;
}

export interface OriginalNote {
  description: string;
  categoryId: number;
}

export interface EnergeticExpenditure {
  physicalActivityId: number;
  energyExpenditure: string;
  reductionPercentage: string;
  energyExpenditureReduction: string;
}

export interface ConsultationDetailResponse {
  success: boolean;
  message: string;
  consultation: {
    id: number;
    date: string;
    reason: string;
    medicalRecordId: number;
    genderId: number;
    firstName: string;
    lastName: string;
    // en la respuesta de getById no vienen estos counts, por eso opcionales
    notesCount?: number;
    healthIndicatorsCount?: number;
    metricsCount?: number;
  };
  calculatedIndicators: CalculatedIndicator[];
  calculatedMetrics: CalculatedMetric[];
  originalMetrics: OriginalMetric[];
  originalNotes: OriginalNote[];
  energeticExpenditure: EnergeticExpenditure;
}
