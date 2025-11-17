export interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    emergencyNumber: number;
    genderId: number;
    statusId: number;
    allergies?: Allergy[];
    diseases?: Disease[]; 
    medicalHistories?: MedicalHistory[];
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


