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
  typeIndicatorId: number;
  value: string;
  rangeId: number;
  rangeName: string;
  color: string;
}

export interface CalculatedMetric {
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