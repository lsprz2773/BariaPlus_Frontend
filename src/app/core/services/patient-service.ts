import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, PatientResponse } from '../interfaces/patient';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  //gracias mijangos por
  constructor(private http: HttpClient) {
    if (environment.enableDebugMode) {
      console.log('🔧 PatientService inicializado');
    console.log('📍 API URL:', this.apiUrl);
    }
  }

  private apiUrl = environment.API_URL;

  createPatient(patient: Patient): Observable<PatientResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.tokenKey}`
    });

    if (environment.enableDebugMode) {
      console.log('Creando paciente con datos:', patient);
    }

    return this.http.post<PatientResponse>(`${this.apiUrl}/patient`, patient, { headers });
  }

  getPatients(): Observable<PatientResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(environment.tokenKey)}`
    });

    return this.http.get<PatientResponse>(
      `${this.apiUrl}/patients`,
      { headers }
    );
  }

  getPatientById(id: number): Observable<PatientResponse> {

    if (environment.enableDebugMode) {
      console.log('Obteniendo paciente con ID:', id);
    }
    return this.http.get<PatientResponse>(`${this.apiUrl}/patient/${id}`);
  };

  // updatePatient(id: number, patient: Patient): Observable<Patient> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.put<Patient>(`${environment.API_URL}/patient/${id}`, patient, { headers });
  // }

  //recordar a toño que haga un metodo patch y put para el status del paciente

  deletePatient(id: number): Observable<any> {
    if (environment.enableDebugMode) {
      console.log('Eliminando paciente con ID:', id);
    }
    return this.http.patch(`${this.apiUrl}/patient/${id}`, { statusId: 2 });
  }




}

