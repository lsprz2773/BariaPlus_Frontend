import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Doctor } from '../interfaces/doctor';
import { LoginRequest, LoginResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = environment.API_URL;
  private tokenKey = environment.tokenKey;
  private doctorKey = environment.doctorKey; // clave para almacenar el doctor en localStorage

  private currentDoctorSubject = new BehaviorSubject<Doctor | null>(this.getDoctorFromStorage());
  private currentDoctor$ = this.currentDoctorSubject.asObservable();

  constructor(private _http: HttpClient) {  }
  
  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/auth/login`;

    if (environment.enableDebugMode) {
      console.log('Intentando iniciar sesión con URL:', url);
    }

    return this._http.post<LoginResponse>(url, credentials, { headers }).pipe(
      tap(response => {
        if (response.success && response.token){
          this.saveToken(response.token);
          this.saveDoctor(response.doctor);
          this.currentDoctorSubject.next(response.doctor);
        }
      })
    );
  }

  // guardar tokens

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private saveDoctor(doctor: Doctor): void {
    localStorage.setItem(this.doctorKey, JSON.stringify(doctor));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getDoctorFromStorage(): Doctor | null {
    const doctorJson = localStorage.getItem(this.doctorKey);
    return doctorJson ? JSON.parse(doctorJson) : null; // Devuelve null si no hay doctor almacenado
  }

  getCurrentDoctor(): Doctor | null {
    return this.currentDoctorSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.doctorKey);
    this.currentDoctorSubject.next(null);

    if (environment.enableDebugMode) {
      console.log('Usuario desconectado, token y doctor eliminados del almacenamiento local.');
    }
  }

  setTokenManually(token: string, doctor: Doctor): void {
    this.saveToken(token);
    this.saveDoctor(doctor);
    this.currentDoctorSubject.next(doctor);

    console.log('Token y doctor establecidos manualmente.'+ token + doctor);
  }
}
