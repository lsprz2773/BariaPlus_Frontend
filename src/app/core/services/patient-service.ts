import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, PatientResponse } from '../interfaces/patient';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) {
  }

  // /api para que funcione con el proxy
  createPatient(patient: Patient): Observable<PatientResponse> {
    return this.http.post<PatientResponse>('/api/patient', patient);
  }

  getPatients(): Observable<PatientResponse> {
    return this.http.get<PatientResponse>('/api/patient');
  }

  getPatientById(id: number): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(`/api/patient/${id}`);
  }
  
  deletePatient(id: number): Observable<any> {
    if (environment.enableDebugMode) {
      console.log('Eliminando paciente con ID:', id);
    }
    return this.http.patch(`/api/patient/${id}/status`, { statusId: 2 });
  }

}

