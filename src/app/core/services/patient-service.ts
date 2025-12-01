import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, PatientResponse } from '../interfaces/patient';
import { environment } from '../../../environments/environment.development';
import { PatientFilter } from '../interfaces/api/patient-filter';

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

  getPatients(filters?: PatientFilter): Observable<PatientResponse> {
    let params = new HttpParams();

    if (filters?.search) {
      params = params.set('search', filters.search);
    }
    if (filters?.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }
    if (filters?.page) {
      params = params.set('page', filters.page.toString());
    }
    if (filters?.limit) {
      params = params.set('limit', filters.limit.toString());
    }


    return this.http.get<PatientResponse>('/api/patient', { params });
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

