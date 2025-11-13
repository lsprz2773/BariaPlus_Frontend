import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  //gracias mijangos por
  constructor(private http: HttpClient) { }

  createPatient(patient: Patient): Observable<Patient> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Patient>(`${environment.API_URL}/patient`, patient, { headers });
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.API_URL}/patient`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${environment.API_URL}/patient/${id}`);
  };

  // updatePatient(id: number, patient: Patient): Observable<Patient> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.put<Patient>(`${environment.API_URL}/patient/${id}`, patient, { headers });
  // }

  //recordar a toño que haga un metodo patch y put para el status del paciente

  deletePatient(id: number): Observable<any> {
    return this.http.patch(`${environment.API_URL}/patient/${id}`, { statusId: 2 });
  }

  

}

