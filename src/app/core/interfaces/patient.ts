export interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    entryDate: string;
    emergencyNumber: string; // Cambiado a string para coincidir con la API
    genderId: number;
    statusId: number;
    medicalRecordId?: number;
    allergies: Allergy[];
    diseases: Disease[];
    medicalHistories: MedicalHistory[];
    consultations?: ConsultationSummary[];
}

export interface MedicalHistory {
    id?: number;
    name: string;
    detectionDate: Date | null;
    historyTypesId: number;
}

export interface Disease {
    id?: number;
    name: string;
    actualStateId: number;
}

export interface Allergy {
    id?: number;
    name: string;
    allergicReaction: string;
}

export interface PatientResponse {
    success: boolean,
    message: string,
    patient: Patient;
    patients?: Patient[];
}

export interface ConsultationSummary {
  id: number;
  consultationDate: string
}
