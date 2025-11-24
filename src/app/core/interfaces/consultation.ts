//crear consulta 
export interface ConsultationRequest {
  patientId: number;
  medicalRecordId: number;
  reason: string;
  notes: Note[];
  metricValues: MetricValue[];
  energeticExpenditure: EnergeticExpenditure;
}

export interface Note {
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


