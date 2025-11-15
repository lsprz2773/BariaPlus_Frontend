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

import { Allergy } from './allergy';
import { Disease } from './diseases';
import { MedicalHistory } from './medical-history';

//en vez de import mejor aca todo de una
